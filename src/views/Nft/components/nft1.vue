<template>
  <div class="swiper_box">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(img, index) in images" :key="index">
        <img :src="img" alt="" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class nft1 extends Vue {
  public images = [
    "https://ossweb-img.qq.com/upload/adw/image/977/20220311/6c9d2faedc34a2aa2d83c8cf3e737810.jpeg",
    "https://ossweb-img.qq.com/upload/adw/image/977/20220304/e6c56000016e222239624d9220bb33e0.jpeg",
    "https://ossweb-img.qq.com/upload/adw/image/977/20220315/31ed1878f26bca2dc8d745f495302e86.jpeg",
    "https://ossweb-img.qq.com/upload/adw/image/977/20220314/893b0f92a21ddf726e7057b3bc7e90ed.jpeg",
  ];
  public swiperOption = {
    loop: true,
    mousewheel: true,
    autoplay: {
      delay: 500,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };
}
</script>

<style></style>
