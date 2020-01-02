<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="info"
    >
      <b-navbar-brand href="/">เซียนเก๋า</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse
        id="nav-collapse"
        is-nav
      >
        <b-navbar-nav>
          <b-nav-item @click="goto('/Register')">Register</b-nav-item>
          <b-nav-item @click="goto('/Users')">Users</b-nav-item>
          <b-nav-item @click="goto('/Add')">GClub</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-button
            v-if="this.$store.state.loggedIn"
            size="sm"
            class="my-2 my-sm-0"
            @click="logout"
          >Logout</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  props: { currenPath: String },
  data () {
    return {
      currentPath: '',
      active: true
    }
  },
  methods: {
    goto (url) {
      this.$router.replace(url)
    },
    logout () {
      this.$store.set('loggedIn', false)
      setTimeout(() => {
        this.$router.push('Login')
      }, 1500)
    }
  }
}
</script>
