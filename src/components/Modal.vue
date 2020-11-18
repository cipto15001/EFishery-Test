<template>
  <div>
    <transition name="modal">
      <div v-if="isOpen">
        <div class="overlay">
          <div class="modal">
            <form
                @submit.prevent="submit"
            >
              <div class="field">
                <div class="control">
                  <label>
                    <select v-model="form.area_provinsi" class="input" type="text" placeholder="Pilih provinsi" />
                  </label>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label>
                    <input v-model="form.area_kota" class="input" type="text" placeholder="Pilih kota" :disabled="!form.area_provinsi"/>
                  </label>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label>
                    <input v-model="form.komoditas" class="input" type="text" placeholder="komoditas"/>
                  </label>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label>
                    <input v-model="form.price" class="input" type="text" placeholder="harga"/>
                  </label>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label>
                    <input v-model="form.size" class="input" type="text" placeholder="size"/>
                  </label>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label>
                    <date-picker v-model="form.tgl_parsed" value-type="format" placeholder="tanggal"></date-picker>
                  </label>
                </div>
              </div>
            </form>
            <button @click="onClickButton(false)">close</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
export default {
  components: { DatePicker },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        area_kota: '',
        area_provinsi: '',
        komoditas: '',
        price: '',
        size: '',
        tgl_parsed: '',
      },
    }
  },
  methods: {
    onClickButton(event) {
      this.$emit('clicked', event)
    },
  },
}
</script>

<style lang="scss" scoped>
.modal {
  width: 300px;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px 3px;
  transition: all 0.2s ease-in;
  font-size: 12px;
  font-family: Roboto-Medium, serif;

  .field {
    padding: 5px 0;

    .label {
      margin-bottom: 5px;
    }
  }

  input {
    border: 1px solid #ccc;
    border-radius: 4px;
    height: 20px;
    padding: 6px;
    font-size: 12px;
    line-height: 1.4;
    width: 195px;
  }
  select {
    border: 1px solid #ccc;
    border-radius: 4px;
    height: 34px;
    padding: 6px;
    font-size: 12px;
    line-height: 1.4;
    width: 211px;
    background: white;
  }
}
.fadeIn-enter {
  opacity: 0;
  .modal {
    transform: scale(1.1);
  }
}
.fadeIn-leave-active {
  opacity: 0;
  transition: all 0.2s step-end;
}
.fadeIn-leave-active.modal {
  transform: scale(1.1);
}
button {
  padding: 7px;
  margin-top: 10px;
  background-color: green;
  color: white;
  font-size: 1.1rem;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #00000094;
  z-index: 999;
  transition: opacity 0.2s ease;
}
</style>
