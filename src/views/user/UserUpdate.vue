<template>
	<el-dialog title="更新用户" :visible.sync="showDialog" size="small" @close="closeDialog">
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
			<el-button size="small" type="primary" @click="handleUpdate">确 定</el-button>
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
			formEntity: {
				username: null,
				phone: null,
				password: null,
				nickname: null
			},
		}
	},
	created() {
		api.user.detail(this.$route.params.id).then(res => {
			this.formEntity = res.data.data;
		});
	},
	watch: {
		
	},
	methods: {
		closeDialog() {
			this.$parent.loadPage();
			this.$router.push({ path: '/user' });
		},
		handleUpdate() {
			api.user.update(this.formEntity.id, this.formEntity).then(res => {
				this.closeDialog();
			})
		},
	}
}
</script>
