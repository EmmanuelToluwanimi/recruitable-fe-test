/* eslint-disable @typescript-eslint/no-explicit-any */
import calender from "../assets/calender.svg";
import home from "../assets/home.svg";
import close_coloured from "../assets/close_coloured.svg";
import down_chevron from "../assets/down_chevron.svg";
import envelope from "../assets/envelope.svg";
import exclamation from "../assets/exclamation.svg";
import file from "../assets/file.svg";
import heart from "../assets/heart.svg";
import left_chevron from "../assets/left_chevron.svg";
import note_colored from "../assets/note_colored.svg";
import note from "../assets/note.svg";
import pen from "../assets/pen.svg";
import people from "../assets/people.svg";
import play_outline from "../assets/play_outline.svg";
import scope from "../assets/scope.svg";
import settings from "../assets/settings.svg";
import share from "../assets/share.svg";
import tag from "../assets/tag.svg";
import upload from "../assets/upload.svg";
import user_check from "../assets/user_check.svg";
import user_echo from "../assets/user_echo.svg";
import userx from "../assets/userx.svg";
import list from "../assets/list.svg";
import { v4 as uuidv4 } from 'uuid';

export const Assets = {
  calender,
  close_coloured,
  down_chevron,
  envelope,
  exclamation,
  file,
  heart,
  home,
  left_chevron,
  list,
  note,
  note_colored,
  pen,
  people,
  play_outline,
  scope,
  settings,
  share,
  tag,
  upload,
  user_check,
  user_echo,
  userx
}

export const QUESTIONS = [
  {
    value: "Paragraph", label: "Paragraph"
  },
  {
    value: "Short Answer", label: "Short Answer"
  },
  {
    value: "Yes/No", label: "Yes/No"
  },
  {
    value: "Dropdown", label: "Dropdown"
  },
  {
    value: "Multiple Choice", label: "Multiple Choice"
  },
  {
    value: "Date", label: "Date"
  },
  {
    value: "Number", label: "Number"
  },
  {
    value: "File upload", label: "File upload"
  },
  {
    value: "Video question", label: "Video question"
  }
]

export function testNumber(params: any) {
  const regex = /^\d+$/;
  return regex.test(params)
}

export function generateRandomId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let randomId = '';

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}

export function generateId() {
  return uuidv4();
}