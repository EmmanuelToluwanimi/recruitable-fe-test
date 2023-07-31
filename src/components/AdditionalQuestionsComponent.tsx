/* eslint-disable @typescript-eslint/ban-types */
import { Question } from "../interface";
import { Assets } from "../utils/constants";



interface IAdditionalQuestionsComponent {
  data: Question;
  ToggleUpdateQuestion: Function;
  index: number;
  category: string
}

export default function AdditionalQuestionsComponent({ data, ToggleUpdateQuestion, category, index }: IAdditionalQuestionsComponent) {

  return (
    <>
      <div className="font-light text-xs">{data.type}</div>

      <div className="font-semibold pt-2 pb-6 flex justify-between items-center">
        <div className="w-[75%] ">{data.question}</div>
        <div role="button" className="p-2 cursor-pointer" onClick={() => ToggleUpdateQuestion(index, category, data)}>
          <img src={Assets.pen} alt="pen" />
        </div>
      </div>
    </>
  )
}