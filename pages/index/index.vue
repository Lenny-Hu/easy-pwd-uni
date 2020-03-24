<template>
	<view class="page-index">
		<view class="cu-form-group margin-top">
			<view class="title">类型</view>
			<picker @change="typeChange" :value="selected.type" :range="typeList" range-key="title">
				<view class="picker">
					{{typeList[selected.type].title}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">密码</view>
			<input placeholder="支持中文,首尾空格会被移除" :password="iptType.pwd" v-model.trim="form.pwd"></input>
			<text class='text-orange' :class="iptType.pwd ? 'cuIcon-attentionforbidfill' : 'cuIcon-attentionfill'" @tap="switchIptType('pwd')"></text>
		</view>
		<view class="cu-form-group">
			<view class="title">盐</view>
			<input placeholder="加点盐,生成更安全的密码" :password="iptType.hash" v-model.trim="form.hash"></input>
			<text class='text-orange' :class="iptType.hash ? 'cuIcon-attentionforbidfill' : 'cuIcon-attentionfill'" @tap="switchIptType('hash')"></text>
		</view>
		<view class="cu-form-group">
			<view class="title">添加特殊字符</view>
			<switch @change="switchFlag" :class="selected.flag ? 'checked' : ''" :checked="selected.flag"></switch>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-blue lg shadow" @tap="generate">生 成</button>
		</view>
		
		<view class="cu-modal" :class="modal.show ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">提 示</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					{{modal.content}}
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-green solid-left" @tap="hideModal">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import sha256 from 'crypto-js/sha256';
	export default {
		data() {
			return {
				modal: {
					show: false,
					content: ''
				},
				selected: {
					type: 0,
					flag: false
				},
				iptType: {
					pwd: true,
					hash: true
				},
				form: {
					pwd: '',
					hash: ''
				},
				typeList: [
					{
						title: '前十位(首个字母大写)',
						value: 10
					},
					{
						title: '前六位数字',
						value: 6
					},
					{
						title: '全部',
						value: 0
					}
				]
			}
		},
		onLoad () {
		},
		methods: {
			showModal (content) {
				this.modal.show = true;
				this.modal.content = content;
			},
			hideModal () {
				this.modal.content = '';
				this.modal.show = false;
			},
			typeChange (e) {
				this.selected.type = e.detail.value;
			},
			switchFlag (e) {
				this.selected.flag = e.detail.value;
			},
			switchIptType (name) {
				this.iptType[name] = !this.iptType[name];
			},
			generate () {
				if (!(this.form.pwd && this.form.hash)) {
					return this.showModal(`请输入密码 & 盐`);
				}
				
				let _p = `${this.form.pwd}${this.form.hash}`;
				let res = sha256(_p).toString();
				let _selected = this.typeList[this.selected.type];
				let _this = this;
				
				switch (_selected.value) {
					case 10:
						res = res.slice(0, _selected.value);
						let findRes = res.match(/[a-z]/);
						let arr = res.split('');
						arr[findRes.index] = arr[findRes.index].toUpperCase();
						res = arr.join('');
						break;
						
					case 6:
						res = res.match(/\d/g).slice(0, _selected.value).join('');
						break;
						
					default:
				};
					
				if (this.selected.flag) {
					res = `_${res}_`;
				}
				
				//#ifndef H5
				uni.setClipboardData({
					data: res,
					success () {
						_this.showModal(`密码 ${res} 已复制到粘贴板`);
					},
					fail () {
						_this.showModal(`密码 ${res} 复制到粘贴板失败`);
					}
				});
				//#endif
				
				//#ifdef H5
				this.showModal(res);
				//#endif
			}
		}
	}
</script>

<style lang="scss">

</style>
