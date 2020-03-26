<script>
import Vue from 'vue';
export default {
	onLaunch: function() {
		uni.getSystemInfo({
			success: function(e) {
			}
		});
	},
	onShow: function() {
	},
	onHide: function() {
		Vue.prototype.soterAuthFlag = false;
	}
};
</script>

<style lang="scss">
@import './app.scss';
</style>
