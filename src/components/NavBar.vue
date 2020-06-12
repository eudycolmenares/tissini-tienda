<template>
  <nav class="navbar">
    <div class="title">{{ name }}</div>
    <div class="actions">
      <a>&#9990;</a>
      <a @click="logout">&#10006;</a>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  computed: {
    name () {
      return this.$store.state.customer.name
    }
  },
  methods: {
    logout: function () {
      this.$store.commit('setCustomer', null)
      const navigate = this.$router
      navigate.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss">
.navbar {
  z-index: 10;
  height: 3rem;
  display: grid;
  grid-template-columns: auto 8rem;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  background-color: #f5f5f5;
  box-shadow: 0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);
  position: fixed;
  top: 0;
  width: 100%;
  .title {
    color: #f06292;
    font-size: 1.3rem;
    letter-spacing: .02em;
    padding: 0 0 0 1rem;
  }
  .actions {
    text-align: right;
    a {
      color: #f06292;
      font-size: 1.8rem;
      text-decoration: none;
      margin: 0 1rem;
      cursor: pointer;
      &:hover {
        background: #ddd;
        color: black;
      }
    }
  }
}
</style>
