<template>
  <div class="home">
    <div class="home_bgbox">
      <LoadingAnmation v-if="videoStatus"></LoadingAnmation>
      <video class="video_" ref="video" loop autoplay muted v-show="!videoStatus">
        <source :src="`${$store.state.videoUrl}home_sacredrealm.mp4`" type="video/mp4" />
      </video>
      <div class="content">
        <div class="content_center">
          <div class="leftbox" :class="isEnLang?'en_Bold':''">
            <p class="font_1 font26 mobile_font16">{{$t("message.home.txt2")}}</p>
            <p class="font_2 demo_font_color font45 mobile_font28" :class="isEnLang?'en_heavy':''">{{$t("message.home.add_txt1")}}</p>
            <div class="btnbox font20 mobile_font16">
              <span @click="bondClick">{{$t("message.home.txt3")}}</span>
              <span>{{$t("message.home.txt4")}}</span>
            </div>
          </div>
          <div class="rightbox">
            <a :href="isEnLang?(item.link_en?item.link_en:item.link):item.link" target="_blank" rel="noopener noreferrer" v-for="(item,index) in comminicateArr" :key="index"><img :src="item.src" class="tel_img" /></a>
          </div>
        </div>
      </div>
      <img :src="haveVoice?`${$store.state.imgUrl}new_voice.webp`:`${$store.state.imgUrl}new_no_voice.webp`" class="voice_img" @click="videoPlay"/>
    </div>
    <div class="content_footer">
      <div class="left" :class="isEnLang?'en_medium':''">
        <span class="font30 mobile_font16">{{$t("message.home.txt5")}}</span>
        <span class="font30 mobile_font16 margin_top">{{$t("message.home.txt6")}}</span>
      </div>
      <div class="btnbox font20 mobile_font16" :class="isEnLang?'en_Bold':''">
        <span>{{$t("message.home.txt7")}}</span>
        <span @click="gamesFun">{{$t("message.home.txt8")}}</span>
      </div>
    </div>
    <!-- Protocol Stats -->
    <div class="characteristic_box">
      <div class="title_txt font32 mobile_font18" :class="isEnLang?'en_heavy':''">{{$t("message.home.txt77")}}</div>
      <div class="border_">
        <div class="add_one_box" :class="{ add_top_content_center: index == 1 || index == 4,add_top_content_end: index == 2 || index == 5 }" v-for="(item,index) in addArr" :key="index">
          <div class="whole">
            <div class="add_top_content">
              <div class="iconbox">
                <font-awesome-icon :icon="['fas','boxes-packing']" v-if="index == 0 "></font-awesome-icon>
                <font-awesome-icon :icon="['fas','building-flag']" v-if="index == 1 "></font-awesome-icon>
                <font-awesome-icon :icon="['fas','coins']" v-if="index == 2 "></font-awesome-icon>
                <font-awesome-icon :icon="['fas','registered']" v-if="index == 5 "></font-awesome-icon>
                <svg t="1653721794550" v-if="index == 3" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2162" :width="getIsMobile?16:32"><path d="M409.714286 773.714286l154.857143-154.857143-159.428571-159.428571-50.285714 50.285714 109.714286 109.142857-54.857143 54.857143-159.428571-159.428571 159.428571-159.428571 22.857143 22.857143 49.714286-49.714286-72.571429-73.142857-259.428571 259.428571zm204.571429-4.571429l259.428571-259.428571-259.428571-259.428571-154.857143 154.857143 159.428571 159.428571 50.285714-50.285714-109.714286-109.142857 54.857143-54.857143 159.428571 159.428571-159.428571 159.428571-22.857143-22.857143-49.714286 50.285714zm409.714286-257.142857q0 104-40.571429 198.857143t-109.142857 163.428571-163.428571 109.142857-198.857143 40.571429-198.857143-40.571429-163.428571-109.142857-109.142857-163.428571-40.571429-198.857143 40.571429-198.857143 109.142857-163.428571 163.428571-109.142857 198.857143-40.571429 198.857143 40.571429 163.428571 109.142857 109.142857 163.428571 40.571429 198.857143z" p-id="2163" fill="#9E9E9E"></path></svg>
                <svg t="1653721184598" v-if="index == 4" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3417" :width="getIsMobile?16:32"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m22.3 665.2l0.2 31.7c0 4.4-3.6 8.1-8 8.1h-28.4c-4.4 0-8-3.6-8-8v-31.4C401.3 723 359.5 672.4 355 617.4c-0.4-4.7 3.3-8.7 8-8.7h46.2c3.9 0 7.3 2.8 7.9 6.6 5.1 31.7 29.8 55.4 74.1 61.3V533.9l-24.7-6.3c-52.3-12.5-102.1-45.1-102.1-112.7 0-72.9 55.4-112.1 126.2-119v-33c0-4.4 3.6-8 8-8h28.1c4.4 0 8 3.6 8 8v32.7c68.5 6.9 119.9 46.9 125.9 109.2 0.5 4.7-3.2 8.8-8 8.8h-44.9c-4 0-7.4-3-7.9-6.9-4-29.2-27.4-53-65.5-58.2v134.3l25.4 5.9c64.8 16 108.9 47 108.9 116.4 0 75.3-56 117.3-134.3 124.1zM426.6 410.3c0 25.4 15.7 45.1 49.5 57.3 4.7 1.9 9.4 3.4 15 5v-124c-36.9 4.7-64.5 25.4-64.5 61.7z m116.5 135.2c-2.8-0.6-5.6-1.3-8.8-2.2V677c42.6-3.8 72-27.2 72-66.4 0-30.7-15.9-50.7-63.2-65.1z" p-id="3418" fill="#9E9E9E"></path></svg>
              </div>
              <span class="span font24" :class="isEnLang?'en_medium':''">{{$t(item.title)}}</span>
            </div>
            <p class="font35" :class="isEnLang?'en_heavy':''">{{item.num}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 希莱姆简介 -->
    <div class="character_introduction">
      <div class="title_txt font32 mobile_font18" :class="isEnLang?'en_heavy':''">{{$t("message.home.txt9")}}</div>
      <div class="right_box">
        <div class="mobile_people_box">
          <img :src="`${$store.state.imgUrl}new_people.webp`" class="people" />
        </div>
        <span class="txt_content font16" :class="isEnLang?'en_medium':'cn_lang'">{{ $t("message.home.txt9_1")}}</span>
      </div>
      <div class="people_box">
        <img :src="`${$store.state.imgUrl}new_people.webp`" class="people" />
      </div>
    </div>
    <!-- 游戏场景轮播 -->
    <div class="characteristic_box">
      <div class="title_txt font32 mobile_font18" :class="isEnLang?'en_heavy':''">{{$t("message.home.txt65")}}</div>
      <div class="gamebox">
        <div class="add_game_txt">
          <span class="span1 font24 mobile_font14" :class="isEnLang?'en_Bold':''">{{$t("message.home.txt66")}}</span>
          <span class="span2 font16" @click="gamesFun" :class="isEnLang?'en_medium':''">{{$t("message.home.txt67")}}</span>
        </div>
        <span class="span3 font12" :class="isEnLang?'en_medium':''">{{$t("message.home.txt68")}}</span>
        <div class="add_box">
          <div class="left right mobile_game_box" :class="isEnLang?'en_medium':''">
            <div class="before_box">
              <div class="add_out_box">
                <img :src="`${$store.state.imgUrl}new_game2.webp`" class="game2" />
              </div>
              <!-- <span>{{$t("message.tip.txt5")}}</span> -->
            </div>
            <div class="before_box">
              <img :src="`${$store.state.imgUrl}game3.webp`" class="game2" />
              <span>{{$t("message.tip.txt5")}}</span>
            </div>
            <div class="before_box">
              <img :src="`${$store.state.imgUrl}game4.webp`" class="game2" />
              <span>{{$t("message.tip.txt5")}}</span>
            </div>
          </div>
          <div class="left">
            <div class="bottom_swiper">
              <swiper :options="gameMaxSwiperOption" ref="gameMaxSwiper" class="gameMax_swiper">
                <swiper-slide v-for="(item,index) in gameArr" :key="index">
                  <img :src="item.maxSrc" />
                </swiper-slide>
              </swiper>
            </div>
            <span class="span4 font24" :class="isEnLang?'en_Bold':''">{{$t("message.home.txt69")}}</span>
            <div class="gameswiperbox">
              <swiper ref="gameswiper" :options="gameswiperOption" class="game_swiper">
                <swiper-slide v-for="(item, index) in gameArr" :key="index">
                  <div class="oneimgbox" @click="gameClick(item)"><img :src="item.src" class="gameswiper_img" /></div>
                </swiper-slide>
              </swiper>
              <!-- <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div> -->
            </div>
          </div>
          <div class="left right pc_box font16" :class="isEnLang?'en_medium':''">
            <div class="before_box">
              <div class="add_out_box">
                <img :src="`${$store.state.imgUrl}new_game2.webp`" class="game2" />
              </div>
              <!-- <span>{{$t("message.tip.txt5")}}</span> -->
            </div>
            <div class="before_box">
              <img :src="`${$store.state.imgUrl}game3.webp`" class="game2" />
              <span>{{$t("message.tip.txt5")}}</span>
            </div>
            <div class="before_box">
              <img :src="`${$store.state.imgUrl}game4.webp`" class="game2" />
              <span>{{$t("message.tip.txt5")}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 灰色区域---特点-在圣域怎么赚钱 -->
    <div class="content_">
      <!-- 特点 -->
      <div class="box_ display_flex">
        <div class="title_txt font32 mobile_font18" :class="isEnLang?'en_heavy':''">{{$t("message.home.txt_characteristic")}}</div>
        <div class="imgbox display_flex">
          <div class="add_outbox" :class="isEnLang?'en_class':''" v-for="(item, index) in spArr" :key="index">
            <div class="onebox display_flex">
              <div class="add_content">
                <svg t="1653722205715" v-if="index == 0" class="icon" viewBox="0 0 1281 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2643" :width="getIsMobile?16:32" :height="getIsMobile?16:32"><path d="M1278.7257 634l-56-364c-16-102-92-184-190-206C774.7257 6 506.7257 6 248.7257 64 148.7257 86 74.7257 168 58.7257 270L2.7257 634c-22 148 92 282 240 282 94 0 178-52 218-136l28-56h304l28 56c40 84 124 136 216 136h2c148 0 262-134 240-282z m-130 136c-28 32-68 50-112 50-54 0-104-30-130-82l-36-74c-12-22-34-36-58-36H468.7257c-24 0-48 14-58 36l-36 74c-26 52-76 82-132 82-42 0-82-18-110-50-28-34-42-78-34-122l54-362c10-64 56-114 118-128 244-56 496-56 740 0 62 14 108 64 118 128l54 362c6 44-6 88-34 122zM800.7257 436c-36 0-64 30-64 64s28 64 64 64 64-28 64-64-28-64-64-64z m-304-80h-64v-64c0-26-22-48-48-48s-48 22-48 48v64h-64c-26 0-48 22-48 48s22 48 48 48h64v64c0 26 22 48 48 48s48-22 48-48v-64h64c26 0 48-22 48-48s-22-48-48-48z m432-112c-36 0-64 30-64 64s28 64 64 64 64-28 64-64-28-64-64-64z" p-id="2644" fill="#D4BA76"></path></svg>
                <svg t="1653723405535" v-if="index == 4 " class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3050" :width="getIsMobile?16:32" :height="getIsMobile?16:32"><path d="M512 256C299.946667 256 85.333333 321.962667 85.333333 448v170.666667C85.333333 744.704 299.946667 810.666667 512 810.666667s426.666667-65.962667 426.666667-192v-170.666667C938.666667 321.962667 724.053333 256 512 256z m-341.333333 362.666667v-51.072a426.197333 426.197333 0 0 0 85.333333 36.693333v80.256c-55.978667-21.930667-85.333333-48.042667-85.333333-65.877333z m512 6.314666v84.096c-36.992 7.637333-79.658667 13.226667-128 15.274667v-85.333333a928 928 0 0 0 128-14.037334z m-213.333334 99.413334a801.621333 801.621333 0 0 1-128-15.274667v-84.096c40.917333 7.424 84.138667 12.245333 128 14.08v85.290667z m298.666667-39.850667v-80.256a423.722667 423.722667 0 0 0 85.333333-36.693333V618.666667c0 17.834667-29.312 43.946667-85.333333 65.877333zM512 554.666667c-220.885333 0-341.333333-70.442667-341.333333-106.666667S291.114667 341.333333 512 341.333333s341.333333 70.442667 341.333333 106.666667-120.448 106.666667-341.333333 106.666667z" p-id="3051" fill="#D4BA76"></path></svg>
                <svg t="1653724967297" v-if="index == 2 " class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="57047" :width="getIsMobile?16:32" :height="getIsMobile?16:32"><path d="M512 0C441.6 0 373.76 14.08 309.12 42.24c-22.4 9.6-33.28 36.48-23.04 58.88 9.6 22.4 36.48 33.28 58.88 23.04 53.12-23.04 108.8-34.56 167.04-34.56 232.96 0 422.4 189.44 422.4 422.4s-189.44 422.4-422.4 422.4-422.4-189.44-422.4-422.4c0-51.2 8.96-101.12 26.88-148.48 8.96-23.04-3.2-49.28-26.24-57.6-23.04-8.96-49.28 3.2-57.6 26.24C10.88 389.76 0 449.92 0 512c0 282.24 229.76 512 512 512s512-229.76 512-512S794.24 0 512 0z" p-id="57048" fill="#D4BA76"></path><path d="M512.64 849.28c44.8 0 89.6-8.96 133.12-26.88 23.04-9.6 33.92-35.84 24.32-58.24-9.6-23.04-35.84-33.92-58.24-24.32-33.28 13.44-65.28 20.48-98.56 20.48-136.32 0-247.04-110.72-247.04-247.04s110.72-247.04 247.04-247.04 247.04 110.72 247.04 247.04c0 29.44-5.76 59.52-16 87.68-8.32 23.04 3.2 49.28 26.24 57.6 23.04 8.32 49.28-3.2 57.6-26.24 14.08-37.76 21.12-78.72 21.12-118.4 0-185.6-151.04-336.64-336.64-336.64S176 327.04 176 512.64s151.04 336.64 336.64 336.64z" p-id="57049" fill="#D4BA76"></path><path d="M363.52 512c0 81.92 67.2 149.12 149.12 149.12 81.28 0 148.48-66.56 149.12-149.12 0-81.92-67.2-149.12-149.12-149.12S363.52 430.08 363.52 512z m208.64-0.64c-0.64 33.28-26.88 60.16-59.52 60.16-32.64 0-59.52-26.88-59.52-59.52 0-32.64 26.88-59.52 59.52-59.52s59.52 26.88 59.52 58.88z" p-id="57050" fill="#D4BA76"></path></svg>
                <font-awesome-icon v-if="index == 1" :icon="['fas','circle-dollar-to-slot']"></font-awesome-icon>
                <font-awesome-icon v-if="index == 3" :icon="['fas','gem']"></font-awesome-icon>
                <span class="txt font24 mobile_font14" :class="isEnLang?'en_Bold':''">{{$t(item.txt)}}</span>
              </div>
              <span class="txt1 font16" :class="{en_medium:isEnLang,add_txt1:index == 1,add_txt2:index == 2,add_txt3:index == 3,add_txt4:index == 4}" >{{$t(item.txt1)}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 在圣域怎么赚钱 -->
      <div class="box_ display_flex">
        <div class="title_txt font32 mobile_font18" :class="isEnLang?'en_heavy':''">{{$t("message.home.txt_makemoney")}}</div>
        <div class="make_money">
          <div class="make_box" v-for="(item, index) in makeMoneyArr" :key="index">
            <div class="make_one">
              <div class="add_make_icon">
                <svg t="1653721184598" v-if="index == 0" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3417" :width="getIsMobile?16:32" :height="getIsMobile?16:32"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m22.3 665.2l0.2 31.7c0 4.4-3.6 8.1-8 8.1h-28.4c-4.4 0-8-3.6-8-8v-31.4C401.3 723 359.5 672.4 355 617.4c-0.4-4.7 3.3-8.7 8-8.7h46.2c3.9 0 7.3 2.8 7.9 6.6 5.1 31.7 29.8 55.4 74.1 61.3V533.9l-24.7-6.3c-52.3-12.5-102.1-45.1-102.1-112.7 0-72.9 55.4-112.1 126.2-119v-33c0-4.4 3.6-8 8-8h28.1c4.4 0 8 3.6 8 8v32.7c68.5 6.9 119.9 46.9 125.9 109.2 0.5 4.7-3.2 8.8-8 8.8h-44.9c-4 0-7.4-3-7.9-6.9-4-29.2-27.4-53-65.5-58.2v134.3l25.4 5.9c64.8 16 108.9 47 108.9 116.4 0 75.3-56 117.3-134.3 124.1zM426.6 410.3c0 25.4 15.7 45.1 49.5 57.3 4.7 1.9 9.4 3.4 15 5v-124c-36.9 4.7-64.5 25.4-64.5 61.7z m116.5 135.2c-2.8-0.6-5.6-1.3-8.8-2.2V677c42.6-3.8 72-27.2 72-66.4 0-30.7-15.9-50.7-63.2-65.1z" p-id="3418" fill="#DBDADA"></path></svg>
                <svg t="1653723586792" v-if="index == 5" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4129" :width="getIsMobile?16:32" :height="getIsMobile?16:32"><path d="M819.2 102.4V0H204.8v102.4H0v153.6a256 256 0 0 0 221.184 252.416 307.2 307.2 0 0 0 239.616 204.8V921.6H307.2v102.4h409.6v-102.4h-153.6v-209.408a307.2 307.2 0 0 0 239.616-204.8A256 256 0 0 0 1024 256V102.4zM102.4 256V204.8h102.4v196.096A153.6 153.6 0 0 1 102.4 256z m819.2 0a153.6 153.6 0 0 1-102.4 144.896V204.8h102.4z" p-id="4130" fill="#DBDADA"></path></svg>
                <svg t="1653723989071" v-if="index == 4" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" :width="getIsMobile?16:32" :height="getIsMobile?16:32"><path d="M213.333333 170.666667h597.333334a128 128 0 0 1 128 128v170.666666h-298.666667v-42.666666H384v42.666666H85.333333V298.666667a128 128 0 0 1 128-128m256 298.666666h85.333334v85.333334h-85.333334v-85.333334m-384 42.666667h298.666667v42.666667l85.333333 85.333333h85.333334l85.333333-85.333333v-42.666667h298.666667v341.333333H85.333333v-341.333333z" fill="#DBDADA" p-id="6468"></path></svg>
                <font-awesome-icon v-if="index == 1" :icon="['fas','money-bill']"></font-awesome-icon>
                <font-awesome-icon v-if="index == 2" :icon="['fas','file-invoice-dollar']"></font-awesome-icon>
                <font-awesome-icon v-if="index == 3" :icon="['fas','dice']"></font-awesome-icon>
              </div>
              <span class="_span font16 mobile_font14" :class="isEnLang?'en_medium':''">{{$t(item.txt)}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 团队 -->
    <!-- <div class="teamboxs">
      <div class="team_container display_flex">
        <div class="title_txt font32 mobile_font18" :class="isEnLang?'en_heavy':''">{{$t("message.home.txt47")}}</div>
        <div class="teamswiper">
          <swiper ref="teamswiper" :options="teamswiperOption" class="team_swiper">
            <swiper-slide v-for="(item, index) in teamArr" :key="index">
              <div class="out_box display_flex">
                <div class="oneteam display_flex" @click="showtxtFun(item)">
                  <img :src="item.src" class="teaming" />
                  <span class="span1 font20">{{$t(item.name)}}</span>
                  <span class="span2 font16">{{item.txt}}</span>
                  <div class="address_peopllle display_flex">
                    <a :href="item.LinY" target="_blank" rel="noopener noreferrer" v-if="item.LinY">
                      <img :src="`${$store.state.imgUrl}in.webp`" class="ling_ying" />
                    </a>
                    <a v-if="item.twitter == ''" href="javascript:;"><img :src="`${$store.state.imgUrl}twitter.webp`" class="twitter"/></a>
                    <a v-else :href="item.twitter" target="_blank" rel="noopener noreferrer">
                      <img :src="`${$store.state.imgUrl}twitter.webp`" class="twitter"/>
                    </a>
                  </div>
                  <span class="triangle_calss" :class="item.status?'triangle_top':'triangle_bottom'"></span>
                  <div class="txtbox font12" v-if="item.status">
                    <span>{{$t(item.introduce1)}}</span>
                    <span>{{$t(item.introduce2)}}</span>
                    <span>{{$t(item.introduce3)}}</span>
                    <span v-if="item.introduce4">{{$t(item.introduce4)}}</span>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
          <div class="swiper-button-prev-add"></div>
          <div class="swiper-button-next-add"></div>
        </div>
      </div>
    </div> -->
    <!-- 时间轴 -->
    <div class="time_axis_box">
      <div class="time_axis display_flex" @mouseover="enter" @mouseleave="leave">
        <div class="title_txt font32 mobile_font18" :class="isEnLang?'en_heavy':''">{{$t("message.home.txt54")}}</div>
        <swiper :options="swiperOption" ref="mySwiper" class="self_swiper" v-if='swiperVisible'>
          <swiper-slide v-for="(item, index) in swiperArr" :key="index">
            <div class="timebox">
              <p class="time_class font20" :class="isEnLang?'en_Bold':''">{{item.time}}</p>
              <div class="imgs">
                <img :src="item.id == activeIndex ?`${$store.state.imgUrl}partenerbg.webp`:`${$store.state.imgUrl}time.webp`" class="partenerbg_img" />
                <span></span>
              </div>
              <div class="contentbox_">
                <p class="titletxt font20" :class="isEnLang?'en_Bold':''">{{$t(item.title)}}</p>
                <p class="content_class font12" :class="isEnLang?'en_medium':''">{{$t(item.content)}}</p>
              </div>
            </div>
          </swiper-slide>
          <!-- <div class="swiper-pagination" slot="pagination"></div> -->
        </swiper>
        <div class="mobile_time_axis">
          <div class="one_all_box" v-for="(item, index) in swiperArr" :key="index">
            <div class="left">
              <img :src="`${$store.state.imgUrl}time.webp`" />
              <span></span>
            </div>
            <div class="right">
              <span class="span mobile_font14">{{item.time}}</span>
              <div class="bottom">
                <span class="b_titl mobile_font14" :class="isEnLang?'en_Bold':''">{{$t(item.title)}}</span>
                <span class="b_content" :class="isEnLang?'en_medium':''">{{$t(item.content)}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 合作者 -->
    <div class="characteristic_box display_flex">
      <div class="title_txt font32 mobile_font18" :class="isEnLang?'en_heavy':''">{{$t("message.home.txt59")}}</div>
      <div class="gamebox">
        <div class="partener_box display_flex">
          <div class="one_partener display_flex" v-for="(item, index) in partenerArr" :key="index">
            <a :href="item.link" target="_blank" rel="noopener noreferrer">
              <img :src="item.src" 
                :class="{
                  par1:index == 0,
                  par2:index == 1,
                  par3:index == 2,
                  par4:index == 3,
                  par5:index == 4,
                  par6:index == 5,
                  par7:index == 6,
                  par8:index == 7,
                  par9:index == 8,
                  par10:index == 9,
                  par11:index == 10,
                  par12:index == 11,
                  par13:index == 12,
                  par14:index == 13,
                  par15:index == 14,
                  par16:index == 15,
                  par17:index == 16,
                  par18:index == 17,
                  par19:index == 18,
                  par20:index == 19,
                }"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- 邀请者 -->
    <div class="characteristic_box display_flex">
      <div class="title_txt font32 mobile_font18" :class="isEnLang?'en_heavy':''">{{$t("message.home.txt78")}}</div>
      <div class="gamebox">
        <div class="partener_box display_flex">
          <div class="one_partener display_flex" v-for="(item, index) in inviteArr" :key="index">
            <img :src="item.src" 
              :class="{
                inviter_par1:index == 0,
                inviter_par2:index == 1,
                inviter_par3:index == 2
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { util } from 'sealemlab-sdk'
export default {
  computed: {
    ...mapGetters(["isEnLang","getIsMobile"])
  },
  data(){
    return{
      haveVoice:false,//声音
      swiperVisible:true,
      addArr:[
        {src:`${this.$store.state.imgUrl}home1.webp`,num:'$ 0',title:'message.home.txt71',icon:'boxes-packing'},
        {src:`${this.$store.state.imgUrl}home2.webp`,num:'$ 0',title:'message.home.txt72',icon:'building-flag'},
        {src:`${this.$store.state.imgUrl}home3.webp`,num:'$ 0',title:'message.home.txt73',icon:'coins'},
        {src:`${this.$store.state.imgUrl}home4.webp`,num:0,title:'message.home.txt74',icon:'boxes'},
        {src:`${this.$store.state.imgUrl}home5.webp`,num:'$ 0',title:'message.home.txt75',icon:'boxes'},
        {src:`${this.$store.state.imgUrl}home6.webp`,num:'$ 0',title:'message.home.txt76',icon:'registered'},
      ],
      activeIndex:0,//swiper索引
      videoStatus:true,//视频加载
      gameIndex:0,//游戏场景展示对应大图的索引
      comminicateArr:[
        {
          src:`${this.$store.state.imgUrl}tel_1.webp`,
          link:'https://t.me/sealemglobal'
        },
        {
          src:`${this.$store.state.imgUrl}tel_2.webp`,
          link:'https://twitter.com/SealemLab'
        },
        {
          src:`${this.$store.state.imgUrl}tel_3.webp`,
          link:'https://discord.gg/s747pMMBzq'
        },
        {
          src:`${this.$store.state.imgUrl}tel_5.webp`,
          link:'https://sacred-realm.gitbook.io/zhong-wen/',
          link_en:'https://lab-sealem.gitbook.io/sealem-lab/'
        },
        {
          src:`${this.$store.state.imgUrl}tel_4.webp`,
          link:'https://medium.com/@sealemlab'
        }
      ],
      spArr:[
        {
          icon:'',
          src:`${this.$store.state.imgUrl}characteristic1.webp`,
          txt:"message.home.txt10",
          txt1:"message.home.txt11",
        },
        {
          icon:'circle-dollar-to-slot',
          src:`${this.$store.state.imgUrl}characteristic2.webp`,
          txt:'message.home.txt12',
          txt1:'message.home.txt12_1',
        },
        {
          icon:'',
          src:`${this.$store.state.imgUrl}characteristic3.webp`,
          txt:'message.home.txt13',
          txt1:'message.home.txt13_1',
        },
        {
          icon:'gem',
          src:`${this.$store.state.imgUrl}characteristic4.webp`,
          txt:'message.home.txt14',
          txt1:'message.home.txt14_1',
        },
        {
          icon:'',
          src:`${this.$store.state.imgUrl}characteristic5.webp`,
          txt:'message.home.txt15',
          txt1:'message.home.txt15_1',
        }
      ],
      teamArr:[
        {
          src:`${this.$store.state.imgUrl}ceo.webp`,
          txt:'CEO',
          name:'message.home.txt48', // Domlane
          status:true,
          twitter:'https://twitter.com/CryptoDomLane',
          // LinY:'',
          introduce1:'message.home.introduce1',
          introduce2:'message.home.introduce2',
          introduce3:'message.home.introduce3',
        },
        {
          src:`${this.$store.state.imgUrl}cto.webp`,
          txt:'CMO',
          name:'message.home.txt50', //Greer Phantomhive
          status:false,
          twitter:'https://twitter.com/PhantomhiveGem',
          // LinY:'',
          introduce1:'message.home.introduce4',
          introduce2:'message.home.introduce5',
          introduce3:'message.home.introduce6',
        },
        {
          src:`${this.$store.state.imgUrl}cmo.webp`,
          txt:'CTO',
          name:'message.home.txt49', //Kim Talon
          status:false,
          twitter:'https://twitter.com/TalonKim',
          // LinY:'',
          introduce1:'message.home.introduce7',
          introduce2:'message.home.introduce8',
          introduce3:'message.home.introduce9',
        },
        {
          src:`${this.$store.state.imgUrl}svp.webp`,
          txt:'SVP',
          name:'message.home.txt51',//Amelia Emma
          status:false,
          twitter:'https://twitter.com/EmmaAmelialove',
          LinY:'https://www.linkedin.com/in/amelia-emma-a11914234/',
          introduce1:'message.home.introduce10',
          introduce2:'message.home.introduce11',
          introduce3:'message.home.introduce12',
        },
        {
          src:`${this.$store.state.imgUrl}founder.webp`,
          txt:'Co-Founder',
          name:'message.home.txt52',// Tinsley-Hafen
          status:false,
          twitter:'https://twitter.com/HenryEvans0',
          LinY:'https://www.linkedin.cn/injobs/in/henry-evans-4b3566233',
          introduce1:'message.home.introduce13',
          introduce2:'message.home.introduce14',
          introduce3:'message.home.introduce15',
        },
        {
          src:`${this.$store.state.imgUrl}founder1.webp`,
          txt:'Co-Founder',
          name:'message.home.txt53',//Henry Evans
          status:false,
          twitter:'https://twitter.com/HenryEvans0',
          LinY:'https://www.linkedin.cn/injobs/in/henry-evans-4b3566233',
          introduce1:'message.home.introduce16',
          introduce2:'message.home.introduce17',
          introduce3:'message.home.introduce18',
          introduce4:'message.home.introduce19',
        }
      ],
      makeMoneyArr:[
        {txt:"message.home.txt16",src:`${this.$store.state.imgUrl}money1.webp`,icon:''},
        {txt:"message.home.txt17",src:`${this.$store.state.imgUrl}money2.webp`,icon:'money-bill'},
        {txt:"message.home.txt18",src:`${this.$store.state.imgUrl}money3.webp`,icon:'file-invoice-dollar'},
        {txt:"message.home.txt19",src:`${this.$store.state.imgUrl}money4.webp`,icon:'dice'},
        {txt:"message.home.txt20",src:`${this.$store.state.imgUrl}money5.webp`,icon:''},
        {txt:"message.home.txt21",src:`${this.$store.state.imgUrl}money6.webp`,icon:''}
      ],
      partenerArr:[
        {
          id:3,//bnb chain
          src:`${this.$store.state.imgUrl}new_partener3.webp`,
          link:'https://bscscan.com/address/0x6f706319c46d1b28508e8e4bcaa59e47d15e028c'
        },
        {
          id:2,// coinmarketcap
          src:`${this.$store.state.imgUrl}new_partener2.webp`,
          link:'https://coinmarketcap.com/'
        },
        {
          id:1,//coingecko
          src:`${this.$store.state.imgUrl}new_partener1.webp`,
          link:'https://www.coingecko.com/'
        },
        {
          id:4,//pancakeswap
          src:`${this.$store.state.imgUrl}new_partener4.webp`,
          link:'https://pancakeswap.finance/swap/0x6F706319C46D1b28508E8e4bCaA59e47D15e028C'
        },
        {
          id:7,//bnbproject
          src:`${this.$store.state.imgUrl}new_partener7.webp`,
          link:'https://bnbproject.org/#/project/2464'
        },
        {
          id:8,//dappradar
          src:`${this.$store.state.imgUrl}new_partener8.webp`,
          link:'https://dappradar.com/binance-smart-chain/defi/sealem'
        },
        {
          id:5,//dapp
          src:`${this.$store.state.imgUrl}new_partener5.webp`,
          link:'https://www.dapp.com/'
        },
        {
          id:13,//certik
          src:`${this.$store.state.imgUrl}new_partener13.webp`,
          link:'https://www.certik.com/projects/sealem'
        },
        {
          id:12,//pinksale
          src:`${this.$store.state.imgUrl}new_partener12.webp`,
          link:'https://www.pinksale.finance/'
        },
        {
          id:20,//nuls
          src:`${this.$store.state.imgUrl}new_partener_add1.webp`,
          link:'https://nuls.io/'
        },
        {
          id:21,//form in
          src:`${this.$store.state.imgUrl}new_partener_add2.webp`,
          link:'https://fomoin.finance/'
        },
        {
          id:14,//planckx
          src:`${this.$store.state.imgUrl}new_partener14.webp`,
          link:'https://planckx.io/'
        },
        {
          id:11,//bitkeep
          src:`${this.$store.state.imgUrl}new_partener11.webp`,
          link:'https://bitkeep.com/'
        },
        {
          id:10,//tokenpocket
          src:`${this.$store.state.imgUrl}new_partener10.webp`,
          link:'https://www.tokenpocket.pro/'
        },
        {
          id:17,//nabox
          src:`${this.$store.state.imgUrl}new_partener17.webp`,
          link:'https://nabox.io/'
        },
        {
          id:6,//coin98
          src:`${this.$store.state.imgUrl}new_partener6.webp`,
          link:'https://coin98.com/'
        },
        {
          id:9,//mathwallet
          src:`${this.$store.state.imgUrl}new_partener9.webp`,
          link:'https://mathwallet.org/'
        },
        {
          id:16,//safepal
          src:`${this.$store.state.imgUrl}new_partener16.webp`,
          link:'https://safepal.io/'
        },
        {
          id:15,//onto
          src:`${this.$store.state.imgUrl}new_partener15.webp`,
          link:'https://onto.app/'
        },
        {
          id:19,//coinhub
          src:`${this.$store.state.imgUrl}new_partener19.webp`,
          link:'https://www.coinhub.org/'
        }
      ],
      swiperArr:[
        {
          id:4,
          title:'message.home.txt55_1',
          time:'2021 Q3',
          content:'message.home.txt55'
        },
        {
          id:5,
          title:'message.home.txt56_1',
          time:'2021 Q4',
          content:'message.home.txt56'
        },
        {
          id:6,
          title:'message.home.txt57_1',
          time:'2022 Q1',
          content:'message.home.txt57'
        },
        {
          id:7,
          title:'message.home.txt58_1',
          time:'2022 Q2',
          content:'message.home.txt58'
        },
        {
          id:8,
          title:'message.home.txt60_1',
          time:'2022 Q3',
          content:'message.home.txt60'
        },
        {
          id:9,
          title:'message.home.txt61_1',
          time:'2022 Q4',
          content:'message.home.txt61'
        },
        {
          id:10,
          title:'message.home.txt62_1',
          time:'2023 Q1',
          content:'message.home.txt62'
        },
        {
          id:11,
          title:'message.home.txt63_1',
          time:'2023 Q2',
          content:'message.home.txt63'
        },
        {
          id:12,
          title:'message.home.txt64_1',
          time:'2023 Q3',
          content:'message.home.txt64'
        },
        {
          id:13,
          title:'message.home.add_txt65_1',
          time:'2023 Q4',
          content:'message.home.add_txt65'
        }
      ],
      // 路线图swiper配置
      swiperOption:{
        loop: true,//循环播放
        centeredSlides: true, // 多个slider时居中
        autoplay: {
          delay: 2500,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        slidesPerView: 4,//一行显示的slider
        // freeMode: true,//	free模式，slide会根据惯性滑动且不会贴合
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        },
        on: {
          slideChange: () => {
            this.activeIndex = this.$refs.mySwiper.swiper.activeIndex;
            // console.log('this.activeIndex: ', this.activeIndex);
          }
        }
      },
      // 团队swiper配置
      teamswiperOption: {
        slidesPerView: 4,
        navigation: {
          nextEl: ".swiper-button-next-add",
          prevEl: ".swiper-button-prev-add",
        }
      },
      gameArr:[
        {
          id:1,
          src:`${this.$store.state.imgUrl}smallgame1.webp`,
          maxSrc:`${this.$store.state.imgUrl}maxgame1.webp`
        },
        {
          id:2,
          src:`${this.$store.state.imgUrl}smallgame2.webp`,
          maxSrc:`${this.$store.state.imgUrl}maxgame2.webp`
        },
        {
          id:3,
          src:`${this.$store.state.imgUrl}new_smallgame3.webp`,
          maxSrc:`${this.$store.state.imgUrl}new2_maxgame3.webp`
        },
        {
          id:4,
          src:`${this.$store.state.imgUrl}new_smallgame4.webp`,
          maxSrc:`${this.$store.state.imgUrl}new1_maxgame4.webp`
        },
      ],
      // 游戏场景swiper配置
      gameswiperOption: {
        slidesPerView:4,
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev",
        // },
        on: {
          tap: () => {
            this.gameIndex = this.$refs.gameswiper.swiper.clickedIndex;
          },
        },
      },
      // 跟着联动的swiper
      gameMaxSwiperOption:{
        loop:true,
        autoplay: {
          delay: 1900,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        on: {
          slideChange: () => {
            this.gameIndex = this.$refs.gameMaxSwiper.swiper.activeIndex;
          },
        },
      },
      inviteArr:[
        {
          id:1,//coinhub
          src:`${this.$store.state.imgUrl}inviter_1.webp`
        },
        {
          id:2,//coinhub
          src:`${this.$store.state.imgUrl}inviter_2.webp`
        },
        {
          id:3,//coinhub
          src:`${this.$store.state.imgUrl}inviter_3.webp`
        }
      ]
    }
  },
  watch: {
    gameIndex(newVal) {
      this.$refs.gameswiper.swiper.slideTo(newVal);
      this.$refs.gameMaxSwiper.swiper.slideTo(newVal);
    },
    'isEnLang': {
      handler: function (newValue,oldValue) {
        if (newValue != oldValue) {
          this.swiperVisible = false;//通过v-if切换，重新渲染swiper
          this.$nextTick(()=>{
            this.swiperVisible = true;
          });
        }
      },
      deep: true,
      immediate: true,
    },
    
  },
  methods:{
    gamesFun(){
      this.$router.push('/game/game')
    },
    enter() {
      // console.log("鼠标移入")
      this.$refs.mySwiper.swiper.autoplay.stop()
    },
    leave() {
      // console.log("鼠标移除除")
      this.$refs.mySwiper.swiper.autoplay.start()
    },
    videoPlay() {
      this.haveVoice = !this.haveVoice
      if(this.haveVoice){
        this.$refs.video.muted = false;
        this.$refs.video.play();
      }else{
        this.$refs.video.muted = true;
      }
    },
    bondClick(){
      this.$router.push('/bond');
    },
    showtxtFun(item){
      this.teamArr.forEach(item => {
        item.status = false
      })
      item.status = true
    },
    gameClick(item){
      this.gameIndex = item.id
    }
  },
  mounted(){
    let that = this
    this.$refs.video.addEventListener('canplaythrough',function(){
      that.videoStatus = false
    });
    try{ 
      let istrue = util.getAddress(this.$route.query.ref)
      localStorage.setItem('Invitee',istrue)
    } catch(error){
      localStorage.setItem('Invitee','0x0000000000000000000000000000000000000000')
    } 
  },
}
</script>
<style lang="scss">
.my-bullet{
  width: 10px;
  height: 10px;
  background: #000000;
  opacity: 0.28;
  display: inline-block;
  margin: 0 10px;
  border-radius: 50%;
}
.my-bullet-active{
  opacity: 1;
  background: #ECCF83;
}
.swiper-button-prev-add {
  position: absolute;
  top: 50%;
  left: -20px;
  transform: translateY(-50%);
  background-image: url($bg_url + "btn_left.webp");
  background-size: 100% auto;
  width: 40px;
  height: 40px;
  cursor: pointer;
}
.swiper-button-next-add {
  position: absolute;
  top: 50%;
  right: -20px;
  transform: translateY(-50%);
  background-image: url($bg_url + "btn_right.webp");
  background-size: 100% auto;
  width: 40px;
  height: 40px;
  cursor: pointer;
}
</style>
<style lang="scss" soped>
.home{
  width: 100%;
  padding-bottom: 30px;
  .border_{
    width: 100%;
    height: 380px;
    background: linear-gradient(311deg, #121212 0%, #0C0C0C 100%);
    box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
    border-radius: 12px;
    border: 1px solid rgba(68, 67, 67, 0.47);
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    .add_one_box{
      width: 33%;
      display: flex;
      .whole{
        width: fit-content;
        display: flex;
        flex-direction: column;
        align-items: center;
        .add_top_content{
          display: flex;
          align-items: center;
          color: #9E9E9E;
          .iconbox{
            width: 35px;
            height: 35px;
            font-size: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .span{
            font-weight: 500;
            line-height: 22px;
            color: #CED3D9;
            margin-left: 16px;
          }
        }
        p{
          font-weight: 800;
          color: #CED3D9;
          line-height: 41px;
          margin-top: 25px;
          text-align: center;
        }
      }
    }
    .add_top_content_center{
      justify-content: center;
    }
    .add_top_content_end{
      justify-content: flex-end;
    }
  }
  .home_bgbox{
    position: relative;
    width: 100vw;
    height: 100vh;
    .video_{
      width: 100vw;
      height: 100vh;
      object-fit: cover;
    }
    .content{
      position: absolute;
      bottom: 5vh;
      left: 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 5vw;
      .content_center{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        // margin-top: 173px;
        .leftbox{
          display: flex;
          flex-direction: column;
          .font_1{
            font-weight: bold;
            color: #CED3D9;
            line-height: 22px;
          }
          .font_2{
            font-weight: bold;
            color: #CED3D9;
            margin: 13px 0 28px 0;
          }
        }
        .rightbox{
          display: flex;
          align-items: center;
          .tel_img{
            width: 42px;
            margin-right: 26px;
          }
        }
      }
    }
  }
  .content_footer{
    width: 90vw;
    margin: 0 auto;
    height: 146px;
    margin-top: 22px;
    display: flex;;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(311deg, #121212 0%, #0C0C0C 100%);
    box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
    border-radius: 12px;
    border: 1px solid rgba(68, 67, 67, 0.47);
    padding: 0 20px;
    .left{
      display: flex;
      flex-direction: column;
      font-weight: 500;
      color: #CED3D9;
      line-height: 36px;
      .margin_top{
        margin-top: 10px;
      }
    }
  }
  .character_introduction{
    position: relative;
    width: 90vw;
    margin: 0 auto;
    margin-top: 145px;
    display: flex;
    flex-direction: column;
    .people_box{
      position: absolute;
      right: 0;
      top: -87px;
      width: 520px;
      .people{
        width: 100%;
      }
    }
    .right_box{
      width:100%;
      background: linear-gradient(311deg, #121212 0%, #0C0C0C 100%);
      box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
      border-radius: 12px;
      border: 1px solid rgba(68, 67, 67, 0.47);
      padding:77px 20px 101px;
      .mobile_people_box{
        display: none;
      }
      .txt_content{
        max-width: 600px;
        display: inline-block;
        line-height: 29px;
        font-weight: 500;
        color: #CED3D9;
      }
    }
  }
  .content_{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(133deg, #0C0C0C 0%, #0B0A0A 100%);
    .box_{
      width: 90vw;
      margin: 0 auto;
      margin-top: 124px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .imgbox{
        width: 100%;
        justify-content: space-between;
        align-items: center;
        // margin-bottom: 100px;
        background: linear-gradient(311deg, #121212 0%, #0C0C0C 100%);
        box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
        border-radius: 12px;
        border: 1px solid rgba(68, 67, 67, 0.47);
        padding: 50px 0 50px 15px;
        .add_outbox{
          width: 20%;
          display: flex;
          justify-content: center;
          align-items: center;
          border-right:1px solid #D4BA76;
          &:nth-child(1){
            justify-content: flex-start;
          }
          &:last-child{
            border: none;
          }
          .onebox{
            flex-direction: column;
            align-items: center;
            &:nth-child(1){
              padding-left: 0;
            }
            .add_content{
              width: 100%;
              display: flex;
              align-items: center;
              color: #D4BA76;
              font-size: 26px;
              .txt{
                font-weight: bold;
                color: #CED3D9;
                line-height: 22px;
                margin-left: 8px;
              }
            }
            .txt1{
              font-weight: 500;
              color: #8F8E8E;
              line-height: 24px;
              margin-top: 10px;
              padding-left: 41px;
            }
            .add_txt1{
              padding-left: 35px;
            }
            .add_txt2{
              padding-left: 42px;
            }
            .add_txt3{
              padding-left: 36px;
            }
            .add_txt4{
              padding-left: 44px;
            }
          }
        }
        .en_class{
          width: 18%;
        }
      }
      .make_money{
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .make_box{
          width: 30%;
          cursor: pointer;
          transition: all 0.3s;
          &:nth-child(1),&:nth-child(2),&:nth-child(3){
            margin-bottom: 51px;
          }
          .make_one{
            display: flex;
            align-items: center;
            width: 100%;
            min-height: 83px;
            padding:10px;
            background: linear-gradient(311deg, #121212 0%, #0C0C0C 100%);
            box-shadow: 0px 12px 10px 0px rgba(0, 0, 0, 0.39);
            border-radius: 2px;
            border: 1px solid rgba(68, 67, 67, 0.47);
            padding-left: 26px;
            .add_make_icon{
              width: 40px;
              height: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 28px;
            }
            ._span{
              font-weight: 500;
              color: #CED3D9;
              line-height: 31px;
              margin-left: 21px;
            }
          }        
        }
      }
    }
  }
  .teamboxs{
    width: 100%;
    background: url($bg_url + "teambg.webp") no-repeat #000;
    background-size: 100% 100%;
    .team_container{
      position: relative;
      width: 90vw;
      margin: 0 auto;
      padding-top: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 100px;
    }
    .teamswiper{
      width: 100%;
      padding: 0 45px;
      .team_swiper{
        position: relative;
        width: 100%;
        .swiper-slide{
          display: flex;
          justify-content: center;
        }
      }
    }
  }
  .time_axis_box{
    margin-top: 145px;
    width: 100%;
    .time_axis{
      width: 90vw;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      .self_swiper{
        width:100%;
        .swiper-slide{
          cursor: pointer;
          display: flex;
          padding-bottom: 40px;
          flex-direction: column;
          align-items: flex-start;
          .timebox{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .imgs{
              position: relative;
              width: 100%;
              display: flex;
              align-items: center;
              margin: 60px 0;
              .partenerbg_img{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                width: 70px;
              }
              span{
                display: inline-block;
                width: 100%;
                border-top: 1px dashed #F7E7B2;
              }
            }
            .time_class{
              padding: 0 80px;
              height: 57px;
              line-height: 57px;
              background: linear-gradient(311deg, #121212 0%, #0C0C0C 100%);
              box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
              border-radius: 8px;
              border: 1px solid rgba(68, 67, 67, 0.47);
              font-weight: bold;
              color: #CED3D9;
              line-height: 57px;
            }
            .contentbox_{
              max-width: 244px;
              // min-height: 210px;
              background: linear-gradient(311deg, #121212 0%, #0C0C0C 100%);
              box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
              border-radius: 8px;
              border: 1px solid rgba(68, 67, 67, 0.47);
              padding: 10px;
              .titletxt{
                font-weight: bold;
                color: #CED3D9;
                line-height: 24px;
              }
              .content_class{
                margin-top: 22px;
                font-weight: 500;
                color: #8F8E8E;
                line-height: 14px;
              }
            }
            
          }
        }
      }
      .mobile_time_axis{
        display: none;
      }
    }
  }
  .title_txt{
    width: 100%;
    font-weight: 800;
    color: #CED3D9;
    margin-bottom:29px;
    line-height: 38px;
  }
  .characteristic_box{
    width: 90vw;
    margin: 0 auto;
    margin-top: 145px;
    flex-direction: column;
    align-items: center;
    .gamebox{
      width: 100%;
      display: flex;
      flex-direction: column;
      background: linear-gradient(311deg, #121212 0%, #0C0C0C 100%);
      box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
      border-radius: 12px;
      border: 1px solid rgba(68, 67, 67, 0.47);
      padding:50px 20px 0;
      .partener_box{
        width: 100%;
        align-items: center;
        flex-wrap: wrap;
        .one_partener{
          width: 25%;
          display: flex;
          align-items: center;
          margin-bottom:50px;
          img{
            cursor: pointer;
          }
          .inviter_par1{
            width: 59px;
          }
          .inviter_par2{
            width: 147px;
          }
          .inviter_par3{
            width: 247px;
          }
          .par1{
            width: 236px;
          }
          .par2{
            width: 222px;
          }
          .par3{
            width: 181px;
          }
          .par4{
            width: 250px;
          }
          .par5{
            width: 194px;
          }
          .par6{
            width: 247px;
          }
          .par7{
            width: 173px;
          }
          .par8{
            width: 193px;
          }
          .par9{
            width: 150px;
          }
          .par10{
            width: 131px;
          }
          .par11{
            width: 140px;
          }
          .par12{
            width: 209px;
          }
          .par13{
            width: 157px;
          }
          .par14{
            width: 212px
          }
          .par15{
            width: 174px;
          }
          .par16{
            width: 179px;
          }
          .par17{
            width: 210px;
          }
          .par18{
            width: 147px;
          }
          .par19{
            width: 150px;
          }
          .par20{
            width: 156px;
          }
        }
      }
      .add_game_txt{
        width: 100%;
        display: flex;
        align-items: center;
        margin-top: 20px;
        .span1{
          font-weight: bold;
          color: #CED3D9;
          line-height: 29px;
          margin-right: 35px;
        }
        .span2{
          font-weight: 500;
          color: #ECCF83;
          line-height: 19px;
        }
      }
      .span3{
        font-weight: 500;
        color: #8F8E8E;
        line-height: 19px;
        margin-top: 16px;
      }
      .add_box{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 26px;
        .left{
          width: 60%;
          display: flex;
          flex-direction: column;
          .span4{
            font-weight: bold;
            color: #CED3D9;
            line-height: 29px;
            margin-top: 54px;
          }
          .bottom_swiper{
            width: 100%;
            .gameMax_swiper{
              width: 100%;
              img{
                width: 100%;
              }
            }
          }
          .gameswiperbox{
            position: relative;
            width: 100%;
            margin-top:54px;
            .game_swiper{
              width: 100%;
              .swiper-slide{
                display: flex;
                justify-content: center;
                .oneimgbox{
                  max-width: 147px;
                  padding:10px;
                  cursor: pointer;
                  .gameswiper_img{
                    width: 100%;
                  }
                }
                .active_oneimgbox{
                  background: linear-gradient(270deg, rgba(232, 199, 120, 0.24) 0%, rgba(255, 178, 69, 0.34) 47%, rgba(234, 181, 100, 0.35) 100%);
                }
              }
            }
          }
        }
        .right{
          width: 40%;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          .before_box{
            position: relative;
            max-width: 90%;
            width: 100%;
            margin-bottom: 37px;
            .add_out_box{
              width: 100%;
              padding: 4px;
              align-items: center;
              justify-content: center;
              display: flex;
              background: linear-gradient(270deg, rgba(232, 199, 120, 0.24) 0%, rgba(255, 178, 69, 0.34) 47%, rgba(234, 181, 100, 0.35) 100%);
            }
            .game2{
              width: 100%;
            }
            span{
              position: absolute;
              bottom: 10px;
              right: 10px;
              // transform: translateX(-50%);
              font-weight: 500;
              color: #CED3D9;
              line-height: 19px;
              white-space:nowrap;
            }
          }
        }
        .mobile_game_box{
          display: none;
        }
      }
    }
  }
  .out_box{
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1px;
    border-radius: 29px;
    cursor: pointer;
    transition: all 0.3s;
    background: linear-gradient(180deg, #825F35 0%, #FADD82 51%, #876333 100%);
    .oneteam{
      min-width: 190px;
      border-radius: 29px;
      flex-direction: column;
      align-items: center;
      padding: 20px 10px;
      background: #1F1F1F;
      .teaming{
        width: 124px;
      }
      .span1{
        margin:28px 0 6px;
        font-weight: bold;
        color: #CED3D9;
        line-height: 32px;
      }
      .span2{
        font-weight: bold;
        color: #9E9E9E;
        line-height: 32px;
        margin-bottom: 10px;
      }
      .address_peopllle{
        justify-content: center;
        align-items: center;
        .ling_ying{
          width: 19px;
          margin-right: 15px;
        }
        .twitter{
          width: 23px;
        }
      }
      .triangle_calss{
        width: 0px;
        height: 0px;
        border: 8px solid transparent;
        margin: 15px 0;
      }
      .triangle_bottom{
        border-top-color: #ccc;
      }
      .triangle_top{
        border-bottom-color: #ccc;
      }
      .txtbox{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        span{
          font-weight: normal;
          color: #9E9E9E;
          line-height: 18px;
        }
      }
    }
  }
  .make_box:hover{
    transform: scale(1.2);
  }
  // .swiper-button-prev {
  //   background-image: url($bg_url + "btn_left.webp");
  //   background-size: 100% auto;
  //   width: 40px;
  // }
  // .swiper-button-next {
  //   background-image: url($bg_url + "btn_right.webp");
  //   background-size: 100% auto;
  //   width: 40px;
  // }
}
.btnbox{
  display: flex;
  align-items: center;
  span{
    width: 170px;
    height: 45px;
    border-radius: 4px;
    background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
    backdrop-filter: blur(14px);
    text-align: center;
    line-height: 43px;
    margin-right: 43px;
    cursor: pointer;
    font-weight: bold;
    color: #0E0D0D;
    &:nth-child(2){
      background: linear-gradient(180deg, #211F1F 0%, #0A0A0A 100%);
      box-shadow: 0px 8px 6px 0px rgba(0, 0, 0, 0.28);
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.11);
      backdrop-filter: blur(14px);
      margin-right: 0;
      font-weight: bold;
      color: #CED3D9;
    }
  }
}
.voice_img{
  position: absolute;
  right: 5vw;
  top: 100px;
  cursor: pointer;
  width: 75px;
}
@media screen and (max-width: 980px) {
  .home{
    padding-top: 0.8rem;
    .border_{
      width: 100%;
      height: auto;
      padding: 0.25rem 0.08rem;
      padding-bottom: 0;
      background: linear-gradient(311deg, #121212 0%, #0C0C0C 100%);
      box-shadow: 0px 12px 10px 0px rgba(0, 0, 0, 0.39);
      border-radius: 0.08rem;
      border: 1px solid rgba(68, 67, 67, 0.47);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      .add_one_box{
        width: 100%;
        margin-bottom: 0.25rem;
        .whole{
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          .add_top_content{
            width: auto;
            display: flex;
            align-items: center;
            .iconbox {
              width: 0.2rem;
              height: 0.2rem;
              font-size: 0.16rem;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .span{
              font-weight: normal;
              color: #9E9E9E;
              line-height: 0.22rem;
              margin-left: 0.08rem;
            }
          }
          p{
            width: fit-content;
            font-weight: 800;
            color: #CED3D9;
            line-height: 0.22rem;
            margin-top: 0;
          }
        }
      }
    }
    .home_bgbox{
      height: auto;
      min-height:0;
      .video_{
        width: 100%;
        height: auto;
        object-fit: fill;
      }
      .content{
        position: absolute;
        bottom: 0;
        top: 88%;
        left: 0;
        width: 100%;
        .content_center{
          position: relative;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          // margin-top: 0.33rem;
          padding: 0 0.08rem;
          .leftbox{
            display: flex;
            flex-direction: column;
            .font_1{
              font-weight: bold;
              color: #CED3D9;
              line-height: 0.22rem;
            }
            .font_2{
              font-weight: bolder;
              color: #CED3D9;
              line-height: 0.49rem;
              margin: 0.05rem 0 0.2rem 0;
            }
          }
          .rightbox{
            position: absolute;
            right: 0;
            top: 30%;
            display: flex;
            align-items: center;
            .tel_img{
              width: 0.2rem;
              margin-right: 0.1rem;
            }
          }
        }
      }
    }
    .content_footer{
      width: 90vw;
      margin: 0 auto;
      height: auto;
      background: linear-gradient(311deg, #121212 0%, #0C0C0C 100%);
      box-shadow: 0px 12px 10px 0px rgba(0, 0, 0, 0.39);
      border-radius: 0.08rem;
      border: 1px solid rgba(68, 67, 67, 0.47);
      padding:0.2rem 0.08rem;
      margin-top: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      .left{
        display: flex;
        flex-direction: column;
        margin-bottom: 0.3rem;
        font-weight: 500;
        color: #CED3D9;
        line-height: 0.18rem;
        span{
          width: 100%;
          padding:0;
          &:nth-child(1){
            margin-bottom: 0.2rem;
          }
        }
        .margin_top{
          margin-top: 0;
        }
      }
    }
    .character_introduction{
      width: 100%;
      padding: 0 0.2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 0.52rem;
      .people_box{
        display: none;
      }
      .right_box{
        width: 100%;
        flex-direction: column;
        align-items: center;
        position: relative;
        padding: 0.2rem;
        .fontbox{
          display: flex;
          flex-direction: column;
          background: linear-gradient(311deg, #121212 0%, #0C0C0C 100%);
          box-shadow: 0px 12px 10px 0px rgba(0, 0, 0, 0.39);
          border-radius: 0.08rem;
          border: 1px solid rgba(68, 67, 67, 0.47);
          padding: 0.2rem 0.08rem;
          .title_txt{
            text-align: left;
            font-weight: bold;
            line-height: 0.21rem;
            margin: 0.82rem 0 0.17rem 0;
          }
          .txt_content{
            max-width: 100%;
            width:100%;
            font-weight: 400;
            line-height: 0.18rem;
            color: #DBDADA;
          }
          .mobile_addimg{
            display: block;
            width: 100%;
            margin-bottom: 0.2rem;
            .people{
              width: 100%;
              max-width:100%;
            }
          }
        }
        .mobile_people_box{
          display: block;
          margin-top: -0.5rem;
          margin-bottom: 0.2rem;
          img{
            width: 100%;
          }
        }
        .txt_content{
          max-width: 100%;
          display: inline-block;
          font-weight: 400;
          line-height: 0.18rem;
        }
      }
    }
    .title_txt{
      width: 100%;
      font-weight: bold;
      line-height: 0.19rem;
      margin-bottom: 0.3rem;
    }
    .content_{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: linear-gradient(133deg, #0C0C0C 0%, #0B0A0A 100%);
      .box_{
        margin-top: 0.52rem;
        .imgbox{
          width: 100%;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom:0;
          background: linear-gradient(311deg, #121212 0%, #0C0C0C 100%);
          box-shadow: 0px 12px 10px 0px rgba(0, 0, 0, 0.39);
          border-radius: 0.08rem;
          border: 1px solid rgba(68, 67, 67, 0.47);
          padding: 0.3rem 0.08rem 0;
          .add_outbox{
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border-right:none;
            margin-bottom: 0.3rem;
            padding:0;
            .onebox{
              flex-direction: column;
              align-items: center;
              .add_content{
                width: 100%;
                display: flex;
                align-items: center;
                font-size: 16px;
                .txt{
                  font-weight: 600;
                  color: #CED3D9;
                  line-height: 22px;
                  margin-left: 8px;
                }
              }
              .txt1{
                font-weight: 400;
                margin-top: 0.05rem;
                max-width:100%;
                display: inline-block;
                line-height: 0.2rem;
                padding-left: 0.24rem;
              }
            }
          }
        }
        .make_money{
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          flex-wrap: nowrap;
          .make_box{
            margin-bottom: 0.15rem;
            width: 100%;
            cursor: pointer;
            transition: all 0.3s;
            &:nth-child(1),&:nth-child(2),&:nth-child(3){
              margin-bottom: 0.15rem;
            }
            .make_one{
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: flex-start;
              width: 100%;
              min-height: 0.4rem;
              padding: 0 0.04rem;
              .add_make_icon{
                width: 0.2rem;
                height: 0.2rem;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 16px;
              }
              ._span{
                font-weight: 400;
                color: #DBDADA;
                line-height: 22px;
                margin-left: 0.05rem;
              }
            }        
          }
        }
      }
    }
    .teamboxs{
      display: none;
      width: 100%;
      background: url($bg_url + "teambg.webp") no-repeat #000;
      background-size: 100% 100%;
      .team_container{
        position: relative;
        width: 90vw;
        margin: 0 auto;
        padding-top: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 100px;
      }
    }
    .time_axis_box{
      background: transparent;
      margin-top: 0.52rem;
      .time_axis{
        width: 90vw;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        .self_swiper{
          display: none;
        }
        .mobile_time_axis{
          max-height: 4rem;
          overflow: auto;
          display: flex;
          flex-direction: column;
          background: linear-gradient(311deg, #121212 0%, #0C0C0C 100%);
          box-shadow: 0px 12px 10px 0px rgba(0, 0, 0, 0.39);
          border-radius: 0.08rem;
          border: 1px solid rgba(68, 67, 67, 0.47);
          padding:0.2rem 0;
          padding-right: 0.08rem;
          .one_all_box{
            width: 100%;
            display: flex;
            .left{
              display: flex;
              flex-direction: column;
              align-items: center;
              img{
                width: 0.4rem;
                margin: -0.14rem 0;
              }
              span{
                display: inline-block;
                width: 1px;
                height: 1.8rem;
                border-right: 0.01rem dashed #F3DC97;
                border-radius: 0.2rem;
              }
            }
            .right{
              display: flex;
              flex-direction: column;
              .span{
                display: inline-block;
                padding:0.1rem 0.2rem;
                max-width: 1.1rem;
                background: linear-gradient(311deg, #121212 0%, #0C0C0C 100%);
                box-shadow: 0px 5px 12px 0px rgba(0, 0, 0, 0.39);
                border-radius: 0.05rem;
                border: 1px solid rgba(68, 67, 67, 0.47);
                font-weight: bold;
                color: #DBDADA;
                line-height: 0.16rem;
              }
              .bottom{
                display: flex;
                flex-direction: column;
                margin-top: 0.1rem;
                padding: 0.1rem;
                width:100%;
                min-width: 3rem;
                min-height: 0.9rem;
                background: linear-gradient(311deg, #121212 0%, #0C0C0C 100%);
                box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
                border-radius: 0.08rem;
                border: 1px solid rgba(68, 67, 67, 0.47);
                .b_title{
                  font-weight: bold;
                  color: #DBDADA;
                  line-height: 0.16rem;
                }
                .b_content{
                  font-weight: 400;
                  color: #8F8E8E;
                  line-height: 0.14rem;
                  margin-top: 0.05rem;
                }
              }
            }
          }
        }
      }
    }
    .characteristic_box{
      width: 90vw;
      margin: 0 auto;
      flex-direction: column;
      align-items: center;
      margin-top: 0.52rem;
      .gamebox{
        width: 100%;
        display: flex;
        flex-direction: column;
        background: linear-gradient(311deg, #121212 0%, #0C0C0C 100%);
        box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.39);
        border-radius: 0.08rem;
        border: 1px solid rgba(68, 67, 67, 0.47);
        padding: 0.2rem 0.08rem 0;
        .partener_box{
          width: 100%;
          align-items: center;
          .one_partener{
            width: 33%;
            display: flex;
            align-items: center;
            margin-bottom:0.2rem;
            img{
              cursor: pointer;
            }
            .inviter_par1{
              width: 0.35rem;
            }
            .inviter_par2{
              width: 0.7rem;
            }
            .inviter_par3{
              width: 1rem;
            }
            .par1{
              width: 0.94rem;
            }
            .par2{
              width: 0.88rem;
            }
            .par3{
              width: 0.72rem;
            }
            .par4{
              width: 0.86rem;
            }
            .par5{
              width: 0.773rem;
            }
            .par6{
              width: 0.93rem;
            }
            .par7{
              width: 0.72rem;
            }
            .par8{
              width: 0.79rem;
            }
            .par9{
              width: 0.56rem;
            }
            .par10{
              width: 0.5rem;
            }
            .par11{
              width: 0.67rem;
            }
            .par12{
              width: 0.85rem;
            }
            .par13{
              width: 0.54rem;
            }
            .par14{
              width: 0.93rem;
            }
            .par15{
              width: 0.62rem;
            }
            .par16{
              width: 0.67rem;
            }
            .par17{
              width: 0.88rem;
            }
            .par18{
              width: 0.6rem;
            }
            .par19{
              width: 0.61rem;
            }
            .par20{
              width: 0.64rem;
            }
          }
        }
        .add_game_txt{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 0.2rem 0 0.1rem;
          .span1{
            font-weight: 500;
            color: #DBDADA;
            line-height: 0.16rem;
            margin-right: 0;
            white-space:nowrap;
          }
          .span2{
            font-weight: 400;
            color: #ECCF83;
            line-height: 0.12rem;
            white-space:nowrap;
            transform: scale(0.75);
            zoom:0.8;
          }
        }
        .add_box{
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-top: 0;
          flex-direction: column;
          .left{
            width: 100%;
            display: flex;
            flex-direction: column;
            .span4{
              font-weight: 600;
              color: #DBDADA;
              line-height: 0.17rem;
              margin-top: 0.1rem;
            }
            .bottom_swiper{
              width: 100%;
              .gameMax_swiper{
                width: 100%;
                img{
                  width: 100%;
                }
              }
            }
            .gameswiperbox{
              position: relative;
              width: 100%;
              margin-top: 0.1rem;
              // padding: 0 58px;
              .game_swiper{
                width: 100%;
                .swiper-slide{
                  display: flex;
                  justify-content: center;
                  .oneimgbox{
                    max-width: 2rem;
                    width: 1.5rem;
                    padding:0.1rem;
                    cursor: pointer;
                    .gameswiper_img{
                      width: 100%;
                    }
                  }
                }
              }
            }
          }
          .right{
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items:center;
            justify-content: space-between;
            .before_box{
              position: relative;
              max-width: 33%;
              width: 30%;
              margin-bottom: 0;
              .game2{
                width: 100%;
              }
              span{
                position: absolute;
                bottom: 0.05rem;
                right: 0;
                font-size: 0.12rem;
                font-weight: normal;
                color: #CED3D9;
                line-height: 0.11rem;
                transform: scale(0.8);
              }
            }
          }
          .pc_box{
            display: none;
          }
          .mobile_game_box{
            margin: 0.19rem 0 0.14rem;
          }
        }
        .span3{
          margin-top: 0;
        }
      }
    }
    .out_box{
      width: 100%;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      padding: 1px;
      margin-right: 50px;
      margin-bottom: 70px;
      border-radius: 29px;
      cursor: pointer;
      transition: all 0.3s;
      background: linear-gradient(180deg, #825F35 0%, #FADD82 51%, #876333 100%);
      .oneteam{
        border-radius: 29px;
        flex-direction: column;
        align-items: center;
        padding: 20px 40px;
        background: #000;
        .teaming{
          width: 124px;
        }
        .span1{
          margin:28px 0 6px;
          font-weight: bold;
          color: #CED3D9;
          line-height: 32px;
          background: linear-gradient(180deg, #825F35 0%, #FADD82 51%, #876333 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .span2{
          font-weight: bold;
          color: #CED3D9;
          line-height: 32px;
          margin-bottom: 10px;
        }
        .address_peopllle{
          justify-content: center;
          align-items: center;
          .ling_ying{
            width: 19px;
            
          }
          .twitter{
            width: 23px;
            
            margin-left: 15px;
          }
        }
      }
    }
  }
  .btnbox{
    span{
      width: 1.2rem;
      height: 0.4rem;
      background: linear-gradient(180deg, #F7E9B9 0%, #F0CE75 100%);
      border-radius: 0.04rem;
      border: 1px solid #ECCF83;
      text-align: center;
      line-height: 0.4rem;
      margin-right: 0.13rem;
      font-weight: bold;
      cursor: pointer;
      color: #000000;
      &:nth-child(2){
        border: 1px solid #ECCF83;
        background: linear-gradient(180deg, #1B1919 0%, #000000 100%);
        margin-right: 0;
        color: #CED3D9;
      }
    }
    .voice_img{
      display: none;
      cursor: pointer;
      width: 63px;
      margin-left: 180px;
    }
  }
  .voice_img{
    position: absolute;
    right: 5vw;
    top: 0.09rem;
    cursor: pointer;
    width: 0.47rem;
  }
}
</style>
