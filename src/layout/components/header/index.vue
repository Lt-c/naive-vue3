<!--
 * @Author: Lt-c 1257497382@qq.com
 * @Date: 2022-08-29 00:53:07
 * @LastEditors: Lt-c 1257497382@qq.com
 * @LastEditTime: 2022-09-02 14:26:23
 * @FilePath: \wen-naive-admin\src\layout\components\header\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import MenuCollaose from './components/MenuCollapse.vue'
import BreadCrumb from './components/BreadCrumb.vue' /* 面包屑 */
</script>

<template>
  <div flex items-center>
    <MenuCollaose ml-8 />
    <BreadCrumb ml-10 />
  </div>
  <div ml-auto flex items-center>
    <div>right</div>
  </div>
</template>
