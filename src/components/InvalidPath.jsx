import { useNavigate } from "react-router-dom"

export default function InvalidPath() {

    const navigate = useNavigate()
    
    setTimeout(() => {
        navigate('/')
    }, 3000)

    return <h2 className="errorMsg">Invalid path! redirecting to homepage</h2>
}