import { createRef, useEffect, useState } from "react"
import * as pdfjs from "pdfjs-dist"
import "./ReceiptUpload.css"
import { Button } from "primereact/button"
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload"

export function ReceiptUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [scale, setScale] = useState(1.0)
  const canvas = createRef<HTMLCanvasElement>()

  useEffect(() => {
    void renderPdf()
  }, [file, loaded, scale])

  async function onUpload(event: FileUploadHandlerEvent) {
    if (event.files) {
      setFile(event.files[0])
    }
  }

  async function renderPdf() {
    if (file == null) {
      return
    }

    const bytes = await file.arrayBuffer()
    const pdf = await pdfjs.getDocument(bytes).promise

    const page = await pdf.getPage(1)
    const viewport = page.getViewport({ scale: scale })

    console.log(await page.getTextContent())

    const context = canvas.current?.getContext("2d")

    if (context) {
      canvas.current!.height = viewport.height
      canvas.current!.width = viewport.width

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      }

      await page.render(renderContext).promise
    }
  }

  return (
    <>
      <div className="card">
        <FileUpload uploadHandler={onUpload} customUpload multiple accept="application/pdf" maxFileSize={1000000}
                    emptyTemplate={<p className="m-0">Drag and drop PDFs to here to upload.</p>} />
      </div>
      <canvas ref={canvas} onLoad={() => setLoaded(true)}></canvas>
      <Button onClick={() => setScale(scale * 1.1)}>+</Button>
      <Button onClick={() => setScale(scale / 1.1)}>-</Button>
    </>
  )
}
