<template>
  <section>
    <div id="app">
      <loading :active.sync="isLoading"
               :can-cancel="false"
               :is-full-page="true">
      </loading>
      <div v-if="$vssWidth >= 601" class="card">
        <div class="table__header">
          <div>
            <button class="bg-primary" @click="createField = true"> Tambah Data </button>
          </div>
          <div class="custom-search">
            <label>
              <select v-model="query.search_column" :disabled="filtered === true">
                <option value="" disabled selected>Pilih Kolom</option>
                <option value="uuid">UUID</option>
                <option value="area_kota">Area Kota</option>
                <option value="area_provinsi">Area Provinsi</option>
                <option value="komoditas">Komoditas</option>
                <option value="price">Harga</option>
                <option value="size">Size</option>
                <option value="tgl_parsed">Tangal</option>
              </select>
            </label>
            <label v-if="query.search_column === 'tgl_parsed'" >
              <date-picker v-model="query.search" type="date"  value-type="format" placeholder="Masukan kata kunci"></date-picker>
            </label>
            <label v-else-if="query.search_column === 'price'">
              <money v-model="query.search"></money>
            </label>
            <label v-else>
              <input v-model="query.search" type="text" class="dv-header-input" placeholder="Masukan kata kunci" :disabled="filtered === true" maxlength="36">
            </label>
            <button v-if="filtered === false" :class="disabled === true ? 'bg-disable' : 'bg-primary' " :disabled="!query.search && !query.search_column" @click="search">Search</button>
            <button v-else class="bg-secondary" @click="searchCancel">Cancel</button>
          </div>
        </div>
        <div>
          <table class="table mobile-optimised">
            <thead>
            <tr>
              <th>
                <div class="around">
                  UUID
                  <ArrowCircleUpIcon v-if="currentSortDir === 'asc' && currentSort === 'uuid'" size="1.5x" @click="sort('uuid')"/>
                  <ArrowCircleDownIcon v-else-if="currentSortDir === 'desc' && currentSort === 'uuid'" size="1.5x" @click="sort('uuid')"/>
                  <XCircleIcon v-else @click="sort('uuid')"/>
                </div>
              </th>
              <th>
                <div class="around">
                  Area Kota
                  <ArrowCircleUpIcon v-if="currentSortDir === 'asc' && currentSort === 'area_kota'" size="1.5x" @click="sort('area_kota')"/>
                  <ArrowCircleDownIcon v-else-if="currentSortDir === 'desc' && currentSort === 'area_kota'" size="1.5x" @click="sort('area_kota')"/>
                  <XCircleIcon v-else @click="sort('area_kota')"/>
                </div>
              </th>
              <th>
                <div class="around">
                  Area Provinsi
                  <ArrowCircleUpIcon v-if="currentSortDir === 'asc' && currentSort === 'area_provinsi'" size="1.5x" @click="sort('area_provinsi')"/>
                  <ArrowCircleDownIcon v-else-if="currentSortDir === 'desc' && currentSort === 'area_provinsi'" size="1.5x" @click="sort('area_provinsi')"/>
                  <XCircleIcon v-else @click="sort('area_provinsi')"/>
                </div>
              </th>
              <th>
                <div class="around">
                  Komoditas
                  <ArrowCircleUpIcon v-if="currentSortDir === 'asc' && currentSort === 'komoditas'" size="1.5x" @click="sort('komoditas')"/>
                  <ArrowCircleDownIcon v-else-if="currentSortDir === 'desc' && currentSort === 'komoditas'" size="1.5x" @click="sort('komoditas')"/>
                  <XCircleIcon v-else @click="sort('komoditas')"/>
                </div>
              </th>
              <th><div class="around">
                Harga (Rp)
                <ArrowCircleUpIcon v-if="currentSortDir === 'asc' && currentSort === 'price'" size="1.5x" @click="sort('price')"/>
                <ArrowCircleDownIcon v-else-if="currentSortDir === 'desc' && currentSort === 'price'" size="1.5x" @click="sort('price')"/>
                <XCircleIcon v-else @click="sort('price')"/>
              </div></th>
              <th><div class="around">
                Size
                <ArrowCircleUpIcon v-if="currentSortDir === 'asc' && currentSort === 'size'" size="1.5x" @click="sort('size')"/>
                <ArrowCircleDownIcon v-else-if="currentSortDir === 'desc' && currentSort === 'size'" size="1.5x" @click="sort('size')"/>
                <XCircleIcon v-else @click="sort('size')"/>
              </div></th>
              <th><div class="around">
                Tanggal
                <ArrowCircleUpIcon v-if="currentSortDir === 'asc' && currentSort === 'tgl_parsed'" size="1.5x" @click="sort('tgl_parsed')"/>
                <ArrowCircleDownIcon v-else-if="currentSortDir === 'desc' && currentSort === 'tgl_parsed'" size="1.5x" @click="sort('tgl_parsed')"/>
                <XCircleIcon v-else @click="sort('tgl_parsed')"/>
              </div></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(p, index) in sortedPages" :key="index">
              <td>{{ p.uuid |chunkString }}</td>
              <td>{{p.area_kota | capitalizeEach}}</td>
              <td>{{p.area_provinsi | capitalizeEach}}</td>
              <td>{{p.komoditas | capitalizeEach}}</td>
              <td>{{p.price | formatMoney}}</td>
              <td>{{p.size}}</td>
              <td>{{p.tgl_parsed | formatDate}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else class="mobile__view">
        <div>
          <button class="bg-primary" @click="createField = true"> Tambah Data </button>
        </div>
        <div class="label">
          <span>Sort : </span>
        </div>
        <div class="container">
          <label>
            <select v-model="query.filter">
              <option value="" disabled selected>Pilih Kolom</option>
              <option value="uuid">UUID</option>
              <option value="area_kota">Area Kota</option>
              <option value="area_provinsi">Area Provinsi</option>
              <option value="komoditas">Komoditas</option>
              <option value="price">Harga</option>
              <option value="size">Size</option>
              <option value="tgl_parsed">Tangal</option>
            </select>
          </label>
          <button @click="sort(query.filter)"> urutkan </button>
          <span class="label" > status : {{ currentSortDir }} </span>
        </div>
        <div class="label">
          <span>Search : </span>
        </div>
        <div class="custom-search">
          <label>
            <select v-model="query.search_column" :disabled="filtered === true">
              <option value="" disabled selected>Pilih Kolom</option>
              <option value="uuid">UUID</option>
              <option value="area_kota">Area Kota</option>
              <option value="area_provinsi">Area Provinsi</option>
              <option value="komoditas">Komoditas</option>
              <option value="price">Harga</option>
              <option value="size">Size</option>
              <option value="tgl_parsed">Tangal</option>
            </select>
          </label>
          <label v-if="query.search_column === 'tgl_parsed'" >
            <date-picker v-model="query.search" type="date"  value-type="format" placeholder="Masukan kata kunci"></date-picker>
          </label>
          <label v-else-if="query.search_column === 'price'">
            <money v-model="query.search"></money>
          </label>
          <label v-else>
            <input v-model="query.search" type="text" class="dv-header-input" placeholder="Masukan kata kunci" :disabled="filtered === true" maxlength="36">
          </label>
          <button v-if="filtered === false" :class="disabled === true ? 'bg-disable' : 'bg-primary' " :disabled="!query.search && !query.search_column" @click="search">Search</button>
          <button v-else class="bg-secondary" @click="searchCancel">Cancel</button>
        </div>
        <div v-for="(p, index) in sortedPages" :key="index" class="card__List">
          <span class="card__List__title" >UUID</span>
          <p class="card__List__value">{{ p.uuid |chunkString }}</p>
          <span class="card__List__title" >Provinsi</span>
          <p class="card__List__value">{{p.area_provinsi | capitalizeEach}}</p>
          <span class="card__List__title" >Kota</span>
          <p class="card__List__value">{{p.area_kota | capitalizeEach}}</p>
          <span class="card__List__title" >Komoditas</span>
          <p class="card__List__value">{{p.komoditas | capitalizeEach}}</p>
          <span class="card__List__title" >Harga</span>
          <p class="card__List__value">{{p.price | formatMoney}}</p>
          <span class="card__List__title" >Size</span>
          <p class="card__List__value">{{p.size}}</p>
          <span class="card__List__title" >Tanggal</span>
          <p class="card__List__value">{{p.tgl_parsed | formatDate}}</p>
        </div>
      </div>
      <ul class="pagination">
        <li v-if="page - 5 >= 0" class="pagination__btn" @click="prevPage">
          <ChevronLeftIcon/>
        </li>
        <li v-for="(pageNumber, index) in pages.slice(page-1, page+4)" :key="index" :class="pageNumber === currentPage ? 'active pagination__numbers' : 'pagination__numbers'" @click="currentPage = pageNumber">
          {{pageNumber}}
        </li>
        <li v-if="page + 5 <= pages[pages.length - 1]" class="pagination__btn" @click="nextPage">
          <ChevronRightIcon/>
        </li>
      </ul>
    </div>
    <Modal :is-open="createField" :area="areaGroup" :size="optionSize" @clicked="setCreatedField()" @sent="getPosts()"/>
  </section>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'vue2-datepicker/index.css'
import { api } from '@/services/api'
import Modal from '@/components/Modal.vue'
import { v4 as uuidv4 } from 'uuid'
import {
  ArrowCircleUpIcon,
  ArrowCircleDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XCircleIcon,
} from '@vue-hero-icons/solid'
import { dateString } from '@/services/helper'
export default {
  components: {
    ArrowCircleUpIcon,
    ArrowCircleDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    XCircleIcon,
    Modal,
    DatePicker,
    Loading,
  },
  filters: {
    trimWords(value) {
      return value.split(' ').splice(0, 20).join(' ') + '...'
    },
  },
  data() {
    return {
      isLoading: false,
      posts: [''],
      postsBackup: [''],
      page: 1,
      perPage: 12,
      pages: [],
      currentSort: 'area_kota',
      currentSortDir: 'asc',
      currentPage: 1,
      createField: false,
      query: {
        search_column: '',
        search: '',
        filter: '',
      },
      filtered: false,
      optionArea: [],
      optionSize: [],
    }
  },
  computed: {
    // function to return condition button search
    disabled() {
      return !this.query.search || !this.query.search_column
    },
    // conttroller to limit pageSize item rendered for mobile 5 item and desktop 12 item
    pageSize() {
      return this.$vssWidth >= 601 ? 12 : 5
    },
    // function to geup area_kota to area_provinsi
    areaGroup() {
      const data = this.optionArea
      const key = 'province'
      return data.reduce(function (rv, x) {
        ;(rv[x[key]] = rv[x[key]] || []).push(x.city)
        return rv
      }, {})
    },
    // logic to search data using substring query to get matching string not same string. example search keyword 'ikan' can get 'ikan tuna', 'ikan teri'
    filteredRows() {
      return this.posts.filter((row) => {
        if (row[this.query.search_column]) {
          if (this.currentSort === 'tgl_parsed') {
            if (
              dateString(row[this.query.search_column]).search(dateString(this.query.search)) >= 0
            ) {
              return true
            }
          } else {
            if (
              row[this.query.search_column]
                .toString()
                .toLowerCase()
                .search(this.query.search.toString().toLowerCase()) >= 0
            ) {
              return true
            }
          }
        }
      })
    },
    // logic to sort data from request default area_kota asc
    sortedPages() {
      const posts = this.posts
      return posts
        .sort((a, b) => {
          let modifier = 1
          if (this.currentSortDir === 'desc') modifier = -1
          if (a[this.currentSort] && b[this.currentSort]) {
            if (
              a[this.currentSort].toString().toLowerCase() <
              b[this.currentSort].toString().toLowerCase()
            )
              return -1 * modifier
            if (
              a[this.currentSort].toString().toLowerCase() >
              b[this.currentSort].toString().toLowerCase()
            )
              return modifier
          } else if (!a[this.currentSort]) {
            return 1
          } else if (!b[this.currentSort]) {
            return -1
          }
          return 0
        })
        .filter((row, index) => {
          let start = (this.currentPage - 1) * this.pageSize
          let end = this.currentPage * this.pageSize
          if (index >= start && index < end) return true
        })
    },
  },
  watch: {
    posts() {
      this.setPages()
    },
  },
  created() {
    // initial data from thid party api
    this.getPosts()
    this.getArea()
    this.getSize()
  },
  methods: {
    uuidv4,
    //getting emit data from child
    setCreatedField(value) {
      this.createField = value
    },
    // get list data to post in table
    getPosts() {
      this.isLoading = true
      api('list').then((data) => {
        this.posts = data
        this.isLoading = false
      })
    },
    // get option area
    getArea() {
      api('option_area').then((data) => {
        this.optionArea = data
      })
    },
    // get option size
    getSize() {
      api('option_size').then((data) => {
        this.optionSize = data
      })
    },
    // set total pagination page
    setPages() {
      let numberOfPages = Math.ceil(this.posts.length / this.perPage)
      let pages = []
      for (let index = 1; index <= numberOfPages; index++) {
        pages.push(index)
      }
      this.pages = pages
    },
    // handle sort function
    sort(s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = s
    },
    // handle pagination next page
    nextPage() {
      if (this.currentPage * this.pageSize < this.posts.length) {
        this.page = this.page + 5
        this.currentPage = this.page
      }
    },
    // handle pagination prev page
    prevPage() {
      if (this.currentPage > 1) {
        this.page = this.page - 5
        this.currentPage = this.page
      }
    },
    // handle search function
    search() {
      this.currentPage = 1
      this.postsBackup = this.posts
      this.posts = this.filteredRows
      this.filtered = true
    },
    // handle reset search function
    searchCancel() {
      this.query.search_column = ''
      this.query.search = ''
      this.posts = this.postsBackup
      this.filtered = false
    },
  },
}
</script>
