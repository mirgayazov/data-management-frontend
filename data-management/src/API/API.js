import axios from 'axios'

const server = axios.create({
    baseURL: 'http://localhost:3011/',
})

export const testersAPI = {
    getTesters: () => server.get('testers').then(response => response.data.testers),
    createNewTester(tester) { return server.post('testers', { tester }) },
    updateTester(tester) { return server.put('testers', { tester }) },
    deleteTester(pn) { return server.delete('testers', { data: { pn } }) },
    saveStage(schema) { return server.post('stages', { data: { schema } }) },
}

export const ordersAPI = {
    getOrders: () => server.get('orders').then(response => response.data.orders),
    createNewOrder(order) { return server.post('orders', { order }) },
    appointDeveloper(schema) { return server.post('orders/appoint-developer', { schema }) },
    appointTester(schema) { return server.post('orders/appoint-tester', { schema }) },
    removeDeveloperFromOrder(schema) { return server.post('orders/remove-developer-from-order', { schema }) },
    removeTesterFromOrder(schema) { return server.post('orders/remove-tester-from-order', { schema }) },
    updateOrder(order) { return server.put('orders', { order }) },
    deleteOrder(id) { return server.delete('orders', { data: { id } }) },
    getStages(orderId) { return server.post('order/stages', { data: { orderId } }) },
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

export const authAPI = {
    login(email, password) { return server.post('auth/login', { data: { email, password } }) },
    resetPassword(email) { return server.post('auth/reset-password', { data: { email } }) }
}

export const commonAPI = {
    getProjects(position, email) { return server.post(`${position}/projects`, { data: { email } }) },
}