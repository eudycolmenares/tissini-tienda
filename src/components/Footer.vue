<template>
  <footer class="footer">
    <a href="">
      <div class="btn-content">
        <span>Categorías</span>
      </div>
    </a>
    <a href="">
      <div class="btn-content">
        <span>Catálogo</span>
      </div>
    </a>
    <a href="">
      <div class="btn-content">
        <span>Carrito</span>
      </div>
    </a>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss">
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
      color: rgba(0,0,0,.54)!important;
    }

  }
}
</style>
