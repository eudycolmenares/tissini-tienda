<template>
  <div>
    <NavBar />
    <div class="container-delivery">
      <div class="container-info-delivery">
        <div class="title-main">
          <label>Productos disponibles</label>
        </div>
        <div class="producto-detail" v-for="prod in products" :key="prod.id">
          <img :src="[prod.images.length > 0 ? 'https://api.tissini.app' + prod.images[0].url : 'https://api.tissini.app/img/products/not_found.jpg' ]" style="width:100%">
          <div class="info">
            <button>&#128722; Agregar</button>
            <span>${{ prod.price }}</span>
          </div>
        </div>
      </div>
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
  data: function () {
    return {
      products: this.$store.state.productInmDel
    }
  },
  computed: {
  },
  mounted: function () {
  },
  methods: {
  }
}
</script>

<style lang="scss">
.container-delivery {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem 0 3.5rem 0;
}
.container-info-delivery {
  width: 26rem;
  // background: aliceblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title-main {
    text-align: left;
    color: #9e9e9e!important;
    text-transform: uppercase;
    font-size: 1.5rem;
    margin: 1rem 0;
    width: 100%;
  }
  .producto-detail {
    background: white;
    margin: 0 0 1rem 0;
    box-shadow: 10px 10px 5px -9px rgba(0,0,0,0.75);
    .info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: .5rem 1rem;
      button {
        border: 0;
        border-radius: 20px;
        padding: .5rem 1rem;
        background-color: #f06292!important;
        border-color: #f06292!important;
        color: white;
        text-transform: uppercase;
      }
      span {
        color: #e91e63 !important;
        font-size: 1.4rem;
      }
    }
  }
}
</style>
