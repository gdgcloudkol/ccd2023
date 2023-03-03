import axios from 'axios';
import { ProfileTicketData } from '../assets/models/tickets/datatype';
import { BASE_SPEAKER_URI, TICKET_PURCHASED_KEY } from './constants';


export async function ApiPurchaseTickets(
  payload: ProfileTicketData,
): Promise<any> {
  console.log('Purchase: ', payload)
  return Promise.resolve(payload)
  try {
    const res = await axios.post(BASE_SPEAKER_URI + '/purchase/', payload);

    if (res.status === 200) {
      const data = res.data as ProfileTicketData;
      sessionStorage.setItem(TICKET_PURCHASED_KEY, 'true');
    }
    return res;
  } catch (e: any) {
    return e.response;
  }
}

export async function ApiViewTickets(
  payload: ProfileTicketData,
): Promise<any> {
  console.log('View: ', payload)
  return Promise.resolve(payload)
  try {
    const res = await axios.post(BASE_SPEAKER_URI + '/view/', payload);

    if (res.status === 200) {
      const data = res.data as ProfileTicketData;
      sessionStorage.setItem(TICKET_PURCHASED_KEY, 'true');
    }
    return res;
  } catch (e: any) {
    return e.response;
  }
}