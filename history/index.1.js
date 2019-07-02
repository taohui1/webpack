let btn = document.createElement('button')
btn.innerHTML='你好啊'

btn.addEventListener('click',function(){
    const logtext = import('./other')
    console.log(logtext)
    logtext.then(res=>{
        console.log(res.default)
    })
})
document.body.appendChild(btn)