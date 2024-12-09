import { useState } from 'react';
import Close from '../assets/Close.png'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { auth, db } from '../FirebaseConfig';

function CreateClass(){
    const navigate = useNavigate();

    const [className, changeClassName] = useState("");

    const handleCreateClass = async () => {
        const generateRandomID = () => {
            return Math.random().toString(36).substring(2, 10);
        };

        const userColRef = collection(db, "users");
        const userQuery = query(userColRef, where("uid", "==", auth.currentUser.uid))
        const userquerySnapshot = await getDocs(userQuery);
        const userDocID = userquerySnapshot.docs[0].id;
        const userDocRef = doc(db, "users", userDocID);
        const userSubColRef = collection(userDocRef, "classJoined");

        const classCollRef = collection(db, "class");
        let classID = generateRandomID();

        while(true){
            const classQuery = query(classCollRef, where("roomID", "==", classID));
            const hasDuplicate = await getDocs(classQuery);
            
            if(hasDuplicate.empty){
                break;
            } else {
                classID = generateRandomID();
            }
        }

        const classDetails = {
            className: className,
            createdAt: serverTimestamp(),
            classID: classID,
            ownerID: auth.currentUser.uid,
            ownerName: auth.currentUser.displayName
        }

        const userUpdateDetails = {
            className: className,
            classID: classID,
            dateJoined: serverTimestamp()
        }

        const userJoiningDetail = {
            name: auth.currentUser.displayName,
            photo: auth.currentUser.photoURL,
            uid: auth.currentUser.uid,
            dateJoined: serverTimestamp()
        }

        
        

        try {
            await addDoc(classCollRef, classDetails);
            await addDoc(userSubColRef, userUpdateDetails);
            
            const classQuery = query(classCollRef, where("classID", "==", classID));
            const classquerySnapshot = await getDocs(classQuery);
            console.log(classquerySnapshot);
            const classDocID = classquerySnapshot.docs[0].id;
            const classDocRef = doc(db, "class", classDocID);
            const classSubColRef = collection(classDocRef, "classMembers");

            await addDoc(classSubColRef, userJoiningDetail)
            alert("Successfully created class!");
            navigate("/ClassSpace/");
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