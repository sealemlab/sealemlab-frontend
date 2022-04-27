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
    path: "/bond",
    name: "Bond",
    component: () => import("../views/Bond/inedx.vue"),
  },
  {
    path: "/nft",
    // name: "NFT",
    component: () => import("../views/Nft/index.vue"),
    children: [
      { path: "/", redirect: "buy-blind-box" },
      {
        path: "buy-blind-box",
        name: "BuyBlindBox",
        component: () => import("../views/Nft/components/BuyBlindBox.vue"),
      },
      {
        path: "blind-box",
        name: "BlindBox",
        component: () => import("../views/Nft/components/BlindBox.vue"),
      },
      {
        path: "my-nft",
        name: "MyNft",
        component: () => import("../views/Nft/components/MyNft.vue"),
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
  {
    path: "/signin/:name",
    name: "SignIn",
    component: () => import("../views/Login/index.vue"),
  },
  {
    path: "/myaccount",
    component: () => import("../views/Myaccount/index.vue"),
    children: [
      { path: "/", redirect: "information" },
      {
        path: "bindwallet",
        name: "BindWallet",
        component: () => import("../views/Myaccount/bindwallet.vue"),
      },
      {
        path: "information",
        name: "Information",
        component: () => import("../views/Myaccount/information.vue"),
      }
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
