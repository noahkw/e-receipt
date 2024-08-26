import { ReceiptUpload } from "./components/ReceiptUpload.tsx"
import { PrimeReactProvider } from "primereact/api"
import "primereact/resources/themes/viva-dark/theme.css";


function App() {
  return (
    <PrimeReactProvider>
      <ReceiptUpload />
    </PrimeReactProvider>
  )
}

export default App
