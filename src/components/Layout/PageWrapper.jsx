export default function PageWrapper({ children }){
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="w-full max-w-4xl">
        {children}
      </div>
    </div>
  )
}
