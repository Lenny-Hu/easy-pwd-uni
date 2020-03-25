<template>
	<view class="page-about">
		<view class='margin-xl bg-white padding-xl radius shadow-lg'>
			<view class='padding text-center logo'>
				<image class="logo-image" src="../../static/logo.png" mode="aspectFill"></image>
			</view>
		  <view class='text-center margin-bottom text-lg  text-grey'>密码包V1.1.1</view>
		  <view class='text-content'>
		    <view class='margin-top-sm'>使用Sha256生成常用的10位、6位数字密码，密码和盐的内容支持中文哦，可点下输入框后的图标按钮切换为明文状态即可输入中文。</view>
		    <view class='margin-top-sm'>密码包不记录你的任何输出和输出；在H5以外的地方使用时，密码生成完毕后会复制到系统粘贴板，方便使用。</view>
		  </view>
		</view>
	</view>
</template>

<script>
import utils from '@/helpers/utils.js';
export default {
	data() {
		return {
		}
	},
	onLoad () {
	},
	onShareAppMessage: utils.onShareAppMessage,
	methods: {
	}
}
</script>

<style lang="scss">
	.page-about {
		.logo {
			&-image {
				width: 100rpx;
				height: 100rpx;
			}
		}
	}
</style>
