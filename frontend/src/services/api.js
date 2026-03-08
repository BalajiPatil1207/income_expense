import axios from "axios"

const api = axios.create({
  baseURL:"http://localhost:3000/api",
  headers: {
        "Authorization": "Bearer YOUR_TOKEN_HERE",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

const store = (token,user) =>{
  sessionStorage.setItem("token",token);
  sessionStorage.setItem("user",JSON.stringify(user));
}

const removeStore = () =>{
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
}

export {api, store, removeStore};