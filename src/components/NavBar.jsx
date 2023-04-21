import { Link } from 'react-router-dom'

export default function NavBar ({categories, currentUser, setCurrentUser}) {

    function handleLogout(e) {
      sessionStorage.clear()
      setCurrentUser()
    }

    function stopButtonPersistOnMobile() {
        setTimeout(() => {
          window.location.reload();
        }, 0)
    }

    return (
        <nav id="navBar">
            <Link to="/reviews"> Reviews</Link>
          <div className="dropdown">
            <button className="dropbtn">Categories</button>
            <div className="dropdown-content">
              <Link to="/reviews" onClick={stopButtonPersistOnMobile}>
                All
              </Link>
              {categories.map((category) => {
                return (<div key={category.slug}>
                  <Link onClick={stopButtonPersistOnMobile} to={`reviews?category=${category.slug}` }>{category.slug}</Link>
                </div>        
                );
              })}
            </div>
          </div>
          <div className="dropdown">
            <Link to="/profile" className="dropbtn" onClick={stopButtonPersistOnMobile}>My profile</Link>
            <div className="dropdown-content">
              <Link to="/post-review">New review</Link>
            </div>
          </div>
          {currentUser ?
           <Link onClick={handleLogout}>Logout</Link>
          :
          <Link to="login">
           Login
          </Link>}
        </nav>
      )
}