<template>
	<el-row class="rowDiv">
		<el-row class="title bot">
			<el-col :span="20">合作银行列表</el-col>
			<el-col :span="4">
				
				<el-button type="text" @click="toAddBank" class="add-btn">
					<span class="text-btn">新增合作银行</span>
					<i class="hint-1 add-icon" ></i>
				</el-button>
			</el-col>
		</el-row>
		<el-row class="rowList">
			<el-row class="rowItem" v-for="item in bankList" :key="item.id" @click.native="toBranchList(item)">
				<el-row class="rowImg">
					<img :src="item.bankLogo==null?'':'http://'+item.bankLogo" class="imgSize">
				</el-row>
				<el-row class="rowText">
					{{item.bankName}}
				</el-row>
			</el-row>
		</el-row>
	</el-row>
</template>

<script>
	import { getBankList } from "@/api/getData"
	import { setSessionStore } from "@/config/mUtils"
	export default {
		data() {
			return {
				bankList: [],
				totalNum: 0,
			}
		},

		created() {
			this.initData();
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
			toAddBank(){
				this.$router.push({
					path: 'addBank',
				})
			},
			toBranchList(item){
				setSessionStore("bank",JSON.stringify(item));
				this.$router.push({
					path: 'branchList',
				})
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
	.rowItem {
	    width: 205px;
	    height: 140px;
	    float: left;
	    margin-top: 25px;
	    margin-right: 34px;
	    cursor: pointer;
	    border: #efeae0 solid 1px;
	    margin-bottom: 20px;
	}
	.rowImg{
	    width: 205px;
	    height: 80px;
	    border-bottom: #efeae0 solid 1px;
	    text-align: center;
	}
	.imgSize {
	    display: block;
	    max-width: 203px;
	    height: 60px;
	    margin: 10px auto;
	}
	.rowText{
	    padding: 10px 0;
	    text-align: center;
	    color: #b3b9bf;
	}
</style>