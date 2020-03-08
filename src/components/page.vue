<template>
  <div>
    <download v-if="isShare" />
    <!-- 判断是否为分享 是 用div占位 否 则不显示-->
    <div v-if="isShare" class="isShare"></div>
    <div style="display:none" class="main" ref="main">
      <div class="videoList">
        <div v-if="datas.video" class="video">
          <video
            :src="datas.video"
            controls
            autoplay="autoplay"
            x5-playsinline
            playsinline
            webkit-playsinline
            @ended="videoend"
          ></video>
        </div>
        <div class="videoMenu">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-submenu index="1">
              <template slot="title">
                <span class="catogray_mulu">目录</span>
                <span>下一个播放：{{nextVideo.title}}</span>
              </template>
              <div class="sunList">
                <div
                  v-for="(item, index ) in videoCateData"
                  :key="index"
                  @click="changeVideo(item)"
                >{{item.title}}</div>
              </div>
            </el-submenu>
          </el-menu>
        </div>
      </div>
      <div class="title">{{datas.title}}</div>
      <div ref="content" :class="['content',isShare ? 'fix_hieght' : '']" v-html="datas.content"></div>
      <div v-if="isShare" ref="cover" class="cover">
        <div class="down" @click="showMore()">
          <img src="../assets/down.png" alt />
        </div>
        <div @click="openApp()" class="article_openApp">打开APP阅读全文</div>
      </div>
    </div>
  </div>
</template>
<script>
import { xiangqing } from "../api/urls";
import { xiangguan, videolist } from "../api/urls";
import { isShare } from "../utils/tools";
export default {
  data() {
    return {
      datas: {},
      isShare: "",
      videoCateData: [],
      nextVideo: {},
      // aboutData: []
      activeVideo: {}
    };
  },
  beforeCreate() {
    this.isShare = isShare;
  },
  methods: {
    videoend() {
      // console.log(this.nextVideo,'11');
      this.changeVideo(this.nextVideo);
    },
    getVideoData(typeid, id) {
      this.$request.get(videolist, { typeid: typeid }).then(data => {
        if (data.error == 0) {
          this.videoCateData = data.info;
          var _this = this;
          var findItemIndex = data.info.findIndex(item => {
            return item.id == id;
          });
          // console.log(findItemIndex)
          // this.activeVideo = data.info[findItemIndex];
          if (findItemIndex + 1 >= data.info.length) {
            findItemIndex = 0;
            this.nextVideo = data.info[findItemIndex];
            return;
          }
          this.nextVideo = data.info[findItemIndex + 1];
        }
      });
    },
    changeVideo(item) {
      this.getArticleData(item.id);
      this.getVideoData(this.$route.query.typeid, item.id);
    },
    getArticleData(id) {
      this.$request.get(xiangqing, { id: id }).then(data => {
        console.log(data);
        if (data) {
          const regex = new RegExp("<img", "gi");
          data.content = data.content.replace(
            regex,
            `<img style="max-width: 100%; height: auto"`
          );
          this.datas = data;
        }
      });
    },
    openApp() {
      window.location.href = "http://download.ybhealth.com/app/index.html";
    },
    showMore() {
      this.$refs.content.style.height = "auto";
      this.$refs.cover.style.display = "none";
    },
    handleOpen() {},
    handleClose() {}
  },
  mounted() {
    this.isShare = isShare;
    this.getArticleData(this.$route.query.id); //817280
    // this.$route.query.typeid
    this.getVideoData(this.$route.query.typeid, this.$route.query.id); //666
    setTimeout(()=>{
      this.$refs.main.style.display = 'block';
    },500)
  }
};
</script>
<style>
.videoMenu {
  margin-bottom: 40px;
}
.el-submenu__title {
  padding-left: 0px !important;
  color: #66cbe6;
  font-size: 28px;
  width: 100%;
  height: 90px;
  border-bottom: 1px solid #eee;
  line-height: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* margin: 0px 0px 40px 0px;  */
}
.sunList > div {
  height: 78px;
  border-bottom: 1px solid #eee;
  color: #66cbe6;
  font-size: 28px;
  line-height: 78px;
  padding-left: 110px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.catogray_mulu {
  width: 110px;
  text-align: center;
  display: inline-block;
  color: #333333;
}
.main,
.connect {
  padding: 30px 30px;
  position: relative;
}
.isShare {
  height: 100px;
}
.title {
  font-size: 42px;
  font-weight: bold;
  color: #333333;
}
.content {
  position: relative;
  font-size: 34px;
  color: #333;
  line-height: 55px;
  margin-top: 40px;
  overflow: hidden;
}
.fix_hieght {
  height: 594px;
}
.comment_title {
  font-size: 40px;
  color: #333;
  font-weight: 400;
  margin: 60px 0 40px 0;
}
.cover {
  width: 100%;
  height: 214px;
  background-image: linear-gradient(to bottom, transparent, #fff 60%);
  position: absolute;
  bottom: 0;
  left: 0;
}
.article_openApp {
  width: 690px;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -345px;
  height: 74px;
  line-height: 74px;
  color: #fff;
  background: #66cbe6;
  border-radius: 999999px;
  text-align: center;
  font-size: 32px;
}
.down {
  width: 50px;
  height: 58px;
  position: absolute;
  left: 50%;
  margin-left: -25px;
  top: 80px;
  animation: updown 1s infinite alternate;
  -webkit-animation: updown 1s infinite alternate;
  z-index: 99;
}
.down img {
  width: 100%;
  height: 100%;
}
@keyframes updown {
  from {
    margin-top: -50px;
  }

  to {
    margin-top: -40px;
  }
}
@-webkit-keyframes updown {
  from {
    margin-top: -50px;
  }

  to {
    margin-top: -40px;
  }
}
.connect_title {
  font-size: 40px;
  color: #333;
  margin: 40px 0 40px 0px;
}
.connet_list {
  padding: 30px 0;
  border-bottom: 1px solid #eeeeee;
}
.connet_list_left {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.connet_top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 146px;
}
.connet_list_left {
  width: 418px;
  font-size: 32px;
  color: #333;
  line-height: 50px;
}
.connet_list_right {
  width: 226px;
  height: 146px;
}
.connet_list_right img {
  width: 100%;
  height: 100%;
}
.connet_bot span {
  margin-right: 30px;
  font-size: 24px;
  color: #999999;
}
.video {
  height: 390px;
  width: 100%;
  margin-bottom: 20px;
}
.video video {
  width: 100%;
  height: 100%;
}
video {
  width: 100%;
}
</style>