import {Spinner} from "@nextui-org/react";

export default function CheckingLayout({ children }) {
  return (
    <div className="m-5 flex items-center animate-pulse">
      <Spinner className="mr-5" /> {children}
    </div>
  )
}
