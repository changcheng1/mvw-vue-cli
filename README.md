# Create Vue Template

🚀 A modern CLI tool to generate Vue 3 project templates with Vite, Ant Design Vue, and TypeScript.

## Features

- ⚡️ **Vue 3** - Latest Vue.js with Composition API
- 🚀 **Vite** - Lightning fast build tool
- 🔷 **TypeScript** - Type-safe development
- 🎨 **Ant Design Vue** - Enterprise-class UI components
- 🎭 **CSS Preprocessors** - SCSS or Less support (optional)
- 🏪 **Pinia** - Modern state management (optional)
- 🗂️ **Vue Router** - Official routing solution (optional)
- 📦 **Auto Import** - Automatic component and API imports
- 🔧 **ESLint & Prettier** - Code quality and formatting
- 📱 **Responsive Design** - Mobile-first approach

## Quick Start

### Global Installation

```bash
npm install -g create-mvw-template
```

### Usage

```bash
# Create a new Vue project
create-mvw-template my-awesome-app

# Or use npx (no installation required)
npx create-mvw-template my-awesome-app

# Skip interactive prompts (use defaults)
create-mvw-template my-app --skip-prompts
```

### Interactive Setup

The CLI will guide you through the setup process:

1. **Project Name** - Enter your project name
2. **CSS Preprocessor** - Choose SCSS, Less, or none
3. **State Management** - Include Pinia or not
4. **Routing** - Include Vue Router or not

### After Project Creation

```bash
cd my-awesome-app
npm install
npm run dev
```

## Generated Project Structure

```
my-awesome-app/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable components
│   ├── views/             # Page components (if Router enabled)
│   ├── router/            # Vue Router config (if Router enabled)
│   ├── stores/            # Pinia stores (if Pinia enabled)
│   ├── style/             # Global styles (if preprocessor selected)
│   ├── App.vue            # Root component
│   └── main.ts            # Application entry point
├── index.html             # HTML template
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Project dependencies
└── README.md              # Project documentation
```

## Available Scripts

In the generated project, you can run:

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## CLI Options

```bash
create-mvw-template [project-name] [options]

Options:
  -s, --skip-prompts     Skip interactive prompts and use defaults
  -t, --template <type>  Template type (basic, full)
  -h, --help            Display help information
  -V, --version         Display version number
```

## Examples

```bash
# Interactive setup
create-mvw-template

# Quick setup with defaults
create-mvw-template my-app --skip-prompts

# Specify project name
create-mvw-template my-awesome-project
```

## Requirements

- Node.js 16.0.0 or higher
- npm, yarn, or pnpm

## What's Included

### Base Template
- Vue 3 with Composition API
- Vite for fast development and building
- TypeScript for type safety
- Ant Design Vue for UI components
- ESLint + Prettier for code quality
- Responsive layout examples

### Optional Features
- **SCSS/Less**: CSS preprocessors for advanced styling
- **Vue Router**: Client-side routing with example pages
- **Pinia**: Modern state management with example store
- **Icons**: Ant Design Icons integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © updatebycc@gmail.com

## Changelog

### 1.0.0
- Initial release
- Vue 3 + Vite + TypeScript template
- Ant Design Vue integration
- Optional CSS preprocessors (SCSS/Less)
- Optional Vue Router
- Optional Pinia state management
- Interactive CLI setup