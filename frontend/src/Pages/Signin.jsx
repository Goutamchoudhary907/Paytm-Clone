import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubHeading } from '../components/SubHeading';
import { Heading } from '../components/Heading';
import { InputBox } from '../components/InputBox';
import  Button from '../components/Button';
import { BottomWarning } from '../components/BottomWarning';
import axios from 'axios';

export const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [message,setMessage]=useState("")

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setMessage("")
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setMessage("")
    };

    const handleSignin = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!email || !password){
            setMessage("Please enter a valid email and password");
            return;
        }
         if(! emailRegex.test(email)) {
            setMessage('Please enter a valid email address.');
            return;  
        }
          if (password.length < 6) {
            setMessage('Password must be at least 6 characters long.');
            return;
        }
        try {
            const response = await axios.post('https://paytm-clone-black.vercel.app/api/v1/user/signin', {
                username: email,
                password: password
            });
            if(response.status ===200){
                console.log('Sign-in successful:', response.data);
                navigate('/dashboard');
            }
        } catch (error) {
             if (error.response?.status ===411){
                setMessage('Incorrect email or password.');
                console.log("Incorrect email or password.");
                }else{
                setMessage('An error occurred. Please try again later.');
                }
                console.error('Sign-in error:', error);
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                    <InputBox
                        placeholder="example@gmail.com"
                        label={"Email"}
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <InputBox
                        placeholder="123456"
                        label={"Password"}
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <div className="text-red-500 text-sm mt-2">
                        {message}
                    </div>
                    <div className="pt-4">
                        <Button label={"Sign in"} onClick={handleSignin} />
                    </div>
                    <BottomWarning label={"Don't have an account"} buttontext={"Sign up"} to={"/signup"} />
                </div>
            </div>
        </div>
    );
};