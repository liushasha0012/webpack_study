import Vue from 'vue';
import App from './app';
new Vue({
    el: '#app',
    template: '<App/>',
    components: {
        App
    }
    // render: h => h(App)
})