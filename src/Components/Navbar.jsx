const Navbar = () => {
  return (
    <nav className='flex justify-between items-center bg-violet-800 text-white px-6 py-4 shadow-md'>
      <div className="logo text-xl font-bold tracking-wide">
        Organize & Conquer
      </div>
      <ul className="flex gap-6 text-sm">
        <li className='cursor-pointer hover:underline'>Home</li>
        <li className='cursor-pointer hover:underline'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
