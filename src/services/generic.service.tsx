import axios from "axios";

export async function ApiGeneric<T, U>(
  payload: T,
  url: string,
  callType: 'get' | 'post' | 'put' | 'delete'
): Promise<U> {
  try {
    const res = await axios[callType]<T>(url, payload);
    console.log(res);
    return res as U;
  } catch (e: any) {
    return e.response;
  }
}