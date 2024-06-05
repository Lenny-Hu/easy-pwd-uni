<template>
	<view class="page-index">
		<view class="cu-form-group margin-top">
			<view class="title">快速</view>
			<radio-group name="radio"  @change="typeChange">
				<label v-for="(ite, i) in typeList" :key="i" v-show="ite.label" class="margin-left">
					<radio :value="i.toString()" :checked="i === selected.type" /><text class="margin-left-xs">{{ite.label}}</text>
				</label>
			</radio-group>
		</view>
		<view class="cu-form-group">
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
			<input placeholder="网站/应用/用途的名称" :password="iptType.hash" v-model.trim="form.hash"></input>
			<text class='text-orange' :class="iptType.hash ? 'cuIcon-attentionforbidfill' : 'cuIcon-attentionfill'" @tap="switchIptType('hash')"></text>
		</view>
		<view class="cu-form-group">
			<view class="title">添加年份({{year}})</view>
			<switch @change="switchYear" :class="selected.year ? 'checked' : ''" :checked="selected.year"></switch>
		</view>
		<view class="cu-form-group">
			<view class="title">添加特殊字符(_)</view>
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
				<view class="padding-xl modal-content">
					密码 <text class="text-red text-shadow">{{modal.content}}</text>
					<!--  #ifdef  H5 -->
					<input type="text" :value="newPwd" ref="newPwdIpt" focus class="modal-content__ipt"/>
					<!--  #endif -->
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-green solid-left" @tap="hideModal">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue';
	import sha256 from 'crypto-js/sha256';
	import utils from '@/helpers/utils.js';
	export default {
		data () {
			return {
				modal: {
					show: false,
					content: ''
				},
				selected: {
					type: 0,
					flag: false,
					year: false
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
						label: '通用',
						title: '前十位(首个字母大写)',
						value: 10
					},
					{
						label: '六位',
						title: '后六位数字',
						value: -6
					},
					{
						label: '八位',
						title: '中间八位数字',
						value: 8
					},
					{
						label: '',
						title: '前六位数字',
						value: 6
					},
					{
						label: '',
						title: '全部',
						value: 0
					}
				],
				newPwd: '',
				year: (new Date()).getFullYear()
			}
		},
		onReady () {
			this.readConf();
		},
		onLoad () {
		},
		onHide () {
			// 界面隐藏时，将密码输入框切换为密文状态
			this.hideIpt();
		},
		onShareAppMessage (res) {
			this.hideIpt();
			utils.onShareAppMessage(res);
		},
		methods: {
			writeConf (k, v) {
				uni.setStorage({
					key: k,
					data: v,
				});
			},
			readConf () {
				let keys = [
					{
						name: 'type',
						fn (res) {
							return res.data >= 0 ? +res.data : 0;
						}
					},
					{
						name: 'year',
						fn (res) {
							return String(res.data) === 'true' ? true : false;
						}
					},
				];
				
				keys.forEach((v) => {
					uni.getStorage({
						key: v.name,
						success: (res) => {
							this.selected[v.name] = v.fn(res);
						}
					});
				});
			},
			hideIpt () {
				Object.keys(this.iptType).forEach((k) => {
					this.iptType[k] = true;
				});
			},
			showModal (content) {
				this.modal.show = true;
				this.modal.content = content;
			},
			hideModal () {
				this.modal.content = '';
				this.modal.show = false;
			},
			typeChange (e) {
				this.selected.type = parseInt(e.detail.value);
				this.writeConf('type', this.selected.type);
			},
			switchFlag (e) {
				this.selected.flag = e.detail.value;
			},
			switchYear (e) {
				this.selected.year = e.detail.value;
				this.writeConf('year', this.selected.year);
			},
			async switchIptType (name) {
				// app 和 微信启用生物认证
				//#ifdef APP-PLUS || MP-WEIXIN
				await this.soterAuth();
				//#endif
	
				this.iptType[name] = !this.iptType[name];
			},
			generatePwd () {
				let _p = `${this.form.pwd}${this.form.hash}`;
				
				if (this.selected.year) {
					_p += this.year;
				}
	
				let res = sha256(_p).toString();
				let _selected = this.typeList[this.selected.type];
				let n = _selected.value;
	
				switch (n) {
					case 10:
						res = res.slice(0, n);
						let findRes = res.match(/[a-z]/);
						let arr = res.split('');
						arr[findRes.index] = arr[findRes.index].toUpperCase();
						res = arr.join('');
						break;
						
					case 6:
						let map = {};
						
						res = res.match(/\d/g).slice(0, n).join('');
						break;
						
					case -6:
						res = res.match(/\d/g).slice(n).join('');
						break;
						
					case 8:
						let _arr = res.match(/\d/g);
						let middle = Math.floor(_arr.length / 2);
						let start = middle - 4;
						let end = middle + 4;
						
						res = _arr.slice(start, end).join('');
						break;
						
					default:
				};
					
				if (this.selected.flag) {
					res = `_${res}_`;
				}
				return res;
			},
			async soterAuth () {
				return new Promise(async (resolve, reject) => {
					// 如果已经认证过一次，无需再次认证
					if (Vue.prototype.soterAuthFlag) {
						return resolve(); 
					}
					
					try {
						await utils.soterAuth();
						// 认证通过设置标识
						Vue.prototype.soterAuthFlag = true;
					} catch (err) {
						this.showModal(err);
						return reject();
					}
					return resolve();
				});
			},
			async generate () {
				if (!(this.form.pwd && this.form.hash)) {
					return uni.showToast({
						title: `请输入密码 & 盐`,
						icon: 'error'
					});
				}
				let newPwd = this.newPwd = this.generatePwd();
				let _this = this;
				
				// app 和 微信启用生物认证
				//#ifdef APP-PLUS || MP-WEIXIN
				await this.soterAuth();
				//#endif
				
				this.showPwd(newPwd);
			},
			showPwd (pwd) {
				let _this = this;
				let len = pwd.length;
				let desc = len > 6 ? (pwd.slice(0, len / 2) + ' ' + pwd.slice(len / 2)) : pwd;
				
				uni.setClipboardData({
					data: pwd,
					success () {
						_this.showModal(`${desc}`);
					},
					fail () {
						_this.showModal(`${desc} 复制到粘贴板失败`);
					}
				});
				
				// desc = `<text class="text-red text-shadow">${desc}</text>`;
				
				// uni.setClipboardData({
				// 	data: pwd,
				// 	success () {
				// 		_this.showModal(`密码 ${desc} 已复制到粘贴板`);
				// 	},
				// 	fail () {
				// 		_this.showModal(`密码 ${desc} 复制到粘贴板失败`);
				// 	}
				// });
				
				// //#ifdef H5
				// _this.showModal(`密码 ${desc} 已复制到粘贴板`);
				// setTimeout(() => {
				// 	_this.$refs.newPwdIpt.$refs.input.select();
				// 	document.execCommand('Copy');
				// }, 150);
				// //#endif
			}
		}
	}
</script>

<style lang="scss">
.page-index {
	.cu-form-group {
		.title {
			min-width: 90rpx;
		}
	}
	
	.cu-dialog {
		.modal-content {
			position: relative;
			word-break: break-all;
			
			&__ipt {
				position: absolute;
				left: 0;
				top: 0;
				opacity: 0;
			}
		}
	}
}
</style>
