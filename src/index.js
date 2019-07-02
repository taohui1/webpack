import str from './other'
console.log(str)

if(module.hot){
    module.hot.accept('./other',function(){
        const str = require('./other') 
        console.log(str)
    })
}