const axios = require('axios');

const url = '20.244.56.144/evaluation-service'

async function fetchUsers() {
    const res = await axios.get(`${url}/users`);
    return res.data;
};

async function fetchPosts() {
    const res = await axios.get(`${url}/posts`);
    return res.data;
};

async function fetchComments() {
    const res = await axios.get(`${url}/comments`);
    return res.data;
};


module.exports = {
    fetchUsers,
    fetchPosts,
    fetchComments
}