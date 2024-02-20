<!-- App.vue -->
<template>
  <div id="app">
    <LoginPanel />
    <SalesChart />
    <DataTable />
  </div>
</template>

<script>
import LoginPanel from './components/LoginPanel.vue';
import SalesChart from './components/SalesChart.vue';
import DataTable from './components/DataTable.vue';

export default {
  components: {
    LoginPanel,
    SalesChart,
    DataTable
  }
}
</script>

<style>
/* Your styles */
</style>
