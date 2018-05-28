/**
 * Created by pengchaoyang on 2018/5/25
 */
const parentCodeScoped = require('../lib/parentCodeScoped');
const expect = require('chai').expect;
let scopeCode='xxxyyy'
let prefix='_scoped_'
let defaultPrefixedScopeCode=prefix+scopeCode
describe('css 空白压缩', function() {
    it('多个空白应变成为一个空格', function() {
        let css=`
         h2{
            
            color:#444;
            
           }`
        expect(parentCodeScoped(css,scopeCode)).to.be.equal(`.${defaultPrefixedScopeCode} h2 { color:#444; }`);
    });
});

describe('?string 形式的css', function() {
    it('tagName 前应该添加scopeCode', function() {
        let css=`h2{
            color:#444;
        }`
        expect(parentCodeScoped(css,scopeCode)).to.be.equal(`.${defaultPrefixedScopeCode} h2 { color:#444; }`);
    });
    it('class 前应该添加scopeCode', function() {
        let css=`.title{
            color:#444;
        }`
        expect(parentCodeScoped(css,scopeCode)).to.be.equal(`.${defaultPrefixedScopeCode} .title { color:#444; }`);
    });
    it('id 前应该添加scopeCode', function() {
        let css=`#title{
            color:#444;
        }`
        expect(parentCodeScoped(css,scopeCode)).to.be.equal(`.${defaultPrefixedScopeCode} #title { color:#444; }`);
    });

    it('tagName.class 前应该添加scopeCode', function() {
        let css=`h2.title{
            color:#444;
        }`
        expect(parentCodeScoped(css,scopeCode)).to.be.equal(`.${defaultPrefixedScopeCode} h2.title { color:#444; }`);
    });

    it('* 前应该添加scopeCode', function() {
        let css=`*{
            color:#444;
        }`
        expect(parentCodeScoped(css,scopeCode)).to.be.equal(`.${defaultPrefixedScopeCode} * { color:#444; }`);
    });
});

describe('parent ? child 形式的css', function() {
    it('parent child 前应该添加scopeCode', function() {
        let css=`.header .title{
            color:#444;
        }`
        expect(parentCodeScoped(css,scopeCode)).to.be.equal(`.${defaultPrefixedScopeCode} .header .title { color:#444; }`);
    });
    it('parent > child 前应该添加scopeCode', function() {
        let css=`.header > .title{
            color:#444;
        }`
        expect(parentCodeScoped(css,scopeCode)).to.be.equal(`.${defaultPrefixedScopeCode} .header > .title { color:#444; }`);
    });
    it('parent + child 前应该添加scopeCode', function() {
        let css=`.header + .title{
            color:#444;
        }`
        expect(parentCodeScoped(css,scopeCode)).to.be.equal(`.${defaultPrefixedScopeCode} .header + .title { color:#444; }`);
    });
    it('parent ~ child 前应该添加scopeCode', function() {
        let css=`.header ~ .title{
            color:#444;
        }`
        expect(parentCodeScoped(css,scopeCode)).to.be.equal(`.${defaultPrefixedScopeCode} .header ~ .title { color:#444; }`);
    });
});

//伪类选择器
describe('parent:string 形式的css', function() {
    it('parent:string 前应该添加scopeCode', function() {
        let css=`.title:hover{
            color:#444;
        }`
        expect(parentCodeScoped(css,scopeCode)).to.be.equal(`.${defaultPrefixedScopeCode} .title:hover { color:#444; }`);
    });
    it('parent::string 前应该添加scopeCode', function() {
        let css=`.title::after{
            color:#444;
        }`
        expect(parentCodeScoped(css,scopeCode)).to.be.equal(`.${defaultPrefixedScopeCode} .title::after { color:#444; }`);
    });
});

//属性选择器
describe('parent[string] 形式的css', function() {
    it('parent[string] 前应该添加scopeCode', function() {
        let css=`.title[href^="https"]{
            color:#444;
        }`
        expect(parentCodeScoped(css,scopeCode)).to.be.equal(`.${defaultPrefixedScopeCode} .title[href^="https"] { color:#444; }`);
    });
    it('[string] 前应该添加scopeCode', function() {
        let css=`[href^="https"]{
            color:#444;
        }`
        expect(parentCodeScoped(css,scopeCode)).to.be.equal(`.${defaultPrefixedScopeCode} [href^="https"] { color:#444; }`);
    });
});

//媒体查询
describe('@media() 形式的css', function() {
    it('@media(){} 内应该添加scopeCode', function() {
        let css=`@media (min-width: 1500px) {
            .container {
                width: 1450px;
            }
        }`
        expect(parentCodeScoped(css,scopeCode))
            .to.be.equal(`@media (min-width: 1500px) { .${defaultPrefixedScopeCode} .container { width: 1450px; } }`);
    });
    it('@media(){} 内应该添加scopeCode', function() {
        let css=`@media (min-width: 1500px) {
            .container {
                width: 1450px;
            }
            a{
                color:#444;
            }
        }`
        expect(parentCodeScoped(css,scopeCode))
            .to.be.equal(`@media (min-width: 1500px) { .${defaultPrefixedScopeCode} .container { width: 1450px; }\n.${defaultPrefixedScopeCode} a { color:#444; } }`);
    });
});

//动画
describe('@[]keyframes 保持原样输出', function() {
    it('keyframes  前应该添加scopeCode', function() {
        let css=`@keyframes move_eye{
            from { margin-left:-20%; }
            to { margin-left:100%; }
        }`
        expect(parentCodeScoped(css,scopeCode))
            .to.be.equal(`@keyframes move_eye { from { margin-left:-20%; }\nto { margin-left:100%; } }`);
    });

});

//特殊属性的
describe('{} 内特殊属性应该原样输出', function() {
    it('rgba()  里有逗号应该原样输出', function() {
        let css=`.link-blue{
            color:rgba(0, 0, 255, 0.75);
        }`
        expect(parentCodeScoped(css,scopeCode))
            .to.be.equal(`.${defaultPrefixedScopeCode} .link-blue { color:rgba(0, 0, 255, 0.75); }`);
    });

});