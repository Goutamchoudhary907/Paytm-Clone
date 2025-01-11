import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import Button from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const Signup= () =>{
    const [firstName,setFirstName] =useState("")
    const [lastName,setLastName] =useState("")
    const [username,setUsername] =useState("")
    const [password,setPassword] =useState("")  
    const [message,setMessage]=useState("")  
    const navigate=useNavigate();

    const handleSignup =async () =>{
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if(!username || !password){
        setMessage("Please enter email and password");
            return;
       }
       if(! emailRegex.test(username)){
        setMessage('Please enter a valid email address.');
        return;  
       }
       if (password.length < 6) {
        setMessage('Password must be at least 6 characters long.');
        return;
    }
    if(!firstName || !lastName){
      setMessage("Please enter Firstname and Lastname")
    }
    try {
      const response=await axios.post("http://localhost:3000/api/v1/user/signup" , {
        username,
        firstName,
        lastName,
        password
    });
    localStorage.setItem("token", response.data.token);
    navigate("/dashboard")
     } catch (error) {
      if(error.response?.status ===400){
        setMessage("Incorrect inputs")
      }else if(error.response?.status === 411){
        setMessage("Email already taken")
      }
      console.error("Sign up error" ,error)       
     }
    }  

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"}/>
                <SubHeading label={"Enter your information to create an account"}/>
                <InputBox onChange={(e) =>{
                    setFirstName(e.target.value)
                }} placeholder="John" label={"First Name"}/>
                <InputBox onChange={(e) => {
                  setLastName(e.target.value);
                }} placeholder="Doe" label={"Last Name"} />
                <InputBox onChange={e => {
                  setUsername(e.target.value);
                }} placeholder="example@gmail.com" label={"Email"} />
                <InputBox onChange={(e) => {
                  setPassword(e.target.value)
                }} placeholder="123456" label={"Password"} />
                <div>{message}</div>
              <div className="pt-4">
                <Button onClick={handleSignup} label={"Sign up"}/>
              </div>
              <BottomWarning label={"Already have an account?"} buttontext={"Sign in"} to={"/signin"} />
             </div>
        </div>
    </div>
}