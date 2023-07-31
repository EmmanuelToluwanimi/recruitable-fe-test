/* eslint-disable @typescript-eslint/ban-types */
import { Checkbox, Input, Select, message } from "antd";
import { QUESTIONS, defaultQuestion, testNumber } from "../utils/constants";
import { AiFillCaretDown, AiOutlineBars, AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { Question } from "../interface";
import { TimePicker } from 'antd';

const { TextArea } = Input;
const format = 'HH:mm';

interface IQuestionComponent {
  question: Question;
  update: React.Dispatch<React.SetStateAction<Question>>;
  save: Function;
  reset: Function;
  lastIndex?: number
}

export default function QuestionsComponent({ question, update, save, reset, lastIndex }: IQuestionComponent) {


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
            placeholder={
              question.type === "VideoQuestion" ? "Q: Tell us about yourself?" : "Type here"
            }
            value={question.question}
            onChange={(e) => update({
              ...question,
              question: e.target.value
            })}
          />
        </div>
      </div>

      {/* for multichoice */}
      {question.type === "MultipleChoice" && <>

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
      {question.type === "YesNo" && <>

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

      {question.type === "VideoQuestion" && <>
        <div className="mt-3">

          <div className="mt-3">
            <TextArea
              placeholder="Please talk about your achievements, goals and what you worked on as the latest project."
              style={{ height: 120, marginBottom: 24 }}
            />
          </div>

          <div className="mt-3 flex gap-2 justify-between items-center">

            <div className="w-[65%]">
              <Input
                placeholder="Max duration of video"
                size="large"
              />
            </div>

            <div className="flex-grow">
              <TimePicker size="large" placeholder="in (sec/min)" format={format} nextIcon={<AiFillCaretDown />} />
            </div>
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
            save(lastIndex)
          }}
        >
          <span>Save</span>
        </button>

      </div>

      {question.type === "VideoQuestion" && <div>
        <button
          className="flex items-center text-[#A220CF] disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed gap-3 font-semibold p-4 rounded-b"
        >
          <div>
            + Add video interview questions
          </div>
        </button>
      </div>}

    </div>

    {/* </FormWrapper> */}
  </>
}