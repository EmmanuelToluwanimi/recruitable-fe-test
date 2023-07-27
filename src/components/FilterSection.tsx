import { Input } from "antd";
import { Assets } from "../utils/constants";

function ScopeIcon() {
  return <img src={Assets.scope} alt="scope" />
}

function ExclamationIcon() {
  return <img src={Assets.exclamation} alt="exclamation" />
}

export default function FilterSection() {

  const Filters = [
    "Personal Information",
    "Education",
    "Work Experience",
    "Activity Filter",
    "Advanced Filter"
  ];

  return (
    <div className="w-[385px]">
      <Input
        size="large"
        placeholder="Enter your username"
        prefix={<ScopeIcon />}
        suffix={
          <ExclamationIcon />
        }
      />

      <div className="bg-white rounded-lg mt-10 shadow">
        <div className="flex justify-between p-4 rounded-t-lg">
          <div className="font-md">Filters</div>
          <div className="font-light text-xs">0 selected</div>
        </div>

        {
          Filters.map((item, i) => {
            return (
              <div key={i} className="flex justify-between border-t items-center p-4">
                <div className="flex items-center gap-4">
                  <div >
                    <img className="w-[12px]" src={Assets.file} alt="file" />
                  </div>
                  <div>
                    {item}
                  </div>
                </div>
                {(Filters.length - 1 !== i) && <div>
                  <img src={Assets.down_chevron} alt="down_chevron" />
                </div>}
              </div>
            )
          })
        }

      </div>
    </div>
  )
}