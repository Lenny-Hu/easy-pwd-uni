<template>
	<view>
		<!-- 全局顶部头 -->
		<cu-custom bgColor="bg-gradual-blue" :isBack="showBack">
			<block slot="backText">返回</block>
			<block slot="content">{{title}}</block>
		</cu-custom>
	</view>
</template>

<script>
	import utils from '@/helpers/utils';
	export default {
		data () {
			return {
				title: '',
				showBack: false
			};
		},
		methods: {
			setShowBack () {
				let { curPage, routes } = utils.getCurpage();
				this.showBack = curPage.route == 'pages/index/index' ? false : routes.length > 1;
			}
		},
		computed: {
			
		},
		created () {
			uni.$off('update-title');
			uni.$on('update-title', (data) => {
				this.title = data.title;
			});
			
			this.setShowBack();
		}
	}
</script>

<style lang="scss">

</style>
