import axios from 'axios'

const server = axios.create({
    baseURL: 'http://localhost:3011/',
})

export const testersAPI = {
    getTesters: () => server.get('testers').then(response => response.data.testers),
    createNewTester(tester) { return server.post('testers', { tester }) },
    deleteTester(pn) { return server.delete('testers', { data: { pn } }) },
}

export const ordersAPI = {
    getOrders: () => server.get('orders').then(response => response.data.orders),
}

export const developersAPI = {
    getDevelopers: () => server.get('developers').then(response => response.data.developers),
    createNewDeveloper(developer) { return server.post('developers', { developer }) },
    deleteDeveloper(pn) { return server.delete('developers', { data: { pn } }) },
}

export const customersAPI = {
    getCustomers: () => server.get('customers').then(response => response.data.customers),
}