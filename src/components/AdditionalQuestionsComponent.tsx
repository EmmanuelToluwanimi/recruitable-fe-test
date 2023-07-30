/* eslint-disable @typescript-eslint/ban-types */
import { Question } from "../interface";
import { Assets } from "../utils/constants";



interface IAdditionalQuestionsComponent {
  data: Question;
  ToggleUpdateQuestion: Function;
  index: number;
}

export default function AdditionalQuestionsComponent({ data, ToggleUpdateQuestion, index }: IAdditionalQuestionsComponent) {

  return (
    <>
      <div className="font-light text-xs">{data.type}</div>

      <div className="font-semibold pt-2 pb-6 flex justify-between items-center">
        <div className="w-[75%] ">{data.question}</div>
        <div className="p-2" onClick={() => ToggleUpdateQuestion(index, "customisedQuestions", data)}>
          <img src={Assets.pen} alt="pen" />
        </div>
      </div>
    </>
  )
}