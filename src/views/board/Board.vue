<template>
	<div>
		<el-table :data="rechargeList" highlight-current-row stripe border max-height="640" style="width: 100%;">
			<el-table-column prop="todayRecharge" label="今日充值" min-width="100">
			</el-table-column>
			<el-table-column prop="monthRecharge" label="本月充值" min-width="100" align="center">
			</el-table-column>
      <el-table-column prop="yearRecharge" label="今年充值" min-width="100">
			</el-table-column>
      <el-table-column prop="totalRecharge" label="总充值" min-width="100">
			</el-table-column>
		</el-table>
    <el-table :data="earningList" highlight-current-row stripe border max-height="640" style="width: 100%;">
			<el-table-column prop="todayEarning" label="今日收益" min-width="100">
			</el-table-column>
			<el-table-column prop="monthEarning" label="本月收益" min-width="100" align="center">
			</el-table-column>
      <el-table-column prop="yearEarning" label="今年收益" min-width="100">
			</el-table-column>
      <el-table-column prop="totalEarning" label="总收益" min-width="100">
			</el-table-column>
		</el-table>
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
      rechargeList:[{
        todayRecharge : "0",
        monthRecharge : "0",
        yearRecharge : "0",
        totalRecharge : "0",
      }],
      earningList:[{
        todayEarning : "0",
        monthEarning : "0",
        yearEarning : "0",
        totalEarning : "0",
      }]
    };
  },
  created() {
    this.loadPage();
  },
  methods: {
    loadPage() {
      
    },
  }
};
</script>
