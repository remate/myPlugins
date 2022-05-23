import Vue from 'vue'
import ellipsis from './ellipsis'

const directives = {
  ellipsis
}

Object.keys(directives).forEach(name => Vue.directive(name, directives[name]))
