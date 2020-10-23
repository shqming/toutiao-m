<template>
	<div class="login-container">
		<!-- topbar -->
		<van-nav-bar
		class="app-nav-bar"
		title="注册 / 登录"
		left-arrow
		@click-left="$router.back()"
		/>
		
		<!--
			基于Vant的表单验证 和 element UI 类似
			1. 使用van-form组件包裹所有得表单项 vant-field
			2. 给van-form绑定submit 事件
				 当表单验证通过时会出发submit 事件
			3. 使用Field 的rules 属性定义校验规则
		 -->
		 
		<!--属性声明为true validate-first  -->
		<van-form 
		@submit="onLogin" @failed="verufyFailed" :validate-first='true' 
		:show-error='false' :show-error-message='false'
		ref='login-form'
		>		
			<!-- 登录注册表单 -->
			<van-cell-group>
			<van-field
				v-model="user.mobile" name="mobile"
				icon-prefix="toutiao" left-icon="shouji"
				clearable
				placeholder="请输入手机号"
				maxlength="11"
				:rules="formRules.mobile"
			/>
			<van-field
				v-model="user.code" class="send-code"
				icon-prefix="toutiao" left-icon="yanzhengma"
				placeholder="请输入验证码"
				maxlength="6"
				:rules="formRules.code"
			>
				<template #button> 
					<van-button native-type="button"
					class="send-btn" id="sendYanZhen" @click="sendYanZhen()" 
					size="mini" round color="#C3C4C4" 
					>获取验证码</van-button>
				</template>
			</van-field>
			</van-cell-group>
			<div class="login-btn-wrap">
				<van-button class="login-btn"
				type="info" block
				>登录</van-button>
			</div>
		</van-form>
	</div>
</template>

<script>
import { Toast } from 'vant'
import { login, sendSms } from '@/api/user'
	
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
			user: {
				mobile: '13911111111',
				code: '246810',
			},
			formRules: {
				mobile: [
					{ required: true, message: '请填写手机号' },
					{ pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/, message: '手机号格式错误' }
				],			 
				code: [
					{ required: true, message: '请填写验证码' },
					{ pattern: /^\d{6}$/ ,message: '验证码格式错误'}
				],					 
			},
			
		}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
		async onLogin () {
			Toast.loading({
				duration: 0,	//展示时长，值为0时Toast不会消失
				message: '登录中...',	//提示文本
				forbidClick: true,	//禁止背景点击
			});
			try{
				const res = await login(this.user);
				Toast.success('登录成功！');
				
				//存储token
				try{
					this.$store.commit('setUser',res.data.data);
				}catch(e){
					Toast.fail('存储错误！');
				}
				
				//登录成功跳转回原来页面，这种方式不太好但先用这种方式,
				this.$router.back();
			} catch (err) {
				console.log('登录失败',err);
				Toast.fail('登录失败，手机号或密码错误！');
			}
		},
	  async sendYanZhen () {
			try{
				await this.$refs['login-form'].validate('mobile');
				this.countDown();  //防止用户多次点击，触发发送行为
				await sendSms(this.user.mobile);
				
			} catch (err) {
				//判断是手机验证失败，还是发送短信失败
				let message = '';
				if( err && err.response && err.response.status === 429){
					message = '发送太频繁了，请稍后再试'
				}else if(err.name === 'mobile'){
					message = err.message;
				}else{
					message = '未知错误'
				}
				Toast({
					message: message,
					position: 'top'  //防止手机键盘太高看不见
				});
			}
		},
		
	  countDown() {
			//校验手机号码 -> 验证通过 -> 向后端请求验证码 -> 倒计时
			
			let btnYanZhen = document.querySelector('#sendYanZhen');
			let time = 60;
			btnYanZhen.disabled = true;
			btnYanZhen.innerText = time + "s";
			const yTime = setInterval(() => {
				if(time == 0){
					clearInterval(yTime);
					btnYanZhen.innerText = '获取验证码';
					btnYanZhen.disabled = false;	  
				}else {
					btnYanZhen.innerText = time-- + "s";
				}
			},1000)
		},
	
		verufyFailed (err) {
			console.log(err);
			if(err.errors[0] != null){
				Toast({
					message: err.errors[0].message,
					position: 'top'  //防止手机键盘太高看不见
				});
				
			}
		},
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