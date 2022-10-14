<template>
  <div class="table">
    <c-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <c-table-column
        type="selection"
        width="55"
      />
      <c-table-column
        prop="date"
        label="日期"
        sortable
        fixed
        width="180"
        column-key="date"
        :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
        :filter-method="filterHandler"
      />
      <c-table-column
        prop="name"
        label="姓名"
        width="120"
      />
      <c-table-column
        prop="address"
        label="地址"
        show-overflow-tooltip
      />
      <c-table-column
        fixed="right"
        label="操作"
        width="120"
      >
        <template slot-scope="scope">
          <c-button
            type="text"
            size="small"
            @click.native.prevent="deleteRow(scope.$index, tableData)"
          >
            移除
          </c-button>
          <c-button
            type="text"
            size="small"
            @click.native.prevent="deleteRow(scope.$index, tableData)"
          >
            移除
          </c-button>
        </template>
      </c-table-column>
    </c-table>
    <div style="margin-top: 20px">
      <c-button @click="toggleSelection([tableData[1], tableData[2]])">
        切换第二、第三行的选中状态
      </c-button>
      <c-button @click="toggleSelection()">
        取消选择
      </c-button>
    </div>

    <c-table
      :data="tableData1"
      style="width: 100%; margin-top: 20px"
    >
      <c-table-column type="expand">
        <template slot-scope="props">
          <c-form label-position="left" inline class="demo-table-expand">
            <c-form-item label="商品名称">
              <span>{{props.row.name}}</span>
            </c-form-item>
            <c-form-item label="所属店铺">
              <span>{{props.row.shop}}</span>
            </c-form-item>
            <c-form-item label="商品 ID">
              <span>{{props.row.id}}</span>
            </c-form-item>
            <c-form-item label="店铺 ID">
              <span>{{props.row.shopId}}</span>
            </c-form-item>
            <c-form-item label="商品分类">
              <span>{{props.row.category}}</span>
            </c-form-item>
            <c-form-item label="店铺地址">
              <span>{{props.row.address}}</span>
            </c-form-item>
            <c-form-item label="商品描述">
              <span>{{props.row.desc}}</span>
            </c-form-item>
          </c-form>
        </template>
      </c-table-column>
      <c-table-column
        label="商品 ID"
        prop="id"
      />
      <c-table-column
        label="商品名称"
        prop="name"
      />
      <c-table-column
        label="描述"
        prop="desc"
      />
    </c-table>
    <h3>多级表头</h3>
    <c-table
      :data="tableData"
      style="width: 100%"
    >
      <c-table-column
        prop="date"
        label="日期"
        width="150"
      />
      <c-table-column label="配送信息">
        <c-table-column
          prop="name"
          label="姓名"
          width="120"
        />
        <c-table-column label="地址">
          <c-table-column
            prop="province"
            label="省份"
            width="120"
          />
          <c-table-column
            prop="city"
            label="市区"
            width="120"
          />
          <c-table-column
            prop="address"
            label="地址"
            width="300"
          />
          <c-table-column
            prop="zip"
            label="邮编"
            width="120"
          />
        </c-table-column>
      </c-table-column>
    </c-table>
    <h3>暂无数据样式+小尺寸small</h3>
    <c-table
      :data="tableData2"
      size="small"
      style="width: 100%; margin-top: 20px"
    >
      <c-table-column type="expand">
        <template slot-scope="props">
          <c-form label-position="left" inline class="demo-table-expand">
            <c-form-item label="商品名称">
              <span>{{props.row.name}}</span>
            </c-form-item>
            <c-form-item label="所属店铺">
              <span>{{props.row.shop}}</span>
            </c-form-item>
            <c-form-item label="商品 ID">
              <span>{{props.row.id}}</span>
            </c-form-item>
            <c-form-item label="店铺 ID">
              <span>{{props.row.shopId}}</span>
            </c-form-item>
            <c-form-item label="商品分类">
              <span>{{props.row.category}}</span>
            </c-form-item>
            <c-form-item label="店铺地址">
              <span>{{props.row.address}}</span>
            </c-form-item>
            <c-form-item label="商品描述">
              <span>{{props.row.desc}}</span>
            </c-form-item>
          </c-form>
        </template>
      </c-table-column>
      <c-table-column
        label="商品 ID"
        prop="id"
      />
      <c-table-column
        label="商品名称"
        prop="name"
      />
      <c-table-column
        label="描述"
        prop="desc"
      />
    </c-table>
    <h3>分页</h3>
    <div style="margin-top: 20px">
      基础样式
    </div>
    <c-pagination
      background
      style="margin-top: 20px"
      layout="prev, pager, next"
      :total="1000"
    />
    <div style="margin-top: 20px">
      完整功能
    </div>
    <c-pagination
      background
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <div style="margin: 20px 0">
      小型分页（空间有限时使用）
    </div>
    <c-pagination
      small
      layout="prev, pager, next"
      :total="1000"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection: [],
      tableData1: [{
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987126',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }],
      tableData2: [],
      currentPage4: 1
    }
  },
  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    filterHandler () {},
    handleSizeChange () { },
    handleCurrentChange () {}
  }
}
</script>
<style lang="scss" scoped>
.table{
  padding: 20px;
}
</style>
