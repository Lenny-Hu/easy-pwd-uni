export default {
	getCurpage () {
		let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
		let curPage = routes[routes.length - 1] // 获取当前页面路由，也就是最后一个打开的页面路由
		return { curPage, routes };
	}
};
