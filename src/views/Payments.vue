<template>
  <div id="payments">
    <TopRow
        @search="searchValue = $event"
    />
    <el-table
        :data="getPayments(searchValue)"
        style="width: 100%"
        header-cell-class-name="header-cell"
        header-row-class-name="header-row"
        cell-class-name="table-cell"
    >
      <el-table-column
          prop="paymentId"
          label="Payment ID"
          width="550">
      </el-table-column>
      <el-table-column
          prop="orderId"
          label="Order ID"
          width="80">
      </el-table-column>
      <el-table-column
          prop="dateTime"
          label="Date&Time">
      </el-table-column>
      <el-table-column
          prop="customerName"
          label="Customer Name">
      </el-table-column>
      <el-table-column
          prop="price"
          label="Price"
          width="80">
      </el-table-column>
      <el-table-column
          prop="paymentMethod"
          label="Payment Method">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {payments} from "@/test-data/payments";
import {paymentsHeaders} from "@/test-data/headers";
import TopRow from "@/components/helpers/TopRow";
import {mapGetters} from 'vuex'

export default {
  name: "Payments",
  components: {
    TopRow
  },
  data() {
    return {
      titles: paymentsHeaders,
      payments: payments,
      searchValue: ''
    }
  },
  computed: {
    ...mapGetters(['getPayments'])
  },
  async created() {
    await this.$store.dispatch('fetchPayments')
  },
}
</script>

<style>
</style>
