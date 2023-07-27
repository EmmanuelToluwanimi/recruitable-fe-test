import axios from "axios";
import { IApplicationSchema } from "../interface";

export async function SubmitPayload(payload: IApplicationSchema) {
  const API_URL = "http://127.0.0.1:4010/api/846.4276247688836/programs/quibusdam/application-form"

  try {
    const response = await axios.put(
      API_URL,
      payload,
      {
        headers : {
          'Content-Type': 'application/json',
        }
      }
    )

    return response.data;
  } catch (error) {
    throw new Error("");
  }
} 