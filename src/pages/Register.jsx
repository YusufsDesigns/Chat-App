import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { FcAddImage } from "react-icons/fc"
import { auth, db, storage } from "../firebase"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"


export default function Register() {
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const file = e.target[3].files[0]

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)

            const storageRef = ref(storage, displayName);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                try {
                    //Update profile
                    await updateProfile(res.user, {
                    displayName,
                    photoURL: downloadURL,
                    });
                    //create user on firestore
                    await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    displayName,
                    email,
                    photoURL: downloadURL,
                    });
        
                    //create empty user chats on firestore
                    await setDoc(doc(db, "userChats", res.user.uid), {});
                    navigate("/");
                } catch (err) {
                    console.log(err);
                }
                });
            });

        } catch (error) {
            setError(true)
        }
            
    } 

    return (
        <div className='form-container'>
            <div className="form-wrapper">
                <span className="logo">Chat App</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Display Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input className="file" type="file" id="file" />
                    <label htmlFor="file" className="image-add">
                        <FcAddImage />
                        <span>Add an avatar</span>
                    </label>
                    <button>Sign up</button>
                    <span>{error && 'Something went wrong'}</span>
                </form>
                <p>You do have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    )
}
