<template>
  <div class="main-layout">
    <AdminMenu
        v-model="menu"
    />
    <div class="side-menu">
      <Logo/>
      <ul>
        <li v-for="(page, index) of pages" :key="index">
          <router-link class="link" :to="`/${page.name.toLowerCase()}`">
          <span
              :class="[page.name.toLowerCase(), {active: route === page.name.toLowerCase()}]"
              class="link-logo"
          ></span>
            {{ page.name }}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import AdminMenu from "@/components/helpers/AdminMenu";

const Logo = () => import('@/components/helpers/Logo')
export default {
  name: "MainLayout",
  data() {
    return {
      pages: [
        {
          name: 'Products',
        },
        {
          name: 'Orders',
        },
        {
          name: 'Customers',
        },
        {
          name: 'Drivers',
        },
        {
          name: 'Payments',
        },
        {
          name: 'Sale',
        },
        {
          name: 'Promo',
        },
        {
          name: 'Notifications',
        },
        {
          name: 'Banners',
        },
      ],
      menu: false
    }
  },
  components: {
    AdminMenu,
    Logo
  },
  computed: {
    route() {
      return this.$route.name
    }
  }
}
</script>

<style>
</style>
