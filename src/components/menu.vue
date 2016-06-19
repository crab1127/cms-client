<template>
  <header class="main-header">
    <a href="/" class="logo">广贸cms</a>
    <nav class="navbar navbar-static-top">
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li class="dropdown notifications-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <span class="hidden-xs" id="adminUserName">{{name}}</span>
            </a>
          </li>
          <li class="dropdown user user-menu">
            <a href="javascript:;" class="dropdown-toggle" @click="logout">
              <span class="hidden-xs" id="adminUserName">退出</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <div class="main-sidebar">
    <div class="sidebar">
      <ul class="sidebar-menu">
        <li class="header">菜单</li>
        <li class="treeview">
          <a>内容管理</a>
          <ul class="treeview-menu" style="display:block;">
            <li v-link="{ path: '/product', activeClass: 'active' }"><a v-link="{ path: '/product', activeClass: 'active' }">产品管理</a></li>
            <li v-link="{ path: '/sort', activeClass: 'active'}"><a v-link="{ path: '/sort', activeClass: 'active'}">类目管理</a></li>
            <li v-link="{ path: '/ad', activeClass: 'active' }"><a v-link="{ path: '/ad', activeClass: 'active' }">广告管理</a></li>
            <!-- <li v-link="{ path: '/nav', activeClass: 'active' }"><a v-link="{ path: '/nav', activeClass: 'active' }">导航管理</a></li> -->
          </ul>
        </li>
        <li class="treeview">
          <a>栏目管理</a>
          <ul class="treeview-menu" style="display:block;">
            <li v-link="{ path: '/home', activeClass: 'active' }"><a v-link="{ path: '/home', activeClass: 'active' }">首页</a></li>
            <li v-link="{ path: '/sample', activeClass: 'active' }"><a v-link="{ path: '/sample' }">样品中心</a></li>
            <li v-link="{ path: '/industrial', activeClass: 'active' }"><a v-link="{ path: '/industrial', activeClass: 'active' }">广货基地</a></li>
            <li v-link="{ path: '/market', activeClass: 'active' }"><a v-link="{ path: '/market', activeClass: 'active' }">专业市场</a></li>
            <!-- <li v-link="{ path: '/d', activeClass: 'active'}"><a v-link="{ path: '/d', activeClass: 'active'}">招商加盟</a></li> -->
          </ul>
        </li>
        <li class="treeview">
          <a>系统管理</a>
          <ul class="treeview-menu" style="display:block;">
            <li v-link="{ path: '/user', activeClass: 'active'}"><a v-link="{ path: '/user'}">用户管理</a></li>
            <li v-link="{ path: '/views', activeClass: 'active'}"><a v-link="{ path: '/views'}">视图管理</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  module.exports = {
    data: function() {
      return {
        name: localStorage.name
      }
    },
    methods: {
      logout: function() {

        localStorage.removeItem('name');
        $.ajax({
          url: domain + '/logout',
          type: 'POST',
          data: {name: localStorage.name},
        });

        this.$route.router.go('/login');
      }
    }
  }

</script>
