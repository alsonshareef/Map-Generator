module.exports = {
	entry: ["./src/js/index.js", "./src/sass/main.scss"],
	module: {
		rules: [
			{
				test: /\.html$/,
				use: "html-loader"
			},
			{
				test: /\.(svg|png|jpg|gif)$/,
				use: {
					loader: "file-loader",
					options: {
						name: "[name].[hash].[ext]",
						outputPath: "../dist/imgs"
					}
				}
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
						plugins: ["@babel/plugin-proposal-class-properties"]
					}
				}
			}
		]
	}
};
