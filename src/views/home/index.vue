<template>
	<div class="home-container">

		<!-- 搜索栏 -->
		<van-nav-bar class="app-nav-bar">
			<van-button 
				class="search-btn" 
				slot="title" 
				type="info" 
				round 
				icon="search"
				to="/search"
			>搜索</van-button>
		</van-nav-bar>

		<!-- 导航栏-文章频道列表 -->
		<!-- 
			标签页组件有个功能，只有第一次查看标签页时，
			才会渲染里面的内容
		 -->
		<van-tabs swipeable class="channel-tabs" v-model="active">
			<van-tab
				v-for="channel in channels" 
				:key="channel.id" 
				:title="channel.name"
			>
				<article-list :channel="channel" />
			</van-tab>

			<!-- 汉堡按钮定位把列表最后的位置给挡住了，解决办法的就是在这里添加一个占位符 -->
			<div 
				slot="nav-right" 
				class="wap-nav-placeholder"
			></div>

			<div 
				slot="nav-right" 
				@click="isChannelEditShow = true"
				class="wap-nav-wrap"
			>
				<van-icon name="wap-nav" />
			</div>
		</van-tabs>
		<van-popup 
			v-model="isChannelEditShow" 
			position="bottom"
			closeable
			class="channel-edit-popup"
			close-icon-position="top-left"
			get-container="body"
			style="height: 100%"
		>
			<channel-edit
        :user-channels="channels"
        :active="active"
        @close="isChannelEditShow = false"
        @update-active="active = $event"
      />
		</van-popup>
	</div>
</template>

<script>
import {
	getUserChannels
} from '@/api/user.js'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'



	export default {
		name: 'HomeIndex',
		components: {
			ArticleList,
			ChannelEdit,
		},
		props: {},
		data() {
			return {
				active: 0,
				channels: [],
				isChannelEditShow: false,	//控制编辑频道的显示状态
			}
		},
		computed: {},
		watch: {},
		created() {
			this.loadChannels();
		},
		mounted() {},
		methods: {
			async loadChannels() {
				//请求获取频道数据
				const {
					data
				} = await getUserChannels();
				// console.log(data);
				this.channels = data.data.channels;

			}
		}
	}
</script>

<style scoped lang="less">
	.home-container {
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

		.channel-tabs {
			/deep/.van-tab {
				border-right: 1px solid #edeff3;
				border-bottom: 1px solid #edeff3;
				
			}
			/deep/.van-tabs__line {
				width: 15px;
				height: 3px;
				background-color: #3296fa;
				margin-bottom: 4px;
			}
			.wap-nav-placeholder{
				height: 44px;
				flex-basis: 33px;
				flex-shrink: 0;
			}

			.wap-nav-wrap {
				width: 33px;
				height: 44px;
				background-color: #fff;
				opacity: .9;
				position: fixed;
				right: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				&::before {
					content: "";
					width: 1px;
					height: 100%;
					background-image: linear-gradient(to bottom, #fff 0%, rgb(133, 131, 131) 50%, #fff 100%);
					position: absolute;
					left: 0;
				}
				
			}

		}

	}
</style>