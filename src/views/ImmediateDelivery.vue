<template>
  <div>
    <NavBar />
    <div class="container-delivery">
      Entrega Inmediata
    </div>
    <Footer />
  </div>
</template>

<script>

import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Dashboard',
  components: {
    NavBar,
    Footer
  },
  computed: {
  },
  mounted: function () {
  },
  methods: {
  }
}
</script>
