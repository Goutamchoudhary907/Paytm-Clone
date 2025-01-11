import Button from './Button'

export const Appbar= ({onClick,label,user}) =>{
 return <div className="shadow h-14 flex justify-between"> 
  <div className="flex flex-col justify-center h-full ml-4">
     payTM App
  </div>
  <div className="flex pr-5">
    <div className="flex  flex-col justify-center h-full pr-3">
       Hello {user}
    </div>
    <div className="flex flex-col justify-center pr-3">
      <Button label={label} onClick={onClick}/>
    </div>
    <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center mt-2 mr-2">
     <div className="flex flex-col justify-center h-full text-xl">
        {user.toString().toUpperCase()[0]}
     </div>
    </div>
  </div>
 </div>   
}