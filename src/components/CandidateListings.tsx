import { Badge, Checkbox } from 'antd'
import { useState } from 'react';
import Candidate from './Candidate';

export default function CandidateListings() {

  const [selectedTab, setSelectedTab] = useState("Qualified");
  const [allChecked, setAllChecked] = useState(false);

  const Tabs = [
    {
      title: "Qualified",
      count: 0,
    },
    {
      title: "Task",
      count: 25,
    },
    {
      title: "Disqualified",
      count: 25,
    },
  ]

  return (
    <div className='px-4 rounded-lg bg-white flex flex-col flex-grow'>

      <div className='flex py-4 justify-between w-full'>
        <div className='flex gap-4 items-center'>
          <div className=''>
            <Checkbox onChange={(e)=> setAllChecked(e.target.checked)}></Checkbox>
          </div>
          <div className='text-textBlue font-semibold'>
            247 Candidates
          </div>
        </div>

        <div className='flex'>
          {
            Tabs.map((item, i) => {
              return <div
                onMouseOver={() => setSelectedTab(item.title)}
                role='button' className={` 
              hover:text-textBlue px-4 flex items-center gap-2 
              ${selectedTab === item.title && "text-textBlue"}
              ${(Tabs.length - 1 !== i) && "border-r"}
              `}>
                {item.title}
                <Badge
                  style={{
                    backgroundColor: selectedTab === item.title ? "#D1DDFF" : "#F8F8F8",
                    color: selectedTab === item.title ? "#1D4ED8" : "black"
                  }}
                  count={item.count}
                />
              </div>
            })
          }

        </div>
      </div>

      <div className=''>
        {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          Array.from({ length: 8 }).map((_, i) => {
            return (
              <Candidate index={i} checked={allChecked} />
            )
          })
        }

      </div>



    </div>
  )
}
