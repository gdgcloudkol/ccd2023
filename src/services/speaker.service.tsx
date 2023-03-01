import axios, { AxiosResponse } from "axios";
import { SpeakerModalData } from "../assets/models/speaker/datatype";

const BASE_AUTH_URI = 'https://api.gdgcloud.kolkata.dev/speakers/';

export async function ApiSpeaker(
  setSpeakerData?: React.Dispatch<React.SetStateAction<SpeakerModalData>>
): Promise<AxiosResponse> {
  try {
    const res = await axios.get(BASE_AUTH_URI);
    console.log(res)
    return res;
  } catch (e: any) {
    return e.response;
  }
}