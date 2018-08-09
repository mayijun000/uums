<template>
	<el-row class="rowDiv">
		<el-row class="title bot">
			<el-col :span="19">修改应用系统管理员</el-col>
		</el-row>

		<el-row style="margin:20px;">
			<span class="redSpan">*</span><span>手机号：{{sysAdminNow.mobile}}</span>
		</el-row>
		<el-row style="margin:20px;">
			<el-row class="areaRow" >
				<el-col :span="4" class="areaText">候选应用系统：</el-col>
				<el-col :span="20" style="padding-bottom: 10px;min-height: 40px;">
					<el-tag class="tag" 
						v-show="!item.status" 
						v-for="item in sysList" 
						:key="item.id" 
						@click.native="selectMe(item)">{{item.nameChinese}}
					</el-tag>
				</el-col>
				<el-row style="clear: both;"></el-row>
			</el-row>
			<el-row class="areaRow" >
				<el-col :span="4" class="areaText">已选应用系统：</el-col>
				<el-col :span="20" style="padding-bottom: 10px;min-height: 40px;">
					<el-tag class="ystag" 
						@close="unselectMe(item)" 
						:closable="true" 
						v-for="item in selectedList" 
						:key="item.id" 
						@click.native="">{{item.nameChinese}}
					</el-tag>
				</el-col>
			</el-row>
			<el-row style="text-align: center;margin-top: 40px;">
				<el-button class="subBtn" @click="save">确定</el-button>
				<el-button class="subBtn" @click="goBackToList">取消</el-button>
			</el-row>
		</el-row>
	</el-row>
</template>

<script>
	import { getSysList, addSysAdmin, getSysAdminSysList } from "@/api/getData"
	import { getStore, removeStore} from "@/config/mUtils"
	export default {
		data() {
			return {
				sysAdminNow:{},
				sysList:[],
				selectedList:[],
			}
		},

		created() {
			this.onloadJob();
		},
		
		methods: {
			async onloadJob() {
				console.log("进入修改已有用户页面...");
				let _this = this;
				_this.selectedList = [];

				try {
					//获取管理员基本信息（UUK、手机号等，还包括管辖的应用系统列表）
					let sysAdminUUK = getStore("sysAdminUUK");
					console.log('sysAdminUUK::::' + sysAdminUUK);

					let param = {
							uuk: sysAdminUUK
					}
					const returnData = await getSysAdminSysList(param);
					if(returnData.errorCode != "0") {
						this.$notify({
							title: '获取应用系统管理员信息错误',
							message: returnData.errorString,
							type: 'error'
						});
						return false;
					}
					_this.sysAdminNow = returnData.dataBody.userInfoVo.sysUser;
					_this.sysAdminNow.orgList = returnData.dataBody.userInfoVo.orgList;
					
				} catch(err) {
					console.log('获取管理员基本信息', err);
					return false;
				}
				
				//获取所有应用系统列表
				try {
					const returnData = await getSysList();
					console.log("获取所有应用系统列表...");
					if(returnData.errorCode != "0") {
						this.$notify({
							title: '获取所有应用系统列表数据错误',
							message: returnData.errorString,
							type: 'error'
						});
						return false;
					}
					//初始化候选应用系统
					_this.sysList = returnData.dataBody.sysApplicationList;
				} catch(err) {
					console.log('获取所有应用系统列表数据错误', err);
					return false;
				}

				
				//初始化管理员负责的应用系统列表
				_this.sysAdminNow.orgList.forEach(function(obj){
					_this.sysList.forEach(function(item){
						if(obj.id == item.id){
							console.log("nameChinese:::::"+item.nameChinese);
							_this.selectedList.push(item);
							_this.sysList.splice(_this.sysList.indexOf(item), 1);
						}
					});
				});
				
			},
			
			selectMe(item){
				console.log('用户点击选择：'+ item.chineseName);
				this.sysList.splice(this.sysList.indexOf(item), 1);
				this.selectedList.push(item);
			},
			unselectMe(item){
				console.log('用户点击反向选择：'+ item.chineseName);
				this.selectedList.splice(this.selectedList.indexOf(item), 1);
				this.sysList.push(item);
			},
			
			async save(){
				try {
					if(this.selectedList.length == 0){
						this.$notify({
							title: '提示',
							message: '请选择站点',
							type: 'warning'
						});
					}
					let appIds = [];
					this.selectedList.forEach(function(item){
						appIds.push(item.id);
					})
					let param = {
						appIds: appIds.join(","),
						mobile: this.sysAdminNow.mobile,
						uuk   : this.sysAdminNow.uuk
					}

					const returnData = await addSysAdmin(param);
					if(returnData.errorCode == "0") {
						this.goBackToList();
					} else {
						this.$notify({
							title: '保存修改出错',
							message: returnData.errorString,
							type: 'error'
						});
					}
				} catch(err) {
					console.log('保存修改失败', err);
				}
			},
			
			goBackToList(){
				removeStore("sysAdminUUK");
				this.$router.push({
					path: 'sysAdminList',
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