import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: '',
    userInformation: {},
    chartData: [],
    tableData: [],
    selectedColumns: []
  },
  mutations: {
    setAccessToken(state, token) {
      state.accessToken = token;
    },
    setUserInformation(state, userInfo) {
      state.userInformation = userInfo;
    },
    setChartData(state, data) {
      state.chartData = data;
    },
    setTableData(state, data) {
      state.tableData = data;
    },
    setSelectedColumns(state, columns) {
      state.selectedColumns = columns;
    }
  },
  actions: {
    async fetchChartData({ commit, state }) {
      try {
        const response = await axios.get(`/data/daily-sales-overview?day=${state.selectedDay}&excludeYoYData=true&marketplace=${state.userInformation.marketplaceName}&sellerId=${state.userInformation.storeId}`, {
          headers: {
            Authorization: `Bearer ${state.accessToken}`
          }
        });
        commit('setChartData', response.data);
      } catch (error) {
        console.error('Failed to fetch chart data', error);
      }
    },
    async fetchTableData({ commit, state }) {
      try {
        let endpoint = '/data/daily-sales-sku-list';
        const requestData = {
          isDaysCompare: state.selectedColumns.length === 2 ? 1 : 0,
          marketplace: state.userInformation.marketplaceName,
          pageNumber: 1, // You might need to implement pagination
          pageSize: 30,
          salesDate: state.selectedColumns[0].date,
          salesDate2: state.selectedColumns.length === 2 ? state.selectedColumns[1].date : '',
          sellerId: state.userInformation.storeId
        };
        const response = await axios.post(endpoint, requestData, {
          headers: {
            Authorization: `Bearer ${state.accessToken}`
          }
        });
        commit('setTableData', response.data);
      } catch (error) {
        console.error('Failed to fetch table data', error);
      }
    }
  }
});
