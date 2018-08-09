<template>
	<el-row class="rowDiv">
		<el-row class="title bot">
			<el-col :span="21">消息列表</el-col>
			<el-col :span="3">
				<el-button v-if="totalNum != 0" type="text" @click="deleteAll" style="color:#3a8ae1;">全部删除>></el-button>
			</el-col>
		</el-row>
		<el-row class="rowList">
			<el-row class="rowItem" v-for="item in mgsList" :key="item.id">
				<el-col :span="4">
					<el-badge value="new" class="itemNew" v-if="item.isNew == 1">
						<img src="../../static/msgLogo.png" class="msgImg">
					</el-badge>
					<img src="../../static/msgLogo.png" class="msgImg" v-if="item.isNew == 0">
				</el-col>
				<el-col :span="14" style="padding-right:60px;">
					<el-row style="color:#666666">
						<span>消息来源：{{item.msgSource}} </span>
						<span style="margin-left: 90px;">发出时间：{{item.sendTime}}</span>
					</el-row>
					<el-row style="margin-top: 20px;color:#999999;font-size: 14px;">{{item.context}}</el-row>
				</el-col>
				<el-col :span="6">
					<el-button v-if="item.isNew==1" class="subBtn" type="default" @click.native="setRead(item.id)">设为已读</el-button>
					<el-button class="subBtn" type="default" @click.native="deleteMsg(item.id)">删除</el-button>
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
	import { getAllMsg, deleteSingleMsg, deleteUserMsg,readMsg } from "@/api/getData"
	import { formatDate } from '@/util/dateFormat';
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				mgsList: [],
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
			//由于actions是异步请求，所以监控用户信息对象的变化
			userInfo: function (newValue){
				if (newValue.id) {
					this.initData(1);
				}
			}
		},
		mounted() {
			if(this.userInfo.id){
				this.initData(1)
			}
		},
		methods: {
			async initData(pageNum) {
				try {
					const returnData = await getAllMsg({
						pageNum: pageNum,
						uuk: this.userInfo.uuk
					});
					if(returnData.errorCode == "0") {
						returnData.dataBody.companyMsg.forEach(item => {
							if(item.receiveTime != null) {
								item.receiveTime = formatDate(new Date(item.receiveTime), "yyyy年MM月dd日")
							}
							if(item.sendTime != null) {
								item.sendTime = formatDate(new Date(item.sendTime), "yyyy-MM-dd hh:mm")
							}
						});
						this.mgsList = returnData.dataBody.companyMsg;
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
			deleteAll(){
				this.$confirm('是否删除所有消息？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.deleteAllData();
				}).catch(() => {

				});
			},
			async deleteAllData() {
				try {
					const returnData = await deleteUserMsg({
						uuk: this.userInfo.uuk
					});
					if(returnData.errorCode == "0") {
						this.$notify({
							title: '成功',
							message: "删除成功",
							type: 'success'
						});
						this.initData(1);
					} else {
						this.$notify({
							title: '错误',
							message: returnData.errorString,
							type: 'error'
						});
					}
				} catch(err) {
					console.log('失败', err);
				}
			},
			deleteMsg(id){
				this.$confirm('是否删除该条消息？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.deleteMsgData(id);
				}).catch(() => {

				});
			},
			async deleteMsgData(id) {
				try {
					const returnData = await deleteSingleMsg({
						msgId: id
					});
					if(returnData.errorCode == "0") {
						this.$notify({
							title: '成功',
							message: "删除成功",
							type: 'success'
						});
						this.initData(1);
					} else {
						this.$notify({
							title: '错误',
							message: returnData.errorString,
							type: 'error'
						});
					}
				} catch(err) {
					console.log('失败', err);
				}
			},
			async setRead(id){
				try {
					const returnData = await readMsg({
						msgId: id,
						uuk:this.userInfo.uuk
					});
					if(returnData.errorCode == "0") {
						this.initData(1);
					} else {
						this.$notify({
							title: '错误',
							message: returnData.errorString,
							type: 'error'
						});
					}
				} catch(err) {
					console.log('失败', err);
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
	
	.msgImg {
		width: 100px;
		height: 80px;
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
</style>