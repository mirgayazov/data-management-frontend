import axios from 'axios'

const server = axios.create({
    baseURL: 'http://localhost:3011/',
})

export const testersAPI = {
    getUsers: () => server.get('testers').then(response => response.data.testers),
}

export const ordersAPI = {
    getOrders: () => server.get('orders').then(response => response.data.orders),
}

export const developersAPI = {
    getDevelopers: () => server.get('developers').then(response => response.data.developers),
}

export const customersAPI = {
    getCustomers: () => server.get('customers').then(response => response.data.customers),
}