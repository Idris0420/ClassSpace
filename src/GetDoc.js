import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./FirebaseConfig";

export const getUserDocID = async (uid) => {
    const userColRef = collection(db, "users");
    const userQuery = query(userColRef, where("uid", "==", uid));
    const userQuerySnapshot = await getDocs(userQuery);
    
    if (userQuerySnapshot.empty) {
        throw new Error("User not found");
    }
    
    return userQuerySnapshot.docs[0].id;
};

export const getClassDocID = async (classID) => {
    const classCollRef = collection(db, "class");
    const classQuery = query(classCollRef, where("classID", "==", classID));
    try{
    const classQuerySnapshot = await getDocs(classQuery);
    if (classQuerySnapshot.empty) {
        throw new Error("Class not found");
    }

    return classQuerySnapshot.docs[0].id;
    } catch {
        alert("Class doesn't exist")
    }
    
    
};
