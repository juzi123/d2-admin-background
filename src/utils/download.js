
import util from '@/libs/util'
const getBlob = (url) => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest()

    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    const token = util.cookies.get('token')
    xhr.setRequestHeader('Authorization', token)
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response)
      }
    }

    xhr.send()
  })
}

const saveAs = (blob, filename) => {
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, filename)
  } else {
    const link = document.createElement('a')
    const body = document.querySelector('body')

    link.href = window.URL.createObjectURL(blob) // 创建对象url
    link.download = filename

    // fix Firefox
    link.style.display = 'none'
    body.appendChild(link)

    link.click()
    body.removeChild(link)

    window.URL.revokeObjectURL(link.href) // 通过调用 URL.createObjectURL() 创建的 URL 对象
  }
}

export const download = (url, filename = '') => {
  getBlob(url).then((blob) => {
    saveAs(blob, filename)
  })
}
