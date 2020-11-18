<template>
  <section>
    <div id="app">
      <pre>
        {{ uuidv4() }}
      </pre>
      <div class="card">
        <div class="table__header">
          <div>
            <button @click="createField = true"> Add Field </button>
          </div>
          <div class="custom-search">
            <label>
              <select v-model="query.search_column">
                <option value="" disabled selected>Pilih Kolom</option>
                <option value="area_kota">Area Kota</option>
                <option value="area_provinsi">Area Provinsi</option>
                <option value="komoditas">Komoditas</option>
                <option value="price">Harga</option>
                <option value="size">Size</option>
                <option value="tgl_parsed">Tangal</option>
              </select>
            </label>
            <label>
              <input v-model="query.search" type="text" class="dv-header-input" placeholder="Search">
            </label>
            <button v-if="filtered === false" @click="search">Search</button>
            <button v-else @click="searchCancel">Cancel</button>
          </div>
        </div>
        <table class="table mobile-optimised">
          <thead>
          <tr>
            <th>
              <div class="around">
                Area Kota
                <ArrowCircleUpIcon v-if="currentSortDir === 'asc'" size="1.5x" @click="sort('area_kota')"/>
                <ArrowCircleDownIcon v-else size="1.5x" @click="sort('area_kota')"/>
              </div>
            </th>
            <th>
              <div class="around">
                Area Provinsi
                <ArrowCircleUpIcon v-if="currentSortDir === 'asc'" size="1.5x" @click="sort('area_provinsi')"/>
                <ArrowCircleDownIcon v-else size="1.5x" @click="sort('area_provinsi')"/>
              </div>
            </th>
            <th>
              <div class="around">
                Komoditas
                <ArrowCircleUpIcon v-if="currentSortDir === 'asc'" size="1.5x" @click="sort('komoditas')"/>
                <ArrowCircleDownIcon v-else size="1.5x" @click="sort('komoditas')"/>
              </div>
            </th>
            <th><div class="around">
              Harga
              <ArrowCircleUpIcon v-if="currentSortDir === 'asc'" size="1.5x" @click="sort('price')"/>
              <ArrowCircleDownIcon v-else size="1.5x" @click="sort('price')"/>
            </div></th>
            <th><div class="around">
              Size
              <ArrowCircleUpIcon v-if="currentSortDir === 'asc'" size="1.5x" @click="sort('size')"/>
              <ArrowCircleDownIcon v-else size="1.5x" @click="sort('size')"/>
            </div></th>
            <th><div class="around">
              Tanggal
              <ArrowCircleUpIcon v-if="currentSortDir === 'asc'" size="1.5x" @click="sort('tgl_parsed')"/>
              <ArrowCircleDownIcon v-else size="1.5x" @click="sort('tgl_parsed')"/>
            </div></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(p, index) in sortedPages" :key="index">
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
      <ul class="pagination">
        <li v-if="page - 5 >= 0" class="pagination__btn" @click="prevPage">
          Previous
        </li>
        <li v-for="(pageNumber, index) in pages.slice(page-1, page+4)" :key="index" :class="pageNumber === currentPage ? 'active pagination__numbers' : 'pagination__numbers'" @click="currentPage = pageNumber">
          {{pageNumber}}
        </li>
        <li v-if="page + 5 <= pages[pages.length - 1]" class="pagination__btn" @click="nextPage">
          Next
        </li>
      </ul>
    </div>
    <Modal :is-open="createField" @clicked="setCreatedField()"/>
  </section>
</template>

<script>
import { api } from '@/services/api'
import { ArrowCircleUpIcon, ArrowCircleDownIcon } from '@vue-hero-icons/solid'
import Modal from '@/components/Modal.vue'
import { v4 as uuidv4 } from 'uuid'
export default {
  components: { ArrowCircleUpIcon, ArrowCircleDownIcon, Modal },
  filters: {
    trimWords(value) {
      return value.split(' ').splice(0, 20).join(' ') + '...'
    },
  },
  data() {
    return {
      posts: [''],
      postsBackup: [''],
      page: 1,
      perPage: 12,
      pages: [],
      currentSort: 'area_kota',
      currentSortDir: 'asc',
      pageSize: 12,
      currentPage: 1,
      createField: false,
      query: {
        search_column: '',
        search: '',
      },
      filtered: false,
    }
  },
  computed: {
    filteredRows() {
      return this.posts.filter((row) => {
        if (row[this.query.search_column]) {
          if (
            row[this.query.search_column]
              .toString()
              .toLowerCase()
              .search(this.query.search.toString().toLowerCase()) >= 0
          ) {
            return true
          }
        }
      })
    },
    sortedPages() {
      const posts = this.posts
      return posts
        .sort((a, b) => {
          let modifier = 1
          if (this.currentSortDir === 'desc') modifier = -1
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier
          if (a[this.currentSort] > b[this.currentSort]) return modifier
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
    this.getPosts()
  },
  methods: {
    uuidv4,
    setCreatedField(value) {
      this.createField = value
    },
    getPosts() {
      api('list').then((data) => {
        this.posts = data
      })
    },
    setPages() {
      let numberOfPages = Math.ceil(this.posts.length / this.perPage)
      let pages = []
      for (let index = 1; index <= numberOfPages; index++) {
        pages.push(index)
      }
      this.pages = pages
    },
    paginate(posts) {
      let page = this.page
      let perPage = this.perPage
      let from = page * perPage - perPage
      let to = page * perPage
      return posts.slice(from, to)
    },
    sort(s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = s
    },
    nextPage() {
      if (this.currentPage * this.pageSize < this.posts.length) {
        this.page = this.page + 5
        this.currentPage = this.page
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.page = this.page - 5
        this.currentPage = this.page
      }
    },
    search() {
      this.currentPage = 1
      this.postsBackup = this.posts
      this.posts = this.filteredRows
      this.filtered = true
    },
    searchCancel() {
      this.query.search_column = ''
      this.query.search = ''
      this.posts = this.postsBackup
      this.filtered = false
    },
  },
}
</script>
