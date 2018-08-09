<template>
	<el-row class="rowDiv">
		<el-row class="title bot">
			新增银行总行
		</el-row>
		<el-form ref="form" :model="form" :rules="rules" label-width="200px" style="margin-top: 40px;font-weight: bold;">
			<el-form-item label="银行名称:" prop="bankName">
				<el-input class="textInput" v-model="form.bankName"></el-input>
			</el-form-item>
			<el-form-item label="银行代码:" prop="bankCode">
				<el-input class="textInput" v-model="form.bankCode"></el-input>
			</el-form-item>
			<el-form-item label="银行地址:" prop="bankUrl">
				<el-input class="textInput" v-model="form.bankUrl"></el-input>
			</el-form-item>
			<el-form-item label="银行logo:" prop="bankLogo">
				<el-col :span="7">
					<el-input class="textInput" :readonly="true" style="width:220px" v-model="form.bankLogo"></el-input>
				</el-col>
				<el-col :span="4">
					<el-upload class="upload-demo" :before-upload="beforeUpload" :on-error="errorUpload" :on-success="successUpload" :action="fileUploadUrl" :show-file-list="false">
						<el-button class="subBtn" style="width:123px">选择图片文件</el-button>
					</el-upload>
				</el-col>
				<el-col :span="4" style="font-size: 14px;color:#FF4949;padding-top: 8px;">建议图片大小260*70</el-col>
			</el-form-item>
			

			<el-row class="btnClass">
				<el-button class="subBtn" @click="saveBank('form')">
					<i class="btn-icon save"></i>
					<span style="display: block;">保存并退出</span>
				</el-button>
				<el-button class="subBtn" @click="toBank" style="margin-left: 80px;">
					<i class="btn-icon del"></i>
					<span style="display: block;">放弃并退出</span>
				</el-button>
			</el-row>
		</el-form>
	</el-row>
</template>

<script>
	import { upload, addBank } from "@/api/getData"
	export default {
		data() {
			return {
				form: {
					bankName: "",
					bankCode: "",
					bankUrl: "",
					bankLogo: ""
				},
				fileUploadUrl: "",
				rules: {
					bankName: [
					{
						required: true,
						message: '请输入银行名称',
						trigger: 'blur'
					},
					{ min: 4, max: 20, message: '长度要求在 4 到 20 个字符', trigger: 'blur' }
					],
					bankUrl: [{
						required: true,
						message: '请输入银行地址',
						trigger: 'blur'
					}],

					bankCode: [{
						required: true,
						message: '请输入银行代码',
						trigger: 'blur'
					}],

					bankLogo: [{
						required: true,
						message: '请上传银行logo',
						trigger: 'change'
					}],
				},

			}
		},
		created() {
			this.fileUploadUrl = upload;
		},
		methods: {
			saveBank(formName) {
				this.$refs[formName].validate(async(valid) => {
					if(valid) {
						try {
							let returnData = await addBank(this.form);
							if(returnData.errorCode == "0") {
								this.$notify({
									title: '成功',
									message: '保存成功',
									type: 'success'
								});
								this.$router.push({
									path: 'bankList',
								})
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
					} else {

					}
				});
			},
			toBank() {
				this.$router.push({
					path: 'bankList',
				})
			},
			beforeUpload(file){
				const isJPG = file.type === 'image/jpeg';
				const isPNG = file.type === 'image/png';
				const isLt1M = file.size / 1024 / 1024 < 1;
				if(!isJPG && !isPNG) {
					this.$message.error('上传头像图片只能是 JPG和PNG 格式!');
				}
				if(!isLt1M) {
					this.$message.error('上传头像图片大小不能超过 1MB!');
				}
				return(isJPG || isPNG) && isLt1M;
			},
			successUpload(data) {
				if(data.errorCode == "0") {
					this.form.bankLogo = data.dataBody.authUrl;
				}
			},
			errorUpload(data) {
				this.$notify({
					title: '失败',
					message: "接口错误",
					type: 'error'
				});
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
	
	.btn-icon {
		background: #398be1 url(../../static/icon.png) no-repeat;
	}
	
	.save {
		background-position: 5px -365px;
		display: inline-block;
		height: 20px;
		width: 25px;
		float: left;
	}
	
	.del {
		background-position: 5px -415px;
		display: inline-block;
		height: 20px;
		width: 25px;
		float: left;
	}
	
	.textInput {
		width: 358px;
		border-radius: 5px;
	}
	
	.subBtn {
		background-color: #3a8ae1;
		color: #fff;
		border-color: #3a8ae1;
		width: 140px;
	}
	
	.btnClass {
		margin-left: 200px;
		margin-top: 80px;
	}

</style>