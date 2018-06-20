'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// const extractSass = new ExtractTextPlugin({
// 	filename: "[name].[contenthash].css",
// 	disable: false
// });

module.exports = {
	mode: 'development',
	context: __dirname,
	entry: './src/js/index.js',
	// output: {
	// 	path: __dirname + '/build/',
	// 	filename: "[name]"
	// },

	//devtool: NODE_ENV == 'development' ? 'source-map': null,

	watch: true,

	watchOptions: {
		aggregateTimeout: 100
	},


	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['es2015']
				}
			}
		},
			{
				test: /\.scss$/,
				exclude: /(node_modules|bower_components)/,
				use:  [{
						loader: "style-loader"
					}, {
						loader: "css-loader", options: {
							sourceMap: true
						}
					}, {
						loader: "sass-loader", options: {
							sourceMap: true
						}
				}]
			}
		]
	}



};





//
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
//
// module.exports = {
//
// 	entry: './src/scss/main.scss',
// 	output: {
// 		filename: 'build'
// 	},
// 	module: {
// 		rules: [
// 			{
// 				test: /\.scss$/,
// 				use: ExtractTextPlugin.extract({
// 					fallback: "style-loader",
// 					use: [{
// 							loader: "style-loader" // creates style nodes from JS strings
// 						}, {
// 							loader: "css-loader" // translates CSS into CommonJS
// 						}, {
// 							loader: "sass-loader" // compiles Sass to CSS
// 						}]
// 				})
// 			}
// 		]
// 	},
// 	plugins: [
// 		new ExtractTextPlugin("styles.css"),
// 	]
// }