const url = 'https://lab.mediabloo.com/api/v1/'
const CarLab = {
    getServices: function () {
        return fetch(url + 'all-services', { method: 'GET' })
    },

    getSubServices: function (id) {
        return fetch(url + 'get-sub-services/' + id, { method: 'GET' })
    }


}

export default CarLab;