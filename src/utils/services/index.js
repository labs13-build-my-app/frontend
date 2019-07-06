import axios from "axios";

export const getData = ({ endpoint, params, setState }) => {
  axios({
    method: "GET",
    baseURL: "http://localhost:8000/api",
    url: endpoint,
    params
  })
    .then(res => {
      console.log(res);
      setState(res.data);
    })
    .catch(error => {
      console.log(error);
    });
};
