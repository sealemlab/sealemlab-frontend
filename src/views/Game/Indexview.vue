<template>
  <div class="page" :class="isEnLang ? 'en_Regular' : 'cn_lang'">
    <div class="menu" v-if="isShowMenu">
      <ul>
        <li v-for="(item, index) in navArr" :key="index" @click="liClick(item)" :class="{ active: index == liIndex }">
          {{ item.label }}
        </li>
      </ul>
    </div>
    <div class="main">
      <div class="main_content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      liIndex: 0,
      navArr: [
        { label: "Game", link: "/game/game", status: true },
        { label: "Recharge/Claim", link: "/game/rechargeclaim", status: true },
        { label: "Game data", link: "/game/gamedata", status: false },
        { label: "Updation", link: "/game/updation", status: false },
      ],
      oldScrollTop: 0,
      isShowMenu: true,
    };
  },
  computed: { ...mapGetters(["isEnLang"]) },
  watch: {
    $route(to) {
      this.navArr.forEach((element, index) => {
        if (to.path == element.link) this.liIndex = index;
      });
    },
  },
  mounted() {
    this.navArr.forEach((element, index) => {
      if (this.$route.path == element.link) this.liIndex = index;
    });
    window.addEventListener("scroll", this.scrolling);
  },
  methods: {
    liClick(item) {
      if (item.status) {
        this.$router.push(item.link);
      } else {
        if (!this.getNoticeNum) {
          this.$store.commit("setNoticeStatus", JSON.stringify({ status: true, word: "message.tip.txt5" }));
          this.$store.commit("setNoticeNum", true);
        }
      }
    },
    scrolling() {
      const bodyWidth = document.body.clientWidth;
      if (bodyWidth <= 980) {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        let scrollStep = scrollTop - this.oldScrollTop;
        this.oldScrollTop = scrollTop;
        this.isShowMenu = scrollStep < 0;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.page {
  width: 100vw;
  min-height: 25rem;
  padding-top: 80px;
  position: relative;
}
.menu {
  position: fixed;
  left: 5vw;
  top: 5rem;
  z-index: 9;
  ul {
    li {
      width: 10rem;
      height: 3rem;
      line-height: 3rem;
      text-align: center;
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ced3d9;
      margin: 2rem 0;
      cursor: pointer;
      &.active {
        background: url($bg_url + "boxs_border.webp") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
.main {
  width: 100vw;
  padding: 2rem 5vw;
  .main_content {
    padding-left: 12rem;
  }
}
@media screen and (max-width: 980px) {
  .page {
    width: 100vw;
    min-height: calc(100vh - 1rem);
  }
  .menu {
    width: 100%;
    position: fixed;
    left: 0;
    top: 90px;
    padding: 0 5vw;
    ul {
      width: 100%;
      display: flex;
      align-items: center;
      li {
        width: 25%;
        height: 0.3rem;
        line-height: 0.3rem;
        font-size: 9px;
        font-weight: 500;
        margin: 0;
      }
    }
  }
  .main {
    width: 100vw;
    padding: 0 5vw;
    .main_content {
      padding-left: 0;
    }
  }
}

// .fontSize {
//   font-size: 18px;
//   font-size: 1rem;
//   font-size: 32px;
//   font-size: 2rem;
//   font-size: 24px;
//   font-size: 1.33rem;
//   font-size: 16px;
//   font-size: 0.88rem;
//   font-size: 26px;
//   font-size: 1.44rem;
//   font-size: 20px;
//   font-size: 1.11rem;
//   font-size: 14px;
//   font-size: 0.77rem;
//   font-size: 12px;
//   font-size: 0.66rem;
// }
</style>
