<template>
  <view class="top bgColor">
    <view class="bar">
      <image v-if="imgSrc" :src="`${imgSrc}icon/fenlei.png`" class="icon type"></image>
      <view class="barContent">
        <view>我的</view>
        <view class="sel">音乐馆</view>
        <view>发现</view>
      </view>
      <image v-if="imgSrc" :src="`${imgSrc}icon/jiahao.png`" class="icon add"></image>
    </view>
    <view class="search bgDeepColor">
      <input
        type="text"
        placeholder="搜索"
        placeholder-style="color:rgba(255,255,255,.8)"
        v-model="inputValue"/>
      <image class="icon" v-if="imgSrc" :src="imgSrc+'icon/sousuo5.png'"></image>
    </view>
  </view>
</template>

<script>
export default {
  name: "top",
  data() {
    return {
      imgSrc: '../../static/image/', // 图片的相对路径
      inputValue: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .top {
    pad: 40upx 20upx;
    width: 100%;
    box-sizing: border-box;
    color: #fff;
    font-size: 32upx;  // 改写全局字体属性

    .bar {
      display: flex;
      justify-content: space-between;
      line-height: 44upx;

      .icon {
        width: 44upx;
        height: 44upx;
      }

      .barContent {
        display: flex;
        justify-content: space-between;
        // 定宽块级元素居中
        width: 360upx;
        margin: 0 auto;

        .sel {
          font-size: 36upx;
          font-weight: 600;
        }
      }
    }
    .search {
      position: relative;
      margin-top: 32upx;
      padding: 10upx 20upx;
      height: 76upx;
      box-sizing: border-box;
      line-height: 60upx;
      color: rgba(255,255,255);
      input {
        padding-left: 60upx;
      }

      .icon {
        position: absolute;
        width: 40upx;
        height: 40upx;
        top: 16upx;
        left: 20upx;
      }
    }
  }
</style>>