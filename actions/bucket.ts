"use server"

import { Storage } from "@google-cloud/storage"


const storage = new Storage({
  keyFilename: "credentials.json"
})
const bucket = storage.bucket("sdq-charity")

export const uploadImage = async (formData: FormData) => {
  const file = formData.get("image") as File
  const fileName = `${Date.now()}-${file.name}`
  const fileBuffer = Buffer.from(await file.arrayBuffer())

  const fileUpload = bucket.file(fileName)

  await fileUpload.save(fileBuffer, {
    metadata: {
      contentType: file.type
    }
  })

  return fileUpload.publicUrl()
}