<template>
	<el-row class="container">
		<app-header></app-header>
		<el-col :span="24" class="main">
			<app-sidebar></app-sidebar>
			<section class="content-container">
				<app-breadcrumb></app-breadcrumb>
				<el-col :span="24" class="content-wrapper">
					<transition name="fade" mode="out-in">
						<router-view></router-view>
					</transition>
				</el-col>
			</section>
		</el-col>
	</el-row>
</template>

<script>
import AppHeader from './layout/AppHeader'
import AppSidebar from './layout/AppSidebar'
import AppBreadcrumb from './layout/AppBreadcrumb'
import { mapState } from 'vuex'

export default {
	components: {
		AppHeader,
		AppSidebar,
		AppBreadcrumb
	},
	created() {

	}
}

</script>

<style scoped lang="scss">
@import '~scss_vars';
.container {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
	.main {
		display: flex;
		position: absolute;
		top: 60px;
		bottom: 0px;
		overflow: hidden;
		.content-container {
			flex: 1;
			overflow-y: scroll;
			padding: 16px;
			padding-top: 0;
			.breadcrumb-container {
				.title {
					width: 200px;
					float: left;
					color: #475669;
				}
				.breadcrumb-inner {
					float: right;
				}
			}
			.content-wrapper {
				background-color: #fff;
				box-sizing: border-box;
			}
		}
	}
}
</style>