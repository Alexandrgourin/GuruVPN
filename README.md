# GuruVPN Telegram Mini App

A Telegram Mini App for managing VPN subscriptions and configurations.

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Deployment

The app is automatically deployed when changes are pushed to the repository:

- `main` branch -> Production (https://app.gurupass.tech)
- `dev` branch -> Staging (https://staging.app.gurupass.tech)

### Branch Strategy

- `main`: Production-ready code
- `dev`: Development branch for new features
- Feature branches: Create from `dev` for new features
- Hotfix branches: Create from `main` for urgent fixes

### Version Tags

- v1.0.0: Initial stable release with basic functionality
  - Basic navigation
  - Subscription plans
  - VPN setup guide
  - Profile and support pages

### Tech Stack
- React + TypeScript
- Vite
- PM2 for process management
- Nginx as reverse proxy
- GitHub Actions for CI/CD

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
