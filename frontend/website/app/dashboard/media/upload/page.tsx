"use client"
import React from 'react'
import { useState } from "react"
import { UploadIcon } from "lucide-react"
import { useRouter } from "next/navigation";
import { uploadImage } from "@/actions/media"
import toast from 'react-hot-toast';


type Props = {}

const UploadMediaPage = (props: Props) => {
  const [isSubmiting, setIsSubmiting] = useState(false)
  const router = useRouter()
  const onChange = async (file: File) => {
    if (file) {
      setIsSubmiting(true)
      const formData = new FormData()

      formData.append("file", file)
      const res = await uploadImage(formData)

      if (res.file) {
        toast.success("Image uploaded successfully")
        router.push("/dashboard/media")
      }
      else {
        toast.error("Could not upload image")

      }
      setIsSubmiting(false)
    }
  }
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="grid grid-cols-[1fr_auto] items-center gap-4 w-full max-w-md">
        <div className="grid gap-2">
          <div className="group relative  flex h-32 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-white p-4 transition-colors hover:border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-gray-500">
            <div className="pointer-events-none flex flex-col items-center justiy-center">
              <UploadIcon className="h-8 w-8 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400" />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Upload a file or drag and drop.</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
            </div>
            <input disabled={isSubmiting} accept="image/*" onChange={(e) => { e.preventDefault(); onChange(e.target.files?.[0]!) }} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" id="image" type="file" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadMediaPage