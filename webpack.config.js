const webpack = require("@nativescript/webpack");

module.exports = (env) => {
	env.appComponents = env.appComponents || [];
	env.appComponents.push("./src/smsreceiver.ts");
	webpack.init(env);

	// Learn how to customize:
	// https://docs.nativescript.org/webpack

	return webpack.resolveConfig();
};


