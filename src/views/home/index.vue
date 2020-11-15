<template>
  <div class="home-container">
		
		<!-- 搜索栏 -->
		<van-nav-bar
		  class="app-nav-bar"
		>
			<van-button
				class="search-btn"
				slot="title"
				type="info"
				round
				icon="search"
			>搜索</van-button>
		</van-nav-bar>
		
		<!-- 导航栏-文章频道列表 -->
		<!-- 
			标签页组件有个功能，只有第一次查看标签页时，
			才会渲染里面的内容
		 -->
		<van-tabs swipeable>
		  <van-tab 
				v-for="channel in channels" 
				:key="channel.id"
				:title="channel.name"
			>
				<article-list :channel="channel"/>
		  </van-tab>
		</van-tabs>
			
	</div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import ArticleList from '@/components/article-list.vue'

	
	
export default {
  name: 'HomeIndex',
  components: {
		ArticleList,
	},
  props: {},
  data () {
    return {
			active: 0,
			channels: [],
		}
  },
  computed: {},
  watch: {},
  created () {
		this.loadChannels();
	},
  mounted () {},
  methods: {
		async loadChannels () {
			//请求获取频道数据
			const { data } = await getUserChannels();
			// console.log(data);
			this.channels = data.data.channels;
			
		}
	}
}
</script>

<style scoped lang="less">
.home-container{
	/deep/.van-nav-bar__title {
		max-width: none;
	}
	.search-btn {
		width: 277px;
		height: 32px;
		background-color: #5babfb;
		border: none;
		.van-icon {
			font-size: 16px;
		}
		.van-button__text {
			font-size: 14px;
		}
	}
}	
</style>