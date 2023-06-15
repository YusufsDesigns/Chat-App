import Sidebar from "../components/Sidebar";
import Chat from "./Chat";


export default function MessageDetails() {
    return (
        <div className="home">
            <div className="container message-details">
                <Sidebar />
                <Chat />
            </div>
        </div>
    )
}
