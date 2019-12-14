import axios from "axios";

export default {
    userLogin: function () {
        return axios.get('/login')
            .then(() => console.log("Pinged it"))
            .catch(err => console.error(err));
    }
}