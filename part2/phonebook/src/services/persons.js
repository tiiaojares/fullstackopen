import axios from 'axios'
const baseUrl = '/api/persons'
// const baseUrl = 'https://phonebook-app-wy23.onrender.com/api/persons'


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data);
}

const create = newPerson => {
    return axios.post(baseUrl, newPerson);
}

const deletePerson = id => {
    return axios.delete(`${baseUrl}/${id}`);
}
const update = (id, newPerson) => {
    return axios.put(`${baseUrl}/${id}`, newPerson);
}

export default { getAll, create, deletePerson, update }