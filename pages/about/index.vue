<template>
	<view class="page-about">
		<view class='margin-xl bg-white padding-xl radius shadow-lg'>
			<view class='padding text-center logo'>
				<image class="logo-image" src="../../static/logo.png" mode="aspectFill"></image>
			</view>
		  <view class='text-center margin-bottom text-lg text-grey'>密码包 v1.1.2</view>
		  <view class='text-center margin-bottom text-lg text-blue'>简单可靠的密码生成器</view>
			<view class='text-content'>
				<view class='margin-top-sm'>多个网站/应用共用一个密码存在很大的安全风险，太多的密码又记不住，使用无输入的密码生成方案时，存在着密码文件丢失，过度依赖方案工具的问题。密码包提供的方案具有以下特点：</view>
			</view>
		  <view class='text-content'>
				<view class='margin-top-sm'>* 支持输入中文生成密码，方便记忆（点击输入框后的图标按钮切换为明文状态即可输入中文）</view>
				<view class='margin-top-sm'>* 使用SHA256 + 简单的规则生成可靠的密码；即使没有这个工具也能还原密码，不存在密码丢失和依赖工具的可能</view>
				<view class='margin-top-sm'>* 当一个应用/网站的密码被泄漏时，不会影响其它的应用/网站，也不可能根据泄漏的密码推断出密码原文</view>
				<view class='margin-top-sm'>* 支持生物识别认证（指纹或面容ID），保障使用期间的隐私和安全</view>
				<view class='margin-top-sm'>* 不记录任何输入和输出</view>
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
