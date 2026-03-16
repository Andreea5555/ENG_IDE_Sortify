import { defineEventHandler, readBody } from 'h3'
import fs from 'fs/promises'
import path from 'path'

const dbPath = path.join(process.cwd(), 'db', 'db.json')

type ReservePayload = {
  materialId: number
}

export default defineEventHandler(async (event) => {
  try {
    const userIdHeader = event.node.req.headers['x-user-id']
    const authenticatedUserId = Number.parseInt(String(userIdHeader || ''), 10)
    if (Number.isNaN(authenticatedUserId)) {
      throw new Error('You must be logged in to reserve materials')
    }

    const body = await readBody<ReservePayload>(event)
    if (!body?.materialId) {
      throw new Error('materialId is required')
    }

    const dbRaw = await fs.readFile(dbPath, 'utf-8')
    const db = JSON.parse(dbRaw)

    const authenticatedUser = (db.users || []).find((user: any) => user.id === authenticatedUserId)
    if (!authenticatedUser) {
      throw new Error('Authenticated user not found')
    }

    const material = db.materials.find((entry: any) => entry.id === body.materialId)
    if (!material) {
      throw new Error('Material not found')
    }
    if (material.status === 'reserved') {
      throw new Error('Material is already reserved')
    }
    if (material.status === 'sold') {
      throw new Error('Material is already sold')
    }

    const project = db.projects.find((entry: any) => entry.id === material.project_id)
    if (!project) {
      throw new Error('Project not found for material')
    }

    const newReservation = {
      id: db.reservations.length ? Math.max(...db.reservations.map((entry: any) => entry.id)) + 1 : 1,
      seller_id: project.seller_id,
      customer_id: authenticatedUser.id,
      project_id: project.id,
      material_id: material.id,
      status: 'Pending'
    }

    material.status = 'reserved'

    db.reservations.push(newReservation)
    await fs.writeFile(dbPath, JSON.stringify(db, null, 2))

    return { success: true, reservation: newReservation }
  } catch (error: any) {
    return { success: false, message: error.message }
  }
})
