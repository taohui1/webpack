let {SyncBailHook} = require('tapable')

class lesson{
    constructor(){
        this.hooks={
            arch:new SyncBailHook(['name'])
        }
    }
    tap(){
        this.hooks.arch.tap('node',function(name){
            console.log(name)
            return '不想往下学了'   //当一旦某个返回值结果不为undefined便结束执行列表中的插件
        })
        this.hooks.arch.tap('vue',function(name){
            console.log(name)
        })
    }
    start(){
        this.hooks.arch.call("pepsi")
    }
}

let pepsi = new lesson;
pepsi.tap();
pepsi.start();