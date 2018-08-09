<template>
	<el-row class="rowDiv">
		<el-row class="title bot">
			<el-col :span="19">新增应用系统管理员</el-col>
		</el-row>

		<el-row style="margin:20px;">
			<span class="redSpan">*</span><span>手机号：</span>
			<el-input style="width:220px" v-model="mobile" @blur="checkMobile"></el-input>
		</el-row>
		<el-row style="margin:20px;" v-if="showArea">
			<el-row class="areaRow" style="overflow: hidden;">
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
			<el-row class="areaRow" style="overflow: hidden;">
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
	import { checkSysAdmin, getSysList, addSysAdmin, getSysAdminSysList } from "@/api/getData"
	import { getStore, setStore, removeStore,isPhoneVailable} from "@/config/mUtils"
	export default {
		data() {
			return {
				mobile: "",
				showArea:false,
				sysList:[],
				selectedList:[],
				notify:null,
			}
		},

		created() {
			removeStore("sysAdminUUK");
			this.mobile="";
			this.showArea=false;
		},
		
		methods: {
			async getSysList() {
				try {
					const returnData = await getSysList();
					console.log("进入getSysList方法");
					if(returnData.errorCode != "0") {
						this.$notify({
							title: '获取数据错误',
							message: returnData.errorString,
							type: 'error'
						});
						return false;
					}
					//初始化候选应用系统
					this.sysList = returnData.dataBody.sysApplicationList;
				} catch(err) {
					console.log('获取数据失败', err);
					return false;
				}
			},
			
			async checkMobile() {
				try {
					if(this.mobile == ""){
						this.$notify({
							title: '提示',
							message: '请输入手机号',
							type: 'warning'
						});
						return false;
					}
					if(!isPhoneVailable(this.mobile)){
						this.notify = this.$notify({
							title: '提示',
							message: '请输入正确手机号',
							type: 'warning'
						});
						return false;
					}
					const returnData = await checkSysAdmin({
						mobile: this.mobile
					});
					if(returnData.errorString == "新用户") {
						console.log("该手机号在数据库中不存在，说明是个新用户");
						this.getSysList();
						this.showArea = true;
					} else if(returnData.errorString == "可以修改") {
						this.$confirm('该用户可修改,是否修改?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							setStore("sysAdminUUK",returnData.dataBody.uuk);
							console.log("item.sysUser.uuk:"+returnData.dataBody.uuk);
							this.$router.push({
								path: 'editSysAdmin',
							});
						}).catch(() => {

						});
					} else if(returnData.errorString == "不能添加") {
						this.$confirm('该站点用户已经是其他类型，不能添加', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.goBackToList();
						}).catch(() => {

						});
					} else if(returnData.errorString == "该用户异常，请管理员审查") {
						this.$confirm('该用户异常，请管理员审查', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.goBackToList();
						}).catch(() => {

						});
					}
				} catch(err) {
					console.log('获取数据失败', err);
				}
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
						return false;
					}
					if(!isPhoneVailable(this.mobile)){
						this.notify.close();
						this.$notify({
							title: '提示',
							message: '请输入正确手机号',
							type: 'warning'
						});
						return false;
					}
					let appIds = [];
					this.selectedList.forEach(function(item){
						appIds.push(item.id);
					})
					let param = {
						appIds: appIds.join(","),
						mobile: this.mobile
					}
					console.log('参数：');
					console.log('param.appIds：' + param.appIds);
					console.log('param.mobile：' + param.mobile);
					
					const returnData = await addSysAdmin(param);
					if(returnData.errorCode == "0") {
						this.goBackToList();
					} else {
						this.$notify({
							title: '错误1111',
							message: returnData.errorString,
							type: 'error'
						});
					}
				} catch(err) {
					console.log('获取数据失败', err);
				}
			},
			goBackToList(){
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