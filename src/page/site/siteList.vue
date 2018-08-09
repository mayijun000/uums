<template>
	<el-row class="rowDiv">
		<el-row class="title bot">
			<el-col :span="20">逻辑站点列表</el-col>
			<el-col :span="4">
				<el-button type="text" @click="addSite" class="add-btn">
					<span class="text-btn">新增逻辑站点</span>
					<i class="hint-1 add-icon"></i>
				</el-button>
			</el-col>
		</el-row>
		<el-row class="rowList">
			<el-row class="rowItem" v-for="item in siteList" :key="item.id">
				<el-col :span="4">
					<img src="../../static/zhandian.png" class="companyImg">
				</el-col>
				<el-col :span="14">
					<el-row class="colItem">
						逻辑站点名称：{{item.siteInfo.siteName}}
					</el-row>
					<el-row class="colItem">
						<span style="padding-left: 28px;">管辖区域：</span>
						<span style="padding-right: 10px;" v-for="area in item.siteRegionInfoList">
							<template v-if="!hasStrCity(area.areaCode)"> 
								{{area.areaName}}
							</template>
						</span>
					</el-row>
				</el-col>
				<el-col :span="6">
					<el-button class="subBtn" type="default" @click.native="editSite(item)">修改</el-button>
					<el-button class="delBtn" type="danger" @click.native="deleteSite(item)">删除</el-button>
				</el-col>
			</el-row>
		</el-row>
	</el-row>
</template>

<script>
	import { getSiteList,deleteSingleSite } from "@/api/getData"
	import { setStore} from "@/config/mUtils"
	export default {
		data() {
			return {
				siteList: [],
			}
		},

		created() {
			this.initData();
		},
		methods: {
			hasStrCity(name){
				if(name.toString().substr(2,6) == "0000"){
					return true;
				}else{
					return false;
				}
			},
			//查询站点列表
			async initData() {
				try {
					const returnData = await getSiteList();
					if(returnData.errorCode == "0") {
						this.siteList = returnData.dataBody.siteList;
					} else {
						throw new Error(returnData.errorString);
					}
				} catch(err) {
					console.log('获取数据失败', err);
				}
			},
			//跳转添加站点
			addSite(){
				this.$router.push({
					path: 'addSite',
				})
			},
			//跳转编辑站点
			editSite(item){
				this.$router.push({
					path: 'editSite',
					query:{
						siteId:item.siteInfo.id,
						siteName:item.siteInfo.siteName
					}
				});
			},
			deleteSite(item){
				this.$confirm('是否删除站点？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.deleteSiteData(item);
				}).catch(() => {

				});
			},
			//删除站点
			async deleteSiteData(item){
				try {
					const returnData = await deleteSingleSite({
						siteId : item.siteInfo.id,
						siteName : item.siteInfo.siteName
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