/**
 * 为传入的css所有选择器添加一个父类选择器，为防止替换了常见字符，默认添加prefix
 * @param style
 * @param parent
 * @returns {string}
 */
function scoped (style,parent) {
    //Css class name cannot start with a number
    if(/^[0-9]/.test(parent)){
        parent='_'+parent
    }
    //对大括号外的css处理
    var css=normalCssScoped(style,parent);
    //对媒体查询@media(){}里的代码进行普通css处理
    //(?<=exp) 匹配exp后面的位置
    var match=css.match(/(?<=@media.*\(.*\) \{)(([^\{\}]*\{[^\{\}]+\}[^\{\}]*)+)(?<=\})/g)||[]
    match.forEach(function ( innerCss ) {
        css = css.replace(innerCss, ' '+normalCssScoped(innerCss,parent));
    })
    return css
}

/**
 * 替换不包含媒体查询、动画函数的基本css
 * @param style
 * @param parent
 * @returns {string}
 */
function normalCssScoped(style,parent){
    parent=`.${parent} `                         //要全局唯一，加prefix是为了防止parent过于简单
    var css = style
        .replace(/\/\*(.*)\*\//g, "")                         //去除注释
        .replace(/\s+/g, " ")                                 //空白压缩
        .replace(/\s*{/g, " {")                               //{前统一添加空格
        .replace(/\s*}/g, " }")                               //}前统一添加空格
        .replace(/}(\s[^}])/g, "}\n$1")                       //添加换行
        .replace(/^\s+/gm, "")                                //替换行首空白
        .replace(/^([^@}])/gm, parent+'$1')                //行首添加class
        .replace( /,/g, ','+parent);                       //,后面添加class
    //{   不包含{}的   { 不包含}的   不包含{}的  } }
    (css.match(/{(([^{}]*{[^{}]+}[^{}]*)*)}|{[^{}]*}/g)||[]).forEach(function ( v ) {                             //恢复{}里被替换坏掉的代码
        //恢复大括号里的字符串，不处理
        css = css.replace(v, v.replace(new RegExp(parent, "g"), ""));
    })
    return css
}

module.exports=scoped