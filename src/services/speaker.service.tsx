import axios, { AxiosResponse } from 'axios';
import { SpeakerDataModel, TalkData } from '../assets/models/speaker/datatype';
import { ACCESS_TOKEN_KEY, BASE_EVENTS_URI, BASE_SPEAKER_URI, BASE_TALKS_URI, BASE_TECHNOLOGIES_URI } from './constants';

export async function ApiSpeaker(
  payload: SpeakerDataModel
): Promise<AxiosResponse> {
  try {
    const headers = { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}` };
    const res = await axios.post(BASE_SPEAKER_URI, payload, { headers });
    if (res?.status !== 200) throw new Error('Error fetching speaker data');
    return res;
  } catch (e: any) {
    return e.response;
  }
};

export async function ApiSpeakerList(): Promise<AxiosResponse> {
  try {
    const headers = { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}` };
    const res = await axios.get(BASE_SPEAKER_URI, { headers });
    if (res?.status !== 200) throw new Error('Error fetching speakers');
    return res;
  } catch (e: any) {
    return e.response;
  }
};

export async function ApiTechnologies(): Promise<AxiosResponse> {
  try {
    const res = await axios.get(BASE_TECHNOLOGIES_URI);
    if (res?.status !== 200) throw new Error('Error fetching technologies');
    return res;
  } catch (e: any) {
    return e.response;
  }
};

export async function ApiEvents(): Promise<AxiosResponse> {
  try {
    const res = await axios.get(BASE_TECHNOLOGIES_URI);
    if (res?.status !== 200) throw new Error('Error fetching events');
    return res;
  } catch (e: any) {
    return e.response;
  }
};

export async function ApiTalk(
  payload: TalkData
): Promise<AxiosResponse> {
  try {
    const headers = { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}` };
    const res = await axios.post(BASE_TALKS_URI, payload, { headers });
    return res;
  } catch (e: any) {
    return e.response;
  }
};

export async function ApiUpdateTalk(
  payload: TalkData
): Promise<AxiosResponse> {
  try {
    if (payload.id) {
      const headers = { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}` };
      const res = await axios.put(BASE_TALKS_URI + payload.id + '/', payload, { headers });
      return res;
    }
    throw new Error('Talk Id Unknown');
  } catch (e: any) {
    return e.response;
  }
};

export async function ApiDeleteTalk(
  id: string
): Promise<AxiosResponse> {
  try {
    const headers = { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}` };
    const res = await axios.delete(BASE_TALKS_URI + id + '/', { headers });
    return res;
  } catch (e: any) {
    return e.response;
  }
};

export async function ApiGetTalk(): Promise<AxiosResponse> {
  try {
    const headers = { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}` };
    const res = await axios.get(BASE_TALKS_URI, { headers });
    return res;
  } catch (e: any) {
    return e.response;
  }
};

export async function ApiEvent(): Promise<AxiosResponse> {
  try {
    const headers = { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}` };
    const res = await axios.get(BASE_EVENTS_URI, { headers });
    return res;
  } catch (e: any) {
    return e.response;
  }
};