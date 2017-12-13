var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	devtool: 'eval-source-map',
	entry: {
		app: __dirname + "/app/main.js"
	},
	output: {
		path: __dirname + "/public", //打包后的文件存放的地方
		filename: "[name].js" //打包后输出文件的文件名
	},
	devServer: {
		contentBase: "./public", //本地服务器所加载的页面所在的目录
		historyApiFallback: true, //不跳转
		inline: true //实时刷新
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader'
			]
		}, {
			test: /\.(png|svg|jpg|gif)$/,
			use: ['file-loader']
		}, {
			test: /\.(woff|woff2|eot|ttf|otf)$/,
			use: [
				'file-loader'
			]
		}, {
			test: /\.(csv|tsv)$/,
			use: [
				'csv-loader'
			]
		}, {
			test: /\.xml$/,
			use: [
				'xml-loader'
			]
		}, {
			test: /\.less$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [
					'css-loader',
					'autoprefixer-loader',
					'less-loader'
				]
			})
		},
		{
            test: /(\.jsx|\.js)$/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: [
                        "env","es2015"
                    ]
                }
            },
            exclude: /node_modules/
        }]
	},
	plugins: [
	new webpack.NamedModulesPlugin(),
		new HtmlWebpackPlugin({
			title: 'webpack-demo',
			template: __dirname+'/app/template/index.html'
		}),
		new CleanWebpackPlugin(['public']),
		new ExtractTextPlugin({
			filename: 'css/[name].css'
		}),
		new webpack.HotModuleReplacementPlugin()
	]
}