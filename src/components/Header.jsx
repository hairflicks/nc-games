import dice from "../imgs/dice.png"

export default function Header() {
    return (
    <header>
        <a href="/">Roll & Review</a>
        <img id="dice" src={dice} alt="a single die"></img>
    </header>
    )
}