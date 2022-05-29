<template>
  <div class="page" :class="isEnLang ? 'en_Regular' : 'cn_lang'">
    <div class="menu" v-if="isShowMenu">
      <ul>
        <li v-for="(item, index) in navArr" :key="index" @click="liClick(item)" :class="{ active: index == liIndex }">
          {{ $t(item.label) }}
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
        { label: "message.gamepage.text1", link: "/game/game", status: true },
        { label: "message.gamepage.text2", link: "/game/rechargeclaim", status: true },
        { label: "message.gamepage.text3", link: "/game/gamedata", status: true },
        { label: "message.gamepage.text4", link: "/game/updation", status: true },
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
  min-height: 30rem;
  padding-top: 80px;
  position: relative;
}
.menu {
  position: fixed;
  left: 5vw;
  top: calc(80px + 2rem);
  z-index: 9;
  ul {
    li {
      width: 10rem;
      height: 38px;
      line-height: 38px;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 60px;
      cursor: pointer;
      &.active {
        color: #eccf83;
      }
    }
  }
}
.main {
  width: 100vw;
  height: 100%;
  padding: 2rem 5vw;
  .main_content {
    width: 100%;
    height: 100%;
    padding-left: 12rem;
  }
}

@media screen and (max-width: 980px) {
  .page {
    width: 100vw;
    min-height: calc(100vh - 2rem);
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
      overflow-x: auto;
      white-space: nowrap;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
      li {
        width: fit-content;
        height: 0.3rem;
        line-height: 0.3rem;
        font-size: 0.12rem;
        font-weight: 500;
        margin: 0 0.2rem 0 0;
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
