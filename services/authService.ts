import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/firebase';
import { database } from '../firebase/firebase';
import { get, ref, set } from "firebase/database";

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw error.code;
  }
};

async function checkUsernameAvailability(username:string) {
  const usernameRef = ref(database, 'usernames/' + username);
  
  const snapshot = await get(usernameRef);
  return !snapshot.exists();  // true if the username is available
}



export const signUp = async (username: string, email: string, password: string) => {
  try {
    const isAvailable = await checkUsernameAvailability(username);
    if(isAvailable){
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const usernamesRef = ref(database,`/usernames/${username}`);
      const userRef = ref(database,`/users/${userCredential.user.uid}`);
      set(usernamesRef, userCredential.user.uid)
      set(userRef,{
        username:username
      })
      return userCredential.user;
    }
    else{
      throw new CheckCondition
    }
  } catch (error: any) {
    throw error.code;
  }
};


class CheckCondition extends Error {
  constructor(public code: string = "") {
      super(code);
      this.code = "auth/username-already-in-use";
      Object.setPrototypeOf(this, CheckCondition.prototype); // Ensures prototype chain is correctly set
  }
}