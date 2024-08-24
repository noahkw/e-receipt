import { ChangeEvent, createRef, useEffect, useState } from "react"
import * as pdfjs from "pdfjs-dist"
import { AppBar, Button, IconButton, styled, Toolbar } from "@mui/material"
import { Add, CloudUpload, Remove } from "@mui/icons-material"
import "./ReceiptUpload.css"

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1
})

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
      <canvas className="canvas" ref={canvas} onLoad={() => setLoaded(true)}></canvas>
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <Button component="label" color="secondary" startIcon={<CloudUpload />}>
            <VisuallyHiddenInput type="file" onChange={onChange} />
          </Button>
          <IconButton color="inherit" onClick={() => setScale(scale * 1.1)}>
            <Add />
          </IconButton>
          <IconButton color="inherit" onClick={() => setScale(scale / 1.1)}>
            <Remove />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  )
}
