import * as api from "../api";
import { useState, useEffect} from "react";
import { Link } from "react-router-dom";


export default function LoginPage({ setCurrentUser }) {
    const [usersList, setUsers] = useState([]);

    useEffect(() => {
        api.fetchUsers().then((response) => {
            setUsers(response);
        });
    }, [])

    return (
      <div id="users">
        <main >
        {usersList.map((user) => {
          return (
            <div key={user.username}>
                <Link to={`/profile`}>
              <section onClick={() => {
                setCurrentUser(user)
                sessionStorage.setItem('currentUser', JSON.stringify(user))
                }} id="userCard">
                <p>{user.username}</p>
                <img src={user.avatar_url} alt="user avatar" />
              </section>
            </Link>
            </div>
            )
        })}
      </main>
      </div> 
    );
  }
  