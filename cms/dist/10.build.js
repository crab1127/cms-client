webpackJsonp([10],{1:function(t,e,o){t.exports={"default":o(2),__esModule:!0}},2:function(t,e,o){var i=o(3),n=i.JSON||(i.JSON={stringify:JSON.stringify});t.exports=function(t){return n.stringify.apply(n,arguments)}},3:function(t,e){var o=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=o)},9:function(t,e){function o(t,e){var i,n=[];for(var a in t)t[a].parentid==e&&(n.push(t[a]),t[a].children=[],i=o(t,t[a]._id),i.length>0&&(t[a].children=i));return n}t.exports=o},35:function(t,e,o){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}var n=o(1),a=i(n),r=o(9),s={parentid:"0",ishidden:1,sortId:10,children:[]};t.exports={data:function(){return{showModal:!1,moveModal:!1,categorys:[],currentCategory:$.extend({},s),currentCategoryIndex:0,newCategory:$.extend({},s),moveCategory:{target:null,originId:null,originLevel:null}}},route:{data:function(t){this.getCategory()}},methods:{getCategory:function(){var t=this;$.ajax({url:domain+"/category",type:"GET"}).done(function(e){if(1==e.status){var o=r(e.data,0);t.categorys=o,t.currentCategory=$.extend({},s,o[t.currentCategoryIndex])}})},addCategory:function(t,e,o){e&&(s.parentid=e),this.newCategory=$.extend({},s,{zIndex:t,index:o}),this.showModal=!0},editCategory:function(t,e,o){var i=this;o=o||this.categorys[e],e=e||[],delete o.children,i.newCategory=$.extend({},o,{zIndex:t,index:e}),this.showModal=!0},saveCategory:function(){var t=this,e=JSON.parse((0,a["default"])(t.newCategory));return $.ajax({url:domain+"/category",type:"post",dataType:"json",data:e}).done(function(o){if(1==o.status){if(e._id)switch(e.zIndex){case 1:t.categorys.$set(t.currentCategoryIndex,e);break;case 2:t.currentCategory.children.$set(t.newCategory.index[0],e);break;case 3:t.currentCategory.children[t.newCategory.index[0]].children.$set(t.newCategory.index[1],e)}else switch(e._id=o.data._id,e.zIndex){case 1:t.categorys.push(e);break;case 2:t.currentCategory.children.push(e);break;case 3:t.currentCategory.children[t.newCategory.index].children.push(e)}t.showModal=!1}}),!1},delCategory:function(t,e,o){var i=this;o=o||this.currentCategory._id,confirm("确定删除？")&&o&&$.ajax({url:domain+"/category/"+o,type:"delete"}).done(function(o){if(1==o.status)switch(t){case 1:i.categorys.splice(i.currentCategoryIndex,1);var n=i.currentCategoryIndex>=i.categorys.length?i.categorys.length:i.currentCategoryIndex;i.currentCategory=i.categorys[n];break;case 2:i.currentCategory.children.splice(e[0],1);break;case 3:i.currentCategory.children[e[0]].children.splice(e[1],1)}})},updateCache:function(){$.ajax({url:domain+"/category/cache",type:"POST"}).done(function(t){console.log(t),1==t.status&&alert("更新成功")})},move:function(t,e,o){this.moveModal=!0,this.moveCategory.originLevel=t,this.moveCategory.originId=o,this.moveCategory.originCoord=e},saveMove:function(){if(confirm("确定移动？")){var t=this,e={targetId:this.moveCategory.target.split("|")[2]};if(2==this.moveCategory.target.split("|")[0]&&2==this.moveCategory.originLevel){var o=[this.moveCategory.originId],i=this.currentCategory.children[this.moveCategory.originCoord[0]];i.children.forEach(function(t){o.push(t._id)}),e.originIds=o.join(",")}else e.originIds=this.moveCategory.originId;$.ajax({url:domain+"/category/move",type:"POST",data:e}).done(function(e){1==e.status&&(t.getCategory(),t.moveModal=!1)})}},switchCategory:function(t,e){this.currentCategoryIndex=e,this.currentCategory=this.categorys[e]}}}},48:function(t,e,o){e=t.exports=o(4)(),e.push([t.id,".contacts-list li{padding:0;line-height:30px}.alert{background:#f4f4f4;border:1px solid #ddd}",""])},65:function(t,e){t.exports='<side-menu></side-menu> <div class=content-wrapper> <div class=content-header> <h1>类目管理</h1> </div> <div class=content> <div class=mb10 style=""> <button class="btn btn-primary" @click=addCategory(1)> <span class="glyphicon glyphicon-plus"></span> 添加顶级类目</button> <button class="btn btn-primary" @click=updateCache()>更新缓存</button> </div> <div class="nav-tabs-custom theme-panel"> <ul class="nav nav-tabs"> <template v-for="item in categorys"> <li v-if="$index == currentCategoryIndex" class=active @click="switchCategory(item._id, $index)"> <a href=javascript:;> {{ item.name }} </a> </li> <li v-if="$index != currentCategoryIndex" @click="switchCategory(item._id, $index)"> <a href=javascript:;> {{ item.name }} </a> </li> </template> </ul> <div class=tab-content v-if=currentCategory._id> <div class=mb10> <div class=btn-group> <button type=button class="btn btn-default" @click="addCategory(2, currentCategory._id)">添加子类目</button> <button type=button class="btn btn-default" @click="editCategory(1, currentCategoryIndex)">编辑类目</button> <button type=button class="btn btn-default" @click="delCategory(1, currentCategoryIndex)">删除类目</button> </div> </div> <div class=row> <div class="col-md-4 col-md-6" v-for="(i, items) in currentCategory.children"> <div class="box box-default"> <div class="box-header with-border"> <h3 class=box-title> {{items.name}} </h3> <div class="box-tools pull-right"> <button type=button class="btn btn-box-tool" @click="addCategory(3, items._id, i)"> 添加子类 </button> <button type=button class="btn btn-box-tool" @click="move(2, [i], items._id)"> 移动 </button> <button type=button class="btn btn-box-tool" @click="editCategory(2, [i], items)"> 编辑 </button> <button type=button class="btn btn-box-tool" @click="delCategory(2, [i], items._id)"> 删除 </button> </div> </div> <div class=box-body style="display: block"> <ul class=contacts-list> <li class="" v-for="(index, item) in items.children"> <span class=pull-right> <button type=button class="btn btn-box-tool" @click="move(3, [i, index], item._id)"> 移动 </button> <button type=button class="btn btn-box-tool" @click="editCategory(3, [i, index], item)"> 编辑 </button> <button type=button class="btn btn-box-tool" @click="delCategory(3, [i, index], item._id)"> 删除 </button> </span> {{ item.name }} </li> </ul> </div> </div> </div> </div> </div> </div> </div> </div> <modal :show.sync=showModal title=类目> <div slot=modal-body class=modal-body> <form class=form-horizontal v-ajax-submit @submit.prevent=saveCategory> <div class=form-horizontal> <div class=form-group> <label for=inputEmail3 class="col-sm-2 control-label">名字</label> <div class=col-sm-10> <input type=text class=form-control v-model=newCategory.name required> </div> </div> <div class=form-group> <label for=inputEmail3 class="col-sm-2 control-label">链接</label> <div class=col-sm-10> <input type=url class=form-control v-model=newCategory.link> </div> </div> <div class=form-group> <label for=inputEmail3 class="col-sm-2 control-label">排序</label> <div class=col-sm-10> <input type=number class=form-control v-model=newCategory.sortId> </div> </div> <div class=form-group> <label for=inputPassword3 class="col-sm-2 control-label">是否显示</label> <div class=col-sm-10> <input type=radio name=ishidden value=1 v-model=newCategory.ishidden> 是 <input type=radio name=ishidden value=0 v-model=newCategory.ishidden> 否 </div> </div> <div class=form-group> <div class="col-sm-10 col-sm-offset-2"> <button class="btn btn-primary" type=submit> 提交 </button> </div> </div> </div> </form> </div> <div slot=modal-footer></div> </modal> <modal :show.sync=moveModal title=移动类目> <div slot=modal-body class=modal-body> <div class=alert> <strong>提示:</strong> <p>移动后， 不能还原，请谨慎修改 <br> 类目最多只有3级； 移动到1级菜单时，不改变该菜单的子菜单；移动到2级菜单时，该菜单的子菜单也一并移动。 </p> </div> <form class=form-horizontal v-ajax-submit @submit.prevent=saveMove> <div class=form-group> <label for=inputEmail3 class="col-sm-2 control-label">类目</label> <div class=col-sm-10> <select v-model=moveCategory.target class=form-control> <template v-for="(x, menus) in categorys"> <option :value="\'1|[\' + x +\']|\' + menus._id">{{menus.name}}</option> <option v-if="menus.children && menus.children.length" v-for="(y, menu) in menus.children" :value="\'2|[\' + x + \',\' + y + \']|\' + menu._id"> &nbsp;&nbsp;|- {{menu.name}} </option> </template> </select> </div> </div> <div class=form-group> <div class="col-sm-10 col-sm-offset-2"> <button class="btn btn-primary" type=submit> 提交 </button> </div> </div> </form> </div> <div slot=modal-footer></div> </modal>'},80:function(t,e,o){var i,n;o(95),i=o(35),n=o(65),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports["default"]),n&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=n)},95:function(t,e,o){var i=o(48);"string"==typeof i&&(i=[[t.id,i,""]]);o(5)(i,{});i.locals&&(t.exports=i.locals)}});
//# sourceMappingURL=10.build.js.map