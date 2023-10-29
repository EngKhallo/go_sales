import axios from "axios";

const token = localStorage.getItem("token") || "";

export default axios.create({
  baseURL: "https://mighty-beach-12110-f811d7687343.herokuapp.com/",
  headers: {
    "Content-type": "application/json",
    "Authorization": token,
  },
});
