import './App.css'
import UsersList from "./components/UsersList";

function App() {

  const users = [ "Zuzol", "Tofik", "niger" ];

  return (
    <>
      <UsersList users={users}> </UsersList>
    </>
  )
}

export default App
