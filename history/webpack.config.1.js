const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode:'development',
    // devServer:{
    //     port:3000,
    //     contentBase:"./build",
    //     progress:true,
    //     open:true  
    // },
    devtool:'cheap-moudle-eval-source-map',//增加源码映射  可以帮助我们找到源码错误地方
    //source-map 会生成js.map文件
    //eval-source-map 不会产生js.map文件
    //cheap-moudle-eval-source-map 不会产生列 不会生成js.map文件
    entry: {
        home:'./src/index.js'
    },//入口
    watch:true, //修改代码实时打包
    watchOptions:{
        poll:1000, //每秒 更新1000次
        aggregateTimeout:500, //防抖 我一直输入代码停止后500ms才打包
        ignored:/node_modules/ //不需要监控哪个文件
    },
    output: {
        path: path.resolve(__dirname, 'build'),//必须是绝对路径
        filename: 'js/[name].[hash:8].js'        //打包的文件名
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'home.html',
            hash:true,
            chunks:['home']
        }),
        new MiniCssExtractPlugin({
            filename:'main.css'
        })
    ],
    module:{
        rules:[
            {
                test:/\.html$/,
                use:'html-withimg-loader'
            },
            {
                test:/\.(png|jpg|gif)$/,
                //url-loader 做限制小于limit限制 用base64转换
                use:{
                    loader:'url-loader',
                    options:{
                        limit:1,
                        outputPath:'img/'
                    }
                }
            },
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            '@babel/preset-env'
                        ]
                    }
                }
            },
            {
                test:/\.css$/,
                //css-loader 用于@import语法
                //style-loader 把css放到head标签中
                //loader有顺序 数组中从右向左执行
                //可以写成对象格式
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                    ]
            },
            {
                test:/\.scss$/,
                //css-loader 用于@import语法
                //style-loader 把css放到head标签中
                //loader有顺序 数组中从右向左执行
                //postcss-loader 处理浏览器前缀写在他们两之前
                //可以写成对象格式
                use:[
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                    ]
            }
        ]
    }
}