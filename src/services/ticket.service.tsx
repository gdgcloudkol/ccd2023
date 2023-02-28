import axios, { AxiosResponse } from 'axios';
import { TicketData } from '../assets/models/tickets/datatype';

const BASE_AUTH_URI = 'https://api.gdgcloud.kolkata.dev/ticket';

export async function ApiPurchaseTickets(
  payload: TicketData,
): Promise<any> {
  console.log('Purchase: ', payload)
  return Promise.resolve(payload)
  try {
    const res = await axios.post(BASE_AUTH_URI + '/purchase/', payload);

    if (res.status === 200) {
      const data = res.data as TicketData;
      localStorage.setItem('ticketPurchased', 'true');
    }
    return res;
  } catch (e: any) {
    return e.response;
  }
}

export async function ApiViewTickets(
  payload: TicketData,
): Promise<any> {
  console.log('View: ', payload)
  return Promise.resolve(payload)
  try {
    const res = await axios.post(BASE_AUTH_URI + '/view/', payload);

    if (res.status === 200) {
      const data = res.data as TicketData;
      localStorage.setItem('ticketPurchased', 'true');
    }
    return res;
  } catch (e: any) {
    return e.response;
  }
}