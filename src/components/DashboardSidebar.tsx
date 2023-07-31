import { Avatar, Button } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Assets } from '../utils/constants'
import { Link } from 'react-router-dom'
import { AiOutlineHome, AiOutlineMenu } from "react-icons/ai";


export default function DashboardSidebar() {
  return (
    <Sider
      trigger={null} collapsible collapsed={true}
      style={{
        backgroundColor: "white",
        padding: "20px 10px",
        height: "100vh",
        position: "sticky",
        top: "0px",
        left: "0px",
      }}
      className='custom-shadow'
    >

      <div className=" h-full flex flex-col items-center">
        <div
          className=''
        >
          <Button type="text">
            <AiOutlineMenu className="text-2xl" />
          </Button>
        </div>

        <div className='mt-10'>

          <Link to="/home">
            <div
              className=''
            >
              <Button type="text">
                <AiOutlineHome className="text-2xl" />
              </Button>
            </div>
          </Link>

          <div
            className='mt-6'
          >
            <Button type="text">
              {/* <AiOutlineMenu className="text-2xl" /> */}
              <img src={Assets.list} alt="list" />
            </Button>
          </div>
        </div>

        <div className='flex-grow flex justify-center items-center'>
          <div className=''>
            <Avatar style={{
              color: "white",
              backgroundColor: "#1D4ED8",
              fontWeight: 600
            }} size={40}>NT</Avatar>
          </div>
        </div>

      </div>


    </Sider>
  )
}
