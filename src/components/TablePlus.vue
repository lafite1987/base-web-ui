<!-- 自定义Table -->
<template>
    <el-table :data="data">

    </el-table>
</template>

<style lang="sass" scoped>

</style>


<script>
export default {
    props: {
        data: {
            type: Object,
            default() {
                return [];
            }
        },
        columns: [Array]
    }
}
</script>




