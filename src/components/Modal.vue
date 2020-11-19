<template>
  <div>
    <loading :active.sync="isLoading"
             :can-cancel="false"
             :is-full-page="true">
    </loading>
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
                    <select v-model="form.area_provinsi" class="input" type="text" placeholder="Pilih provinsi">
                      <option value="" disabled selected>Pilih Provinsi</option>
                      <option v-for="(item, key) in areaOption" :key="key" :value="item">{{ item | capitalizeEach }}</option>
                    </select>
                  </label>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label>
                    <select v-model="form.area_kota" class="input" type="text" placeholder="Pilih kota" :disabled="!form.area_provinsi">
                      <option value="" disabled selected>Pilih Kota</option>
                      <option v-for="(item, key) in cityOption" :key="key" :value="item">{{ item | capitalizeEach }}</option>
                    </select>
                  </label>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label>
                    <input v-model="form.komoditas" class="input" type="text" placeholder="komoditas" maxlength="32"/>
                  </label>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label>
                    <money v-model="form.price"></money>
                  </label>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label>
                    <select v-model="form.size" class="input" type="text" placeholder="size">
                      <option value="" disabled selected>Pilih Size</option>
                      <option v-for="(item, key) in size" :key="key" :value="item.size">{{ item.size }}</option>
                    </select>
                  </label>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label>
                    <date-picker v-model="form.tgl_parsed" type="datetime"  value-type="format" placeholder="tanggal"></date-picker>
                  </label>
                </div>
              </div>
            </form>
            <button  class="bg-secondary" @click="onClickButton(false)">close</button>
            <button  :class=" disabled === true ? 'bg-disable' : 'bg-primary'" :disabled="disabled === true" @click="send()">send</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { apiPost } from '@/services/api'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import { dateFormat, checkEmpty } from '@/services/helper'
import { v4 as uuidv4 } from 'uuid'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  components: { DatePicker, Loading },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    area: {
      type: Object,
      default: null,
    },
    size: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      isLoading: false,
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
  computed: {
    // verification function to check null form value
    disabled() {
      return !checkEmpty(this.form)
    },
    // function to generate option area_kota
    cityOption() {
      let cityOptionCleared = []
      if (this.form.area_provinsi) {
        this.area[this.form.area_provinsi].forEach((value) => {
          if (value) {
            cityOptionCleared.push(value)
          }
        })
      }
      return cityOptionCleared
    },
    // function to remove area_provinsi when have null in area_kota
    areaOption() {
      let areaOptionCleared = []
      for (const [key, value] of Object.entries(this.area)) {
        if (value[0]) {
          areaOptionCleared.push(key)
        }
      }
      return areaOptionCleared
    },
  },
  methods: {
    // emit funciton to close modal
    onClickButton(event) {
      this.$emit('clicked', event)
    },
    // function to send data
    send() {
      this.isLoading = true
      const payload = {
        area_kota: this.form.area_kota,
        area_provinsi: this.form.area_provinsi,
        komoditas: this.form.komoditas,
        price: this.form.price,
        size: this.form.size,
        tgl_parsed: dateFormat(this.form.tgl_parsed),
        timestamp: new Date().valueOf(),
        uuid: uuidv4(),
      }
      apiPost('list', [payload]).then((res) => {
        this.isLoading = false
        this.$emit('sent')
        this.onClickButton(false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.modal {
  width: 300px;
  margin: 0 auto;
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
  border: 1px solid #ccc;
  font-family: Roboto-Medium, serif;
  border-radius: 4px;
  height: 34px;
  padding: 6px;
  font-size: 12px;
  line-height: 1.4;
  background: white;
  margin: 4px 4px 4px 0;
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
