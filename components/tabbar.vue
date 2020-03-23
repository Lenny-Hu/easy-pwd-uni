<template>
	<view>
		<!-- 全局底部tabbar -->
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" v-for="(item, i) in tabList" :key="i" @click="goto(item)">
				<view class="cuIcon-cu-image">
					<text class="lg" :class="[`cuIcon-${item.icon}`, selected.tab == item.path ? 'text-green' : 'text-gray']"></text>
				</view>
				<view :class="selected.tab == item.path ? 'text-green' : 'text-gray'">{{routemap[item.path].title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import routemap from '@/routemap.js';
	import utils from '@/helpers/utils';
	export default {
		data () {
			return {
				selected: {
					tab: ''
				},
				routemap,
				tabList: [
					{
						path: '/pages/index/index',
						icon: 'home'
					},
					{
						path: '/pages/about/index',
						icon: 'profile'
					}
				]
			};
		},
		methods: {
			emitTitle () {
				uni.$emit('update-title', { title: routemap[this.selected.tab].title });
			},
			goto (item) {
				uni.redirectTo({
					url: item.path
				});
			}
		},
		created () {
			let { curPage } = utils.getCurpage();
			this.selected.tab = `/${curPage.route}`;
			this.emitTitle();
		}
	}
</script>

<style lang="scss">

</style>
