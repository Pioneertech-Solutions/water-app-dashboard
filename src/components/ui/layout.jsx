export function Container({ children, className = '' }) {
  return (
    <div className={`mx-auto w-full min-[600px]:w-[500px] sm:w-[450px] px-3 ${className}`}>
      {children}
    </div>
  )
}
