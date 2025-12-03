export default function Button({ children, className = '', ...props }){
  return (
    <button
      {...props}
      className={
        "px-4 py-2 rounded-lg font-semibold shadow-sm transition focus:outline-none " +
        className
      }
    >
      {children}
    </button>
  )
}
