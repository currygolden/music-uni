
<template>
	<view  v-if="prodata" class="recom">
		<view v-for="(val,index) in prodata" :key="index" class="zj" :style="{width:blockWidth}" @tap="goUrl('../info/index')">
			<view class="imgSpan">
        <!-- 图片mode支持多种模式 -->
				<image class="img" v-if="val.src" :src="val.src" mode='widthFix'></image>
				<image class="icon" v-if="imgSrc" :src="imgSrc+'icon/kaishi-2.png'"  mode='widthFix'></image>
				<view v-if="val.count" class="listenCount">
					<image v-if="imgSrc" :src="imgSrc+'icon/yinle.png'"></image>
					{{val.count}}
				</view>
			</view>
			<view v-if="val.name" class="name">{{val.name}}</view>
			<view v-if="val.author" class="author">{{val.author}}</view>
		</view>
	</view>
</template>

<script>
// 渲染list的组件很常见，自行可以封装，uni-app也有可用的
	export default {
		name: "album",
		props:{
			prodata: {
				type: Array,
				default: []
			},
			blockWidth:{
				type:String,
				default:'32.8%'
			}
		},
		data() {
			return {
				imgSrc: '../../static/image/',
			};
		},
		mounted:function () {
      // 因为小程序模板不能调用方法所以在这里格式化数据
      // 可以挂载到vue原型上，也可以在组件中以模块的形式引入
			for(let i=0;i<this.prodata.length;i++){
				this.prodata[i].count = this.$pubFuc.peoNum(this.prodata[i].count)
			}
		},
		computed: {
			
		},
		methods:{
			goUrl : function (str){
				uni.navigateTo({
					url: str
				});
			}
		}
	}
</script>

<style  lang="scss" scoped>
	.recom {
		display: flex;
		justify-content: space-between; // 水平排列
		flex-wrap: wrap; // 换行
		width: 100%;

		.zj {
			margin-bottom: 30upx;
			.imgSpan {
				position:relative;
				.img{
					display: block;
					width: 100%;
				}
				.icon{
					position: absolute;
					z-index: 1;
					right: 10upx;
					bottom: 10upx;
					width: 40upx;
					opacity: .9;
				}
				.listenCount{
					position: absolute;
					left: 10upx;
					bottom: 10upx;
					color: rgba(255,255,255,.8);
					font-size: 20upx;
					
					image{
						width: 28upx;
						height: 32upx;
						margin-right: 6upx;
						display: inline-block;
						vertical-align: text-bottom;
					}
				}
			}
		}

		.name,
		.author {
			padding: 0 6upx;
			font-size: 26upx;
		}

		.author {
			color: #999999;
		}
	}

</style>
