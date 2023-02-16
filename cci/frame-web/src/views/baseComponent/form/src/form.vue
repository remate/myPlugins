<template>
  <div class="page-demo">
    <cp-form
      ref="editForm"
      :items="editFields"
      :inline="false"
      :model="editModel"
      label-width="80px"
      :rules="addRules"
    />
  </div>

</template>
<script>
import Form from '@cci/cp-form'
const components = {
  // SelectTime: () => import('@/components/Select/SelectTime'),
  // SelectCode: () => import('@/components/Select/SelectCode'),
  // SelectConfig: () => import('@/components/Select/SelectConfig'),
  // SelectTree: () => import('@/components/Select/SelectTree')
}
const componentList = Object.keys(components)

export default {
  components: {
    CpForm: Form
  },
  data () {
    return {
      editFields: [
        { label: '功能编号', prop: 'funId', placeholder: '长度在 3 到 5 个字符', anchor: 24, disabled: true },
        { label: '功能名称',
          prop: 'funName',
          placeholder: '输入功能名称',
          anchor: 24,
          focus: true,
          on: {
            input: (val) => {
              this.funName = val
              if (!this.$refs.editForm.model.pid) {
                this.$refs.editForm.model.fullPath = val
              } else {
                const params = {}
                params[this.idKey] = this.$refs.editForm.model.pid
                this.getFullPath(params).then(({ data }) => {
                  this.pidLabel = data.fullPath
                  this.$refs.editForm.model.fullPath = this.filterArray([this.pidLabel, this.funName]).join('/')
                }).catch(err => console.log(err))
              }
            }
          }
        },
        { label: '连接地址', prop: 'location', placeholder: '输入连接地址', anchor: 24 },
        { label: '父功能',
          prop: 'pid',
          placeholder: '请选择父功能',
          xType: 'SelectTree.SYS_FUN',
          relatedFields: ['editFunPath'],
          anchor: 24,
          // 下拉树参数
          treeParams: {
            get: {
              url: '/v1/sys/function/findNextChildNodeTree',
              nextNodeKey: 'node',
              idKey: 'id'
            }
          }
        },
        { label: '排序号', prop: 'orderNo', placeholder: '输入排序号', anchor: 24 },
        { label: '功能类型', prop: 'funType', placeholder: '请选择功能类型', xType: 'SelectCode.FUN_TYPE', anchor: 24 },
        { label: '记日志', prop: 'logFlag', xType: 'switch', anchor: 24, 'active-value': 1, 'inactive-value': 0 },
        { label: '图标', prop: 'icon', anchor: 24 },
        { label: '版本', prop: 'version', anchor: 24 },
        { label: '全路径',
          prop: 'fullPath',
          anchor: 24,
          readonly: true,
          style: 'border: 0;',
          ref: 'editFunPath',
          on: {
            // 'el.form.update': (val, ctx, origin, form) => { // 值,当前组件,关联组件
            //   if (form.model.pid) {
            //     const params = {}
            //     params[this.idKey] = form.model.pid
            //     this.getFullPath(params).then(({ data }) => {
            //       this.pidLabel = data.fullPath
            //       form.model.fullPath = this.filterArray([this.pidLabel, form.model.funName]).join('/')
            //     }).catch(err => console.log(err))
            //   } else {
            //     this.pidLabel = ''
            //     form.model.fullPath = this.filterArray([form.model.funName]).join('/')
            //   }
            // }
          }
        }
      ],
      editModel: {
        'funId': '',
        'funName': '',
        'location': '',
        'pid': null,
        'orderNo': '',
        'funType': '',
        'logFlag': '',
        'icon': '',
        'version': '',
        'fullPath': '/例子/测试编辑'
      },
      addRules: {
        // 'funId': [
        //   { required: true, message: '请输入功能编号', trigger: 'blur' }
        // ],
        // 'funName': [
        //   { required: true, message: '请输入功能名称', trigger: 'blur' }
        // ],
        // 'funType': [
        //   { required: true, message: '请选择功能类型', trigger: 'blur' }
        // ]
      }
    }
  },
  beforeCreate () {
    this.R = this.R || {}
    componentList.forEach(name => {
      this.R[`${name}Render`] = function (h, item, opts) {
        if (!item.anchor) {
          item.anchor = {
            span: 8,
            lg: 12,
            sm: 12
          }
        }
        opts.on['change'] = this.mixinEvent(
          opts.on['change'],
          this.handleChange.bind(this, item)
        )
        return [h(name, opts)]
      }
    })
  },
  methods: {
    handleChange (item, e) {
      this.model[item.prop] = e
      this.emitRelated(e, item.relatedFields, item.ref || item.prop)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
