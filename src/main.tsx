import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import * as pdfJsLib from "pdfjs-dist"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App.tsx"
import { ReceiptUpload } from "./components/ReceiptUpload.tsx"

pdfJsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.worker.min.mjs"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <p>Well, that sucks!</p>,
    children: [
      {
        path: "/receipt-upload",
        element: <ReceiptUpload />,
      },
    ],
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
