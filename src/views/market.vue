<template>
  <side-menu></side-menu>
  <div class="content-wrapper">
    <div class="content-header">
      <h1>专业市场</h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> 首页</a></li>
        <li><a href="#">栏目管理</a></li>
        <li class="active">专业市场</li>
      </ol>
    </div>
    <div class="content">
      <div class="mb10">
        <button class="btn btn-primary" @click="addMarket">添加市场</button>
        <button class="btn btn-primary" @click="addFloor">添加楼层</button>
        <a class="btn btn-danger" href="/market" target="_blank">预览</a>
      </div>
      <div class="row">
        <div class="col-xs-7">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">专业镇</h3>
            </div>
            <div class="box-body table-responsive no-padding">
              <table class="table table-hover">
                <tr>
                  <th width="50%">名字</th>
                  <th>是否显示</th>
                  <!-- <th>点击数</th> -->
                  <th>
                    <dropdown>
                      <a href="javascript:;" data-toggle="dropdown">
                        楼层
                        <span class="caret"></span>
                      </a>
                      <ul slot="dropdown-menu" class="dropdown-menu dropdown-area">
                        <li @click="floorFilter(null)"><a href="javascript:;">全部</a></li>
                        <template v-for="item in floors">
                          <li @click="floorFilter(item._id)"><a href="javascript:;">{{item.name}}</a></li>
                        </template>
                      </ul>
                    </dropdown>
                  </th>
                  <th>操作</th>
                </tr>
                <tr v-for="item in markets">
                  <td>
                    <div class="media">
                      <div class="media-left">
                        <img v-bind:src="item.img | resize" width="100px" alt="">
                      </div>
                      <div class="media-body">
                        <h4>{{ item.name }}</h4>
                        <p>{{ item.description }}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    {{ item.ishidden | ishidden }}
                  </td>
                  <td>
                    {{ item.floorId.name }}
                  </td>
                  <!-- <td>
                    {{ item.hits }}
                  </td> -->
                  <td>
                    <a class="btn btn-primary" v-link="'/market/' + item._id">编辑</a>
                    <!-- <button class="btn btn-primary" @click="editMarket($index)">编辑</button> -->
                    <button class="btn btn-default" @click="delMarket(item._id, $index)">删除</button>
                  </td>
                </tr>
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
        <div class="col-xs-5">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">楼层</h3>
            </div>
            <div class="box-body table-responsive no-padding">
              <table class="table table-hover">
                <tr>
                  <th width="50%">名字</th>
                  <th>是否显示</th>
                  <th>操作</th>
                </tr>
                <tr v-for="item in floors">
                  <td>
                    {{ item.name }}
                  </td>
                  <td>
                    {{ item.ishidden | ishidden }}
                  </td>
                  <td>
                    <!-- <a class="btn btn-primary" v-link="'/market/' + item._id">编辑</a> -->
                    <button class="btn btn-primary" @click="editFloor($index)">编辑</button>
                    <button class="btn btn-default" @click="delFloor(item._id, $index)">删除</button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--添加-->
  <modal :show.sync="showModal" title="广贸基地">
    <div slot="modal-body" class="modal-body">
      <form class="form-horizontal" v-ajax-submit @submit.prevent="saveMarket">
        <div class="form-horizontal">
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">名字</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="market.name" required>
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">副标题</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="market.title">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">招牌图</label>
            <div class="col-sm-10">
              <upload id="pick2" text="上传图片" :img.sync="market.img"></upload>
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">logo</label>
            <div class="col-sm-10">
              <upload id="pick-marketlogo" text="上传图片" :img.sync="market.logo"></upload>
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">关键词</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="market.keywords">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">描述</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="market.description">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">所属楼层</label>
            <div class="col-sm-10">
              <select class="form-control" v-model="market.floorId" required>
                <option v-for="floor in floors" :value=" floor._id">{{ floor.name }}</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">排序</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="market.sortId">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">推荐</label>
            <div class="col-sm-10">
              <label class="radio-inline">
                <input type="radio" name="ishidden" value="1" v-model="market.ishidden"> 推荐
              </label>
              <label class="radio-inline">
                <input type="radio" name="ishidden" value="0" v-model="market.ishidden"> 不推荐
              </label>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-10 col-sm-offset-2">
              <button class="btn btn-primary" type="submit">提交</button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div slot="modal-footer"></div>
  </modal>

  <!--楼层-->
  <modal :show.sync="showFloorModal" title="楼层">
    <div slot="modal-body" class="modal-body">
      <form class="form-horizontal" v-ajax-submit @submit.prevent="saveFloor">
        <div class="form-horizontal">
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">名字</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="floor.name" required>
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">楼层图片</label>
            <div class="col-sm-10">
              <upload id="pick-floor" :img.sync="floor.img"></upload>
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">排序</label>
            <div class="col-sm-10">
              <input type="number" class="form-control" v-model="floor.sortId">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">是否显示</label>
            <div class="col-sm-10">
              <label class="radio-inline">
                <input type="radio" name="floorishidden" value="1" v-model="floor.ishidden"> 显示
              </label>
              <label class="radio-inline">
                <input type="radio" name="floorishidden" value="0" v-model="floor.ishidden"> 隐藏
              </label>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-10 col-sm-offset-2">
              <button class="btn btn-primary" type="submit">提交</button>
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
  var marketOpt = {
    sortId: 10,
    ishidden: '1'
  }
  var floorOpt = {
    sortId: 10,
    ishidden: '1'
  }

  module.exports = {
    data: function() {
      return {
        showModal: false,
        showFloorModal: false,


        markets: [],
        market: $.extend({}, marketOpt),
        marketIndex: '',

        floors: [],
        floor: $.extend({}, floorOpt),
        floorIndex: '',

        page: {
          total: null,
          current: 1,
          perPage: 10
        },

        search: {
          floorId: null
        }


      }
    },
    route: {
      data: function(transition) {
        this.getMarket();
        this.getFloor();
      }
    },
    methods: {
      //获取
      getMarket: function() {
        var self = this;
        var params = $.extend({}, this.page, this.search);
        $.ajax({
          url: domain + '/market',
          data: params,
          type: 'GET'
        })
        .done(function(res) {
          if ('1' == res.status) {
            self.page.total = res.count;
            self.markets = res.data;
          }
        });
      },
      //市场
      addMarket: function() {
        var self = this;
        this.market = $.extend({}, marketOpt);
        this.showModal = true;
      },
      editMarket: function(index) {
        var self = this;
        self.market = $.extend({}, self.markets[index]);
        self.marketIndex = index;
        this.showModal = true;
      },
      saveMarket: function() {
        var self = this;
        var param = JSON.parse(JSON.stringify(self.market));
        $.ajax({
          url: domain + '/market',
          type: 'post',
          dataType: 'json',
          data: param
        })
        .done(function(res) {
          if (1 == res.status) {
            if(!param._id) {
              param._id = res.data._id;
              self.markets.push(param);
            } else {
              self.markets.$set(self.marketIndex, param);
            }
            self.showModal = false;
          }
        });
        return false;
      },
      delMarket: function(id, index) {
        var self = this;
        if (confirm('确定删除？')) {
          if (id) {
            $.ajax({
              url: domain + '/market/' + id,
              type: 'delete',
            })
            .done(function(res) {
              if(1 == res.status) {
                self.markets.splice(index, 1);
              }
            })
          }
        }
      },


      //楼层
      getFloor: function() {
        var self = this;
        $.ajax({
          url: domain + '/market/floor',
          type: 'GET'
        })
        .done(function(res) {
          if ('1' == res.status && res.data) {
            self.floors = res.data;
          }
        });
      },
      addFloor: function() {
        var self = this;
        this.floor = $.extend({}, floorOpt);
        this.showFloorModal = true;
      },

      editFloor: function(index) {
        var self = this;
        self.floor = $.extend({}, self.floors[index]);
        self.floorIndex = index;
        this.showFloorModal = true;
      },
      saveFloor: function() {
        var self = this;
        var param = JSON.parse(JSON.stringify(self.floor));
        $.ajax({
          url: domain + '/market/floor',
          type: 'post',
          dataType: 'json',
          data: param
        })
        .done(function(res) {
          if (1 == res.status) {
            if(!param._id) {
              param._id = res.data._id;
              self.floors.push(param);
            } else {
              self.floors.$set(self.floorIndex, param);
            }
            self.showFloorModal = false;
          }
        });
        return false;
      },
      delFloor: function(id, index) {
        var self = this;
        if (confirm('确定删除？')) {
          if (id) {
            $.ajax({
              url: domain + '/market/floor/' + id,
              type: 'delete',
            })
            .done(function(res) {
              if(1 == res.status) {
                self.floors.splice(index, 1);
              }
            })
          }
        }
      },

      //分页回掉函数
      pagerCallback: function(page) {
        this.page.current = page;
        this.getMarket();
      },
      floorFilter: function(id) {
        this.search.floorId = id;
        this.page.current = 1;
        this.getMarket();
      }
    },
    components: {
      dropdown: require('../components/dropdown.vue')
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
