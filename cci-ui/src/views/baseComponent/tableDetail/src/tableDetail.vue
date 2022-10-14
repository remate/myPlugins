<template>
  <div class="tableDetail">
    <c-tabs>
      <c-tab-pane label="任务信息">
        <c-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
          <c-radio-button label="top">
            top
          </c-radio-button>
          <c-radio-button label="right">
            right
          </c-radio-button>
          <c-radio-button label="bottom">
            bottom
          </c-radio-button>
          <c-radio-button label="left" disabled>
            left
          </c-radio-button>
        </c-radio-group>
      </c-tab-pane>
      <c-tab-pane label="任务日志">
        <c-timeline style="margin-top:10px">
          <c-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :timestamp="activity.timestamp"
          >
            {{activity.content}}
          </c-timeline-item>
        </c-timeline>

        <c-timeline>
          <c-timeline-item timestamp="2018/4/12">
            <h4>标题</h4>
            <div slot="dot">
              dot
            </div>
          </c-timeline-item>
          <c-timeline-item timestamp="2018/4/3">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/3 20:46</p>
            </el-card>
          </c-timeline-item>
          <c-timeline-item timestamp="2018/4/2">
            <c-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/2 20:46</p>
            </c-card>
          </c-timeline-item>
        </c-timeline>
      </c-tab-pane>
      <c-tab-pane label="催办督办">
        催办督办
      </c-tab-pane>
    </c-tabs>
  </div>
</template>
<script>
export default {
  name: 'TableDetail',
  data () {
    return {
      tabPosition: 'top',
      reverse: true,
      activities: [{
        content: '支持使用图标',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more'
      }, {
        content: '支持自定义颜色',
        timestamp: '2018-04-03 20:46',
        color: '#0bbd87'
      }, {
        content: '支持自定义尺寸',
        timestamp: '2018-04-03 20:46',
        size: 'large'
      }, {
        content: '默认样式的节点',
        timestamp: '2018-04-03 20:46'
      }]
    }
  }
}
</script>
<style lang="scss" scoped>
.tableDetail{
  padding: 20px;

}
</style>
