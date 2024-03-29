<template>
  <div class="detail-container">
    <img class="background-img" src="/background.jpg" alt="" />

    <div v-if="!loaded" class="center-text flex justify-center items-center">
      <span>正在加载</span>
    </div>
    <div v-else-if="!exist" class="center-text flex justify-center items-center">
      <span>暂未收录</span>
    </div>
    <div v-else class="main-detail flex flex-col items-center">
      <span class="name animate__animated animate__backInDown"> {{ name }}</span>
      <span class="subtitle animate__animated animate__fadeInLeft">诚邀您参加我们的婚礼</span>
      <div class="hori-line flex items-center">
        <div class="line animate__animated animate__fadeInLeft animate__delay-2s"></div>
        <div class="line-heart animate__animated animate__shakeX animate__infinite animate__slower">
          <Icon icon="heart|svg" color="red" size="70" />
        </div>
      </div>
      <span class="title animate__animated animate__fadeInLeft">时间</span>
      <span class="content animate__animated animate__fadeInLeft">{{ date }}</span>
      <span class="title animate__animated animate__fadeInLeft">详细地址</span>
      <span class="content animate__animated animate__fadeInLeft">{{ addr }}</span>
      <span class="title animate__animated animate__fadeInLeft">电话/微信</span>
      <span class="content animate__animated animate__fadeInLeft">{{ phone }}</span>

      <button class="nav-btn animate__animated animate__fadeInUp" @click="handleAlbum">
        我们的照片 >>>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { router } from '/@/router';
  import { get } from '/@/utils/request';
  import Icon from '/@/components/Icon/index.vue';

  const route = useRoute();

  const loaded = ref(false);
  const exist = ref(false);
  const tcbEnv = computed(() => (window as any)._tcbEnv);
  const name = computed(() => route.query.name as string);
  const date = computed(() => tcbEnv.value.DATE);
  const addr = computed(() => tcbEnv.value.ADDR);
  const phone = computed(() => tcbEnv.value.PHONE);

  onMounted(async () => {
    if (!name.value) {
      loaded.value = true;
      exist.value = false;
      return;
    }

    try {
      const data = await get<{ exist: boolean }>({
        url: `people/${encodeURIComponent(name.value)}`,
      });
      if (!data) return;

      exist.value = data.exist;
    } finally {
      loaded.value = true;
    }
  });

  function handleAlbum(): void {
    router.push({
      name: 'Album',
    });
  }
</script>

<style lang="less" scoped>
  .detail-container {
    position: relative;
    height: 1920px;
    width: 1080px;

    .background-img {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      object-fit: cover;
      z-index: -1;
    }

    .main-detail {
      position: relative;
      height: 100%;
      width: 100%;

      .name {
        font-size: 120px;
        margin-top: 60px;
        letter-spacing: 20px;
      }
      .title {
        align-self: flex-start;
        font-size: 70px;
        font-weight: 340;
        margin: 40px 120px 0 20px;
        letter-spacing: 20px;
      }
      .content {
        align-self: flex-start;
        font-size: 46px;
        font-weight: 300;
        margin: 10px 20px 0 20px;
        letter-spacing: 10px;
      }
      .subtitle {
        font-size: 60px;
        margin-top: 60px;
        font-weight: 300;
        letter-spacing: 40px;
      }
      .hori-line {
        align-self: stretch;
        position: relative;
        margin-top: 80px;

        .line {
          width: 100%;
          height: 4px;
          background: red;
        }
        .line-heart {
          position: absolute;
          color: red;
          font-size: 70px;
          right: 100px;
        }
      }
      .nav-btn {
        position: absolute;
        bottom: 160px;
        align-self: center;
        font-size: 60px;
        letter-spacing: 20px;
        background: #f00;
        color: white;
        border: 2px solid red;
        border-radius: 4px;
        padding: 20px 40px;
        outline: unset;
        width: 90%;
      }
    }

    .center-text {
      font-weight: 300;
      font-size: 100px;
      letter-spacing: 100px;
      height: 60%;
      width: 900px;
      margin-left: 140px;
    }
  }
</style>
