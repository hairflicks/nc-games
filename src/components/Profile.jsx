import { useParams, Link } from "react-router-dom"
import * as api from '../api'
import { useState, useEffect } from "react"

export default function Profile({currentUser}) {

    const [profileUser, setProfileUser] = useState({})
    const [usernameError, setUsernameError] = useState(false)

    const { username } = useParams()

    useEffect(() => {
        if (username) {
        api.fetchUserByUsername(username)
        .then(response => setProfileUser(response))
        .catch(err => setUsernameError(err.response.data.msg))
        }
    }, [username])

    if(usernameError) {
        return <h2 className="errorMsg">{usernameError}</h2>
    }

    if (username) {
        return  currentUser && username === currentUser.username ? 
        <main className="profilePage">
        <h2>Welcome to your profile {currentUser.name}</h2>
        <img src={currentUser.avatar_url} alt="user avatar"></img>
        <h3>display name: {currentUser.username}</h3>
    </main> 
        :
        <main className="profilePage">
        <h2>Welcome to {profileUser.username}'s profile</h2>
        <img src={profileUser.avatar_url} alt="user avatar"></img>
        <h3>display name: {profileUser.username}</h3>
        </main> 
    } else {
        return currentUser ?
        <main className="profilePage">
        <h2>Welcome to your profile {currentUser.name}</h2>
        <img src={currentUser.avatar_url} alt="user avatar"></img>
        <h3>display name: {currentUser.username}</h3>
    </main>
        :
        <section id="postCommentLogin">
        <p>Please <Link to="/login">login</Link> to view your profile</p>
        </section>
    }
}