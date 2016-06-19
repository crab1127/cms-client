<template>
  <side-menu></side-menu>
  <div class="content-wrapper">
    <div class="content-header">
      <h1>幻灯片管理</h1>
    </div>
    <div class="content">
      <button class="btn btn-primary mb10" @click="addAds">+ 添加幻灯片</button>
      <div class="box box-solid">
        <div class="box-body table-responsive no-padding">
          <table class="table table-hover">
            <thead>
              <tr>
                <th style="width:50%">幻灯片名</th>
                <th>
                  <dropdown>
                    <a href="javascript:;" data-toggle="dropdown">
                      显示位置
                      <span class="caret"></span>
                    </a>
                    <ul slot="dropdown-menu" class="dropdown-menu dropdown-area">
                      <li @click="filter(null)"><a href="javascript:;">全部</a></li>
                      <template v-for="area in areas">
                        <li @click="filter(area.id)"><a href="javascript:;">{{area.name}}</a></li>
                        <li v-if="area.children && area.children.length" v-for="item in area.children" @click="filter(item.id)"><a href="javascript:;">&nbsp; |- {{ item.name }}</a></li>
                      </template>
                    </ul>
                  </dropdown>
                </th>
                <th>是否显示</th>
                <th>管理</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in adss">
                <td>
                  <a class="media" v-link="item.link" target="_blank">
                    <div class="media-left">
                      <img v-bind:src="item.img | resize" width="100" height="100">
                    </div>
                    <div class="media-body">
                      {{ item.name }}
                    </div>
                  </a>
                </td>
                <td>{{ item.area | areaText }}</td>
                <td>{{ item.ishidden | ishidden }}</td>
                <td>
                  <button class="btn btn-sm btn-primary" @click="editAds($index)">编辑</button>
                  <button class="btn btn-sm btn-default" @click="delAds(item._id, $index)">删除</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="col-md-12 text-right">
            <pages :total.sync="page.total" :current="page.current" :per-page="page.perPage" :page-changed="pageCallback"></pages>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--添加幻灯片-->
  <modal :show.sync="showAdsModal" title="幻灯片">
    <div slot="modal-body" class="modal-body">
      <form class="form-horizontal" v-ajax-submit @submit.prevent="saveAds">
        <div class="form-horizontal">
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">幻灯片名</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="ads.name" required>
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">图片</label>
            <div class="col-sm-10">
              <upload id="pick-img" :img.sync="ads.img"></upload>
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">链接</label>
            <div class="col-sm-10">
              <input type="url" class="form-control" v-model="ads.link">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">宽高</label>
            <div class="col-sm-3">
              <input type="number" class="form-control" v-model="ads.width" placeholder="宽">
            </div>
            <div class="col-sm-3">
              <input type="number" class="form-control" v-model="ads.height" placeholder="高">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">排序</label>
            <div class="col-sm-10">
              <input type="number" class="form-control" v-model="ads.sortid">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">显示位置</label>
            <div class="col-sm-10">
              <select name="" class="form-control" v-model="ads.area" required>
                <template v-for="area in areas">
                <option :value="area.id">{{area.name}}</option>
                <option v-if="area.children && area.children.length" v-for="item in area.children" :value="item.id">&nbsp; |- {{ item.name }}</option>
                </template>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">是否显示</label>
            <div class="col-sm-10">
              <label class="radio-inline">
                <input type="radio" name="isTop" value="1" v-model="ads.ishidden"> 显示
              </label>
              <label class="radio-inline">
                <input type="radio" name="isTop" value="0" v-model="ads.ishidden"> 隐藏
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

  //幻灯片默认配置
  var adsOpt = {
    ishidden: 1,
    target: '_blank',
    sortid: 1,
    area:0
  }
  //显示位置  area
  // 1=>首页; 2=>列表页; 3=>专业镇; 4=>专业市场; 其他按id来。


  module.exports = {
    data: function() {
      return {
        showAdsModal: false,

        //幻灯片
        adss: [],  //幻灯片集合
        ads: $.extend({}, adsOpt), //当前幻灯片
        adsIndex: '', //当前幻灯片索引

        areas: [
          {id: 1, name: '首页', children: []},
          {id: 2, name: '样品中心', children: []},
          {id: 3, name: '专业镇', children: []},
          {id: 4, name: '专业市场', children: []}
        ],
        page: {
          total: null,
          current: 1,
          perPage: 10
        },
        search: {
          area: null
        }
      }
    },
    route: {
      data: function(transition) {
        this.getArea();
        this.getAds();
      }
    },
    methods: {
      filter: function(id) {
        this.search.area = id;
        this.page.current = 1;
        this.page.total = null;
        this.getAds();
        //this.$children[1].$el.classList.toggle('open')
      },
      //楼层幻灯片
      //获取幻灯片
      getAds: function () {
        var self = this;
        var params = $.extend({}, this.page, this.search)
        $.ajax({
          url: domain + '/ads',
          data: params,
          type: 'GET'
        })
        .done(function(res) {
          if (1 == res.status) {
            self.page.total = res.count;
            self.adss = res.data;
          }
        });
      },

      addAds: function () {
        this.ads = $.extend({}, adsOpt);
        this.showAdsModal = true;
        console.log(111111111,this.areas)
      },
      editAds: function (index) {
        this.ads = this.adss[index];
        this.adsIndex = index;
        this.showAdsModal = true;
      },
      //保存幻灯片
      saveAds: function () {
        var self = this;
        var param = JSON.parse(JSON.stringify(this.ads));
        //楼层id
        $.ajax({
          url: domain + '/ads',
          type: 'POST',
          dataType: 'json',
          data: param
        })
        .done(function(res) {
          if (1 == res.status) {
            if (param._id) {
              self.adss.$set(self.adsIndex, param);
            } else {
              param._id = res.data._id;
              self.adss.push(param);
            }
            self.showAdsModal = false;
          }
        });
      },
      //删除幻灯片
      delAds: function (id, index) {
        var self = this;
        if (id) {
          $.ajax({
            url: domain + '/ads/' + id,
            type: 'delete'
          })
          .done(function(res) {
            if (1 == res.status) {
              self.adss.splice(index, 1);
            }
          });
        }
      },
      pageCallback: function(page) {
        this.page.current = page;
        this.getAds();
      },

      getArea: function(){
        var self = this;
        $.ajax({
          url: domain + '/industrial',
          data: {perPage: 100},
          type: 'GET'
        })
        .done(function(res) {
          if ('1' == res.status && res.data) {
            var a = [];
            for (var i = 0; i < res.data.length; i++) {
              a.push({id: res.data[i]._id, name: res.data[i].name})
            }
            self.areas[2].children = a;
          }
        });

        $.ajax({
          url: domain + '/market',
          data: {perPage: 100},
          type: 'GET'
        })
        .done(function(res) {
          if ('1' == res.status && res.data) {
            var a = [];
            for (var i = 0; i < res.data.length; i++) {
              a.push({id: res.data[i]._id, name: res.data[i].name})
            }
            self.areas[3].children = a;
          }
        });

      }
    },

    filters: {
      areaText: function(val) {
        var res = '其他';
        if (val) {
          for (var i = this.areas.length - 1; i >= 0; i--) {
            if (this.areas[i].id == val) {
              res = this.areas[i].name;
              break;
            }
            var children = this.areas[i].children;
            if (children && children.length) {
              for (var x = children.length - 1; x >= 0; x--) {
                if (children[x].id == val) {
                  res = this.areas[i].name + ' - ' + children[x].name;
                  break;
                }
              }
            }
          }
        }
        return res;
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
  .dropdown-area{
    max-height: 300px;
    overflow-y:auto;
  }
  .table-responsive{
    overflow: visible;
  }
</style>
