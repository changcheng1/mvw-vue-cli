export interface ProjectConfiguration {
  projectName: string;
  cssPreprocessor: 'scss' | 'less' | 'none';
  usePinia: boolean;
  useRouter: boolean;
}

export interface CLIOptions {
  projectName?: string;
  template?: string;
  skipPrompts?: boolean;
  verbose?: boolean;
  help?: boolean;
  version?: boolean;
}

export interface TemplateContext {
  projectName: string;
  features: string[];
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

export interface DependencyMap {
  core: Record<string, string>;
  scss?: Record<string, string>;
  less?: Record<string, string>;
  router?: Record<string, string>;
  pinia?: Record<string, string>;
}