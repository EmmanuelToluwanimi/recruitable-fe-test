import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import DashboardSidebar from '../components/DashboardSidebar'
import DashboardTopbar from '../components/DashboardTopbar'
import ApplicationForm from '../components/ApplicationForm'

export default function Dashboad() {
  return (
    <>
      <main className='min-h-screen bg-white'>

        <Layout
          style={{
            width: "100%",
            minHeight: "100vh",
            backgroundColor: "white"
          }}
        >
          <div className='sticky top-0'>
            <DashboardSidebar />
          </div>
          <Content>
            <section className='bg-white'>
              <DashboardTopbar />
              <div className=''>
                <ApplicationForm />
              </div>
            </section>
          </Content>
        </Layout>
      </main>
    </>
  )
}
