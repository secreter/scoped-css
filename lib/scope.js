/**
 * Add a parent selector to all selectors passed in css
 * @param style
 * @param parent
 * @returns {string}
 */
function scoped (style, parent) {
    //Css class name cannot start with a number
    if (/^[0-9]/.test(parent)) {
        parent = '_' + parent
    }

    //Ensure global uniqueness
    var symbol = '____'
    parent = '.' + symbol + parent + symbol

    //Handle normal css
    var css = normalCssScoped(style, parent)

    //Handle special css
    var match = css.match(/(?<=@media.*\(.*\) \{)(([^\{\}]*\{[^\{\}]+\}[^\{\}]*)+)(?<=\})/g) || []
    match.forEach(function (innerCss) {
        css = css.replace(innerCss, ' ' + normalCssScoped(innerCss, parent))
    })

    return css.replace(new RegExp(symbol, 'gm'), '')
}

/**
 * Replace basic css without media queries, animation functions
 * @param style
 * @param parent
 * @returns {string}
 */
function normalCssScoped (style, parent) {

    var css = style
        .replace(/\/\*(.*)\*\//g, '')
        .replace(/\s+/g, ' ')                                 //Compressed blank
        .replace(/\s*{/g, ' {')
        .replace(/\s*}/g, ' }')
        .replace(/}(\s[^}])/g, '}\n$1')
        .replace(/^\s+/gm, '')
        .replace(/^([^@}])/gm, parent + ' $1')
        .replace(/,/g, ',' + parent);

    (css.match(/{(([^{}]*{[^{}]+}[^{}]*)*)}|{[^{}]*}/g) || []).forEach(function (v) {                             //恢复{}里被替换坏掉的代码
        //Restore the string in braces
        css = css.replace(v, v.replace(new RegExp(parent, 'g'), ''))
    })

    return css
}

module.exports = scoped