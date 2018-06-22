# css-scoped

----------

![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)    ![npm](https://img.shields.io/npm/v/css-scoped.svg)  ![npm](https://img.shields.io/npm/dm/css-scoped.svg)  [![Build Status](https://travis-ci.org/secreter/scoped-css.svg?branch=master)](https://travis-ci.org/secreter/scoped-css)   [![Coveralls](https://img.shields.io/coveralls/secreter/scoped-css.svg)](https://coveralls.io/github/secreter/scoped-css)

 > Limit the css scope by adding a uniform parent selector name to the selector, which is useful in componentized development and rendering.


## Installation
-------
```javascript
npm i css-scoped -S
```

### Usage
-------
```javascript
const scope = require('css-scoped')
const scopedCss=scope(css,'parent')
```

### Examples
------
```javascript
const scope = require('css-scoped')
const css=`
h1, h2, h3, h4, h5, h6 {
    font-size: 14px;
}
a{
    color: #000;
}
.list-img-flex .job .job-mes span:not(:last-child):after {
    margin: 0 5px;
    position: relative;
}
@media (min-width: 1500px) and (orientation: landscape){
    .header ~ .title{
        color:#666;
    }
}
`
const scopedCss=scope(css,'handsome')
console.log(scopedCss)
```
> output
```css
.handsome h1,.handsome h2,.handsome h3,.handsome h4,.handsome h5,.handsome h6 { font-size: 14px; }
.handsome a { color: #000; }
.handsome .list-img-flex .job .job-mes span:not(:last-child):after { margin: 0 5px; position: relative; }
@media (min-width: 1500px) and (orientation: landscape) { .handsome .header ~ .title { color:#666; } } 
```

### License
-------
[MIT][1]


  [1]: https://github.com/secreter/scoped-css/blob/master/LICENSE