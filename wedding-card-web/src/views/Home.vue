<template>
  <div class="flex flex-direction home-container" style="position: relative">
    <div
      class="cover-container animate__animated animate__zoomInUp animate__duration-2s"
    >
      <img v-if="cover" class="cover" :src="cover" alt="" />
    </div>
    <div class="flex-sub flex flex-direction align-center">
      <div
        class="animate__animated animate__tada animate__repeat-2"
        style="font-size: 80px; margin-top: 60px; letter-spacing: 40px"
      >
        我们结婚啦
      </div>
      <div class="flex align-center we">
        <div class="flex-sub">新郎：{{ groom }}</div>
        <div
          style="margin: 0 60px; font-size: 100px; color: red"
          class="animate__animated animate__heartBeat animate__infinite"
        >
          <svg-icon icon-class="heart" />
        </div>
        <div class="flex-sub">新娘：{{ bride }}</div>
      </div>
      <div class="name-line flex align-center justify-center">
        <div class="line" />
        <svg-icon
          icon-class="rhombus"
          style="position: absolute; font-size: 40px; left: 60px"
          class="animate__animated animate__fadeInRight animate__delay-2s"
        />
        <svg-icon
          icon-class="rhombus"
          style="position: absolute; font-size: 60px"
        />
        <svg-icon
          icon-class="rhombus"
          style="position: absolute; font-size: 40px; right: 60px"
          class="animate__animated animate__fadeInLeft animate__delay-2s"
        />
      </div>
      <div class="flex remark align-center">
        <div class="flex-sub" style="text-align: right">{{ day }}</div>
        <span style="font-weight: bold; margin: 0 10px"> |</span>
        <div class="flex-sub" style="letter-spacing: 0">
          {{ countDown }}
        </div>
      </div>

      <div class="flex-sub flex flex-direction justify-center align-center">
        <button class="more-btn" @click="handleMore">点击查看更多</button>
      </div>
    </div>

    <div
      class="cover-text flex flex-direction align-center animate__animated animate__fadeInLeft animate__delay-2s"
    >
      <span style="font-size: 80px; letter-spacing: 28px">LOVE</span>
      <span>执子之手</span>
      <span>与之偕老</span>
    </div>

    <div
      class="ver-text animate__animated animate__fadeInRight animate__delay-2s"
    >
      我们的婚礼，诚邀您见证
    </div>

    <div
      class="border-line animate__animated animate__rotateIn animate__slow"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useRoute, useRouter } from "vue-router";
import request from "../utils/request";

Options({});
export default class extends Vue {
  countDown = "";
  cover = "";

  get tcbEnv(): Record<string, string> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (window as any)._tcbEnv;
  }
  get name(): string {
    const route = useRoute();
    return route.query.name as string;
  }
  get groom(): string {
    return this.tcbEnv.GROOM;
  }
  get bride(): string {
    return this.tcbEnv.BRIDE;
  }
  get date(): string {
    return this.tcbEnv.DATE;
  }
  get day(): string {
    const date = new Date(Date.parse(this.date));
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const monthStr = month < 10 ? "0" + month : month;
    const day = date.getDate();
    const dayStr = day < 10 ? "0" + day : day;
    return `${year}-${monthStr}-${dayStr}`;
  }

  async created(): Promise<void> {
    this.setCountDown();
    setInterval(this.setCountDown, 1000);
    await this.initCover();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(): any {
    const router = useRouter();
    return {
      handleMore(): void {
        router.push({
          name: "Detail",
          query: {
            name: this.name,
          },
        });
      },
    };
  }

  async initCover(): Promise<void> {
    const res = await request.get("res/cover");
    this.cover = res.data.url;
  }

  setCountDown(): void {
    const now = new Date().getTime();
    const date = new Date(Date.parse(this.date)).getTime();
    const totalSecond = (date - now) / 1000;

    if (totalSecond < 0) {
      this.countDown = `已 相 守 ${Math.floor(
        -totalSecond / 60 / 60 / 24
      )}/+∞ 天`;
      return;
    }

    const day = Math.floor(totalSecond / 60 / 60 / 24);
    const hour = Math.floor((totalSecond / 60 / 60) % 24);
    const minute = Math.floor((totalSecond / 60) % 60);
    const second = Math.floor(totalSecond % 60);

    this.countDown = `${day} 天 ${hour} 时 ${minute} 分 ${second} 秒`;
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
