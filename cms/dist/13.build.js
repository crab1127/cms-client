webpackJsonp([13],{29:function(o,e){"use strict";o.exports={data:function(){return{user:{name:"",password:"",isRemember:0}}},methods:{submit:function(){var o=this;$.ajax({url:domain+"/login",type:"POST",data:this.user}).done(function(e){if(1==e.status){localStorage.name=o.user.name;var s=decodeURIComponent(o.$route.query.redirect||"home");o.$route.router.go(s)}else alert("用户名或密码不匹配")})}}}},44:function(o,e,s){e=o.exports=s(4)(),e.push([o.id,".login-logo a{color:#fff}",""])},59:function(o,e){o.exports='<div class=login-box> <div class=login-logo> <a href=/ > <b>广贸</b> CMS </a> </div> <div class=login-box-body> <p class=login-box-msg>系统管理员登录</p> <div class="alert alert-danger hide" role=alert id=errorInfo> <i class="fa fa-exclamation-triangle"></i> &nbsp;用户名或密码不匹配 </div> <form name=loginForm v-ajax-submit @submit.prevent=submit> <div class="form-group has-feedback"> <input type=text class=form-control placeholder=请输入用户名 v-model=user.name required> <span class="glyphicon glyphicon-user form-control-feedback"></span> </div> <div class="form-group has-feedback"> <input type=password class=form-control placeholder=请输入密码 v-model=user.password required> <span class="glyphicon glyphicon-lock form-control-feedback"></span> </div> <div class=row> <div class=col-xs-8> <div class="checkbox icheck hide"> <label><input type=checkbox value=1 v-model=user.isRemember>Remember Me</label> </div> </div> <div class=col-xs-4> <button type=submit class="btn btn-primary btn-block btn-flat">登录</button> </div> </div> </form> </div> </div>'},75:function(o,e,s){var t,r;s(91),t=s(29),r=s(59),o.exports=t||{},o.exports.__esModule&&(o.exports=o.exports["default"]),r&&(("function"==typeof o.exports?o.exports.options||(o.exports.options={}):o.exports).template=r)},91:function(o,e,s){var t=s(44);"string"==typeof t&&(t=[[o.id,t,""]]);s(5)(t,{});t.locals&&(o.exports=t.locals)}});
//# sourceMappingURL=13.build.js.map