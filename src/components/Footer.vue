<template>
  <footer class="footer">
    <a @click="goRoute('dashboard')">
      <div class="btn-content">
        <span :class="[currentPage.includes('dashboard') ? activeClass : '']">Categorías</span>
      </div>
    </a>
    <a @click="goCatalogue">
      <div class="btn-content">
        <span :class="[currentPage.includes('catalogue') ? activeClass : '']">Catálogo</span>
      </div>
    </a>
    <a>
      <div class="btn-content">
        <span>Carrito</span>
      </div>
    </a>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  methods: {
    goRoute: function (path) {
      this.$router.push('/' + path)
    },
    goCatalogue: function () {
      this.$router.push({ name: 'Catalogue', params: { id: 1 } })
    }
  },
  data: function () {
    return {
      activeClass: 'active-link'
    }
  },
  computed: {
    currentPage () {
      return this.$route.path
    }
  },
  mounted: function () {
    console.log('Footer(): ', this.currentPage)
  }
}
</script>

<style lang="scss">
.active-link {
  color: #f06292 !important;
  font-size: 1rem !important;
}
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  box-shadow: 0 3px 14px 2px rgba(0,0,0,.12);
  background: white;
  color: white;
  height: 3.5rem;
  a {
    max-width: 168px;
    min-width: 80px;
    width: 100%;
    height: 100%;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      background: rgba(0,0,0,.1);
      -webkit-transition: .3s cubic-bezier(.25,.8,.5,1);
      transition: .3s cubic-bezier(.25,.8,.5,1);
    }
  }
  .btn-content {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: .8rem;
      color: rgba(0,0,0,.54);
    }

  }
}
</style>
