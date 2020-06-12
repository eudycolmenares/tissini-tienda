<template>
  <div>
    <NavBar />
    <div class="container-dashboard">
      <div class="container-info-dash">
        <div class="card-main" style="background: url('https://mitienda.moda/img/productos-de-entrega-inmediata.e07d1e57.png')">
          <button v-on:click="goRoute">Ver más</button>
        </div>

        <div class="title-main">
          <label>Líneas</label>
        </div>
        <div class="card-lines" v-for="item in categories" :key="item.id"  :style="{ backgroundImage: 'url(https://api.tissini.app' + item.image + ')' }" >
          <button v-on:click="goCatalogue(item.id)">Ver más</button>
        </div>

        <div v-for="item in sections" :key="item.name" style="width: 100%;">
          <div class="card-main" :style="{ backgroundImage: 'url(https://api.tissini.app' + item.image + ')' }">
          </div>
          <div class="container-products">
            <div class="item"  v-for="prod in item.products" :key="prod.id">
              <img v-on:click="goCatalogue(prod.category_id)" :src="'https://api.tissini.app' + prod.image.url" alt="">
              <label class="categorie">{{ prod.categories.category }}</label>
              <label class="name">{{ prod.name }}</label>
              <label class="price">${{ prod.price }}</label>
            </div>
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
  computed: {
    customer () {
      return this.$store.state.customer
    },
    categories () {
      return this.$store.state.categoriesShow
    },
    sections () {
      return this.$store.state.sections
    }
  },
  mounted: function () {
    const store = this.$store
    console.log('Dashboard()')
    if (this.customer) {
      fetch('https://api.tissini.app/api/v1/stock/multivendor/' + this.customer.id)
        .then(function (response) {
          return response.json()
        })
        .then(function (myJson) {
          store.commit('setProductInmDel', myJson)
        })
      fetch('https://api.tissini.app/api/v2/categories')
        .then(function (response) { return response.json() })
        .then(function (myJson) {
          store.commit('setCategoriesShow', myJson)
        })
      fetch('https://api.tissini.app/api/v1/categories/sections')
        .then(function (response) { return response.json() })
        .then(function (myJson) {
          store.commit('setSection', myJson)
        })
    } else {
      alert('No posee sesión iniciada!')
      this.$router.push({ path: '/' })
    }
  },
  methods: {
    goRoute: function () {
      const navigate = this.$router
      navigate.push('/immediatedelivery')
    },
    goCatalogue: function (id) {
      const navigate = this.$router
      navigate.push({ name: 'Catalogue', params: { id: id } })
    }
  }
}
</script>

<style lang="scss">
.container-dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem 0 3.5rem 0;
}
.container-info-dash {
  width: 31rem;
  background: aliceblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  .card-main {
    position: relative;
    width: 31rem;
    height: 170px;
    background-repeat: no-repeat;
    background-size: contain;
    margin: 0 0 .5rem 0;
    button {
      font-size: 1rem;
      text-transform: uppercase;
      padding: .3rem .6rem;
      border-radius: 20px;
      border: 0px;
      background-color: #212121;
      color: white;
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      cursor: pointer;
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
  .card-lines {
    background-repeat: no-repeat;
    background-size: cover;
    width: 80%;
    height: 12rem;
    margin: 0 0 .5rem 0;
    position: relative;
    button {
      font-size: 1rem;
      text-transform: uppercase;
      padding: .3rem .6rem;
      border-radius: 20px;
      border: 0px;
      background-color: #212121;
      color: white;
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      cursor: pointer;
    }
  }
}
.container-products {
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  .item {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 25%;
    align-items: flex-start;
    img {
      width: 100%;
    }
    .categorie {
      color: #9e9e9e!important;
      text-transform: uppercase;
      font-weight: bolder;
    }
    .name {
      color: rgba(0,0,0,.87);
      font-weight: bolder;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 100%;
      overflow: hidden;
      text-align: left;
    }
    .price {
      color: #e91e63!important;
      font-weight: bold;
    }
    &:nth-child(odd) {
      margin: 0 20% 1rem 0;
    }
  }
}
</style>
