import Logo from "./logo"
import SearchBar from "./search-bar"
import User from "./user"

const MainHeader = () => {
  return (
    <header className="container flex justify-between items-center p-4 sticky top-0 bg-background z-50">
      <Logo size="default" />

      <nav className="flex gap-x-2 items-center">
        <SearchBar />
        <User />
      </nav>
    </header>
  )
}

export default MainHeader
