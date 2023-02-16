import axios from 'axios';

export async function getContent<T>(content: string) {
  return axios.get<T>(`/content/${content}/content.json`).then(data => data.data).catch(e => console.log(e));
}