<template>
	<el-row class="rowDiv">
		<el-row class="title bot">
			<el-col :span="21">银行分行管理</el-col>
			<el-col :span="3">
				<el-button type="text" @click="addBranchBank" class="add-btn">
					<span class="text-btn">新增分行</span>
					<i class="hint-1 add-icon"></i>
				</el-button>
			</el-col>
		</el-row>
		<el-row class="bank-all">
			<el-row class="bank-img">
				<img style="max-width: 300px;height: 100px;margin-top: 30px;" :src="bankImg">
			</el-row>
			<el-row class="bank-text">
				{{bank.bankName}}
			</el-row>
		</el-row>
		<el-row class="rowList">
			<el-row class="rowItem" v-for="item in branchList" :key="item.id">
				<el-col :span="4">
					<img :src="bankImg" class="companyImg">
				</el-col>
				<el-col :span="14">
					<el-row class="colItem">
						分支机构名称：{{item.branchBankName}}
					</el-row>
					<el-row class="colItem">
						<span style="padding-left: 28px;">管辖区域：</span>
						<span style="padding-right: 10px;" v-for="area in item.regionInfoList">
							<template v-if="!hasStrCity(area.areaCode)"> 
								{{area.areaName}}
							</template>
						</span>
					</el-row>
				</el-col>
				<el-col :span="6">
					<el-button class="subBtn" type="default" @click.native="editBranchBank(item)">修改</el-button>
					<el-button class="delBtn" type="danger" @click.native="deleteBranchBank(item)">删除</el-button>
				</el-col>
			</el-row>
		</el-row>
		<el-dialog title="添加分行" :visible.sync="dialogFormVisible">
			<el-row>
				<el-col :span="4" style="text-align: center;">
					<img :src="bankImg" style="height:60px;width:60;">
				</el-col>
				<el-form :model="branchForm" ref="branchForm" :inline="true">
					<el-col :span="9" style="margin-left: 10px;">
						<el-form-item>
							<span class="redSpan">*</span><span>分行名称：</span>
							<el-input style="width:220px" v-if="!readonly" v-model="branchForm.branchBankName"></el-input>
							<span v-show="readonly">{{branchForm.branchBankName}}</span>
						</el-form-item>
					</el-col>
					<el-col :span="9">
						<el-form-item>
							<span class="redSpan">*</span><span>分行代码：</span>
							<span v-show="readonly">{{branchForm.branchBankCode}}</span>
							<el-input style="width:220px" v-if="!readonly" v-model="branchForm.branchBankCode"></el-input>
						</el-form-item>
					</el-col>
				</el-form>
			</el-row>
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
					<el-tag class="ystag" @close="handleClose(item)" :closable="true" v-for="item in ysList" :key="item.id" @click.native="">{{item.name}}</el-tag>
					<span class="el-tag redTag" v-if="ysList.length > 0" @click="closeAll">全部取消</span>
				</el-col>
			</el-row>
			<div slot="footer" class="dialog-footer">
				<el-button @click="toBranchList">取 消</el-button>
				<el-button type="primary" @click="saveBranchBank">确 定</el-button>
			</div>
		</el-dialog>
	</el-row>
</template>

<script>
	import { getBranchList, addBranchBank, getBranchBankArea, deleteBranchBank, region, regionlist } from "@/api/getData"
	import { getSessionStore } from "@/config/mUtils"
	//import { region } from "@/api/region"

	export default {
		data() {
			return {
				dialogFormVisible: false,
				readonly:false,//判断编辑时是否可以修改
				branchList: [],
				bankImg: "",
				bank: {},
				branchForm: {
					branchBankCode: "",
					branchBankName: "",
					branchBankId: "",
				},
				hbList: [{
						code: "110000",
						name: "北京"
					},
					{
						code: "120000",
						name: "天津"
					},
					{
						code: "130000",
						name: "河北"
					},
					{
						code: "140000",
						name: "山西"
					},
					{
						code: "150000",
						name: "内蒙古"
					},
				],
				dbList: [{
						code: "210000",
						name: "辽宁"
					},
					{
						code: "220000",
						name: "吉林"
					},
					{
						code: "230000",
						name: "黑龙江"
					},
				],
				hdList: [{
						code: "310000",
						name: "上海"
					},
					{
						code: "320000",
						name: "江苏"
					},
					{
						code: "330000",
						name: "浙江"
					},
					{
						code: "340000",
						name: "安徽"
					},
					{
						code: "350000",
						name: "福建"
					},
				],
				zbList: [{
						code: "360000",
						name: "江西"
					},
					{
						code: "370000",
						name: "山东"
					},
					{
						code: "410000",
						name: "河南"
					},
					{
						code: "420000",
						name: "湖北"
					},
					{
						code: "430000",
						name: "湖南"
					},
				],
				hnList: [{
						code: "440000",
						name: "广东"
					},
					{
						code: "450000",
						name: "广西"
					},
					{
						code: "460000",
						name: "海南"
					},
				],
				xnList: [{
						code: "500000",
						name: "重庆"
					},
					{
						code: "510000",
						name: "四川"
					},
					{
						code: "520000",
						name: "贵州"
					},
					{
						code: "530000",
						name: "云南"
					},
					{
						code: "540000",
						name: "西藏"
					},
				],
				xbList: [{
						code: "610000",
						name: "陕西"
					},
					{
						code: "620000",
						name: "甘肃"
					},
					{
						code: "630000",
						name: "青海"
					},
					{
						code: "640000",
						name: "宁夏"
					},
					{
						code: "650000",
						name: "新疆"
					},
				],
				hsList: [],
				ysList: [],
				hs: "areaText",
				ys: "areaText",
				cityList:{},
				hasAll:false,
			}
		},

		created() {
			//this.getRegion();
			this.bank = JSON.parse(getSessionStore("bank"));
			this.bankImg = "http://" + this.bank.bankLogo;
			this.initData(this.bank.id);
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
			hasStrCity(name){
				if(name.toString().substr(2,6) == "0000"){
					return true;
				}else{
					return false;
				}
			},
			async initData(bankId) {
				try {
					const returnData = await getBranchList({
						bankId: bankId
					});
					if(returnData.errorCode == "0") {
						this.branchList = returnData.dataBody.branchBankList;
					} else {
						throw new Error(returnData.errorString);
					}
				} catch(err) {
					console.log('获取数据失败', err);
				}
			},
			async saveBranchBank() {
				try {
					if(this.branchForm.branchBankName == "" || this.branchForm.branchBankName == null) {
						this.$notify({
							title: '提示',
							message: '分行名称不能为空',
							type: 'warning'
						});
						return false;
					} else if(this.branchForm.branchBankCode == "" || this.branchForm.branchBankCode == null) {
						this.$notify({
							title: '提示',
							message: '分行代码不能为空',
							type: 'warning'
						});
						return false;
					} else if(this.ysList.length == 0) {
						this.$notify({
							title: '提示',
							message: '请选择城市',
							type: 'warning'
						});
						return false;
					}
					let regionList = [];
					let region = null;
					this.ysList.forEach(function(item) {
						region = {};
						region.regionCode = item.code;
						region.regionName = item.name;
						regionList.push(region);
					});
					let param = {
						bankId: this.bank.id,
						branchBrankName: this.branchForm.branchBankName,
						branchBankCode: this.branchForm.branchBankCode,
						regionList: JSON.stringify(regionList)
					}
					if(this.branchForm.branchBankId != "") {
						param.branchBankId = this.branchForm.branchBankId;
					}
					const returnData = await addBranchBank(param);
					if(returnData.errorCode == "0") {
						this.dialogFormVisible = false;
						this.initData(this.bank.id);
						this.cityList = JSON.parse(JSON.stringify(region));//初始化数据
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
			deleteBranchBank(item){
				let _this = this;
				this.$confirm('是否删除银行分行?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					_this.deleteBranchBankData(item);
				}).catch(() => {

				});
			},
			async deleteBranchBankData(item) {
				try {
					const returnData = await deleteBranchBank({
						bankId: this.bank.id,
						branchBankName: item.branchBankName,
						branchBankId: item.branchBankId
					});
					if(returnData.errorCode == "0") {
						this.$notify({
							title: '成功',
							message: "删除成功",
							type: 'success'
						});
						this.initData(this.bank.id);
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
			async getBranchBankArea(branchBankId) {
				try {
					let _this = this;
					_this.ysList = [];
					_this.hsList = [];
					const returnData = await getBranchBankArea({
						branchBankId: branchBankId
					});
					if(returnData.errorCode == "0") {
						this.branchForm.branchBankCode = returnData.dataBody.branchBankCode;
						if(returnData.dataBody.branchBankList != null) {
							returnData.dataBody.branchBankList.forEach(function(item) {
								let obj = {
									code: item.areaCode.toString(),
									name: item.areaName,
									status:false,
								}
								_this.ysList.push(obj);
							});
							let ys = this.ysList[0];
							this.getRegionlist(ys.code.substr(0, 2) + "0000");			
						}

					} else {
						throw new Error(returnData.errorString);
					}
				} catch(err) {
					console.log('获取数据失败', err);
				}
			},
			addBranchBank() {
				this.ysList = [];
				this.hsList = [];
				this.branchForm.branchBankCode = "";
				this.branchForm.branchBankName = "";
				this.branchForm.branchBankId = "";
				this.dialogFormVisible = true;
				this.readonly = false;
			},
			editBranchBank(item) {
				this.getBranchBankArea(item.branchBankId);
				this.branchForm.branchBankName = item.branchBankName;
				this.branchForm.branchBankId = item.branchBankId;
				this.dialogFormVisible = true;
				this.readonly = true;
			},
			async hsCity(code) {
				const returnData = await regionlist({
					key: code
				});
				if(returnData.errorCode == "0") {
					let _this = this;
					_this.hsList =  JSON.parse(returnData.dataBody.regionList);
					if(this.ysList.length == 0){//判断已选列表为空，表示没有被选择的市，全部显示
						_this.hsList.forEach(function(obj){
							obj.status = false;
						});
						_this.hasAll = true;
					}else{
						let noHas = true;
						//查询省的所有市，如果在候选列表中有，那么隐藏
						this.ysList.forEach(function(item){
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
							_this.hasAll = false;
						}else{
							_this.hasAll = true;
						}
					}
				} else {
					this.$notify({
						title: '错误',
						message: returnData.errorString,
						type: 'error'
					});
				}
			},
			ysCity(item) {
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
			},
			async handleClose(item) {
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
					//判断是否有省
					if(cityObj != undefined){
						_this.ysList.splice(this.ysList.indexOf(cityObj), 1);
						let allList = JSON.parse(returnData.dataBody.regionList);
						allList.forEach(function(obj){
							if(item.code == obj.code) {
								obj.status = false;
							}
						});
					}
					_this.ysList.splice(this.ysList.indexOf(item), 1);
					let noHas = false;
					_this.hsList.forEach(function(obj){
						if(item.code == obj.code) {
							obj.status = false;
							noHas = true;
						}
					});
					if(noHas){
						_this.hasAll = true;
					}else{
						_this.hasAll = false;
					}
				}
			},
			//取消时
			toBranchList(){
				//this.cityList = JSON.parse(JSON.stringify(region));//初始化数据
				this.hasAll = false;
				this.dialogFormVisible = false;
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
				console.log(_this.ysList)
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
	
	.rowList {
		margin: 20px;
		border-bottom: 1px solid #ced2d7;
	}
	
	.bank-all {
		height: 165px;
		margin-top: 20px;
		padding-left: 20px;
	}
	
	.bank-img {
		width: 340px;
		height: 165px;
		float: left;
		text-align: center;
		border: 1px solid #ced2d7;
	}
	
	.bank-text {
		float: left;
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;
		padding:0 10px;
		height: 36px;
		font-size: 20px;
		margin-left: 2px;
		line-height: 36px;
		text-align: center;
		color: #fff;
		background: #3a8ae1;
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
		max-width: 90%;
		height: 60px;
		margin-top: 5px;
	}
	
	.areaText {
		background-color: #f3f3f3;
		color: #666666;
		padding: 13px 0;
		text-align: center;
	}
	
	.areaOver {
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
	.redTag{
		color:#fff;
		background-color: #3a8ae1;
		font-size: 14px;
		cursor: pointer;
		float: right;
		margin-top: 10px;
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
	
	.redSpan {
		color: #fe0000;
		padding-right: 5px;
	}
</style>