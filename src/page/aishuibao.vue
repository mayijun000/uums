<template>
<div></div>
</template>

<script>
	import { asbBinding } from "@/api/getData"
	import { urlSearch } from "@/config/mUtils"
	export default {
		data() {
			return {

			}
		},
		mounted() {
			this.initData();
		},
		methods: {
			async initData() {
				let callBackId = urlSearch("id");
				try {
					const returnData = await asbBinding({
						id: callBackId,
					});
					if(returnData.errorCode == "0") {
						
					} else {
						this.$message.error(returnData.errorString);
					}
					this.$router.push({
						path: '/myCompanyList',
					})
				} catch(err) {
					console.log('获取数据失败', err);
				}
			},
		},
	}
</script>

<style>
</style>