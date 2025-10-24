import * as fs from 'fs';
import * as path from 'path';
import { TemplateEngine } from './template-engine';
import { TemplateConfigManager } from './template-config';
import { ProjectConfiguration } from './types';

export class FileHandler {
  private templateEngine: TemplateEngine;
  private templateConfigManager: TemplateConfigManager | null = null;
  private templateDir: string;

  constructor(templateDir: string = 'templates') {
    this.templateEngine = new TemplateEngine();
    this.templateDir = templateDir;
  }

  async createProject(config: ProjectConfiguration, outputDir: string): Promise<void> {
    // Set template variables and configuration
    this.templateEngine.setVariables(config);
    this.templateConfigManager = new TemplateConfigManager(config);

    // Ensure output directory exists
    await this.ensureDirectory(outputDir);

    // Copy and process template files
    await this.processDirectory(this.templateDir, outputDir, config);
  }

  private async ensureDirectory(dirPath: string): Promise<void> {
    try {
      await fs.promises.access(dirPath);
    } catch {
      await fs.promises.mkdir(dirPath, { recursive: true });
    }
  }

  private async processDirectory(sourceDir: string, targetDir: string, config: ProjectConfiguration): Promise<void> {
    const entries = await fs.promises.readdir(sourceDir, { withFileTypes: true });

    for (const entry of entries) {
      const sourcePath = path.join(sourceDir, entry.name);
      const targetPath = path.join(targetDir, entry.name);

      if (entry.isDirectory()) {
        // Skip directories based on configuration
        if (this.shouldSkipDirectory(entry.name, config)) {
          continue;
        }

        await this.ensureDirectory(targetPath);
        await this.processDirectory(sourcePath, targetPath, config);
      } else if (entry.isFile()) {
        // Skip files based on configuration
        if (this.shouldSkipFile(entry.name, config)) {
          continue;
        }

        await this.processFile(sourcePath, targetPath);
      }
    }
  }

  private shouldSkipDirectory(dirName: string, config: ProjectConfiguration): boolean {
    if (!this.templateConfigManager) {
      // Fallback to original logic if config manager is not available
      if (dirName === 'router' && !config.useRouter) return true;
      if (dirName === 'stores' && !config.usePinia) return true;
      return false;
    }

    // Use the enhanced template configuration logic
    const dirPath = `src/${dirName}`;
    return !this.templateConfigManager.shouldIncludeDirectory(dirPath);
  }

  private shouldSkipFile(fileName: string, config: ProjectConfiguration): boolean {
    if (!this.templateConfigManager) {
      // Fallback to original logic if config manager is not available
      if (fileName.endsWith('.scss') && config.cssPreprocessor !== 'scss') return true;
      if (fileName.endsWith('.less') && config.cssPreprocessor !== 'less') return true;
      return false;
    }

    // Use the enhanced template configuration logic
    return !this.templateConfigManager.shouldIncludeFile(fileName);
  }

  private async processFile(sourcePath: string, targetPath: string): Promise<void> {
    try {
      const content = await fs.promises.readFile(sourcePath, 'utf-8');
      const processedContent = this.templateEngine.processTemplate(content);
      await fs.promises.writeFile(targetPath, processedContent, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to process file ${sourcePath}: ${error}`);
    }
  }

  async directoryExists(dirPath: string): Promise<boolean> {
    try {
      const stat = await fs.promises.stat(dirPath);
      return stat.isDirectory();
    } catch {
      return false;
    }
  }

  async isDirectoryEmpty(dirPath: string): Promise<boolean> {
    try {
      const entries = await fs.promises.readdir(dirPath);
      return entries.length === 0;
    } catch {
      return true;
    }
  }

  async removeDirectory(dirPath: string): Promise<void> {
    try {
      await fs.promises.rm(dirPath, { recursive: true, force: true });
    } catch (error) {
      throw new Error(`Failed to remove directory ${dirPath}: ${error}`);
    }
  }

  generatePackageJson(config: ProjectConfiguration): string {
    const configManager = new TemplateConfigManager(config);
    const dependencies = configManager.getRequiredDependencies();
    const devDependencies = configManager.getRequiredDevDependencies();

    const packageJson = {
      name: config.projectName,
      private: true,
      version: "0.0.0",
      type: "module",
      scripts: {
        dev: "vite",
        build: "vue-tsc && vite build",
        preview: "vite preview",
        lint: "eslint . --ext vue,js,jsx,ts,tsx --fix",
        format: "prettier --write src/"
      },
      dependencies: this.createDependencyObject(dependencies),
      devDependencies: this.createDependencyObject(devDependencies)
    };

    return JSON.stringify(packageJson, null, 2);
  }

  private createDependencyObject(deps: string[]): Record<string, string> {
    const versions: Record<string, string> = {
      // Dependencies
      'vue': '^3.4.0',
      'ant-design-vue': '^4.0.0',
      'vue-router': '^4.2.0',
      'pinia': '^2.1.0',
      '@ant-design/icons-vue': '^7.0.0',
      
      // Dev Dependencies
      '@types/node': '^20.0.0',
      '@typescript-eslint/eslint-plugin': '^6.0.0',
      '@typescript-eslint/parser': '^6.0.0',
      '@vitejs/plugin-vue': '^4.5.0',
      'eslint': '^8.45.0',
      'eslint-plugin-vue': '^9.17.0',
      'prettier': '^3.0.0',
      'typescript': '^5.2.0',
      'vite': '^5.0.0',
      'vue-tsc': '^1.8.0',
      'sass': '^1.69.0',
      'less': '^4.2.0'
    };

    const result: Record<string, string> = {};
    deps.forEach(dep => {
      if (versions[dep]) {
        result[dep] = versions[dep];
      }
    });

    return result;
  }

  getActiveModules(config: ProjectConfiguration): string[] {
    const configManager = new TemplateConfigManager(config);
    return configManager.getActiveModules().map(module => module.name);
  }
}