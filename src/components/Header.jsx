import dice from "../imgs/dice.png"

export default function Header() {
    return (
    <header>
        <h1>Roll & Review</h1>
        <img id="dice" src={dice} alt="a single die"></img>
    </header>
    )
}