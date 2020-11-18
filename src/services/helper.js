import moment from 'moment'

export function dateFormat(date) {
  return moment(date).format()
}

export function dateString(date) {
  return moment(String(value)).format(' DD/MM/YYYY')
}

export function checkEmpty(obj) {
  return (
    Object.keys(obj).filter((key) => obj[key] === null || obj[key] === undefined || obj[key] === '')
      .length === 0
  )
}
