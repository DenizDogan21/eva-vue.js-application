<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Sku</th>
          <th>Total Sales</th>
          <th>Shipping</th>
          <th>Profit</th>
          <th>FBA Sales</th>
          <th>FBM Sales</th>
          <th>SKU Refund Rate</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableData" :key="item.sku">
          <td>{{ item.sku }}</td>
          <td>{{ item.totalSales }}</td>
          <td>{{ item.shipping }}</td>
          <td>{{ item.profit }}</td>
          <td>{{ item.fbaSales }}</td>
          <td>{{ item.fbmSales }}</td>
          <td>{{ item.skuRefundRate }}</td>
        </tr>
      </tbody>
    </table>
    <!-- Pagination -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pageNumber: 1, // Initial page number
      selectedDate1: null, // Initial selected date 1
      selectedDate2: null, // Initial selected date 2
      isDaysCompare: 0 // Initial comparison flag
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await this.$axios.post('/data/daily-sales-sku-list', {
          isDaysCompare: this.isDaysCompare,
          marketplace: this.$store.state.userInformation.marketplaceName,
          pageNumber: this.pageNumber,
          pageSize: 30,
          salesDate: this.selectedDate1,
          salesDate2: this.selectedDate2 || '',
          sellerId: this.$store.state.userInformation.storeId
        });
        // Process the response and update tableData
      } catch (error) {
        console.error('Failed to fetch table data', error);
      }
    },
    async fetchRefundRates(skuList) {
      try {
        const response = await this.$axios.post('/data/get-sku-refund-rate', {
          skuList
        });
        return response.data.refundRates;
      } catch (error) {
        console.error('Failed to fetch SKU refund rates', error);
        return [];
      }
    },
    calculateTotalSales() {
      // Example logic to calculate total sales for a SKU
      let totalSales = 0;
      this.tableData.forEach(item => {
        totalSales += item.totalSales;
      });
      return totalSales;
    },
    calculateShipping() {
      // Example logic to calculate shipping for a SKU
      let shipping = 0;
      this.tableData.forEach(item => {
        shipping += item.shipping;
      });
      return shipping;
    },
    calculateProfit() {
      // Example logic to calculate profit for a SKU
      let profit = 0;
      this.tableData.forEach(item => {
        profit += item.profit;
      });
      return profit;
    },
    calculateFBASales() {
      // Example logic to calculate FBA sales for a SKU
      let fbaSales = 0;
      this.tableData.forEach(item => {
        fbaSales += item.fbaSales;
      });
      return fbaSales;
    },
    calculateFBMSales() {
      // Example logic to calculate FBM sales for a SKU
      let fbmSales = 0;
      this.tableData.forEach(item => {
        fbmSales += item.fbmSales;
      });
      return fbmSales;
    },
  },
  computed: {
    // Implement computed properties
  },
  watch: {
    selectedDate1() {
      this.fetchData();
    },
    selectedDate2() {
      this.fetchData();
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
