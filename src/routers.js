module.exports = function(router) {
  router.map({
    '/': {
      component: function(resolve) {
        require(['./views/home.vue'], resolve);
      }
    },
    //404
    '*': {
      component: function(resolve) {
        require(['./views/home.vue'], resolve)
      }
    },
    'login': {
      component: function(resolve) {
        require(['./views/login.vue'], resolve)
      }
    },
    //类目管理
    'sort': {
      component: function(resolve) {
        require(['./views/sort.vue'], resolve)
      }
    },
    //广告管理
    'ad': {
      component: function(resolve) {
        require(['./views/ad.vue'], resolve)
      }
    },
    //产品
    'product': {
      component: function(resolve) {
        require(['./views/product.vue'], resolve)
      }
    },
    //导航
    'nav': {
      component: function(resolve) {
        require(['./views/nav.vue'], resolve)
      }
    },
    //首页
    'home': {
      component: function(resolve) {
        require(['./views/home.vue'], resolve)
      }
    },
    //广货基地
    'industrial': {
      component: function(resolve) {
        require(['./views/industrial.vue'], resolve)
      }
    },
    'industrial/:id': {
      component: function(resolve) {
        require(['./views/industrialContent.vue'], resolve)
      }
    },
    //专业市场
    'market': {
      component: function(resolve) {
        require(['./views/market.vue'], resolve)
      }
    },
    'market/:id': {
      component: function(resolve) {
        require(['./views/marketContent.vue'], resolve)
      }
    },
    //样品中心
    'sample': {
      component: function(resolve) {
        require(['./views/sample.vue'], resolve)
      }
    },
    //招商加盟
    'join': {
      component: function(resolve) {
        require(['./views/nav.vue'], resolve)
      }
    },
    //招商加盟
    'user': {
      component: function(resolve) {
        require(['./views/user.vue'], resolve)
      }
    },
    'views': {
      component: function(resolve) {
        require(['./views/views.vue'], resolve)
      }
    },
  })
}
