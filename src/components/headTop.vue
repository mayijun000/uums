<template>
	<el-row>
		<el-row class="head-list">
			<h1 class="head-list-cent">
		      	<div class="list-log lf"><img src="../static/head-log.png"></div>
		          <div class="list-logt rf">
		          	<div class="head-port lf">
		              	<span class="port-img lf"><img src="../static/port.png"></span>
		              	<dl>
		                  	<dd>{{userInfo.mobile}}</dd>
		                    <dt v-if="userInfo.user_type==7">超级管理员 - {{time}}</dt>
		                    <dt v-if="userInfo.user_type==6">应用系统管理员 - {{time}}</dt>
		                    <dt v-if="userInfo.user_type==5">公共机构 - {{time}}</dt>
		                    <dt v-if="userInfo.user_type==4">征信同业 - {{time}}</dt>
		                    <dt v-if="userInfo.user_type==3">营销机构 - {{time}}</dt>
		                    <dt v-if="userInfo.user_type==2">银行 - {{time}}</dt>
		                    <dt v-if="userInfo.user_type==1">逻辑站点 - {{time}}</dt>
		                    <dt v-if="userInfo.user_type==0">企业用户 - {{time}}</dt>
		                  </dl>
		              </div>
		              <div class="head-ico rf">
		              	<ul>
		                  	<li class="hint-1-1 add-ico1 hd"></li>
		                    <li @click="logout" class="hint-1-1 add-ico2 hd"></li>
		                  </ul>
		              </div>
		          </div>
		     </h1>
		</el-row>
		<div class="nav">
			<div class="nav_main">
				<div class="nav_left lf">
					<ul>
						<li  class="nav_bg">
							<a href="javascript:;" @click="toAiXinNuo">我的爱信诺</a>
						</li>
						<li v-if="userInfo.user_type != 7 && userInfo.user_type != 5  && userInfo.user_type != 4 ">
							<a href="javascript:;" @click="toAiShuiRong">我的爱税融</a>
						</li>
						<!--<li>
							<a href="javascript:;" @click="toAiShuiCha">我的爱税查</a>
						</li>-->
					</ul>
				</div>
				<div class="nav_right rf">
					<ul>
						<li>
							<a href="javascript:;" @click="toInfo">账户设置</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</el-row>
</template>

<script>
	import { mapActions, mapState } from 'vuex'
	import { formatHours } from '@/util/dateFormat'
	import { removeStore,getStore } from "@/config/mUtils"
	import { logout } from "@/api/getData"
	export default {
		data() {
			return {
				time:"",
			}
		},
		created() {
			if(getStore("token") == null){
				this.$router.push({
					path: '/'
				})
				return false;
			}
			if(!this.userInfo.id) {
				this.getUserData();
			}
			//记录当前时间，一分钟执行一次
			let _this = this;
			_this.time = formatHours(new Date());
			window.setInterval(function(){
				_this.time = formatHours(new Date());
			},60000)
		},
		computed: {
			...mapState(['userInfo']),
		},
		methods: {
			...mapActions(['getUserData']),
			//登出
			async logout(){
				const res = await logout()
				if (res.errorCode == "0") {
					this.$store.commit('saveUserInfo', {});
					removeStore("userInfo");
					removeStore("token");
					//跳转到主页面
					this.$router.push({
						path: '/'
					})
				}else{
					throw new Error(res)
				}
			},
			toAiXinNuo(){
				this.$router.push({
					path: '/myMsgList',
				})
			},
			toAiShuiRong(){
				if(this.userInfo.user_type==0){//企业用户
					window.location.href = "/html/loan/loan.html";
				}else if(this.userInfo.user_type==6 || this.userInfo.user_type==1 || this.userInfo.user_type==2 || this.userInfo.user_type==3){//银行，站点，营销机构
					window.location.href = "/admin/#/main";
				}
			},
			toAiShuiCha(){

			},
			toInfo(){
				this.$router.push({
					path: '/myInfo',
				})
			}
		}
	}
</script>

<style scoped>
	.head-list {
		width: 100%;
		height: 70px;
		margin: 0 auto;
		background-color: #3a8ae1;
	}
	
	.head-list-cent {
		width: 1200px;
		margin: 0 auto;
	}
	
	.head-list-cent .list-log {
		width: 500px;
		padding-top: 15px;
	}
	
	.list-logt {
		width: 395px;
	}
	
	.head-port {
		width: 250px;
		padding-top: 15px;
	}
	
	.head-port dl {
		float: left;
	}
	
	.head-port dl dd {
		font-weight: bold;
		color: #fff;
		font-size: 12px;
		padding-left: 10px;
		line-height: 25px;
	}
	
	.head-port dl dt {
		color: #a4cced;
		font-size: 12px;
		padding-left: 10px;
	}
	
	.head-ico {
		width: 141px;
		height: 70px;
	}
	
	.lf {
		float: left;
	}
	
	.rf {
		float: right;
	}
	
	.head-ico ul li {
		float: left;
	}
	
	.hd {
		cursor: pointer;
	}
	
	.hint-1-1 {
		background: url(../static/ico.png) no-repeat;
	}
	
	.add-ico1 {
		background-position: 25px -496px;
		display: inline-block;
		width: 70px;
		height: 70px;
	}
	
	.add-ico2 {
		background-position: 25px -447px;
		display: inline-block;
		width: 70px;
		height: 70px;
		cursor: pointer;
	}
	.add-ico2:hover{
		background-color: rgba(0,0,0,0.1);
	}
	.nav {
		margin-bottom: 0;
		list-style: none;
		width: 100%;
		height: 52px;
		border-bottom: #fff solid 1px;
		box-shadow: 0px 6px 8px -7px;
	}
	
	.nav_main {
		margin: 0 auto;
		width: 1200px;
		height: 52px;
	}
	
	.nav_left {
		height: 52px;
	}
	
	.nav_left ul li {
		height: 52px;
		width: 160px;
		border-right: #ced1d6 solid 1px;
		line-height: 52px;
		text-align: center;
		float: left;
	}
	
	.nav_left ul li:hover {
		border-bottom: #095ab3 solid 2px;
	}
	
	.nav_left ul li a {
		color: #535f6d;
		font-size: 16px;
	}
	
	.nav_right {
		width: 160px;
		height: 52px;
		text-align: right;
	}
	
	.nav_right a {
		height: 52px;
		line-height: 52px;
		color: #535f6d;
		font-size: 16px;
	}
	.nav_left .nav_bg {
	    border-bottom: #095ab3 solid 2px;
	}
</style>