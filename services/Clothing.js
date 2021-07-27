import AsyncStorage from '@react-native-async-storage/async-storage';

const url = 'https://lab.mediabloo.com/api/v1/'
const Clothing = {
    getCategories: function () {
        return Storage.getToken().then(response => {
            let token = JSON.parse(response)
            return fetch(url + 'clothing-categories', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        });

    },

    getSubCategories: function (category) {
        return Storage.getToken().then(response => {
            let token = JSON.parse(response)
            return fetch(url + 'clothing-sub-category/' + category, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        });
    },

    getPricings: function (sub_category) {
        return Storage.getToken().then(response => {
            let token = JSON.parse(response)
            return fetch(url + 'clothing-pricing-by-category/' + sub_category, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        });
    },

    getSubCategory: function (sub_category) {
        return Storage.getToken().then(response => {
            let token = JSON.parse(response)
            return fetch(url + 'clothing-sub-categories/' + sub_category, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        });
    },

    getLoggedInUser: function () {
        return Storage.getToken().then(response => {
            let token = JSON.parse(response)
            return fetch('https://lab.mediabloo.com/api/v1/me', {
                method: 'POST',
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



export default Clothing;