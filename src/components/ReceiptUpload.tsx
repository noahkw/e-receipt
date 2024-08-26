import { createRef, useEffect, useState } from "react"
import * as pdfjs from "pdfjs-dist"
import { Button } from "primereact/button"
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload"
import { Panel } from "primereact/panel"
import { Slider, SliderChangeEvent } from "primereact/slider"

export function ReceiptUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [scale, setScale] = useState(50)
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
    const viewport = page.getViewport({ scale: scale / 100 })

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

  function setScaleChecked(value: number) {
    const clampedValue = Math.max(20, Math.min(300, value))
    setScale(clampedValue)
  }

  return (
    <>
      <div className="card w-full md:w-8/12 m-auto">
        <FileUpload
          uploadHandler={onUpload}
          customUpload
          multiple
          accept="application/pdf"
          maxFileSize={1000000}
          emptyTemplate={
            <p className="m-0">Drag and drop PDFs to here to upload.</p>
          }
        />
      </div>
      {file &&
        <div>
          <div className="m-auto w-fit my-2 flex gap-4 items-center">
            <Button onClick={() => setScaleChecked(scale - 20)} icon="pi pi-minus" />
            <Slider min={20} max={300} value={scale} onChange={(e: SliderChangeEvent) => {
              setScaleChecked(e.value as number)
            }} className="w-32" />
            <Button onClick={() => setScaleChecked(scale + 20)} icon="pi pi-plus" />
          </div>
          <Panel className="m-top-2">
            <canvas className="m-auto" ref={canvas} onLoad={() => setLoaded(true)}></canvas>
          </Panel>
        </div>
      }

    </>
  )
}
