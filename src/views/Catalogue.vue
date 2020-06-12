<template>
  <div>
    <NavBar />
    <div class="container-delivery">
      <div class="container-info">
        <div class="navigation">
          <a>Categorías</a> <span class="symbol">&#x279C;</span> <span class="category">{{ category }}</span>
        </div>
        <div class="title-main">
          <label>Categorías</label>
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
  name: 'Catalogue',
  components: {
    NavBar,
    Footer
  },
  data: function () {
    return {
      idCatalogue: this.$route.params.id,
      category: ''
    }
  },
  computed: {
  },
  mounted: function () {
    console.log('Catalogo( -> )', this.idCatalogue)
    fetch('https://api.tissini.app/api/v2/categories/' + this.idCatalogue + '/products')
      .then(response => response.json())
      .then((myJson) => {
        this.category = myJson.categories.category
        console.log('Resp Catalogos: ', myJson)
        // store.commit('setProductInmDel', myJson)
      })
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
.container-info {
  width: 26rem;
  background: aliceblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  .navigation {
    text-align: left;
    width: 100%;
    margin: 1rem 0;
    a {
      color: #f06292;
      text-decoration: none;
    }
    .symbol {

    }
    .category {
      text-transform: capitalize;
    }
  }
  .title-main {
    text-align: left;
    color: #9e9e9e!important;
    text-transform: uppercase;
    font-size: 1.5rem;
    margin: 1rem 0;
    width: 100%;
  }
}
</style>
