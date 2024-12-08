import { addDoc, collection, getDoc, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import Logo from '../assets/Logo.png'
import { auth, db, provider } from '../FirebaseConfig'
import { signInWithPopup } from 'firebase/auth'

import Cookies from 'universal-cookie';
const cookies = new Cookies();
function Login( {setLogin} ){

    const signInWithGoogle = async () => {
        
        try{
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.refreshToken);
            const currentUser = result.user;
            const userColRef = collection(db, "users");
            const getUsers = query(userColRef, where("uid", "==", result.user.uid));
            const userSnapshot = await getDocs(getUsers);

            if (userSnapshot.empty){
                await addDoc(userColRef, {
                    uid: currentUser.uid,
                    displayName: currentUser.displayName,
                    email: currentUser.email,
                    photoURL: currentUser.photoURL,
                    refreshToken: currentUser.refreshToken,
                    createdAt: serverTimestamp()
                })
                
                console.log("New user, WELCOME! <3");
            } else {
                console.log("User Already exist");
            }

            

            setLogin(true);
        } catch(err) {
            console.log(err);
        }
    }

    return(
        <div className="h-[100vh] w-[100vw] flex">
            <div className="loginPlanet w-[60%] h-[100%]">
                <h1 className="text-white px-[25px] text-[50px] font-agdasima">LOG IN</h1>
            </div>
            <div className="w-[40%] h-[100%] bg-[#0D0D0E] flex items-center justify-start pt-[5%] flex-col gap-[30%]">
                <img className='w-[75%]' src={Logo} alt="" />
                <button onClick={signInWithGoogle} className='px-10 py-2 text-3xl bg-[#915472] font-inria text-white rounded-[20px] login transition-all ease-in-out duration-[800ms]'>Log In With <br />Google</button>
            </div>
        </div>
    )
}

export default Login