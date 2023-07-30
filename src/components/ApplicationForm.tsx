/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-case-declarations */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import FormWrapper from "./FormWrapper";
import { AiOutlineClose } from "react-icons/ai";
import { Assets, defaultQuestion, generateId } from "../utils/constants";
import type { UploadFile, UploadProps } from 'antd';
import { useEffect, useState } from "react";
import { UploadChangeParam } from "antd/es/upload";
import {
  Checkbox,
  Switch,
  Upload,
  message,
} from 'antd';
import { IApplicationSchema, IPersonalInput, Question } from "../interface";
import { GetApplicationSchemaPayload, SubmitPayload } from "../services";
import LoadingScreen from "./LoadingScreen";
import AdditionalQuestionsComponent from "./AdditionalQuestionsComponent";
import UpdateQuestionComponent from "./UpdateQuestionComponent";
import QuestionsComponent from "./QuestionsComponent";
import AddQuestionButton from "./AddQuestionButton";

const { Dragger } = Upload;

export default function ApplicationForm() {


  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [loading, setLoading] = useState(0);
  const [selectedIndex, setselectedIndex] = useState<any[]>([]);
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
      setPreviewUrl(null);
      message.error("File size must be less than or equal to 1MB.");
    }
  };

  function DeleteImage() {
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
    // showModal()
    setSelectedMenu(key)
    // add new object to questions array here

  }

  function ResetQuestion() {
    setNewQuestion(defaultQuestion);
  }

  function SaveQuestion() {
    switch (selectedMenu) {
      case "personalInformation":
        let _questions = payload.attributes[selectedMenu]?.personalQuestions
        _questions = [..._questions, { ...newQuestion, id: generateId() }];
        payload.attributes[selectedMenu].personalQuestions = _questions;
        setPayload(payload);
        break;
      case "profile":
        let _questions2 = payload.attributes[selectedMenu]?.profileQuestions
        _questions2 = [..._questions2, { ...newQuestion, id: generateId() }];
        payload.attributes[selectedMenu].profileQuestions = _questions2;
        setPayload(payload);
        break;
      case "customisedQuestions":
        let _questions3 = payload.attributes[selectedMenu]
        _questions3 = [..._questions3, { ...newQuestion, id: generateId() }];
        payload.attributes[selectedMenu] = _questions3;
        setPayload(payload);
        break;
      default:
        break;
    }

    ResetQuestion();
    setSelectedMenu("");
  }

  function ToggleUpdateQuestion(i: number, category: string, data: Question) {
    setselectedIndex([i, category]);
    setNewQuestion({ ...data, id: data.id ? data.id : generateId() });
  }

  function ResetSelectedIndex() {
    setselectedIndex([]);
  }

  function UpdateFieldOperation(data: Question, value: {}) {
    const placeholder = { ...data, ...value };
    setNewQuestion(placeholder);
  }

  function SaveUpdatedQuestion() {

    switch (selectedIndex[1]) {
      case "personalInformation":
        const _questions = payload.attributes.personalInformation.personalQuestions
        _questions[selectedIndex[0]] = newQuestion;
        payload.attributes.personalInformation.personalQuestions = _questions;
        setPayload(payload);
        break;
      case "profile":
        const _questions2 = payload.attributes.profile.profileQuestions
        _questions2[selectedIndex[0]] = newQuestion;
        payload.attributes.profile.profileQuestions = _questions2;
        setPayload(payload);
        break;
      case "customisedQuestions":
        const _questions3 = payload.attributes.customisedQuestions
        _questions3[selectedIndex[0]] = newQuestion;
        payload.attributes.customisedQuestions = _questions3;
        setPayload(payload);
        break;
      default:
        break;
    }
    ResetSelectedIndex()
    ResetQuestion();
  }

  function DeleteQuestion() {
    switch (selectedIndex[1]) {
      case "personalInformation":
        const _questions = payload.attributes.personalInformation.personalQuestions
        _questions.splice(selectedIndex[0], 1);
        payload.attributes.personalInformation.personalQuestions = _questions;
        setPayload(payload);
        break;
      case "profile":
        const _questions2 = payload.attributes.profile.profileQuestions
        _questions2.splice(selectedIndex[0], 1);
        payload.attributes.profile.profileQuestions = _questions2;
        setPayload(payload);
        break;
      case "customisedQuestions":
        const _questions3 = payload.attributes.customisedQuestions
        _questions3.splice(selectedIndex[0], 1);
        payload.attributes.customisedQuestions = _questions3;
        setPayload(payload);
        break;
      default:
        break;
    }
    ResetSelectedIndex()
    ResetQuestion();
    setSelectedMenu("");
  }

  function Validation() {
    if (!payload.attributes.coverImage) {
      return "Please upload an image"
    }
    return
  }

  async function FetchApplicationSchema(abortController: AbortController) {
    setLoading(1);
    try {
      const response = await GetApplicationSchemaPayload(abortController);
      console.log("payload", response);

      setPayload(response);
    } catch (error) {
      message.error("Error occured while fetching data.")
    }
    setLoading(0);
  }

  async function handleSubmit() {

    const validdate = Validation()
    if (validdate) {
      return message.error(validdate);
    }

    setLoading(2);
    try {
      const res = await SubmitPayload(payload);
      message.success("Data updated succesfully");
      console.log("res", res);

    } catch (error: any) {
      message.error("Oops, operation failed")
    }
    setLoading(0);
  }

  useEffect(() => {
    const abortController = new AbortController();
    FetchApplicationSchema(abortController)

    return () => {
      abortController.abort;
    }
  }, [])


  if (!payload) {
    return <></>
  }

  if (loading === 1) {
    return <LoadingScreen />
  }

  return (
    <div className="px-10">

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
                    {
                      data.hasOptions && <div className="flex gap-3 items-center">

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
                      </div>
                    }
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
            return (
              <>
                <div key={i} className="border-b mt-4">
                  <>
                    <AdditionalQuestionsComponent
                      ToggleUpdateQuestion={ToggleUpdateQuestion}
                      data={data}
                      index={i}
                    />
                  </>

                  {
                    (selectedIndex[0] === i && selectedIndex[1] === "customisedQuestions") &&
                    <UpdateQuestionComponent
                      DeleteQuestion={DeleteQuestion}
                      SaveUpdatedQuestion={SaveUpdatedQuestion}
                      UpdateFieldOperation={UpdateFieldOperation}
                      data={data}
                      newQuestion={newQuestion}
                    />
                  }
                </div>

              </>
            )
          })
        }

        <>
          {
            selectedMenu === "personalInformation" &&
            < QuestionsComponent
              question={newQuestion}
              update={setNewQuestion}
              save={SaveQuestion}
              reset={ResetQuestion}
            />
          }
        </>

        <>
          <AddQuestionButton
            AddQuestion={AddQuestion}
            selectedMenu={selectedMenu}
            type="personalInformation"
          />
        </>
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
            return (
              <>
                <div key={i} className="border-b mt-4">
                  <>
                    <AdditionalQuestionsComponent
                      ToggleUpdateQuestion={ToggleUpdateQuestion}
                      data={data}
                      index={i}
                    />
                  </>

                  {
                    (selectedIndex[0] === i && selectedIndex[1] === "profile") &&
                    <UpdateQuestionComponent
                      DeleteQuestion={DeleteQuestion}
                      SaveUpdatedQuestion={SaveUpdatedQuestion}
                      UpdateFieldOperation={UpdateFieldOperation}
                      data={data}
                      newQuestion={newQuestion}
                    />
                  }
                </div>
              </>
            )
          })
        }

        <>
          {
            selectedMenu === "profile" &&
            < QuestionsComponent
              question={newQuestion}
              update={setNewQuestion}
              save={SaveQuestion}
              reset={ResetQuestion}
            />
          }
        </>

        <>
          <AddQuestionButton
            AddQuestion={AddQuestion}
            selectedMenu={selectedMenu}
            type="profile"
          />
        </>
      </FormWrapper>

      <FormWrapper title="Additional questions">
        <div>

          <>
            {
              payload.attributes.customisedQuestions.length > 0 &&
              payload.attributes.customisedQuestions.map((data, i) => {
                return (
                  <div key={i} className="border-b mt-4">
                    <>
                      <AdditionalQuestionsComponent
                        ToggleUpdateQuestion={ToggleUpdateQuestion}
                        data={data}
                        index={i}
                      />
                    </>

                    {
                      (selectedIndex[0] === i && selectedIndex[1] === "customisedQuestions") &&
                      <UpdateQuestionComponent
                        DeleteQuestion={DeleteQuestion}
                        SaveUpdatedQuestion={SaveUpdatedQuestion}
                        UpdateFieldOperation={UpdateFieldOperation}
                        data={data}
                        newQuestion={newQuestion}
                      />
                    }
                  </div>
                )
              })
            }
          </>

          <>
            {
              selectedMenu === "customisedQuestions" &&
              < QuestionsComponent
                question={newQuestion}
                update={setNewQuestion}
                save={SaveQuestion}
                reset={ResetQuestion}
              />
            }
          </>

          <>
            <AddQuestionButton
              AddQuestion={AddQuestion}
              selectedMenu={selectedMenu}
              type="customisedQuestions"
            />
          </>

        </div>
      </FormWrapper>

      <div>
        <button className="px-6 py-3 w-[400px] my-6 bg-textBlue text-white rounded-lg disabled:opacity-50"
          onClick={handleSubmit}
          disabled={loading === 2 ? true : false}
        >
          {loading === 2 ? "Processing..." : "Submit Details"}
        </button>
      </div>

    </div>
  )
}

