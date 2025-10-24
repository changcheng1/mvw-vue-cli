import { ProjectConfiguration } from './types';

export interface TemplateVariable {
  [key: string]: string | boolean | number;
}

export class TemplateEngine {
  private variables: TemplateVariable = {};

  setVariables(config: ProjectConfiguration): void {
    this.variables = {
      projectName: config.projectName,
      cssPreprocessor: config.cssPreprocessor,
      usePinia: config.usePinia,
      useRouter: config.useRouter,
      // Derived variables for template convenience
      projectNamePascal: this.toPascalCase(config.projectName),
      projectNameCamel: this.toCamelCase(config.projectName),
      hasScss: config.cssPreprocessor === 'scss',
      hasLess: config.cssPreprocessor === 'less',
      currentYear: new Date().getFullYear()
    };
  }

  processTemplate(template: string): string {
    let processed = template;

    // Replace template variables with {{variableName}} syntax
    Object.entries(this.variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      processed = processed.replace(regex, String(value));
    });

    // Handle conditional blocks with {{#if condition}} ... {{/if}} syntax
    processed = this.processConditionals(processed);

    return processed;
  }

  private processConditionals(template: string): string {
    // Handle {{#if variable}} ... {{/if}} blocks
    const ifRegex = /{{#if\s+(\w+)}}([\s\S]*?){{\/if}}/g;
    
    return template.replace(ifRegex, (match, condition, content) => {
      const value = this.variables[condition];
      return value ? content : '';
    });
  }

  private toPascalCase(str: string): string {
    return str
      .split(/[-_\s]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  }

  private toCamelCase(str: string): string {
    const pascal = this.toPascalCase(str);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
  }

  getVariables(): TemplateVariable {
    return { ...this.variables };
  }
}