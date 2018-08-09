<template>
	<el-row class="rowDiv">
		<el-row class="title bot">
			<el-col>个人资料</el-col>
		</el-row>
		<el-row style="height:100%;">
			<el-form ref="user" :model="user" :rules="rules">
				<el-row class="itemUser bot">
					<el-col :span="4" class="left userImg">用户账号:</el-col>
					<el-col :span="14" :offset="1" v-if="user.userName">{{user.userName}}</el-col>
					<el-col :span="14" :offset="1" v-if="!user.userName && isUser">您尚未创建用户账号。用户账号一旦创建，将无法修改</el-col>
					<el-col :span="6" :offset="1" v-if="!user.userName && !isUser">
						<el-form-item prop="newUserName">
							<el-input v-model="user.newUserName" placeholder="字母数字组合最少6位"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4" v-if="!user.userName && isUser">
						<el-button class="subBtn" style="width:120px" type="default" @click="createUser('user')">创建账号</el-button>
					</el-col>
					<el-col :span="4" :offset="1" v-if="!user.userName && !isUser">
						<el-button class="subBtn" type="default" @click="checkAccount('user')">确定</el-button>
						<el-button type="danger" @click="cancel('account')">取消</el-button>
					</el-col>
				</el-row>

				<el-row class="item">
					<el-col :span="4" class="left">真实姓名:</el-col>
					<el-col :span="4" :offset="1" v-if="isRealName">{{user.realName=="null"?"":user.realName}}</el-col>
					<el-col :span="4" :offset="1" v-if="!user.realName && isRealName">您尚未创建真实姓名</el-col>
					<el-col :span="6" :offset="1" v-if="!isRealName">
						<el-form-item prop="newRealName">
							<el-input v-model="user.newRealName" placeholder="请输入真实姓名"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-button class="subBtn" type="default" v-if="isRealName && user.userType != 0" @click="editRealName">编辑</el-button>
					</el-col>
					<el-col :span="4" :offset="1" v-if="!isRealName">
						<el-button class="subBtn" type="default" @click="saveUser('user','realName')">确定</el-button>
						<el-button type="danger" @click="cancel('realName')">取消</el-button>
					</el-col>
				</el-row>
				<el-row class="item">
					<el-col :span="4" class="left">昵称:</el-col>
					<el-col :span="4" :offset="1" v-if="isNickName">{{user.nickName=="null"?"":user.nickName}}</el-col>
					<el-col :span="4" :offset="1" v-if="!user.nickName && isNickName">您尚未创建昵称</el-col>
					<el-col :span="6" :offset="1" v-if="!isNickName">
						<el-form-item prop="newNickName">
							<el-input v-model="user.newNickName" placeholder="请输入昵称"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-button class="subBtn" type="default" v-if="isNickName" @click="editNickName">编辑</el-button>
					</el-col>
					<el-col :span="4" :offset="1" v-if="!isNickName">
						<el-button class="subBtn" type="default" @click="saveUser('user','nickName')">确定</el-button>
						<el-button type="danger" @click="cancel('nickName')">取消</el-button>
					</el-col>
				</el-row>
				<el-row class="item">
					<el-col :span="4" class="left">手机号:</el-col>
					<el-col :span="4" :offset="1">{{user.mobile}}</el-col>
					<el-col :span="4">
						<el-button class="subBtn" type="default">变更</el-button>
					</el-col>
				</el-row>
				<el-row class="item" style="padding-bottom: 40px;">
					<el-col :span="4" class="left">登录密码:</el-col>
					<el-col :span="4" :offset="1" v-if="isPassword">********</el-col>
					<el-col :span="6" :offset="1" v-if="!isPassword">
						<el-form-item prop="oldPassword">
							<el-input type="password" v-model="user.oldPassword" placeholder="请输入原密码"></el-input>
						</el-form-item>
						<el-form-item prop="newPassword">
							<el-input type="password" v-model="user.newPassword" placeholder="请输入新密码"></el-input>
						</el-form-item>
						<el-form-item prop="rePassword" style="margin-top: 20px;">
							<el-input type="password" v-model="user.rePassword" placeholder="确认新密码"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-button class="subBtn" type="default" v-if="isPassword" @click="editPassword">编辑</el-button>
					</el-col>
					<el-col :span="4" :offset="1" v-if="!isPassword">
						<el-button class="subBtn" type="default" @click="saveUser('user','password')">确定</el-button>
						<el-button type="danger" @click="cancel('password')">取消</el-button>
					</el-col>
				</el-row>
			</el-form>
		</el-row>
	</el-row>
</template>

<script>
	import { getPersonalInfo, updateUser, checkAccount } from "@/api/getData"
	import { mapState } from 'vuex'
	import { hex_sha1 } from "@/api/sha1"
	export default {

		data() {
			var validateUserName = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入用户账号'));
				} else {
					var re = /(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}/;
					if(!re.test(value)) {
						callback(new Error('字母数字组合最少6位'));
					} else {
						callback();
					}

				}
			};
			var validateRealName = (rule, value, callback) => {
				if(!this.isRealName && value === '') {
					callback(new Error('请输入真实姓名'));
				} else if(!this.isRealName && value.length > 15) {
					callback(new Error('真实姓名长度不能大于15个字符'));
				} else {
					callback();
				}
			};
			var validateNickName = (rule, value, callback) => {
				if(!this.isNickName && value === '') {
					callback(new Error('请输入昵称'));
				} else if(!this.isNickName && value.length > 15) {
					callback(new Error('昵称长度不能大于15个字符'));
				} else {
					callback();
				}
			};
			var validatePassword = (rule, value, callback) => {
				if(!this.isPassword && value === '') {
					callback(new Error('请输入密码'));
				} else if(!this.isPassword && value.length > 15) {
					callback(new Error('密码长度不能大于15个字符'));
				} else if (!this.isPassword && !/(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}/.test(value)) {
					callback(new Error('至少6位的数字和字母组合'));
				}else{
					callback();
				}
			};
			var validateRePassword = (rule, value, callback) => {
				if(!this.isPassword && value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.user.newPassword) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				isUser: true, //判断用户账户的编辑状态
				isRealName: true, //判断真实姓名的编辑状态
				isNickName: true, //判断昵称的编辑状态
				isPassword: true, //判断密码的编辑状态

				user: {
					newUserName: "", //编辑时账号
					newRealName: "", //编辑时真实姓名
					newNickName: "", //编辑时昵称
					newPassword: "", //编辑时密码
					rePassword: "", //确认密码
					oldPassword:"",//原密码
				},
				rules: {
					newUserName: [{
						validator: validateUserName,
						trigger: 'blur'
					}],
					newRealName: [{
						validator: validateRealName,
						trigger: 'blur'
					}],
					newNickName: [{
						validator: validateNickName,
						trigger: 'blur'
					}],
					oldPassword: [{
						validator: validatePassword,
						trigger: 'blur'
					}],
					newPassword: [{
						validator: validatePassword,
						trigger: 'blur'
					}],
					rePassword: [{
						validator: validateRePassword,
						trigger: 'blur'
					}]
				},
			}
		},
		computed: {
			...mapState(['userInfo']),
		},
		mounted() {
			if(this.userInfo.id) {
				this.initData()
			}
		},
		watch: {
			userInfo: function(newValue) {
				if(newValue.id) {
					this.initData();
				}
			}
		},
		methods: {
			async initData() {
				try {
					const returnData = await getPersonalInfo({
						uuk: this.userInfo.uuk
					});
					if(returnData.errorCode == "0") {
						if(returnData.dataBody.personalInfo != null) {
							this.user = returnData.dataBody.personalInfo;
						}
						this.user.newPassword = "";
						this.user.newRealName = "";
						this.user.newNickName = "";
						this.user.newUserName = "";
						this.user.rePassword = "";
						this.user.oldPassword = "";
					} else {
						throw new Error(returnData.errorString);
					}
				} catch(err) {
					console.log('获取数据失败', err);
				}
			},
			createUser: function(formName) {
				if(!this.isRealName) {
					this.$alert('请先结束编辑真实姓名操作', '提示', {
						confirmButtonText: '确定',
						callback: action => {
							
						}
					});
					return false;
				}else if(!this.isNickName){
					this.$alert('请先结束编辑昵称操作', '提示', {
						confirmButtonText: '确定',
						callback: action => {
							
						}
					});
					return false;
				}else if(!this.isPassword){
					this.$alert('请先结束修改密码操作', '提示', {
						confirmButtonText: '确定',
						callback: action => {
							
						}
					});
					return false;
				}
				this.isUser = false;
				this.$refs[formName].resetFields();
			},
			saveUser(formName, name) {
				this.$refs[formName].validate(async(valid) => {
					if(valid) {
						try {
							//判断真实姓名
							let realName = "";
							if(this.user.newRealName == "") {
								if(this.user.realName == "" || this.user.realName == null) {
									realName = "";
								} else {
									realName = this.user.realName;
								}
							} else {
								realName = this.user.newRealName;
							}
							//判断昵称
							let nickName = "";
							if(this.user.newNickName == "") {
								if(this.user.nickName == "" || this.user.nickName == null) {
									nickName = "";
								} else {
									nickName = this.user.nickName;
								}
							} else {
								nickName = this.user.newNickName;
							}
							//判断密码
							let password = "";
							if(this.user.newPassword == "") {
								if(this.user.password == "" || this.user.password == null) {
									password = "";
								} else {
									password = this.user.password;
								}
							} else {
								//有修改
								password = hex_sha1(this.user.newPassword);
							}
							let oldPassword = "";
							if(this.user.oldPassword == "") {
								if(this.user.oldPassword == "" || this.user.oldPassword == null) {
									oldPassword = "";
								} else {
									oldPassword = this.user.oldPassword;
								}
							} else {
								//有修改
								oldPassword = hex_sha1(this.user.oldPassword);
							}
							
							//判断用户名
							let account = "";
							if(this.user.newUserName == "") {
								if(this.user.userName == "" || this.user.userName == null) {
									account = "";
								} else {
									account = this.user.userName;
								}
							} else {
								account = this.user.newUserName;
							}
							let returnData = await updateUser({
								realName: realName,
								nickName: nickName,
								password: password,
								oldPassword:oldPassword,
								mobile: this.user.mobile,
								account: account,
								uuk: this.user.uuk
							});
							if(returnData.errorCode == "0") {
								if(name == "userName") {
									this.isUser = true;
									this.user.userName = this.user.newUserName;
								} else if(name == "realName") {
									this.isRealName = true;
									this.user.realName = this.user.newRealName;
								} else if(name == "nickName") {
									this.isNickName = true;
									this.user.nickName = this.user.newNickName;
								} else if(name == "password") {
									this.isPassword = true;
								}
								this.user.newPassword = "";
								this.user.newRealName = "";
								this.user.newNickName = "";
								this.user.newUserName = "";
								this.user.rePassword = "";
								this.user.oldPassword = "";
								this.$notify({
									title: '成功',
									message: '保存成功',
									type: 'success'
								});
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
					} else {

					}
				});
			},
			editRealName: function() {
				if(!this.isUser) {
					this.$alert('请先结束创建账号操作', '提示', {
						confirmButtonText: '确定',
						callback: action => {
							
						}
					});
					return false;
				}else if(!this.isNickName){
					this.$alert('请先结束编辑昵称操作', '提示', {
						confirmButtonText: '确定',
						callback: action => {
							
						}
					});
					return false;
				}else if(!this.isPassword){
					this.$alert('请先结束修改密码操作', '提示', {
						confirmButtonText: '确定',
						callback: action => {
							
						}
					});
					return false;
				}
				this.isRealName = false;
				if(this.user.realName != "null") {
					this.user.newRealName = this.user.realName;
				}
			},

			editNickName: function() {
				if(!this.isUser) {
					this.$alert('请先结束创建账号操作', '提示', {
						confirmButtonText: '确定',
						callback: action => {
							
						}
					});
					return false;
				}else if(!this.isRealName) {
					this.$alert('请先结束编辑真实姓名操作', '提示', {
						confirmButtonText: '确定',
						callback: action => {
							
						}
					});
					return false;
				}else if(!this.isPassword){
					this.$alert('请先结束修改密码操作', '提示', {
						confirmButtonText: '确定',
						callback: action => {
							
						}
					});
					return false;
				}
				this.isNickName = false;
				if(this.user.newNickName != "null") {
					this.user.newNickName = this.user.nickName;
				}
			},

			editPassword: function() {
				if(!this.isUser) {
					this.$alert('请先结束创建账号操作', '提示', {
						confirmButtonText: '确定',
						callback: action => {
							
						}
					});
					return false;
				}else if(!this.isRealName) {
					this.$alert('请先结束编辑真实姓名操作', '提示', {
						confirmButtonText: '确定',
						callback: action => {
							
						}
					});
					return false;
				}else if(!this.isNickName){
					this.$alert('请先结束编辑昵称操作', '提示', {
						confirmButtonText: '确定',
						callback: action => {
							
						}
					});
					return false;
				}
				this.isPassword = false;
			},
			//检查账号是否存在
			checkAccount(formName) {
				this.$refs[formName].validate(async(valid) => {
					if(valid) {
						try {
							let returnData = await checkAccount({
								account: this.user.newUserName,
							});
							if(returnData.errorCode == "0") {
								this.saveUser(formName, "userName");
							} else {
								this.$notify({
									title: '提示',
									message: returnData.errorString,
									type: 'warning'
								});
							}
						} catch(err) {
							console.log('获取数据失败', err);
						}
					} else {

					}
				});
			},
			//取消操作
			cancel(item){
				if(item == 'account'){
					this.user.newUserName = "";
					this.isUser=true;
				}else if(item == 'realName'){
					this.user.newRealName = "";
					this.isRealName=true;
				}else if(item == 'nickName'){
					this.user.newNickName = "";
					this.isNickName=true;
				}else if(item == 'password'){
					this.user.newPassword = "";
					this.user.rePassword = "";
					this.user.oldPassword = "";
					this.isPassword=true;
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
	
	.itemUser {
		line-height: 100px;
		font-size: 16px;
	}
	
	.userImg {
		background: url(../../static/bank_bg_03.png) center center no-repeat;
	}
	
	.item {
		line-height: 40px;
		font-size: 16px;
		margin-top: 40px;
	}
	
	.left {
		text-align: right;
	}
	
	.el-form-item {
		margin-bottom: 0px;
	}
	
	.formWidth {
		width: 50%;
	}
	
	.subBtn {
		background-color: #3a8ae1;
		color: #fff;
		border-color: #3a8ae1;
		width: 70px;
	}
</style>