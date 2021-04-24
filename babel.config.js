module.exports = {
	presets: ["module:metro-react-native-babel-preset"],
	plugins: [
		[
			"module:react-native-dotenv",
			{
				safe: true,
				allowUndefined: false,
			},
		],
		"react-native-reanimated/plugin",
		[
			"module-resolver",
			{
				root: ["./src"],
				extensions: [
					".js",
					".jsx",
					".ts",
					".tsx",
					".android.js",
					".android.tsx",
					".ios.js",
					".ios.tsx",
				],
				alias: {
					"@components": "./src/components",
					"@contexts": "./src/contexts",
					"@helpers": "./src/helpers",
					"@navigators": "./src/navigators",
					"@screens": "./src/screens",
					"@styles": "./src/styles",
				},
			},
		],
	],
};
