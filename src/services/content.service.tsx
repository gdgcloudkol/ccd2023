import axios from 'axios';

export async function getContent<T>(content: string) {
  if (localStorage.getItem(content) !== null) {
    const data = localStorage.getItem(content)
    return data ? JSON.parse(data) as T : {} as T
  }
  return await axios.get<T>(`/content/${content}/content.json`).then(data => {
    localStorage.setItem(content, JSON.stringify(data.data))
    return data.data
  }).catch(e => console.log(e));
}