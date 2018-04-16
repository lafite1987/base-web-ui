<<template>
  		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				{{collapsed?'':sysName}}
			</el-col>
			<el-col :span="10">
				<div class="tools" @click.prevent="collapse">
					<i class="fa fa-align-justify"></i>
				</div>
			</el-col>
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<!--<span class="el-dropdown-link userinfo-inner">{{userName}}<img :src="this.userAvatar" /></span>-->
					<span class="el-dropdown-link userinfo-inner">{{userName}}<img src="../../assets/user.png" /></span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
</template>

<<script>
import { mapActions, mapState } from 'vuex'
import api from '../../api';

export default {
    data(){
		return {
			sysName: '管理平台',
			userName: '',
			userAvatar: ''
		}
    },
    methods: {
        ...mapActions([
			'collapse',
			'setAccountInfo',
		]),
		logout(){
			storeSession.remove("token");
			this.$router.push({path: '/login'});
      },
    },
    computed :{
        ...mapState({
			collapsed: state => state.menuStore.collapsed,
		})
    },
	created () {
		api.auth.getAccountInfo().then(res => {			
			this.setAccountInfo(res.data.data);
			this.userName = res.data.data.name || '';
//			this.userAvatar = '../../assets/user.png';
		});
	}
}
</script>
<style scoped lang="scss">
@import '~scss_vars';

.header {
	height: 60px;
	line-height: 60px;
	background: $color-primary;
	color: #fff;
	.userinfo {
		text-align: right;
		padding-right: 15px;
		float: right;
		.userinfo-inner {
			cursor: pointer;
			color: #fff;
			img {
				width: 40px;
				height: 40px;
				border-radius: 20px;
				margin: 10px 0px 10px 10px;
				float: right;
			}
		}
	}
	.logo {
		//width:$sidebar-width;
		height: 60px;
		font-size: 22px;
		padding-left: 20px;
		padding-right: 20px;
		border-color: rgba(238, 241, 146, 0.3);
		border-right-width: 1px;
		border-right-style: solid;
		img {
			width: 40px;
			float: left;
			margin: 10px 10px 10px 18px;
		}
		.txt {
			color: #fff;
		}
	}
	.logo-width {
		width: $sidebar-width;
	}
	.logo-collapse-width {
		width: $collapse-sidebar-width;
	}
	.tools {
		padding: 0px 23px;
		width: 14px;
		height: 60px;
		line-height: 60px;
		cursor: pointer;
	}
}
</style>