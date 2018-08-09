<template>
	<el-row class="rowDiv">
		<el-row class="title bot">
			<el-col :span="20">银行用户列表</el-col>
			<el-col :span="4">
				<el-button type="text" @click="addBankUser" class="add-btn">
					<span class="text-btn">新增银行用户</span>
					<i class="hint-1 add-icon"></i>
				</el-button>
			</el-col>
		</el-row>
		<el-row class="rowList">
			
			<el-row class="search">
				<el-col :span="4" class="areaText">用户筛选：</el-col>
				<el-col :span="20" style="padding-left: 20px;padding-top: 5px;">
					<el-button class="subBtn" style="width: 90px;" @click="clearAll">全部清空</el-button>
				</el-col>
			</el-row>
			<el-row class="search">
				<el-col :span="4" class="hs">所属银行：</el-col>
				<el-col :span="3" style="padding-left: 20px;padding-top: 5px;">
					<el-button class="subBtn" @click="clearBankId">清空</el-button>
				</el-col>
				<el-col :span="17">
					<el-radio-group v-model="bankId" style="margin: 10px 0;" @change="changeItem">
					    <el-radio v-for="item in bankList" :label="item.id" :key="item.id" >
					    	<span style="font-size: 14px;">{{item.bankName}}</span>
					    </el-radio>
					</el-radio-group>
				</el-col>
			</el-row>
			<el-row class="search">
				<el-col :span="4" class="areaText">用户状态：</el-col>
				<el-col :span="3" style="padding-left: 20px;padding-top: 8px;">
					<el-button class="subBtn" @click="clearStatus">清空</el-button>
				</el-col>
				<el-col :span="17">
					<el-radio-group v-model="userStatus" style="margin-top: 10px;" @change="changeItem">
					    <el-radio :label="0" style="font-size: 14px;">正常</el-radio>
					    <el-radio :label="1" style="font-size: 14px;">禁用</el-radio>
					</el-radio-group>
				</el-col>
			</el-row>
			<el-row>
				<el-row class="list-bk" v-for="item in bankUserList" :key="item.id">
					<el-col :span="4" class="list-li b1">
						<h3>手机号</h3>
						<p class="mobile">{{item.sysUser.mobile}}</p>
					</el-col>
					<el-col :span="7" class="list-li b2">
						<h3>所属分行</h3>
						<p class="mobile">
							<i v-for="obj in item.orgList">{{obj.bank_name}} </i>
						</p>
					</el-col>
					<el-col :span="4" class="list-li b1">
						<h3>状态</h3>
						<div :class="{'all':item.sysUser.isForbidden==0,'forbid':item.sysUser.isForbidden==1}">{{item.sysUser.isForbidden=="0"?"正常":"禁用"}}</div>
					</el-col>
					<el-col :span="7" class="list-li" style="margin-top: 10px;">
						<el-button class="listBtn" type="default" @click="editUser(item)">修改</el-button>
						<el-button class="listBtn" type="default" @click="forbidUser(item)">{{item.sysUser.isForbidden=="0"?"禁用":"恢复"}}</el-button>
						<el-button type="danger" style="width: 75px;padding:6px 10px;" @click="deleteRel(item)">删除</el-button>
					</el-col>
				</el-row>
			</el-row>
			<el-row :span="24" style="text-align: right;">
				<pageBar :total="totalNum" @pagechange="pagechange"></pageBar>
			</el-row>
		</el-row>
	</el-row>
</template>

<script>
	import { getBankList,getBankUserList ,deleteBankUser,forbidUser,getUserValidList} from "@/api/getData"
	import pageBar from "@/components/pageBar"
	import { setStore } from "@/config/mUtils"
	export default {
		data() {
			return {
				bankList: [],
				bankUserList: [],
				userStatus:"",
				bankId:"",
				totalNum: 0,
			}
		},
		components: {
			pageBar
		},
		created() {
			this.initData();
			this.getBankUserList("1");
		},
		methods: {
			async initData() {
				try {
					const returnData = await getBankList();
					if(returnData.errorCode == "0") {
						this.bankList = returnData.dataBody.bankList;
					} else {
						throw new Error(returnData.errorString);
					}
				} catch(err) {
					console.log('获取数据失败', err);
				}
			},
			async getBankUserList(pageNum) {
				try {
					let _this = this;
					_this.bankUserList = [];
					const returnData = await getUserValidList({
						pageNum:pageNum,
						bankId:this.bankId,
						userState:this.userStatus
					});
					if(returnData.errorCode == "0") {
						returnData.dataBody.bankUserList.forEach(function(item){
							if(item.orgList.length > 0){
								_this.bankUserList.push(item);
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
			pagechange(curPage, pageSize) {
				this.getBankUserList(curPage);
			},
			addBankUser(){
				this.$router.push({
					path: 'addBankUser',
				})
			},
			editUser(item){
				this.$router.push({
					path: 'editBankUser',
					query:{
						uuk:item.sysUser.uuk
					}
				})
			},
			async forbidUser(item){
				try {
					const returnData = await forbidUser({
						mobile:item.sysUser.mobile
					});
					if(returnData.errorCode == "0") {
						this.getBankUserList("1");
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
			deleteRel(item) {
				this.$confirm('是否删除银行用户？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.deleteBankUser(item);
				}).catch(() => {

				});
			},
			async deleteBankUser(item){
				try {
					const returnData = await deleteBankUser({
						uuk:item.sysUser.uuk
					});
					if(returnData.errorCode == "0") {
						this.$notify({
							title: '成功',
							message: "删除成功",
							type: 'success'
						});
						this.getBankUserList("1");
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
			clearStatus(){
				this.userStatus= "";
			},
			changeItem(){
				this.getBankUserList("1");
			},
			clearBankId(){
				this.bankId = "";
			},
			clearAll(){
				this.bankId = "";
				this.userStatus= "";
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
	}
	.search{
	    border-bottom: #e7e8ec solid 1px;
	    font-size: 14px;
	    overflow: hidden;
	}
	.areaText{
		background-color: #f3f3f3;
		color: #666666;
	    padding: 16px 0;
	    text-align: center;

	}
	.subBtn {
		background-color: #3a8ae1;
		color: #fff;
		border-color: #3a8ae1;
		width: 60px;
		font-size: 14px;
	}	
	.listBtn {
		background-color: #3a8ae1;
		color: #fff;
		border-color: #3a8ae1;
		width: 75px;
		padding:6px 10px;
	}
	.hs{
		padding-bottom: 500px;
		margin-bottom: -500px;
		background-color: #f3f3f3;
		color: #666666;
	    padding-top: 12px;
	    text-align: center;
	}
	.el-radio{
		width:320px;margin-left: 0px;padding: 10px 0;
	}
	.list-bk {
	    height: 110px;
	    margin-top: 20px;
	    border: #eef2f5 solid 3px;
	    border-bottom: #eef2f5 solid 10px;
	    padding: 20px 0;
	}
	.list-bk h3 {
	    color: #666666;
	    font-weight: bold;
	    font-size: 18px;
	    line-height: 26px;
	}
	.mobile {
	    color: #999999;
	    font-size: 14px;
	    line-height: 24px;
	}
	.list-li {
	    padding: 0 10px;
	    height: 55px;
	    margin-left: 20px;
	    color: #656565;
	}
	.b1{
		border-left: #95c172 solid 3px;
	}	
	.b2{
		border-left: #397776  solid 3px;
	}
	.all {
	    padding: 2px 10px;
	    color: #fff;
	    border-radius: 3px;
	    background: #3a8ae1;
	    float: left;
	}
	.forbid {
	    padding: 2px 10px;
	    color: #fff;
	    border-radius: 3px;
	    background: #ff4949;
	    float: left;
	}
</style>