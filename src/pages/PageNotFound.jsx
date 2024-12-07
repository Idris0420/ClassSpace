import { Link } from "react-router-dom"

function PageNotFound(){
    return(
        <div className="pageNotFound h-[100vh] w-[100vw] flex items-center justify-center">
            <div className="backdrop-blur relative bg-[#212121] bg-opacity-70 h-[50%] aspect-square flex items-center justify-start flex-col rounded-[50px] ">
                <h1 className="mt-[15%] text-white font-bold text-5xl font-inria">Page Not Found</h1>
                <Link to='/' ><button className="absolute left-1/2 top-3/4 transform -translate-x-1/2 -translate-y-[70%] bg-[#915472] px-3 py-5 rounded-[20px] text-2xl font-inria text-white">Go to Home Page</button></Link>
            </div>
        </div>
    )
}

export default PageNotFound