import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const AppBar = () => {
    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer">
           BlogSphere 
        </Link>
        <div className="flex">
            <div className="pr-4" >
                <Link to={'/publish'}>
                    <a href="#_" className="relative inline-block px-4 py-2 font-medium group">
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                        <span className="relative text-black group-hover:text-white">Publish</span>
                    </a>
                </Link>
            </div>
            <Avatar name="Vijay" size="big"/>
        </div>
    </div>
}