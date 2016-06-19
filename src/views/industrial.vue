<template>
  <side-menu></side-menu>
  <div class="content-wrapper">
    <div class="content-header">
      <h1>广货基地</h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> 首页</a></li>
        <li><a href="#">栏目管理</a></li>
        <li class="active">广货基地</li>
      </ol>
    </div>
    <div class="content">
      <div class="mb10">
        <button class="btn btn-primary" @click="addIndustrial">添加专业镇</button>
        <button class="btn btn-primary" @click="addTemp">添加专业镇模板</button>
        <a class="btn btn-danger" href="/industrial" target="_blank">预览</a>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <div class="box">
            <div class="box-body table-responsive no-padding">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th width="50%">名字</th>
                    <!-- <th>点击数</th> -->
                    <th>排序</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in industrials">
                    <td>
                      <div class="media">
                        <div class="media-left">
                          <img v-bind:src="item.img | resize '100' '100'" alt="">
                        </div>
                        <div class="media-body">
                          <h4>{{ item.name }}</h4>
                          <p>{{ item.description }}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      {{ item.sortId }}
                    </td>
                    <td>
                      <a class="btn btn-primary" v-link="'/industrial/' + item._id">编辑</a>
                      <!-- <button class="btn btn-primary" @click="editIndustrial($index)">编辑</button> -->
                      <button class="btn btn-default" @click="delIndustrial(item._id, $index)">删除</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="col-md-6">
                <!-- 共{{ page.total }}纪录， 每页显示{{ page.perPage }}。 -->
              </div>
              <div class="col-md-6">
                <div class="text-right">
                  <pages :total.sync="page.total" :current="page.current" :per-page="page.perPage" :page-changed="pagerCallback"></pages>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--添加-->
  <modal :show.sync="showModal" title="广贸基地">
    <div slot="modal-body" class="modal-body">
      <div class="form-group clearfix" v-show="toggleSearch">
        <label class="col-sm-3 control-label">搜索专业镇</label>
        <div class="col-sm-9">
          <auto-complete></auto-complete>
        </div>
      </div>
      <form v-show="!toggleSearch" class="form-horizontal" v-ajax-submit @submit.prevent="saveIndustrial">
        <div class="form-horizontal">
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">名字</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" title="填写内容" v-model="newIndustrial.name" required>
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">图片</label>
            <div class="col-sm-10">
              <upload id="pick1" text="上传图片" :img.sync="newIndustrial.img"></upload>
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">关键词</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="newIndustrial.keywords">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">描述</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="newIndustrial.description">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">排序</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="newIndustrial.sortId">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">推荐</label>
            <div class="col-sm-10">
              <label class="radio-inline">
                <input type="radio" name="option" value="1" v-model="newIndustrial.state"> 推荐
              </label>
              <label class="radio-inline">
                <input type="radio" name="option" value="0" v-model="newIndustrial.state"> 不推荐
              </label>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-10 col-sm-offset-2">
              <button type="submit" class="btn btn-primary">提交</button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div slot="modal-footer"></div>
  </modal>
</template>
<script>
var webupload = require('../util/webupload/webuploader.min');

  //楼层配置
  var option = {
    sortId: 10,
    state: 1,
    name:null,
    img:null
  }

  module.exports = {
    data: function() {
      return {
        showModal: false,
        toggleSearch: true,

        industrials: [],
        newIndustrial: $.extend({}, option),
        currentIndustrialIndex: '',

        page: {
          total: null,
          current: 1,
          perPage: 5
        }

      }
    },
    route: {
      data: function(transition) {
        this.getIndustrial();
      }
    },
    methods: {

      //获取
      getIndustrial: function() {
        var self = this;
        $.ajax({
          url: domain + '/industrial',
          data: this.page,
          type: 'GET'
        })
        .done(function(res) {
          if ('1' == res.status) {
            self.page.total = res.count;
            self.industrials = res.data;
          }
        });
      },
      //添加基地
      addIndustrial: function() {
        var self = this;
        this.newIndustrial = $.extend({}, option);
        this.showModal = true;
        this.toggleSearch = true;
      },
      addTemp: function() {
        this.newIndustrial = $.extend({}, option, {id:0});
        this.showModal = true;
        this.toggleSearch = false;
      },
      // editIndustrial: function(index) {
      //   var self = this;
      //   self.newIndustrial = $.extend({}, self.industrials[index]);
      //   self.currentIndustrialIndex = index;
      //   this.showModal = true;
      // },
      saveIndustrial: function() {
        var self = this;
        var param = JSON.parse(JSON.stringify(self.newIndustrial));
        $.ajax({
          url: domain + '/industrial',
          type: 'post',
          dataType: 'json',
          data: param
        })
        .done(function(res) {
          if (1 == res.status) {
            if(!param._id) {
              param._id = res.data._id;
              self.industrials.unshift(param);
            } else {
              self.industrials.$set(self.currentIndustrialIndex, param);
            }
            self.showModal = false;
          }
        });
        return false;
      },

      //删除楼层
      delIndustrial: function(id, index) {
        var self = this;
        if (confirm('确定删除？')) {
          if (id) {
            $.ajax({
              url: domain + '/industrial/' + id,
              type: 'delete',
            })
            .done(function(res) {
              if(1 == res.status) {
                self.industrials.splice(index, 1);
              }
            })
          }
        }
      },

      //
      pagerCallback: function(page) {
        this.page.current = page;
        this.getIndustrial();
      }
    },
    events: {
      'auto-complete': function(item){
        console.log(item)
        var self = this;
        $.ajax({
          url: domain + '/industrial/' + item.id + '/has',
        })
        .done(function(res) {

          if (1 == res.status) {
            self.newIndustrial.id = item.id;
            self.newIndustrial.name = item.nameCn;
            self.newIndustrial.nameEn = item.nameEn;
            self.newIndustrial.img = item.imgShow;
            self.toggleSearch = false;
          } else {
            alert('该专业镇已经添加，请重新选择');
          }
        });



      }
    },
    components: {
      autoComplete: require('../components/autoComplete.vue')
    }
  }
</script>
<style>
  .palent{
    background: #fff;
    border:1px solid #ddd;
    padding: 10px;
  }
  .mb10{
    margin-bottom: 10px;
  }
</style>
