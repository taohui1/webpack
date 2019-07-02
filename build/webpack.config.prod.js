const {smart} =require('webpack-merge');
const base = require('./webpack.config.base.js')

module.exports = smart(base,{
    mode:'production',

})