/**
 * Created by pengchaoyang on 2018/5/25
 */
const scope = require('../lib/scope')
const expect = require('chai').expect
let scopeCode = 'parent'

/**
 * Blank compression
 */
describe('Blank compression', function () {
    it('Multiple blank strains should become a space', function () {
        let css = `
         h2{
            
            color:#444;
            
           }`
        expect(scope(css, scopeCode)).to.be.equal(`.${scopeCode} h2 { color:#444; }`)
    })
})

/**
 * Css normal selector
 */
describe('Css normal selector', function () {
    it('tagName should be `parent tagName`', function () {
        let css = `h2{
            color:#444;
        }`
        expect(scope(css, scopeCode)).to.be.equal(`.${scopeCode} h2 { color:#444; }`)
    })
    it('class should be `parent class`', function () {
        let css = `.title{
            color:#444;
        }`
        expect(scope(css, scopeCode)).to.be.equal(`.${scopeCode} .title { color:#444; }`)
    })
    it('id should be `parent id`', function () {
        let css = `#title{
            color:#444;
        }`
        expect(scope(css, scopeCode)).to.be.equal(`.${scopeCode} #title { color:#444; }`)
    })

    it('tagName.class should be `parent tagName.class`', function () {
        let css = `h2.title{
            color:#444;
        }`
        expect(scope(css, scopeCode)).to.be.equal(`.${scopeCode} h2.title { color:#444; }`)
    })

    it('* should be `parent *`', function () {
        let css = `*{
            color:#444;
        }`
        expect(scope(css, scopeCode)).to.be.equal(`.${scopeCode} * { color:#444; }`)
    })
})

/**
 * Css sibling selector
 */
describe('Css sibling and children selector', function () {
    it('selectorP selectorC should be `parent selectorP selectorC`', function () {
        let css = `.header .title{
            color:#444;
        }`
        expect(scope(css, scopeCode)).to.be.equal(`.${scopeCode} .header .title { color:#444; }`)
    })
    it('selectorP > selectorC be `parent selectorP > selectorC`', function () {
        let css = `.header > .title{
            color:#444;
        }`
        expect(scope(css, scopeCode)).to.be.equal(`.${scopeCode} .header > .title { color:#444; }`)
    })
    it('selectorP + selectorC be `parent selectorP + selectorC`', function () {
        let css = `.header + .title{
            color:#444;
        }`
        expect(scope(css, scopeCode)).to.be.equal(`.${scopeCode} .header + .title { color:#444; }`)
    })
    it('selectorP ~ selectorC be `parent selectorP ~ selectorC`', function () {
        let css = `.header ~ .title{
            color:#444;
        }`
        expect(scope(css, scopeCode)).to.be.equal(`.${scopeCode} .header ~ .title { color:#444; }`)
    })
})

/**
 * Css pseudo-class selector
 */
describe('Css pseudo-class selector', function () {
    it('selector:pseudo-class should be `selector:pseudo-class`', function () {
        let css = `.title:hover{
            color:#444;
        }`
        expect(scope(css, scopeCode)).to.be.equal(`.${scopeCode} .title:hover { color:#444; }`)
    })
    it('selector::pseudo-class should be `selector::pseudo-class`', function () {
        let css = `.title::after{
            color:#444;
        }`
        expect(scope(css, scopeCode)).to.be.equal(`.${scopeCode} .title::after { color:#444; }`)
    })
})

/**
 * Css attribute selector
 */
describe('Css attribute selector', function () {
    it('selector[attribute] should be `parent selector[attribute]`', function () {
        let css = `.title[href^="https"]{
            color:#444;
        }`
        expect(scope(css, scopeCode)).to.be.equal(`.${scopeCode} .title[href^="https"] { color:#444; }`)
    })
    it('[attribute] should be `parent [attribute]`', function () {
        let css = `[href^="https"]{
            color:#444;
        }`
        expect(scope(css, scopeCode)).to.be.equal(`.${scopeCode} [href^="https"] { color:#444; }`)
    })
})

/**
 * Css media query
 */
describe('Css media query', function () {
    it('@media(){} Css media query`s innerContent should to be `parent selector`', function () {
        let css = `@media (min-width: 1500px) {
            .container {
                width: 1450px;
            }
        }`
        expect(scope(css, scopeCode))
            .to.be.equal(`@media (min-width: 1500px) { .${scopeCode} .container { width: 1450px; } }`)
    })
    it('@media() and (){} Css media query`s innerContent should to be `parent selector`', function () {
        let css = `@media (min-width: 1500px) and (orientation: landscape) {
            .container {
                width: 1450px;
            }
            a{
                color:#444;
            }
        }`
        expect(scope(css, scopeCode))
            .to.be.equal(`@media (min-width: 1500px) and (orientation: landscape) { .${scopeCode} .container { width: 1450px; }\n.${scopeCode} a { color:#444; } }`)
    })
})

/**
 * Css keyframes should output content as it is
 */
describe('Css keyframes', function () {
    it('@keyframes [name]{} should output content as it is', function () {
        let css = `@keyframes move_eye{
            from { margin-left:-20%; }
            to { margin-left:100%; }
        }`
        expect(scope(css, scopeCode))
            .to.be.equal(`@keyframes move_eye { from { margin-left:-20%; }\n to { margin-left:100%; } }`)
    })

})

/**
 * Braces have special content to interfere with the replacement
 */
describe('Braces have special content', function () {
    it('rgba() should output content as it is', function () {
        let css = `.link-blue{
            color:rgba(0, 0, 255, 0.75);
        }`
        expect(scope(css, scopeCode))
            .to.be.equal(`.${scopeCode} .link-blue { color:rgba(0, 0, 255, 0.75); }`)
    })

})

/**
 * Wrong input css
 */
describe('Wrong input css', function () {
    it('should be `parent string`', function () {
        let css = `.link-blue`
        expect(scope(css, scopeCode))
            .to.be.equal(`.${scopeCode} .link-blue`)
    })

    it('scopeCode satrt with number should be added `_`', function () {
        let css = `.link-blue{
            color:rgba(0, 0, 255, 0.75);
        }`
        scopeCode='9527'
        expect(scope(css, scopeCode))
            .to.be.equal(`._${scopeCode} .link-blue { color:rgba(0, 0, 255, 0.75); }`)
    })

})