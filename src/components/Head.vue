<template>
  <div>
       <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="/">NavBar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item @click="goto('/Register')"  :class="[linkActiveClass && 'active-class', linkExactActiveClass && 'exact-active-class']">Register</b-nav-item>
        <b-nav-item @click="goto('/Users')"  :class="[linkActiveClass && 'active-class', linkExactActiveClass && 'exact-active-class']">Users</b-nav-item>
        <b-nav-item @click="goto('/Add')"  :class="[linkActiveClass && 'active-class', linkExactActiveClass && 'exact-active-class']">GClub</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentPath: '',
      active: true
    }
  },
  methods: {
    goto (url) {
      this.$router.replace(url)
    }
  }
}
</script>
