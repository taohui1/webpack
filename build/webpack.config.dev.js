const {smart} =require('webpack-merge');
const base = require('./webpack.config.base.js')

module.exports = smart(base,{
    mode:'development',
    devServer:{
        port:3000,
        contentBase:"./dist",
        progress:true,
        open:true,
        proxy:{
            '/api':{
                target:'http://localhost:8888',
                pathRewrite:{'/api':''}
            }
        }  
    },
    watch:true, //修改代码实时打包
    watchOptions:{
        poll:1000, //每秒 更新1000次
        aggregateTimeout:500, //防抖 我一直输入代码停止后500ms才打包
        ignored:/node_modules/ //不需要监控哪个文件
    },
})