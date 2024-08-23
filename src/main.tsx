import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import * as pdfJsLib from 'pdfjs-dist'
import App from './App.tsx'
import './index.css'

pdfJsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.worker.min.mjs';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
    </StrictMode>,
)
