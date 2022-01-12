<template>
  <div class="profile">
    <div class="base" v-click-outside="hide" @click="openClose">
      <i class="el-icon-user user-icon" />
      <p class="title">{{email}}</p>
    </div>
    <transition name="slide-fade">
      <div class="menu" v-if="value">
        <p
            v-if="getAdminRole"
            @click="$router.push('/workers')"
            class="title">Employee</p>
        <p
            @click="logOut"
            class="title">Logout</p>
      </div>
    </transition>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import {mapState} from 'vuex'
export default {
  name: "AdminMenu",
  props: ['value'],
  computed: {
    ...mapState(['me']),
    getAdminRole() {
      return this.$store.state.roles.includes('GulfaOwner')
    },
    email() {
      return this.me?.email
    }
  },
  methods: {
    openClose () {
      this.menu = !this.menu
      this.$emit('input', this.menu)
    },
    hide(){
      this.menu = false
      this.$emit('input', false)
    },
    logOut() {
      localStorage.removeItem('token')
      localStorage.removeItem('roles')
      localStorage.removeItem('me')
      this.$store.commit('setToken', '')
      this.$store.commit('setRoles', [])
      this.$router.push('auth')
    }
  },
  directives: {
    ClickOutside
  }
}
</script>

<style lang="scss" scoped>

.user-icon {
  margin-right: 8px;
  font-size: 18px;
}
</style>
