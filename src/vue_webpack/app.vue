<template>
  <div class="msg">
    {{ message }}
    <span class="sp">嘿嘿嘿123</span>
    <img src="./image/images.jpeg" alt="" />
    <span class="sp">哈哈哈哈哈哈</span>
    <span class="sp">哈哈哈哈哈哈</span>
    <span class="sp">哈哈哈哈哈哈</span>
    <span class="sp">哈哈哈哈哈哈</span>
    <span class="sp">哈哈哈哈哈哈</span>
    <span class="sp">哈哈哈哈哈哈</span>
    <span class="sp" @click="dynamicImport">点击我吧嘿嘿</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'hello webpack',
    };
  },
  methods: {
    dynamicImport() {
      import('../../common/common').then((res) => {
        console.log('动态加载成功啦',res);
        let cb = res.default;
        cb();
      })
    }
  }
};
</script>

<style lang="less" src="./index.less"></style>
