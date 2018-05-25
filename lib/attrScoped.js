/*!
    from:https://gitee.com/starmagic/css-scoped/blob/master/%E5%8E%9F%E7%94%9F%E4%B8%8B%E8%BD%BD/1.0.0/scoped-css.js#
 *  scoped-css.js v1.0.0
 *	Copyright 2018, Frank Chao
 *	Released under the MIT license
 */

!(function ( window, document ) {

    function Query ( elem ) {
        return document.querySelector(elem);
    }
    document.addEventListener("DOMContentLoaded", function () {
        var Head = Query("head"),
            Body = Query("body");
        function compile () {
            var  Scoped = Body.querySelectorAll("style[scoped]");
            if ( !Scoped.length ) {
                return;
            }
            for ( var i = 0, j = Scoped.length; i < j; i++ ) {
                var spd = Scoped[i],
                    parent = spd.parentNode;
                var style = spd.innerHTML.replace(/\s+/g, " ").trim();
                if ( style ) {
                    var random = "scoped_" + Math.random().toString(21).substr(2, 10);
                    [].slice.call(parent.getElementsByTagName("*")).forEach(function ( v ) {
                        v.setAttribute(random, "");
                    });
                    parent.setAttribute(random, "");
                    var css = style
                        .replace(/\/\*(.*)\*\//g, "")
                        .replace(/(\s)([>+~,=;:"'])/g, "$2")
                        .replace(/([>+~,=;:"'])(\s)/g, "$1")
                        .replace(/\[/g, "[" + random + "][")
                        .replace(/(\w)([>+~,])/g, "$1[" + random + "]$2")
                        .replace(/\{/g, " {")
                        .replace(/((\s)\[)|(\[(\s))/g, "[")
                        .replace(/(\s)\]/g, "]")
                        .replace(/(\s)\)/g, ")")
                        .replace(/(\((\s))|((\s)\()/g, "(")
                        .replace(/(\s)\}/g, "}")
                        .replace(/(\w)(\s)/g, "$1[" + random + "] ")
                        .replace(/(\w)\./g, "$1[" + random + "].")
                        .replace(/\s+/g, " ")
                        .replace(/\}/g, "}\n");
                    var special = ["link", "visited", "active", "hover", "focus", "first-letter", "first-line", "first-child", "before", "after", "first-of-type", "last-of-type", "only-of-type", "only-child", "last-child", "nth-of-type", "nth-last-child", "nth-of-type", "nth-child", "nth-last-of-type", "empty", "not", "selection", "enabled", "disabled", "checked", "target", ":-webkit-input-placeholder", "-ms-input-placeholder", "-moz-placeholder", ":-webkit-scrollbar", ":-webkit-scrollbar-thumb", ":-webkit-scrollbar-track", ":-webkit-scrollbar-button", ":-webkit-scrollbar-track-piece", ":-webkit-scrollbar-corner", ":-webkit-resizer"];
                    special.forEach(function ( v ) {
                        if ( css.indexOf(v) > -1 ) {
                            css = css.replace(new RegExp(":" + v + "\\[" + random + "\\]", "g"), ":" + v).replace(new RegExp("([\\w])\\:" + v, "g"), "$1[" + random + "]:" + v);
                        }
                    })
                    css = css.replace(new RegExp("\\(\\[" + random + "\\]", "g"), "(");
                    css.match(/\{(.*?)\}/g).forEach(function ( v ) {
                        css = css.replace(v, v.replace(new RegExp("\\[" + random + "\\]", "g"), ""));
                    })
                    css = css.replace(/([>+~])/g, " $1 ").replace(/,/g, ", ");
                    var tag = document.createElement("style");
                    tag.type = "text/css";
                    tag.textContent = css;
                    Head.appendChild(tag);
                    spd.parentNode.removeChild(spd);
                }
            }
        }
        compile();
        window.setInterval(compile, 13);
    });

})( window, document );