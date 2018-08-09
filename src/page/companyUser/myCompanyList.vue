<template>
	<el-row class="rowDiv">
		<el-row class="title bot">
			<el-col :span="21">我的企业列表</el-col>
			<el-col :span="3">
				<el-button type="text" @click="toOpenName" class="add-btn">
					<span class="text-btn">实名认证</span>
					<i class="hint-1 add-icon"></i>
				</el-button>
			</el-col>
		</el-row>
		<el-row class="rowList">
			<el-row :class="{'rowItem':true,'default':item.isDefault==1}" v-for="item in companyList" :key="item.id">
				<el-col :span="4">
					<img src="../../static/companyLogo.png" class="companyImg">
				</el-col>
				<el-col :span="14">
					<el-row class="colItem" style="color:#333333;font-weight: bold;font-size: 16px;">{{item.corp_name}}</el-row>
					<el-row class="colItem">
						<el-col :span="10">税号：{{item.tax_code}}</el-col>
						<el-col :span="10">认证日期：{{item.auth_time}}</el-col>
					</el-row>
					<el-row class="colItem">
						认证方式：{{item.item_name}}
					</el-row>
				</el-col>
				<el-col :span="6">
					<el-button v-if="item.isDefault==0" class="subBtn" type="default" @click.native="setDefault(item.id)">设为默认</el-button>
					<!--<el-button class="subBtn" type="default" @click.native="deleteRel(item.id)">取消关联</el-button>-->
				</el-col>
			</el-row>
			<el-row v-if="totalNum == 0" class="rowItem" style="line-height: 40px;text-align: center;">
				暂无记录
			</el-row>
		</el-row>
		<el-row :span="24" style="text-align: right;margin-right: 20px;">
			<pageBar :total="totalNum" @pagechange="pagechange"></pageBar>
		</el-row>
	</el-row>

</template>

<script>
	import pageBar from "@/components/pageBar"
	import { getQueryString } from "@/config/mUtils"
	import { getCompanyList, deleteUserRelEtr,setDefaultCorp, asbPageAddress} from "@/api/getData"
	import { realNameCallBack } from '@/config/env';
	import { formatDate } from '@/util/dateFormat';
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				companyList: [],
				totalNum: 0,
			}
		},
		components: {
			pageBar
		},
		computed: {
			...mapState(['userInfo']),
		},
		watch: {
			userInfo: function(newValue) {
				if(newValue.id) {
					this.initData(1);
				}
			}
		},
		mounted() {
			if(this.userInfo.id) {
				this.initData(1)
			}
		},
		methods: {
			async initData(pageNum) {
				let callBackId = getQueryString("id");
				if(callBackId != null){
				}

				try {
					const returnData = await getCompanyList({
						pageNum: pageNum,
						uuk: this.userInfo.uuk
					});
					if(returnData.errorCode == "0") {
						returnData.dataBody.companyList.forEach(item => {
							if(item.auth_time != null) {
								item.auth_time = formatDate(new Date(item.auth_time), "yyyy-MM-dd hh:mm")
							}
						});
						this.companyList = returnData.dataBody.companyList;
						this.totalNum = returnData.dataBody.totalNum;
					} else {
						throw new Error(returnData.errorString);
					}
				} catch(err) {
					console.log('获取数据失败', err);
				}
			},
			pagechange(curPage, pageSize) {
				this.initData(curPage);
			},
			deleteRel(id) {
				this.$confirm('是否取消企业关联？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.deleteUserRelEtr(id);
				}).catch(() => {

				});
			},
			async deleteUserRelEtr(id) {
				try {
					const returnData = await deleteUserRelEtr({
						corpId: id,
						uuk: this.userInfo.uuk
					});
					if(returnData.errorCode == "0") {
						this.$notify({
							title: '成功',
							message: "取消成功",
							type: 'success'
						});
						this.initData(1);
					} else {
						this.$notify({
							title: '失败',
							message: returnData.errorString,
							type: 'error'
						});
					}
				} catch(err) {
					console.log('获取数据失败', err);
				}
			},
			toOpenName() {
				this.$confirm('点击确定将跳转到爱税宝实名认证页面', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'success'
				}).then(() => {
					this.getPageAddress();
				}).catch(() => {
					
				});
			},
			async getPageAddress(){
				const returnData = await asbPageAddress();
				if(returnData.errorCode == "0") {
					window.location.href = returnData.dataBody.asbPageAddress + "?tel=" + this.userInfo.mobile + realNameCallBack;
				}else{
					this.$notify({
						title: '失败',
						message: returnData.errorString,
						type: 'error'
					});
				}
			},
			setDefault(id){
				this.$confirm('是否设置该企业为默认企业？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.setDefault(id);
				}).catch(() => {

				});
			},
			async setDefault(id){
				try {
					const returnData = await setDefaultCorp({
						corpId: id,
						uuk: this.userInfo.uuk
					});
					if(returnData.errorCode == "0") {
						this.$notify({
							title: '成功',
							message: "设置成功",
							type: 'success'
						});
						this.initData(1);
					} else {
						this.$notify({
							title: '失败',
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
	
	.companyImg {
		width: 101px;
		height: 76px;
		margin-left: -20px;
		margin-top: 5px;
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
		margin-top: 40px;
		font-size: 14px;
	}
	
	.colItem {
		line-height: 30px;
		font-size: 14px;
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
	
	.text-btn {
		display: block;
		float: left;
		margin-top: 12px;
	}
	
	.add-btn {
		color: #3a8ae1;
		padding: 0;
		line-height: 38px;
	}
	.default{
		background: url(../../static/default.png)  top right no-repeat;
		background-size: 48px 48px;
	}
</style>