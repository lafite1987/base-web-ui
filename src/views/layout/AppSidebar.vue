<<template>
    <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-->
        <el-menu theme="dark" :default-active="$route.path" class="el-menu-vertical" @open="handleopen" @close="handleclose" @select="handleselect" unique-opened router :collapse="collapsed" :default-openeds='openedIndex' >
            <!--<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">-->
				<template v-for="(item,index) in menus" v-if="!item.hidden">
					<el-submenu :index="index+''" v-if="!item.leaf" :key="index+''">
						<template slot="title">
							<i :class="item.iconCls"></i>
							<span slot="title">{{item.alias||item.name}}</span>
						</template>
						<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.alias||child.name}}</el-menu-item>
					</el-submenu>
					<el-menu-item v-if="item.leaf" :index="item.path" :key="item.path">
						<i :class="item.iconCls"></i>
						<span slot="title">{{item.alias||item.name}}</span>
					</el-menu-item>
				</template>
        </el-menu>
    </aside>
</template>
<script>
import { mapState } from 'vuex'
import api from '../../api';
import util from '../../common/js/util';

export default {
	data() {
		return {
			menus: null,
			openedIndex: []
		}
	},
	computed: {
		...mapState({
			collapsed: state => state.menuStore.collapsed,
		})
	},
	created() {
		api.auth.getMenuList().then(res => {
			if (!res.data.data || res.data.data.length == 0) {
				this.$router.push({ path: '/login' });
			}

			let tempMenus = [];
			res.data.data.forEach(function(element) {
				//菜单映射			
				let temp = {};
				temp.id = element.id;
				temp.path = element.permUrl;
				temp.alias = element.permName;
				temp.name = element.permName;
				temp.iconCls = element.iconClass;
				temp.parentPermId = element.parentPermId;
				tempMenus.push(temp);
			}, this);


			let treeData = util.listToTree(tempMenus, { parentKey: 'parentPermId' });

			treeData.forEach((element, index) => {
				if (!element.children || element.children.length==0) {
					
						element.leaf = true;
					
				}
			});
			this.menus = treeData;
			this.openMenu();
		});
	},
	watch: {
		//解决menu收缩后在展开，子菜单不展开的问题
		collapsed: {
			handler(curVal, oldVal) {
				//菜单收缩，不进行此操作
				if (curVal) {
					return;
				}
				this.openMenu();
			},
		}
	},
	methods: {
		openMenu() {
			this.menus.forEach((element, index) => {
				if (element.children) {
					//找到要展开的标签
					element.children.forEach(ele => {
						if (ele.path == this.$route.path) {
							this.openedIndex.push(index + "");
						}
					});
				}
			});
		},
		onSubmit() {
			console.log('submit!');
		},
		handleopen() {

		},
		handleclose() {
		},
		handleselect(a, b) {
		},
	}
}

</script>

<style scoped lang="scss">
@import '~scss_vars';

aside {
	flex: 0 0 $sidebar-width;
	width: $sidebar-width;
	.el-menu {
		height: 100%;
	}
}

.menu-collapsed {
	flex: 0 0 $collapse-sidebar-width;
	width: $collapse-sidebar-width;
	.el-menu-item {
		min-width: 0;
	}
}

.menu-expanded {
	flex: 0 0 $sidebar-width;
	width: $sidebar-width;
}
</style>