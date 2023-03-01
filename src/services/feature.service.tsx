import axios from 'axios';
import { FeatureRule } from '../assets/models/datatype';
import { BASE_CONTENT_URI, FEATURE_RULE_KEY } from './constants';

export async function getFeature() {
  if (sessionStorage.getItem(FEATURE_RULE_KEY) !== null) {
    const data = sessionStorage.getItem(FEATURE_RULE_KEY)
    return data ? JSON.parse(data) as FeatureRule : {} as FeatureRule
  }
  return await axios.get(BASE_CONTENT_URI + '/feature.rule.json').then(data => {
    sessionStorage.setItem(FEATURE_RULE_KEY, JSON.stringify(data.data))
    return data.data
  }).catch(e => console.log(e));
}