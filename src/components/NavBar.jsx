import { Link } from 'react-router-dom'

export default function NavBar ({categories}) {

    return (
        <nav id="navBar">
            <Link to="/reviews">
          <button>reviews</button>
          </Link>
          <div className="dropdown">
            <button className="dropbtn">Categories</button>
            <div className="dropdown-content">
              <Link to="/reviews">
                <p key='all'>All</p>
              </Link>
              {categories.map((category) => {
                return (<div key={category.slug}>
                  <Link to={`reviews?category=${category.slug}` }>
                    <p >{category.slug}</p>
                  </Link>
                </div>        
                );
              })}
            </div>
          </div>
          <Link to="profile">
          <button>My Profile</button>
          </Link>
          <Link to="login">
          <button>Login</button>
          </Link>
        </nav>
      )
}