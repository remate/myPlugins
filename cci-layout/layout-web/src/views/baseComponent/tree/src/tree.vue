<template>
  <div class="tree">
    <h3>基础</h3>
    <c-tree
      class="content"
      :data="data"
      :props="defaultProps"
      @node-click="handleNodeClick"
    />
    <h3>可选</h3>
    <c-tree
      class="content"
      default-expand-all
      :data="data"
      show-checkbox
      node-key="id"
      :default-expanded-keys="[2, 3]"
      :default-checked-keys="[5]"
    />
  </div>
</template>
<script>
export default {
  name: 'Tree',
  data () {
    return {
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1',
            disabled: true
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick (data) {
      console.log(data)
    }
  }
}
</script>
<style lang="scss" scoped>
.tree{
  padding: 20px;
  .content{
    width: 400px;
  }
}
</style>
