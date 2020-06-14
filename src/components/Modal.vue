<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <div class="actions">
              <a @click="$emit('close')">&#10006;</a>
            </div>
            <label>Agregar Producto</label>
          </div>

          <div class="modal-body">
            <label class="title-variante">Seleccione el tamaño</label>
            <div class="container-variante">
              <div class="container-opc" v-for="item in data.variants" :key="item.id">
                <div class="opcion-var" id="item.id" @click="selectedItem(item)" v-if="item.size == null">
                  Única
                </div>
                <div class="opcion-var" :id="item.id" @click="selectedItem(item)" v-else>
                  {{ item.size }}
                </div>

              </div>
            </div>
            <div class="container-cantidad" v-if="showCant">
              <label class="title-variante">Seleccione la cantidad</label>
              <div class="opcion" id="">
                <select name="select" v-model="cantSelected">
                  <option v-for="i in varSelected.quantity" :key="i" :value="i">{{ i }}</option>
                </select>
              </div>
            </div>

            <button :class="(dsbButton) ? 'boton-inactive boton' : 'boton'"  :disabled="dsbButton" @click="addCart">Agregar</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    data: Object
  },
  methods: {
    addCart: function () {
      const ecommerce = Object.assign({}, this.$store.state.ecommerce)
      if (ecommerce[this.data.id]) { // existe en carro
        if (ecommerce[this.data.id].variant[this.varSelected.id]) {
          ecommerce[this.data.id].variant[this.varSelected.id].cant = ecommerce[this.data.id].variant[this.varSelected.id].cant + this.cantSelected
        } else {
          ecommerce[this.data.id].variant[this.varSelected.id] = {
            product: this.varSelected,
            cant: this.cantSelected
          }
        }
        ecommerce[this.data.id].cant = ecommerce[this.data.id].cant + this.cantSelected
      } else { // no existe en carro
        ecommerce[this.data.id] = {
          product: this.data,
          variant: {},
          cant: this.cantSelected
        }
        ecommerce[this.data.id].variant[this.varSelected.id] = {
          product: this.varSelected,
          cant: this.cantSelected
        }
      }
      this.$store.commit('setEcommerce', ecommerce)
      this.$emit('close')
    },
    selectedItem: function (item) {
      if ((this.varSelected && item.id !== this.varSelected.id) || !this.varSelected) {
        this.varSelected = item
        this.cantSelected = 0
        this.dsbButton = true
        const ele = document.querySelectorAll('.opcion-var')
        for (const e of ele) {
          if (Number(e.id) === Number(item.id)) {
            e.classList.add('option-active')
          } else {
            e.classList.remove('option-active')
          }
        }
        this.showCant = true
      }
    }
  },
  data: function () {
    return {
      varSelected: null,
      cantSelected: 0,
      showCant: false,
      dsbButton: true
    }
  },
  watch: {
    cantSelected: function (value) {
      if (value > 0) {
        this.dsbButton = false
      } else {
        this.dsbButton = true
      }
    }
  },
  mounted: function () {
    console.log('Modal(): ', this.data)
    console.log('ecommerce', this.$store.state.ecommerce)
  }
}
</script>

<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 500px;
  margin: 0px auto;
  display: inline-block;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  position: relative;
  background: #f06292;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  .actions {
    position: absolute;
    left: 0;
    margin: 0 0 0 1rem;
    text-align: right;
    a {
      color: white;
      font-size: 1.3rem;
      padding: 0 .19rem;
      text-decoration: none;
      cursor: pointer;
      &:hover {
        border-radius: 50%;
        background: rgba(0,0,0,.1);
        color: black;
      }
    }
  }
  label {
    font-size: 1.2rem;
  }
}

.modal-body {
  margin: 20px 0;
  .title-variante {
    color: rgb(240, 98, 146);
  }
  .container-variante {
    display: flex;
    justify-content: center;
    margin: .5rem 0 1rem 0;
    .container-opc {
      margin: 0 1rem 0 0;
      &:last-child {
        margin-right: 0px;
      }
    }
    .opcion-var {
      min-width: 3rem;
      max-width: 5rem;
      height: 2rem;
      border: 3px solid gray;
      padding: 0 3px;
      cursor: pointer;
    }
  }
  .container-cantidad {
    .opcion {
      margin: .5rem 0 0 0
    }

  }
  .boton {
    background-color: #f06292;
    border: 0;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    color: white;
    padding: .3rem 1rem;
    text-transform: uppercase;
    margin: 2rem 0 0 0;
    cursor: pointer;
  }
}
.boton-inactive {
  background: #f062928a !important;
}
.option-active {
  border-color: #f06292!important;
  color: #f06292!important;
  background: #f0629214!important;
}
.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
