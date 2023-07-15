module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  extends: ["standard-with-typescript", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended", "prettier", "plugin:storybook/recommended"],
  ignorePatterns: [".eslintrc.*", "vite.config.ts", "tailwind.*", "vitest.*", "playwright*"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json"
  },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "@typescript-eslint/no-invalid-void-type": "off"
  }
};