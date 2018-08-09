<template>
	<div class="pageBar">
		<span class="pageSpan" v-if="currentPage > 1" @click="first">第一页</span>
		<span class="pageSpan" @click="prev" v-if="currentPage > 1">上一页</span>
		<span v-if="total != 0">第{{nowCurrentPageStart}}-{{nowCurrentPageEnd}}条</span>
		<span>共{{total}}条</span>
		<span class="pageSpan" @click="next" v-if="currentPage < total/pageSize">下一页</span>
		<span class="pageSpan" @click="end" v-if="currentPage < total/pageSize">最后一页</span>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				currentPage:1,
				nowCurrentPageStart:1,
				nowCurrentPageEnd:10,
				pageSize:10,
			}
		},
		props: {
			total: Number,
		},
		methods: {
			prev() {
				const newVal = this.currentPage - 1;
				this.currentPage = newVal;
				this.nowCurrentPageStart = this.nowCurrentPageStart - this.pageSize;
				this.nowCurrentPageEnd = this.nowCurrentPageEnd - this.pageSize;
				this.$emit('pagechange', this.currentPage,this.pageSize);
			},

			next() {
				const newVal = this.currentPage + 1;
				this.currentPage = newVal;
				this.nowCurrentPageStart = this.nowCurrentPageStart + this.pageSize;
				this.nowCurrentPageEnd = this.nowCurrentPageEnd + this.pageSize;
				this.$emit('pagechange', this.currentPage,this.pageSize);
			},
			first(){
				this.currentPage = 1;
				this.nowCurrentPageStart = 1;
				this.nowCurrentPageEnd = this.pageSize;
				this.$emit('pagechange', this.currentPage,this.pageSize);
			},
			end(){
				this.currentPage = Math.ceil(this.total/this.pageSize);
				console.log(this.currentPage);
				this.nowCurrentPageStart = this.pageSize*(this.currentPage-1);
				this.nowCurrentPageEnd = this.pageSize*this.currentPage;
				this.$emit('pagechange', this.currentPage,this.pageSize);
			}
			
		},
		watch:{
			total:function(){
				this.currentPage=1;
				this.nowCurrentPageStart=1;
				this.nowCurrentPageEnd=10;
			}
		}
	}
</script>

<style scoped>
	.pageBar {
		height: 30px;
		margin: 20px;
		margin-right: 0px;
		color: #3a8ae1;font-size:14px;
	}
	
	.pageBar .pageSpan {
		padding: 3px 8px;
		display: inline-block;
		cursor: pointer;
		color: #3a8ae1;
		background-color: #ffffff;
		border:1px solid #3a8ae1;
		border-radius: 4px;
		
	}
	
	.pageBar .pageSpan:hover {
		color:#fff;
		background-color: #3a8ae1;
		border:1px solid #fff;
	}
	
	.selected {
		background-color: #20a0ff;
	}
</style>