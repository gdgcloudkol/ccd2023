import axios from 'axios';
import { FeatureRule } from '../assets/models/datatype';

export async function getFeature() {
  if (sessionStorage.getItem('featureRule') !== null) {
    const data = sessionStorage.getItem('featureRule')
    return data ? JSON.parse(data) as FeatureRule : {} as FeatureRule
  }
  return await axios.get('content/feature.rule.json').then(data => {
    sessionStorage.setItem('featureRule', JSON.stringify(data.data))
    return data.data
  }).catch(e => console.log(e));
}