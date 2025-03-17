<template>
    <div class="min-h-screen p-4 md:p-8" :style="{backgroundColor: BG_GREY}">
        <!-- Header -->
        <header class="mb-8">
            <h1 class="text-4xl font-bold" :style="{color: YELLOW}">Dashboard</h1>
        </header>

        <!-- Stats Cards -->
        <div class="w-full overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-200 mb-4 pb-2 scrollbar-track-white">
            <div class="grid grid-flow-col auto-cols-max gap-4 ">
                <!-- Stock In Card -->
                <StatsCard title="Stock In" :value="stockInPending.toString()"
                    :percentage="stockInReceivedPercentage + '%'" iconSrc="/icons/stock-in.svg"
                    info="This is a stock in card">
                    <div class="flex flex-col">
                        <div class="flex items-baseline">
                            <p class="text-2xl w-full font-semibold text-gray-900 text-center">{{ stockInPending }} / {{
                                stockInReceived }}</p>
                        </div>
                        <p class="text-xs text-gray-500 mt-1">Pending / Received</p>
                        <TrendChart v-if="stockInTrendData.length > 0 && stockInTrendLabels.length > 0"
                            :data="stockInTrendData" :labels="stockInTrendLabels" class="mt-2 h-20"
                            :line-color="BLUE" />
                        <div v-else class="text-xs text-gray-500 mt-2">No trend data available</div>
                    </div>
                </StatsCard>

                <!-- Inspections Card -->
                <StatsCard title="Inspections" :value="inspectionsPending.toString()"
                    :percentage="inspectionsPassRate + '%'" iconSrc="/icons/inspection.svg" iconClass="bg-purple-500">
                    <div class="flex flex-col">
                        <div class="flex items-baseline">
                            <p class="text-2xl font-semibold text-gray-900">{{ inspectionsPending }} / {{
                                inspectionsCompleted }}</p>
                        </div>
                        <p class="text-xs text-gray-500 mt-1">Pending / Completed</p>
                        <TrendChart v-if="inspectionsTrendData.length > 0" :data="inspectionsTrendData"
                            :labels="inspectionsTrendLabels" class="mt-2 h-20" :line-color="GREEN" />
                        <div class="mt-2 flex justify-between text-xs text-gray-600">
                            <span>Pass: {{ inspectionsPassed }}</span>
                            <span>Fail: {{ inspectionsFailed }}</span>
                        </div>
                    </div>
                </StatsCard>

                <!-- Putaway Card -->
                <StatsCard title="Put-away" :value="putawayPending.toString()" :percentage="putawayEfficiency + '%'"
                    iconSrc="/icons/putaway.svg" iconClass="bg-green-500">
                    <div class="flex flex-col">
                        <div class="flex items-baseline">
                            <p class="text-2xl font-semibold text-gray-900">{{ putawayPending }} / {{ putawayCompleted
                            }}</p>
                        </div>
                        <p class="text-xs text-gray-500 mt-1">Pending / Completed</p>
                        <TrendChart v-if="putawayTrendData.length > 0" :data="putawayTrendData"
                            :labels="putawayTrendLabels" class="mt-2 h-20" :line-color="ORANGE" />
                        <div class="mt-2 flex justify-between text-xs text-gray-600">
                            <span>Avg Time: {{ putawayAvgTime }}h</span>
                            <span>Priority: {{ putawayPriority }}</span>
                        </div>
                    </div>
                </StatsCard>

                <!-- Stocks Out Card -->
                <StatsCard title="Stock Out" :value="stockOutProcessing.toString()"
                    :percentage="stockOutDispatchedPercentage + '%'" iconSrc="/icons/stock-out.svg"
                    info="This is a stock-out in card">
                    <div class="flex flex-col">
                        <div class="flex items-baseline">
                            <p class="text-2xl font-semibold text-gray-900">{{ stockOutProcessing }} / {{
                                stockOutDispatched }}</p>
                        </div>
                        <p class="text-xs text-gray-500 mt-1">Processing / Dispatched</p>
                        <TrendChart v-if="stockOutTrendData.length > 0 && stockOutTrendLabels.length > 0"
                            :data="stockOutTrendData" :labels="stockOutTrendLabels" class="mt-2 h-20"
                            :line-color="YELLOW" />
                        <div v-else class="text-xs text-gray-500 mt-2">No trend data available</div>
                        <div class="mt-2 flex justify-between text-xs text-gray-600">
                            <span>Total Items: {{ stockOutTotalItems }}</span>
                            <span>Total Quantity: {{ stockOutTotalQuantity }}</span>
                        </div>
                    </div>
                </StatsCard>

                <!-- Returns Card -->
                <StatsCard title="Returns" :value="returnsPending.toString()"
                    :percentage="returnsReceivedPercentage + '%'" iconSrc="/icons/return.svg"
                    info="This is a return card">
                    <div class="flex flex-col">
                        <div class="flex items-baseline">
                            <p class="text-2xl font-semibold text-gray-900">{{ returnsPending }} / {{ returnsReceived }}
                            </p>
                        </div>
                        <p class="text-xs text-gray-500 mt-1">Pending / Received</p>
                        <TrendChart v-if="returnsTrendData.length > 0 && returnsTrendLabels.length > 0"
                            :data="returnsTrendData" :labels="returnsTrendLabels" class="mt-2 h-20"
                            :line-color="PURPLE" />
                        <div v-else class="text-xs text-gray-500 mt-2">No trend data available</div>
                        <div class="mt-2 flex justify-between text-xs text-gray-600">
                            <span>Inspections: {{ returnsInspectionsPending }}</span>
                            <span>Completed: {{ returnsCompleted }}</span>
                        </div>
                    </div>
                </StatsCard>
            </div>
        </div>

        <!-- Main Content Sections -->
        <div class="space-y-6">
            <!-- Stock In Section -->
            <DashboardSection title="Stock In">
                <DataTable
                    :headers="['$/N', 'Incoming Stock ID', 'Arrival Date/Time', 'Warehouse ID', 'Total Items', 'Receiver ID', 'Comments', 'Last Updated']"
                    :rows="sampleStockInData" />
            </DashboardSection>

            <!-- Put-away Section -->
            <DashboardSection title="Put-away">
                <DataTable
                    :headers="['$/N', 'Batch No', 'Item SKU', 'Item Name', 'Warehouse ID', 'Status', 'Quantity', 'Nearest Expiration', 'Vendor ID', 'Last Updated']"
                    :rows="samplePutAwayData" />
            </DashboardSection>

            <!-- Stock Out Section -->
            <DashboardSection title="Stock Out">
                <DataTable
                    :headers="['$/N', 'Order ID', 'Total Items', 'Total Quantity', 'Key Item Name', 'Destination Address', 'Logistics Provider', 'Company ID', 'Comments', 'Last Updated']"
                    :rows="sampleStockOutData" />
            </DashboardSection>

            <!-- Returns Section -->
            <DashboardSection title="Returns">
                <DataTable
                    :headers="['$/N', 'Dispatch date', 'Order No', 'Items', 'Received Items Count', 'Total Quantity', 'Inspection Status', 'Disposition Status', 'Completion Date', 'Last Updated']"
                    :rows="sampleReturnsData" />
            </DashboardSection>
        </div>
    </div>
</template>

<script>
import StatsCard from '../components/StatsCard.vue'
import DashboardSection from '../components/DashboardSection.vue'
import DataTable from '../components/DataTable.vue'
import TrendChart from '../components/TrendChart.vue'
import { BLUE, YELLOW, PURPLE, ORANGE, GREEN, BG_GREY } from '../config/colors'

export default {
  components: {
    DashboardSection,
    DataTable,
    TrendChart,
    StatsCard
  },
  data () {
    return {
      sampleStockInData: [
        ['1', 'INC-001', '2023-08-01 10:00', 'WH-01', '100', 'USR-01', 'No issues', '2023-08-01 10:05'],
        ['2', 'INC-002', '2023-08-01 11:00', 'WH-02', '150', 'USR-02', 'Urgent', '2023-08-01 11:05']
      ],
      samplePutAwayData: [
        ['1', 'BATCH-001', 'SKU-001', 'Item 1', 'WH-01', 'Pending', '50', '2024-01-01', 'VEND-01', '2023-08-01 10:00']
      ],
      sampleStockOutData: [
        ['1', 'ORD-001', '5', '25', 'Key Item 1', '123 Main St', 'Fast Logistics', 'COMP-01', 'Fragile', '2023-08-01 09:00'],
        ['2', 'ORD-002', '3', '15', 'Key Item 2', '456 Oak St', 'Swift Logistics', 'COMP-02', 'Handle with care', '2023-08-02 09:00']
      ],
      sampleReturnsData: [
        ['1', '2023-08-01', 'ORD-001', '5 Items', '5', '25', 'Pending', 'Processing', '2023-08-05', '2023-08-01 10:00'],
        ['2', '2023-08-02', 'ORD-002', '3 Items', '2', '15', 'Completed', 'Approved', '2023-08-06', '2023-08-02 10:00']
      ],
      samplePutawayData: [
        ['PA-001', 'BATCH-001', 'WH-01', 'Pending', '2023-08-01', '2h'],
        ['PA-002', 'BATCH-002', 'WH-02', 'Completed', '2023-08-02', '1.5h']
      ],
      sampleInspectionsData: [
        ['INS-001', 'WH-01', 'Pending', '2023-08-01', 'Quality Check'],
        ['INS-002', 'WH-02', 'Passed', '2023-08-02', 'Random Audit']
      ],
      // Trend data for all cards
      stockInTrend: [120, 135, 150, 165, 180], // Increasing stock in trend
      stockOutTrend: [80, 95, 110, 105, 120], // Fluctuating stock out trend
      returnsTrend: [15, 12, 18, 20, 16], // Returns trend data
      trendLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], // Common labels for all trends
      putawayTrend: [15, 18, 20, 22, 25],
      inspectionsTrend: [8, 10, 12, 9, 11],
      putawayLabels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
      BLUE,
      YELLOW,
      PURPLE,
      ORANGE,
      GREEN,
      BG_GREY
    }
  },
  computed: {
    // Stock In Metrics
    stockInPending () {
      return this.sampleStockInData.length
    },
    stockInReceived () {
      return this.sampleStockInData.reduce((total, row) => total + parseInt(row[4]), 0)
    },
    stockInReceivedPercentage () {
      const totalExpected = this.stockInReceived + this.stockInPending
      return totalExpected ? Math.round((this.stockInReceived / totalExpected) * 100) : 0
    },
    stockInTrendData () {
      return this.stockInTrend
    },
    stockInTrendLabels () {
      return this.trendLabels
    },

    // Stocks Out Metrics
    stockOutProcessing () {
      return this.sampleStockOutData.length
    },
    stockOutDispatched () {
      return this.sampleStockOutData.reduce((total, row) => total + parseInt(row[3]), 0)
    },
    stockOutDispatchedPercentage () {
      const totalExpected = this.stockOutDispatched + this.stockOutProcessing
      return totalExpected ? Math.round((this.stockOutDispatched / totalExpected) * 100) : 0
    },
    stockOutTotalItems () {
      return this.sampleStockOutData.reduce((total, row) => total + parseInt(row[2]), 0)
    },
    stockOutTotalQuantity () {
      return this.sampleStockOutData.reduce((total, row) => total + parseInt(row[3]), 0)
    },
    stockOutTrendData () {
      return this.stockOutTrend
    },
    stockOutTrendLabels () {
      return this.trendLabels
    },

    // Returns Metrics
    returnsPending () {
      return this.sampleReturnsData.filter(row => row[6] === 'Pending').length
    },
    returnsReceived () {
      return this.sampleReturnsData.reduce((total, row) => total + parseInt(row[4]), 0)
    },
    returnsReceivedPercentage () {
      const totalExpected = this.returnsReceived + this.returnsPending
      return totalExpected ? Math.round((this.returnsReceived / totalExpected) * 100) : 0
    },
    returnsInspectionsPending () {
      return this.sampleReturnsData.filter(row => row[6] === 'Pending').length
    },
    returnsCompleted () {
      return this.sampleReturnsData.filter(row => row[7] === 'Approved').length
    },
    returnsTrendData () {
      return this.returnsTrend
    },
    returnsTrendLabels () {
      return this.trendLabels
    },
    // Putaway Metrics
    putawayPending () {
      return this.samplePutawayData.filter(item => item[3] === 'Pending').length
    },
    putawayCompleted () {
      return this.samplePutawayData.filter(item => item[3] === 'Completed').length
    },
    putawayEfficiency () {
      return this.putawayCompleted
        ? Math.round((this.putawayCompleted / this.samplePutawayData.length) * 100)
        : 0
    },
    putawayAvgTime () {
      const times = this.samplePutawayData
        .filter(item => item[3] === 'Completed')
        .map(item => parseFloat(item[5].replace('h', '')))
      return times.length
        ? (times.reduce((a, b) => a + b) / times.length).toFixed(1)
        : 0
    },
    putawayPriority () {
      return this.putawayPending > 5 ? 'High' : 'Normal'
    },
    putawayTrendData () {
      return this.putawayTrend
    },
    putawayTrendLabels () {
      return this.putawayLabels
    },

    // Inspections Metrics
    inspectionsPending () {
      return this.sampleInspectionsData.filter(item => item[2] === 'Pending').length
    },
    inspectionsCompleted () {
      return this.sampleInspectionsData.length - this.inspectionsPending
    },
    inspectionsPassRate () {
      return this.inspectionsCompleted
        ? Math.round((this.inspectionsPassed / this.inspectionsCompleted) * 100)
        : 0
    },
    inspectionsPassed () {
      return this.sampleInspectionsData.filter(item => item[2] === 'Passed').length
    },
    inspectionsFailed () {
      return this.inspectionsCompleted - this.inspectionsPassed
    },
    inspectionsTrendData () {
      return this.inspectionsTrend
    },
    inspectionsTrendLabels () {
      return this.putawayLabels
    }
  }
}
</script>
