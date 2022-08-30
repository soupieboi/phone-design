export default function Wrapper({ children, expanded }) {
  return(
    <div className={expanded ? "min-h-screen h-screen ml-auto w-6/6 xl:w-6/6" : "min-h-screen h-screen ml-auto w-full sm:w-4/6 xl:w-5/6"}>{children}</div>
  )
}