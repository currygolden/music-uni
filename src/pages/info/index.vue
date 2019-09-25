<template>
<!-- 背景图是一个变量，没法在css中处理 -->
  <view class="play" :style="bgStyle">
    <!-- 整体蒙层 -->
    <view class="bg"></view>

    <!-- 播放区 -->
    <view class="content">
      <!-- 头部信息 -->
      <view class="info">
        <view class="name">{{audioList[currentIndex].name}}</view>
        <view class="author">{{audioList[currentIndex].author}}</view>
        <view class="bar">
          <view>标准</view>
          <view>音效</view>
          <view>MV</view>
        </view>
      </view>

      <!-- 唱片展示区 -->
      <view class="micImg">
        <image :class="playState ? 'rotate' : ''" :src="audioList[currentIndex].img"></image>
      </view>

      <!-- 操作区域 -->
      <view class="bot">
        <!-- 播放进度条 -->
        <view class="progress">
          <view class="time start">{{playtimeMat}}</view>
					<slider class="line" :value="playTime" min="0" :max="allTime" @change="sliderChange" block-size="15" activeColor="#55A532" />
          <view class="time end">{{allTimeMat}}</view>
        </view>
				
				<!-- 切换播放方式 -->
        <!-- 利用flex实现水平|居中布局 -->
				<view class="btn">
          <!-- 播放类型 -->
					<view @tap="changeAudioPlay">
						<image v-if="audioWay===0" class="iconbtn" src="../../static/image/icon/xunhuanbofang.png"></image>
						<image v-if="audioWay===2" class="iconbtn" src="../../static/image/icon/danquxunhuan.png"></image>
						<image v-if="audioWay===1" class="iconbtn" src="../../static/image/icon/suijibofang.png"></image>
					</view>

          <!-- 切歌 -->
          <view class="playBtn">
            <view @tap="upPlay"><image class="iconbtn" src="../../static/image/icon/shangyishou.png"></image></view>
            <view @tap="play">
              <image v-if="!playState" class="iconbtn play-handle" src="../../static/image/icon/kaishi-2.png"></image>
							<image v-if="playState" class="iconbtn play-handle" src="../../static/image/icon/zanting-2.png"></image>
            </view>
            <view @tap="nextPlay"><image class="iconbtn" src="../../static/image/icon/xiayishou.png"></image></view>
          </view>
          <!-- 歌单展示 -->
          <view><image class="iconbtn" src="../../static/image/icon/yinleliebiao.png"></image></view>
				</view>

        <!-- 交互引流区 -->
        <view class="tool">
          <view @tap="collectFunc">
            <image v-if="!collect" class="iconbtn" src="../../static/image/icon/shoucang.png"></image>
            <image v-if="collect" class="iconbtn" src="../../static/image/icon/shoucang-2.png"></image>
          </view>
          <view><image class="iconbtn" src="../../static/image/icon/xiazai.png"></image></view>
          <view><image class="iconbtn" src="../../static/image/icon/share.png"></image></view>
          <view><image class="iconbtn" src="../../static/image/icon/liuyanjianyi.png"></image></view>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
	// 组件级别变量，不需要支持响应
	let innerAudioContext = '' // 音频对象上下文
	
// 歌曲播放页面
export default {
  data () {
    return {
      playTime: 0, // 当前播放时间
      allTime: 0, // 歌曲总时间
      currentIndex: 0, // 当前播放歌曲索引
      playState: false, // 当前播放状态
      audioWay: 0, // 播放方式 0顺序 1随机 2单曲循环
      collect: false, // 搜藏歌曲
      audioList:[
        {
          name:'你的微笑',
          author:'Shart Foeir',
          src:'http://cdnringbd.shoujiduoduo.com/ringres/userv1/a48/556/66405556.aac',
          img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547630730529&di=f37e409de12f9930e25507c3252a462c&imgtype=0&src=http%3A%2F%2Fmp2.iqiyipic.com%2Fimage%2F20180827%2F03%2F41%2Fh_1199242471_h_601_400_400.jpg',
        },
        {
          name:'英雄联盟群雄齐聚',
          author:'毛不易',
          src:'http://cdnringbd.shoujiduoduo.com/ringres/userv1/a48/414/66335414.aac',
          img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547630762297&di=2c3317bf38f107287414b1b0cd33f0e5&imgtype=0&src=http%3A%2F%2Fsingerimg.kugou.com%2Fuploadpic%2Fpass%2Fsofthead%2F400%2F20140829%2F20140829161553861786.jpg',
        },
        {
          name:'TryEverything',
          author:'Shakira',
          src:'http://cdnringbd.shoujiduoduo.com/ringres/userv1/a48/480/66379480.aac',
          img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547471202346&di=bd9b5e27beb9341b058d21e521e8d75e&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201707%2F27%2F20170727210705_zcijE.jpeg',
        },
        {
          name:'我爱过几个人',
          author:'邓论',
          src:'http://cdnringbd.shoujiduoduo.com/ringres/userv1/a48/339/65390339.aac',
          img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547630610810&di=1a0c6d9557aa2bba822c54694a55429e&imgtype=0&src=http%3A%2F%2Fmp0.iqiyipic.com%2Fimage%2F20180827%2Fff%2F79%2Fh_1199249539_h_601_400_400.jpg',
        },
        {
          name:'浪子回头',
          author:'辉气*蛋',
          src:'http://cdnringbd.shoujiduoduo.com/ringres/userv1/a48/645/66725645.aac',
          img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547631130547&di=076c9275ce160baa2ff5cb66eed4ad53&imgtype=0&src=http%3A%2F%2Fwww.mixtapetorrent.com%2Fsystem%2Ffiles%2Ffollowmernb.jpg',
        },
        {
          name:'生僻字心动不已',
          author:'〃°ω°〃',
          src:'http://cdnringbd.shoujiduoduo.com/ringres/userv1/a48/359/64750359.aac',
          img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547631330468&di=517d6b42ed32567a5798fd9bbe13ff9c&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20170830%2F2dbe36dfa0a14c0c94b672f445c02a21.jpeg',
        }
			]
    }
  },
	// 组件重载的时候
	mounted() {
		this.currentIndex = 0
		this.audioInit()
	},
  computed: {
    // 全局蒙层背景图片
    bgStyle () {
      return `background-image: url(${this.audioList[this.currentIndex].img})`
    },
    // 返回的当前播放秒转化为分
    playtimeMat () {
      return this.$pubFuc.secondFormact(this.playTime)
    },
    // 总时间转化为分
    allTimeMat () {
      return this.$pubFuc.secondFormact(this.allTime)
    }
  },
  methods: {
	// 音频初始化
		audioInit () {
      let that = this
			let src = this.audioList[this.currentIndex].src
			if (innerAudioContext) {
				innerAudioContext.destroy()
				innerAudioContext = ''
			}
			// 若存在音频上下文，清除
			// 创建实例
			innerAudioContext = uni.createInnerAudioContext()
			innerAudioContext.src = src
			innerAudioContext.autoplay = true // 设置开始自动播放
			
			// 异步获取资源时长
			// let dura = setTimeout(() => {
			// 	that.allTime = Math.floor(innerAudioContext.duration)
      // },0)
      
      // 对比和前面定时器的写法区别，一次异步获取可能获取不到，加强判断
      let dura = setInterval(()=>{
        this.allTime = Math.floor(innerAudioContext.duration)
        if(this.allTime){
          clearInterval(dura)
        }
        // console.log('time:', this.allTime)
      })
			
			// 设置常见的音频播放事件
			innerAudioContext.onPlay(()=>{
				this.playFunc()
      })
      /* 
        从暂停理解这里的交互是双向的，暂停与playState
      */
			innerAudioContext.onPause(()=>{
				this.pauseFunc()
			})
			innerAudioContext.onTimeUpdate((e)=>{
				this.playTime = Math.floor(innerAudioContext.currentTime)
			})
			innerAudioContext.onEnded(()=>{
				this.nextPlay()
			})
		},
    // 进度条拖动
    sliderChange (e) {
      this.playTime = e.detail.value
      // 对应更新音频播放
      innerAudioContext.seek(this.playTime)
    },
		playFunc () {
      // alert(1111)
			this.playState = 1
		},
		pauseFunc () {
			this.playState = 0
    },
    // 切换播放模式状态
    changeAudioPlay () {
      if (this.audioWay === 2) {
        return this.audioWay = 0
      }
      this.audioWay += 1
      console.log('ddd:', this.audioWay)
    },
    // 点击按钮切换播放状态
    play () {
      // 实际控制播放肯定是调音频相关的api
      if (this.playState) {
        innerAudioContext.pause()
      } else {
        innerAudioContext.play()
      }
    },
    // 上一曲
    upPlay () {
      // 第一首
      if (this.audioWay === 1) {
        // Math.random() [0,1)
        this.currentIndex = Math.floor(Math.random() * this.audioList.length)
      } else if (this.audioWay === 0) {
        if (this.currentIndex === 0) {
          this.currentIndex = this.audioList.length - 1
        } else {
          this.currentIndex -= 1
        }
      }
      this.audioInit()
    },
    // 取决于哪一种播放模式
    nextPlay () {
      // 最后一首
      // 随机
      if (this.audioWay === 1) {
        // Math.random() [0,1)
        this.currentIndex = Math.floor(Math.random() * this.audioList.length)
        // 顺序
      } else if (this.audioWay === 0) {
        if (this.currentIndex === this.audioList.length - 1) {
          this.currentIndex = 0
        } else {
          this.currentIndex += 1
        }
      }
      // 需要歌曲初始化
      this.audioInit()
    },
    collectFunc () {
      this.collect = !this.collect
    }
  }
}
</script>

<style lang="scss" scoped>
  .play {
    position: fixed;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat; // 图像平铺方式
    background-position: center; // 设置图片的中心点
    background-size:cover;
    // filter: blur(40upx); // blur属性在父元素会导致覆盖不可见
    z-index: 0;

    .bg{
      position: fixed;
      z-index: 0;
      right: 0;
      left: 0;
      height: 100%;
      width: 100%;
      filter: blur(40upx);
      background: inherit;
    }

    .content {
      position: fixed;
      right: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      color: #FFFDEF;
      .info {
        margin-top: 20upx;
        width: 100%;
        text-align: center;
        .name {
          font-size: 46upx;
        }
        .author {
          font-size: 34upx;
          line-height: 60upx;
        }
        .bar {
          width: 330upx;
          margin: 20upx auto;
          display: flex;
          justify-content: space-between; // 在主轴的对齐方式
          view {
            width: 100upx;
            height: 40upx;
            border: solid 1upx #FFFDEF;
            border-radius: 2upx;
            text-align: center;
          }
        }
      }
      .micImg {
        margin: 25upx auto;
        image {
          display: block;
          margin: 0 auto;
          width: 600upx;
          height: 600upx;
          border: solid 16upx rgba(0,0,0,.15);
          border-radius:50%;
          // 动画部分问题还是比较多
          &.rotate {
            // transform: rotate(360deg);
            animation: imgrotate 8s linear infinite;
          }
          /* 定义关键帧 */
          @keyframes imgrotate {
            0%{ -webkit-transform: rotate(0deg)}
            50%{ -webkit-transform: rotate(180deg)}
            100%{ -webkit-transform: rotate(360deg)}
          }
        }
      }
      .bot {
        position: fixed;
        bottom: 40upx;
        left: 0;
        width: 100%;
        padding: 0 26upx;
        box-sizing: border-box;
        .progress {
          display: flex;
          padding: 20upx 0;
          justify-content: space-between;
          .line {
            width: 520upx;
            margin: 0 auto;
          }
        }
        .btn {
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-between;
          padding: 40upx 15upx;
          .iconbtn {
            display: block;
            width: 50upx;
            height: 50upx;
            margin: 0 auto;
          }
        }
        .playBtn {
          display: flex;
          width: 500upx;
          margin-top: -15upx;
          view {
            flex: 1;
            align-items: center;
          }
          .iconbtn {
            width: 80upx;
            height: 80upx;
            &.play-hanlde {
              width: 120upx;
              height: 120upx;
              // margin-top: -20upx;
            }
          }
        }
        .tool {
        display: flex;
        justify-content: space-between;
        view {
          flex: 1;
        }
        .iconbtn {
          display: block;
          width: 50upx;
          height: 50upx;
          margin: 0 auto;
        }
      }
      }
    }
  }
</style>