import axios from "axios";
import { IApplicationData, IApplicationSchema } from "../interface";

const BaseUrl = "http://127.0.0.1:4010/api";


export async function GetApplicationSchemaPayload(abortController: AbortController): Promise<IApplicationSchema> {
  const API_URL = BaseUrl + "/592.5496810757978/programs/aliquid/application-form";

  try {
    const response = await axios.get<IApplicationData>(API_URL, {
      signal: abortController.signal
    })
    return response.data.data as IApplicationSchema;
  } catch (error) {
    throw new Error("An error occurred");
  }
}

export async function SubmitPayload(payload: IApplicationSchema): Promise<void> {
  const API_URL = BaseUrl + "/455.32863911907714/programs/laborum/application-form";

  try {
    await axios.put<IApplicationData>(
      API_URL,
      { data: payload },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )

  } catch (error) {
    throw new Error("An error occurred");
  }
}
