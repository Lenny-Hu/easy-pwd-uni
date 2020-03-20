const home = {
	name: 'about',
	// path : 'pages/about/index',
	title: '首页'
}

const map = {
	'/': home,
	'pages/index/index': home,
	'pages/about/index': {
		name: 'about',
		title: '关于'
	}
};

export default map;