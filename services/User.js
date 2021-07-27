const url = 'https://lab.mediabloo.com/api/v1/'
const CarLab = {
    auth: function () {

        return fetch(url + 'car-sizes', { method: 'GET' })
    },
}

export default CarLab;