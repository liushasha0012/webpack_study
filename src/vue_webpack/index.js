import Vue from 'vue';
import App from './app';
// import commonFn from '../../common/common';

// commonFn();
new Vue({
    el: '#app',
    template: '<App/>',
    components: {
        App
    }
    // render: h => h(App)
})