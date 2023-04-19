import { Link } from 'react-router-dom'

export default function NavBar ({categories, currentUser, setCurrentUser}) {

    function handleLogout(e) {
      sessionStorage.clear()
      setCurrentUser()
    }

    return (
        <nav id="navBar">
            <Link to="/reviews"> Reviews</Link>
          <div className="dropdown">
            <Link to="/reviews" className="dropbtn">Categories</Link>
            <div className="dropdown-content">
              <Link to="/reviews">
                All
              </Link>
              {categories.map((category) => {
                return (<div key={category.slug}>
                  <Link to={`reviews?category=${category.slug}` }>
                    {category.slug}
                  </Link>
                </div>        
                );
              })}
            </div>
          </div>
          <Link to="profile">
          My Profile
          </Link>
          {currentUser ?
           <Link onClick={handleLogout}>Logout</Link>
          :
          <Link to="login">
           Login
          </Link>}
        </nav>
      )
}