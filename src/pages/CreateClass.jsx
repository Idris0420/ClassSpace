import { useState } from 'react';
import Close from '../assets/Close.png'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { auth, db } from '../FirebaseConfig';

function CreateClass(){
    const navigate = useNavigate();

    const [className, changeClassName] = useState("");

    const handleCreateClass = async () => {

        const generateRandomID = () => {
            return Math.random().toString(36).substring(2, 10);
        };

        const classCollRef = collection(db, "class");
        let roomID = generateRandomID();
        while(true){
            const classQuery = query(classCollRef, where("roomID", "==", roomID))
            const hasDuplicate = await getDocs(classQuery);
            
            if(hasDuplicate.empty){
                break;
            } else {
                roomID = generateRandomID();
            }
        }
        const classDetails = {
            className: className,
            createdAt: serverTimestamp(),
            roomID: roomID,
            ownerID: auth.currentUser.uid,
            ownerName: auth.currentUser.displayName
        }
        try {
            await addDoc(classCollRef, classDetails);
            alert("Successfully created class!")
            navigate("/ClassSpace/")
        } catch (err) {
            console.log(err);
        }
    }

    return(
        <div className="text-white font-inria planets-bg w-screen h-screen flex items-center justify-center">
            <div className="py-[50px] min-h-[450px] aspect-square  h-[60%] bg-[#1A1A1D] rounded-[20px]">
                <div className='h-[12%] flex items-center justify-between px-10 pt-2'>
                    <h1 className='text-[50px] font-bold'>Create Class</h1>
                    <img className='cursor-pointer' src={Close} alt="" onClick={() => navigate("/ClassSpace/")}/>
                </div>
                    <div className=' h-[70%] flex justify-center items-center flex-col text-left'>
                        <div className='w-[80%]'>
                            <h1 className='font-bold text-4xl'>Class Name:</h1>
                            <input onChange={(e) => changeClassName(e.target.value)} className='w-[100%] rounded-[10px] bg-[#3B1C32] h-[65px] px-2 text-3xl focus:outline-none' type="text" name="" id="" />
                        </div>
                    </div>
                    <div className='h-[18%] w-[100%] flex items-start justify-center'>
                        <button onClick={() => handleCreateClass()} className='bg-[#915472] px-8 py-5 rounded-[20px] text-3xl hover:scale-[1.2] transition-scale duration-300'>Create Class</button>
                    </div>
            </div>
        </div>
    )
}

export default CreateClass