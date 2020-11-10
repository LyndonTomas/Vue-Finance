import axios from 'axios';
const url = "http://localhost:5000/api/users/";

class UserService{
    static login(email, password){
        return axios.get(`${url}${email}/${password}`)
    }
    static getUsers(){
        return new Promise ((resolve, reject)=>{
            axios.get(url).then((res)=>{
                const data = res.data;
                resolve(
                    data.map(users =>({
                        _id:users._id,
                        username:users.username,
                        email:users.email,
                        password:users.password
                    }))
                );
            })
            .catch((err)=>{
                reject(err);
            })
        });
    }
}

export default UserService;
