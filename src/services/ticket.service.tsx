import axios, { AxiosResponse } from 'axios';
import { ACCESS_TOKEN_KEY, BASE_TICKET_URI, TICKET_PURCHASED_KEY } from './constants';


export async function ApiViewTickets(): Promise<AxiosResponse> {
  try {
    const headers = { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}` };
    const res = await axios.get(BASE_TICKET_URI, { headers });
    if (res.status === 200) {
      sessionStorage.setItem(TICKET_PURCHASED_KEY, 'true');
    }
    return res;
  } catch (e: any) {
    return e.response;
  }
}