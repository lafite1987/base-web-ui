<template>
	<div>
		<div class="queryForm">
			<el-form :inline="true" :model="queryParam" class="demo-form-inline" label-suffix=":" label-width="100px">
				<el-form-item label="用户名">
					<el-input v-model="queryParam.query.username" placeholder="用户名"></el-input>
				</el-form-item>
        <el-form-item label="手机号">
					<el-input v-model="queryParam.query.phone" placeholder="手机号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small" @click="loadPage">查询</el-button>
					<el-button type="primary" size="small" @click="reset">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
    <el-button type="primary" size="small" @click="$router.push({ name: 'userAdd' })">新增用户</el-button>
		<el-table :data="pageInfo.tableList" highlight-current-row stripe border max-height="640" v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" width="60" align="center">
			</el-table-column>
      <el-table-column prop="id" label="用户Id" min-width="100">
			</el-table-column>
      <el-table-column prop="username" label="用户名" min-width="100">
			</el-table-column>
      <el-table-column prop="phone" label="手机号" min-width="100">
			</el-table-column>
			<el-table-column prop="nickname" label="用户昵称" min-width="100">
			</el-table-column>
      <el-table-column prop="email" label="邮箱" min-width="200">
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间" min-width="120" :formatter="dateFormat" sortable align="center">
			</el-table-column>
			<el-table-column prop="updateTime" label="更新时间" min-width="120" :formatter="dateFormat" sortable align="center">
			</el-table-column>
			<el-table-column label="操作" width="320" align="center">
				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="$router.push({name:'userUpdate',params: {id:scope.row.id}})">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button size="small" type="primary" icon="setting" @click="handleRoleConfig(scope.$index, scope.row)">分配角色</el-button>
				</template>
			</el-table-column>
		</el-table>

		<div class="paginationSection" style="float:right">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.page.currentPage" :page-sizes="[10, 15, 20, 30, 40]" :page-size="pageInfo.page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.page.totalNum">
			</el-pagination>
      <el-dialog title="分配角色" :visible.sync="dialogVisible" size="tiny">
        <div class="select-tree">
          <el-scrollbar
            tag="div"
            class='is-empty'
            wrap-class="el-select-dropdown__wrap"
            view-class="el-select-dropdown__list">
            <el-tree
              ref="roleTree"
              :data="roleTree"
              show-checkbox
              check-strictly
              node-key="id" 
              v-loading="dialogLoading"
              :default-expand-all="true"
              :expand-on-click-node="false"
              :props="defaultProps">
            </el-tree>
          </el-scrollbar>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="configUserRoles">确 定</el-button>
          </span>
      </el-dialog>
		</div>
		<router-view></router-view>
	</div>
</template>

<style lang="scss" scoped>

</style>

<script>
import axios from "axios";
import api from "../../api";
import util from "../../common/js/util";
import commons from "../../mixins/commons";

export default {
  mixins: [commons],
  data() {
    return {
      //页面结果数据
      pageInfo: {
        tableList: [],
        page: {
          currentPage: 1,
          pageSize: 15,
          totalNum: 0
        }
      },
      userTypeList: [{
        code : 1,
        name : "用户"
      }, {
        code : 2,
        name : "员工"
      }],
      listLoading: false,
      sels: [],
      dialogLoading:false,
      dialogVisible:false,
      defaultProps: {
          children: 'children',
          label: 'name',
          id: "id",
        },
      roleTree: [],
      //检索参数
      queryParam: storeSession.get("USER-QUERY") || {
        query: {
          nickname: null,
          userType: null,
        },
        page: {
          currentPage: 1,
          pageSize: 15,
          totalNum: 0
        }
      }
    };
  },
  created() {
    this.loadPage();
  },
  watch: {
    queryParam: {
      handler(curVal, oldVal) {
        //清理延时任务
        clearTimeout(this.timeoutTask);
        //启动延时任务
        this.timeoutTask = setTimeout(() => {
          this.loadPage();
        }, 400);
      },
      deep: true
    }
  },
  methods: {
    selsChange(sels) {
      this.sels = sels;
    },
    loadPage() {
      storeSession.set("USER-QUERY", this.queryParam);
      api.user.list(this.queryParam).then(res => {
        this.pageInfo.tableList = res.data.data.list;
        this.pageInfo.page = res.data.data.page;
      });
    },
    handleSizeChange(val) {
      this.queryParam.page.pageSize = val;
    },
    handleCurrentChange(val) {
      this.queryParam.page.currentPage = val;
    },
    handleDelete(index, row) {
      this.$confirm("确认删除", "警告").then(() => {
        api.user.del(row.id).then(res => {
          this.loadPage();
        });
      });
    },
    handleRoleConfig(index, row){
        this.roleTree = [];
        this.currentRow = row;
        this.dialogVisible = true;
        api.user.roles(row.id).then(res => {
            this.roleTree = [];
            this.roleTree.push(...res.data.data.list);
            this.$refs.roleTree.setCheckedKeys(res.data.data.checked);
        })
      },
    configUserRoles(){
        let checkedKeys = this.$refs.roleTree.getCheckedKeys();
        api.user.saveRoles(this.currentRow.id, checkedKeys.join(','))
          .then(res => {
              this.$message('修改成功');
              this.dialogVisible = false;
          })
      },
    reset() {
      this.queryParam = {
        query:{
          nickname: null,
          userType: null,
        },
        page: {
          currentPage: 1,
          pageSize: 15,
          totalNum: 0
        }
      };
    }
  }
};
</script>
