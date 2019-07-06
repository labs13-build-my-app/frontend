import axios from "axios";

export const getData = ({ endpoint, params, setState }) => {
  axios({
    method: "GET",
    baseURL: "http://localhost:8000/api",
    url: endpoint,
    params
  })
    .then(res => {
      setState(res.data.projectOwners);
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    });
};
