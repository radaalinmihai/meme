module.exports = {
	root: true,
	env: {
		es2021: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier",
	],
	settings: {
		react: {
			version: "detect",
		},
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint", "prettier", "simple-import-sort"],
	rules: {
		"prettier/prettier": ["error", {}, { usePrettierrc: true }],
		"react/prop-types": "off",
		"react/react-in-jsx-scope": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"linebreak-style": "off",
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"simple-import-sort/imports": "error",
		"simple-import-sort/exports": "error",
	},
};
