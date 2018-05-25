/**
 * Created by pengchaoyang on 2018/5/25
 */
const parentCodeScoped = require('../lib/parentCodeScoped');
const expect = require('chai').expect;
const scopeCode='xxxyyy'
describe('css 空白压缩', function() {
    it('多个空白应变成为一个空格', function() {
        let css=`
         h2{
            
            color:#444;
            
           }`
        expect(parentCodeScoped(css,scopeCode)).to.be.equal(`.${scopeCode} h2{ color:#444; }\n`);
    });
});

describe('?string 形式的css', function() {
    it('tagName 前应该添加scopeCode', function() {
        let css=`h2{
            color:#444;
        }`
        expect(parentCodeScoped(css,scopeCode)).to.be.equal(`.${scopeCode} h2{ color:#444; }\n`);
    });
    it('class 前应该添加scopeCode', function() {
        let css=`.title{
            color:#444;
        }`
        expect(parentCodeScoped(css,scopeCode)).to.be.equal(`.${scopeCode} .title{ color:#444; }\n`);
    });
    it('id 前应该添加scopeCode', function() {
        let css=`#title{
            color:#444;
        }`
        expect(parentCodeScoped(css,scopeCode)).to.be.equal(`.${scopeCode} #title{ color:#444; }\n`);
    });
});

describe('parent ? child 形式的css', function() {
    it('parent child 前应该添加scopeCode', function() {
        let css=`.header .title{
            color:#444;
        }`
        expect(parentCodeScoped(css,scopeCode)).to.be.equal(`.${scopeCode} .header .title{ color:#444; }\n`);
    });
    it('parent > child 前应该添加scopeCode', function() {
        let css=`.header > .title{
            color:#444;
        }`
        expect(parentCodeScoped(css,scopeCode)).to.be.equal(`.${scopeCode} .header > .title{ color:#444; }\n`);
    });
    it('parent + child 前应该添加scopeCode', function() {
        let css=`.header + .title{
            color:#444;
        }`
        expect(parentCodeScoped(css,scopeCode)).to.be.equal(`.${scopeCode} .header + .title{ color:#444; }\n`);
    });
    it('parent ~ child 前应该添加scopeCode', function() {
        let css=`.header ~ .title{
            color:#444;
        }`
        expect(parentCodeScoped(css,scopeCode)).to.be.equal(`.${scopeCode} .header ~ .title{ color:#444; }\n`);
    });
});