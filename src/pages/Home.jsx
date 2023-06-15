import Sidebar from "../components/Sidebar";


export default function Home() {
    return (
        <div className="home">
            <div className="container">
                <Sidebar />
                <div className="select-chat">
                    Search and select a user
                </div>
            </div>
        </div>
    )
}
