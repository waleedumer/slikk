import AsyncStorage from '@react-native-async-storage/async-storage';

const url = 'https://lab.mediabloo.com/api/v1/'
const Carlab = {
    getSizesold: function () {
        return fetch(url + 'car-sizes', { method: 'GET' })
    },

    getPriceBySize: function (size) {
        return Storage.getToken().then(response => {
            let token = JSON.parse(response)
            return fetch('https://lab.mediabloo.com/api/v1/car-size-pricing/' + size, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        });
        // return fetch(url + 'car-size-pricing/' + size, { method: 'GET' })
    },

    getCarPackages: function (id) {
        return Storage.getToken().then(response => {
            let token = JSON.parse(response)
            return fetch('https://lab.mediabloo.com/api/v1/car-wash-packages/' + id, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        });
        // return fetch(url + 'car-wash-packages/' + id, { method: 'GET' })
    },


    getSizes: function () {
        return Storage.getToken().then(response => {
            let token = JSON.parse(response)
            return fetch('https://lab.mediabloo.com/api/v1/car-sizes', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        });
    },


}

const Storage = {
    getToken: async function () {
        try {
            let token = await AsyncStorage.getItem('token');
            return token
        } catch (error) {
            // Error saving data
            console.log(error)
        }
    }
}

export default Carlab;