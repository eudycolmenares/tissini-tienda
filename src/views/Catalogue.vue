<template>
  <div>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <NavBar />
    <div class="container-delivery" v-if="products.length > 0">
      <div class="container-info-cat">
        <div class="navigation" v-if="!breadcrumbs">
          <router-link to="/dashboard">Categorías </router-link><span class="symbol">&#x279C;</span> <span class="category">{{ category }}</span>
        </div>
        <div class="navigation" v-else>
          <router-link to="/dashboard">Categorías </router-link>
          <span class="symbol">&#x279C;</span>
          <a @click="loadData(idCategory)"> {{ categoryMain }} </a>
          <span class="symbol">&#x279C;</span>
          <span class="category">{{ category }}</span>
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
  name: 'Catalogue',
  components: {
    NavBar,
    Footer
  },
  data: function () {
    return {
      idCatalogue: this.$route.params.id,
      category: '',
      categoryMain: '',
      idCategory: null,
      categories: [],
      products: [],
      slideIndex: 1,
      breadcrumbs: null
    }
  },
  computed: {
    customer () {
      return this.$store.state.customer
    }
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
    },
    goCatalogue: function (id) {
      const navigate = this.$router
      navigate.push({ name: 'Catalogue', params: { id: id } })
    },
    loadData: function (idCustom = null) {
      const id = (!idCustom) ? this.idCatalogue : idCustom
      fetch('https://api.tissini.app/api/v2/categories/' + id + '/products')
        .then(response => response.json())
        .then((myJson) => {
          if (myJson.categories.parent_id) {
            this.idCategory = myJson.categories.parent_id
            this.category = myJson.categories.name
            this.categoryMain = myJson.categories.category
          } else {
            this.category = myJson.categories.category
          }
          this.categories = myJson.categories.categories
          this.products = myJson.products
          this.breadcrumbs = myJson.categories.parent_id
          console.log('Resp Catalogos: ', myJson)
        })
    }
  },
  mounted: function () {
    if (this.customer) {
      this.loadData(null)
    } else {
      alert('No posee sesión iniciada!')
      this.$router.push({ path: '/' })
    }
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
  // background: aliceblue;
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
      text-transform: capitalize;
      cursor: pointer;
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
