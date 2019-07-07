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
      if (res.data.id) {
        setState(res.data);
      } else {
        const {
          users,
          developers,
          projectOwners,
          page,
          per,
          has_more
        } = res.data;
        const list = users || developers || projectOwners;
        setState({ page, per, has_more, list });
      }
    })
    .catch(error => {
      setState("user not found");
      console.log(error);
    });
};
