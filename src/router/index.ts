import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: any) {
  return (originalPush.call(this, location) as any).catch((err: any) => err);
};

const routes: Array<RouteConfig> = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home/IndexView.vue"),
  },
  {
    path: "/nft",
    // name: "NFT",
    component: () => import("../views/Nft/index.vue"),
    children: [
      { path: "/", redirect: "role" },
      {
        path: "role",
        name: "Role",
        component: () => import("../views/Nft/components/Role.vue"),
      },
      {
        path: "buy-blind-box",
        name: "BuyBlindBox",
        component: () => import("../views/Nft/components/BuyBlindBox.vue"),
      },
      {
        path: "giving",
        name: "Giving",
        component: () => import("../views/Nft/components/Giving.vue"),
      },
      {
        path: "lease",
        name: "Lease",
        component: () => import("../views/Nft/components/Lease.vue"),
      },
    ],
  },
  {
    path: "/user",
    // name: "User",
    component: () => import("../views/User/index.vue"),
    children: [
      { path: "/", redirect: "assets" },
      {
        path: "assets/:id",
        name: "Assets",
        component: () => import("../views/User/assets.vue"),
      },
      {
        path: "blindbox/:id",
        name: "Blindbox",
        component: () => import("../views/User/blindbox.vue"),
      },
      {
        path: "invite/:id",
        name: "Invite",
        component: () => import("../views/User/invite.vue"),
      }
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
