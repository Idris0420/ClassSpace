import LogoOnly from '../assets/LogoOnly.png'
import Info from '../assets/Info.png'
import Menu from '../assets/Menu.png'
import PageNotFound from './PageNotFound'

function DashBoard() {
    return(
        <div className='flex w-[100vw] items-start flex-col'>
            <div className='flex items-center justify-center bg-[#FFABD4] h-[10vh] w-[100%]'>
                <div className='h-[100%] flex items-center justify-center gap-3 font-inria font-bold text-4xl'>
                    <img src={LogoOnly} className='h-[70%]' alt="" />
                    <h1>Class Space</h1>
                </div>
            </div>
            <div className='flex'>
                <div className='w-[30vw] h-[90vh] bg-[#1A1A1D] border-r-2 border-[#D9D9D9]'>      
                    <div className="w-[100%] h-[10%]  flex items-center relative px-5">
                        <img src={Menu} alt="menu" className=" z-10 cursor-pointer" />
                        <h1 className="absolute left-1/2 transform -translate-x-1/2 font-inria text-white text-4xl font-bold">Chats</h1>
                    </div>
                    
                </div>
                <div className='w-[70vw] h-[90vh] bg-[#1A1A1D]'>
                    <div className='w-[100%] h-[10vh] bg-[#3B1C32] flex items-center relative justify-end px-5'>
                        <h1 className='font-inria text-white text-4xl font-bold absolute left-1/2 transform -translate-x-1/2'>Science</h1>
                        <img className='cursor-pointer h-[50%]' src={Info} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoard;