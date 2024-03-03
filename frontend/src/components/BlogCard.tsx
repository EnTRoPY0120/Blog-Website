import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName:string,
    title:string,
    content:string,
    publishedDate:string;
    id:string
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate,
}: BlogCardProps) => {
    const readingTime = Math.ceil(content.length/150);
    
    return <Link to={`/blog/${id}`}>
     <div className=" border-b border-slate-200 p-4 cursor-pointer">
        <div className ="flex">
            <Avatar name ={authorName} size="small"/>
            <div className ="font-extralight pl-2 text-sm flex flex-col justify-center ">
                {authorName}
            </div>
            <div className="flex flex-col justify-center pl-2">
                <Circle/>
            </div>
            <div className ="pl-2 font-thin text-slate-500 flex flex-col justify-center">
             {publishedDate}
            </div>
        </div>
        <div className="text-xl font-semibold pt-2">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.length > 100 ? content.slice(0,100) + "..." : content }
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">
            {`${readingTime} ${readingTime === 1 ? "min" : "mins"} read`}
        </div>
    </div>
</Link>
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}

export function Avatar({name , size= "small"}: {name:string, size:"small" | "big"}){
    return <div
        className={`relative inline-flex items-center justify-center overflow-hidden
         bg-gray-100 rounded-full dark:bg-gray-600 ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
            <span className={ `text-xs text-gray-600 dark:text-gray-300
            ${size === "small" ? "text-xs" : "text-md"}`}>
                {name[0]}
            </span>
    </div>
    
}