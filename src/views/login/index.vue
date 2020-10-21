<template>
	<div class="login-container">
		<!-- topbar -->
		<van-nav-bar
		class="app-nav-bar"
		title="注册 / 登录"
		left-arrow
		@click-left="$router.back()"
		/>
		  
		<!-- 登录注册表单 -->
		<van-cell-group>
		<van-field
		  v-model="user.mobile"
		  clearable
		  icon-prefix="toutiao"
		  left-icon="shouji"
		  placeholder="请输入手机号"
		/>
		<van-field
		  v-model="user.code"
		  class="send-code"
		  icon-prefix="toutiao"
		  left-icon="yanzhengma"
		  placeholder="请输入验证码"
		>
			<template #button> 
				<van-button 
				class="send-btn" id="getYanZhen" @click="getYanZhen()" 
				size="mini" round color="#C3C4C4" 
				>获取验证码</van-button>
			</template>
		</van-field>
		</van-cell-group>
		<div class="login-btn-wrap">
			<van-button class="login-btn" @click='onLogin'
			type="info" block
			>登录</van-button>
		</div>
	</div>
</template>

<script>
import { login } from '@/api/user'
	
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
		user: {
			mobile: '',
			code: '',
		}
		
	}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
	  async onLogin () {
		try{
			const res = await login(this.user);
			console.log(res);
		} catch (err) {
			console.log('登录失败',err);
		}
	  },
	  
	  getYanZhen(){
		  let btnYanZhen = document.querySelector('#getYanZhen');
		  btnYanZhen.onclick = function () {
			  let time = 60;
			  btnYanZhen.disabled = true;
			  btnYanZhen.innerText = "剩余" + time + "秒";
			  const yTime = setInterval(() => {
				  if(time == 0){
					  clearInterval(yTime);
					  btnYanZhen.innerText = '获取验证码';
					  btnYanZhen.disabled = false;	  
				  }else {
					  btnYanZhen.innerText = "剩余" + time-- + "秒";
				  }
			  },1000)
		  }
	  }
  }
}
</script>

<style scoped lang="less">

.login-container {
	.send-btn {
		width: 76px;
		height: 23px;
		background-color: #ededed;
		.van-button__text {
			font-size: 11px;
		}
	}
	.login-btn-wrap{
		padding: 24px 16px;
		.login-btn{
			background-color: #6bd4fb;
			border: none;
			.van-button__text {
				font-size: 15px;
			}
		}
	}
}	

	
</style>