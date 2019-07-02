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
    entry: {
        home:'./src/index.js',
        other:'./src/other.js'
    },//入口
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
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'other.html',
            hash:true,
            chunks:['other']
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