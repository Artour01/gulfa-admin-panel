<template>
  <el-dialog title="Create New Product" :visible.sync="value" :before-close="closeModalWindow">
    <div class="create-city">
      <el-form
          :model="form"
          :rules="rules"
          ref="validation-product-form"
          label-position="top">
        <el-form-item prop="categoryId" label="Select Category">
          <el-select v-model="form.categoryId" placeholder="" style="width: calc(50% - 8px)">
            <el-option
                v-for="item of getCategories"
                :label="item.title"
                :value="item.id"
                :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <div class="image-block">
          <img v-if="base64Img" class="image" :src="base64Img" alt="">
          <img v-else-if="image" class="image" :src="image" alt="">
          <div v-else class="image"></div>
          <label class="image-cropper" for="file">Upload new image</label>
          <input style="display: none" type="file" id="file" @change="onChangeFileUpload"/>
        </div>
        <div style="display: grid; grid-template-columns: repeat(2, minmax(300px, 1fr)); grid-column-gap: 15px">
          <el-form-item label="Name" prop="title">
            <el-input v-model="form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Arabic Name" prop="arTitle">
            <el-input v-model="form.arTitle" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Description" prop="description">
            <el-input
                type="textarea"
                :autosize="{ minRows: 3}"
                v-model="form.description"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="Arabic Description" prop="arDescription">
            <el-input
                type="textarea"
                :autosize="{ minRows: 3}"
                v-model="form.arDescription"
            >
            </el-input>
          </el-form-item>
        </div>
        <div style="display: grid; grid-template-columns: repeat(2, 300px); grid-column-gap: 20px">
          <el-form-item label="Price" prop="price">
            <el-input v-model.number="form.price" autocomplete="off" class="form-price"></el-input>
          </el-form-item>
          <el-form-item label="Volume" prop="volume">
            <el-input v-model.number="form.volume" autocomplete="off" class="form-volume"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm" round :loading="loadingSaveChanges">Save Changes</el-button>
      <el-button type="info" @click="openConfirmWindow" round :loading="loadingDelete">Delete</el-button>

    </span>
    <confirmation-window
        dialogText="delete current product"
        :dialogVisible="dialogVisible"
        :handlers="{cancel: closeConfirmWindow, confirm: deleteProduct}"
    />
  </el-dialog>
</template>

<script>
import encodeImage from "@/mixins/encodeImage";
import ConfirmationWindow from "@/components/ConfirmationWindow";
import confirmation from "@/mixins/confirmation";
import rules from "@/helpers/validationRules";

export default {
  name: "EditProductN",
  components: {ConfirmationWindow},
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rules,
      loadingSaveChanges: false,
      form: {
        description: '',
        arDescription: '',
        price: '',
        title: '',
        arTitle: '',
        volume: '',
        categoryId: ''
      },
      image: null
    }
  },
  mixins: [encodeImage, confirmation],
  computed: {
    getCategories() {
      return this.$store.state.products.categories
    },
    getSelectedProduct() {
      return this.$store.getters.getSelectedProduct
    }
  },
  async created() {
    this.form.volume = this.getSelectedProduct.volume
    this.form.price = this.getSelectedProduct.price
    this.form.title = this.getSelectedProduct.title
    this.form.arTitle = this.getSelectedProduct.titleAr
    this.form.arDescription = this.getSelectedProduct.descriptionAr
    this.image = this.getSelectedProduct.imageUri
    this.form.description = this.getSelectedProduct.description
    this.form.categoryId = this.getSelectedProduct.categoryId
  },
  methods: {
    submitForm() {
      let vm = this
      this.$refs['validation-product-form'].validate(async (valid) => {
        if (valid) {
          let formdata = null
          if (this.file) {
            formdata = new FormData()
            formdata.append('file', this.file)
          }
          let {arDescription: description, arTitle: title, ...data} = this.form
          let dataAr = {
            ...data,
            title,
            description
          }
          await this.$store.dispatch('putProduct', {data, formdata, dataAr})

          this.closeModalWindow()
        } else {
          await vm.$store.dispatch('setErrorMessage', 'Error with validation')
          return false;
        }
      });
    },
    async deleteProduct() {
      this.$store.commit('setLoading')
      await this.$store.dispatch('deleteProduct')
      this.$store.commit('unsetLoading')
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
