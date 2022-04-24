import axios from "axios";

export default class Api {
  constructor() {
    this.api_token = null;
    this.client = null;
    BASE_URL = "http://192.168.1.222:3000/public/v1"
    console.log(`baseursl=${BASE_URL}`)
    this.api_url = BASE_URL  //process.env.HOMIE_API;
  }
  init = () => {
    //   this.api_token = getCookie("ACCESS_TOKEN");
    let headers = {
      Accept: "application/json"
    };
    if (this.api_token) {
      headers.Authorization = `Bearer ${this.api_token}`;
    }
    this.client = axios.create({ baseURL: this.api_url, timeout: 31000, headers: headers });
    return this.client;
  };

  sendSms = (phone) => {
    // let r = this.init().get("/authenticate", { phone: phone });
    let r = this.init().get(`/authenticate?phone=${phone}`);
    console.log("request")
    console.log(r)
    return r
  };

  confirm = (phone, code) => {
    let r = this.init().get(`/signIn?phone=${phone}&code=${code}`)
    return r
  }

  // addNewUser = (data) => {
  //   return this.init().post("/users", data);
  // };
}