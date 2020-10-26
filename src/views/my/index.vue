<template>
  <div class="my-container">
    <van-cell-group 
			v-if="user"
			class="my-info"
		>
			<van-cell class="base-info"
			center 
			:border="false"
			>
				<template #icon>
					<van-image class="avatar"
					  round
					  fit="cover"
					  src="https://img.yzcdn.cn/vant/cat.jpeg"
					/>
				</template>
				
				<div class="name"
				slot="title">{{ currentUser.name }}</div>
				
				<van-button class="update-btn"
				size="small" round
				>
					编辑资料
				</van-button>
			</van-cell>

			<van-grid class="data-info"
				:border="false"
			>
				<van-grid-item class="data-info-item">
					<div class="text-wrap"
					slot="text">
						<span class="count">{{ currentUser.art_count }}</span>
						<div class="text">头条</div>
					</div>
					
				</van-grid-item>
				<van-grid-item class="data-info-item">
					<div class="text-wrap"
					slot="text">
						<span class="count">{{ currentUser.follow_count }}</span>
						<div class="text">关注</div>
					</div>
				</van-grid-item>
				<van-grid-item class="data-info-item">
					<div class="text-wrap"
					slot="text">
						<span class="count">{{ currentUser.fans_count }}</span>
						<div class="text">粉丝</div>
					</div>
				</van-grid-item>
				<van-grid-item 
					class="data-info-item">
					<div class="text-wrap"
					slot="text">
						<span class="count">{{ currentUser.like_count }}</span>
						<div class="text">获赞</div>
					</div>
				</van-grid-item>
			</van-grid>
		</van-cell-group>
		<div v-else class="not-login">
			<div @click="$router.push('/login')">
				<img class="mobile" src="./touxiang.png" alt="手机图片" />
			</div>
			<div class="text">登录 / 注册</div>
		</div>
		
		
		<van-grid
			class="nav-grid mb-4"
			:column-num="2"
		>
		  <van-grid-item 
				class="nav-grid-item"
				icon-prefix="toutiao" icon="shoucang" 
				text="收藏" 
			/>
		  <van-grid-item 
				class="nav-grid-item"
				icon-prefix="toutiao" icon="lishi" 
				text="历史" 
			/>
		</van-grid>
		
		<van-cell 
			v-if="user"
			class="van-cell-link"
			title="消息通知" is-link to="/" 
		/>
		<van-cell 
			class="mb-4 van-cell-link"
			title="小智同学" is-link to="/" 
		/>
		<van-cell 
			v-if="user"
			@click="onLogout()"
			class="logout-cell"
			title="退出登录" 
		/>
  </div>
</template>


<script>
import { mapState } from 'vuex'	
import { getCurrentUser } from '@/api/user.js'

	
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {
			currentUser: {}
		}
  },
  computed: {
		...mapState(['user'])
	},
  watch: {},
  created () {
		this.loadCurrentUser();
	},
  mounted () {},
  methods: {
		async loadCurrentUser () {
			try{
				const { data } = await getCurrentUser();
				this.currentUser = data.data;
			}catch(e){
				//TODO handle the exception
				console.log('用户未登录');
			}
		},
		
		onLogout() {
			this.$dialog.confirm({
			  title: '退出登录',
			  message: '确认退出吗？',
			})
			  .then(() => {  //确认时调用
			    this.$store.commit('setUser',null);
			  })
			  .catch(() => {	//取消时调用
			    // on cancel
			  });
		},
		
	}
}
</script>

<style scoped lang="less">
	
.my-container {
	.my-info {
		background-image: url(banner.png);
		background-size: cover;
		
		.base-info {
			background-color: unset;
			height: 115px;
			padding-top: 38px;
			padding-bottom: 11px;
			box-sizing: border-box;
			
			.avatar {
				height: 66px;
				width: 66px;
				box-sizing: border-box;
				border: 1px solid #fff;
				margin-right: 11px;
			}
			.name {
				color: #fff;
				font-size: 15px;
			}
			.update-btn {
				height: 22px;
				font-size: 10px;
				color: #666666;
			}
		}
		/deep/.van-grid-item__content{
			background-color: unset;	
		}
		.data-info {
			.data-info-item {
				height: 65px;
				color: #fff;
				.text-wrap {
					text-align: center;
					.count {
						font-size: 18px;
					}
					.text {
						font-size: 11.5px;
					}
				}
			}
		}
	}
	
	.not-login {
		background: url(banner.png) no-repeat;
		background-size: cover;
		height: 180px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		.mobile {
			width: 66px;
			height: 66px;
		}
		.text {
			color: #fff;
			font-size: 14px;
		}
	}
	
	
	.nav-grid {
		/deep/ .nav-grid-item {
			height: 70px;
			
			.toutiao {
				font-size: 22px;
			}
			.toutiao-shoucang {
				color: #eb5253;
			}
			.toutiao-lishi {
				color: #ff9d1d;
			}
			.van-grid-item__text {
				font-size: 14px;
				color: #333333;
			}
		}
	}
	.logout-cell {
		text-align: center;
		color: #d86262;
		font-size: 15px;
	}
	
	.van-cell-link {
		font-size: 15px;
		color: #333333;
	}
	.mb-4 {
		margin-bottom: 4px;
	}
}
</style>