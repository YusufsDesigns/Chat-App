import { IoMdAttach } from "react-icons/io"
import { BiImageAdd } from "react-icons/bi"
import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext"
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore"
import { db, storage } from "../firebase"
import { v4 } from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"

export default function Input() {
    const [text, setText] = useState()
    const [img, setImg] = useState()

    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)

    const handleSend = async() => {
        if(img){
            const storageRef = ref(storage, v4())
            await uploadBytesResumable(storageRef, img).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    await updateDoc(doc(db, "chats", data.chatId), {
                        messages: arrayUnion({
                            id: v4(),
                            text,
                            senderId: currentUser.uid,
                            date: Timestamp.now(),
                            img: downloadURL
                        })
                    })
                });
            });
        } else{
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: v4(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now()
                })
            })
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId+".lastMessage"]: {
                text
            },
            [data.chatId+".date"]: serverTimestamp()
        })

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId+".lastMessage"]: {
                text
            },
            [data.chatId+".date"]: serverTimestamp()
        })

        setText("")
        setImg(null)
    }

    return (
    <div className="input">
        <input type="text" placeholder="Type something..." value={text} onChange={e => setText(e.target.value)} />
        <div className="send">
            <IoMdAttach />
            <input type="file" style={{display: 'none'}} id="file" onChange={e => setImg(e.target.files[0])} />
            <label htmlFor="file">
                <BiImageAdd />
            </label>
            <button onClick={handleSend}>Send</button>
        </div>
    </div>
    )
}

