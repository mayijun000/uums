<template>
	<el-row class="rowDiv">
		<el-row class="title bot">
			<el-col :span="19">新增逻辑站点用户</el-col>
		</el-row>

		<el-row style="margin:20px;">
			<span class="redSpan">*</span><span>手机号：</span>
			<el-input style="width:220px" v-model="mobile"></el-input>
			<el-button class="subBtn" @click="checkUser">新增</el-button>
		</el-row>
		<el-row style="margin:20px;" v-if="showArea">
			<el-row class="areaRow" style="overflow: hidden;">
				<el-col :span="4" class="areaText">候选站点：</el-col>
				<el-col :span="20" style="padding-bottom: 10px;min-height: 40px;">
					<el-tag v-show="!item.status" class="tag" v-for="item in siteList" :key="item.id" @click.native="ysCity(item)">{{item.siteInfo.siteName}}</el-tag>
				</el-col>
				<el-row style="clear: both;"></el-row>
			</el-row>
			<el-row class="areaRow" style="overflow: hidden;">
				<el-col :span="4" class="areaText">已选站点：</el-col>
				<el-col :span="20" style="padding-bottom: 10px;min-height: 40px;">
					<el-tag class="ystag" @close="handleClose(item)" :closable="true" v-for="item in ysList" :key="item.id" @click.native="">{{item.siteInfo.siteName}}</el-tag>
				</el-col>
			</el-row>
			<el-row style="text-align: center;margin-top: 40px;">
				<el-button class="subBtn" @click="saveSiteUser">确定</el-button>
				<el-button class="subBtn" @click="toSiteUserList">取消</el-button>
			</el-row>
		</el-row>
	</el-row>
</template>

<script>
	import { checkUser, addSiteUser,getSiteList } from "@/api/getData"
	import { getStore, removeStore,isPhoneVailable} from "@/config/mUtils"
	export default {
		data() {
			return {
				mobile: "",
				siteUser:null,
				showArea:false,
				siteList:[],
				ysList:[],
				notify:null,
			}
		},

		created() {
			this.siteUser = JSON.parse(getStore("siteUser"));
			if(this.siteUser == null){
				//新增时，初始化data
				Object.assign(this.$data, this.$options.data());
			}else{
				this.getSiteList();
			}
		},
		methods: {
			async getSiteList() {
				try {
					const returnData = await getSiteList();
					if(returnData.errorCode == "0") {
						this.siteList = returnData.dataBody.siteList;
						if(this.siteUser != null){
							let _this = this;
							_this.ysList = [];
							this.mobile = this.siteUser.sysUser.mobile;
							//处理已选站点
							_this.siteUser.orgList.forEach(function(obj){
								_this.siteList.forEach(function(item){
									if(obj.site_name == item.siteInfo.siteName){
										_this.ysList.push(item);
										item.status = true;
									}
								});
							});

							this.showArea = true;
						}
					} else {
						this.$notify({
							title: '错误',
							message: returnData.errorString,
							type: 'error'
						});
					}
				} catch(err) {
					console.log('获取数据失败', err);
				}
			},
			async checkUser() {
				try {
					if(this.mobile == ""){
						this.$notify({
							title: '提示',
							message: '请输入手机号',
							type: 'warning'
						});
						return false;
					}
					let isPhone = isPhoneVailable(this.mobile);
					if(!isPhone){
						this.notify = this.$notify({
							title: '提示',
							message: '请输入正确手机号',
							type: 'warning'
						});
						return false;
					}
					const returnData = await checkUser({
						mobile: this.mobile
					});
					if(returnData.errorString == "新用户") {
						this.getSiteList();
						this.showArea = true;
					} else if(returnData.errorString == "可以修改") {
						this.$confirm('该用户可修改,是否修改?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							let uuk = returnData.dataBody.uuk;
							this.$router.push({
								path: 'editSiteUser',
								query:{
									uuk:uuk
								}
							});
						}).catch(() => {

						});
					} else if(returnData.errorString == "不能添加") {
						this.$confirm('该站点用户已经是其他类型，不能添加', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.toSiteUserList();
						}).catch(() => {

						});
					} else if(returnData.errorString == "该用户异常，请管理员审查") {
						this.$confirm('该用户异常，请管理员审查', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.toSiteUserList();
						}).catch(() => {

						});
					}
				} catch(err) {
					console.log('获取数据失败', err);
				}
			},
			ysCity(item){
				item.status = true;
				this.ysList.push(item);
			},
			handleClose(item){
				this.ysList.splice(this.ysList.indexOf(item), 1);
				this.siteList.forEach(function(obj){
					if(item.siteInfo.id == obj.siteInfo.id) {
						obj.status = false;
					}
				});
			},
			async saveSiteUser(){
				try {
					if(this.ysList.length == 0){
						this.$notify({
							title: '提示',
							message: '请选择站点',
							type: 'warning'
						});
						return false;
					}
					let isPhone = isPhoneVailable(this.mobile);
					if(!isPhone){
						this.notify.close();
						this.$notify({
							title: '提示',
							message: '请输入正确手机号',
							type: 'warning'
						});
						return false;
					}
					let sites = [];
					this.ysList.forEach(function(item){
						sites.push(item.siteInfo.id);
					})
					let param = {
						siteList: sites.join(","),
						mobile: this.mobile
					}
					const returnData = await addSiteUser(param);
					if(returnData.errorCode == "0") {
						this.toSiteUserList();
					} else {
						this.$notify({
							title: '错误',
							message: returnData.errorString,
							type: 'error'
						});
					}
				} catch(err) {
					console.log('获取数据失败', err);
				}
			},
			toSiteUserList(){
				this.$router.push({
					path: 'siteUserList',
				});
			},
		},
	}
</script>

<style scoped>
	.rowDiv {
		background-color: #fff;
		height: 100%;
		color: #545f6c;
	}
	
	.title {
		height: 62px;
		line-height: 62px;
		padding-left: 25px;
	}
	
	.bot {
		border-bottom: 1px solid #ced2d7;
	}
	
	.redSpan {
		color: #fe0000;
		padding-right: 5px;
	}
	.areaText{
		background-color: #f3f3f3;
		color: #666666;
		padding-top: 13px;
		text-align: center;
		padding-bottom: 200px;
		margin-bottom: -187px;
	}
	.tag{
		color:#3a8ae1;
		background-color: #fff;
		font-size: 14px;
		line-height: 40px;
		margin-left: 35px;
		cursor: pointer;
	}
	.ystag{
		background-color: #3a8ae1;
		color: #fff;
		border-color: #3a8ae1;
		font-size: 14px;
		margin-left: 35px;
		cursor: pointer;
		margin-top: 10px;
    	padding: 0 10px;
	}
			
	.areaRow{
		border-bottom: #e7e8ec solid 1px;
	}

	.subBtn {
		background-color: #3a8ae1;
		color: #fff;
		border-color: #3a8ae1;
		width: 90px;
		margin-top: 20px;
	}
</style>