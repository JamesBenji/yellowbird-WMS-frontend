<template>
    <div class="w-full h-80">
      <p class="mb-4 font-medium">Sales Chart</p>
      <apexchart
        type="line"
        :options="options"
        :series="series"
        height="100%"
      ></apexchart>
    </div>
  </template>

<script>
import VueApexCharts from 'vue3-apexcharts'

export default {
  components: {
    apexchart: VueApexCharts
  },
  data () {
    return {
      options: {
        chart: {
          id: 'line-chart',
          zoom: { enabled: false }
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: '100%'
            }
          }
        }]
      },
      series: [{
        name: 'Sales',
        data: [30, 40, 35, 50, 49]
      }]
    }
  }
}
</script>
