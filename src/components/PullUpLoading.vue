<template>
  <div class="show_gameArr" ref="showBoxRef">
    <div slot="showarrbox"></div>
    <LoadingAnmation v-if="pageshowarr.length == 0 && pageshowLoading"></LoadingAnmation>
    <NoData v-else-if="pageshowarr.length == 0 && !pageshowLoading" :isshow="false"></NoData>
    <div class="bottom_loading font16" v-if="pageshowarr.length > 10">
      <span v-if="!nodata && pulldown">Pull up to load more</span>
      <span v-else-if="!nodata && !pulldown">Loading...</span>
      <span v-else-if="nodata">End</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.show_gameArr {
    margin-top: 40px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow-y: scroll;
    max-height: 850px;
    .onebox {
      width: 256px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin-right: 40px;
      margin-bottom: 30px;
      min-height: 250px;
      .imgbox{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        .img {
          width: 100%;
          object-fit: contain;
        }
        .serise2Img{
          width: 213px;
        }
      }
      .bottom_box {
        width: 90%;
        margin-top: 20px;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: -2px 1px 22px 0px rgba(194, 190, 190, 0.52) inset;
        padding: 4px 8px;
        .left_price {
          display: flex;
          align-items: center;
          .bsc_img {
            width: 24px;
            object-fit: contain;
            margin-right: 4px;
          }
          .span1 {
            color: #ffffff;
          }
        }
        .btn {
          min-width: 56px;
          height: 22px;
          border-radius: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #dd9005;
          color: #ffffff;
          cursor: pointer;
        }
      }
    }
    .bottom_loading {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      margin-top: 60px;
    }
  }
</style>