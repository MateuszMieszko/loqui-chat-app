import './App.css'
import UsersList from "./components/UsersList";

function App() {

  const users = [ "Zuzol", "Tofik", "Mati", "Patryk", "Kuba", "A", "B", "C", "D", "E", "F", "G", "H", "I"];

  return (
    <>
      <UsersList users={users} />
    </>
  )
}

export default App
