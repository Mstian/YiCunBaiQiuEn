<template>
  <div class="downbar">
    <div class="head_logo">
      <img src="http://device.ybhealth.com/toutiao/share/static/img/logo.62d15a6.png" alt />
    </div>
    <div class="openApp" @click="opApp()">打开</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    opApp() {
      window.location.href = "http://download.ybhealth.com/app/index.html";
    }
  }
};
</script>

<style>
.downbar {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  background: #fff;
  padding: 0 15px;
  height: 100px;
  box-shadow: 0 0.4vw 0.933vw rgba(119, 119, 119, 0.35);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999999999999999;
  /* margin-bottom: 60px; */
}
.head_logo {
  height: 9.867vw;
}
.head_logo img {
  /* width: 100%; */
  height: 100%;
}
.openApp {
  width: 20.8vw;
  height: 7.4vw;
  background: #68dbed;
  border-radius: 9999px;
  font-size: 3.7vw;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>