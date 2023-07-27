import { useState } from "react";
import { AiOutlineCaretRight } from "react-icons/ai";

export default function DashboardTopbar() {

  const Tabs = [
    "Program Details",
    "Application Form",
    "Workflow",
    "Preview"
  ]

  const [hoveredTab, setHoveredTab] = useState(Tabs[1]);

  return (
    <nav className="my-10 custom-shadow w-full flex">
      {
        Tabs.map((tab, i) => {
          return (
            <div
              key={i}
              onMouseOver={() => setHoveredTab(tab)}
              className={`w-[25%] py-4 font-medium text-center relative text-xl
            ${hoveredTab === tab ? 'bg-bgGreen text-white' : 'bg-white text-black'}
            `}>
              <div className={`p-4 ${hoveredTab !== tab && "border-r"}`}>
                {tab}
              </div>
              {hoveredTab === tab && <div className="absolute z-10 right-[-20px] h-full top-0 flex flex-col justify-center">
                <AiOutlineCaretRight className="text-bgGreen text-3xl" />
              </div>}
            </div>
          )
        })
      }

    </nav>
  )
}
