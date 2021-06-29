import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://us-central1-fiscaliza-guanambi.cloudfunctions.net/api'
});

export default Api
