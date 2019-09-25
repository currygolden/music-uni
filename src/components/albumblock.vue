<!-- 首页用到的块级相册组件
    这里采用slot就可以，没必要再次封装组件
 -->

  
<template>
  <view v-if="prodata" class="recommend">
    <view v-if="prodata.title" class="title">
      {{prodata.title}}
      <image v-if="imgSrc" :src="imgSrc+'jiantou2.png'"></image>
    </view>
    <album :prodata="prodata.list" :blockWidth="blockWidth"></album>
    <!-- 点击响应回调 -->
    <view v-if="changeReturnParams" @tap="changeFunc" class="change">
      <image v-if="imgSrc" :src="imgSrc+'icon/shuaxin.png'"></image>
			换一批
    </view>
  </view>
  <view v-else>暂无推荐</view>
</template>

<script>
  import album from './album.vue'
  export default {
    data() {
      return {
        imgSrc: '../../static/image/'
      }
    },
    props: {
      // 相册数据来源
      prodata: {
        type: Object,
        default: {}
      },
      // 换一换逻辑
      changeReturnParams: {
        type: String,
        default: ''
      },
      // 相册宽度
      blockWidth:{
        type: String,
        default: '33.3%'
      }
    },
    components: {
      album
    },
    methods: {
      changeFunc () {
        this.$emit('change', this.changeReturnParams)
      }
    }
  }
</script>

<style  lang="scss" scoped>
	.title {
		position: relative;
		height: 100upx;
		line-height: 100upx; // 垂直居中
		text-align: center; // 水平居中
		font-size: 32upx;

		image {
			width: 40upx;
			height: 40upx;
			position: absolute;
			top: 30upx;
			right: 40upx;
			display: block;
		}
	}
	.change {
		width: 28%;
		line-height: 56upx;
		margin: 0 auto;
		text-align: center;
		font-size: 26upx;
		margin-bottom: 20upx;
		border: solid 1upx #CCCCCC;

		image {
			display: inline-block;
			vertical-align: text-bottom;
			width: 32upx;
			height: 32upx;
		}
	}
</style>