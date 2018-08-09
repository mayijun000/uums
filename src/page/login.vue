<template>
	<div>
		<!--盒子布局开始-->
		<header class="header">
			<h1 class="headerLogo">
			<a href="javascript:void(0)"><img src="../static/logo.png" alt="爱信诺征信有限公司"></a>
		</h1>
		</header>
		<!---已上是logo部分------>

		<section class="main" :class="{the600:!isSlip}">
			<div class="theme" :class="{the600:!isSlip}">
				<div class="pop projection" v-show="modleShow">
					<h5 class="close icono-cross" @click="closeModel"></h5>
					<div class="pop-main hint-1 hint-3">
						<h2>恭喜您注册成功！</h2>
						<h3 class="cs-itme">
						<span>
							{{successSpan}}
						</span>
					</h3>
					</div>
					<div class="cs-itme1">
						<div class="cs-itmeBut" @click="setTab(1)">立即登录</div>
					</div>
				</div>
				<div class="theme1 lf slideUp"></div>
				<div class="theme2 lf" v-show="!rePhoneShow">
					<div class="login-tab animation15">
						<ul>
							<li @click="setTab(1)" :class="{slip:!isSlip}">会员登录</li>
							<li @click="setTab(2)" :class="{slip:isSlip}">注册</li>
						</ul>
					</div>
					<div class="tabmax" v-show="isShowTab">
						<div class="login-tips">
							<div class="hint hint-1 hint-2 stretchRight" v-show="errorMsgShow">
								<p>{{errorMsg1}}</p>
							</div>
						</div>

						<div class="cs-input">
							<input v-model="phone1" type="text" class="cs-input1" placeholder="请输入手机号" @blur="checkPhone('1')">
						</div>
						<div class="cs-input">
							<div class="hideShowPassword-wrapper" style="position: relative; display: inline-block; vertical-align: baseline; margin: 0px;">
								<input v-model="password1" :type="passwordType" class="cs-input1 hideShowPassword-field" placeholder="请输入密码" @blur="passWord1" style="margin: 0px; padding-right: 0px;">
								<button type="button" @click="showPassword" title="Show Password" class="hideShowPassword-toggle " :class="{toggleHide:isShowPassword}" style="position: absolute; right: 0px; top: 50%; margin-top: -22px; display: block;">Show</button>
							</div>
						</div>
						<div class="cs-input">
							<span class="verification1 lf"> 
							<input @keyup.enter="ssoLogin" v-model="checkCode" type="text" maxlength="4" class="cs-input2" placeholder="请输入验证码">
						</span>

							<div class="verification rf">
								<img @click="captchaImg" :src="imgHref">
							</div>
						</div>
						<div class="psw">
							<span class="psw-href rf"><a href="javascript:void(0)" @click="solute">登录遇到问题</a></span>
						</div>

						<div class="cs-buuton">
							<a href="javascript:void(0)" @click="ssoLogin" id="ssoLogin">登&nbsp;&nbsp;录</a>
						</div>

					</div>

					<!-------------已上是会员登录部分--------------->

					<div class="tabmax" v-show="!isShowTab">
						<div class="login-tips">
							<div class="hint hint-1 hint-2" v-show="errorMsgShow">
								<p>{{errorMsg2}}</p>
							</div>
						</div>
						<div class="cs-input">
							<input v-model="phone2" type="text" class="cs-input1" placeholder="请输入手机号" @blur="checkPhone('2')">
						</div>
						<div class="cs-input">
							<input v-model="realName" type="text" class="cs-input1" placeholder="请输入真实姓名" @blur="checkRealName('2')">
						</div>
						<div class="cs-input">
							<input v-model="password2" type="password" class="cs-input1" placeholder="请设置登录密码" @blur="passWord('2')">
						</div>
						<div class="cs-input">
							<input v-model="rePassword" type="password" class="cs-input1" placeholder="请再次输入密码" @blur="rePassWord('2')">
						</div>
						<div class="cs-input">
							<span class="verification1 lf"> <input v-model="verCode" type="text" class="cs-input2" placeholder="请输入手机验证码"></span>
							<div class="slip-butt rf">
								<input class="slip-yzm" type="button" :disabled="registerSendDisabled" v-model="registerSend" @click="sendVerPhoneCode('register')" id="send_2">
							</div>
						</div>
						<div class="cs-input">
							<span class="verification1 lf"> 
							<input v-model="checkCode2" type="text" maxlength="4" class="cs-input2" placeholder="请输入验证码" id="code_2">
						</span>
							<div class="verification rf">
								<img @click="captchaImg" :src="imgHref">
							</div>
						</div>
						<div class="psw">
							<span class="bear-roido lf"> 
								<input type="checkbox" v-model="checkboxGroup" style="margin: 0px;" @blur="checkboxGp('2')">
							</span> 
							<span class="bear lf">同意并遵守<a href="javascript:void(0)" @click="toAgreement()" target="_Blank">《爱信诺征信用户协议和隐私政策》</a></span>
						</div>
						<div class="cs-buuton">
							<a href="javascript:void(0)" @click="registered()">注&nbsp;&nbsp;册</a>
						</div>

					</div>

					<!-------------已上是会员注册部分--------------->

				</div>
				<div class="theme3 lf" v-show="rePhoneShow">
					<div class="login-tab">
						<ul>
							<li>手机号重置密码</li>
						</ul>
					</div>
					<div class="tabmax" id="tabmax_one_3">
						<div class="login-tips">
							<div class="hint hint-1 hint-2" v-show="errorMsgShow">
								<p>{{errorMsg3}}</p>
							</div>
						</div>	
						<div class="cs-input">
							<input v-model="phone3" type="text" class="cs-input1" placeholder="请输入手机号" @blur="checkPhone('3')">
						</div>
						<div class="cs-input">
							<span class="verification1 lf"> 
								<input v-model="verCode2" type="text" class="cs-input2" placeholder="请输入手机验证码">
							</span>
							<div class="slip-butt rf">
								<input class="slip-yzm" type="button" :disabled="forgetSendDisabled" v-model="forgetSend" @click="sendVerPhoneCode('reSetPassWord')"/>
							</div>
						</div>
						<div class="cs-input">
							<input v-model="password3" type="password" class="cs-input1" placeholder="请输入密码" id="password_3" @blur="passWord('3')">
						</div>
						<div class="cs-input">
							<input v-model="rePassword2" type="password" class="cs-input1" placeholder="请输入确认密码"  @blur="rePassWord('3')">
						</div>
						<div class="cs-input">
							<span class="verification1 lf"> 
							<input v-model="checkCode3" type="text" maxlength="4" class="cs-input2" placeholder="请输入验证码">
							</span>
	
							<div class="verification rf">
								<img @click="captchaImg" :src="imgHref">
							</div>
						</div>
	
						<div class="cs-buutonfh">
							<a href="javascript:void(0)" @click="reSetPassWord">重置密码</a>
						</div>
						<div class="psw">
							<span class="bear lf"></span> <span class="psw-href rf return"><a
								href="javascript:void(0)" @click="backLogin">返回登录界面</a></span>
						</div>
					</div>

				<!-------------已上是手机号重置密码部分--------------->
				</div>
			</div>
		</section>

		<!-------------版权footer开始--------------->

		<footer class="cs-foort">
			<h6 class="cs-copyright lf">
			电话：010-88897126 地址：北京市海淀区紫竹院路116号嘉豪国际中心B座2层<br>
			Copyright©2015-2016 京ICP备16028281号-1© iXinnuo版权所有 爱信诺征信有限公司

		</h6>
			<span class="copy rf">
			<h4 class="copy1 lf">
				<img src="../static/tub.png">
			</h4>
			<h4 class="copy2 rf floating">
				<span class="copy3">400-810-6116</span> <span class="copy4">咨询热线</span>
			</h4>
			</span>
		</footer>
		<!-------------已上版权部分结束--------------->
	</div>
</template>

<script>
	import "@/style/login.less"
	import { setStore,removeStore } from "@/config/mUtils"
	import { hex_sha1 } from "@/api/sha1"
	import { login,register,resetPassword,regCheckMobile,forgetCheckMobile,sendMobileCodeForRegister,sendMobileCode, getKaptchaImage} from "@/api/getData"
	export default {
		data() {
			return {
				registerSendDisabled:false,
				forgetSendDisabled:false,
				forgetSend:"发送",
				registerSend:"发送",
				successSpan:"",
				imgHref:"",
				codeKey:"",
				isSlip:true,
				isShowTab:true,
				errorMsgShow:false,//错误隐藏
				modleShow:false,
				rePhoneShow:false,
				errorMsg1:"",
				errorMsg2:"",
				errorMsg3:"",
				
				phone1:"",
				password1:"",
				checkCode:"",
				phone2:"",
				password2:"",
				rePassword:"",
				realName:"",
				verCode:"",
				checkCode2:"",
				checkboxGroup:false,
				phone3:"",
				verCode2:"",
				password3:"",
				rePassword2:"",
				checkCode3:"",
				
				errorMessage1:'请输入手机号码',
				errorMessage2:'请输入正确的手机号码',
				errorMessage3:'同意并遵守《爱信诺征信用户协议和隐私政...',
				errorMessage4:'请输入由四位数字组成的手机验证码',
				errorMessage5:'请输入图形验证码',
				errorMessage6:'请输入密码',
				errorMessage7:'请输入6~12位由数字和字母组合的密码',
				errorMessage8:'请输入确认密码',
				errorMessage9:'请输入6~12位由数字和字母组合的确认密码',
				errorMessage10:'您两次设置的密码不一致，请重新输入',
				errorMessage11:'请输入真实姓名',
				errorMessage12:'真实姓名不正确，请重新输入',
				
				smsInterval:null,
				passwordType : "password",
				isShowPassword:false,
			}
		},
		created() {
			removeStore("userInfo");
			removeStore("token");
			this.captchaImg();//图形验证码
		},
		methods: {
			toAgreement:function(){
				//跳转到主页面
				this.$router.push({
					path: '/agreement'
				})
			},
			showPassword:function(){
				if(this.passwordType == "password"){
					this.passwordType = "text";
					this.isShowPassword = true;
				}else{
					this.passwordType = "password";
					this.isShowPassword = false;
				}
			},
			//下面为tab选项卡JS
			setTab(n) {
			 	if(n == 1){
			 		this.isSlip = true;
			 		this.isShowTab = true;
			 	}else{
			 		this.isSlip = false;
			 		this.isShowTab = false;
			 	}
				this.reset();
				this.captchaImg();//图形验证码
			},
			closeModel(){
				this.modleShow = false;
			},
			captchaImg(){
				this.codeKey = Math.random();
				this.imgHref = getKaptchaImage + "?codeKey=" + this.codeKey;
			},
			reset(){
				//点击页签隐藏提示信息
				this.errorMsgShow = false;
				this.errorMsg1 = "";
				this.errorMsg2 = "";
				this.errorMsg3 = "";
				//输入框信息全部置空
				this.phone1 = "";
				this.password = "";
				this.checkCode = "";
				this.phone2 = "";
				this.password2 = "";
				this.rePassword = "";
				this.realName = "";
				this.verCode = "";
				this.checkCode2 = "";
				this.checkboxGroup = false;
				this.phone3 = "";
				this.verCode2 = "";
				this.password3 = "";
				this.rePassword2 = "";
				this.checkCode3 = "";
				this.modleShow = false;
			},
			//登录遇到问题
			solute() {
				this.rePhoneShow = true;
				this.reset();
			},
			backLogin(){
				this.rePhoneShow = false;
				this.reset();
			},
			
			//校验手机号方法
			checkPhone(n) {
				this.errorMsgShow = false;
				let phone = "";
				if(n == 1){
					phone = this.phone1;
				}else if(n == 2){
					phone = this.phone2;
				}else{
					phone = this.phone3;
				}
				phone = phone.replace(/(^\s*)|(\s*$)/g, "");
				if (/^[1][3,4,5,7,8][0-9]{9}$/.test(phone)) {
					return this.checkHasRegistered(n,phone);
				} else {
					return this.error(n,phone,this.errorMessage1,this.errorMessage2)
				}
			},
			async checkHasRegistered(n,phone){
				let result = false; 
				let checkUrl = "";
				let res = null;
				if(n==1){
					return true;
				}else if(n==2){
					res = await regCheckMobile({
						"mobile" : phone,
					});//注册
				}else if(n==3){
					res = await forgetCheckMobile({
						"mobile" : phone,
					});//重置密码
				}
				if(this.messageAlert(n,res)){
					result = true;
				}
				return result; 
			},
			//校验登录密码，只校验空值
			passWord1() {
				this.errorMsgShow = false;
				if(this.passWord1 == ''){
					this.errorMsgShow = true;
					this.errorMsg1 = this.errorMessage6;
					return false;
				}else{
					return true;
				}
			},
			//校验密码（注册、重置密码）的方法 
			passWord(n){
				this.errorMsgShow = false;
				let passWord = "";
				let rePassWord = "";
				if(n == 1){
					passWord = this.password1;
				}else if(n == 2){
					passWord = this.password2;
					rePassWord = this.rePassword;
				}else{
					passWord = this.password3;
					rePassWord = this.rePassword2;
				}
				if (!(/(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}/.test(passWord))) {//正则表达式暂定
					return this.error(n,passWord,this.errorMessage6,this.errorMessage7);
				}else if(passWord != rePassWord && rePassWord != ""){
					return this.error(n,rePassWord,this.errorMessage9,this.errorMessage10);
				}else {
					return this.right(n);
				}
			},
			//校验再次输入密码方法
			rePassWord(n){
				this.errorMsgShow = false;
				let rePassWord = "";
				let password = "";
				if(n == 1){
					password = this.password1;
				}else if(n == 2){
					password = this.password2;
					rePassWord = this.rePassword;
				}else{
					password = this.password3;
					rePassWord = this.rePassword2;
				}
				if (!(/(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}/.test(rePassWord))) {//正则表达式暂定
					return this.error(n,rePassWord,this.errorMessage8,this.errorMessage9);
				}else if(rePassWord != password){
					return this.error(n,"",this.errorMessage10,"");
				}else{
					return this.right(n);
				}
			},
			checkboxGp(n){
				if(!this.checkboxGroup){
					return this.error(n,"",this.errorMessage3,"");
				}else{
					return this.right(n);
				}
			},
			error(n,value,msg1,msg2){
				this.errorMsgShow = true;
				if(value == ""){
					if(n == 1){
						this.errorMsg1 = msg1;
					}else if(n == 2){
						this.errorMsg2 = msg1;
					}else{
						this.errorMsg3 = msg1;
					}
				}else{
					if(n == 1){
						this.errorMsg1 = msg2;
					}else if(n == 2){
						this.errorMsg2 = msg2;
					}else{
						this.errorMsg3 = msg2;
					}
				}
				return false;
			},
	
			right(n){
				this.errorMsgShow = false;
				return true;
			},

			//发送手机验证码
			async sendVerPhoneCode(type){
				if(type=='register'){
					if(this.checkPhone(2)){
						const res = await sendMobileCodeForRegister({
							"mobile" : this.phone2.replace(/(^\s*)|(\s*$)/g, ""),
						});
						if(res.errorCode==0){
							this.getCode(type);
						}
					}
				}else if(type=='reSetPassWord'){
					if(this.checkPhone(3)){
						const res = await sendMobileCode({
							"mobile" : this.phone3.replace(/(^\s*)|(\s*$)/g, ""),
						});
						if(res.errorCode==0){
							this.getCode(type);
						}
					}
				}
			},
			//后台返回前台的处理方法
			messageAlert(n,data){
				let message = data.errorString.replace("错误信息是:","");
				let errorCode = data.errorCode;
				if(errorCode==2001){
					return this.reCheck(n,message);
				}else if(errorCode==2002){
					return this.reCheck(n,message);
				}else if(errorCode==2003){
					return this.reCheck(n,message);
				}else if(errorCode==2004){
					return this.reCheck(n,message);
				}else if(errorCode==2005){
					return this.reCheck(n,message);
				}else if(errorCode==2006){
					return this.reCheck(n,message);
				}else if(errorCode==2007){
				    return this.reCheck(n,message);
				}else if(errorCode==3001){
					return this.reCheck(n,message);
				}else if(errorCode==3002){
					return this.reCheck(n,message);
				}else if(errorCode==3003){
					return this.reCheck(n,message);
				}else if(errorCode==3004){
					return this.reCheck(n,message);
				}else if(errorCode==3005){
					return this.reCheck(n,message);
				}else if(errorCode==3006){
					return this.reCheck(n,message);
				}else if(errorCode==4001){
					return this.reCheck(n,message);
				}else if(errorCode==4002){
					return this.reCheck(n,message);
				}else if(errorCode==4003){
					return this.reCheck(n,message);
				}else if(data.errorCode==0){
					return true;
				}
			},
			//提交后台失败后，前台显示提示信息，验证码刷新方法
			reCheck(n,message){
				this.errorMsgShow = true;		
				if(n == 1){
					this.errorMsg1 = message;
				}else if(n == 2){
					this.errorMsg2 = message;
				}else{
					this.errorMsg3 = message;
				}
				//登录失败刷新验证码
				this.captchaImg();
				return false;
			},
			//登录
			async ssoLogin() {			
				if (this.checkPhone(1) && this.passWord1() && this.checkImageCode(1)) {
					const res = await login({
						"mobile" : this.phone1.replace(/(^\s*)|(\s*$)/g, ""),
						"password" : hex_sha1(this.password1),
						"imageCode" : this.checkCode,
						"codeKey" : this.codeKey
					});
					if(this.messageAlert(1,res)){
						setStore("token",res.dataBody.token);//缓存token
						//跳转到主页面
						this.$router.push({
							path: '/main'
						})
					}

				}
			},
			checkImageCode(n){
				let code = "";
				if(n == 1){
					code = this.checkCode;
				}else if(n == 2){
					code = this.checkCode2;
				}else{
					code = this.checkCode3;
				}
				if(code == ""){
					return this.error(n,"",this.errorMessage5,"");
				}else{
					return this.right(n);
				}
			},
			checkRealName(n){
			    let reg = /^[\u4E00-\u9FA5A-Za-z\.·]{2,8}$/;
			    if(!reg.test(this.realName)){
			        this.errorMsgShow = true;	
			        if(this.realName==""){
			        	if(n == 1){
							this.errorMsg1 = this.errorMessage11;
						}else if(n == 2){
							this.errorMsg2 = this.errorMessage11;
						}else{
							this.errorMsg3 = this.errorMessage11;
						}
			        }else{
			            if(n == 1){
							this.errorMsg1 = this.errorMessage12;
						}else if(n == 2){
							this.errorMsg2 = this.errorMessage12;
						}else{
							this.errorMsg3 = this.errorMessage12;
						}
			        }
			        return false;
			    }
			    return true;
			},
			//注册
			async registered() {
				if (this.checkPhone(2) && this.checkRealName(2) && this.passWord(2) && this.rePassWord(2) && this.checkboxGp(2) && this.checkImageCode(2)){
					const res = await register({
						"mobile" : this.phone2.replace(/(^\s*)|(\s*$)/g, ""),
						"password" : hex_sha1(this.password2),
						"realName" : this.realName,
						"imageCode" : this.checkCode2,
						"mobileCode" : this.verCode,
						"codeKey" : this.codeKey
					});
					if(this.messageAlert(2,res)){
						//注册成功
						this.registSucToLogin();
					}
				}
			},
			//重置密码
			async reSetPassWord(){
				if (this.checkPhone(3) && this.passWord(3) && this.rePassWord(3) && this.checkImageCode(3)) {
					const res = await resetPassword({
						"mobile" : this.phone3.replace(/(^\s*)|(\s*$)/g, ""),
						"password" : hex_sha1(this.password3),
						"imageCode" : this.checkCode3,
						"mobileCode" : this.verCode2,
						"codeKey" : this.codeKey
					});
					if(this.messageAlert(3,res)){
						this.$notify({
							title: '提示',
							message: "密码重置成功",
							type: 'success'
						});
						this.setTab('one',1);
					}
				}
			},

			//注册成功后3秒自动跳转到登录页签
			async registSucToLogin(){
				let t=3;//设定跳转的时间 
				let that = this;
			    let set = setInterval(function(){
			    	if(t==0){
			    		that.setTab('one',1);
			        	clearInterval(set);
			        	that.modleShow = false;
			        	return false;
			        }
			    	that.successSpan = ""+t+"秒后自动返回"; // 显示倒计时 
			    	if(t==3){
						that.modleShow = true;
			    	}
			        t--; // 计数器递减 
			    },1000); //启动1秒定时
			},
			//发送短信验证码60秒倒计时
			getCode(type){
			   let t = 60;
			   if(type=='register'){
			        this.registerSendDisabled = true;
			        this.registerSend = "重新发送(" + t + "s)"; 
			   }else if(type=='reSetPassWord'){
			   		this.forgetSendDisabled = true;
			        this.forgetSend = "重新发送(" + t + "s)"; 
			   }
			   let that = this;
			   this.smsInterval = setInterval(function(){
			        if(type=='register'){
				        that.registerSend = "重新发送(" + --t + "s)"; 
				    }else if(type=='reSetPassWord'){
				        that.forgetSend = "重新发送(" + --t + "s)"; 
				    }
			        if(t==0){
			             if(type=='register'){
					        that.registerSendDisabled = false;
					        that.registerSend = "发送"; 
					    }else if(type=='reSetPassWord'){
					   		that.forgetSendDisabled = false;
					        that.forgetSend = "发送"; 
					    }  
			            clearInterval(that.smsInterval);
			        }
			   },1000)
			},

		}
	}
</script>

<style scoped>
	
</style>