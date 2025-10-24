#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { CLIOptions, ProjectConfiguration } from './types';
import { PromptManager } from './prompts';
import { FileHandler } from './file-handler';

export class CLI {
  private program: Command;
  private promptManager: PromptManager;
  private fileHandler: FileHandler;

  constructor() {
    this.program = new Command();
    this.promptManager = new PromptManager();
    this.fileHandler = new FileHandler();
    this.setupCommands();
  }

  private setupCommands(): void {
    this.program
      .name('create-vue-template')
      .description('Generate Vue 3 project templates with modern tooling')
      .version('1.0.0')
      .argument('[project-name]', 'Name of the project to create')
      .option('-s, --skip-prompts', 'Skip interactive prompts and use defaults', false)
      .option('-t, --template <template>', 'Template to use (basic, full)', 'basic')
      .option('--verbose', 'Show verbose output', false)
      .helpOption('-h, --help', 'Display help information')
      .action(async (projectName: string, options: any) => {
        const cliOptions: CLIOptions = {
          projectName,
          skipPrompts: options.skipPrompts,
          template: options.template,
          verbose: options.verbose,
          help: false,
          version: false
        };
        
        await this.run(cliOptions);
      });

    // Handle version flag separately
    this.program.on('option:version', () => {
      this.showVersion();
      process.exit(0);
    });

    // Handle help flag
    this.program.on('--help', () => {
      this.showExamples();
    });

    // Handle unknown commands
    this.program.on('command:*', (operands) => {
      console.error(chalk.red(`Unknown command: ${operands[0]}`));
      console.log('See --help for a list of available commands.');
      process.exit(1);
    });
  }

  async run(options: CLIOptions): Promise<void> {
    try {
      this.showWelcome();
      
      // Validate project name if provided
      if (options.projectName !== undefined && !this.validateProjectName(options.projectName)) {
        console.error(chalk.red('Error: Invalid project name'));
        console.log(chalk.yellow('Project name should:'));
        console.log('  - Only contain lowercase letters, numbers, and hyphens');
        console.log('  - Start with a letter');
        console.log('  - Not end with a hyphen');
        console.log('  - Be between 1-214 characters');
        process.exit(1);
      }

      // Validate template option
      if (options.template && !this.validateTemplate(options.template)) {
        console.error(chalk.red(`Error: Invalid template "${options.template}"`));
        console.log(chalk.yellow('Available templates: basic, full'));
        process.exit(1);
      }

      // Get project configuration
      let projectConfig: ProjectConfiguration;
      
      if (options.skipPrompts) {
        // Use defaults when skipping prompts
        projectConfig = this.getDefaultConfiguration(options.projectName);
        console.log(chalk.blue('⚡ Using default configuration (prompts skipped)'));
      } else {
        // Interactive configuration
        projectConfig = await this.getInteractiveConfiguration(options.projectName);
      }

      // Display final configuration
      this.displayConfiguration(projectConfig);
      
      // Generate project
      console.log(chalk.blue('\n🚀 Generating project...'));
      
      const projectPath = `./${projectConfig.projectName}`;
      
      // Check if directory already exists
      const dirExists = await this.fileHandler.directoryExists(projectPath);
      if (dirExists) {
        const isEmpty = await this.fileHandler.isDirectoryEmpty(projectPath);
        if (!isEmpty) {
          console.error(chalk.red(`\n❌ Directory "${projectConfig.projectName}" already exists and is not empty.`));
          console.log(chalk.yellow('Please choose a different name or remove the existing directory.'));
          process.exit(1);
        }
      }

      try {
        // Create the project
        await this.fileHandler.createProject(projectConfig, projectPath);
        
        // Show success message
        this.showSuccess(projectConfig, projectPath);
        
      } catch (error: any) {
        console.error(chalk.red('\n❌ Project generation failed:'));
        console.error(chalk.red(error.message));
        
        // Try to clean up
        try {
          await this.fileHandler.removeDirectory(projectPath);
        } catch (cleanupError) {
          console.warn(chalk.yellow('Warning: Failed to clean up project directory'));
        }
        
        process.exit(1);
      }
      
    } catch (error) {
      this.handleError(error);
    }
  }

  private showWelcome(): void {
    console.log(chalk.blue.bold('\n🚀 Vue Template Generator'));
    console.log(chalk.gray('Generate Vue 3 projects with Vite, Ant Design Vue, and TypeScript\n'));
  }

  private showVersion(): void {
    console.log('1.0.0');
  }

  private showExamples(): void {
    console.log(chalk.cyan('\nExamples:'));
    console.log('  $ create-vue-template my-app');
    console.log('  $ create-vue-template my-app --skip-prompts');
    console.log('  $ create-vue-template my-app --template full');
    console.log('  $ create-vue-template --help');
    console.log('  $ create-vue-template --version\n');
  }

  private validateProjectName(name: string): boolean {
    // Check basic requirements first
    if (!name || name.length === 0 || name.length > 214) {
      return false;
    }
    
    // npm package name validation rules
    const nameRegex = /^[a-z]([a-z0-9-]*[a-z0-9])?$/;
    return (
      nameRegex.test(name) &&
      !name.startsWith('-') &&
      !name.endsWith('-')
    );
  }

  private validateTemplate(template: string): boolean {
    const validTemplates = ['basic', 'full'];
    return validTemplates.includes(template);
  }

  private handleError(error: any): void {
    console.error(chalk.red('\n❌ An error occurred:'));
    
    if (error instanceof Error) {
      console.error(chalk.red(error.message));
      
      // Show stack trace in development
      if (process.env.NODE_ENV === 'development') {
        console.error(chalk.gray(error.stack));
      }
    } else {
      console.error(chalk.red('Unknown error occurred'));
    }
    
    console.log(chalk.yellow('\nFor help, run: create-vue-template --help'));
    process.exit(1);
  }

  private async getInteractiveConfiguration(projectName?: string): Promise<ProjectConfiguration> {
    let config: ProjectConfiguration;
    let confirmed = false;

    while (!confirmed) {
      config = await this.promptManager.collectConfiguration(projectName);
      confirmed = await this.promptManager.confirmConfiguration(config);
      
      if (!confirmed) {
        const reconfigure = await this.promptManager.askToReconfigure();
        if (!reconfigure) {
          console.log(chalk.yellow('Project generation cancelled.'));
          process.exit(0);
        }
      }
    }

    return config!;
  }

  private getDefaultConfiguration(projectName?: string): ProjectConfiguration {
    return {
      projectName: projectName || 'my-vue-app',
      cssPreprocessor: 'scss',
      usePinia: false,
      useRouter: false
    };
  }

  private displayConfiguration(config: ProjectConfiguration): void {
    console.log(chalk.cyan('\n📋 Final Configuration:'));
    console.log(chalk.white(`  📁 Project name: ${chalk.green(config.projectName)}`));
    console.log(chalk.white(`  🎨 CSS preprocessor: ${chalk.green(config.cssPreprocessor.toUpperCase())}`));
    console.log(chalk.white(`  🏪 Pinia: ${config.usePinia ? chalk.green('Yes') : chalk.gray('No')}`));
    console.log(chalk.white(`  🗂️  Vue Router: ${config.useRouter ? chalk.green('Yes') : chalk.gray('No')}`));
  }

  private showSuccess(config: ProjectConfiguration, projectPath: string): void {
    const activeModules = this.fileHandler.getActiveModules(config);
    
    console.log(chalk.green('\n🎉 Project created successfully!'));
    console.log(chalk.white(`\n📁 Location: ${chalk.cyan(projectPath)}`));
    
    if (activeModules.length > 0) {
      console.log(chalk.white('\n🔧 Features enabled:'));
      activeModules.forEach(module => {
        console.log(chalk.white(`  ✅ ${module}`));
      });
    }
    
    console.log(chalk.white('\n🚀 Next steps:'));
    console.log(chalk.white(`  1. ${chalk.cyan(`cd ${config.projectName}`)}`));
    console.log(chalk.white(`  2. ${chalk.cyan('npm install')}`));
    console.log(chalk.white(`  3. ${chalk.cyan('npm run dev')}`));
    
    console.log(chalk.white('\n📚 Additional commands:'));
    console.log(chalk.white(`  • ${chalk.cyan('npm run lint')}    - Run ESLint`));
    console.log(chalk.white(`  • ${chalk.cyan('npm run format')}  - Format code with Prettier`));
    console.log(chalk.white(`  • ${chalk.cyan('npm run build')}   - Build for production`));
    console.log(chalk.white(`  • ${chalk.cyan('npm run preview')} - Preview production build`));
    
    console.log(chalk.green('\nHappy coding! 🚀'));
  }

  parseArguments(): void {
    // Handle case when no arguments provided
    if (process.argv.length === 2) {
      this.program.help();
      return;
    }

    try {
      this.program.parse();
    } catch (error) {
      this.handleError(error);
    }
  }
}

// CLI entry point
if (require.main === module) {
  const cli = new CLI();
  cli.parseArguments();
}