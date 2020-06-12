<template>
  <div id="app">
    <router-view/>
    <div class="spinner-loader" id="spinner-loader"><img src="~@/assets/imgs/loader.gif"></div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
#spinner-loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0,0,0,.6);
  height: 100%;
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
