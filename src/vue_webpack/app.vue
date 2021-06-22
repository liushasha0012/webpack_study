<template>
  <div class="msg">
    {{ message }}
    <span class="sp">{{sum}}456</span>
    <img src="./image/images.jpeg" alt="" />
    <img src="./image/2.jpeg" alt="">
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
import largeNumber from 'large_number_jscopyer_demo';
let sum = largeNumber('999','1');
export default {
  data() {
    return {
      message: 'hello webpack',
      sum,
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