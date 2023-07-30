/* eslint-disable @typescript-eslint/ban-types */
import { Checkbox, Input, Select, message } from "antd";
import { QUESTIONS, defaultQuestion, testNumber } from "../utils/constants";
import { AiOutlineBars, AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { Question } from "../interface";

interface IQuestionComponent {
  question: Question;
  update: React.Dispatch<React.SetStateAction<Question>>;
  save: Function;
  reset: Function
}

export default function QuestionsComponent({ question, update, save, reset }: IQuestionComponent) {


  return <>
    {/* <FormWrapper title="Questions"> */}
    <div className="mt-3">
      <div>
        <label className="font-semibold">Type</label>
        <div className="mt-3">
          <Select
            defaultValue=""
            style={{ width: "100%" }}
            size="large"
            value={question.type}
            onChange={(e) => update({
              ...defaultQuestion,
              type: e
            })}
            options={QUESTIONS}
          />
        </div>
      </div>

      <div className="mt-3">
        <label className="font-semibold">Question</label>
        <div className="mt-3">
          <Input
            size="large"
            value={question.question}
            onChange={(e) => update({
              ...question,
              question: e.target.value
            })}
          />
        </div>
      </div>

      {/* for multichoice */}
      {question.type === "Multiple Choice" && <>

        <div className="mt-3">
          <label className="font-semibold">Choice</label>

          {/* loop here */}
          {
            question.choices.map((data, i) => {
              return (
                <div key={i} className="mt-3 flex items-center justify-between gap-2">
                  <button type="button" className="p-2 font-bold text-lg">
                    <AiOutlineBars />
                  </button>
                  <Input size="large"
                    defaultValue={data}
                    value={data}
                    onChange={(e) => {
                      const newChoices = [...question.choices]
                      newChoices[i] = e.target.value
                      update({
                        ...question,
                        choices: newChoices
                      })
                    }}
                  />
                  <button type="button" className="p-2 font-bold text-lg"
                    onClick={() => {
                      const newChoices = [...question.choices, ""]
                      update({
                        ...question,
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
              checked={question.other}
              onChange={(e) => {
                update({
                  ...question,
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
                defaultValue={question.maxChoice}
                value={question.maxChoice}
                onChange={(e) => {
                  const { value } = e.target
                  if (value !== "" && !testNumber(value)) {
                    message.error("Only numbers are allowed in multiple choice")
                  } else {
                    update({
                      ...question,
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
      {question.type === "Dropdown" && <>

        <div className="mt-3">
          <label className="font-semibold">Choice</label>

          {/* loop here */}
          {
            question.choices.map((data, i) => {
              return (
                <div key={i} className="mt-3 flex items-center justify-between gap-2">
                  <button type="button" className="p-2 font-bold text-lg">
                    <AiOutlineBars />
                  </button>
                  <Input size="large"
                    defaultValue={data}
                    value={data}
                    onChange={(e) => {
                      const newChoices = [...question.choices]
                      newChoices[i] = e.target.value
                      update({
                        ...question,
                        choices: newChoices
                      })
                    }}
                  />
                  <button type="button" className="p-2 font-bold text-lg"
                    onClick={() => {
                      const newChoices = [...question.choices, ""]
                      update({
                        ...question,
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
              checked={question.other}
              onChange={(e) => {
                update({
                  ...question,
                  other: e.target.checked
                })
              }}
            />
            <span className="font-light text-xs">Enable “Other” option </span>
          </div>

        </div>

      </>}

      {/* for Yes/No */}
      {question.type === "Yes/No" && <>

        <div className="mt-3">

          <div className="mt-3 flex gap-2 items-center">
            <Checkbox
              checked={question.disqualify}
              onChange={(e) => {
                update({
                  ...question,
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
          onClick={() => reset()}
        >
          <AiOutlineClose className="text-textRed text-xl font-bold" />
          <span>Delete questions</span>
        </button>

        <button type="button" className="text-white bg-bgGreen font-semibold px-3 py-2 rounded-lg"
          onClick={() => {
            // console.log("helooo", question);
            save()
          }}
        >
          <span>Save</span>
        </button>

      </div>

    </div>

    {/* </FormWrapper> */}
  </>
}