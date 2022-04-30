<template>
  <div class="admin-container flex flex-col items-center justify-center">
    <img class="background-img" src="/background.jpg" alt="" />
    <input
      v-model="name"
      class="name"
      type="text"
      placeholder="填写人名"
      autocomplete="new-password"
    />
    <input
      v-model="password"
      class="password"
      type="password"
      placeholder="管理员密码"
      autocomplete="new-password"
    />
    <button class="btn" @click="handleCreate">生成</button>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { post } from '/@/utils/request';

  const name = ref('');
  const password = ref('');

  const qrUrl = computed(() =>
    encodeURIComponent(
      `${window.location.protocol}//${window.location.host}/#/?name=${name.value}`,
    ),
  );

  const qrApiUrl = computed(() => {
    const tcbEnv = (window as any)._tcbEnv;
    const mhid = tcbEnv.MHID;
    return `https://cli.im/api/qrcode/code?text=${qrUrl.value}&mhid=${mhid}`;
  });

  async function handleCreate() {
    if (!name.value) {
      alert('请填写人名');
      return;
    }
    if (!password.value) {
      alert('请填写密码');
      return;
    }

    const data = await post({
      url: `people`,
      data: {
        name: name.value,
      },
      headers: {
        admin: password.value,
      },
    });
    if (!data) return;

    window.open(qrApiUrl.value, '_blank');
    name.value = '';
  }
</script>

<style lang="less" scoped>
  .admin-container {
    position: relative;
    height: 1920px;
    width: 1080px;

    .background-img {
      position: absolute;
      height: 100%;
      width: 100%;
      z-index: -1;
    }

    .name,
    .password {
      margin-bottom: 40px;
      font-size: 80px;
      border: 0;
      border-bottom: 4px solid black;
      padding: 20px 40px;
      width: 900px;
      max-width: 900px;
      outline: none;
      width: 820px;
      background-color: transparent;
      margin-bottom: 200px;
    }

    .btn {
      font-size: 80px;
      margin: 0;
      width: 900px;
      max-width: 900px;
      background-color: black;
      color: white;
      padding: 10px;
      border: 0;
      outline: none;

      &:hover {
        opacity: 0.8;
        transform: scale(1.1);
      }

      &:active {
        opacity: 0.7;
        border: 0;
      }
    }
  }
</style>
