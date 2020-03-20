<template>
	<view>
		<!-- 全局顶部头 -->
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">导航栏</block>
		</cu-custom>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				
			};
		},
		created () {
			console.log('11111');
		}
	}
</script>

<style lang="scss">

</style>
