<template>
  <div class="msg">
    {{ message }}
    <img src="./image/images.jpeg" alt="" />
    <span class="sp">哈哈哈哈哈哈{{sum}}</span>
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
      import('../../common/commonTest').then((res) => {
        console.log('动态加载成功啦',res);
        let cb = res.default;
        cb();
      })
      console.log(123);
    }
  }
};
</script>

<style lang="less" src="./index.less"></style>
