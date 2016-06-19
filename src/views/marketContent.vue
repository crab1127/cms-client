<template>
  <side-menu></side-menu>
  <div class="content-wrapper">
    <div class="content-header">
      <h1>{{ info.name }}</h1>
      <ol class="breadcrumb">
        <li><a href="/"><i class="fa fa-dashboard"></i> 首页</a></li>
        <li><a v-link="{ path: '/market' }">专业市场</a></li>
        <li class="active">{{ info.name }}</li>
      </ol>
    </div>
    <div class="content">
      <div class="mb10">
        <a class="btn btn-danger" href="/market/{{id}}" target="_blank">预览</a>
      </div>
      <div class="nav-tabs-custom theme-panel">
        <ul class="nav nav-tabs">
          <li :class="{active: visibility == 'product'}" @click="visibility='product'">
            <a href="javascript:;">
              产品
            </a>
          </li>
          <li :class="{active: visibility == 'floor'}" @click="visibility='floor'">
            <a href="javascript:;">
              楼层
            </a>
          </li>
          <li :class="{active: visibility == 'menu'}" @click="visibility='menu'">
            <a href="javascript:;">
              菜单
            </a>
          </li>
          <li :class="{active: visibility == 'base'}" @click="visibility='base'">
            <a href="javascript:;">
              基本信息
            </a>
          </li>
          <li :class="{active: visibility == 'introduce'}" @click="visibility='introduce'">
            <a href="javascript:;">
              市场介绍
            </a>
          </li>
        </ul>
        <div class="tab-content">
          <div class="row">
            <div class="col-md-12" v-show="visibility == 'product'">
              <div class="mb10">
                <a href="javascript:;" class="btn btn-primary"
                  @click="addProduct">
                  添加产品
                </a>
              </div>
              <table class="table table-bordered table-hover dataTable">
                <thead>
                  <tr>
                    <th width="40%">名字</th>
                    <th>价格</th>
                    <th>
                      <dropdown>
                        <a href="javascript:;" data-toggle="dropdown">
                          显示位置
                          <span class="caret"></span>
                        </a>
                        <ul slot="dropdown-menu" class="dropdown-menu dropdown-area">

                          <li @click="filter({type:null})"><a href="javascript:;">全部</a></li>
                          <li @click="filter({type:1})"><a href="javascript:;">banner</a></li>
                          <li @click="filter({type:2})"><a href="javascript:;">banner右边图</a></li>
                          <li @click="filter({type:3})"><a href="javascript:;">楼层下方图</a></li>
                          <li @click="filter({type:4})"><a href="javascript:;">banner下方图</a></li>
                          <li @click="filter({type:5})"><a href="javascript:;">右下角图</a></li>
                        </ul>
                      </dropdown>
                    </th>
                    <th>
                      <dropdown>
                        <a href="javascript:;" data-toggle="dropdown">
                          楼层
                          <span class="caret"></span>
                        </a>
                        <ul slot="dropdown-menu" class="dropdown-menu dropdown-area">
                          <li @click="filter({floorId: null})"><a href="javascript:;">全部</a></li>
                          <li v-for="floor in floors" @click="filter({floorId: floor._id})" ><a href="javascript:;">{{ floor.name }}</a></li>
                        </ul>
                      </dropdown>
                    </th>
                    <th>管理</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in products">
                    <td>
                      <div class="media">
                        <a :href="item.img" target="_blank" class="media-left">
                          <img :src="item.img | resize" width="100px">
                        </a>
                        <div class="media-body">
                          <h4 class="media-heading">{{ item.title }}</h4>
                          <p>{{ item.desc }}</p>
                        </div>
                      </div>
                    </td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.type | areaText }}</td>
                    <td>{{ item.floorId | floorText }}</td>
                    <td>
                      <button class="btn btn-sm btn-primary" @click="editProduct($index)">编辑</button>
                      <button class="btn btn-sm btn-default" @click="delProduct(item._id, $index)">删除</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="col-md-12 text-right">
                <pages :total.sync="productPage.total" :current="productPage.current" :per-page="productPage.perPage" :page-changed="pageCallback"></pages>
              </div>
            </div>
            <div class="col-md-12" v-show="visibility == 'floor'">
              <div class="mb10">
                <button class="btn btn-primary" @click="addFloor">添加楼层</button>
              </div>
              <div class="box">
                <div class="box-header">
                  <h3 class="box-title">楼层</h3>
                </div>
                <div class="box-body table-responsive no-padding">
                  <table class="table table-hover">
                    <tr>
                      <th width="50%">名字</th>
                      <th>操作</th>
                    </tr>
                    <tr v-for="item in floors">
                      <td>
                        {{ item.name }}
                      </td>
                      <td>
                        <!-- <a class="btn btn-primary btn-xs" v-link="'/market/' + item._id">编辑</a> -->
                        <button class="btn btn-primary btn-xs" @click="editFloor($index)">编辑</button>
                        <button class="btn btn-default btn-xs" @click="delFloor(item._id, $index)">删除</button>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <div class="col-md-12" v-show="visibility == 'menu'" >
              <div class="mb10">
                <button class="btn btn-primary" @click="addMenu(1)">添加菜单</button>
              </div>
              <div class="row">
                <div class="col-md-3 col-md-4" v-for="(i, items) in menus">
                  <div class="box box-default">
                    <div class="box-header with-border">
                      <h3 class="box-title"> {{items.name}} </h3>

                      <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" @click="addMenu(2, items._id, [i])">
                          添加子类
                        </button>
                        <button type="button" class="btn btn-box-tool" @click="editMenu(1, items, [i])">
                          编辑
                        </button>
                        <button type="button" class="btn btn-box-tool" @click="delMenu(1, items._id, [i])">
                          删除
                        </button>
                      </div>
                    </div>
                    <div class="box-body" style="display: block;">
                      <ul class="contacts-list">
                        <li class="" v-for="(index, item) in items.children">
                            <span class="pull-right">
                               <button type="button" class="btn btn-box-tool" @click="editMenu(2, item, [i, index])">
                                编辑
                              </button>
                              <button type="button" class="btn btn-box-tool" @click="delMenu(2, item._id, [i, index])">
                                删除
                              </button>
                            </span>
                            {{ item.name }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12" v-show="visibility == 'base'" >
              <form class="form-horizontal" v-ajax-submit @submit.prevent="saveInfo">
                <div class="box-body">
                  <div class="form-group">
                    <label for="" class="col-sm-2 control-label">市场名字</label>
                    <div class="col-sm-5">
                      <input type="text" class="form-control" v-model="infoCopy.name" placeholder="专业市场名" required>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="" class="col-sm-2 control-label">副标题</label>
                    <div class="col-sm-5">
                      <input type="text" class="form-control" v-model="infoCopy.title" placeholder="专业市场名">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="" class="col-sm-2 control-label">图片</label>
                    <div class="col-sm-5">
                      <upload id="pick2" text="上传图片" :img.sync="infoCopy.img"></upload>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="" class="col-sm-2 control-label">logo</label>
                    <div class="col-sm-5">
                      <upload id="pick-marketlogo" text="上传图片" :img.sync="infoCopy.logo"></upload>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="" class="col-sm-2 control-label">关键词</label>
                    <div class="col-sm-5">
                      <input type="text" class="form-control" v-model="infoCopy.keywords" placeholder="以逗号分隔">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="" class="col-sm-2 control-label">描述</label>
                    <div class="col-sm-5">
                      <textarea cols="30" rows="10" v-model="infoCopy.description"></textarea>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="" class="col-sm-2 control-label">所属楼层</label>
                    <div class="col-sm-5">
                      <select v-model="infoCopy.floorId" required>
                        <option v-for="floor in marketFloor" :value="floor._id">{{ floor.name }}</option>
                      </select>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="" class="col-sm-2 control-label">排序</label>
                    <div class="col-sm-5">
                      <input type="number" class="form-control" v-model="infoCopy.sortId" placeholder="">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="" class="col-sm-2 control-label">app排序</label>
                    <div class="col-sm-5">
                      <input type="number" class="form-control" v-model="infoCopy.appSortId" placeholder="">
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="inputEmail3" class="col-sm-2 control-label">是否显示</label>
                    <div class="col-sm-5">
                      <label class="radio-inline">
                        <input type="radio" name="isTop" value="1" v-model="infoCopy.ishidden"> 显示
                      </label>
                      <label class="radio-inline">
                        <input type="radio" name="isTop" value="0" v-model="infoCopy.ishidden"> 隐藏
                      </label>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-5">
                      <button type="submit" class="btn btn-info">保存</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="col-md-12" v-show="visibility == 'introduce'">
               <form v-ajax-submit @submit.prevent="saveInfo">
                <div class="mb10">
                  <markdown :input.sync="infoCopy.content"></markdown>
                </div>
                <button type="submit" class="btn btn-primary">保存</button>
               </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--添加产品-->
  <modal :show.sync="showProductModal" title="产品">
    <div slot="modal-body" class="modal-body">
      <form class="form-horizontal" v-ajax-submit @submit.prevent="saveProduct">
        <div class="form-horizontal">
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">产品id</label>
            <div class="col-sm-7">
              <input type="text" class="form-control" v-model="product.id" required>
            </div>
            <div class="col-sm-3">
              <button class="btn btn-default" type="button" @click="getJavaProduct">获取</button>
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">产品名字</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="product.title" required>
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">产品描述</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="product.desc">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">产品图片</label>
            <div class="col-sm-10">
              <upload id="pick1" text="上传图片" :img.sync="product.img"></upload>
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">产品价格</label>
            <div class="col-sm-4">
              <input type="text" class="form-control" placeholder="价格" v-model="product.price">
            </div>
            <div class="col-sm-3">
              <input type="text" class="form-control" placeholder="单位" v-model="product.unit">
            </div>
            <div class="col-sm-3">
              <input type="text" class="form-control" placeholder="起订量" v-model="product.minOrder">
            </div>
          </div>

          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">楼层</label>
            <div class="col-sm-10">
              <select class="form-control" v-model="product.floorId" required>
                <option v-for="floor in floors" :value="floor._id">{{ floor.name }}</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">产品类型</label>
            <div class="col-sm-10">
              <label class="radio-inline">
                <input type="radio" name="isTop" value="1" v-model="product.type"> banner
              </label>
              <label class="radio-inline">
                <input type="radio" name="isTop" value="2" v-model="product.type"> banner右边图
              </label>
              <label class="radio-inline">
                <input type="radio" name="isTop" value="3" v-model="product.type"> 楼层下方图
              </label>
              <label class="radio-inline">
                <input type="radio" name="isTop" value="4" v-model="product.type"> banner下方图
              </label>
              <label class="radio-inline">
                <input type="radio" name="isTop" value="5" v-model="product.type"> 右下角图
              </label>
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">产品排序</label>
            <div class="col-sm-10">
              <input type="number" class="form-control" v-model="product.sortId">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">app产品排序</label>
            <div class="col-sm-10">
              <input type="number" class="form-control" v-model="product.appSortId">
            </div>
          </div>
           <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">产品是否显示</label>
            <div class="col-sm-10">
              <label class="radio-inline">
                <input type="radio" name="product.ishidden" value="1" v-model="product.ishidden"> 显示
              </label>
              <label class="radio-inline">
                <input type="radio" name="product.ishidden" value="0" v-model="product.ishidden"> 隐藏
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


  <!--添加类目-->
  <modal :show.sync="showMenuModal" title="类目">
    <div slot="modal-body" class="modal-body">
      <form class="form-horizontal" v-ajax-submit @submit.prevent="saveMenu">
        <div class="form-horizontal">
          <!-- <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">父级类目</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="menu.parentid">
            </div>
          </div> -->
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">名字</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="menu.name" required>
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">链接</label>
            <div class="col-sm-10">
              <input type="url" class="form-control" v-model="menu.link">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">排序</label>
            <div class="col-sm-10">
              <input type="number" class="form-control" v-model="menu.sortId">
            </div>
          </div>
          <div class="form-group">
            <label for="inputPassword3" class="col-sm-2 control-label">是否显示</label>
            <div class="col-sm-10">
              <label class="radio-inline">
                <input type="radio" name="ishidden" value="1" v-model="menu.ishidden"> 是
              </label>
              <label class="radio-inline">
                <input type="radio" name="ishidden" value="0" v-model="menu.ishidden"> 否
              </label>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-10 col-sm-offset-2">
              <button class="btn btn-primary" type="submit">
                提交
              </button>
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
            <label for="inputEmail3" class="col-sm-2 control-label">banner</label>
            <div class="col-sm-10">
              <upload id="pick-foolr" :img.sync="floor.img"> </upload>
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">链接</label>
            <div class="col-sm-10">
              <input type="url" class="form-control" v-model="floor.link">
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
                <input type="radio" name="isTop" value="1" v-model="floor.state"> 显示
              </label>
              <label class="radio-inline">
                <input type="radio" name="isTop" value="0" v-model="floor.state"> 隐藏
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
  var toTreeData = require('../util/tree');
  //楼层配置
  var productOpt = {
    sortId: 10,
    appSortId: 10,
    ishidden:1,
    type:1,
    img: null,
    unit: null,
    minOrder: null,
    price: null,
    title: null
  }
  var menuOpt = {
    sortId: 10,
    ishidden: 1
  }
  var floorOpt = {
    sortId: 10,
    state:1
  }

  module.exports = {
    data: function() {
      return {
        visibility: 'product',
        //专业市场id
        id: this.$route.params.id,

        //弹窗
        showProductModal: false,
        showMenuModal: false,
        showFloorModal: false,

        //基本信息
        info: {},
        infoCopy : {},

        //商家
        products: [],  //产品集合
        product: $.extend({}, productOpt, {marketId: this.id}), //当前产品
        productIndex: '', //当前产品索引
        productPage: {
          total: null,
          current: 1,
          perPage: 10
        },
        search: {
          floorId: null,
          type: null
        },

        //菜单分类
        floors: [],  //menu集合
        floor: $.extend({}, floorOpt, {marketId: this.id}), //当前menu
        floorIndex: '', //当前menu索引

        //菜单分类
        menus: [],  //menu集合
        menu: $.extend({}, menuOpt, {marketId: this.id}), //当前menu
        menuIndex: '', //当前menu索引

        marketFloor: []
      }
    },
    route: {
      data: function(transition) {
        //基本信息
        this.getInfo()
        //商品
        this.getProduct()
        //菜单
        this.getMenu()
        //楼层
        this.getFloor()
        //
        this.getMarketFloor()
      }
    },
    methods: {
      //获取专业市场信息
      getInfo: function() {
        var self = this;
        $.ajax({
          url: domain + '/market/one/' + this.id,
          type: 'GET',
          dataType: 'json'
        })
        .done(function(res) {
          if (1 == res.status && res.data) {
            self.info = res.data;
            self.infoCopy = $.extend({}, self.info);

          }
        });
      },
      saveInfo: function() {
        var self = this;
        $.ajax({
          url: domain + '/market',
          type: 'post',
          dataType: 'json',
          data: this.infoCopy
        })
        .done(function(res) {
          if (1 == res.status) {
            alert('保存成功');
            self.info = $.extend({}, self.infoCopy);
          }
        });
      },

      filter: function(searchParams) {
        this.search = $.extend(this.search, searchParams);
        this.productPage.current = 1;
        this.getProduct();
      },

      pageCallback: function(page) {
        this.productPage.current = page;
        this.getProduct();
      },
      //产品
      getProduct: function () {
        var self = this;
        var params = $.extend({}, this.productPage, this.search);
        $.ajax({
          url: domain + '/market/' + this.id + '/product',
          type: 'GET',
          dataType: 'json',
          data: params
        })
        .done(function(res) {
          if (1 == res.status && res.data) {
            self.products = res.data;
            self.productPage.total = res.count;
          }
        });
      },
      addProduct: function () {
        this.product = $.extend({}, productOpt, {marketId: this.id});
        this.showProductModal = true;
      },
      editProduct: function (index) {
        this.product = $.extend({}, this.products[index]);
        this.productIndex = index;
        this.showProductModal = true;
      },
      saveProduct: function () {
        var self = this;
        var param = JSON.parse(JSON.stringify(this.product));
        //楼层id
        param.pId = this.id;

        $.ajax({
          url: domain + '/market/product',
          type: 'POST',
          dataType: 'json',
          data: param
        })
        .done(function(res) {
          if (1 == res.status) {
            if (param._id) {
              self.products.$set(self.productIndex, param);
            } else {
              param._id = res.data._id;
              self.products.push(param);
            }
            self.showProductModal = false;
          }
        });
      },
      delProduct: function(id, index) {
        var self = this;
        if (confirm('确定删除？')) {
          if (id) {
            $.ajax({
              url: domain + '/market/product/' + id,
              type: 'delete',
            })
            .done(function(res) {
              if(1 == res.status) {
                self.products.splice(index, 1);
              }
            })
          }
        }
      },

      //楼层
      getFloor: function() {
        var self = this;
        $.ajax({
          url: domain + '/market/'+ this.id +'/floor',
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
        self.floor = $.extend({}, self.floors[index], {marketId: this.id});
        self.floorIndex = index;
        this.showFloorModal = true;
      },
      saveFloor: function() {
        var self = this;
        var param = JSON.parse(JSON.stringify(self.floor));
        $.ajax({
          url: domain + '/market/' + this.id + '/floor',
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
        if (id) {
          $.ajax({
            url: domain + '/market/' + this.id + '/floor/' + id,
            type: 'delete',
          })
          .done(function(res) {
            if(1 == res.status) {
              self.floors.splice(index, 1);
            }
          })
        }
      },

      //菜单
      getMenu: function () {
        var self = this;
        $.ajax({
          url: domain + '/market/' + this.id + '/menu',
          type: 'GET',
          dataType: 'json'
        })
        .done(function(res) {
          if (1 == res.status && res.data) {
            self.menus = toTreeData(res.data, self.id);
            console.log(self.menus);
          }
        });
      },
      addMenu: function (zIndex, id, index) {
        if (id) {
          menuOpt.parentid = id;
        }
        zIndex = zIndex || 1;
        this.menuIndex = index;
        this.menu = $.extend({parentid: this.id, marketId: this.id }, menuOpt, {zIndex: zIndex});
        this.showMenuModal = true;
      },
      editMenu: function (zIndex, item, indexs) {
        indexs = indexs || [];
        this.menuIndex = indexs
        this.menu = $.extend({marketId: this.id}, item, {zIndex:zIndex});
        this.showMenuModal = true;
      },
      //保存menu
      saveMenu: function () {
        var self = this;
        var param = JSON.parse(JSON.stringify(this.menu));
        //楼层id
        param.marketId = this.id;
        $.ajax({
          url: domain + '/market/menu',
          type: 'POST',
          dataType: 'json',
          data: param
        })
        .done(function(res) {
          if (1 == res.status) {
            if (param._id) {
              switch (param.zIndex) {
                case 1:
                  self.menus.$set(self.menuIndex[0], param);
                  break;
                case 2:
                  self.menus[self.menuIndex[0]].children.$set(self.menuIndex[1], param);
                  break;
              }

            } else {
              param._id = res.data._id;
              switch (param.zIndex) {
                case 1:
                  param.children = [];
                  self.menus.push(param);
                  break;
                case 2:
                  self.menus[self.menuIndex[0]].children.push(param);
                  break;
              }

            }
            self.showMenuModal = false;
          }
        });
      },
      //删除menu
      delMenu: function (zIndex, id, indexs) {
        var self = this;
        // && confirm('确认要删除吗？')
        if (id) {
          $.ajax({
            url: domain + '/market/menu/' + id,
            type: 'delete'
          })
          .done(function(res) {
            if (1 == res.status) {
              switch (zIndex) {
                case 1:
                  self.menus.splice(indexs[0], 1);
                  break;
                case 2:
                  self.menus[indexs[0]].children.splice(indexs[1], 1);
                  break;
              }
            }
          });
        }
      },

      //
      //楼层
      getMarketFloor: function() {
        var self = this;
        $.ajax({
          url: domain + '/market/floor',
          type: 'GET'
        })
        .done(function(res) {
          if ('1' == res.status && res.data) {
            self.marketFloor = res.data;
          }
        });
      },
      //
      getJavaProduct: function() {
        var self = this;
        if(!this.product.id) return alert('请输入id');
        $.ajax({
          url: '/productDetail/productInfo/'+ this.product.id +'.cf'
        })
        .done(function(res) {
          if (res.code == 0) {
            // self.product.name = res.data.name
            // self.product.price = res.data.price
            // self.product.unit = res.data.unit
            // self.product.minOrder = res.data.minOrder
            $.extend(self.product, res.data);
            self.product.title = res.data.name
          }else {
            alert('获取失败');
          }
        });

      }
    },
    watch: {
      visibility: function() {
        this.infoCopy = $.extend({}, this.info);
      }
    },
    filters: {
      'floorText': function(val) {
        var res = val;
        if (val) {
          for (var i = this.floors.length - 1; i >= 0; i--) {
            if (this.floors[i]._id == val) {
              res = this.floors[i].name;
              break;
            }
          }
        }
        return res;
      },
      areaText: function(id) {
        var str = '';
        id = ~~id;
        switch (id) {
          case 1:
            str = 'banner'
            break;
          case 2:
            str = 'banner右边图';
            break;
          case 3:
            str = '楼层下方图';
            break;
          case 4:
            str = 'banner下方图';
            break;
          case 5:
            str = '右下角图';
            break;
          default:
            str = '阿卡林图片';
            break;
        }
        return str;
      }
    },
    components: {
      markdown: require('../components/markdown.vue'),
      dropdown: require('../components/dropdown.vue')
    }
  }
</script>
