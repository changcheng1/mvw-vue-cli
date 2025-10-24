import inquirer from 'inquirer';
import chalk from 'chalk';
import { ProjectConfiguration } from './types';

export class PromptManager {
  async collectConfiguration(existingProjectName?: string): Promise<ProjectConfiguration> {
    console.log(chalk.cyan('📋 Let\'s configure your Vue project:\n'));

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Project name:',
        default: existingProjectName || 'my-vue-app',
        validate: (input: string) => this.validateProjectName(input),
        filter: (input: string) => input.trim().toLowerCase()
      },
      {
        type: 'list',
        name: 'cssPreprocessor',
        message: 'Select CSS preprocessor:',
        choices: [
          { name: 'SCSS', value: 'scss' },
          { name: 'Less', value: 'less' }
        ],
        default: 'scss'
      },
      {
        type: 'confirm',
        name: 'usePinia',
        message: 'Add Pinia for state management?',
        default: false
      },
      {
        type: 'confirm',
        name: 'useRouter',
        message: 'Add Vue Router for routing?',
        default: false
      }
    ]);

    return {
      projectName: answers.projectName,
      cssPreprocessor: answers.cssPreprocessor,
      usePinia: answers.usePinia,
      useRouter: answers.useRouter
    };
  }

  private validateProjectName(name: string): boolean | string {
    // Trim and convert to lowercase for validation
    const trimmedName = name.trim().toLowerCase();
    
    // Check if empty
    if (!trimmedName || trimmedName.length === 0) {
      return 'Project name cannot be empty';
    }

    // Check length
    if (trimmedName.length > 214) {
      return 'Project name must be 214 characters or less';
    }

    // Check if it starts with a letter
    if (!/^[a-z]/.test(trimmedName)) {
      return 'Project name must start with a letter';
    }

    // Check for valid characters (lowercase letters, numbers, hyphens)
    if (!/^[a-z0-9-]+$/.test(trimmedName)) {
      return 'Project name can only contain lowercase letters, numbers, and hyphens';
    }

    // Check if it ends with a hyphen
    if (trimmedName.endsWith('-')) {
      return 'Project name cannot end with a hyphen';
    }

    // Check if it starts with a hyphen
    if (trimmedName.startsWith('-')) {
      return 'Project name cannot start with a hyphen';
    }

    // Check for consecutive hyphens
    if (trimmedName.includes('--')) {
      return 'Project name cannot contain consecutive hyphens';
    }

    // Check for reserved names
    const reservedNames = [
      'node_modules', 'favicon.ico', 'package.json', 'package-lock.json',
      'yarn.lock', '.git', '.gitignore', 'readme', 'license', 'changelog'
    ];
    
    if (reservedNames.includes(trimmedName)) {
      return `"${trimmedName}" is a reserved name and cannot be used`;
    }

    return true;
  }

  async confirmConfiguration(config: ProjectConfiguration): Promise<boolean> {
    console.log(chalk.cyan('\n📋 Project Configuration Summary:'));
    console.log(chalk.white(`  Project name: ${chalk.green(config.projectName)}`));
    console.log(chalk.white(`  CSS preprocessor: ${chalk.green(config.cssPreprocessor.toUpperCase())}`));
    console.log(chalk.white(`  Pinia (state management): ${config.usePinia ? chalk.green('Yes') : chalk.gray('No')}`));
    console.log(chalk.white(`  Vue Router: ${config.useRouter ? chalk.green('Yes') : chalk.gray('No')}`));

    const { confirmed } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirmed',
        message: 'Is this configuration correct?',
        default: true
      }
    ]);

    return confirmed;
  }

  async askToReconfigure(): Promise<boolean> {
    const { reconfigure } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'reconfigure',
        message: 'Would you like to reconfigure the project?',
        default: true
      }
    ]);

    return reconfigure;
  }

  showConfigurationHelp(): void {
    console.log(chalk.cyan('\n💡 Configuration Help:'));
    console.log(chalk.white('  • Project name: Used for the folder name and package.json'));
    console.log(chalk.white('  • CSS preprocessor: Choose between SCSS or Less for styling'));
    console.log(chalk.white('  • Pinia: Vue 3 state management library (recommended for complex apps)'));
    console.log(chalk.white('  • Vue Router: Official router for Vue.js (needed for multi-page apps)'));
    console.log();
  }
}