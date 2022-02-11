const axios = require("axios");

class CharactersAPI {
    constructor() {
        this.baseURL = process.env.API_URL;
    }

    create(newChar) {
        return axios.post(this.baseURL + "/characters", newChar);
    }

    getAll() {
        return axios.get(this.baseURL + "/characters");
    }

    getOne(id) {
        return axios.get(this.baseURL + "/characters/" + id);
    }

    updateOne(id, newObject) {
        return axios.put(this.baseURL + "/characters/" + id, newObject);
    }

    deleteOne(id) {
        return axios.delete(this.baseURL + "/characters/" + id);
    }

}

module.exports = CharactersAPI;