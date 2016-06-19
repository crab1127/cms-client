<template>
  <side-menu></side-menu>
  <div class="content-wrapper">
    <div class="content-header">
      <h1>{{ info.name }}</h1>
      <ol class="breadcrumb">
        <li><a href="/"><i class="fa fa-dashboard"></i> 首页</a></li>
        <li><a v-link="{ path: '/industrial' }">专业镇</a></li>
        <li class="active">{{ info.name }}</li>
      </ol>
    </div>
    <div class="content">
      <div class="mb10">
        <a class="btn btn-danger" href="/industrial/{{id}}" target="_blank">预览</a>
      </div>
      <div class="nav-tabs-custom theme-panel">
        <ul class="nav nav-tabs">
          <li :class="{active: visibility == 'shop'}" @click="visibility='shop'">
            <a href="javascript:;">
              商家
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
              产业介绍
            </a>
          </li>
          <li :class="{active: visibility == 'exhibition'}" @click="visibility='exhibition'">
            <a href="javascript:;">
              展会中心
            </a>
          </li>
        </ul>
        <div class="tab-content">
          <div class="row">
            <div class="col-md-12" v-show="visibility == 'shop'">
              <div class="row mb10">
                <div class="col-md-4">
                  <a v-if="info.id == 0" href="javascript:;" class="btn btn-primary"
                    @click="addShop">
                    添加商家
                  </a>
                  <a v-if="info.id != 0" href="javascript:;" class="btn btn-primary"
                    @click="syncShop">
                    同步商家
                  </a>
                </div>
                <div class="col-md-8 text-right">
                  <pages :total.sync="shopPage.total" :current="shopPage.current" :per-page="shopPage.perPage" :page-changed="pageCallback"></pages>
                </div>
              </div>
              <table class="table table-bordered table-hover dataTable">
                <thead>
                  <tr>
                    <th>名字</th>
                    <th>招牌图</th>
                    <th>logo</th>
                    <th>
                      <dropdown>
                        <a href="javascript:;" data-toggle="dropdown">
                        分类
                        <span class="caret"></span>
                        </a>
                        <ul slot="dropdown-menu" class="dropdown-menu dropdown-area">
                          <li @click="filter(null)"><a href="javascript:;">全部</a></li>
                          <li v-for="menu in menus" @click="filter(menu._id)"><a href="javascript:;">{{ menu.name }}</a></li>
                          <li @click="filter(0)"><a href="javascript:;">其他</a></li>
                        </ul>
                      </dropdown>
                    </th>
                    <th>管理</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in shops">
                    <td>{{ item.name }}</td>
                    <td><img v-bind:src="item.img | resize"></td>
                    <td><img v-bind:src="item.logo | resize"></td>
                    <td>{{ item.categoryId | categoryText }}</td>
                    <td>
                      <button class="btn btn-sm btn-primary" @click="editShop($index)">编辑</button>
                      <button class="btn btn-sm btn-default" @click="delShop(item._id, $index)">删除</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="col-md-12 text-right">
                <pages :total.sync="shopPage.total" :current="shopPage.current" :per-page="shopPage.perPage" :page-changed="pageCallback"></pages>
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
                    <label for="" class="col-sm-2 control-label">Id</label>
                    <div class="col-sm-5">
                      <input type="text" class="form-control" v-model="infoCopy.name" placeholder="专业镇名" required>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="" class="col-sm-2 control-label">资讯站</label>
                    <div class="col-sm-2">
                      <input type="text" class="form-control" v-model="infoCopy.cmsName" placeholder="专业镇资讯站名字">
                    </div>
                    <div class="col-sm-3">
                      <input type="text" class="form-control" v-model="infoCopy.cmsLink" placeholder="专业镇资讯站链接">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="" class="col-sm-2 control-label">图片</label>
                    <div class="col-sm-5">
                      <upload id="pick-info" text="上传图片" :img.sync="infoCopy.img"></upload>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="" class="col-sm-2 control-label">logo</label>
                    <div class="col-sm-5">
                      <upload id="pick-logo2" text="上传图片" :img.sync="infoCopy.logo"></upload>
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
                      <textarea cols="30" class="form-control" rows="10" v-model="infoCopy.description"></textarea>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="" class="col-sm-2 control-label">排序</label>
                    <div class="col-sm-5">
                      <input type="number" class="form-control" v-model="infoCopy.sortId" placeholder="">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="inputEmail3" class="col-sm-2 control-label">是否显示</label>
                    <div class="col-sm-5">
                      <label class="radio-inline">
                        <input type="radio" name="isTop" value="1" v-model="infoCopy.state"> 显示
                      </label>
                      <label class="radio-inline">
                        <input type="radio" name="isTop" value="0" v-model="infoCopy.state"> 不显示
                      </label>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="" class="col-sm-2 control-label">app排序</label>
                    <div class="col-sm-5">
                      <input type="number" class="form-control" v-model="infoCopy.appSortId" placeholder="">
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
            <div class="col-md-12" v-show="visibility == 'exhibition'">
               <form v-ajax-submit @submit.prevent="saveInfo">
                <div class="mb10">
                  <markdown id="md-ex" :input.sync="infoCopy.exhibition"></markdown>
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
  <modal :show.sync="showShopModal" title="产品">
    <div slot="modal-body" class="modal-body">
      <form class="form-horizontal" v-ajax-submit @submit.prevent="saveShop">
        <div class="form-horizontal">
          <!-- <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label" v-tip="与后台的商家关联">商铺id</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="shop.id" required>
            </div>
          </div> -->
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">商铺名字</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="shop.name" required>
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">商铺图片</label>
            <div class="col-sm-10">
              <upload id="pick-img" text="上传图片" :img.sync="shop.img"></upload>
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">商铺logo</label>
            <div class="col-sm-10">
              <upload id="pick-logo" text="上传图片" :img.sync="shop.logo"></upload>
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">商铺分类</label>
            <div class="col-sm-10">
              <select class="form-control" v-model="shop.categoryId" required>
                <option v-for="menu in menus" :value="menu._id">{{ menu.name }}</option>
                <option value="0">其他</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">排序</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="shop.sortId" required>
            </div>
          </div>
          <div class="form-group">
            <label for="" class="col-sm-2 control-label">app排序</label>
            <div class="col-sm-5">
              <input type="number" class="form-control" v-model="shop.appSortId" placeholder="">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">是否显示</label>
            <div class="col-sm-10">
              <label class="radio-inline">
                <input type="radio" name="state" v-model="shop.state" value="1"> 显示
              </label>
              <label class="radio-inline">
                <input type="radio" name="state" v-model="shop.state" value="0"> 不显示
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
          <div class="form-group hidden">
            <label for="inputEmail3" class="col-sm-2 control-label">父级类目</label>
            <div class="col-sm-10">
              <!-- <select name="" id="">
                <template>
                  <option value=""></option>
                </template>
              </select> -->
              <input type="text" class="form-control" v-model="menu.parentid">
            </div>
          </div>
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
                <input type="radio" name="ishidden" v-model="menu.ishidden" value="1"> 显示
              </label>
              <label class="radio-inline">
                <input type="radio" name="ishidden" v-model="menu.ishidden" value="0"> 不显示
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
</template>
<script>
  var toTreeData = require('../util/tree');
  //楼层配置
  var shopOpt = {
    sortId: 10,
    state:1,
    categoryId: 0
  }

  var menuOpt = {
    sortId: 10,
    ishidden:1
  }
  module.exports = {
    data: function() {
      return {
        visibility: 'shop',
        //专业镇id
        id: this.$route.params.id,

        //弹窗
        showShopModal: false,
        showMenuModal: false,

        //基本信息
        info: {},
        infoCopy: {},

        //商家
        shops: [],  //产品集合
        shop: $.extend({}, shopOpt), //当前产品
        shopIndex: '', //当前产品索引
        shopPage: {
          total: null,
          current: 1,
          perPage: 10
        },

        //菜单分类
        menus: [],  //menu集合
        menu: $.extend({}, menuOpt), //当前menu
        menuIndex: '', //当前menu索引

        search: {
          categoryId: null
        }
      }
    },
    route: {
      data: function(transition) {
        //基本信息
        this.getInfo()
        //商品
        this.getShop()
        //菜单
        this.getMenu()
      }
    },
    methods: {

      filter: function(id) {
        this.search.categoryId = id;
        this.shopPage.current = 1;
        this.getShop();
        //this.$children[1].$el.classList.toggle('open')
      },

      syncShop: function() {
        console.log(this.info)
        $.ajax({
          url: domain + '/industrial/' + this.id + '/shop/sync',
          type: 'post',
          data: {id: this.info.id}
        })
        .done(function(res) {
          if (res.status == 1) {
            alert('共' + res.count + '个商家，同步了' + res.updateCount + '商家');
          }
        });
      },
      //获取专业镇信息
      getInfo: function() {
        var self = this;
        $.ajax({
          url: domain + '/industrial/' + this.id,
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
          url: domain + '/industrial',
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

      //商家店铺
      getShop: function () {
        var self = this;
        var params = $.extend({}, this.shopPage, this.search)

        $.ajax({
          url: domain + '/industrial/shop/' + this.id,
          type: 'GET',
          dataType: 'json',
          data: params
        })
        .done(function(res) {
          if (1 == res.status) {
            self.shops = res.data;
            self.shopPage.total = res.count;
          }
        });
      },
      addShop: function () {
        this.shop = $.extend({}, shopOpt);
        this.showShopModal = true;
      },
      editShop: function (index) {
        this.shop = this.shops[index];
        this.shopIndex = index;
        this.showShopModal = true;
      },
      //保存产品
      saveShop: function () {
        var self = this;
        var param = JSON.parse(JSON.stringify(this.shop));
        //楼层id
        param.pId = this.id;

        $.ajax({
          url: domain + '/industrial/shop',
          type: 'POST',
          dataType: 'json',
          data: param
        })
        .done(function(res) {
          if (1 == res.status) {
            if (param._id) {
              self.shops.$set(self.shopIndex, param);
            } else {
              param._id = res.data._id;
              self.shops.push(param);
            }
            self.showShopModal = false;
          }
        });
      },
      delShop: function(id, index) {
        var self = this;
        if (confirm('确定删除？')) {
          if (id) {
            $.ajax({
              url: domain + '/industrial/shop/' + id,
              type: 'delete',
            })
            .done(function(res) {
              if(1 == res.status) {
                self.shops.splice(index, 1);
              }
            })
          }
        }
      },

      //菜单
      getMenu: function () {
        var self = this;
        $.ajax({
          url: domain + '/industrial/menu/' + this.id,
          type: 'GET',
          dataType: 'json'
        })
        .done(function(res) {
          if (1 == res.status) {
            self.menus = toTreeData(res.data, self.id);
          }
        });
      },
      addMenu: function (zIndex, id, index) {
        if (id) {
          menuOpt.parentid = id;
        }
        zIndex = zIndex || 1;
        this.menuIndex = index;
        this.menu = $.extend({parentid: this.id}, menuOpt, {zIndex: zIndex});
        this.showMenuModal = true;
      },
      editMenu: function (zIndex, item, indexs) {
        indexs = indexs || [];
        this.menuIndex = indexs
        this.menu = $.extend({}, item, {zIndex:zIndex});
        this.showMenuModal = true;
      },
      //保存menu
      saveMenu: function () {
        var self = this;
        var param = JSON.parse(JSON.stringify(this.menu));
        //楼层id
        param.industrialId = this.id;
        $.ajax({
          url: domain + '/industrial/menu',
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
        if (confirm('确定删除？')) {
          if (id) {
            $.ajax({
              url: domain + '/industrial/menu/' + id,
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
        }
      },
      pageCallback: function(page) {
        this.shopPage.current = page;
        this.getShop();
      }
    },
    watch: {
      visibility: function() {
        this.infoCopy = $.extend({}, this.info);
      }
    },
    filters: {
      categoryText: function(val) {
        var text = '其他';
        for (var i = 0; i < this.menus.length; i++) {
          console.log(111, this.menus[i]._id)
          if (val == this.menus[i]._id) {
            text = this.menus[i].name;
            break;
          }
        }
        return text;
      }
    },
    components: {
      markdown: require('../components/markdown.vue'),
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
  .pagination{
    margin:0;
  }.dropdown-area{
    max-height: 300px;
    overflow-y:auto;
  }
  .table-responsive{
    overflow: visible;
  }
</style>
