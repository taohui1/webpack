const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Happypack = require('happypack') //多线程打包 适用于项目较大

module.exports = {
    mode: 'development',
    devServer: {
        port: 3000,
        contentBase: "./dist",
        progress: true,
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8888',
                pathRewrite: { '/api': '' }
            }
        }
    },
    resolve: {    //加载解析 第三方包common
        modules: [path.resolve('node_modules')],
        alias: { //别名

        },
        extensions: ['.js', '.css', 'json'] //扩展名 不需要加后缀 从前往后找
    },
    devtool: 'cheap-moudle-eval-source-map',//增加源码映射  可以帮助我们找到源码错误地方
    //source-map 会生成js.map文件
    //eval-source-map 不会产生js.map文件
    //cheap-moudle-eval-source-map 不会产生列 不会生成js.map文件
    entry: {
        home: './src/index.js'
    },//入口
    watch: true, //修改代码实时打包
    watchOptions: {
        poll: 1000, //每秒 更新1000次
        aggregateTimeout: 500, //防抖 我一直输入代码停止后500ms才打包
        ignored: /node_modules/ //不需要监控哪个文件
    },
    output: {
        path: path.resolve(__dirname, 'dist'),//必须是绝对路径
        filename: 'js/[name].[hash:8].js'        //打包的文件名
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'home.html',
            hash: true,
            chunks: ['home']
        }),
        new CleanWebpackPlugin(), //清除上一次打包文件
        new CopyWebpackPlugin([ //拷贝一些其他的文件插件
            { from: './doc', to: './doc' }
        ]),
        // new Happypack({
        //     id: 'js',
        //     use: [{
        //         loader: 'babel-loader',
        //         options: {
        //             presets: [
        //                 '@babel/preset-env'
        //             ]
        //         }
        //     }]

        // }),
        new webpack.BannerPlugin('make 2019'), //在每个文件头部加注释
        new MiniCssExtractPlugin({
            filename: 'main.css'
        })
    ],
    module: {
        noParse: /jquery/,//不去解析jQuery中的依赖库
        rules: [
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                //url-loader 做限制小于limit限制 用base64转换
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        outputPath: 'img/'
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,//忽略node_modules中的JS
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                },
                // use: 'Happypack/loader?id=js'
            },
            {
                test: /\.css$/,
                //css-loader 用于@import语法
                //style-loader 把css放到head标签中
                //loader有顺序 数组中从右向左执行
                //可以写成对象格式
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                //css-loader 用于@import语法
                //style-loader 把css放到head标签中
                //loader有顺序 数组中从右向左执行
                //postcss-loader 处理浏览器前缀写在他们两之前
                //可以写成对象格式
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
}