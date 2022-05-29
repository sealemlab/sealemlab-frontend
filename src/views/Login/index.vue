<template>
  <div class="login_register">
    <span class="establish_txt mobile_font20" v-if="name == 'register'" :class="isEnLang ? 'en_Bold' : ''">{{ $t("message.signin.txt1") }}</span>
    <span class="subtitle_txt" v-if="name == 'register'">{{ $t("message.signin.txt2") }}</span>
    <span class="establish_txt mobile_font20" v-if="name == 'login'" :class="isEnLang ? 'en_Bold' : ''">{{ $t("message.signin.txt24") }}</span>
    <span class="subtitle_txt" v-if="name == 'login'">{{ $t("message.signin.txt25") }}</span>
    <div class="content">
      <div class="login_left_content pc_box">
        <div class="onebox" v-for="(item, index) in list" :key="index">
          <div class="imgbox_">
            <!-- <img :src="item.src" /> -->
            <font-awesome-icon :icon="['fas', 'address-card']" v-if="index == 0"></font-awesome-icon>
            <svg
              v-if="index == 1"
              t="1653806690335"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2771"
              width="200"
              height="200"
            >
              <path
                d="M933 167.4l-384-160a96.3 96.3 0 0 0-73.8 0l-384 160C55.4 182.2 32 217.2 32 256c0 397 229 671.4 443 760.6 23.6 9.8 50.2 9.8 73.8 0C720.2 945.2 992 698.6 992 256c0-38.8-23.4-73.8-59-88.6z m-94.4 228.4l-368 368c-12.4 12.4-32.8 12.4-45.2 0l-208-208c-12.4-12.4-12.4-32.8 0-45.2l45.2-45.2c12.4-12.4 32.8-12.4 45.2 0l140.2 140.2 300.2-300.2c12.4-12.4 32.8-12.4 45.2 0l45.2 45.2c12.6 12.6 12.6 32.8 0 45.2z"
                p-id="2772"
                fill="#eccf83"
              ></path>
            </svg>
            <svg
              v-if="index == 2"
              t="1653806712725"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3022"
              width="200"
              height="200"
            >
              <path
                d="M358.2 240.2c-25.8 23.8-66.1 19.4-88.18-10-22.08-25.8-17.6-66.1 10-88.18l11.86-9.48C347.4 88.16 416.2 64 487.2 64H574c124.8 0 226 101.18 226 224.2 0 23-3 44-8.6 63.8H832c35.4 0 64 28.6 64 64s-28.6 64-64 64h-135.6c-3.4 2.2-6.8 4.2-10.2 6.2L585 544H832c35.4 0 64 28.6 64 64s-28.6 64-64 64H374.2c-14.2 17.2-22.2 39-22.2 62 0 54.2 43.8 98 96.2 98h88.6c41.8 0 82.6-14.2 115.4-40.4l11.8-9.6c27.6-23.8 67.8-17.6 88.2 10 23.8 27.6 19.4 67.8-10 88.2l-10 11.2c-55.6 44.4-124.4 68.6-195.4 68.6h-88.6C325.18 960 224 858.8 224 734c0-21.2 2.98-42.2 8.66-62H192c-35.34 0-64-28.6-64-64s28.66-64 64-64h135.64c3.36-2.2 6.76-4.2 10.16-6.2l101.2-57.8H192c-35.34 0-64-28.6-64-64s28.66-64 64-64h457.8c12.4-17.2 22.2-39 22.2-63.8 0-52.4-43.8-96.2-98-96.2h-86.8c-41.8 0-82.6 14.2-115.4 40.4l-13.6 7.8z"
                p-id="3023"
                fill="#eccf83"
              ></path>
            </svg>
            <font-awesome-icon :icon="['fas', 'calendar-days']" v-if="index == 3"></font-awesome-icon>
            <font-awesome-icon :icon="['fas', 'store']" v-if="index == 4"></font-awesome-icon>
            <svg
              v-if="index == 5"
              t="1653806792185"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5415"
              width="200"
              height="200"
            >
              <path
                d="M306.74 557.26L200 664l-49.38-49.38a32 32 0 0 0-45.24 0l-35.08 35.06a32 32 0 0 0-5.58 37.74l63.28 118-118.62 118.7a32 32 0 0 0 0 45.26l45.24 45.24a32 32 0 0 0 45.26 0L218.5 896l118 63.28a32 32 0 0 0 37.74-5.58l35.06-35.08a32 32 0 0 0 0-45.24L360 824l106.74-106.74zM993.58 0.28l-156.22 26.4-280 280 160 160 280-280 26.4-156.22A26.66 26.66 0 0 0 993.58 0.28z"
                p-id="5416"
              ></path>
              <path
                d="M778.74 618.76l-592-592L30.44 0.28A26.64 26.64 0 0 0 0.28 30.44l26.4 156.22 592 592.1z m235.88 305.36L896 805.5l63.28-118a32 32 0 0 0-5.58-37.74l-35.08-35.06a32 32 0 0 0-45.26 0L614.62 873.38a32 32 0 0 0 0 45.24l35.06 35.08a32 32 0 0 0 37.74 5.58l118-63.28 118.62 118.62a32 32 0 0 0 45.26 0l45.24-45.24a32 32 0 0 0 0.08-45.26z"
                p-id="5417"
                fill="#eccf83"
              ></path>
            </svg>
          </div>
          <div class="right_txt">
            <span class="font24 mobile_font14" :class="isEnLang ? 'en_Bold' : ''">{{ $t(item.title) }}</span>
            <span class="font16" :class="isEnLang ? 'en_medium' : ''">{{ $t(item.explain) }}</span>
          </div>
        </div>
      </div>
      <div class="right_content">
        <Login v-if="name == 'login'" />
        <Register v-if="name == 'register'" />
      </div>
      <div class="login_left_content mobile_box">
        <div class="onebox" v-for="(item, index) in list" :key="index">
          <div class="imgbox_">
            <!-- <img :src="item.src" /> -->
            <font-awesome-icon :icon="['fas', 'address-card']" v-if="index == 0"></font-awesome-icon>
            <svg
              v-if="index == 1"
              t="1653806690335"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2771"
              width="16"
              height="16"
            >
              <path
                d="M933 167.4l-384-160a96.3 96.3 0 0 0-73.8 0l-384 160C55.4 182.2 32 217.2 32 256c0 397 229 671.4 443 760.6 23.6 9.8 50.2 9.8 73.8 0C720.2 945.2 992 698.6 992 256c0-38.8-23.4-73.8-59-88.6z m-94.4 228.4l-368 368c-12.4 12.4-32.8 12.4-45.2 0l-208-208c-12.4-12.4-12.4-32.8 0-45.2l45.2-45.2c12.4-12.4 32.8-12.4 45.2 0l140.2 140.2 300.2-300.2c12.4-12.4 32.8-12.4 45.2 0l45.2 45.2c12.6 12.6 12.6 32.8 0 45.2z"
                p-id="2772"
                fill="#eccf83"
              ></path>
            </svg>
            <svg
              v-if="index == 2"
              t="1653806712725"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3022"
              width="16"
              height="16"
            >
              <path
                d="M358.2 240.2c-25.8 23.8-66.1 19.4-88.18-10-22.08-25.8-17.6-66.1 10-88.18l11.86-9.48C347.4 88.16 416.2 64 487.2 64H574c124.8 0 226 101.18 226 224.2 0 23-3 44-8.6 63.8H832c35.4 0 64 28.6 64 64s-28.6 64-64 64h-135.6c-3.4 2.2-6.8 4.2-10.2 6.2L585 544H832c35.4 0 64 28.6 64 64s-28.6 64-64 64H374.2c-14.2 17.2-22.2 39-22.2 62 0 54.2 43.8 98 96.2 98h88.6c41.8 0 82.6-14.2 115.4-40.4l11.8-9.6c27.6-23.8 67.8-17.6 88.2 10 23.8 27.6 19.4 67.8-10 88.2l-10 11.2c-55.6 44.4-124.4 68.6-195.4 68.6h-88.6C325.18 960 224 858.8 224 734c0-21.2 2.98-42.2 8.66-62H192c-35.34 0-64-28.6-64-64s28.66-64 64-64h135.64c3.36-2.2 6.76-4.2 10.16-6.2l101.2-57.8H192c-35.34 0-64-28.6-64-64s28.66-64 64-64h457.8c12.4-17.2 22.2-39 22.2-63.8 0-52.4-43.8-96.2-98-96.2h-86.8c-41.8 0-82.6 14.2-115.4 40.4l-13.6 7.8z"
                p-id="3023"
                fill="#eccf83"
              ></path>
            </svg>
            <font-awesome-icon :icon="['fas', 'calendar-days']" v-if="index == 3"></font-awesome-icon>
            <font-awesome-icon :icon="['fas', 'store']" v-if="index == 4"></font-awesome-icon>
            <svg
              v-if="index == 5"
              t="1653806792185"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5415"
              width="16"
              height="16"
            >
              <path
                d="M306.74 557.26L200 664l-49.38-49.38a32 32 0 0 0-45.24 0l-35.08 35.06a32 32 0 0 0-5.58 37.74l63.28 118-118.62 118.7a32 32 0 0 0 0 45.26l45.24 45.24a32 32 0 0 0 45.26 0L218.5 896l118 63.28a32 32 0 0 0 37.74-5.58l35.06-35.08a32 32 0 0 0 0-45.24L360 824l106.74-106.74zM993.58 0.28l-156.22 26.4-280 280 160 160 280-280 26.4-156.22A26.66 26.66 0 0 0 993.58 0.28z"
                p-id="5416"
              ></path>
              <path
                d="M778.74 618.76l-592-592L30.44 0.28A26.64 26.64 0 0 0 0.28 30.44l26.4 156.22 592 592.1z m235.88 305.36L896 805.5l63.28-118a32 32 0 0 0-5.58-37.74l-35.08-35.06a32 32 0 0 0-45.26 0L614.62 873.38a32 32 0 0 0 0 45.24l35.06 35.08a32 32 0 0 0 37.74 5.58l118-63.28 118.62 118.62a32 32 0 0 0 45.26 0l45.24-45.24a32 32 0 0 0 0.08-45.26z"
                p-id="5417"
                fill="#eccf83"
              ></path>
            </svg>
          </div>
          <div class="right_txt">
            <span class="font24 mobile_font14" :class="isEnLang ? 'en_Bold' : ''">{{ $t(item.title) }}</span>
            <span class="font16" :class="isEnLang ? 'en_medium' : ''">{{ $t(item.explain) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Login from "./login.vue";
import Register from "./register.vue";
import { mapGetters } from "vuex";
export default {
  computed: { ...mapGetters(["isEnLang"]) },
  components: {
    Login,
    Register,
  },
  data() {
    return {
      name: "",
      list: [
        {
          src: `${this.$store.state.imgUrl}register1.webp`,
          title: "message.signin.txt3",
          explain: "message.signin.txt4",
        },
        {
          src: `${this.$store.state.imgUrl}register2.webp`,
          title: "message.signin.txt5",
          explain: "message.signin.txt6",
        },
        {
          src: `${this.$store.state.imgUrl}register3.webp`,
          title: "message.signin.txt7",
          explain: "message.signin.txt8",
        },
        {
          src: `${this.$store.state.imgUrl}register4.webp`,
          title: "message.signin.txt9",
          explain: "message.signin.txt10",
        },
        {
          src: `${this.$store.state.imgUrl}register5.webp`,
          title: "message.signin.txt11",
          explain: "message.signin.txt12",
        },
        {
          src: `${this.$store.state.imgUrl}register6.webp`,
          title: "message.signin.txt13",
          explain: "message.signin.txt14",
        },
      ],
    };
  },
  watch: {
    $route(to) {
      this.name = to.params.name;
      window.scrollTo(0, 0);
    },
  },
  mounted() {
    this.name = this.$route.params.name;
  },
};
</script>
<style lang="scss" scoped>
.login_register {
  width: 100%;
  padding: 140px 0 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    width: 90vw;
    background: #101010;
    border: 2px solid #242222;
    margin: 0 auto;
    margin-top: 50px;
    display: flex;
    .right_content {
      flex: 1;
      padding: 10px 40px;
    }
    .pc_box {
      display: block;
    }
    .mobile_box {
      display: none;
    }
  }
}
.establish_txt {
  font-size: 32px;
  font-weight: 600;
  color: #ced3d9;
  margin-bottom: 20px;
}
.subtitle_txt {
  font-weight: 500;
  color: #ced3d9;
  font-size: 16px;
}
.login_left_content {
  display: block;
  flex: 1;
  border-right: 2px solid #242222;
  .onebox {
    width: 100%;
    height: 100px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    border-bottom: 2px solid #242222;
    &:last-child {
      border-bottom: none;
    }
    .imgbox_ {
      width: 40px;
      min-width: 40px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-right: 10px;
      color: #eccf83;
      font-size: 35px;
    }
    .right_txt {
      display: flex;
      flex-direction: column;
      span {
        &:nth-child(1) {
          font-weight: 600;
          color: #ced3d9;
          line-height: 30px;
        }
        &:nth-child(2) {
          font-weight: 400;
          color: #ced3d9;
          line-height: 22px;
        }
      }
    }
  }
}
@media screen and (max-width: 980px) {
  .login_register {
    width: 100%;
    padding: 1.1rem 0.2rem 0.2rem;
    align-items: flex-start;
    .establish_txt {
      font-weight: 600;
      font-size: 0.2rem;
      line-height: 0.2rem;
      margin-bottom: 0.15rem;
    }
    .subtitle_txt {
      font-weight: 400;
      font-size: 0.14rem;
      text-align: left;
    }
    .login_left_content {
      border-right: none;
      .onebox {
        align-items: flex-start;
        padding: 0.18rem 0.1rem;
        .imgbox_ {
          width: 0.2rem;
          height: 0.2rem;
          margin-right: 0.05rem;
          margin-top: 0.07rem;
          min-width: 0.2rem;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          color: #eccf83;
          font-size: 0.14rem;
        }
        .right_txt {
          span {
            &:nth-child(1) {
              line-height: 0.3rem;
            }
            &:nth-child(2) {
              font-weight: 400;
              line-height: 0.18rem;
              margin-top: 0.04rem;
            }
          }
        }
      }
    }
    .content {
      flex-direction: column;
      margin-top: 0.3rem;
      .right_content {
        padding: 0.23rem 0.1rem;
        align-items: center;
        border-bottom: 2px solid #242222;
      }
      .pc_box {
        display: none;
      }
      .mobile_box {
        display: block;
      }
    }
  }
}
</style>
