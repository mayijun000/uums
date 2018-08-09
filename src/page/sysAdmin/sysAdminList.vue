<template>
	<el-row class="rowDiv">
		<el-row class="title bot">
			<el-col :span="19">应用系统管理员列表</el-col>
			<el-col :span="5">
				<el-button type="text" @click="addSysAdmin" class="add-btn">
					<span class="text-btn">新增应用系统管理员</span>
					<i class="hint-1 add-icon"></i>
				</el-button>
			</el-col>
		</el-row>
		<el-row class="rowList">
			<el-row class="rowItem" v-for="item in sysAdminList" :key="item.id">
				<el-col :span="4">
					<img src="../../static/guanliyuan.png" class="companyImg">
				</el-col>
				<el-col :span="14">
					<el-row class="colItem">
						用户手机号：{{item.sysUser.mobile}}
					</el-row>
					<el-row class="colItem">
						<span style="margin-left: -14px;">管理的应用系统：</span><span style="padding-right: 10px;" v-for="sys in item.orgList">{{sys.name_chinese}}</span>
					</el-row>
				</el-col>
				<el-col :span="6">
					<el-button class="subBtn" type="default" @click.native="editSysAdmin(item)">修改</el-button>
					<el-button class="delBtn" type="danger" @click.native="deleteSysAdmin(item)">删除</el-button>
				</el-col>
			</el-row>
		</el-row>
	</el-row>
</template>


<script>
	import { getSysAdminList,deleteSysAppUserRel } from "@/api/getData"
	import { setStore,removeStore } from "@/config/mUtils"
	export default {
		data() {
			return {
				sysAdminList: [],
			}
		},

		created() {
			removeStore("sysAdminUUK");
			this.initData();
		},
		methods: {
			async initData() {
				try {
					let _this = this;
					_this.sysAdminList = [];
					const returnData = await getSysAdminList();
					if(returnData.errorCode == "0") {
						returnData.dataBody.appUserList.forEach(function(item){
							if(item.orgList.length > 0){
								_this.sysAdminList.push(item);
							}
						});
					} else {
						throw new Error(returnData.errorString);
					}
				} catch(err) {
					console.log('获取数据失败', err);
				}
			},
			addSysAdmin(){
				removeStore("sysAdminUUK");
				this.$router.push({
					path: 'addSysAdmin',
				})
			},
			editSysAdmin(item){
				console.log("item.sysUser.uuk:"+item.sysUser.uuk);
				setStore("sysAdminUUK",item.sysUser.uuk);
				this.$router.push({
					path: 'editSysAdmin',
				});
			},
			deleteSysAdmin(item){
				this.$confirm('是否删除应用系统管理员？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.deleteSysAdminData(item);
				}).catch(() => {

				});
			},
			async deleteSysAdminData(item){
				try {
					const returnData = await deleteSysAppUserRel({
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
			}
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