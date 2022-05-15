import React, { useState } from 'react'

export function InputImage({ setImageUrl, imageError }) {
  const uploadedImage = React.useRef(null)
  const imageUploader = React.useRef(null)
  const [state, setState] = useState({ url: false })
  
  const handleImageUpload = e => {
    const [file] = e.target.files
    setState({ url: true })
    if (file) {
      const reader = new FileReader()
      const { current } = uploadedImage
      current.file = file
      reader.onload = e => {
        current.src = e.target.result
      }
      reader.readAsDataURL(file)
      setImageUrl(file.name)
    }
  }

  return (
    <div
      style={{
        display: 'block',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'auto',
      }}
      className="mx-auto  "
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={imageUploader}
        style={{
          display: 'none',
        }}
      />
      <div onClick={() => imageUploader.current.click()}>
        <img src="/assets/img/user.png" ref={uploadedImage} className="w-[200px] h-[200px] relative rounded-[20px]" alt="..." />
      </div>
      {!state.url ? (
        <div className={`mt-3 text-center ${imageError && 'p-error'}`}>{' تصویر خود را انتخاب کنید.'}</div>
      ) : (
        <div className="p-success mt-3 text-center">تصویر با موفقیت انتخاب شد.</div>
      )}
    </div>
  )
}
