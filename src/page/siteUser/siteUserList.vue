<template>
	<el-row class="rowDiv">
		<el-row class="title bot">
			<el-col :span="19">逻辑站点用户列表</el-col>
			<el-col :span="5">
				<el-button type="text" @click="addSiteUser" class="add-btn">
					<span class="text-btn">新增逻辑站点用户</span>
					<i class="hint-1 add-icon"></i>
				</el-button>
			</el-col>
		</el-row>
		<el-row class="rowList">
			<el-row class="rowItem" v-for="item in siteUserList" :key="item.id">
				<el-col :span="4">
					<img src="../../static/yonghu.png" class="companyImg">
				</el-col>
				<el-col :span="14">
					<el-row class="colItem">
						用户手机号：{{item.sysUser.mobile}}
					</el-row>
					<el-row class="colItem">
						<span style="margin-left: -14px;">管辖逻辑站点：</span><span style="padding-right: 10px;" v-for="area in item.orgList">{{area.site_name}}</span>
					</el-row>
				</el-col>
				<el-col :span="6">
					<el-button class="subBtn" type="default" @click.native="editSiteUser(item)">修改</el-button>
					<el-button class="delBtn" type="danger" @click.native="deleteSiteUser(item)">删除</el-button>
				</el-col>
			</el-row>
			<el-row :span="24" style="text-align: right;">
				<pageBar :total="totalNum" @pagechange="pagechange"></pageBar>
			</el-row>
		</el-row>
	</el-row>
</template>

<script>
	import { getSiteUserList,deleteSiteUser } from "@/api/getData"
	import pageBar from "@/components/pageBar"
	import { setStore } from "@/config/mUtils"
	export default {
		data() {
			return {
				siteUserList: [],				
				totalNum: 0,
			}
		},		
		components: {
			pageBar
		},
		created() {
			this.initData("1");
		},
		methods: {
			async initData(pageNum) {
				try {
					let _this = this;
					_this.siteUserList = [];
					const returnData = await getSiteUserList({						
						pageNum:pageNum,
					});
					if(returnData.errorCode == "0") {
						returnData.dataBody.siteUserList.forEach(function(item){
							if(item.orgList.length > 0){
								_this.siteUserList.push(item);
							}
						});
						this.totalNum = returnData.dataBody.totalCount;
					} else {
						throw new Error(returnData.errorString);
					}
				} catch(err) {
					console.log('获取数据失败', err);
				}
			},
			addSiteUser(){
				this.$router.push({
					path: 'addSiteUser',
				})
			},
			editSiteUser(item){
				this.$router.push({
					path: 'editSiteUser',
					query:{
						uuk:item.sysUser.uuk
					}
				});
			},
			deleteSiteUser(item){
				this.$confirm('是否删除站点用户？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.deleteSiteUserData(item);
				}).catch(() => {

				});
			},
			async deleteSiteUserData(item){
				try {
					const returnData = await deleteSiteUser({
						uuk : item.sysUser.uuk
					});
					if(returnData.errorCode == "0") {
						this.$notify({
							title: '成功',
							message: "删除成功",
							type: 'success'
						});
						this.initData();
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
			pagechange(curPage, pageSize) {
				this.initData(curPage)
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
	.hint-1 {
	    background: url(../../static/icon.png) center center no-repeat;
	}
	.add-icon {
	    width: 60px;
	    text-align: right;
	    background-position: 10px -288px;
	    display: inline-block;
	    height: 50px;
	    
	}
	.text-btn{
		display: block;float: left;margin-top: 12px;
	}
	.add-btn {
	    color: #3a8ae1;
	    padding:0;
	    line-height: 38px;
	}
	.rowList {
		margin: 20px;
		border-bottom: 1px solid #ced2d7;
	}
	.rowItem {
		padding: 20px;
		border-top: 1px solid #ced2d7;
	}
	
	.subBtn {
		background-color: #3a8ae1;
		color: #fff;
		border-color: #3a8ae1;
		width: 90px;
		margin-top: 20px;
	}
	
	.delBtn {
		width: 90px;
		margin-top: 20px;
		margin-left: 30px;
	}
	
	.colItem {
		line-height: 30px;
		font-size: 14px;
	}
	
	.companyImg {
		width: 101px;
		height: 76px;
		margin-left: -20px;
		margin-top: 5px;
	}
</style>