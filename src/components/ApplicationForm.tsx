/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-case-declarations */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import FormWrapper from "./FormWrapper";
import { AiOutlineBars, AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { Assets, QUESTIONS, generateId, generateRandomId, testNumber } from "../utils/constants";
import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { UploadChangeParam } from "antd/es/upload";


import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  message,
  Modal,

} from 'antd';
import { IApplicationSchema, IPersonalInput, Question } from "../interface";
import { SubmitPayload } from "../services";

const { Dragger } = Upload;

const defaultQuestion = {
  "id": "",
  "type": "",
  "question": "",
  "choices": [""],
  "maxChoice": 0,
  "disqualify": false,
  "other": false
}

export default function ApplicationForm() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    ResetQuestion();
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [loading, setLoading] = useState(false);
  const [newQuestion, setNewQuestion] = useState<Question>({
    "id": "",
    "type": "",
    "question": "",
    "choices": [""],
    "maxChoice": 0,
    "disqualify": false,
    "other": false
  })
  const [payload, setPayload] = useState<IApplicationSchema>({
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "type": "applicationForm",
    "attributes": {
      "coverImage": "",
      "personalInformation": {
        "firstName": {
          "internalUse": false,
          "show": true
        },
        "lastName": {
          "internalUse": false,
          "show": true
        },
        "emailId": {
          "internalUse": false,
          "show": true
        },
        "phoneNumber": {
          "internalUse": false,
          "show": true
        },
        "nationality": {
          "internalUse": false,
          "show": true
        },
        "currentResidence": {
          "internalUse": false,
          "show": true
        },
        "idNumber": {
          "internalUse": false,
          "show": true
        },
        "dateOfBirth": {
          "internalUse": false,
          "show": true
        },
        "gender": {
          "internalUse": false,
          "show": true
        },
        "personalQuestions": []
      },
      "profile": {
        "education": {
          "mandatory": true,
          "show": true
        },
        "experience": {
          "mandatory": true,
          "show": true
        },
        "resume": {
          "mandatory": true,
          "show": true
        },
        "profileQuestions": []
      },
      "customisedQuestions": []
    }
  });

  const PersonalInputs: IPersonalInput[] = [
    {
      name: "First Name",
      value: "firstName",
      subtext: "",
      hasOptions: false
    },
    {
      name: "Last Name",
      value: "lastName",
      subtext: "",
      hasOptions: false
    },
    {
      name: "Email",
      value: "emailId",
      subtext: "",
      hasOptions: false
    },
    {
      name: "Phone",
      value: "phoneNumber",
      subtext: "(without dial code)",
      hasOptions: true
    },
    {
      name: "Nationality",
      value: "nationality",
      subtext: "",
      hasOptions: true
    },
    {
      name: "Current Residence",
      value: "currentResidence",
      subtext: "",
      hasOptions: true
    },
    {
      name: "ID Number",
      value: "idNumber",
      subtext: "",
      hasOptions: true
    },
    {
      name: "Date of Birth",
      value: "dateOfBirth",
      subtext: "",
      hasOptions: true
    },
    {
      name: "Gender",
      value: "gender",
      subtext: "",
      hasOptions: true
    },
  ]

  const ProfileInputs = [
    {
      name: "Education",
      value: "education",
      subtext: "",
      hasOptions: true
    },
    {
      name: "Experience",
      value: "experience",
      subtext: "",
      hasOptions: true
    },
    {
      name: "Resume",
      value: "resume",
      subtext: "",
      hasOptions: true
    },
  ]


  const handleFileChange = (event: UploadChangeParam<UploadFile<any>>) => {
    const file = event.file.originFileObj;

    if (file && (file.size || 0) <= 1024 * 1024) {
      setSelectedFile(file || null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        const newObj = { ...payload };
        newObj.attributes.coverImage = reader.result as string
        setPayload(
          newObj
        )
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
      message.error("File size must be less than or equal to 1MB.");
    }
  };

  function DeleteImage() {
    setSelectedFile(null);
    setPreviewUrl(null);
  }


  const props: UploadProps = {
    name: 'file',
    multiple: false,
    accept: ".jpg,.jpeg,.png,.gif",
    style: {
      backgroundColor: "white"
    }
  };

  function AddQuestion(key: string) {
    showModal()
    setSelectedMenu(key)
  }

  function ResetQuestion() {
    setNewQuestion(defaultQuestion);
  }

  function SaveQuestion() {
    switch (selectedMenu) {
      case "personalInformation":
        let _questions = payload.attributes[selectedMenu]?.personalQuestions
        _questions = [..._questions, {...newQuestion, id: generateId()}];
        payload.attributes[selectedMenu].personalQuestions = _questions;
        setPayload(payload);
        break;
      case "profile":
        let _questions2 = payload.attributes[selectedMenu]?.profileQuestions
        _questions2 = [..._questions2, {...newQuestion, id: generateId()}];
        payload.attributes[selectedMenu].profileQuestions = _questions2;
        setPayload(payload);
        break;
      case "customisedQuestions":
        let _questions3 = payload.attributes[selectedMenu]
        _questions3 = [..._questions3, {...newQuestion, id: generateId()}];
        payload.attributes[selectedMenu] = _questions3;
        setPayload(payload);
        break;
      default:
        break;
    }
    handleCancel()
  }

  function Validation() {
    if (!payload.attributes.coverImage) {
      return "Please upload an image"
    }
    return
  }
  
  async function handleSubmit() {

    const validdate = Validation()
    if (validdate) {
      return message.error(validdate);
    }

    setLoading(true);
    try {
      const res = await SubmitPayload(payload);
      message.success("Data updated succesfully");
      console.log("res", res);
      
    } catch (error:any) {
      message.error("Oops, operation failed")
    }
    setLoading(false);
  }


  return (
    <div className="px-10">

      {/* modal */}
      <>
        <Modal title="Modal" footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <div className="flex justify-center">
            <QuestionsComponent
              question={newQuestion}
              update={setNewQuestion}
              save={SaveQuestion}
              reset={ResetQuestion}
            />
          </div>
        </Modal>
      </>

      {/* coverimag */}
      <>
        {
          previewUrl ? <div className="rounded-lg mb-8 w-[400px] shadow">
            <div className="w-full h-[250px]">
              <img src={previewUrl} className="w-full h-full object-cover object-center rounded-t-lg" alt="dummy" />
            </div>

            <div
              onClick={DeleteImage}
              className="flex items-center border-t gap-3 text-[#A80000] font-semibold p-3 rounded-b" role="button">
              <div>
                <AiOutlineClose className="text-xl" />
              </div>
              <div>
                Delete & re-upload
              </div>
            </div>
          </div> : <FormWrapper title="Upload cover image">
            <div>
              <Dragger {...props} onChange={handleFileChange}>
                <p className="text-center">
                  <img src={Assets.upload} className="m-auto" alt="upload" />
                </p>
                <p className="ant-upload-text py-3">
                  Upload cover image
                </p>
                <p className="text-xs font-thin">
                  16:9 ratio is recommended. Max image size 1mb
                </p>
              </Dragger>
            </div>
          </FormWrapper>
        }
      </>

      <FormWrapper title="Personal Information">
        <div>

          {
            PersonalInputs.map((data: IPersonalInput, i) => {
              return (
                <div key={i} className="border-b">
                  <div className="pt-2 pb-6 flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <div className="font-semibold ">{data.name}</div>
                      {data.subtext && <div className="font-thin text-xs">{data.subtext}</div>}
                    </div>
                    {data.hasOptions && <div className="flex gap-3 items-center">
                      {/* <img src={Assets.pen} alt="pen" /> */}
                      <div className="flex gap-2 items-center">
                        <Checkbox
                          value={payload.attributes.personalInformation[data.value]?.internalUse}
                          onChange={(e) => {
                            const newObj = { ...payload }
                            newObj.attributes.personalInformation[data.value].internalUse = e.target.checked;
                            setPayload(newObj);
                          }}
                        />
                        <div>
                          internal
                        </div>
                      </div>

                      <div className="flex gap-2 items-center">
                        <Switch className="shadow"
                          checked={payload.attributes.personalInformation[data.value]?.show}
                          onChange={(e) => {
                            const newObj = { ...payload }
                            newObj.attributes.personalInformation[data.value].show = e;
                            setPayload(newObj);
                          }}
                        />
                        <div>
                          {payload.attributes.personalInformation[data.value]?.show ? "show" : "hide"}
                        </div>
                      </div>
                    </div>}
                  </div>
                </div>
              )
            })
          }

        </div>

        {/* additional questions */}
        {
          payload.attributes.personalInformation.personalQuestions.length > 0 &&
          payload.attributes.personalInformation.personalQuestions.map((data, i) => {
            return <div key={i} className="border-b mt-4">
              <div className="font-light text-xs">{data.type}</div>
              <div className="font-semibold pt-2 pb-6 flex justify-between items-center">
                <div className="w-[75%] ">{data.question}</div>
                <div>
                  <img src={Assets.pen} alt="pen" />
                </div>
              </div>
            </div>
          })
        }

        <div
          onClick={() => AddQuestion("personalInformation")}
          className="flex items-center gap-3 font-semibold pt-6 pb-4 rounded-b" role="button">
          <div>
            <AiOutlinePlus className="text-xl" />
          </div>
          <div>
            Add a question
          </div>
        </div>
      </FormWrapper>

      <FormWrapper title="Profile">
        <div>

          {
            ProfileInputs.map((data: IPersonalInput, i) => {
              return (
                <div key={i} className="border-b">
                  <div className="pt-2 pb-6 flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <div className="font-semibold ">{data.name}</div>
                      {data.subtext && <div className="font-thin text-xs">{data.subtext}</div>}
                    </div>
                    {data.hasOptions && <div className="flex gap-3 items-center">
                      {/* <img src={Assets.pen} alt="pen" /> */}
                      <div className="flex gap-2 items-center">
                        <Checkbox
                          value={payload.attributes.profile[data.value]?.mandatory}
                          onChange={(e) => {
                            const newObj = { ...payload }
                            newObj.attributes.profile[data.value].mandatory = e.target.checked;
                            setPayload(newObj);
                          }}
                        />
                        <div>
                          mandatory
                        </div>
                      </div>

                      <div className="flex gap-2 items-center">
                        <Switch className="shadow"
                          checked={payload.attributes.profile[data.value]?.show}
                          onChange={(e) => {
                            const newObj = { ...payload }
                            newObj.attributes.profile[data.value].show = e;
                            setPayload(newObj);
                          }}
                        />
                        <div>
                          {payload.attributes.profile[data.value]?.show ? "show" : "hide"}
                        </div>
                      </div>
                    </div>}
                  </div>
                </div>
              )
            })
          }

        </div>

        {
          payload.attributes.profile.profileQuestions.length > 0 &&
          payload.attributes.profile.profileQuestions.map((data, i) => {
            return <div key={i} className="border-b mt-4">
              <div className="font-light text-xs">{data.type}</div>
              <div className="font-semibold pt-2 pb-6 flex justify-between items-center">
                <div className="w-[75%] ">{data.question}</div>
                <div>
                  <img src={Assets.pen} alt="pen" />
                </div>
              </div>
            </div>
          })
        }

        <div
          onClick={() => AddQuestion("profile")}
          className="flex items-center gap-3 font-semibold pt-6 pb-4 rounded-b" role="button">
          <div>
            <AiOutlinePlus className="text-xl" />
          </div>
          <div>
            Add a question
          </div>
        </div>
      </FormWrapper>

      <FormWrapper title="Additional questions">
        <div>
          {
            payload.attributes.customisedQuestions.length > 0 &&
            payload.attributes.customisedQuestions.map((data, i) => {
              return <div key={i} className="border-b mt-4">
                <div className="font-light text-xs">{data.type}</div>
                <div className="font-semibold pt-2 pb-6 flex justify-between items-center">
                  <div className="w-[75%] ">{data.question}</div>
                  <div>
                    <img src={Assets.pen} alt="pen" />
                  </div>
                </div>
              </div>
            })
          }

          <div
            onClick={() => AddQuestion("customisedQuestions")}
            className="flex items-center gap-3 font-semibold pt-6 pb-4 rounded-b" role="button">
            <div>
              <AiOutlinePlus className="text-xl" />
            </div>
            <div>
              Add a question
            </div>
          </div>
        </div>
      </FormWrapper>

      <div>
        <button className="px-6 py-3 w-[400px] my-6 bg-textBlue text-white rounded-lg disabled:opacity-50"
        onClick={handleSubmit}
        disabled={loading}
        >
          {loading ? "Processing..." : "Submit Details"}
        </button>
      </div>

    </div>
  )
}

interface IQuestionComponent {
  question: Question;
  update: React.Dispatch<React.SetStateAction<Question>>;
  save: Function;
  reset: Function
}

function QuestionsComponent({ question, update, save, reset }: IQuestionComponent) {


  return <>
    <FormWrapper title="Questions">
      <form>
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

      </form>

    </FormWrapper>
  </>
}

