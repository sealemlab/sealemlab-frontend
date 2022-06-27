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
    component: () => import("../views/Bond/index.vue"),
  },
  {
    path: "/nft",
    // name: "NFT",
    component: () => import("../views/Nft/index.vue"),
    children: [
      { path: "/", redirect: "buy-blind-box/0" },
      {
        path: "buy-blind-box/:boxtype",
        name: "BuyBlindBox",
        component: () => import("../views/Nft/components/BuyBlindBox.vue"),
      },
      {
        path: "blind-box",
        name: "BlindBox",
        component: () => import("../views/Nft/components/MyBlindBox.vue"),
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
    path: "/game",
    // name: "Game",
    component: () => import("../views/Game/Indexview.vue"),
    children: [
      { path: "/", redirect: "game" },
      {
        path: "game",
        name: "Game",
        component: () => import("../views/Game/components/Game.vue"),
      },
      {
        path: "rechargeclaim",
        name: "RechargeClaim",
        component: () => import("../views/Game/components/RechargeClaim.vue"),
      },
      {
        path: "gamedata",
        name: "GameData",
        component: () => import("../views/Game/components/GameData.vue"),
      },
      {
        path: "updation",
        name: "Updation",
        component: () => import("../views/Game/components/Updation.vue"),
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
        path: "feedback/:id",
        name: "Feedback",
        component: () => import("../views/User/feedback.vue"),
      },
      {
        path: "invite/:id",
        name: "Invite",
        component: () => import("../views/User/invite.vue"),
      },
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
      },
    ],
  },
  {
    path: "/activepage/:id",
    name: "ActivePage",
    component: () => import("../views/ActivityPage/index.vue"),
  },
  {
    path: "/market",
    name: "Market",
    component: () => import("../views/Market/index.vue"),
  },
  {
    path: "/staking",
    name: "Staking",
    component: () => import("../views/Staking/index.vue"),
  },
];

const router = new VueRouter({
  routes,
});
export default router;
