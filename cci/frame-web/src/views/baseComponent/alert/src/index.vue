<template>
  <div class="page-demo">
    <h1>警告</h1>
    <c-alert
      title="成功提示的文案"
      type="success"
      show-icon
    />
    <c-alert
      title="消息提示的文案"
      type="info"
      show-icon
    />
    <c-alert
      title="警告提示的文案"
      type="warning"
      show-icon
    />
    <c-alert
      title="错误提示的文案"
      type="error"
      show-icon
    />
    <h1>通知框</h1>
    <c-button
      plain
      @click="open1"
    >
      成功
    </c-button>
    <c-button
      plain
      @click="open2"
    >
      警告
    </c-button>
    <c-button
      plain
      @click="open3"
    >
      消息
    </c-button>
    <c-button
      plain
      @click="open4"
    >
      错误
    </c-button>
    <h1>全局提示</h1>
    <c-button :plain="true" @click="open5">
      消息
    </c-button>
    <c-button :plain="true" @click="open6">
      成功
    </c-button>
    <c-button :plain="true" @click="open7">
      警告
    </c-button>
    <c-button :plain="true" @click="open8">
      错误
    </c-button>
    <h1>对话框</h1>
    <c-button @click="()=>openDialog('1')">
      打开弹窗
    </c-button>
    <cp-dialog title="弹窗" :visible.sync="dialog1" :on-confirm="submitForm">
      <cp-form
        :model="model1"
        :items="items"
        :rules="rules"
        :inline="false"
      />
    </cp-dialog>
    <c-button @click="()=>openDialog('2')">
      打开有2个表单的弹窗
    </c-button>
    <cp-dialog title="弹窗" :visible.sync="dialog2">
      <cp-form
        :model="model2"
        :items="items"
        :rules="rules"
        :inline="false"
      />
      <cp-form
        :model="model3"
        :items="items"
        :rules="rules"
        :inline="false"
      />
    </cp-dialog>

    <c-button @click="()=>openDialog('3')">
      自定义按钮
    </c-button>
    <cp-dialog title="弹窗" :visible.sync="dialog3">
      <cp-form
        :model="model4"
        :items="items"
        :rules="rules"
        :inline="false"
      />
      <template #footer="{confirm, loading, cancel}">
        <c-button v-if="!loading" @click="cancel">
          取消
        </c-button>
        <c-button :loading="loading" @click="()=>confirm(nextStep)">
          下一步
        </c-button>
        <c-button :loading="loading" @click="()=>confirm(finishStep)">
          完成
        </c-button>
      </template>
    </cp-dialog>

    <h1 />
    <c-button
      type="primary"
      @click="openFullScreen2"
    >
      加载器
    </c-button>
  </div>
</template>

<script>
import CpDialog from '@cci/cp-dialog'
import CpForm from '@cci/cp-form'
export default {
  name: 'Alert',
  components: { CpDialog, CpForm },
  data () {
    return {
      formLabelWidth: '120px',
      form: {
        name: '',
        region: ''
      },
      model1: { name: '' },
      model2: { name: '' },
      model3: { name: '' },
      model4: { name: '' },
      dialog1: false,
      dialog2: false,
      dialog3: false,
      rules: {
        name: [
          { required: true, message: '请输入用户姓名' }
        ]
      },
      items: [
        { xType: 'input', prop: 'name', label: '用户姓名', anchor: 24 }
      ]
    }
  },
  methods: {
    open1 () {
      this.$notify({
        title: '成功',
        message: '这是一条成功的提示消息',
        type: 'success',
        duration: 0
      })
    },

    open2 () {
      this.$notify({
        title: '警告',
        message: '这是一条警告的提示消息',
        type: 'warning',
        duration: 0
      })
    },

    open3 () {
      this.$notify.info({
        title: '消息',
        message: '这是一条消息的提示消息',
        duration: 0
      })
    },

    open4 () {
      this.$notify.error({
        title: '错误',
        message: '这是一条错误的提示消息',
        duration: 0
      })
    },
    open5 () {
      this.$message({
        showClose: true,
        message: '这是一条消息提示',
        duration: 0
      })
    },

    open6 () {
      this.$message({
        showClose: true,
        message: '恭喜你，这是一条成功消息',
        type: 'success',
        duration: 0
      })
    },

    open7 () {
      this.$message({
        showClose: true,
        message: '警告哦，这是一条警告消息',
        type: 'warning',
        duration: 0
      })
    },

    open8 () {
      this.$message({
        showClose: true,
        message: '错了哦，这是一条错误消息',
        type: 'error',
        duration: 0
      })
    },
    openFullScreen2 () {
      const loading = this.$loading({
        lock: true,
        text: '正在上传数据',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      setTimeout(() => {
        loading.close()
      }, 2000)
    },
    openDialog (type) {
      this[`dialog${type}`] = true
    },
    submitForm (resolve, reject) {
      this.$confirm('确认提交数据', '提示').then(() => {
        console.log(this.model1)
        resolve()
      }).catch((err) => reject(err))
    },
    nextStep (resolve, reject) {
      this.$confirm(`确认下一步${JSON.stringify(this.model4)}`, '提示').then(() => {
        resolve()
      }).catch((err) => reject(err))
    },
    finishStep (resolve, reject) {
      this.$confirm(`确认完成提交${JSON.stringify(this.model4)}数据`, '提示').then(() => {
        console.log(this.model4)
        resolve()
      }).catch((err) => reject(err))
    }
  }
}
</script>
