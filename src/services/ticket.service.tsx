import axios, { AxiosResponse } from 'axios';
import { ACCESS_TOKEN_KEY, BASE_REFERRAL_URI, BASE_TICKET_URI, TICKET_PURCHASED_KEY } from './constants';


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

export async function ApiReferral(referrer: { referrer: string }): Promise<AxiosResponse> {
  try {
    const headers = { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}` };
    const res = await axios.patch(BASE_REFERRAL_URI, referrer, { headers });
    if (res.status === 200) {
      return res;
    }
    throw new Error("Referral Apply Error");
  } catch (e: any) {
    return e.response;
  }
}