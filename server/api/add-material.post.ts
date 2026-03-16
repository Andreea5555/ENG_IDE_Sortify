import { defineEventHandler, readMultipartFormData } from 'h3'
import fs from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const dbPath = path.join(process.cwd(), 'db', 'db.json')
const uploadDir = path.join(process.cwd(), 'public', 'images')

export default defineEventHandler(async (event) => {
  try {
    const userIdHeader = event.node.req.headers['x-user-id']
    const authenticatedUserId = Number.parseInt(String(userIdHeader || ''), 10)
    if (Number.isNaN(authenticatedUserId)) {
      throw new Error('You must be logged in to add materials')
    }

    const formData = await readMultipartFormData(event)
    if (!formData || formData.length === 0) {
      throw new Error('Form data is missing')
    }

    const materialData: Record<string, string> = {}
    let photoPath = ''

    await fs.mkdir(uploadDir, { recursive: true })

    for (const part of formData) {
      if (part.name === 'photo') {
        const filename = `${uuidv4()}-${part.filename}`
        const filePath = path.join(uploadDir, filename)
        await fs.writeFile(filePath, part.data)
        photoPath = `/images/${filename}`
      } else {
        materialData[part.name] = part.data.toString()
      }
    }

    if (!photoPath) {
      throw new Error('Photo is missing')
    }

    if (!materialData.name || !materialData.unit_id || !materialData.quantity || !materialData.condition || !materialData.project_id) {
      throw new Error('Missing required material fields')
    }

    const dbRaw = await fs.readFile(dbPath, 'utf-8')
    const db = JSON.parse(dbRaw)

    const authenticatedUser = (db.users || []).find((user: any) => user.id === authenticatedUserId)
    if (!authenticatedUser) {
      throw new Error('Authenticated user not found')
    }
    if (authenticatedUser.type !== 'business') {
      throw new Error('Only business users can add materials')
    }

    const parsedUnitId = Number.parseInt(materialData.unit_id, 10)
    const parsedQuantity = Number.parseInt(materialData.quantity, 10)
    const parsedProjectId = Number.parseInt(materialData.project_id, 10)
    if (Number.isNaN(parsedUnitId) || Number.isNaN(parsedQuantity) || Number.isNaN(parsedProjectId)) {
      throw new Error('Invalid numeric fields')
    }

    const newMaterial = {
      id: db.materials.length + 1,
      name: materialData.name,
      unit_id: parsedUnitId,
      quantity: parsedQuantity,
      status: 'available',
      condition: materialData.condition,
      photo: photoPath,
      description: materialData.description,
      project_id: parsedProjectId
    }

    db.materials.push(newMaterial)

    await fs.writeFile(dbPath, JSON.stringify(db, null, 2))

    return { success: true, material: newMaterial }
  } catch (error: any) {
    console.error('Error adding material:', error)
    return { success: false, message: error.message }
  }
})
