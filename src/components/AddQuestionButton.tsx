/* eslint-disable @typescript-eslint/ban-types */

import { AiOutlinePlus } from "react-icons/ai";

interface IAddQuestionButton {
  AddQuestion: Function;
  type: string;
  selectedMenu: string
}

export default function AddQuestionButton({ AddQuestion, type, selectedMenu }: IAddQuestionButton) {

  return (
    <div>
      <button
        onClick={() => AddQuestion(type)}
        className="flex items-center disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed gap-3 font-semibold p-4 rounded-b"
        disabled={selectedMenu ? true : false}
      >
        <div>
          <AiOutlinePlus className="text-xl" />
        </div>
        <div>
          Add a question
        </div>
      </button>
    </div>
  )
}