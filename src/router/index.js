import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      component: resolve =>
        require(["@/components/common/Main.vue"], resolve),
      children: [{
        path: "/",
        component: resolve =>
          require(["@/components/index/Home.vue"], resolve)
      },
      {
        path: "/account",
        component: resolve =>
          require(["@/components/index/Account.vue"], resolve)
      },
      {
        path: "/operationLog",
        component: resolve =>
          require(["@/components/index/OperationLog.vue"], resolve)
      },
      {
        path: "/houseAnn",
        component: resolve =>
          require(["@/components/house/HouseAnn.vue"], resolve)
      },
      {
        path: "/vote",
        component: resolve =>
          require(["@/components/house/Vote.vue"], resolve)
      },
      {
        path: "/ownersMessage",
        component: resolve =>
          require(["@/components/owners/OwnersMessage.vue"], resolve)
      },
      {
        path: "/ownersGroup",
        component: resolve =>
          require(["@/components/owners/OwnersGroup.vue"], resolve)
      },
      {
        path: "/management",
        component: resolve =>
          require(["@/components/owners/Management.vue"], resolve)
      },
      {
        path: "/houseMessage",
        component: resolve =>
          require(["@/components/dataCenter/houseMessage.vue"], resolve)
      },
      {
        path: "/houseManagement",
        component: resolve =>
          require(["@/components/dataCenter/houseManagement.vue"], resolve)
      },
      {
        path: "/ownersManagement",
        component: resolve =>
          require(["@/components/dataCenter/ownersManagement.vue"], resolve)
      },
      {
        path: "/residentsManagement",
        component: resolve =>
          require(["@/components/dataCenter/residentsManagement.vue"], resolve)
      },
      {
        path: "/wordManagement",
        component: resolve =>
          require(["@/components/dataCenter/wordManagement.vue"], resolve)
      }]
    }
  ]
})
