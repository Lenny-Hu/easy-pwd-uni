<template>
	<view class="page">
		<c-navbar></c-navbar>
		首 页
		<c-tabbar></c-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad () {
			let curRoute  = this.$mp;
			let curPage = getCurrentPages();
			console.log('加载页面', curRoute, curPage);
		},
		methods: {

		}
	}
</script>

<style lang="scss">

</style>
