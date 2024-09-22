import React from 'react';
import Container from '../container/Container';
import LogoutBtn from './LogoutBtn';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Logo';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]


  return (
    <header className='py-3 shadow bg-gray-500 '>
      <Container>

        <nav className='flex justify-between w-full'>

          <div>
            <Link to={"/"}>
              <Logo width='70px' />
            </Link>
          </div>

          <ul className='flex '>
            {navItems.map((item, i) => (
              item.active ?
                <li key={i}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className=' rounded-md hover:bg-blue-100 p-2'
                  >
                    {item.name}
                  </button>
                </li> : null
            ))}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
