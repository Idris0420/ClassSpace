import LogoOnly from '../assets/LogoOnly.png'
import Info from '../assets/Info.png'
import Menu from '../assets/Menu.png'
import Attach from '../assets/Attach.png'
import Send from '../assets/Send.png'
import Close from '../assets/Close.png'
import SignOut from '../assets/SignOut.png'
import { useState } from 'react'
import Cookies from 'universal-cookie'
function DashBoard({setLogin}) {

    const cookies = new Cookies();

    const [isMenuOpen, setMenuState] = useState(false);

    const handeChange = () => {
        setMenuState(!isMenuOpen)
    }

    const handleSignOut = () => {
        setLogin(false);
        cookies.remove("auth-token");
    }

    return(
        <div className='flex w-[100vw] items-start flex-col'>
            <div className='flex items-center justify-center bg-[#FFABD4] h-[10vh] w-[100%]'>
                <div className='h-[100%] flex items-center justify-center gap-3 font-inria font-bold text-4xl'>
                    <img src={LogoOnly} className='h-[70%]' alt="" />
                    <h1>Class Space</h1>
                </div>
            </div>
            <div className='flex'>
                <div className="relative w-[30vw] h-[90vh] bg-[#1A1A1D] border-r-2 border-[#D9D9D9] flex flex-col">
                    <div className={` transition-all ease-in-out duration-300 flex flex-col items-end justify-start pt-2 h-[100%] w-[100%] bg-[#A64D79] absolute z-[100] ${
                        isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}>
                        <img src={Close} alt="" className="cursor-pointer" onClick={() => handeChange()}/>
                        <div className='mt-[15%] text-4xl font-inria text-white w-[100%] px-[20px]'>
                            <div className='hover:bg-black py-4 border-t-[3px] cursor-pointer'>Create Class</div>
                            <div className='hover:bg-black py-4 border-t-[3px] border-b-[3px] cursor-pointer'>Join Class</div>
                        </div>
                            <img className='mt-auto mr-4 mb-8 cursor-pointer' onClick={() => handleSignOut()} src={SignOut} alt="" />
                    </div>
                    <div className="w-[100%] h-[10%] relative flex items-center px-5">
                        <img src={Menu} alt="menu" className="cursor-pointer" onClick={() => handeChange()}/>
                        <h1 className="absolute left-1/2 transform -translate-x-1/2 font-inria text-white text-4xl font-bold">Chats</h1>
                    </div>
                    <div className=" w-[100%] h-[100%] overflow-y-auto">
                        <div className="">
                            
                        </div>
                    </div>
                </div>

                <div className='w-[70vw] h-[90vh] bg-[#1A1A1D]'>
                    <div className='w-[100%] h-[10vh] bg-[#3B1C32] flex items-center relative justify-end px-5'>
                        <h1 className='font-inria text-white text-4xl font-bold absolute left-1/2 transform -translate-x-1/2'>Science</h1>
                        <img className='cursor-pointer h-[50%]' src={Info} alt="" />
                    </div>
                    <div className='overflow-y-auto w-[100%] h-[72vh] '>
                        <div>
                            
                        </div>
                    </div>
                    <div className='bg-[#3B222E] w-[100%] h-[8vh] flex justify-between px-10 items-center'>
                        <img className='h-[70%]' src={Attach} alt="" />
                        <input className='w-[85%] h-[70%] rounded-full bg-[#1A1A1D] text-white px-6 font-inria text-2xl focus:outline-none' type="text" />
                        <img className='h-[70%]' src={Send} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoard;