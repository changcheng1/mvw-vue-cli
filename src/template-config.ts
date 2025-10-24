import { ProjectConfiguration } from './types';

export interface TemplateModule {
  name: string;
  condition: (config: ProjectConfiguration) => boolean;
  files: string[];
  dependencies?: string[];
  devDependencies?: string[];
}

export interface ConditionalTemplate {
  baseFiles: string[];
  modules: TemplateModule[];
}

export class TemplateConfigManager {
  private config: ProjectConfiguration;

  constructor(config: ProjectConfiguration) {
    this.config = config;
  }

  getTemplateModules(): TemplateModule[] {
    return [
      {
        name: 'vue-router',
        condition: (config) => config.useRouter,
        files: [
          'src/router/index.ts',
          'src/views/Home.vue',
          'src/views/About.vue'
        ],
        dependencies: ['vue-router'],
      },
      {
        name: 'pinia',
        condition: (config) => config.usePinia,
        files: [
          'src/stores/counter.ts'
        ],
        dependencies: ['pinia'],
      },
      {
        name: 'scss',
        condition: (config) => config.cssPreprocessor === 'scss',
        files: [
          'src/style/main.scss'
        ],
        devDependencies: ['sass'],
      },
      {
        name: 'less',
        condition: (config) => config.cssPreprocessor === 'less',
        files: [
          'src/style/main.less'
        ],
        devDependencies: ['less'],
      }
    ];
  }

  getActiveModules(): TemplateModule[] {
    return this.getTemplateModules().filter(module => 
      module.condition(this.config)
    );
  }

  getRequiredDependencies(): string[] {
    const baseDependencies = [
      'vue',
      'ant-design-vue',
      '@ant-design/icons-vue'
    ];

    const moduleDependencies = this.getActiveModules()
      .flatMap(module => module.dependencies || []);

    return [...baseDependencies, ...moduleDependencies];
  }

  getRequiredDevDependencies(): string[] {
    const baseDevDependencies = [
      '@types/node',
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
      '@vitejs/plugin-vue',
      'eslint',
      'eslint-plugin-vue',
      'prettier',
      'typescript',
      'vite',
      'vue-tsc'
    ];

    const moduleDevDependencies = this.getActiveModules()
      .flatMap(module => module.devDependencies || []);

    return [...baseDevDependencies, ...moduleDevDependencies];
  }

  getFilesToInclude(): string[] {
    const baseFiles = [
      'package.json',
      'vite.config.ts',
      'tsconfig.json',
      'tsconfig.node.json',
      'index.html',
      '.eslintrc.cjs',
      '.gitignore',
      '.prettierrc',
      'README.md',
      'src/main.ts',
      'src/App.vue',
      'src/components/HelloWorld.vue'
    ];

    const moduleFiles = this.getActiveModules()
      .flatMap(module => module.files);

    return [...baseFiles, ...moduleFiles];
  }

  getDirectoriesToInclude(): string[] {
    const baseDirs = ['src', 'src/components'];
    const conditionalDirs: string[] = [];

    if (this.config.useRouter) {
      conditionalDirs.push('src/router', 'src/views');
    }

    if (this.config.usePinia) {
      conditionalDirs.push('src/stores');
    }

    if (this.config.cssPreprocessor !== 'none') {
      conditionalDirs.push('src/style');
    }

    return [...baseDirs, ...conditionalDirs];
  }

  shouldIncludeFile(filePath: string): boolean {
    const filesToInclude = this.getFilesToInclude();
    return filesToInclude.some(file => filePath.includes(file));
  }

  shouldIncludeDirectory(dirPath: string): boolean {
    const dirsToInclude = this.getDirectoriesToInclude();
    return dirsToInclude.some(dir => dirPath.includes(dir));
  }
}