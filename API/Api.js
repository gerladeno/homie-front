import axios from "axios";
import { GetToken } from "../utils/authCheck";

const AuthApi = (function () {
  let instance = null
  let client = createClient()

  function createClient() {
    console.log("CreateClient")
    return client = axios.create({
      baseURL: "http://192.168.1.222:3000/public/v1",
      timeout: 31000
    })
  }

  function sendSms(phone) {
    return client.get(`/authenticate?phone=${phone}`);
  }

  function confirm(phone, code) {
    return client.get(`/signIn?phone=${phone}&code=${code}`)
  }

  function createInstance() {
    return instance = { createClient, sendSms, confirm }
  }

  function getInstance() {
    return instance ?? createInstance()
  }

  return { getInstance }
})()

const CoreApi = (function () {
  let instance = null
  let client = createClient()

  function createClient() {
    const token = GetToken()
    console.log("Create core client with token:", token)

    const headers = { Authorization: `Bearer ${this.api_token}` }
    return client = axios.create({
      baseURL: "http://192.168.1.222:3001/",
      timeout: 31000,
      headers
    })
  }

  function regions(phone) {
    return client.get(`/static/regions`);
  }

  function getConfig() {
    return client.get(`public/v1/config`)
  }

  function setConfig(config) {
    return client.post(`public/v1/config`, config)
  }

  function createInstance() {
    return instance = { regions, getConfig, setConfig }
  }

  function getInstance() {
    return instance ?? createInstance()
  }

  return { getInstance }
})()

export { AuthApi, CoreApi }

// export default class Api {
//   constructor() {
//     this.api_token = null;
//     this.client = null;
//     BASE_URL = "http://192.168.1.222:3000/public/v1"
//     this.api_url = BASE_URL  //process.env.HOMIE_API;
//   }
//   init = () => {
//     //   this.api_token = getCookie("ACCESS_TOKEN");
//
//     if (this.api_token) {
//       headers.Authorization = `Bearer ${this.api_token}`;
//     }
//     this.client = axios.create({ baseURL: this.api_url, timeout: 31000, headers: headers });
//     return this.client;
//   };

//   sendSms = (phone) => {
//     // let r = this.init().get("/authenticate", { phone: phone });
//     let r = this.init().get(`/authenticate?phone=${phone}`);
//     return r
//   };

//   confirm = (phone, code) => {
//     let r = this.init().get(`/signIn?phone=${phone}&code=${code}`)
//     return r
//   }

//   confirm = (phone, code) => {
//     let r = this.init().get(`/signIn?phone=${phone}&code=${code}`)
//     return r
//   }

//   // addNewUser = (data) => {
//   //   return this.init().post("/users", data);
//   // };
// }