export async function api(url, search) {
  let response = []
  const SteinStore = require('stein-js-client')
  const store = new SteinStore('https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/')
  await store.read(url, search).then((data) => {
    response = data
  })
  return response
}

export async function apiPost(url, data) {
  let response = []
  const SteinStore = require('stein-js-client')
  const store = new SteinStore('https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/')
  await store.append(url, data).then((res) => {
    response = res
  })
  return response
}
