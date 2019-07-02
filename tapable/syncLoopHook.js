let {SyncLoopHook} = require('tapable')

class lesson{
    constructor(){
        this.hooks={
            arch:new SyncLoopHook(['name'])
        }
    }
    tap(){
        this.hooks.arch.tap('node',function(name){
            console.log(name)
            return 'node玩的还不错' //不返回undefined就一直执行
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