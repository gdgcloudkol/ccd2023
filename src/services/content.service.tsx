import axios from 'axios';
import { BASE_CONTENT_URI, ContentTypes } from './constants';

// getContent is not used anymore anywhere, its depricated in the applciation
export async function getContent<T>(contentFolder: ContentTypes) {
  if (sessionStorage.getItem(contentFolder) !== null) {
    const data = sessionStorage.getItem(contentFolder)
    return data ? JSON.parse(data) as T : {} as T;
  }
  return await axios.get<T>(BASE_CONTENT_URI + `/${contentFolder}/content.json`).then(data => {
    sessionStorage.setItem(contentFolder, JSON.stringify(data.data));
    return data.data
  }).catch(e => console.error(e));
}