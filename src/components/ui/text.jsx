export function H1({ children, className = '' }) {
  return (
    <h1 className={`text-3xl sm:text-4xl font-semibold text-balance ${className}`}>
      {children}
    </h1>
  )
}

export function H2({ children, className = '' }) {
  return (
    <h2 className={`text-2xl sm:text-3xl font-semibold text-balance ${className}`}>
      {children}
    </h2>
  )
}
