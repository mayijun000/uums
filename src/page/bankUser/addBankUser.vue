<template>
	<el-row class="rowDiv">
		<el-row class="title bot">
			<el-col :span="20">新增银行用户</el-col>
		</el-row>
		<el-row style="margin:20px;">
			<span class="redSpan">*</span><span style="font-size: 14px;">手机号：</span>
			<el-input style="width:200px;margin-left: 3px;" v-model="mobile"></el-input>
			<el-button class="subBtn" @click="checkBankUser">新增</el-button>
		</el-row>
		<el-row style="margin:20px;" v-show="showBank">
			<span style="font-size: 14px;">所属银行：</span>
			<el-select v-model="bankId" placeholder="请选择" @change="changeBank" :disabled="yesSelect">
				<el-option v-for="item in bankList" :key="item.id" :label="item.bankName" :value="item.id">
				</el-option>
			</el-select>
		</el-row>
		<el-row style="margin:20px;" v-show="showBank">
			<el-row class="areaRow" style="overflow: hidden;">
				<el-col :span="4" class="areaText">候选分行：</el-col>
				<el-col :span="20" style="min-height: 40px;">
					<el-tag class="tag" v-for="item in branchList" :key="item.branchBankId" @click.native="ysCity(item)" v-show="!item.status">{{item.branchBankName}}</el-tag>
				</el-col>
				<el-row style="clear: both;"></el-row>
			</el-row>
			<el-row class="areaRow" style="overflow: hidden;">
				<el-col :span="4" class="areaText">已选分行：</el-col>
				<el-col :span="20" style="padding-bottom: 10px;min-height: 40px;">
					<el-tag class="ystag" @close="handleClose(item)" :closable="true" v-for="item in ysList" :key="item.branchBankId" @click.native="">{{item.branchBankName}}</el-tag>
				</el-col>
			</el-row>
			<el-row style="text-align: center;margin-top: 40px;">
				<el-button class="subBtn" @click="saveBankUser">确定</el-button>
				<el-button class="subBtn" @click="toBankUserList">取消</el-button>
			</el-row>
		</el-row>
	</el-row>
</template>

<script>
	import { getBankList, checkBankUser, getBranchList, addBankUser } from "@/api/getData"
	import { getStore, removeStore, isPhoneVailable } from "@/config/mUtils"
	export default {
		data() {
			return {
				showBank: false,
				bankList: [],
				branchList: [],
				ysList: [],
				mobile: "",
				bankId: "",
				uuk: "",
				bankUser: null,
				yesSelect: false,
				notify:null,
			}
		},

		created() {
			this.initData();
		},
		methods: {
			async initData(bankId) {
				try {
					const returnData = await getBankList();
					if(returnData.errorCode == "0") {
						this.bankList = returnData.dataBody.bankList;
						//银行列表显示，并默认值
						if(this.bankList.length > 0) {
							this.bankId = this.bankList[0].id;
						}
					} else {
						throw new Error(returnData.errorString);
					}
				} catch(err) {
					console.log('获取数据失败', err);
				}
			},
			async getBranchList(bankId) {
				try {
					this.branchList = [];
					const returnData = await getBranchList({
						bankId: bankId
					});
					if(returnData.errorCode == "0") {
						let _this = this;
						//将已选分行隐藏
						if(returnData.dataBody.branchBankList != null){
							_this.branchList = returnData.dataBody.branchBankList;
							_this.branchList.forEach(function(obj) {
								_this.ysList.forEach(function(item) {
									if(item.branchBankId == obj.branchBankId) {
										obj.status = true;
									}
								});
							});
						}
						
					} else {
						throw new Error(returnData.errorString);
					}
				} catch(err) {
					console.log('获取数据失败', err);
				}
			},
			//检查用户类型，判断执行操作
			async checkBankUser() {
				try {
					if(this.mobile == "") {
						this.$notify({
							title: '提示',
							message: '请输入手机号',
							type: 'warning'
						});
						return false;
					}
					let isPhone = isPhoneVailable(this.mobile);
					if(!isPhone) {
						this.notify = this.$notify({
							title: '提示',
							message: '请输入正确手机号',
							type: 'warning'
						});
						return false;
					}
					const returnData = await checkBankUser({
						mobile: this.mobile
					});
					if(returnData.errorString == "新用户") {
						this.getBranchList(this.bankId);
						this.showBank = true;
					} else if(returnData.errorString == "可以修改") {
						let _this = this;
						this.uuk = returnData.dataBody.uuk;
						this.$confirm('该用户可修改,是否修改', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.$router.push({
								path: 'editBankUser',
								query:{
									uuk:_this.uuk
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
							this.toBankUserList();
						}).catch(() => {

						});
					} else if(returnData.errorString == "该用户异常，请管理员审查") {
						this.$confirm('该用户异常，请管理员审查', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.toBankUserList();
						}).catch(() => {

						});
					}
				} catch(err) {
					console.log('获取数据失败', err);
				}
			},
			changeBank(value) {
				this.getBranchList(value);
			},
			ysCity(item) {
				item.status = true;
				this.ysList.push(item);
			},
			handleClose(item) {
				this.ysList.splice(this.ysList.indexOf(item), 1);
				this.branchList.forEach(function(obj){
					if(item.branchBankId == obj.branchBankId) {
						obj.status = false;
					}
				});
			},
			toBankUserList() {
				this.$router.push({
					path: 'bankUserList',
				});
			},
			async saveBankUser() {
				try {
					if(this.ysList.length == 0) {
						this.$notify({
							title: '提示',
							message: '请选择分行',
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
					let userBanks = [];
					this.ysList.forEach(function(item) {
						userBanks.push(item.branchBankId);
					})
					let param = {
						userBankList: userBanks.join(","),
						mobile: this.mobile,
					}
					const returnData = await addBankUser(param);
					if(returnData.errorCode == "0") {
						this.toBankUserList();
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
	
	.areaText {
		background-color: #f3f3f3;
		color: #666666;
		padding-top: 13px;
		text-align: center;
		padding-bottom: 200px;
		margin-bottom: -187px;
	}
	
	.tag {
		color: #3a8ae1;
		background-color: #fff;
		font-size: 14px;
		line-height: 40px;
		margin-left: 35px;
		cursor: pointer;
	}
	
	.ystag {
		background-color: #3a8ae1;
		color: #fff;
		border-color: #3a8ae1;
		font-size: 14px;
		margin-left: 35px;
		cursor: pointer;
		margin-top: 10px;
		padding: 0 10px;
	}
	
	.areaRow {
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