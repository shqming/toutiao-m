<template>
	<div class="article-list">
		<van-pull-refresh 
			v-model="refreshing" 
			@refresh="onRefresh"
			:success-text="refreshSuccessText"
			success-duration=1000
		>
			<van-list
				v-model="loading"
				:finished="finished"
				finished-text="没有更多了"
				@load="onLoad"
			>
				<van-cell v-for="article in articles" :key="article.art_id" :title="article.title" />
			</van-list>
		</van-pull-refresh>
	</div>
</template>

<script>
import { getArticles } from '@/api/article.js'
	
export default {
  name: 'ArticleList',
  components: {},
  props: {
		channel: {
			type: Object,
			required: true,
		}
	},
  data () {
    return {
			articles: [],
			loading: false,
			finished: false,
			timestamp: null,
			refreshing: false,
			refreshSuccessText: '',
		}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
		async onLoad() {
			
			//1.请求获取数据
			const { data } = await getArticles({
				channel_id: this.channel.id,
				timestamp: this.timestamp || Date.now(),
				with_top: 1,
			});
			
			console.log(data);
			// 2. 把数据push到 list 数组中
			const { results } = data.data
			this.articles.push(...results);
			//3. 设置加载状态结束
			this.loading = false;
			
			// 数据全部加载完成
			if(results.length){
				this.timestamp = data.data.pre_timestamp;
			}else{
				this.finished = true;
			}

		},
		async onRefresh() {
			//1.请求获取数据
			const { data } = await getArticles({
				channel_id: this.channel.id,
				timestamp: Date.now(),
				with_top: 1,
			});
			// 2. 把数据unshift到 list 数组顶部
			const { results } = data.data
			this.articles.unshift(...results);
			
			//关闭刷新状态
			this.refreshing = false;
			 
			//刷新成功后提示
			this.refreshSuccessText = '更新了'+results.length+'条数据！'
			
		},
	}
}
</script>

<style scoped lang="less">
.article-list {
	position: fixed;
	top: 90px;
	left: 0;
	right: 0;
	bottom: 50px;
	overflow-y: auto;
}
</style>
