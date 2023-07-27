export interface IPersonalInput {
  name: string,
  value: string,
  subtext: string,
  hasOptions: boolean
}

export interface IApplicationSchema {
  id: string;
  type: string;
  attributes: Attributes;
}

export interface Attributes {
  coverImage: string;
  personalInformation: PersonalInformation;
  profile: Profile;
  customisedQuestions: Question[];
}

export interface Question {
  id: string;
  type: string;
  question: string;
  choices: string[];
  maxChoice: number;
  disqualify: boolean;
  other: boolean;
}

export interface PersonalInformation {

  firstName: CurrentResidence;
  lastName: CurrentResidence;
  emailId: CurrentResidence;
  phoneNumber: CurrentResidence;
  nationality: CurrentResidence;
  currentResidence: CurrentResidence;
  idNumber: CurrentResidence;
  dateOfBirth: CurrentResidence;
  gender: CurrentResidence;
  personalQuestions: Question[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface CurrentResidence {
  internalUse: boolean;
  show: boolean;
}

export interface Profile {
  education: Education;
  experience: Education;
  resume: Education;
  profileQuestions: Question[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface Education {
  mandatory: boolean;
  show: boolean;
}
