import { Layout } from 'antd'
import Sidebar from '../components/Sidebar'
import { Content } from 'antd/es/layout/layout'
import Topbar from '../components/Topbar'
import FilterSection from '../components/FilterSection'
import CandidateListings from '../components/CandidateListings'

export default function Home() {
  return (
    <>
      <main className='min-h-screen bg-bgBlue'>

        <Layout
          style={{
            width: "100%",
            minHeight: "100vh",
            backgroundColor: "#F9FAFF"
          }}
        >
          <div className='shadow'>
            <Sidebar />
          </div>
          <Content>
            <section className='p-10 h-[1000px] overflow-y-auto'>
              <Topbar />
              <div className='mt-8 flex gap-10'>
                <FilterSection />
                <CandidateListings />
              </div>
            </section>
          </Content>
        </Layout>
      </main>
    </>
  )
}
