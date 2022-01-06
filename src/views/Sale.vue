<template>
  <div id="sale">
    <TopRow
        btnSwitch
        :btn-background="'#ED1C24'"
        btn-text="Create New Sale"
        v-model="lang"
        @search="searchValue = $event"
        @btn-click="showAddSale = true"
    />
    <sale-item
        v-for="(item,index) of getReformatSales(searchValue)"
        :key="index"
        :item="item"
        :lang="lang"
        @edit-item="editSale"
    />
    <add-sale-n
        v-if="showAddSale"
        v-model="showAddSale"
    />
    <edit-sale-n
        v-if="showEditSale"
        :sale-id="saleId"
        v-model="showEditSale"
    />
  </div>
</template>

<script>
import TopRow from "@/components/helpers/TopRow";
import SaleItem from "@/components/helpers/SaleItem";
import AddSaleN from "@/components/sales/AddSaleN";
import EditSaleN from "@/components/sales/EditSaleN";
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "Sale",
  components: {EditSaleN, AddSaleN, SaleItem, TopRow},
  data() {
    return {
      lang: 'en',
      showAddSale: false,
      saleId: '',
      showEditSale: false,
      searchValue: ''
    }
  },
  async created() {
    await this.getSales()
    await this.getProducts()
  },
  computed: {
    ...mapGetters(['getReformatSales'])
  },
  methods: {
    ...mapActions(['getSales', 'getProducts', 'setCurrentSale']),
    editSale(id) {
      this.setCurrentSale(id)
      this.saleId = id
      this.showEditSale = true
    }
  }
}
</script>

<style>

</style>
