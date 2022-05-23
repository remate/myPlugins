import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import { createRouter } from './router'
import Layout from '../layout'

export default createRouter(Layout)

