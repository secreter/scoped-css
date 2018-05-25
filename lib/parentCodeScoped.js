/**
 * Created by pengchaoyang on 2018/5/25
 */

function scoped (style,scopeCode) {
    scopeCode=`.${scopeCode} `                                //要全局唯一
    var css = style
        .replace(/\/\*(.*)\*\//g, "")                         //去除注释
        .replace(/\s+/g, " ")                                 //空白压缩
        .replace(/\}/g, "}\n")                                //添加换行
        .replace(/^\s+/gm, "")                                //替换行首空白
        .replace(/^[^@\}]/gm, scopeCode)                      //行首添加class
        .replace(/,/g, ', '+scopeCode)                        //,后面添加class

    css.match(/\{(.*?)\}/g).forEach(function ( v ) {                             //恢复{}里被替换坏掉的代码
        css = css.replace(v, v.replace(new RegExp(scopeCode, "g"), ""));
    })
    return css
}

module.exports=scoped