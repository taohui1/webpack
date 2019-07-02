let {SyncWaterfallHook} = require('tapable')

class lesson{
    constructor(){
        this.hooks={
            arch:new SyncWaterfallHook(['name'])
        }
    }
    tap(){
        this.hooks.arch.tap('node',function(name){
            console.log(name)
            return 'node玩的还不错' //上一个插件执行结果当作下一个插件的入参
        })
        this.hooks.arch.tap('vue',function(data){
            console.log(data)
        })
    }
    start(){
        this.hooks.arch.call("pepsi")
    }
}

let pepsi = new lesson;
pepsi.tap();
pepsi.start();