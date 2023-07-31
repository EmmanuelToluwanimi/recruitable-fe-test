/* eslint-disable @typescript-eslint/ban-types */
import { Checkbox, Input, Select, message } from "antd";
import { QUESTIONS, testNumber } from "../utils/constants";
import { AiOutlineBars, AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { Question } from "../interface";

interface IUpdateQuestionComponent {
  newQuestion: Question;
  data: Question;
  UpdateFieldOperation: Function;
  SaveUpdatedQuestion: Function;
  DeleteQuestion: Function
}

export default function UpdateQuestionComponent({
  newQuestion,
  UpdateFieldOperation,
  data,
  SaveUpdatedQuestion,
  DeleteQuestion
}: IUpdateQuestionComponent) {

  return (
    <div className="">
      <div>
        <label className="font-semibold">Type</label>
        <div className="mt-3">
          <Select
            defaultValue=""
            style={{ width: "100%" }}
            size="large"
            value={newQuestion.type}
            onChange={(e) => {
              UpdateFieldOperation(data, { type: e })
            }}
            options={QUESTIONS}
          />
        </div>
      </div>

      <div className="mt-3">
        <label className="font-semibold">Question</label>
        <div className="mt-3">
          <Input
            size="large"
            value={newQuestion.question}
            onChange={(e) => UpdateFieldOperation(data, { question: e.target.value })}
          />
        </div>
      </div>

      {/* for multichoice */}
      {data.type === "MultipleChoice" && <>

        <div className="mt-3">
          <label className="font-semibold">Choice</label>

          {/* loop here */}
          {
            newQuestion.choices.map((_data, i) => {
              return (
                <div key={i} className="mt-3 flex items-center justify-between gap-2">
                  <button type="button" className="p-2 font-bold text-lg">
                    <AiOutlineBars />
                  </button>
                  <Input size="large"
                    defaultValue={_data}
                    value={_data}
                    onChange={(e) => {
                      const newChoices = [...newQuestion.choices]
                      newChoices[i] = e.target.value
                      UpdateFieldOperation(data, {
                        choices: newChoices
                      })
                    }}
                  />
                  <button type="button" className="p-2 font-bold text-lg"
                    onClick={() => {
                      const newChoices = [...newQuestion.choices, ""]
                      UpdateFieldOperation(data, {
                        choices: newChoices
                      })
                    }}
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
              )
            })
          }

          <div className="mt-3 flex gap-2 items-center">
            <Checkbox
              checked={newQuestion.other}
              onChange={(e) => {
                UpdateFieldOperation(data, {
                  other: e.target.checked
                })
              }}
            />
            <span className="font-light text-xs">Enable “Other” option </span>
          </div>

        </div>


        <div className="mt-3">
          <div>
            <label className="font-semibold">Max choice allowed</label>
            <div className="mt-3">
              <Input size="large"
                defaultValue={newQuestion.maxChoice}
                value={newQuestion.maxChoice}
                onChange={(e) => {
                  const { value } = e.target
                  if (value !== "" && !testNumber(value)) {
                    message.error("Only numbers are allowed in multiple choice")
                  } else {
                    UpdateFieldOperation(data, {
                      maxChoice: Number(e.target.value || 0)
                    })
                  }
                }}
              />
            </div>
          </div>

        </div>
      </>}

      {/* for dropdown */}
      {data.type === "Dropdown" && <>

        <div className="mt-3">
          <label className="font-semibold">Choice</label>

          {/* loop here */}
          {
            newQuestion.choices.map((_data, i) => {
              return (
                <div key={i} className="mt-3 flex items-center justify-between gap-2">
                  <button type="button" className="p-2 font-bold text-lg">
                    <AiOutlineBars />
                  </button>
                  <Input size="large"
                    defaultValue={_data}
                    value={_data}
                    onChange={(e) => {
                      const newChoices = [...newQuestion.choices]
                      newChoices[i] = e.target.value
                      UpdateFieldOperation(data, {
                        choices: newChoices
                      })
                    }}
                  />
                  <button type="button" className="p-2 font-bold text-lg"
                    onClick={() => {
                      const newChoices = [...newQuestion.choices, ""]
                      UpdateFieldOperation(data, {
                        choices: newChoices
                      })
                    }}
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
              )
            })
          }

          <div className="mt-3 flex gap-2 items-center">
            <Checkbox
              checked={newQuestion.other}
              onChange={(e) => {
                UpdateFieldOperation(data, {
                  other: e.target.checked
                })
              }}
            />
            <span className="font-light text-xs">Enable “Other” option </span>
          </div>

        </div>

      </>}

      {/* for Yes/No */}
      {data.type === "YesNo" && <>

        <div className="mt-3">

          <div className="mt-3 flex gap-2 items-center">
            <Checkbox
              checked={newQuestion.disqualify}
              onChange={(e) => {
                UpdateFieldOperation(data, {
                  disqualify: e.target.checked
                })
              }}
            />
            <span className="font-light text-xs">Disqualify candidate if the answer is no </span>
          </div>

        </div>

      </>}

      <div className="flex justify-between items-center py-4">
        <button type="button" className="text-textRed font-semibold hover:bg-gray-200 flex gap-2 items-center p-2 rounded-lg"
          onClick={() => DeleteQuestion()}
        >
          <AiOutlineClose className="text-textRed text-xl font-bold" />
          <span>Delete questions</span>
        </button>

        <button type="button" className="text-white bg-bgGreen font-semibold px-3 py-2 rounded-lg"
          onClick={() => {
            // console.log("helooo", question);
            SaveUpdatedQuestion()
          }}
        >
          <span>Save</span>
        </button>

      </div>

    </div>
  )
}