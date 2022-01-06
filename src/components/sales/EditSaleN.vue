<template>
  <el-dialog title="Edit Sale" :visible.sync="value" :before-close="closeModalWindow">
    <div class="create-sale">
      <el-form
          :model="form"
          :rules="rules"
          ref="validation-product-form"
          label-position="top">
        <el-form-item label="Select the % of Sale" prop="percent">
          <el-input-number v-model.number="form.percent" :min="1" :max="99"></el-input-number>
          <!--          <el-input v-model.number="form.selectPercent" autocomplete="off"></el-input>-->
        </el-form-item>

        <div style="display: grid; grid-template-columns: repeat(2, minmax(300px, 1fr)); grid-column-gap: 15px">

          <el-form-item label="From" prop="startDate">
            <el-date-picker
                style="width: 100%"
                v-model="form.startDate"
                type="date"
                placeholder="Pick a date">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="To" prop="endDate">
            <el-date-picker
                style="width: 100%"
                v-model="form.endDate"
                type="date"
                :picker-options="pickerOptionsE"
                placeholder="Pick a date">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="Title" prop="title_en">
            <el-input v-model="form.title_en" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="Title (Arabic)" prop="title_ar">
            <el-input v-model="form.title_ar" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="Description" prop="description">
            <el-input
                type="textarea"
                :autosize="{ minRows: 3}"
                v-model="form.description_en"
            >
            </el-input>
          </el-form-item>

          <el-form-item label="Description (Arabic)" prop="arDescription">
            <el-input
                type="textarea"
                :autosize="{ minRows: 3}"
                v-model="form.description_ar"
            />
          </el-form-item>
        </div>

        <el-form-item label="Select Products" prop="typeOfSale">
          <el-select v-model="form.shopItemsId" placeholder="" style="width: 100%" multiple>
            <el-option
                v-for="item of getProducts"
                :label="item.title"
                :value="item.id"
                :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm" round :loading="loadingSaveChanges">Save Changes</el-button>
      <el-button type="info" @click="openConfirmWindow" round :loading="loadingDelete">Delete</el-button>
    </span>
    <confirmation-window
        dialogText="delete current sale"
        :dialogVisible="dialogVisible"
        :handlers="{cancel: closeConfirmWindow, confirm: deleteSale}"
    />
  </el-dialog>
</template>

<script>
import ConfirmationWindow from "@/components/ConfirmationWindow";
import confirmation from "@/mixins/confirmation";
import rules from "@/helpers/validationRules";

export default {
  name: "EditSaleN",
  components: {ConfirmationWindow},
  props: {
    value: {
      type: Boolean,
      default: false
    },
    saleId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      rules,
      loadingSaveChanges: false,
      form: {
        description_en: '',
        description_ar: '',
        title_en: '',
        title_ar: '',
        startDate: null,
        endDate: null,
        shopItemsId: [],
        percent: 1,
      }
    }
  },
  mixins: [confirmation],
  created() {
    this.form = {...this.$store.getters.getCurrentSale}
  },
  computed: {
    getProducts() {
      return this.$store.state.products.data
    },
    pickerOptionsE() {
      let vm = this
      return {
        disabledDate(time) {
          let limitDate = vm.form.startDate ? vm.form.startDate.getTime() : Date.now()
          return time.getTime() < limitDate;
        }
      }
    },
  },
  methods: {
    submitForm() {
      let vm = this
      this.$refs['validation-product-form'].validate(async (valid) => {
        if (valid) {
          let {title_en, description_en, title_ar, description_ar, startDate, endDate, ...data} = this.form
          let [yearS, monthS, dayS] = startDate.split('-')
          let [yearE, monthE, dayE] = endDate.split('-')
          startDate = `${yearS}-${monthS}-${dayS}T00:00:00`
          endDate = `${yearE}-${monthE}-${dayE}T00:00:00`

          const cultureViewModel = [
            {id: 'en', title: title_en, description: description_en},
            {id: 'ar', title: title_ar, description: description_ar},
          ]

          data = {...data, startDate, endDate, cultureViewModel}

          await this.$store.dispatch('putSale', {data, id: this.saleId})
          this.closeModalWindow()
        } else {
          await vm.$store.dispatch('setErrorMessage', 'Error with validation')
          return false;
        }
      });
    },
    async deleteSale() {
      await this.$store.dispatch('deleteSale', this.saleId)
      this.closeConfirmWindow()
      this.closeModalWindow()
    },
    closeModalWindow() {
      this.$emit('input', false)
    }
  }
}
</script>

<style>
</style>
