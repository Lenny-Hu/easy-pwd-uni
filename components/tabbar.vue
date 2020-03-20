<template>
	<view>
		<!-- 全局底部tabbar -->
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" v-for="(item, i) in tabList" :key="i" @click="goto(item)">
				<view class="cuIcon-cu-image">
					<text class="lg" :class="[`cuIcon-${item.icon}`, selected.tab == item.name ? 'text-green' : 'text-gray']"></text>
				</view>
				<view :class="selected.tab == item.name ? 'text-green' : 'text-gray'">{{item.title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import routemap from '@/routemap.js';
	export default {
		data () {
			return {
				selected: {
					tab: 'home'
				},
				tabList: [
					{
						name: 'home',
						title: '首页',
						path: '/',
						icon: 'home'
					},
					{
						name: 'about',
						title: '关于',
						path: '/pages/about/index',
						icon: 'profile'
					}
				]
			};
		},
		methods: {
			goto (item) {
				console.log(item);
				uni.navigateTo({
					url: item.path
				});
			}
		},
		created () {
			// this.navList = routemap;
			console.log('加载底部导航', uni);
		}
	}
</script>

<style lang="scss">

</style>
