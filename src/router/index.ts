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
    name: "NFT",
    component: () => import("../views/Nft/index.vue"),
    children: [
      { path: "/", redirect: "nft1" },
      {
        path: "nft1",
        name: "nft1",
        component: () => import("../views/Nft/components/nft1.vue"),
      },
      {
        path: "nft2",
        name: "nft2",
        component: () => import("../views/Nft/components/nft2.vue"),
      },
      {
        path: "nft3",
        name: "nft3",
        component: () => import("../views/Nft/components/nft3.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
