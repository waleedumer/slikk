import AsyncStorage from '@react-native-async-storage/async-storage';

const url = 'https://lab.mediabloo.com/api/v1/'
const Shoes = {
    getShoeDesigns: function () {
        return Storage.getToken().then(response => {
            let token = JSON.parse(response)
            return fetch(url + 'shoe-designs', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        });

    },

    getDesignPackages: function (design) {
        return Storage.getToken().then(response => {
            let token = JSON.parse(response)
            return fetch(url + 'shoe-design-packages/' + design, {
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



export default Shoes;