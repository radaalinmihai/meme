import axios from 'axios';

export const GET_USER = 'get_user';
export const loginAction = (data) => (dispatch) => {
  console.log({data});
  axios.get('https://randomuser.me/api/').then((res) => {
    dispatch({
      type: GET_USER,
      payload: res.data.results,
    });
  });
};
