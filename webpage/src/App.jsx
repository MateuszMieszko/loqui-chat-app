import './App.css'
import UsersList from "./components/UsersList";

function App() {

  const users = [ "Zuzol", "Tofik", "Mati", "Patryk", "Kuba" ];

  return (
    <>
      <UsersList users={users} />
    </>
  )
}

export default App
