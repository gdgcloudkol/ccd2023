import axios, { AxiosResponse } from "axios";
import { SpeakerModalData } from "../assets/models/speaker/datatype";
import { BASE_SPEAKER_URI } from "./constants";

export async function ApiSpeaker(
  setSpeakerData?: React.Dispatch<React.SetStateAction<SpeakerModalData>>
): Promise<AxiosResponse> {
  try {
    const res = await axios.get(BASE_SPEAKER_URI + '/');
    console.log(res)
    return res;
  } catch (e: any) {
    return e.response;
  }
}