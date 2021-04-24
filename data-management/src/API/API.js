import axios from 'axios'

const server = axios.create({
    baseURL: 'http://localhost:3011/',
})

export const testersAPI = {
    getTesters: () => server.get('testers').then(response => response.data.testers),
    createNewTester(tester) { return server.post('testers', { tester }) },
    updateTester(tester) { return server.put('testers', { tester }) },
    deleteTester(pn) { return server.delete('testers', { data: { pn } }) },
}

export const ordersAPI = {
    getOrders: () => server.get('orders').then(response => response.data.orders),
    createNewOrder(order) { return server.post('orders', { order }) },
    updateOrder(order) { return server.put('orders', { order }) },
    deleteOrder(id) { return server.delete('orders', { data: { id } }) },
}

export const developersAPI = {
    getDevelopers: () => server.get('developers').then(response => response.data.developers),
    createNewDeveloper(developer) { return server.post('developers', { developer }) },
    updateDeveloper(developer) { return server.put('developers', { developer }) },
    deleteDeveloper(pn) { return server.delete('developers', { data: { pn } }) },
}

export const customersAPI = {
    getCustomers: () => server.get('customers').then(response => response.data.customers),
    createNewСustomer(customer) { return server.post('customers', { customer }) },
    updateСustomer(customer) { return server.put('customers', { customer }) },
    deleteСustomer(id) { return server.delete('customers', { data: { id } }) },
}