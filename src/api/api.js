import axios from "axios";

const baseURL = "http://api.exchangeratesapi.io/v1/"
const url = "latest";
const TOKEN = "?access_key=516144fb7c2770cc1d7710dba0d6c832";
const arrayCurr = "&symbols=USD,UZS,EUR,RUB"

export const currencyAPI = {

  async getLatest() {
    const res = await axios.get(baseURL + url + TOKEN + arrayCurr);
    if (res.status === 200 && res.statusText === "OK") {
      return res;
    } else if (res.error) {
      return new Error(res.error.message)
    } else {
      return new Error(res.error.code)
    }
  }
}
