var path = require('path');             //加载path模块
var webpack = require('webpack');       //加载webpack模块
var HTMLWebpackPlugin = require('html-webpack-plugin');     //HTML模块插件

module.exports = {
    entry: [path.join(path.resolve(),"element-ui/main.js")],

    output: {
        path: path.join(path.resolve(),"element-ui/build/"),
        filename: "[name]-build.js",
    },

    module: {
        rules: [
            //CSS处理器
            {
                test: /\.css$/,
                use: ["style-loader","css-loader"]
            },
            //ES6语法转换处理器
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            },
            //文件处理
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: "file-loader",
                    query: {
                        name: "images/[name].[ext]",

                    }
                }
            },
            //vue处理
            {
                test: /\.vue$/,
                use: "vue-loader"
            }
        ]
    },
    //插件
    plugins: [
        new HTMLWebpackPlugin({
            title: "My App",                                                            //HTML文件Title
            //filename: "app.html"                                                      //默认在output指定的路径生成index.html
            template: path.join(path.resolve(),"element-ui/index.html")           //模板文件，如果指定了，则按照模板文件生成
        })
    ]
};

