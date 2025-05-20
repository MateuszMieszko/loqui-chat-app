import './App.css'
import UsersList from "./components/UsersList";
import SearchBar from './components/SearchBar';

function App() {

  const users = [ "Zuzol", "Tofik", "niger" ];

  return (
    <>
      <SearchBar />
      <UsersList users={users} />
    </>
  )
}

export default App
