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
import { IApplicationSchema, IPersonalInput, IUpdateLogic, Question } from "../interface";
import { GetApplicationSchemaPayload, SubmitPayload } from "../services";
import LoadingScreen from "./LoadingScreen";
import AdditionalQuestionsComponent from "./AdditionalQuestionsComponent";
import UpdateQuestionComponent from "./UpdateQuestionComponent";
import QuestionsComponent from "./QuestionsComponent";
import AddQuestionButton from "./AddQuestionButton";

const { Dragger } = Upload;

export default function ApplicationForm() {

  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [selectedMenu, setSelectedMenu] = useState<string>("");
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
  const [payload, setPayload] = useState<IApplicationSchema | null>(null);

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

    if (payload && file && (file.size || 0) <= 1024 * 1024) {
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
      setPreviewUrl("");
      message.error("File size must be less than or equal to 1MB.");
    }
  };

  function DeleteImage() {
    setPreviewUrl("");

    if (!payload) return;
    const newObj = { ...payload }
    newObj.attributes.coverImage = "";
    setPayload(newObj);
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
    setSelectedMenu(key)
  }

  function ResetQuestion() {
    setNewQuestion(defaultQuestion);
    setSelectedMenu("");
    ResetSelectedIndex()
  }

  function UpdateLogic({ data, index, key, isDelete, no_reset }: IUpdateLogic) {
    if (!payload) return;
    let _questions;

    if (key === "customisedQuestions") {
      _questions = payload.attributes[key]
      isDelete ? _questions.splice(index, 1) : _questions[index] = data;
      payload.attributes[key] = _questions;
    } else {
      _questions = payload.attributes[key][GetQuestionKey(key)]
      isDelete ? _questions.splice(index, 1) : _questions[index] = data;
      payload.attributes[key][GetQuestionKey(key)] = _questions;
    }
    setPayload(payload);
    !no_reset && ResetQuestion();
  }

  function ToggleUpdateQuestion(i: number, category: string, data: Question) {
    setselectedIndex([i, category]);
    setNewQuestion({ ...data, id: data.id ? data.id : generateId() });
  }

  function ResetSelectedIndex() {
    setselectedIndex([]);
  }

  function UpdateFieldOperation(data: Question, value: any) {

    if (Object.keys(value).includes("type")) {
      const placeholder = { ...data, ...value };
      setNewQuestion(placeholder);
      UpdateLogic({
        data: placeholder,
        index: selectedIndex[0],
        key: selectedIndex[1],
        isDelete: false,
        no_reset: true
      })
    } else {
      const placeholder = { ...newQuestion, ...value };
      setNewQuestion(placeholder);
    }
  }

  function GetQuestionKey(params: string) {
    switch (params) {
      case "personalInformation":
        return "personalQuestions"
        break;
      case "profile":
        return "profileQuestions"
        break;
      default:
        return ""
        break;
    }
  }

  function SaveQuestion(index: number) {
    if (!payload) return;

    UpdateLogic({
      index,
      data: { ...newQuestion, id: generateId() },
      key: selectedMenu,
      isDelete: false,
      no_reset: false
    })
  }

  function SaveUpdatedQuestion(no_reset?: boolean) {
    if (!payload) return;

    UpdateLogic({
      data: newQuestion,
      index: selectedIndex[0],
      key: selectedIndex[1],
      isDelete: false,
      no_reset
    })

  }

  function DeleteQuestion() {
    if (!payload) return;

    UpdateLogic({
      data: newQuestion,
      index: selectedIndex[0],
      key: selectedIndex[1],
      isDelete: true,
    })

  }

  function ResetCoverImage(params:IApplicationSchema):IApplicationSchema {
    params.attributes.coverImage = "";
    return params;
  }

  function Validation() {
    if (payload && !payload.attributes.coverImage) {
      return "Please upload an image"
    }
    return
  }

  async function FetchApplicationSchema(abortController: AbortController) {
    setLoading(1);
    try {
      const response = await GetApplicationSchemaPayload(abortController);
      // console.log("payload", response);

      setPayload(
        ResetCoverImage(response)
      );
    } catch (error) {
      message.error("Error occured while fetching data.")
    }
    setLoading(0);
  }

  async function handleSubmit() {
    if (!payload) return;

    const validdate = Validation()
    if (validdate) {
      return message.error(validdate);
    }

    setLoading(2);
    try {
      await SubmitPayload(payload);
      message.success("Data updated succesfully");
      // console.log("res", response);

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


  

  if (loading === 1) {
    return <LoadingScreen />
  }

  return (
    <div className="px-10">

      {/* coverimag */}
      <>
        {
          payload?.attributes.coverImage || previewUrl ? <div className="rounded-lg mb-8 w-[400px] shadow">
            <div className="w-full h-[250px]">
              <img src={
                payload?.attributes.coverImage || previewUrl
              } className="w-full h-full object-cover object-center rounded-t-lg" alt="dummy" />
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
                      data.hasOptions && <div className="flex gap-3 w-[170px] items-center">

                        <div className="flex gap-2 items-center">
                          <Checkbox
                            value={payload?.attributes.personalInformation[data.value]?.internalUse}
                            onChange={(e) => {
                              if (!payload) {
                                return;
                              }
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
                            checked={payload?.attributes.personalInformation[data.value]?.show}
                            onChange={(e) => {
                              if(!payload) return;
                              const newObj = { ...payload }
                              newObj.attributes.personalInformation[data.value].show = e;
                              setPayload(newObj);
                            }}
                          />
                          <div>
                            {payload?.attributes.personalInformation[data.value]?.show ? "show" : "hide"}
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
          payload && payload.attributes.personalInformation.personalQuestions.length > 0 &&
          payload?.attributes.personalInformation.personalQuestions.map((data, i) => {
            return (
              <>
                <div key={i} className="border-b mt-4">
                  <>
                    <AdditionalQuestionsComponent
                      ToggleUpdateQuestion={ToggleUpdateQuestion}
                      data={data}
                      index={i}
                      category="personalInformation"
                    />
                  </>

                  {
                    (selectedIndex[0] === i && selectedIndex[1] === "personalInformation") &&
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
              lastIndex={payload?.attributes.personalInformation.personalQuestions.length}
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
                    {data.hasOptions && <div className="flex gap-3 w-[190px] items-center">
                      {/* <img src={Assets.pen} alt="pen" /> */}
                      <div className="flex gap-2 items-center">
                        <Checkbox
                          value={payload?.attributes.profile[data.value]?.mandatory}
                          onChange={(e) => {
                            if(!payload) return;
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
                          checked={payload?.attributes.profile[data.value]?.show}
                          onChange={(e) => {
                            if(!payload) return;
                            const newObj = { ...payload }
                            newObj.attributes.profile[data.value].show = e;
                            setPayload(newObj);
                          }}
                        />
                        <div>
                          {payload?.attributes.profile[data.value]?.show ? "show" : "hide"}
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
          payload && payload.attributes.profile.profileQuestions.length > 0 &&
          payload.attributes.profile.profileQuestions.map((data, i) => {
            return (
              <>
                <div key={i} className="border-b mt-4">
                  <>
                    <AdditionalQuestionsComponent
                      ToggleUpdateQuestion={ToggleUpdateQuestion}
                      data={data}
                      index={i}
                      category="profile"
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
              lastIndex={payload?.attributes.personalInformation.profileQuestions.length}
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
              payload && payload.attributes.customisedQuestions.length > 0 &&
              payload.attributes.customisedQuestions.map((data, i) => {
                return (
                  <div key={i} className="border-b mt-4">
                    <>
                      <AdditionalQuestionsComponent
                        ToggleUpdateQuestion={ToggleUpdateQuestion}
                        data={data}
                        index={i}
                        category="customisedQuestions"
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
                lastIndex={payload?.attributes.customisedQuestions.length}
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

