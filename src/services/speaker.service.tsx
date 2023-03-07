import axios, { AxiosResponse } from 'axios';
import { SpeakerDataModel, TalkData } from '../assets/models/speaker/datatype';
import { ACCESS_TOKEN_KEY, BASE_EVENTS_URI, BASE_SPEAKER_URI, BASE_TALKS_URI, BASE_TECHNOLOGIES_URI } from './constants';

export async function ApiSpeaker(
  payload: SpeakerDataModel
): Promise<AxiosResponse> {
  try {
    const token = `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`
    const res = await axios.post(BASE_SPEAKER_URI, payload, {
      headers: { Authorization: token }
    });
    console.log(res);
    return res;
  } catch (e: any) {
    return e.response;
  }
};

export async function ApiSpeakerList() {
  try {
    const token = `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`
    const res = await axios.get(BASE_SPEAKER_URI, {
      headers: { Authorization: token }
    });
    return res;
  } catch (e: any) {
    return e.response;
  }
};

export async function ApiTechnologies() {
  try {
    const res = await axios.get(BASE_TECHNOLOGIES_URI);
    if (res?.status !== 200) {
      throw new Error('Error fetching technologies');
    }
    return res;
  } catch (e: any) {
    return e.response;
  }
};

export async function ApiEvents() {
  try {
    const res = await axios.get(BASE_TECHNOLOGIES_URI);
    if (res?.status !== 200) {
      throw new Error('Error fetching technologies');
    }
    return res;
  } catch (e: any) {
    return e.response;
  }
};

export async function ApiTalk(
  payload: TalkData
): Promise<AxiosResponse> {
  try {
    const token = `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`
    const res = await axios.post(BASE_TALKS_URI, payload, {
      headers: { Authorization: token }
    });
    return res;
  } catch (e: any) {
    return e.response;
  }
};

export async function ApiEvent(): Promise<AxiosResponse> {
  try {
    const token = `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`
    const res = await axios.post(BASE_EVENTS_URI, {
      headers: { Authorization: token }
    });
    return res;
  } catch (e: any) {
    return e.response;
  }
};