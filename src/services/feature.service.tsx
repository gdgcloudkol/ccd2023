import axios from 'axios';

export async function getFeature() {
  return axios.get('/content/feature.rule.json').then(data => data.data).catch(e => console.log(e));
}