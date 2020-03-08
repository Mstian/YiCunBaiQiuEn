<template>
  <div v-cloak>
    <download v-if="isShare" />
    <!-- 判断是否为分享 是 用div占位 否 则不显示-->
    <div v-if="isShare" class="isShare"></div>
    <div class="main" ref='main' style="display:none">
      <div v-if="datas.video && isShare" class="video">
        <video :src="datas.video" autoplay="autoplay" controls x5-playsinline playsinline webkit-playsinline></video>
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
    <div v-if="isShare && aboutData.length > 0" class="connect">
      <div class="connect_title">相关推荐</div>
      <div
        class="connet_list"
        v-for="(item,index) in aboutData"
        :key="index"
        @click="toNewPage(item.id)"
      >
        <div class="connet_top">
          <div class="connet_list_left">{{item.title}}</div>
          <div class="connet_list_right">
            <img :src="item.image" alt />
          </div>
        </div>
        <div class="connet_bot">
          <span>{{item.source}}</span>
          <span>{{item.click}}浏览量</span>
          <span>{{item.update_time}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { xiangqing } from "../api/urls";
import { xiangguan } from "../api/urls";
import { isShare } from "../utils/tools";
import { formatDate } from "../utils/tools";
export default {
  data() {
    return {
      datas: {},
      isShare: "",
      aboutData: [],
      formatDate: ""
    };
  },
  beforeCreate() {
    this.isShare = isShare;
  },
  methods: {
    getArticleData(id) {
      this.$request.get(xiangqing, { id: id }).then(data => {
        if (data) {
          const regex = new RegExp("<img", "gi");
          if (data.content) {
            data.content = data.content.replace(
              regex,
              `<img style="max-width: 100%; height: auto"`
            );
          }
          this.datas = data;
        }
      });
    },
    getAboutData(banid) {
      this.$request.get(xiangguan, { banid: banid }).then(data => {
        this.aboutData = data.data;
      });
    },
    toNewPage(id) {
      window.open(
        "http://tt.ybhealth.com/article_bai_share/index.html#/?id=" + id
      );
      // this.$router.push({ path: '/page', query: { id: id }});
    },
    openApp() {
      window.location.href = "http://download.ybhealth.com/app/index.html";
    },
    showMore() {
      this.$refs.content.style.height = "auto";
      this.$refs.cover.style.display = "none";
    }
  },
  mounted() {
    this.isShare = isShare;
    console.log(this.$route.query);
    // const id = this.$route.query.id ? this.$route.query.id : '741089' //文本
    // const id = this.$route.query.id ? this.$route.query.id : '846542' //视频
    const id = this.$route.query.id ? this.$route.query.id : ""; // 741090  文章内部含有视频
    const banid = this.$route.query.banid ? this.$route.query.banid : ""; //9 10
    this.getArticleData(id);
    if (banid) {
      this.getAboutData(banid);
    }
    this.formatDate = formatDate;
    setTimeout(()=>{
      this.$refs.main.style.display = 'block';
    },500)
  }
};
</script>
<style>
[v-cloak]{
  display: none;
}
.main,
.connect {
  /* height: 900px; */
  /* font-size: 42px; */
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
  font-size:34px;
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