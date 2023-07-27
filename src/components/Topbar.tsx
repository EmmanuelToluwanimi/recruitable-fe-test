// import React, { useState } from 'react'
import { Assets } from '../utils/constants'
import { Badge, Dropdown, MenuProps } from 'antd'
import { useState } from 'react';
import { AiOutlineDown } from "react-icons/ai";

const _items: MenuProps['items'] = [];

const _menuProps = {
  _items,
  onClick: () => { },
};

// const items: MenuProps['items'] = [
//   {
//     label: '1st menu item',
//     key: '1',
//   },
//   {
//     label: '2nd menu item',
//     key: '2',
//   },
//   {
//     label: '3rd menu item',
//     key: '3',
//   },
//   {
//     label: '4rd menu item',
//     key: '4',
//   },
// ];

// const menuProps = {
//   items,
//   onClick: () => { },
// };

interface IOpportunity {
  title: string;
  count: number;
}


export default function Topbar() {

  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, sethoveredItem] = useState("");

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleHoverLeave = () => {
    setIsHovered(false);
  };

  const opportunities: IOpportunity[] = [
    {
      title: "Applied",
      count: 1745,
    },
    {
      title: "Shortlisted",
      count: 453,
    },
    {
      title: "Technical Interview",
      count: 123,
    },
    {
      title: "Opportunity Browsing",
      count: 243,
    },
    {
      title: "Video Interview I",
      count: 25,
    },
    {
      title: "Video Interview II",
      count: 25,
    },
    {
      title: "Video Interview III",
      count: 25,
    },
    {
      title: "Offer",
      count: 25,
    },
    {
      title: "Withdrawn",
      count: 25,
    },
  ]

  return (
    <nav className='flex items-start gap-10'>
      <div className='w-[385px]'>
        <h1 className='text-textBlue font-semibold text-xl'>London Internship Program</h1>
        <p className='text-xs font-light mt-3'>London</p>
      </div>

      {/* <div>
        <Dropdown
         menu={menuProps}
        
         >
          <Button>
            <Space>
              Button
              <AiOutlineDown />
            </Space>
          </Button>
        </Dropdown>
      </div> */}

      {/* @todo: apply overlay or opacity here */}

      <div className='flex justify-between flex-grow'>
        <div className='bg-white px-3 py-2 shadow-md rounded-2xl relative w-[321px] z-10'
          onMouseEnter={handleHover}
          onMouseLeave={handleHoverLeave}
        >
          <div className='text-textBlue font-medium flex items-center justify-between gap-10'
          >
            <div>
              Opportunity Browsing
            </div>
            <AiOutlineDown className="text-textBlue" />
          </div>
          {isHovered && <div className='absolute shadow left-0 top-[30px] rounded-r-lg rounded-b-lg bg-white w-full'>
            {
              opportunities.map((item, i) => {
                return <>
                  {
                    opportunities.length - 1 === i ? <div
                      onMouseOver={() => sethoveredItem(item.title)}
                      role='button' key={i} className='shadow hover:bg-[#EDF2FF] hover:text-textBlue rounded-r-lg rounded-b-lg flex justify-between items-center px-3 py-4'>
                      <div>
                        {item.title}
                      </div>
                      <Badge
                        style={{
                          backgroundColor: hoveredItem === item.title ? "#D1DDFF" : "#F8F8F8",
                          color: hoveredItem === item.title ? "#1D4ED8" : "black"
                        }}
                        count={item.count}
                      />
                    </div> : <div
                      onMouseOver={() => sethoveredItem(item.title)}
                      key={i} className='shadow flex hover:bg-[#EDF2FF] hover:text-textBlue justify-between items-center px-3 py-4'>
                      <div>
                        {item.title}
                      </div>
                      <Badge
                        style={{
                          backgroundColor: hoveredItem === item.title ? "#D1DDFF" : "#F8F8F8",
                          color: hoveredItem === item.title ? "#1D4ED8" : "black"
                        }}

                        overflowCount={20000}
                        count={item.count}
                      />
                    </div>
                  }
                </>
              })
            }

          </div>}
        </div>

        <div className='flex gap-2'>
          <div className='p-3 shadow-sm rounded-lg bg-white' role='button'>
            <img src={Assets.tag} alt="tag" />
          </div>
          <div className='p-3 shadow-sm rounded-lg bg-white' role='button'>
            <img src={Assets.userx} alt="userx" />
          </div>
          <div className='p-3 shadow-sm rounded-lg bg-white' role='button'>
            <img src={Assets.user_check} alt="user_check" />
          </div>
          <div className='p-3 shadow-sm rounded-lg bg-white' role='button'>
            <img src={Assets.user_echo} alt="user_echo" />
          </div>
          <div className='p-3 shadow-sm rounded-lg bg-white' role='button'>
            <img src={Assets.envelope} alt="envelope" />
          </div>

          <div>
            <Dropdown.Button style={{
              backgroundColor: "#1D5ECD",
              borderRadius: "8px",
              width: "230px",
              height: "100%",
              display: "flex",
              alignItems: "center"
            }} menu={_menuProps} type='primary' icon={<AiOutlineDown />}>
              Move To Video Interview I
            </Dropdown.Button>
          </div>
        </div>
      </div>




    </nav>
  )
}
