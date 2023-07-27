import { Avatar } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Assets } from '../utils/constants'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <Sider
      trigger={null} collapsible collapsed={true}
      style={{
        backgroundColor: "white",
        padding: "20px 10px",
        height: "1000px"
      }}
    >

      <div className=" h-full flex flex-col items-center justify-between">
        <div className=' flex flex-col items-center gap-4 '>
          <div className=''>
            <Avatar size={40}></Avatar>
          </div>

          <div className='flex flex-col gap-6 mt-6 '>
            <Link to="/home">
              <div className='p-4 rounded-lg bg-lightBlue' role='button'>
                <img src={Assets.home} alt="home" />
              </div>
            </Link>


            <div className='p-4 rounded-lg hover:bg-lightBlue' role='button'>
              <img src={Assets.people} alt="people" />
            </div>

            <div className='p-4 rounded-lg hover:bg-lightBlue' role='button'>
              <img src={Assets.calender} alt="calender" />
            </div>

            <div className='p-4 rounded-lg hover:bg-lightBlue' role='button'>
              <img src={Assets.share} alt="share" />
            </div>

            <div className='p-4 rounded-lg hover:bg-lightBlue' role='button'>
              <img src={Assets.file} alt="file" />
            </div>

            <div className='p-4 rounded-lg hover:bg-lightBlue' role='button'>
              <img src={Assets.note} alt="note" />
            </div>

            <div className='p-4 rounded-lg hover:bg-lightBlue' role='button'>
              <img src={Assets.heart} alt="heart" />
            </div>

            <Link to="/">
              <div className='p-4 rounded-lg hover:bg-lightBlue text-center flex justify-center items-center' role='button'>
                <img src={Assets.left_chevron} alt="left_chevron" />
              </div>
            </Link>

          </div>
        </div>

        <div className='flex flex-col items-center gap-5'>
          <div className='p-4 rounded-lg hover:bg-lightBlue' role='button'>
            <img src={Assets.settings} alt="settings" />
          </div>

          <div className='p-2 rounded-full text-xs text-textBlue  bg-lightBlue ' role='button'>
            AS
          </div>
        </div>
      </div>


    </Sider>
  )
}
