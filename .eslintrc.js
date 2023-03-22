module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'prettier',
        'prettier/react',
        'plugin:prettier/recommended',
        'plugin:tailwindcss/recommended',
    ],
    plugins: [
        'react',
        'react-hooks',
        'jsx-a11y',
        'import',
        'prettier',
        'tailwindcss',
    ],
    rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: ['Link'],
                specialLink: ['to'],
            },
        ],
        'import/no-unresolved': 'error',
        'import/named': 'error',
        'import/default': 'error',
        'import/namespace': 'error',
        'import/export': 'error',
        'prettier/prettier': 'error',
    },
    env: {
        browser: true,
        es6: true,
    },
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
        tailwindcss: {
            // These are the default values but feel free to customize
            callees: ['classnames', 'clsx', 'ctl'],
            config: 'tailwind.config.js',
            cssFiles: [
                '**/*.css',
                '!**/node_modules',
                '!**/.*',
                '!**/dist',
                '!**/build',
            ],
            cssFilesRefreshRate: 5_000,
            removeDuplicates: true,
            skipClassAttribute: false,
            whitelist: [],
            tags: [],
            classRegex: '^class(Name)?$', // can be modified to support custom attributes. E.g. "^tw$" for `twin.macro`
        },
    },
};
