import { Link, useNavigate } from "react-router-dom"
import { ChangeEvent, useState } from "react"
import { SignupInput } from "@vj-npm/common-app"
import axios from "axios"
import { BACKEND_URL } from "../config"
export const Auth =({type}: {type:"signup"| "signin"}) =>{
    const navigate = useNavigate();
    const [postInputs,setPostInputs] = useState<SignupInput>({
        name:"",
        username:"",
        password:"",
    })

    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`,postInputs);
            const jwt = response.data.token;
            localStorage.setItem("token",`Bearer ${jwt}`);
            navigate("/blogs")
        }  
         catch(e){
            alert("Error while Signing Up")
            console.error(e);
        }
    }
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-6 pb-2 ">
                    <div className="text-3xl font-extrabold">
                        Create an account
                    </div>
                    <div className=" text-slate-500">
                        {type === "signin" ? "Don't have an account" : "Already have an account?"} 
                        <Link to={type === "signin" ? "/signup": "/signin"} className="pl-2 underline">
                            { type === "signin" ? "Sign up" : "Sign in"}</Link>
                    </div>
                </div>
                <div className="pt-4"> {type === "signup" 
                    ?   <LabelledInput label="Name" placeholder="Authur Morgan" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                name: e.target.value
                            })
                        }}/>
                        : null
                    }
                    
                    <LabelledInput label="Email" placeholder="authur1@gmail.com" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            username: e.target.value
                        })
                    }}/>
                    <LabelledInput label="Password" type={"password"} placeholder="123456" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }}/>
                    <button onClick={sendRequest} type="button" className="mt-6 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
                     focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700
                      dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>
                </div>
            </div>
        </div>
    </div>
}

interface InputType{
    label: string;
    placeholder:string;
    onChange:(e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({label, placeholder,onChange,type }:InputType){
    return <div>
        <label className="block mb-1 text-sm font-semibold text-black pt-2">{label}</label>
        <input onChange={onChange} type={type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
         block w-full p-2.5 mb-2"
          placeholder={placeholder} required />
    </div>

}