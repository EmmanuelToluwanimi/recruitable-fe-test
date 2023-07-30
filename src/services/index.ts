import axios from "axios";
import { IApplicationData, IApplicationSchema } from "../interface";

const BaseUrl = "http://127.0.0.1:4010/api";


export async function GetApplicationSchemaPayload(abortController: AbortController):Promise<IApplicationSchema> {
  const API_URL = BaseUrl + "/410.7108097793834/programs/facere/application-form";

  try {
    const response = await axios.get<IApplicationData>(API_URL, {
      signal: abortController.signal
    })
    return response.data.data as IApplicationSchema;
  } catch (error) {
    throw new Error("An error occurred");
  }
}

export async function SubmitPayload(payload: IApplicationSchema):Promise<IApplicationSchema> {
  const API_URL = BaseUrl + "/395.5859077952251/programs/hic/application-form";

  try {
    const response = await axios.put<IApplicationData>(
      API_URL,
      { data: payload },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )

    return response.data.data as IApplicationSchema;
  } catch (error) {
    throw new Error("An error occurred");
  }
}
