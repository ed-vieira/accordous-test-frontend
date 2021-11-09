import axios from 'axios'
import auth from '@/auth'

axios.defaults.baseURL = process.env.VUE_APP_API_URL || 'http://localhost:8080'
axios.defaults.headers.common['Content-Type'] = `multipart/form-data`;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const user = auth.user();
if(user){
  axios.defaults.headers.Authorization = `Bearer ${user.token}`;
}

export default axios
