import axios from 'axios';

export async function getContent<T>(contentFolder: string) {
  if (sessionStorage.getItem(contentFolder) !== null) {
    const data = sessionStorage.getItem(contentFolder)
    return data ? JSON.parse(data) as T : {} as T
  }
  return await axios.get<T>(`content/${contentFolder}/content.json`).then(data => {
    sessionStorage.setItem(contentFolder, JSON.stringify(data.data))
    return data.data
  }).catch(e => console.log(e));
}