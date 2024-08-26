import { PrimeReactProvider } from "primereact/api"
import { Menu } from "./components/Menu.tsx"
import { Outlet } from "react-router-dom"

function App() {
  return (
    <div className="m-auto w-[95%] sm:w-11/12 z-0">
      <PrimeReactProvider>
        <Menu />
        <Outlet />
      </PrimeReactProvider>
    </div>
  )
}

export default App
