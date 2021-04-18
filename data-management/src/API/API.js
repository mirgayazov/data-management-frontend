import axios from 'axios'

const server = axios.create({
    baseURL: 'http://localhost:3011/',
})

export const testersAPI = {
    getTesters: () => server.get('testers').then(response => response.data.testers),
    getTester(pn) {
        return server.get(`testers/${pn}`).then(response => response.data.testers)
    },
    createNewTester(tester) {
        return server.post('testers', { tester })
    },
    deleteTester(pn) {
        debugger
        return server.delete('testers', { data: { pn } })
    },
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