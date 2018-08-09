<template>
	<el-row class="rowDiv">
		<el-row class="title bot">
			<el-col :span="20">新增逻辑站点</el-col>
		</el-row>
		<el-row style="margin:20px;">
			<span class="redSpan">*</span><span>站点名称：</span>
			<el-input style="width:220px" v-model="site.siteName"></el-input>
		</el-row>
		<el-row style="margin:20px;">
			<el-row class="areaRow">
				<el-col :span="4" class="areaText">华北地区：</el-col>
				<el-col :span="20">
					<el-tag class="tag" v-for="item in hbList" :key="item.id" @click.native="hsCity(item.code)">{{item.name}}</el-tag>
				</el-col>
			</el-row>
			<el-row class="areaRow">
				<el-col :span="4" class="areaText">东北地区：</el-col>
				<el-col :span="20">
					<el-tag class="tag" v-for="item in dbList" :key="item.id" @click.native="hsCity(item.code)">{{item.name}}</el-tag>
				</el-col>
			</el-row>
			<el-row class="areaRow">
				<el-col :span="4" class="areaText">华东地区：</el-col>
				<el-col :span="20">
					<el-tag class="tag" v-for="item in hdList" :key="item.id" @click.native="hsCity(item.code)">{{item.name}}</el-tag>
				</el-col>
			</el-row>
			<el-row class="areaRow">
				<el-col :span="4" class="areaText">中部地区：</el-col>
				<el-col :span="20">
					<el-tag class="tag" v-for="item in zbList" :key="item.id" @click.native="hsCity(item.code)">{{item.name}}</el-tag>
				</el-col>
			</el-row>
			<el-row class="areaRow">
				<el-col :span="4" class="areaText">华南地区：</el-col>
				<el-col :span="20">
					<el-tag class="tag" v-for="item in hnList" :key="item.id" @click.native="hsCity(item.code)">{{item.name}}</el-tag>
				</el-col>
			</el-row>
			<el-row class="areaRow">
				<el-col :span="4" class="areaText">西南地区：</el-col>
				<el-col :span="20">
					<el-tag class="tag" v-for="item in xnList" :key="item.id" @click.native="hsCity(item.code)">{{item.name}}</el-tag>
				</el-col>
			</el-row>
			<el-row class="areaRow">
				<el-col :span="4" class="areaText">西北地区：</el-col>
				<el-col :span="20">
					<el-tag class="tag" v-for="item in xbList" :key="item.id" @click.native="hsCity(item.code)">{{item.name}}</el-tag>
				</el-col>
			</el-row>
			<el-row class="areaRow" style="overflow: hidden;">
				<el-col :span="4" class="areaOver">候选城市：</el-col>
				<el-col :span="20" style="padding-bottom: 10px;min-height: 40px;">
					<el-tag v-show="!item.status" class="tag" v-for="item in hsList" :key="item.id" @click.native="ysCity(item)">{{item.name}}</el-tag>
					<span class="el-tag redTag" v-if="hasAll" @click="ysCityAll">全部选择</span>
				</el-col>
				<el-row style="clear: both;"></el-row>
			</el-row>
			<el-row class="areaRow" style="overflow: hidden;">
				<el-col :span="4" class="areaOver">已选城市：</el-col>
				<el-col :span="20" style="padding-bottom: 10px;min-height: 40px;">
					<el-tag v-show="item.status" class="ystag" @close="handleClose(item)" :closable="true" v-for="item in ysList" :key="item.id" @click.native="">{{item.name}}</el-tag>
					<span class="el-tag redTag" v-if="ysList.length > 0" @click="closeAll">全部取消</span>
				</el-col>
			</el-row>
		</el-row>
		<el-row style="text-align: center;margin-top: 40px;">
			<el-button class="subBtn" @click="saveSite">保存并确定</el-button>
			<el-button class="subBtn" @click="toSiteList">放弃并退出</el-button>
		</el-row>
	</el-row>
</template>

<script>
	import { getSingleSite,addSite,region,regionlist } from "@/api/getData"
	//import { region } from "@/api/region"//所有城市数据
	import { getStore,removeStore } from "@/config/mUtils"
	export default {
		data() {
			return {
				site:{
					siteId:"",
					siteName:"",
				},
				hbList:[
					{code:"110000",name:"北京"},
					{code:"120000",name:"天津"},
					{code:"130000",name:"河北"},
					{code:"140000",name:"山西"},
					{code:"150000",name:"内蒙古"},
				],
				dbList:[
					{code:"210000",name:"辽宁"},
					{code:"220000",name:"吉林"},
					{code:"230000",name:"黑龙江"},
				],
				hdList:[
					{code:"310000",name:"上海"},
					{code:"320000",name:"江苏"},
					{code:"330000",name:"浙江"},
					{code:"340000",name:"安徽"},
					{code:"350000",name:"福建"},
				],
				zbList:[
					{code:"360000",name:"江西"},
					{code:"370000",name:"山东"},
					{code:"410000",name:"河南"},
					{code:"420000",name:"湖北"},
					{code:"430000",name:"湖南"},
				],
				hnList:[
					{code:"440000",name:"广东"},
					{code:"450000",name:"广西"},
					{code:"460000",name:"海南"},
				],
				xnList:[
					{code:"500000",name:"重庆"},
					{code:"510000",name:"四川"},
					{code:"520000",name:"贵州"},
					{code:"530000",name:"云南"},
					{code:"540000",name:"西藏"},
				],
				xbList:[
					{code:"610000",name:"陕西"},
					{code:"620000",name:"甘肃"},
					{code:"630000",name:"青海"},
					{code:"640000",name:"宁夏"},
					{code:"650000",name:"新疆"},
				],
				hsList:[],//候选列表
				ysList:[],//已选列表
				cityList:{},
				hasAll:false,
			}
		},

		created() {
			//this.getRegion();
		},
		methods: {
			//获取省市
			async getRegion(){
				const returnData = await region();
				if(returnData.errorCode == "0") {
					this.cityList = JSON.parse(returnData.dataBody.allRegion);
				} else {
					this.$notify({
						title: '错误',
						message: returnData.errorString,
						type: 'error'
					});
				}
			},
			//获取市
			async getRegionlist(keyCode){
				const returnData = await regionlist({
					key: keyCode
				});
				if(returnData.errorCode == "0") {
					let temp = JSON.parse(returnData.dataBody.regionList);
					
					this.ysList.forEach(function(item) {
						temp.forEach(function(obj) {
							if(item.code == obj.code) {
								obj.status = true;
							}
							if(item.code.substr(2,6) != "0000"){
								item.status = true;
							}
						});

					});
					this.hsList = temp;
				} else {
					this.$notify({
						title: '错误',
						message: returnData.errorString,
						type: 'error'
					});
				}
			},	
			//保存站点
			async saveSite(){
				try {
					if(this.site.siteName == ""){
						this.$notify({
							title: '提示',
							message: '站点名称不能为空',
							type: 'warning'
						});
						return false;
					}else if(this.ysList.length == 0){
						this.$notify({
							title: '提示',
							message: '请选择城市',
							type: 'warning'
						});
						return false;
					}
					let regionList = [];
					let region = null;
					this.ysList.forEach(function(item){
						region = {};
						region.regionCode = item.code;
						region.regionName = item.name;
						regionList.push(region);
					});
					let param = {
						siteName: this.site.siteName,
						regionStr: JSON.stringify(regionList)
					}
					const returnData = await addSite(param);
					if(returnData.errorCode == "0") {
						this.toSiteList();
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
			//选择地区查询所有城市
			async hsCity(code){
				const returnData = await regionlist({
					key: code
				});
				if(returnData.errorCode == "0") {
					let _this = this;
					this.hsList = JSON.parse(returnData.dataBody.regionList);
					if(_this.ysList.length == 0){//判断已选列表为空，表示没有被选择的市，全部显示
						_this.hsList.forEach(function(obj){
							obj.status = false;
						});
						this.hasAll = true;
					}else{
						let noHas = true;
						//查询省的所有市，如果在候选列表中有，那么隐藏
						_this.ysList.forEach(function(item){
							_this.hsList.forEach(function(obj){
								if(item.code == obj.code){
									obj.status = true;
								}
							});
						});
						//判断候选列表状态是否全不可见，如果是隐藏全选按钮
						this.hsList.forEach(function(obj){
							if(!obj.status){
								noHas = false;
							}
						});
						if(noHas){
							this.hasAll = false;
						}else{
							this.hasAll = true;
						}
					}
				}
			},
			//从候选城市放入已选城市,在候选列表中隐藏选择的城市
			ysCity(item){
				item.status = true;//隐藏
				this.ysList.push(item);
				let noHas = true;
				this.hsList.forEach(function(obj){
					if(!obj.status){
						noHas = false;
					}
				});
				if(noHas){
					let curCode = item.code.substr(0, 2) + "0000";
					let cityObj = this.getCity(curCode);
					this.ysList.push(cityObj);
					this.hasAll = false;
				}
				//console.log(this.ysList)
			},
			//删除已选城市，并回复候选城市的显示
			async handleClose(item){
				let curCode = item.code.substr(0, 2) + "0000";
				const returnData = await regionlist({
					key: curCode
				});
				if(returnData.errorCode == "0") {
					let _this = this;
					let cityObj;					
					_this.ysList.forEach(function(city){
						if(city.code == curCode){
							cityObj = city;
						}
					});
					if(cityObj != undefined){
						this.ysList.splice(this.ysList.indexOf(cityObj), 1);
						//删除选项时，取消的市不在当前省，那么查询该市所在省的所有市，并且更新状态
						let allList = JSON.parse(returnData.dataBody.regionList);
						allList.forEach(function(obj){
							if(item.code == obj.code) {
								obj.status = false;
							}
						});
					}
					this.ysList.splice(this.ysList.indexOf(item), 1);
					let noHas = false;
					this.hsList.forEach(function(obj){
						if(item.code == obj.code) {
							obj.status = false;
							noHas = true;//候选列表如果存在取消的市，那么显示全选按钮
						}
					});
					if(noHas){
						this.hasAll = true;
					}else{
						this.hasAll = false;
					}
				}
			},
			//返回站点列表
			toSiteList(){
				this.$router.push({
					path: 'siteList',
				})
			},
			//全部选择
			ysCityAll(){
				let _this = this;
				this.hsList.forEach(function(obj,index){
					obj.status = true;//隐藏
					let curCode = "";
					let cityObj = "";
					if(index == 0){//查询省，添加到已选列表中
						curCode = obj.code.substr(0, 2) + "0000";
						cityObj = _this.getCity(curCode);
						_this.ysList.push(cityObj);
					}
					let noHas = true;//判断已选列表中是否存在相同的数据
					_this.ysList.forEach(function(item){
						if(obj.code == item.code){
							noHas = false;
						}
					});
					if(noHas){
						_this.ysList.push(obj);
					}
				});
				//console.log(_this.ysList)
			},
			//取消全选
			closeAll(){
				this.ysList = [];
				this.hsList.forEach(function(obj){
					obj.status = false;
				});
				this.hasAll = true;//显示全选按钮
			},
			//获得省对象
			getCity(curCode){
				let _this = this;
				let cityObj = "";
				_this.hbList.forEach(function(city){
					if(city.code == curCode){
						city.status = false;//隐藏省
						cityObj = city;
					}
				});
				_this.dbList.forEach(function(city){
					if(city.code == curCode){
						city.status = false;//隐藏省
						cityObj = city;
					}
				});
				_this.hdList.forEach(function(city){
					if(city.code == curCode){
						city.status = false;//隐藏省
						cityObj = city;
					}
				});
				_this.zbList.forEach(function(city){
					if(city.code == curCode){
						city.status = false;//隐藏省
						cityObj = city;
					}
				});
				_this.hnList.forEach(function(city){
					if(city.code == curCode){
						city.status = false;//隐藏省
						cityObj = city;
					}
				});
				_this.xnList.forEach(function(city){
					if(city.code == curCode){
						city.status = false;//隐藏省
						cityObj = city;
					}
				});
				_this.xbList.forEach(function(city){
					if(city.code == curCode){
						city.status = false;//隐藏省
						cityObj = city;
					}
				});
				return cityObj;
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
	.areaText{
		background-color: #f3f3f3;
		color: #666666;
	    padding: 13px 0;
	    text-align: center;

	}
	.areaOver{
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
	.redTag{
		color:#fff;
		background-color: #3a8ae1;
		font-size: 14px;
		cursor: pointer;
		float: right;
		margin-top: 10px;
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

	.redSpan{
		color: #fe0000;
    	padding-right: 5px;
	}
	.subBtn{
		background-color:#3a8ae1;
		color:#fff;
		border-color: #3a8ae1;
	}
</style>