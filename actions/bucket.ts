"use server"

import { getGCPCredentials } from "@/lib/utils";
import { Storage } from "@google-cloud/storage"

const storageClient = new Storage(getGCPCredentials());
const bucket = storageClient.bucket("sdq-charity")

export const uploadImage = async (formData: FormData) => {
  const file = formData.get("image") as File;
  const sanitized = file.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  const fileName = `${Date.now()}-${sanitized}`
  const fileBuffer = Buffer.from(await file.arrayBuffer())

  const fileUpload = bucket.file(fileName)

  await fileUpload.save(fileBuffer, {
    metadata: {
      contentType: file.type
    }
  })

  return fileUpload.publicUrl()
}