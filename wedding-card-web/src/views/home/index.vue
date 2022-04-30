<template>
  <div class="flex flex-col home-container" style="position: relative">
    <div class="cover-container animate__animated animate__zoomInUp animate__duration-2s">
      <img v-if="cover" class="cover" :src="cover" alt="" />
    </div>
    <div class="flex-1 flex flex-col items-center">
      <div
        class="animate__animated animate__tada animate__repeat-2"
        style="font-size: 80px; margin-top: 60px; letter-spacing: 40px"
      >
        我们结婚啦
      </div>
      <div class="flex items-center we">
        <div class="flex-1">新郎：{{ groom }}</div>
        <div style="margin: 0 60px" class="animate__animated animate__heartBeat animate__infinite">
          <icon icon="heart|svg" size="100" color="red" />
        </div>
        <div class="flex-1">新娘：{{ bride }}</div>
      </div>
      <div class="name-line flex items-center justify-center">
        <div class="line"></div>
        <icon
          icon="rhombus|svg"
          style="position: absolute; left: 60px"
          size="40"
          color="red"
          class="animate__animated animate__fadeInRight animate__delay-2s color-red"
        />
        <icon icon="rhombus|svg" style="position: absolute" size="60" color="red" />
        <icon
          icon="rhombus|svg"
          style="position: absolute; right: 60px"
          size="40"
          color="red"
          class="animate__animated animate__fadeInLeft animate__delay-2s"
        />
      </div>
      <div class="flex remark items-center">
        <div class="flex-1" style="text-align: right">{{ day }}</div>
        <span style="font-weight: bold; margin: 0 10px"> |</span>
        <div class="flex-1" style="letter-spacing: 0">
          {{ countDown }}
        </div>
      </div>

      <div class="flex-1 flex flex-col justify-center items-center">
        <button class="more-btn" @click="handleMore">点击查看更多</button>
      </div>
    </div>

    <div
      class="cover-text flex flex-col items-center animate__animated animate__fadeInLeft animate__delay-2s"
    >
      <span style="font-size: 80px; letter-spacing: 28px">LOVE</span>
      <span>执子之手</span>
      <span>与之偕老</span>
    </div>

    <div class="ver-text animate__animated animate__fadeInRight animate__delay-2s">
      我们的婚礼，诚邀您见证
    </div>

    <div class="border-line animate__animated animate__rotateIn animate__slow"></div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from '@vue/reactivity';
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { router } from '/@/router';
  import { get } from '/@/utils/request';
  import Icon from '/@/components/Icon/index.vue';

  const route = useRoute();
  const countDown = ref('');
  const cover = ref('');

  const tcbEnv = computed(() => (window as any)._tcbEnv);
  const name = computed(() => route.query.name);
  const groom = computed(() => tcbEnv.value.GROOM);
  const bride = computed(() => tcbEnv.value.BRIDE);
  const date = computed(() => tcbEnv.value.DATE);
  const day = computed(() => {
    const dateTime = new Date(Date.parse(date.value));
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1;
    const monthStr = month < 10 ? '0' + month : month;
    const day = dateTime.getDate();
    const dayStr = day < 10 ? '0' + day : day;
    return `${year}-${monthStr}-${dayStr}`;
  });

  onMounted(async () => {
    setCountDown();
    setInterval(setCountDown, 1000);
    await initCover();
  });

  async function initCover(): Promise<void> {
    const data = await get<{ url: string }>({
      url: 'res/cover',
    });
    if (!data) return;

    cover.value = data?.url;
  }

  function setCountDown(): void {
    const now = new Date().getTime();
    const dateTime = new Date(Date.parse(date.value)).getTime();
    const totalSecond = (dateTime - now) / 1000;

    if (totalSecond < 0) {
      countDown.value = `已 相 守 ${Math.floor(-totalSecond / 60 / 60 / 24)}/+∞ 天`;
      return;
    }

    const day = Math.floor(totalSecond / 60 / 60 / 24);
    const hour = Math.floor((totalSecond / 60 / 60) % 24);
    const minute = Math.floor((totalSecond / 60) % 60);
    const second = Math.floor(totalSecond % 60);

    countDown.value = `${day} 天 ${hour} 时 ${minute} 分 ${second} 秒`;
  }

  function handleMore(): void {
    router.push({
      name: 'Detail',
      query: {
        name: name.value,
      },
    });
  }
</script>

<style lang="less" scoped>
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
