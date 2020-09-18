<template>
  <div class="admin-container flex flex-direction align-center justify-center">
    <img class="background-img" src="@/assets/background.jpg" alt="" />
    <input class="name" v-model="name" type="text" placeholder="填写人名" autocomplete="new-password" />
    <input class="password" v-model="password" type="password" placeholder="管理员密码" autocomplete="new-password" />
    <button class="btn" @click="handleCreate">生成</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      password: ''
    }
  },
  computed: {
    qrUrl() {
      return `https://wedding.hubery.wang/#/?name=${this.name}`
        .replace(/\=/g, '%3D')
        .replace(/\+/g, '%2B')
        .replace(/[\s]/g, '%2F')
        .replace(/\?/g, '%3F')
        .replace(/\#/g, '%23')
        .replace(/\&/g, '%26')
    },
    qrApiUrl() {
      return `https://cli.im/api/qrcode/code?text=${this.qrUrl}&mhid=shOUWQDqzJohMHYvKd1dMK0`
    }
  },
  methods: {
    handleCreate() {
      if (!this.name) {
        alert('请填写人名')
        return
      }
      if (!this.password) {
        alert('请填写密码')
        return
      }

      this.post('people', 'add', {
        name: this.name,
        password: this.password
      })
        .then(res => {
          window.open(this.qrApiUrl, '_blank')
          this.name = ''
        })
        .catch(error => {
          const res = error.response
          alert(res.data)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
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

    &:hover {
      opacity: 0.8;
      transform: scale(1.1);
    }

    &:active {
      opacity: 0.7;
    }
  }
}
</style>
