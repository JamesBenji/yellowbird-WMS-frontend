<template>
  <div class="w-full h-20">
    <apexchart
      type="line"
      :options="chartOptions"
      :series="chartSeries"
      height="100%"
    />
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'

export default {
  name: 'TrendChart',
  components: {
    apexchart: VueApexCharts
  },
  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
    },
    labels: {
      type: Array,
      required: true,
      default: () => []
    },
    lineColor: {
      type: String,
      default: '#010101' // Simplified default
    }
  },
  methods: {
    // Helper function to determine if a color is dark or light
    getTextColor (bgColor) {
      // Remove '#' if present and convert to RGB
      const hex = bgColor.replace('#', '')
      const r = parseInt(hex.substr(0, 2), 16)
      const g = parseInt(hex.substr(2, 2), 16)
      const b = parseInt(hex.substr(4, 2), 16)

      // Calculate luminance (perceived brightness)
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

      // Return white for dark backgrounds, black for light backgrounds
      return luminance < 0.5 ? '#ffffff' : '#000000'
    }
  },
  computed: {
    chartOptions () {
      return {
        chart: {
          id: 'trend-chart',
          zoom: { enabled: false },
          toolbar: { show: false },
          sparkline: { enabled: false }
        },
        xaxis: {
          categories: this.labels.length > 0 ? this.labels : ['No Data'],
          labels: { show: false },
          axisBorder: { show: false },
          axisTicks: { show: false }
        },
        yaxis: { labels: { show: false } },
        grid: { show: false },
        stroke: {
          curve: 'smooth',
          width: 2,
          colors: [this.lineColor, this.lineColor] // Corrected reference using 'this'
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 0,
            opacityFrom: 0.3,
            opacityTo: 1,
            stops: [0, 90, 100]
          }
        },
        markers: {
          size: 0, // Show dots on the chart
          colors: [this.lineColor], // Marker color matches lineColor
          strokeColors: '#fff', // Optional: white border
          strokeWidth: 1, // Optional: border width
          hover: {
            size: 6 // Larger size on hover
          }
        },
        tooltip: {
          enabled: true,
          custom: ({ series, seriesIndex, dataPointIndex, w }) => {
            const label = w.globals.labels[dataPointIndex] || 'Unknown'
            const value = series[seriesIndex][dataPointIndex]
            const markerColor = this.lineColor // Background color for label
            const textColor = this.getTextColor(markerColor)
            return `
              <div class="p-2 bg-white border border-gray-200 rounded shadow-sm " style="background-color: ${markerColor}; color: ${textColor}">
                <div class="text-sm font-medium text-gray-900" style="color: ${textColor}">${label}</div>
                <div class="text-xs text-gray-600" style="color: ${textColor}">Value: ${value}</div>
              </div>
            `
          },
          style: {
            fontSize: '12px',
            fontFamily: 'inherit'
          },
          marker: { show: false },
          theme: 'light',
          shared: true,
          intersect: false
        },
        dataLabels: { enabled: false }
      }
    },
    chartSeries () {
      return [
        {
          name: 'Trend',
          data: this.data.length > 0 ? this.data : [0]
        }
      ]
    }
  }
}
</script>
