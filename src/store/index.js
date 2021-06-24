import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

Vue.use(Vuex);

// 当store中文件过多时，可以动态加载modules文件下的所有JS文件,可参考
// https://webpack.js.org/guides/dependency-management/#requirecontext

// 获取moudules文件下所有js文件
const context = require.context('./modules', false, /\.js$/);

// context.keys() 返回匹配成功模块的名字组成的数组
const modules = context.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  // 通过context(key)导出文件内容。在文件中时通过export.default导出的，所以后边加.default
  const fileModule = context(modulePath);
  modules[moduleName] = fileModule.default;
  return modules;
}, {});

const store = new Vuex.Store({
  modules,
  getters
});
export default store;
