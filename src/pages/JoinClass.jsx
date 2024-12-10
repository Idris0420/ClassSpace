import { useNavigate } from 'react-router-dom'
import Close from '../assets/Close.png'
import { getClassDocID, getUserDocID } from '../GetDoc.js'
import { auth, db } from '../FirebaseConfig';
import { useState } from 'react';
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
function JoinClass(){
    const navigate = useNavigate();
    const [inputClass, setInputClass] = useState("");

    const joinClass = async () => {

        const trimmedInput = inputClass.trim();

        if(!trimmedInput){
            alert("Please enter a valid class code");
            return;
        }

        const userID = await getUserDocID(auth.currentUser.uid);
        const userClasses = collection(db, "users", userID, "classJoined");
        const classID = await getClassDocID(inputClass);
        const classDocRef = doc(db, "class", classID);

        const classSnapshot = await getDoc(classDocRef);
        const classData = classSnapshot.data();
        const classSubColRef = collection(classDocRef, "classMembers");

        const userInClassQuery = query(classSubColRef, where("uid", "==", auth.currentUser.uid));
        const getCurrUserDoc = await getDocs(userInClassQuery);

        const notInClass = getCurrUserDoc.empty;

        const userJoiningDetail = {
            name: auth.currentUser.displayName,
            photo: auth.currentUser.photoURL,
            uid: auth.currentUser.uid,
            dateJoined: serverTimestamp(),
            email: auth.currentUser.email
        }

        const userUpdateDetails = {
            className: classData.className,
            classID: classData.classID,
            dateJoined: serverTimestamp()
        }

        if (notInClass){
            await addDoc(classSubColRef, userJoiningDetail);
            await addDoc(userClasses, userUpdateDetails);
            alert("Successfully joined");
            navigate("/ClassSpace/")
        } else {
            alert("You are already in that class");
            return;
        }
        
    }



    return(
        <div className="text-white font-inria planets-bg w-screen h-screen flex items-center justify-center"> 
            <div className="py-[50px] min-h-[450px] aspect-square  h-[60%] bg-[#1A1A1D] rounded-[20px]">
                <div className='h-[12%] flex items-center justify-between px-10 pt-2'>
                    <h1 className='text-[50px] font-bold'>Join Class</h1>
                    <img className='cursor-pointer' src={Close} alt="" onClick={() => navigate("/ClassSpace/")}/>
                </div>
                    <div className=' h-[70%] flex justify-center items-center flex-col text-left'>
                        <div className='w-[80%]'>
                            <h1 className='font-bold text-4xl'>Class ID:</h1>
                            <input onChange={(e) => setInputClass(e.target.value)} className='w-[100%] rounded-[10px] bg-[#3B1C32] h-[65px] px-2 text-3xl focus:outline-none' type="text" name="" id="" />
                        </div>
                    </div>
                    <div className='h-[18%] w-[100%] flex items-start justify-center'>
                        <button onClick={() => joinClass()} className='bg-[#915472] px-8 py-5 rounded-[20px] text-3xl hover:scale-[1.2] transition-scale duration-300'>Join Class</button>
                    </div>
            </div>
        </div>
    )
}

export default JoinClass