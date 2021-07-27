import AsyncStorage from '@react-native-async-storage/async-storage';

const url = 'https://lab.mediabloo.com/api/v1/'
const Orders = {

    getUserOrders: function (user) {
        return Storage.getToken().then(response => {
            let token = JSON.parse(response)
            return fetch(url + 'user-orders/' + user, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        });
    },



    placeOrder: function (order, meta) {
        return Storage.getToken().then(response => {
            let token = JSON.parse(response)
            return fetch('https://lab.mediabloo.com/api/v1/active-orders', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    let orderId = responseJson.data.id
                    // var formdata = new FormData();
                    // formdata.append("order_id", responseJson.data.id);
                    // formdata.append("meta", meta);
                    // fetch('https://lab.mediabloo.com/api/v1/order-meta', {
                    //     method: 'POST',
                    //     headers: {
                    //         'Accept': 'application/json',
                    //         'Authorization': 'Bearer ' + token,
                    //         'Content-Type': 'application/json'
                    //     },
                    //     body: JSON.stringify(meta)
                    // })
                    //     .then((response) => response.json())
                    //     .then((responseJson) => {
                    //         console.log(responseJson)

                    //         // this.props.navigation.navigate('Home')
                    //     })
                    //     .catch((error) => {

                    //     });
                    // this.props.navigation.navigate('Home')
                })
                .catch((error) => {
                    console.log(error)
                });
        });
    },

    getUserOrders: function (user) {
        return Storage.getToken().then(response => {
            let token = JSON.parse(response)
            return fetch(url + 'user-orders/' + user, {
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



export default Orders;