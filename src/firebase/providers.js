import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {

    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // de aqui abajo se obtiene un access token
        // const credentials = GoogleAuthProvider.credentialFromResult(result);

        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            // user info
            displayName, email, photoURL, uid
        }
        

    } catch (error) {
        
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }
    }
}
