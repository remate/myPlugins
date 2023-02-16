<script>
import CpQueryTable from '@cci/cp-query-table'
// 组件的详细使用请至node_modules或ccinpm查看cp-query-table组件的介绍

export default {
  name: 'CpQueryTable',
  mixins: [CpQueryTable],
  data () {
    // 模拟接口api返回数据
    function testApi (params) {
      return new Promise(resolve => {
        resolve({
          data: [
            {
              id: 1,
              tableName: '表一',
              tableDesc: '说明',
              tableRemark: '备注'
            }
          ],
          totalCount: 1
        })
      })
    }
    return {
      needPadding: false,
      mode: 'add', // add 新增 edit 编辑 look 查看
      tableConfig: { // 表格数据
        index: true,
        maxHeight: '100%',
        data: [{
          id: 1,
          tableName: '表一',
          tableDesc: '说明',
          tableRemark: '备注'
        }],
        columns: [
          {
            label: '数据表名称',
            prop: 'tableName'
          },
          {
            label: '数据表说明',
            render: () => {
              return {
                default: ({ row }) => {
                  return (
                    <div>{row.tableDesc}</div>
                  )
                }
              }
            }
          },
          {
            label: '数据表备注',
            prop: 'tableRemark'
          }
        ],
        btns: [
          {
            text: '详情',
            methods: this.handleLook.bind(this)
          },
          {
            text: '修改',
            methods: this.handelEdit.bind(this)
          },
          {
            text: '删除',
            color: 'red',
            methods: this.handleDelete.bind(this)
          }
        ]
      },
      // 搜索栏数据
      searchMode: {
        search: this.handleSearch,
        refresh: this.handleRefresh,
        model: {},
        data: [
          {
            label: '标签1',
            prop: 'test',
            type: 'input',
            placeholder: '',
            disabled: false,
            span: 8
          },
          {
            label: '标签2',
            prop: 'test2',
            type: 'select',
            placeholder: '',
            disabled: false
          },
          {
            label: '标签3',
            prop: 'test3',
            type: 'date',
            placeholder: '',
            disabled: false
          },
          {
            label: '标签4',
            prop: 'test4',
            type: 'select',
            placeholder: '',
            disabled: false
          },
          {
            label: '标签5',
            prop: 'test5',
            type: 'input',
            placeholder: '',
            disabled: false
          },
          {
            label: '标签6',
            prop: 'test6',
            type: 'select',
            placeholder: '',
            disabled: false
          },
          {
            label: '标签7',
            prop: 'test7',
            type: 'input',
            placeholder: '',
            disabled: false
          }
        ],
        spanLength: 4,
        showLine: 1
      },
      // 自定义参数（不被查询表单重置和改变的参数）
      customQueryParam: {},
      visible: false,
      tableApi: testApi, // 你封装的接口
      isKeywordSearch: false,
      // 动态部分
      selectRaw: {} // 当前选中的行
    }
  },
  computed: {
    title () {
      return this.mode === 'add' ? '新增' : this.mode === 'edit' ? '编辑' : '查看详情'
    }
  },
  created () {
    this.searchMode.model = this.getDefaultModel()
  },
  methods: {
    // ****** 自定义render部分   弹窗模板等 可在此进行 ******
    renderExternals () {
      return (
        <c-dialog visible={this.visible} title={this.title} on-close={() => this.close()} class="template-dialog">
          <span slot="footer" class="dialog-footer">
            <c-button on-click={() => this.close()}>取 消</c-button>
            <c-button type="primary" on-click={() => this.submit()}>确 定</c-button>
          </span>
        </c-dialog>
      )
    },
    // 列表数据
    async loadData () {
      const params = {
        ...this.searchMode.model,
        ...this.localPagination
      }
      const _params = this.transformParams(params)
      const { data, totalCount } = await this.tableApi(_params)
      if (data) {
        // 此处坑：接口返回的数据 有时在data里 有时在data.list里 还有可能在别处，请自行修改
        this.tableConfig.data = data?.list || data || []
        // 此处坑：接口返回的数据 有时在totalCount里 有时在data.total里 还有可能在别处，请自行修改
        this.total = Number(totalCount || data.total || 0)
      }
      return { records: this.tableConfig.data || [] }
    },
    // 新增
    async submit () {

    },
    // 顶部左侧的按钮区域
    renderBtnList () {
      return (
        <div>
          <c-button
            type="primary"
            class="el-icon-plus"
            on-click={() => this.handelAdd()}
          >
              新增
          </c-button>
        </div>
      )
    },
    handelAdd () {
      this.selectRaw = {}
      this.mode = 'add'
      this.visible = true
    },
    handelEdit (raw) {
      this.selectRaw = raw
      this.visible = true
      this.mode = 'edit'
    },
    handleLook (raw) {
      this.$router.push('/example/CpQueryTable/ChildPageDetail')
    },
    handleDelete (raw) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      }).catch(() => {})
    },
    close () {
      if (this.visible) {
        this.$nextTick(() => {
          this.visible = false
        })
      }
    }
  }

}
</script>

<style lang="scss">
  .cp-query-table {
    padding: 20px;
  }
</style>
