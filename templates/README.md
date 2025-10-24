# {{projectNamePascal}}

A modern Vue 3 application built with Vite, TypeScript, and Ant Design Vue.

## Features

- ⚡️ **Vue 3** - Latest Vue.js with Composition API
- 🚀 **Vite** - Lightning fast build tool
- 🔷 **TypeScript** - Type-safe development
- 🎨 **Ant Design Vue** - Enterprise-class UI components{{#if hasScss}}
- 🎭 **SCSS** - Powerful CSS preprocessor{{/if}}{{#if hasLess}}
- 🎭 **Less** - Dynamic CSS preprocessor{{/if}}{{#if usePinia}}
- 🏪 **Pinia** - Intuitive state management{{/if}}{{#if useRouter}}
- 🗂️ **Vue Router** - Official routing solution{{/if}}
- 📦 **Auto Import** - Automatic component and API imports
- 🔧 **ESLint & Prettier** - Code quality and formatting
- 📱 **Responsive Design** - Mobile-first approach

## Quick Start

### Prerequisites

- Node.js 16+ 
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd {{projectName}}

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build

```bash
# Build for production
npm run build
# or
yarn build
# or
pnpm build
```

### Preview

```bash
# Preview production build
npm run preview
# or
yarn preview
# or
pnpm preview
```

## Project Structure

```
{{projectName}}/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable components
│   ├── views/             # Page components{{#if useRouter}}
│   ├── router/            # Vue Router configuration{{/if}}{{#if usePinia}}
│   ├── stores/            # Pinia stores{{/if}}
│   ├── style/             # Global styles
│   ├── App.vue            # Root component
│   └── main.ts            # Application entry point
├── index.html             # HTML template
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## Scripts

- `dev` - Start development server
- `build` - Build for production
- `preview` - Preview production build
- `lint` - Run ESLint
- `format` - Format code with Prettier

## Technologies Used

- [Vue 3](https://vuejs.org/) - Progressive JavaScript framework
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Ant Design Vue](https://antdv.com/) - Enterprise-class UI design language{{#if hasScss}}
- [SCSS](https://sass-lang.com/) - Syntactically Awesome Style Sheets{{/if}}{{#if hasLess}}
- [Less](https://lesscss.org/) - Dynamic CSS preprocessor{{/if}}{{#if usePinia}}
- [Pinia](https://pinia.vuejs.org/) - Intuitive, type safe store for Vue{{/if}}{{#if useRouter}}
- [Vue Router](https://router.vuejs.org/) - Official router for Vue.js{{/if}}

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Vue.js team for the amazing framework
- Ant Design team for the beautiful UI components
- Vite team for the lightning-fast build tool