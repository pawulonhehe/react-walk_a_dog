export default function authHeader() {
  // @ts-ignore
  const access_key = JSON.parse(localStorage.getItem('access_key'));
  if (access_key) {
    return {Authorization: 'Token ' + access_key};
  } else {
    return {};
  }
}
