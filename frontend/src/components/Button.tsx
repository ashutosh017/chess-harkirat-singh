export const Button = ({onclick, children}:{onclick:()=>void, children:React.ReactNode})=>{
    return <div>
        <button onClick={onclick} className="font-bold text-xl bg-green-500 px-4 py-2 rounded-md w-full hover:bg-green-400">{children}</button>
    </div>
}