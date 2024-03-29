import React, { useState } from 'react'
import { ToastAlert } from './toastAlert'

export function InputImage({ setImageUrl, imageError, imageUrl, title }) {
  const uploadedImage = React.useRef(null)
  const imageUploader = React.useRef(null)
  const [state, setState] = useState({ url: false })

  const handleImageUpload = e => {
    const [file] = e.target.files
    setState({ url: true })
    if (file) {
      if (file.size > 1000000) {
        imageUploader.current.value = null
        return ToastAlert.error('سایز عکس باید کمتر از یک مگابایت باشد')
      }
      const reader = new FileReader()
      const { current } = uploadedImage
      current.file = file
      reader.onload = e => {
        current.src = e.target.result
      }
      reader.readAsDataURL(file)

      setImageUrl(file)
    }
  }

  return (
    <div className="mx-auto flex flex-col items-center  justify-center h-auto">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={imageUploader}
        style={{
          display: 'none',
        }}
        id="imageInput"
      />
      <div onClick={() => imageUploader.current.click()}>
        <img
          src={(imageUrl && imageUrl === 'no-image') || !imageUrl ? '/assets/img/user.png' : imageUrl}
          ref={uploadedImage}
          className="w-[100px] h-[100px] relative rounded-[20px]"
          alt="..."
        />
      </div>
      {!state.url ? (
        <div className={`mt-3 text-center ${imageError && 'p-error'}`}>{title ? title : ' تصویر خود را انتخاب کنید.'}</div>
      ) : (
        <div className="p-success mt-3 text-center">تصویر با موفقیت انتخاب شد.</div>
      )}
    </div>
  )
}
