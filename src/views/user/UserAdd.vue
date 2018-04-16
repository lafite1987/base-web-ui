<template>
	<el-dialog title="新增用户" :visible.sync="showDialog" size="small" @close="closeDialog">
		<el-form :model="formEntity" label-width="100px" label-suffix=":">
			<el-form-item label="用户名">
				<el-input v-model="formEntity.username"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="formEntity.password"></el-input>
			</el-form-item>
			<el-form-item label="手机号">
				<el-input v-model="formEntity.phone"></el-input>
			</el-form-item>
			<el-form-item label="昵称">
				<el-input v-model="formEntity.nickname"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button size="small" @click="closeDialog">返 回</el-button>
			<el-button size="small" type="primary" @click="handleAdd">确 定</el-button>
		</div>
	</el-dialog>
</template>

<style lang="scss" scoped>

</style>

<script>
import axios from 'axios';
import api from '../../api';
import util from '../../common/js/util';
import commons from '../../mixins/commons';


export default {
	mixins: [
		commons
	],
	data() {
		return {
			showDialog: true,
			//新建数据库实例
			formEntity: {
				username: null,
				phone: null,
				password: null,
				nickname: null,
			},
		}
	},
	created() {
		
	},
	watch: {
		
	},
	methods: {
		closeDialog() {
			//父页面更新列表
			this.$parent.loadPage();
			this.$router.push({ path: '/user' });
		},
		handleAdd() {			
			api.user.add(this.formEntity).then(res => {
				this.closeDialog();
			})
		},
	}
}
</script>
