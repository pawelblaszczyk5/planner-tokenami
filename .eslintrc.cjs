const builtinRules = {
	"arrow-body-style": ["error", "as-needed"],
	curly: ["error", "multi", "consistent"],
	"default-case-last": "error",
	eqeqeq: "error",
	"linebreak-style": ["error", "unix"],
	"logical-assignment-operators": ["error", "always", { enforceForIfStatements: true }],
	"no-alert": "warn",
	"no-console": "warn",
	"no-div-regex": "error",
	"no-else-return": ["error", { allowElseIf: false }],
	"no-eval": "error",
	"no-extend-native": "error",
	"no-floating-decimal": "error",
	"no-implicit-coercion": "error",
	"no-param-reassign": "error",
	"no-plusplus": "error",
	"no-promise-executor-return": "error",
	"no-regex-spaces": "error",
	"no-restricted-syntax": [
		"error",
		{
			message: "Don't declare enums",
			selector: "TSEnumDeclaration",
		},
	],
	"no-return-assign": "error",
	"no-self-compare": "error",
	"no-sequences": "error",
	"no-template-curly-in-string": "error",
	"no-undef": "off",
	"no-undef-init": "error",
	"no-underscore-dangle": ["error", { allow: ["_tag"] }],
	"no-unneeded-ternary": "error",
	"no-useless-call": "error",
	"no-useless-computed-key": "error",
	"no-useless-concat": "error",
	"no-var": "error",
	"no-warning-comments": [
		"warn",
		{
			location: "start",
			terms: ["TODO", "FIXME"],
		},
	],
	"object-shorthand": ["error", "always"],
	"one-var": ["error", "never"],
	"one-var-declaration-per-line": "error",
	"operator-assignment": ["error", "always"],
	"padding-line-between-statements": [
		"error",
		{ blankLine: "always", next: "*", prev: ["const", "let", "var"] },
		{
			blankLine: "any",
			next: ["const", "let", "var"],
			prev: ["const", "let", "var"],
		},
	],
	"prefer-const": "error",
	"prefer-exponentiation-operator": "error",
	"prefer-object-has-own": "error",
	"prefer-object-spread": "error",
	"prefer-promise-reject-errors": "error",
	"prefer-regex-literals": [
		"error",
		{
			disallowRedundantWrapping: true,
		},
	],
	"prefer-rest-params": "error",
	"prefer-spread": "error",
	"prefer-template": "error",
	"quote-props": [
		"error",
		"as-needed",
		{
			numbers: true,
		},
	],
	radix: "error",
	"require-atomic-updates": "error",
	"require-unicode-regexp": "error",
	"require-yield": "error",
	"spaced-comment": ["error", "always"],
	"symbol-description": "error",
	yoda: ["error", "never"],
};

const preferArrowFunctionsRules = {
	"prefer-arrow-functions/prefer-arrow-functions": [
		"error",
		{
			classPropertiesAllowed: true,
			disallowPrototype: true,
			returnStyle: "unchanged",
			singleReturnOnly: false,
		},
	],
};

const typescriptRules = {
	"@typescript-eslint/array-type": ["error", { default: "generic", readonly: "generic" }],
	"@typescript-eslint/consistent-type-definitions": ["error", "type"],
	"@typescript-eslint/consistent-type-exports": ["error", { fixMixedExportsWithInlineTypeSpecifier: true }],
	"@typescript-eslint/consistent-type-imports": [
		"error",
		{
			disallowTypeAnnotations: false,
			fixStyle: "separate-type-imports",
			prefer: "type-imports",
		},
	],
	"@typescript-eslint/default-param-last": "error",
	"@typescript-eslint/method-signature-style": ["error", "property"],
	"@typescript-eslint/no-explicit-any": "off",
	"@typescript-eslint/no-misused-promises": [
		"error",
		{
			checksVoidReturn: false,
		},
	],
	"@typescript-eslint/no-restricted-imports": [
		"error",
		{
			patterns: [
				{
					group: ["./*"],
					message: "Don't use relative imports",
				},
				{
					group: ["~icons"],
					message: 'Use "virtual:icons" prefixed imports instead',
				},
			],
		},
	],
	"@typescript-eslint/no-unused-vars": ["error", { ignoreRestSiblings: true }],
	"@typescript-eslint/no-use-before-define": [
		"error",
		{
			allowNamedExports: false,
			classes: true,
			enums: true,
			functions: true,
			ignoreTypeReferences: false,
			typedefs: true,
			variables: true,
		},
	],
	"@typescript-eslint/no-useless-empty-export": "error",
	"@typescript-eslint/promise-function-async": "error",
};

const canonicalRules = {
	"canonical/filename-no-index": "error",
};

const fpRules = {
	"fp/no-arguments": "error",
	"fp/no-class": "error",
	"fp/no-delete": "error",
	"fp/no-loops": "error",
	"fp/no-mutating-assign": "error",
	"fp/no-this": "error",
	"fp/no-valueof-field": "error",
};

const importRules = {
	"import/consistent-type-specifier-style": ["error", "prefer-top-level"],
	"import/export": "error",
	"import/first": "error",
	"import/newline-after-import": "error",
	"import/no-cycle": [
		"error",
		{
			allowUnsafeDynamicCyclicDependency: true,
		},
	],
	"import/no-deprecated": "warn",
	"import/no-duplicates": "error",
	"import/no-extraneous-dependencies": "error",
	"import/no-mutable-exports": "error",
	"import/no-named-as-default": "error",
	"import/no-named-as-default-member": "error",
};

const unicornRules = {
	"unicorn/consistent-function-scoping": "off",
	"unicorn/no-array-callback-reference": "off",
	"unicorn/no-array-for-each": "off",
	"unicorn/no-array-reduce": "off",
	"unicorn/no-await-expression-member": "off",
	"unicorn/no-null": "off",
	"unicorn/no-unsafe-regex": "error",
	"unicorn/no-unused-properties": "error",
	"unicorn/no-useless-undefined": [
		"error",
		{
			checkArguments: false,
		},
	],
	"unicorn/numeric-separators-style": [
		"error",
		{
			binary: {
				groupLength: 4,
				minimumDigits: 0,
			},
			hexadecimal: {
				groupLength: 2,
				minimumDigits: 0,
			},
			number: {
				groupLength: 3,
				minimumDigits: 4,
			},
			octal: {
				groupLength: 4,
				minimumDigits: 0,
			},
			onlyIfContainsSeparator: false,
		},
	],
	"unicorn/prefer-array-flat": "off",
	"unicorn/prefer-native-coercion-functions": "off",
	"unicorn/prefer-top-level-await": "off",
	"unicorn/prevent-abbreviations": "off",
	"unicorn/require-post-message-target-origin": "error",
};

const perfectionistRules = {
	"perfectionist/sort-imports": [
		"error",
		{
			groups: [
				["builtin-type", "type"],
				["builtin", "external"],
				"internal-type",
				"internal",
				["parent-type", "sibling-type", "index-type"],
				["parent", "sibling", "index"],
				"side-effect",
				"style",
				"object",
				"unknown",
			],
			"internal-pattern": ["\\#/**"],
			order: "asc",
			type: "natural",
		},
	],
	"perfectionist/sort-jsx-props": [
		"error",
		{
			groups: ["multiline", "unknown", "shorthand"],
			order: "asc",
			type: "natural",
		},
	],
};

const reactRules = {
	"react/button-has-type": "error",
	"react/self-closing-comp": "error",
};

const reactRefreshRules = {
	"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
};

module.exports = {
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/stylistic-type-checked",
		"plugin:@typescript-eslint/strict-type-checked",
		"plugin:regexp/recommended",
		"plugin:promise/recommended",
		"plugin:unicorn/recommended",
		"plugin:perfectionist/recommended-natural",
		"plugin:deprecation/recommended",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
		"plugin:react-hooks/recommended",
		"plugin:jsx-a11y/strict",
		"prettier",
	],
	ignorePatterns: ["dist", "!.tokenami"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: ["tsconfig.json", "tsconfig.node.json", "tsconfig.ci.json"],
		// @ts-expect-error -- don't want to install @types/node
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		tsconfigRootDir: __dirname,
	},
	plugins: ["canonical", "import", "prefer-arrow-functions", "fp", "react-refresh"],
	root: true,
	rules: {
		...builtinRules,
		...preferArrowFunctionsRules,
		...typescriptRules,
		...canonicalRules,
		...fpRules,
		...importRules,
		...unicornRules,
		...perfectionistRules,
		...reactRules,
		...reactRefreshRules,
	},
	settings: {
		"import/extensions": [".ts", ".tsx"],
		"import/parsers": {
			"@typescript-eslint/parser": [".ts", ".tsx"],
		},
		"import/resolver": {
			typescript: {
				extensions: [".ts", ".tsx"],
			},
		},
		react: {
			version: "detect",
		},
	},
};
