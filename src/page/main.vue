<template>
	<el-row>
		<headTop></headTop>
		<el-row class="mainBody">
			<el-col class="subject-lt">
				<h2 class="menuTitle">会员中心</h2>
				<el-menu :default-active="defaultActive" router>
					<el-menu-item class="hint-1 person" index="/myInfo">我的个人资料</el-menu-item>
					<el-menu-item class="msg" index="/myMsgList">我的消息列表</el-menu-item>
					<template v-if="userInfo.user_type==0">
						<el-menu-item class="hint-1 company" index="/myCompanyList">我的企业列表</el-menu-item>
					</template>
					<template v-if="userInfo.user_type==7">
						<el-menu-item class="hint-1 bank" index="/bankList">银行管理</el-menu-item>
						<el-menu-item class="hint-1 bankUser" index="/bankUserList">银行用户管理</el-menu-item>
						<el-menu-item class="hint-1 site" index="/siteList">逻辑站点管理</el-menu-item>
						<el-menu-item class="hint-1 siteUser" index="/siteUserList">逻辑站点用户管理</el-menu-item>
						<el-menu-item class="hint-1 sys" index="/sysAdminList">应用系统管理员管理</el-menu-item>
					</template>
				</el-menu>
			</el-col>
			<el-col class="subject-rt">
				<router-view></router-view>
			</el-col>
		</el-row>
		<footBottom></footBottom>
	</el-row>
</template>

<script>
	import headTop from "@/components/headTop"
	import footBottom from "@/components/footBottom"
	import { mapState } from 'vuex'
	import {getSessionStore } from "@/config/mUtils"
	export default {
		computed: {
			defaultActive: function() {
				return this.$route.path;
			},
			...mapState(['userInfo']),
		},
		components: {
			headTop,
			footBottom
		},

	}
</script>

<style scoped>
	.el-menu {
		border-radius: 2px;
		list-style: none;
		position: relative;
		margin-top: 30px;
		padding-left: inherit;
		background-color: #fff;
	}
	
	.el-menu-item,
	.el-submenu__title {
		display: block;
		height: 45px;
		line-height: 45px;
		color: #737373;
		padding-left: 50px !important;
		padding-right: 55px;
		margin: 5px 0;
		transition: auto;
	}
	
	.subject-lt {
		height: 100%;
		width: 190px;
		border-right: 1px solid #ced2d7;
		background-color: #fff;
		padding-bottom: 9999px;
		margin-bottom: -9999px;
	}
	
	.subject-rt {
		width: 1009px;
		height: auto;
		background: #fff;
		min-height: 750px;
		padding-bottom: 20px;
	}
	
	.menuTitle {
		color: #545f6c;
		font-weight: bold;
		font-size: 16px;
		padding-left: 18px;
		height: 62px;
		line-height: 62px;
		background-color: #fff;
		border-bottom: 1px solid #ced2d7;
		box-sizing: border-box;
	}
	
	.menuTitle ul li {
		list-style: none;
		width: 190px;
	}
	
	.hint-1 {
		background: url(../static/icon.png) no-repeat;
	}
	
	.person {
		background-position: 20px 13px;
		display: inline-block;
	}
	
	.msg {
		background: url(../static/unmsg.png) no-repeat;
		background-position: 20px 13px;
		display: inline-block;
		background-size: 20px 20px;
	}
	
	.company {
		background-position: 20px -24px;
		display: inline-block;
	}
	
	.bank {
		background-position: 20px -100px;
		display: inline-block;
		padding-right: 84px;
	}
	
	.bankUser {
		background-position: 20px -175px;
		display: inline-block;
	}
	
	.site {
		background-position: 20px -57px;
		display: inline-block;
	}
	
	.siteUser {
		background-position: 20px -140px;
		display: inline-block;
		padding-right: 27px;
	}
	
	.sys {
		background-position: 20px -221px;
		display: inline-block;
		padding-right: 13px;
	}
	
	.person:hover,
	.person.is-active {
		color: #fff;
		background-color: #3a8ae1;
		background-position: -40px 13px;
	}
	
	.msg:hover,
	.msg.is-active {
		background: url(../static/msg.png) no-repeat;
		background-position: 20px 13px;
		display: inline-block;
		background-size: 20px 20px;
		color: #fff;
		background-color: #3a8ae1;
	}
	
	.company:hover,
	.company.is-active {
		color: #fff;
		background-color: #3a8ae1;
		background-position: -40px -24px;
	}
	
	.bank:hover,
	.bank.is-active {
		color: #fff;
		background-color: #3a8ae1;
		background-position: -40px -100px;
	}
	
	.bankUser:hover,
	.bankUser.is-active {
		color: #fff;
		background-color: #3a8ae1;
		background-position: -40px -175px;
	}
	
	.site:hover,
	.site.is-active {
		color: #fff;
		background-color: #3a8ae1;
		background-position: -40px -57px;
	}
	
	.siteUser:hover,
	.siteUser.is-active {
		color: #fff;
		background-color: #3a8ae1;
		background-position: -40px -140px;
	}
	
	.sys:hover,
	.sys.is-active {
		color: #fff;
		background-color: #3a8ae1;
		background-position: -40px -221px;
	}
</style>