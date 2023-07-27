
interface IFormWrapper {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  title: string;
}

export default function FormWrapper({ children, title }: IFormWrapper) {
  return (
    <div className="rounded-lg mb-8 bg-white w-[400px] shadow">
      <div className="rounded-t-lg font-semibold bg-lightGreen p-4">
        {title}
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  )
}
