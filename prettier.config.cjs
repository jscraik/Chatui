module.exports = {
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  printWidth: 100,
  // Ignore patterns (consolidated from .prettierignore)
  ignorePatterns: [
    "**/node_modules/**",
    "**/dist/**",
    "**/.*/**",
    "pnpm-lock.yaml",
    "scripts/new-component.mjs",
  ],
};
