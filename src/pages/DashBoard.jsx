import LogoOnly from '../assets/LogoOnly.png'
import Info from '../assets/Info.png'
import Menu from '../assets/Menu.png'
import Attach from '../assets/Attach.png'
import Send from '../assets/Send.png'
import Close from '../assets/Close.png'
import SignOut from '../assets/SignOut.png'
import GroupProfile from '../assets/GroupProfile.png'

import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import Cookies from 'universal-cookie'
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import { auth, db } from '../FirebaseConfig'

import { useAuthState } from "react-firebase-hooks/auth" 
import { getChatClassDocID, getClassDocID } from '../GetDoc'

function DashBoard({setLogin}) {
    const navigate = useNavigate();
    const cookies = new Cookies();

    const [isMenuOpen, setMenuState] = useState(false);
    const [classes, setClasses] = useState([]);
    const [user, loading] = useAuthState(auth);
    const [activeClass, setActiveClass] = useState([]);
    const [showClassDetails, setShowClassDetails] = useState(false)
    const [currMessage, setCurrMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const getUserClasses = async () => {
            if (loading) {
            console.log("Loading authentication state...");
            return; // Wait until loading completes
            }

            if (!user) {
                console.log("User is not authenticated");
                return; // Exit if user is not authenticated
            }

            try {
                const userColRef = collection(db, "users");
                const userQuery = query(userColRef, where("uid", "==", user.uid)); // Use `user.uid` instead of `auth.currentUser.uid`

                console.log("Current User UID:", user.uid);

                const userquerySnapshot = await getDocs(userQuery);
                if (userquerySnapshot.empty) {
                    console.log("No user document found");
                    return;
                }

                const userDocID = userquerySnapshot.docs[0].id;
                const userSubColRef = collection(db, "users", userDocID, "classJoined");

                const userClasses = await getDocs(userSubColRef);
                setClasses(userClasses.docs);
                
            } catch (error) {
            console.error("Error fetching user classes:", error);
            }
        };
        getUserClasses();
    }, [loading, user]); // React to changes in `loading` and `user`

    

    const handleInfoShow = () => {
        setShowClassDetails(!showClassDetails);
    }

    const handeChange = () => {
        setMenuState(!isMenuOpen);
    }

    const handleSignOut = () => {
        setLogin(false);
        cookies.remove("auth-token");
    }

    const handleSetActiveChat = async (e) => {
        if (activeClass.classID === e.target.value) return;
        const classDocID = await getClassDocID(e.target.value);
        const classDoc = doc(db, "class", classDocID);
        const fetchClassSnapshot = await getDoc(classDoc);
        const classData = fetchClassSnapshot.data();
        setActiveClass(classData);

        const messagesColRef = query(
            collection(db, "class", classDocID, "messages"),
            orderBy("createdAt", "asc") // Sort in ascending order
        );

        const unsubscribe = onSnapshot(messagesColRef, (snapshot) => {
            const messagesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setMessages(messagesData);
        });

        return () => unsubscribe();
    }

    

    const sendChat = async() => {

        if(!currMessage){
            console.log("empty chat");
            return
        }
        
        const messageDetail = {
            message: currMessage,
            sender: auth.currentUser.displayName,
            senderuid: auth.currentUser.uid,
            createdAt: serverTimestamp(),
            userPorfile: auth.currentUser.photoURL
        }

        const classID = activeClass.classID;
        const classDocID = await getChatClassDocID(classID);
        const messagesColRef = collection(db, "class", classDocID, "messages");
        await addDoc(messagesColRef, messageDetail);
        setCurrMessage("");
    }

    const handleEnterKeyPress = (event) => {
        if (event.key === 'Enter') {
            console.log("Enter key pressed");
            sendChat();
            // Call your desired function here
        }
    };

    return(
        <div className='relative flex w-[100vw] items-start flex-col'>
            
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
                            <div className='hover:bg-black py-4 border-t-[3px] cursor-pointer' onClick={() => navigate("/ClassSpace/CreateClass")}>Create Class</div>
                            <div className='hover:bg-black py-4 border-t-[3px] border-b-[3px] cursor-pointer' onClick={() => navigate("/ClassSpace/JoinClass")}>Join Class</div>
                        </div>
                            <img className='mt-auto mr-4 mb-8 cursor-pointer' onClick={() => handleSignOut()} src={SignOut} alt="" />
                    </div>
                    <div className="w-[100%] h-[10%] relative flex items-center px-5">
                        <img src={Menu} alt="menu" className="cursor-pointer" onClick={() => handeChange()}/>
                        <h1 className="absolute left-1/2 transform -translate-x-1/2 font-inria text-white text-4xl font-bold">Chats</h1>
                    </div>
                    <div className=" w-[100%] h-[100%] overflow-y-auto">
                        <div className="">
                            {classes.map(doc => {
                                const data = doc.data();
                                return(
                                    <div className='flex items-center justif-center h-[70px]' key={data.classID} >
                                        <input 
                                        id={`class-${data.classID}`} 
                                        name='currentClass' 
                                        type="radio" 
                                        className="opacity-0 absolute peer"
                                        value={data.classID} 
                                        onClick={(e) => handleSetActiveChat(e)}/>
                                        <label 
                                        htmlFor={`class-${data.classID}`} 
                                        className='gap-2 px-4 flex items-center justify-start h-[100%] w-[100%] flex peer-checked:bg-black hover:bg-[#0f0f0f]'
                                        >
                                            <img className='h-[80%]' src={GroupProfile} alt="" />
                                            <h1 className='text-4xl text-white overflow-hidden '>{data.className}</h1>
                                        </label>
                                    </div>
                                 )
                            })}
                        </div>
                    </div>
                </div>

                <div className='w-[70vw] h-[90vh] bg-[#1A1A1D]'>
                    <div className='w-[100%] h-[10vh] bg-[#3B1C32] flex items-center relative justify-end px-5'>
                        <h1 className='font-inria text-white text-4xl font-bold absolute left-1/2 transform -translate-x-1/2'>{activeClass.className}</h1>
                        <img className='cursor-pointer h-[50%]' src={Info} alt="" onClick={() => handleInfoShow()} />
                    </div>
                    <div className='relative w-[100%] h-[72vh] overflow-y-auto'>
                        <div className={`rounded-[20px] pt-4 flex items-center justify-start flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#3B1C32] h-[90%] w-[70%] pb-[50px] ${showClassDetails ? "block" : "hidden"}`}>
                            <div className='w-[90%] flex flex-row h-[10%] items-center justify-between'>
                                <h1 className='text-white font-inria text-4xl font-bold'>Class Info</h1>
                                <img onClick={() => handleInfoShow()} className='h-[100%] cursor-pointer' src={Close} alt="" />
                            </div>
                                <div className='overflow-y-auto text-white font-inria text-3xl w-[80%] border px-2 mt-[10%] gap-[10px] flex flex-col '>
                                        <div className='py-5 flex flex-col gap-5 '>
                                            <h1>Class ID: {activeClass.classID}</h1>
                                            <h1>Created at: {activeClass.createdAt?.toDate().toLocaleString()}</h1>
                                            <h1>Owner Name: {activeClass.ownerName}</h1> 
                                        </div>
                                </div>
                        </div>
                        <div className='w-[100%] py-5 px-3'>
                        <ul className='w-[100%] flex flex-col'>
                            {messages.map((message) => (
                                <li key={message.id} className={`text-black flex mb-[20px] ${auth.currentUser.uid == message.senderuid ? "ml-auto" : "mr-auto"}`}>
                                    { 
                                    <div className={`font-inria flex flex-row justify-center items-start h-auto gap-2 ${auth.currentUser.uid == message.senderuid ? "flex-row-reverse " : ""}`}>
                                        <img src={message.userPorfile} alt="" className='h-[50px] rounded-full'/>
                                        <div className={`flex flex-col ${auth.currentUser.uid == message.senderuid ? "items-end" : ""}`}>
                                            <h1 className='text-white'>{message.sender}</h1> 
                                            <h1 
                                            className="w-fit bg-white rounded-md px-4 py-2 items-center max-w-[30vw] break-words text-ellipsis">
                                            {message.message}
                                            </h1>
                                        </div>
                                    </div>
                                    }
                                </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className='bg-[#3B222E] w-[100%] h-[8vh] flex justify-between px-10 items-center'>
                        <img className='cursor-pointer h-[70%]' src={Attach} alt="" />
                        <input className='w-[85%] h-[70%] rounded-full bg-[#1A1A1D] text-white px-6 font-inria text-2xl focus:outline-none' value={currMessage} type="text" onKeyDown={handleEnterKeyPress} onChange={e => setCurrMessage(e.target.value)}/>
                        <img onClick={() => sendChat()} className='h-[70%] cursor-pointer' src={Send} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoard;