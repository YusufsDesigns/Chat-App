import { BsFillCameraVideoFill, BsArrowLeft } from "react-icons/bs"
import { AiOutlineUserAdd } from "react-icons/ai"
import { FiMoreHorizontal } from "react-icons/fi"
import Input from "./Input"
import Messages from "./Messages"
import { useContext } from "react"
import { ChatContext } from "../context/ChatContext"
import { useNavigate } from "react-router-dom"

export default function Chat() {
    const { data } = useContext(ChatContext)
    const navigate = useNavigate()
    return (
        <div className="chat">
            <div className="chat-info">
                <div className="first-info">
                    <BsArrowLeft onClick={() => {navigate(-1)}} className="prev-arrow" />
                    <span>{data.user?.displayName}</span>
                </div>
                <div className="chat-icons">
                    <BsFillCameraVideoFill />
                    <AiOutlineUserAdd />
                    <FiMoreHorizontal />
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    )
}

