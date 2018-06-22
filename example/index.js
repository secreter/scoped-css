/**
 * Created by pengchaoyang on 2018/6/22
 */
const scope = require('../lib/scope')
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