import { useNavigate } from "react-router-dom";
import {Appbar} from "../components/Appbar";
import {Balance} from "../components/Balance";
import { Users } from "../components/Users";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Dashboard(){
    const navigate=useNavigate();
    const [balance,setBalance]=useState(0);
    const [user,setUser]=useState("");
    const [userId, setUserId] = useState("");


    useEffect(()=>{
        async function func(){
            const token = localStorage.getItem("token");
            if (!token) {
              console.error("No token found in localStorage");
              return;
            }
             try {
                const response=await axios.get("http://localhost:3000/api/v1/account/balance" ,{
                    headers:{
                        Authorization:"Bearer "+localStorage.getItem("token")
                    }
                });
                console.log("Balance and User Response:", response.data);
         
                setBalance(response.data.balance);
                setUser(response.data.firstName);
                setUserId(response.data.userId); 
   
             } catch (error) {
                console.error("Error fetching balance and user:", error);
             }
           
        }
        func();
    },[])
    return <div className="min-h-screen bg-gray-100">
        <Appbar onClick={async ()=>{
            try{
                const response=await axios.get("http://localhost:3000/api/v1/user/signout" ,{
                    headers:{
                        Authorization:"Bearer "+localStorage.getItem("token"),
                    },
                });
                console.log("Signout response:",response);
                localStorage.removeItem("token");
                navigate("/signin");
            }catch(error){
                console.error("Error during signout:", error);
            }
            
        }} label={"signout"} user={user}/>
         <div className="container mx-auto py-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Welcome, {user}!</h1>
          <Balance value={balance.toFixed(2)} />
        </div>
        <div className="mt-8">
          <Users currentUserId={userId}/>
        </div>
      </div>
    </div>
}