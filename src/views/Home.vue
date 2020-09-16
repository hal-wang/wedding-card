<template>
  <div class="flex flex-direction home-container" style="position: relative">
    <div class="cover-container">
      <img class="cover" :src="`./cover.jpg`" alt="" />
    </div>
    <div class="flex-sub flex flex-direction align-center">
      <div style="font-size: 80px; margin-top: 60px; letter-spacing: 40px">我们结婚啦</div>
      <div class="flex align-center we">
        <div class="flex-sub">新郎：汪文豪</div>
        <div style="margin: 0 60px; font-size: 100px; color: red">
          <svg-icon icon-class="heart" />
        </div>
        <div class="flex-sub">新娘：谢娜娜</div>
      </div>
      <div class="name-line flex align-center justify-center">
        <div class="line" />
        <svg-icon icon-class="rhombus" style="position: absolute; font-size: 40px; left: 60px" />
        <svg-icon icon-class="rhombus" style="position: absolute; font-size: 60px" />
        <svg-icon icon-class="rhombus" style="position: absolute; font-size: 40px; right: 60px" />
      </div>
      <div class="flex remark align-center">
        <div class="flex-sub" style="text-align: right">2020.10.04</div>
        <span style="font-weight: bold; margin: 0 10px"> |</span>
        <div class="flex-sub" style="letter-spacing: 0">
          {{ countDown }}
        </div>
      </div>

      <div class="flex-sub flex flex-direction justify-center align-center">
        <button class="more-btn" @click="handleMore">点击查看更多</button>
      </div>
    </div>

    <div class="cover-text flex flex-direction align-center">
      <span style="font-size: 80px; letter-spacing: 28px">LOVE</span>
      <span>执子之手</span>
      <span>与之偕老</span>
    </div>

    <div class="ver-text">我们的婚礼，诚邀您见证</div>

    <div class="border-line" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      countDown: ''
    }
  },
  computed: {
    name() {
      return this.$route.query.name
    }
  },
  created() {
    this.setCountDown()
    setInterval(this.setCountDown, 1000)
  },
  methods: {
    setCountDown() {
      const now = new Date().getTime()
      const date = new Date(Date.parse('2020/10/04 12:00:00')).getTime()
      const totalSecond = (date - now) / 1000

      if (totalSecond < 0) {
        this.countDown = `已 相 守 ${parseInt(-totalSecond / 60 / 60 / 24)}/+∞ 天`
        return
      }

      const day = parseInt(totalSecond / 60 / 60 / 24)
      const hour = parseInt((totalSecond / 60 / 60) % 24)
      const minute = parseInt((totalSecond / 60) % 60)
      const second = parseInt(totalSecond % 60)

      this.countDown = `${day} 天 ${hour} 时 ${minute} 分 ${second} 秒`
    },
    handleMore() {
      this.$router.push({
        name: 'Detail',
        query: {
          name: this.name
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  width: 1080px;
  height: 1920px;
  background-color: #fff4e6;
}

.we {
  font-size: 40px;
  margin-top: 70px;
  letter-spacing: 4px;
  font-weight: 340;
}

.cover-container {
  width: 100%;
  height: 960px;
  .cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.border-line {
  position: absolute;
  top: 50px;
  left: 50px;
  height: calc(1820px - 16px);
  width: calc(980px - 16px);
  border: 8px solid black;
  pointer-events: none;
}

.name-line {
  position: relative;
  margin-top: 60px;
  color: red;

  .line {
    position: absolute;
    background: linear-gradient(to left, #efefef, red, #efefef);
    height: 4px;
    width: 900px;
    border-radius: 50%;
  }
}

.remark {
  margin-top: 80px;
  font-size: 34px;
  letter-spacing: 16px;
  align-self: stretch;
  font-weight: 300;
}

.cover-text {
  position: absolute;
  top: 100px;
  left: 100px;
  font-weight: 300;
  letter-spacing: 16px;
  font-size: 60px;
  color: white;
}

.ver-text {
  position: absolute;
  top: 100px;
  right: 100px;
  font-size: 40px;
  color: white;
  letter-spacing: 36px;
  writing-mode: vertical-lr;
  font-weight: 300;
}

.more-btn {
  margin-bottom: 40px;
  letter-spacing: 30px;
  background: black;
  color: white;
  border: 0;
  font-weight: 300;
  font-size: 50px;
  padding: 40px 100px;
}
</style>
