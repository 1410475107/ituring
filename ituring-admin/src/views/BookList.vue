<template>
  <div class="main">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/center' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>书籍管理</el-breadcrumb-item>
      <el-breadcrumb-item>书籍列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="bookname" label="书名" width="120"></el-table-column>
      <el-table-column prop="writer" label="作者" width="180"></el-table-column>
      <el-table-column prop="imgsrc" label="封面" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.imgsrc" />
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" :formatter="formatType" width="180"></el-table-column>
      <el-table-column prop="name" label="添加人" width="180"></el-table-column>
      <el-table-column prop="addtimes" :formatter="formatDate" label="添加时间"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.axios
      .get("/booklist")
      .then(res => {
        console.log(res);
        this.tableData = res.data;
      })
      .catch(err => {
        console.error(err);
      });
  },
  methods: {
    formatType: (row, column, cellValue, index) => {
      // 把类型用逗号连接起来显示
      return JSON.parse(cellValue).join(",");
    },

    formatDate: (row, column, cellValue, index) => {
      return new Date(cellValue).toLocaleString();
    },
    handleEdit(index, row) {
        this.$router.push('/book/edit?bid=' + row.bid);
        console.log(index, row);
    },
    handleDelete(index, row) {
      this.$confirm("删除是不可恢复的, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
            // 到服务器删除对应数据
            this.axios.post('/delbook', { bid:row.bid})
            .then(res => {
                // 这里应该对操作结果进行判断
                if(res.data.r == 'ok'){
                    // 删除当前数据  tableData  
                    this.tableData.splice(index, 1);
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                }
                
                console.log(res)
            })
            .catch(err => {
                console.error(err); 
            })
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      console.log(index, row);
    }
  }
};
</script>


<style scoped>
.el-table .cell img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
</style>

