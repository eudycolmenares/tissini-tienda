<template>
  <section class="container-login">
    <div class="form">
      <img src="@/assets/imgs/logo.c752bf8f.png" alt="mitienda.moda" />
      <p>Ingresa el número de teléfono de tu asesora independiente.</p>
      <input v-model="valueInput" type="number" @keyup.enter="getValue" maxlength="10" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'Home',
  data: function () {
    return {
      valueInput: ''
    }
  },
  watch: {
    valueInput: function (val) {
      if (val.length === 10) {
        this.getValue()
      }
    }
  },
  mounted: function () {
    console.log('Home')
  },
  methods: {
    getValue: function () {
      const navigate = this.$router
      const store = this.$store
      fetch('https://api.tissini.app/api/v1/login/client', {
        method: 'POST',
        body: JSON.stringify({ mobilephone: this.valueInput }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(function (response) {
          return response.json()
        })
        .then(function (myJson) {
          console.log('Resp al login(): ', myJson)
          if ('customer' in myJson) {
            store.commit('setInitial', myJson)
            navigate.push('/dashboard')
          } else {
            alert('Problemas al iniciar sesión!')
          }
        })
    }
  }
}
</script>

<style lang="scss">
.container-login {
  background-image: url("~@/assets/imgs/login-back.jpg");
  background-size: cover;
  background-position: top;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .form {
    max-width: 25rem;
    margin: 0 1rem;
    img {
      max-width: 12rem;
      width: 50vw;
    }
    p {
      color: white;
      font-size: 1.2rem;
      /* font-weight: bold; */
      margin: 1rem 2rem;
    }
    input {
      width: 90%;
      margin: 0.5rem 0 0 0;
      font-size: 1.2rem;
      font-weight: bold;
    }
  }
}
</style>
