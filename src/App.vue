<template>
  <div>
    <component :is="layout">
      <router-view
          @success-action="successMessage"
          @error-action="errorMessage"
      ></router-view>
    </component>
  </div>
</template>

<script>
import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";

export default {
  name: 'App',
  metaInfo() {
    return {
      title: `${this.$route.meta.name} | Gulfa Admin`,
    }
  },
  components: {
    MainLayout,
    AuthLayout
  },
  computed: {
    layout () {
      return `${this.$route.meta.layout || 'auth'}-layout`
    }
  },
  methods: {
    successMessage () {
      this.$message({
        message: 'Success',
        type: 'success',
        center: true
      });
    },
    errorMessage () {
      this.$message({
        message: 'Error',
        type: 'error',
        center: true
      });
    }
  }
}
</script>

<style>
</style>
