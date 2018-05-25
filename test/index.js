/**
 * Created by pengchaoyang on 2018/5/25
 */
const scoped=require('../lib/parentCodeScoped')
var style=`@media (min-width: 1350px) {
    .container {
        width: 1300px;
    }
}
@media (min-width: 1500px) {
    .container {
        width: 1450px;
    }
}

/*container额外样式*/
.custom-container{
    margin-top: 70px;
}

/* 添加删除图标的颜色*/
.link-blue{
    color:rgba(0, 0, 255, 0.75);
}
.link-blue:visited,.link-blue:hover,.link-blue:active{
    color:rgba(0, 0, 255, 1);
}
.link-red{
    color:rgba(255, 0, 0, 0.75);
}
.link-red:visited,.link-red:hover,.link-red:active{
    color:rgba(255, 0, 0, 1)
}
.link-green{
    color:rgba(0, 128, 0, 0.75)
}
.link-green:visited,.link-green:hover,.link-green:active{
    color:rgba(0, 128, 0, 1)
}
.custom-required{
    color: rgba(255, 0, 0, 1)
}

/*登录页样式*/
.login-form-wrap{
    width: 450px;
    padding: 15px;
    margin: 30px auto 0;
}
.login-form-wrap .form-control{
    position: relative;
    height: auto;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px;
    font-size: 16px;
}
.login-title-wrap{
    border-bottom: 1px solid #d5d5d5;
}
.login-title{
    margin-bottom: 10px;
}
.login-label{
    font-size: 18px;
    line-height: 40px;
    text-align: right;
    padding: 0;
}

/*react-bootstrap-table td内容换行*/
.react-bs-table table td{
    white-space:normal;
    word-wrap: break-word;
}
.react-bs-table table td .cell-content{
    max-height: 100px;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
}

/*form的label对其*/
.custom-row .control-label {
    line-height: 34px;
    text-align: right;
}

.custom-row-left > .control-label {
    line-height: 34px;
    text-align: left;
}

.control-label ~ .align-center{
    height: 34px;
    display: flex;
    align-items: center;
}

.custom-row,.custom-row-left .checkbox-radio{
    margin-top: 5px;
}


.break-word {
    word-wrap: break-word;
    word-break: normal;
}

.custom-btn{
    margin-bottom: 5px;
}

.badge.custom-info-badge {
    background-color: green;
}

.badge.custom-warn-badge {
    background-color: #ec971f;
}

.badge.custom-danger-badge {
    background-color: #c9302c;
}

/*steps custom style */
.steps-wrap .rc-steps .rc-steps-item .rc-steps-step{
    cursor: pointer;
}

.anticon {
    display: inline-block;
    font-style: normal;
    vertical-align: baseline;
    text-align: center;
    text-transform: none;
    line-height: 1;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.anticon:before {
    display: block;
    font-family: "anticon" !important;
}

/*label 附加样式 */
label.required:before{
    content : '*';
    color : red;
    font-size: 12px;
    margin-right: 4px;
    line-height: 1px;
    display: inline-block;
}

label .label-editor{
    margin-left: 5px;
}

label a.label-editor2{
    float: right;
}

/* 分割线 */
.cut-off-line{
    width: 95%;
    margin: 5px auto 15px;
    border-top: 1px solid #ddd;
    height: 1px;
}

.react-bs-table .status-track-wrap {
    margin: -8px;
    max-height: 300px;
    overflow-y: scroll;
}
.react-bs-table .status-track-wrap table {
    width: 100%;
}
.react-bs-table .status-track-wrap th {
    padding: 2px 5px;
}
.react-bs-table .status-track-wrap td {
    border-top: 1px solid #CCC;
    padding: 2px 5px;
    white-space: nowrap;
}
.react-bs-table .status-track-wrap th + th,
.react-bs-table .status-track-wrap td + td {
    border-left: 1px solid #CCC;
}

.AndroidTaskExample img {
    max-width: 100%;
    border: gray solid 1px;
    border-radius: 5px;
    box-shadow: 10px 10px 5px #888888;
}


.nav-customer {
    margin-bottom: 10px;
}

.nav-customer li a{
    padding: 7px 11px;
    font-size: 13px;
}

.small-table-wrap .table > thead > tr > th,
.small-table-wrap .table > tbody > tr > th,
.small-table-wrap .table > tfoot > tr > th,
.small-table-wrap .table > thead > tr > td,
.small-table-wrap .table > tbody > tr > td,
.small-table-wrap .table > tfoot > tr > td {
    font-size: 12px;
    padding: 6px 5px 3px
}

a[href]{
	color：#444;
}
.anim-opacity-show{
    opacity : 1;
    transition:opacity 1s;
}

.anim-opacity-hide{
    opacity : 0;
}`

let css=scoped(style,'myclassid')
console.log(css)
