<template>
  <div class="page-demo">
    <CodeBox title="基础">

      <c-timeline>
        <c-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :title="activity.title"
          placement="top"
          :timestamp="activity.timestamp"
        >
          {{activity.content}}
        </c-timeline-item>
      </c-timeline>
    </CodeBox>
  </div>
</template>
<script>
export default {
  name: 'Timeline',
  data () {
    return {
      activities: [{
        title: '第一步',
        content: '支持使用图标',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more'
      }, {
        title: '第二步',
        content: '支持自定义颜色',
        timestamp: '2018-04-03 20:46',
        color: '#0bbd87'
      }, {
        title: '第三步',
        content: '支持自定义尺寸',
        type: 'circle',
        timestamp: '2018-04-03 20:46'
      }, {
        title: '第四步',
        content: '默认样式的节点',
        size: 'large',
        timestamp: '2018-04-03 20:46'
      }, {
        title: '第五步',
        content: 'slot插入任意内容',
        timestamp: '2018-04-03 20:46'
      }]
    }
  }
}
</script>
