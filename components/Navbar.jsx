import Link from 'next/link'

export default function Navbar() {
  const navdata = [
    {
      text: "Home",
      route: "/"
    },
    {
      text: "Test",
      route: "/test"
    },
  ]

  return (
    <nav className="navigation m-4">
      <ul className="flex gap-4">
        {navdata.map(link =>
          <li className="hover:underline" key={link.route}><Link href={link.route}>{link.text}</Link></li>
        )}
      </ul>
    </nav>
  )
}