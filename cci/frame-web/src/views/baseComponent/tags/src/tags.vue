<template>
  <div class="tags">
    <div class="tag-group">
      <div>
        <span style="margin-right: 30px">Light</span>
        <c-tag closable>
          标签一
        </c-tag>
        <c-tag type="success" closable>
          标签二
        </c-tag>
        <c-tag type="info" closable>
          标签三
        </c-tag>
        <c-tag type="warning" closable>
          标签四
        </c-tag>
        <c-tag type="danger" closable>
          标签五
        </c-tag>
      </div>
      <div style="margin-top: 30px">
        <span style="margin-right: 30px">Dark</span>
        <c-tag
          v-for="item in items"
          :key="item.label"
          :type="item.type"
          effect="dark"
          closable
        >
          {{item.label}}
        </c-tag>
      </div>
      <div style="margin-top: 30px">
        <span style="margin-right: 30px">Plain</span>
        <c-tag
          v-for="item in items"
          :key="item.label"
          :type="item.type"
          effect="plain"
          closable
        >
          {{item.label}}
        </c-tag>
        <span>没出样式稿</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Tags',
  data () {
    return {
      items: [
        { type: '', label: '标签一' },
        { type: 'success', label: '标签二' },
        { type: 'info', label: '标签三' },
        { type: 'danger', label: '标签四' },
        { type: 'warning', label: '标签五' }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.tags{
  padding: 20px;
}
.tag-group{
  span {
    margin-right: 10px;
  }
}
</style>
