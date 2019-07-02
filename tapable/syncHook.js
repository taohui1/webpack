let {SyncHook} = require('tapable')

class lesson{
    constructor(){
        this.hooks={
            arch:new SyncHook(['name'])
        }
    }
    tap(){
        this.hooks.arch.tap('node',function(name){
            console.log(name)
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