export default {
	getCurpage () {
		let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
		let curPage = routes[routes.length - 1] // 获取当前页面路由，也就是最后一个打开的页面路由
		return { curPage, routes };
	},
	// 检查支持的认证方式
	checkIsSupportSoterAuthentication () {
		return new Promise((resolve, reject) => {
			uni.checkIsSupportSoterAuthentication({
				success: resolve,
				fail: reject
			});
		});
	},
	checkIsSoterEnrolledInDevice (type) {
		return new Promise((resolve, reject) => {
			uni.checkIsSoterEnrolledInDevice({
				checkAuthMode: type,
				success: resolve,
				fail: reject
			});
		});
	},
	// 检查是否录入指纹
	checkIsSoterEnrolledInDeviceFingerPrint () {
		return this.checkIsSoterEnrolledInDevice('fingerPrint');
	},
	// 检查是否录入FaceID
	checkIsSoterEnrolledInDeviceFaceID () {
		return this.checkIsSoterEnrolledInDevice('facial');
	},
	// 开启生物认证
	startSoterAuthentication (type) {
		let map = {
			fingerPrint: '请用指纹解锁',
			facial: '请用FaceID解锁',
		}
		
		return new Promise((resolve, reject) => {
			uni.startSoterAuthentication({
				requestAuthModes: [type],
				challenge: 'easy-pwd',
				authContent: map[type],
				success: resolve,
				fail: reject
			});
		});
	},
	// 开始指纹认证
	startSoterAuthenticationFingerPrint () {
		return this.startSoterAuthentication('fingerPrint');
	},
	// 开始FaceID认证
	startSoterAuthenticationFaceID () {
		return this.startSoterAuthentication('facial');
	},
	async soterAuth () {
		return new Promise(async (resolve, reject) => {
			let supportMode, isEnrolled;
			try {
				// 检查生物认证方式
				({ supportMode } = await this.checkIsSupportSoterAuthentication());
			} catch (err) {
				return resolve();
			}
			
			// 不支持生物认证，直接返回
			if (!supportMode.length) {
				return resolve(); 
			}
			
			// 检查设备是否已经录入指纹信息
			try {
				({ isEnrolled } = await this.checkIsSoterEnrolledInDevice(supportMode[0]));
			} catch (err) {
				return resolve();
			}
			
			// 未录入生物信息，直接返回
			if (!isEnrolled) {
				return resolve();
			}
			
			// 开始生物认证
			try {
				await this.startSoterAuthentication(supportMode[0]);
			} catch (err) {
				let errMap = {
					'90009': '生物认证失败',
					'90010': '重试次数过多被冻结',
					'90008': '请进行生物认证'
				}
				
				// 用户取消授权 识别失败 和 重试次数过多被冻结 返回失败，其它情况算成功
				if (errMap[err.errCode]) {
					return reject(errMap[err.errCode]);
				}
			}
			
			return resolve();
		});
	}
};
