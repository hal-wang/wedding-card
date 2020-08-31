<template>
  <div
    class="flex flex-direction"
    style="position:relative;"
    :style="{ height: `${height}px`, width: `${width}px` }"
  >
    <div class="cover-container">
      <img class="cover" src="@/assets/cover.jpg" alt="" />
    </div>
    <div class="flex-sub flex flex-direction align-center">
      <div style="font-size:10vw;margin-top:8vw;letter-spacing:2vw;">
        我们结婚啦
      </div>
      <div class="flex align-center" style="font-size:4.6vw;margin-top:4vw;">
        <div class="flex-sub">新郎：汪文豪</div>
        <div style="margin:0 4vw;font-size:8vw;color:red;">
          <svg-icon icon-class="heart" />
        </div>
        <div class="flex-sub">新娘：谢娜娜</div>
      </div>
      <div class="name-line flex align-center justify-center">
        <div class="line" />
        <svg-icon
          icon-class="rhombus"
          style="position: absolute;font-size:4vw;left:8vw;"
        />
        <svg-icon
          icon-class="rhombus"
          style="position: absolute;font-size:6vw;"
        />
        <svg-icon
          icon-class="rhombus"
          style="position: absolute;font-size:4vw;right:8vw;"
        />
      </div>
      <div class="flex remark align-center">
        <div class="flex-sub" style="text-align:right;">2020.10.04</div>
        <span style="font-weight:bold;margin:0 2vw;"> |</span>
        <div class="flex-sub">江店孜镇汪庄</div>
      </div>

      <div class="flex-sub flex flex-direction justify-center align-center">
        <button class="more-btn" @click="handleMore">
          点击查看更多
        </button>
      </div>
    </div>

    <div class="cover-text flex flex-direction align-center">
      <span style="font-size:6vw;letter-spacing: 1.4vw;">LOVE</span>
      <span>执子之手</span>
      <span>与之偕老</span>
    </div>

    <div class="ver-text">我们的婚礼，诚邀您见证</div>

    <div class="border-line" />
  </div>
</template>

<script>
export default {
  computed: {
    name() {
      return this.$route.query.name;
    },
    height() {
      return window.innerHeight;
    },
    width() {
      return window.innerWidth;
    }
  },
  methods: {
    handleMore() {
      this.$router.push({
        name: "Detail",
        query: {
          name: this.name
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.cover-container {
  width: 100vw;
  height: 46vh;
  .cover {
    width: 100vw;
    height: 100%;
    object-fit: cover;
  }
}

.border-line {
  position: absolute;
  top: 5vw;
  left: 5vw;
  height: calc(100% - 12.4vw);
  width: calc(90vw - 2.4vw);
  border: 1.2vw solid black;
  pointer-events: none;
}

.name-line {
  position: relative;
  margin-top: 4vw;
  color: red;

  .line {
    position: absolute;
    background: linear-gradient(to left, #efefef, red, #efefef);
    height: 0.8vw;
    width: 80vw;
    border-radius: 50%;
  }
}

.remark {
  margin-top: 6vw;
  font-size: 3vw;
  letter-spacing: 1vw;
}

.cover-text {
  position: absolute;
  top: 10vw;
  left: 16vw;
  font-weight: 300;
  letter-spacing: 1vw;
  font-size: 4vw;
  color: white;
}

.ver-text {
  position: absolute;
  top: 10vw;
  right: 8vw;
  font-size: 2.4vh;
  color: white;
  letter-spacing: 2vw;
  writing-mode: vertical-lr;
  font-weight: 300;
}

.more-btn {
  margin-bottom: 8vw;
  font-size: 4vw;
  letter-spacing: 2vw;
  background: black;
  color: white;
  border: 0;
  font-weight: 300;
  font-size: 5vw;
  padding: 2vw 6vw;
}
</style>
