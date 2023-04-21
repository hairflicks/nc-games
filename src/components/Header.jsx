import dice from "../imgs/dice.png"

export default function Header({currentUser}) {
    return (
    <header>
        <a href="/">Roll & Review</a>
        <img id="dice" src={dice} alt="a single die"></img>
        {currentUser && <p>Logged in as {currentUser.username}</p>}
    </header>
    )
}