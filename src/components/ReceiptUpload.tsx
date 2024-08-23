import { ChangeEvent, createRef, useEffect, useState } from "react"
import * as pdfjs from "pdfjs-dist"
import { Button } from "@mui/material"

export function ReceiptUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [scale, setScale] = useState(1.0)
  const canvas = createRef<HTMLCanvasElement>()

  useEffect(() => {
    void renderPdf()
  }, [file, loaded, scale])

  async function onChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setFile(event.target.files[0])
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
        viewport: viewport,
      }

      await page.render(renderContext).promise
    }
  }

  return (
    <>
      <input type="file" onChange={onChange} />
      {file && <span>{file.name}</span>}
      <canvas ref={canvas} onLoad={() => setLoaded(true)}></canvas>
      <Button onClick={() => setScale(scale * 1.1)}>+</Button>
      <button onClick={() => setScale(scale / 1.1)}>-</button>
    </>
  )
}
