/*
*   初始化dayjs相关配置
*/
import dayjs from 'dayjs'
import Vue from 'vue'

//  配置使用中文语言包
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn');

//  配置使用处理相对时间
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);


//例子
console.log(dayjs().to(dayjs('2020-05-13')))
Vue.filter('relativeTime', function(val){
    return dayjs(val).from(dayjs());
})