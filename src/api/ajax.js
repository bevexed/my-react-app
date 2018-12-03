import fly from 'fly-js'

export default function ajax(url, data = {}, type = "POST") {
    return new Promise((resolve, reject) => {
        let promise
        if (type === 'GET') {
            let dataStr = ''
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&'
            })
            if (dataStr !== '') {
                dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
                url = url + '?' + dataStr
            }
            promise = fly.get(url)
        } else {
            promise = fly.post(url, data)
        }
        promise.then(response => {
            resolve(response.data)
        }).catch(error => {
            reject(error)
        })
    }
}
