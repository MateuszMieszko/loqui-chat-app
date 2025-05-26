import './App.css'
import './components/Chat.css'
import UsersList from "./components/UsersList";
import Chat from "./components/Chat";

function App() {

  const users = [ "Zuzol", "Tofik", "Mati", "Patryk", "Kuba"];

  return (
    <>
      <Chat />
      {/* <UsersList users={users} /> */}
    </>
  )
}

export default App
