import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <header>
      <nav>
        <div>
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" width={100} height={100} />
          </Link>
          <div>
            <ul>

            </ul>
          </div>
        </div>
        <div>
          <a href=""></a>
        </div>
      </nav>
    </header>
  )
}

export default Navbar