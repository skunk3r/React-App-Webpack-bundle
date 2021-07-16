const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtactPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.[contenthash].js'
	},
	optimization: {
		splitChunks: {
			chunks: 'all'
		},
		minimizer: [
			new CssMinimizerWebpackPlugin(),
			new TerserWebpackPlugin()
		]
	},
	devServer: {
		port: 3000
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: '../public/index.html'
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'public/favicon.ico'),
					to: path.resolve(__dirname, 'dist')
				},
				{
					from: path.resolve(__dirname, 'src/assets/'),
					to: path.resolve(__dirname, 'dist/assets/')
				}
			]
		}),
		new MiniCssExtactPlugin({
			filename: 'bundle.[contenthash].css'
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtactPlugin.loader, 'css-loader']
			},
			{
				test: /\.(png|jpg|svg|gif|ttf|woff|woff2|eot)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]', 
						emitFile: false
					}
				}
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-react', '@babel/preset-env'],
						plugins: [
							'@babel/plugin-transform-runtime',
						]
					}
				}
			}
		]
	}
}
