<template>
  <div>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <NavBar />
    <div class="container-delivery">
      <div class="container-info-cat">
        <div class="navigation">
          <a>Categorías</a> <span class="symbol">&#x279C;</span> <span class="category">{{ category }}</span>
        </div>

        <div v-if="categories.length > 0">
          <div class="title-main">
            <label>Categorías</label>
          </div>
          <div class="w3-content w3-display-container">
            <img class="mySlides" v-for="cat in categories" :key="cat.id" :src="'https://api.tissini.app' + cat.image" style="width:100%" ref="mySlide">
            <button class="w3-button w3-display-left" @click="plusDivs(-1)">&#10094;</button>
            <button class="w3-button w3-display-right" @click="plusDivs(1)">&#10095;</button>
          </div>
        </div>

        <div class="title-main">
          <label>Productos</label>
        </div>
        <div class="producto-detail" v-for="prod in products" :key="prod.id">
          <img :src="'https://api.tissini.app' + prod.images[0].url" style="width:100%">
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
  name: 'Catalogue',
  components: {
    NavBar,
    Footer
  },
  data: function () {
    return {
      idCatalogue: this.$route.params.id,
      category: '',
      categories: [],
      products: [],
      slideIndex: 1
    }
  },
  computed: {
  },
  methods: {
    plusDivs: function (n) {
      this.showDivs(this.slideIndex += n)
    },
    showDivs: function (n) {
      let i
      const x = document.getElementsByClassName('mySlides')
      if (n > x.length) { this.slideIndex = 1 }
      if (n < 1) { this.slideIndex = x.length }
      for (i = 0; i < x.length; i++) {
        x[i].style.display = 'none'
      }
      x[this.slideIndex - 1].style.display = 'block'
    }
  },
  mounted: function () {
    console.log('Catalogo( -> )', this.idCatalogue)
    fetch('https://api.tissini.app/api/v2/categories/' + this.idCatalogue + '/products')
      .then(response => response.json())
      .then((myJson) => {
        this.category = myJson.categories.category
        this.categories = myJson.categories.categories
        this.products = myJson.products
        console.log('Resp Catalogos: ', myJson)
      })
  },
  updated: function () {
    if (this.categories.length > 0) {
      this.showDivs(this.slideIndex)
    }
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
.container-info-cat {
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
  .mySlides {
    display:none;
  }
  .w3-button {
      color: #f06292 !important;
      font-size: 2rem;
      &:hover {
        background-color: transparent !important;
        background: transparent !important;
        color: #f0629273 !important;
      }
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
