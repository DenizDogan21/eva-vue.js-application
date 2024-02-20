<template>
  <div>
    <highcharts-vue :options="chartOptions"></highcharts-vue>
  </div>
</template>

<script>
import Highcharts from 'highcharts';
import HighchartsVue from 'highcharts-vue';

export default {
  name: 'SalesChart',
  components: {
    HighchartsVue
  },
  props: {
    day: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      chartData: []
    };
  },
  async mounted() {
    await this.fetchChartData();
    this.renderChart();
  },
  watch: {
    day() {
      this.fetchChartData();
    }
  },
  methods: {
    async fetchChartData() {
      try {
        const response = await this.$axios.get('/data/daily-sales-overview', {
          params: {
            customDateData: null,
            day: this.day,
            excludeYoYData: true,
            marketplace: this.$store.state.userInformation.marketplaceName,
            requestStatus: 0,
            sellerId: this.$store.state.userInformation.storeId
          }
        });
        // Process the response and update chartData
      } catch (error) {
        console.error('Failed to fetch chart data', error);
      }
    },
    renderChart() {
      const categories = this.chartData.map(data => data.date);
      const fbaSales = this.chartData.map(data => data.fbaAmount);
      const fbmSales = this.chartData.map(data => data.fbmAmount);

      Highcharts.chart(this.$refs.chartContainer, {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Daily Sales Overview'
        },
        xAxis: {
          categories: categories
        },
        yAxis: {
          title: {
            text: 'Sales Amount'
          }
        },
        series: [{
          name: 'FBA Sales',
          data: fbaSales
        }, {
          name: 'FBM Sales',
          data: fbmSales
        }]
      });
    }
  },
};
</script>
