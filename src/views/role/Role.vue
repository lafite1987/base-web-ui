<template>

  <imp-panel>
    <h3 class="box-title" slot="header" style="width: 100%;">
      <el-button type="primary" icon="plus" @click="newAdd">新增</el-button>
      <el-button type="danger" icon="delete" @click="batchDelete">删除</el-button>

    </h3>
    <el-row slot="body" :gutter="24" style="margin-bottom: 20px;">
      <el-col :span="6" :xs="24" :sm="24" :md="6" :lg="6" style="margin-bottom: 20px;">
        <el-tree v-if="roleTree"
                 :data="roleTree"
                 ref="roleTree"
                 show-checkbox
                 highlight-current
                 :default-expand-all="true"
                 :expand-on-click-node="false"
                 :render-content="renderContent"
                 @node-click="handleNodeClick" clearable node-key="id" :props="defaultProps"></el-tree>
      </el-col>
      <el-col :span="18" :xs="24" :sm="24" :md="18" :lg="18">
        <el-card class="box-card">
          <div class="text item">
            <el-form :model="form" ref="form">
              <el-form-item label="父级" :label-width="formLabelWidth">
                <!--<el-input v-model="form.parentId" auto-complete="off"></el-input>-->
                <el-select-tree v-model="form.parentId" :treeData="roleTree" :propNames="defaultProps" clearable 
                                placeholder="请选择父级">
                </el-select-tree>
              </el-form-item>
              <el-form-item label="名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="描述" :label-width="formLabelWidth">
                <el-input v-model="form.desc" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="是否生效" :label-width="formLabelWidth">
                <el-radio class="radio" v-model="form.state" :label="1">是</el-radio>
                <el-radio class="radio" v-model="form.state" :label="0">否</el-radio>
              </el-form-item>
              <el-form-item label="排序" :label-width="formLabelWidth">
                <el-slider v-model="form.orderNo"></el-slider>
              </el-form-item>
              <el-form-item label="" :label-width="formLabelWidth">
                <el-button type="primary" @click="onSubmit" v-text="form.id?'修改':'新增'"></el-button>
                <el-button type="primary" @click="settingResource($event,form.id)" icon="setting" v-show="form.id && form.id!=null">分配权限
                </el-button>
                <el-button type="danger" @click="deleteSelected(form.id)" icon="delete" v-show="form.id && form.id!=null">删除
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>

        <el-dialog title="分配权限" :visible.sync="dialogVisible" size="tiny">
          <div class="select-tree">
          <el-scrollbar
            tag="div"
            class='is-empty'
            wrap-class="el-select-dropdown__wrap"
            view-class="el-select-dropdown__list">
          <el-tree
              ref="resourceTree"
              :data="resourceTree"
              show-checkbox
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
          <el-button type="primary" @click="configRoleResources">确 定</el-button>
          </span>
        </el-dialog>
      </el-col>
    </el-row>
  </imp-panel>

</template>
<script>
  import panel from "../../components/panel.vue"
  import selectTree from "../../components/selectTree.vue"
  import treeter from "../../components/treeter"
  import axios from "axios";
import api from "../../api";
import util from "../../common/js/util";
import commons from "../../mixins/commons";

  export default {
    mixins: [treeter],
    components: {
      'imp-panel': panel,
      'el-select-tree': selectTree,
    },
    data(){
      return {
        dialogLoading:false,
        dialogVisible:false,
        formLabelWidth: '100px',
        defaultProps: {
          children: 'children',
          label: 'name',
          id: "id",
        },
        roleTree: [],
        resourceTree:[],
        maxId:700000,
        form: {
          id: null,
          parentId: null,
          name: '',
          desc: '',
          orderNo: 0,
          state: '1'
        }
      }
    },
    methods: {
      configRoleResources(){
        let checkedKeys = this.$refs.resourceTree.getCheckedKeys();
        api.role.savePrivileges(this.form.id, checkedKeys.join(',')).then(res => {
            this.$message('修改成功');
            this.dialogVisible = false;
        });
      },
      handleNodeClick(data){
        this.form = data;
      },
      newAdd(){
        this.form = {
          id: null,
          parentId: null,
          name: '',
          desc: '',
          orderNo: 0,
          state: '1',
        };
      },
      batchDelete(){
        var checkKeys = this.$refs.roleTree.getCheckedKeys();
        if (checkKeys == null || checkKeys.length <= 0) {
          this.$message.warning('请选择要删除的资源');
          return;
        }
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(api.SYS_ROLE_DELETE + "?roleIds=" + checkKeys.join(','))
            .then(res => {
              this.$message('操作成功');
              this.load();
            }).catch(e => {
            this.$message('操作成功');
            console.log(checkKeys);
            this.batchDeleteFromTree(this.roleTree, checkKeys);
          })
        });
      },
      onSubmit(){
        this.form.parentId = this.form.parentId;
        if(this.form.id) {
            api.role.update(this.form.id, this.form).then(res => {
                if(res.data.code == 200) {
                    this.updateTreeNode(this.roleTree, merge({}, this.form));
                    this.$message('更新成功');
                }
            });
        } else {
            api.role.add(this.form).then(res => {
                if(res.data.code == 200) {
                    this.form.id = res.data.data.id;
                    if(res.data.data.parentId == 0) {
                        this.roleTree.push(res.data.data);
                    } else {
                        this.appendTreeNode(this.roleTree, res.data.data);
                    }
                    
                }
            });
        }
      },
      deleteSelected(id){
          api.role.del(id).then(res => {
              this.$message("删除成功");
              this.deleteFromTree(this.roleTree, id);
              this.newAdd();
          });
      },
      load(){
        api.role.tree().then(res => {
            this.roleTree = [];
            this.roleTree.push(...res.data.data);
          })
      },
      renderContent(h, {node, data, store}) {
        return (
          <span>
            <span>
              <span>{node.label}</span>
            </span>
            <span class="render-content">
              <i class="fa fa-wrench" title="配置资源" on-click={(e)=>this.settingResource(e,data.id)}></i>
              <i class="fa fa-trash" on-click={ () => this.deleteSelected(data.id) }></i>
            </span>
          </span>);
      },
      settingResource(event,id){
          this.form.id = id;
          this.resourceTree = [];
          event.stopPropagation();
          this.dialogVisible = true;
          this.dialogLoading = true;
          api.role.privileges(id).then(res => {
              this.resourceTree = [];
              this.dialogLoading = false;
              this.resourceTree.push(...res.data.data.list);
              this.$refs.resourceTree.setCheckedKeys(res.data.data.checked);
          })
      }
    },
    created(){
      this.load();
    }
  }
</script>

<style>
  .render-content {
    float: right;
    margin-right: 20px
  }
  .render-content i.fa {
    margin-left: 10px;
  }
  .render-content i.fa:hover{
    color: #e6000f;
  }
  .select-tree .el-scrollbar.is-empty .el-select-dropdown__list {
    padding: 0;
  }
  .select-tree .el-scrollbar {
    border: 1px solid #d1dbe5;
  }
  .select-tree .el-tree{
    border:0;
  }
</style>