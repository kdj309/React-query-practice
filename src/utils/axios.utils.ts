import axios from "axios";

const baseinstance = axios.create({
  baseURL: "https://silver-happiness-j97r6xqp45phpwvp-4000.app.github.dev/",
});
const request = ({ ...options }) => {
  const onSuccess = (response) => response;
  const onError = (error) => {
    console.error(error);
    return error;
  };
  return baseinstance(options).then(onSuccess).catch(onError);
};
export default request;
