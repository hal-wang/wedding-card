<template>
  <div
    class="detail-container"
    :style="{ height: `${height}px`, width: `${width}px` }"
  >
    <img class="background-img" src="@/assets/background.jpg" alt="" />
    <div v-if="name" class="main-detail flex flex-direction align-center">
      <span class="name"> {{ name }}</span>
      <span class="subtitle">诚邀您参加我们的婚礼</span>
      <div class="hori-line flex align-center">
        <div class="line"></div>
        <div class="line-heart">
          <svg-icon icon-class="heart" />
        </div>
      </div>
      <span class="title">时间</span>
      <span class="content">2020年10月04日 中午12:00</span>
      <span class="title">详细地址</span>
      <span class="content">安徽省阜阳市颍上县江店孜镇杨庄村汪庄</span>
      <span class="title">电话/微信</span>
      <span class="content">18756858797</span>

      <button class="nav-btn" @click="handleAlbum">我们的照片 >>></button>
    </div>
    <div v-else class="not-found flex justify-center align-center">
      <span>暂未收录</span>
    </div>
  </div>
</template>

<script>
import linq from "linq";

export default {
  computed: {
    name() {
      const qn = this.$route.query.name;
      console.log("name", qn, this.$store.state.config.people);
      if (
        linq
          .from(this.$store.state.config.people)
          .where(p => p === qn)
          .count() == 0
      ) {
        return null;
      }

      return qn;
    },
    height() {
      return window.innerHeight;
    },
    width() {
      return window.innerWidth;
    }
  },
  methods: {
    handleAlbum() {
      this.$router.push({
        name: "Album"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.detail-container {
  position: relative;

  .background-img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100vw;
    object-fit: cover;
    z-index: -1;
  }

  .main-detail {
    position: relative;
    height: 100%;
    width: 100%;

    .name {
      font-size: 10vw;
      margin-top: 10vw;
      letter-spacing: 4vw;
    }
    .title {
      align-self: flex-start;
      font-size: 5.4vw;
      margin: 6vw 2vw 0 2vw;
      letter-spacing: 2vw;
    }
    .content {
      align-self: flex-start;
      font-size: 4vw;
      font-weight: 300;
      margin: 1vw 2vw 0 2vw;
      letter-spacing: 1vw;
    }
    .subtitle {
      font-size: 5.4vw;
      margin-top: 6vw;
      font-weight: 300;
      letter-spacing: 3vw;
    }
    .hori-line {
      align-self: stretch;
      position: relative;
      margin-top: 6vw;

      .line {
        width: 100vw;
        height: 2px;
        background: red;
      }
      .line-heart {
        position: absolute;
        color: red;
        font-size: 6vw;
        right: 10vw;
      }
    }
    .nav-btn {
      align-self: flex-start;
      font-size: 5.4vw;
      margin: 6vw 4vw 0 4vw;
      letter-spacing: 2vw;
      background: #f00;
      color: white;
      border: 2px solid red;
      border-radius: 2vw;
      padding: 2vw 4vw;
      outline: unset;
    }
  }

  .not-found {
    font-weight: 300;
    font-size: 10vw;
    letter-spacing: 6vw;
    height: 60%;
    width: calc(100% - 6vw);
    margin-left: 6vw;
  }
}
</style>
