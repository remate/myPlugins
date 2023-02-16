'use strict'

function _broadcast (componentName, eventName, params) {
  this.$children.forEach(function (child) {
    const name = child.$options.name || child.$options.componentName

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      _broadcast.apply(child, [componentName, eventName].concat([params]))
    }
  })
}

export default {
  methods: {
    dispatch: function dispatch (componentName, eventName, params) {
      let parent = this.$parent || this.$root
      let name = parent.$options.name || parent.$options.componentName

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent

        if (parent) {
          name = parent.$options.name || parent.$options.componentName
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },
    broadcast: function broadcast (componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params)
    }
  }
}
