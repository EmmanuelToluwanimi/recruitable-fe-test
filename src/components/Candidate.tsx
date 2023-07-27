import { Avatar, Checkbox } from 'antd'
import { Assets } from '../utils/constants';
import { AiOutlinePlayCircle } from "react-icons/ai";
import { useState } from 'react';

interface ICandidateComponent {
  index: number;
  checked: boolean;
}

export default function Candidate({ index, checked }: ICandidateComponent) {
  const Places = ["New York", "Marketing", "London"];
  const [user_selection, setUser_selection] = useState(false);


  return (
    <div className='border-t py-6 flex justify-between'>

      <div className='flex items-center gap-4'>
        <div>
          <Checkbox onChange={(e) => setUser_selection(e.target.checked)} checked={user_selection || checked}></Checkbox>
        </div>

        <div>
          <Avatar
            size={50}
            style={{
              backgroundColor: "#EDF4FF",
              color: "#D0E1FF",
              fontWeight: 600,
            }}>AS</Avatar>
        </div>

        <div className='flex flex-col gap-1'>
          <h2 className='font-semibold text-[16px]'>
            Aaliyah Sanderson
          </h2>
          <div className='text-sm'>
            Riyadh, Saudi Arabia
          </div>
          <div className='text-sm font-light'>
            Bachelor - Cambridge University (2023 - 2023)
          </div>
          <div className='flex gap-2 text-xs'>
            <span className='text-textBlue'>#top_candidate</span>
            <span className='text-textBlue'>#top_candidate</span>
          </div>
          <div className='flex gap-2'>
            {
              Places.map(item => {
                return <div className='text-xs rounded px-2 shadow-sm bg-[#F3FAFC] text-[#037092]'>
                  {item}
                </div>
              })
            }
          </div>
        </div>
      </div>

      {index > 5 && <div className='flex items-start gap-4'>
        <div className='bg-[#F7F8FD] text-[#305DC6] shadow-sm rounded-lg text-xs p-1 flex items-center gap-2'>
          {/* <img src={Assets.play_outline} alt="play_outline" /> */}
          <AiOutlinePlayCircle />
          <span>4</span>
        </div>

        <div className='bg-[#F7F8FD] text-[#305DC6] shadow-sm rounded-lg text-xs p-1 flex gap-2'>
          <img src={Assets.note_colored} alt="play_outline" />
          <span>5 programs</span>
        </div>


      </div>}

    </div>
  )
}
