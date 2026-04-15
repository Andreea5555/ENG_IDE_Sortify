import { defineEventHandler, readBody } from 'h3'
import fs from 'fs/promises'
import path from 'path'

const dbPath = path.join(process.cwd(), 'db', 'db.json')

type AddProjectPayload = {
  title: string
  location: string
  seller_id: number
  photo?: string
}

export default defineEventHandler(async (event) => {
  try {
    const userIdHeader = event.node.req.headers['x-user-id']
    const authenticatedUserId = Number.parseInt(String(userIdHeader || ''), 10)
    if (Number.isNaN(authenticatedUserId)) {
      throw new Error('You must be logged in to add projects')
    }

    const body = await readBody<AddProjectPayload>(event)

    if (!body?.title || !body?.location) {
      throw new Error('Missing required project fields')
    }

    const dbRaw = await fs.readFile(dbPath, 'utf-8')
    const db = JSON.parse(dbRaw)

    const authenticatedUser = (db.users || []).find((user: any) => user.id === authenticatedUserId)
    if (!authenticatedUser) {
      throw new Error('Authenticated user not found')
    }
    if (authenticatedUser.type !== 'business') {
      throw new Error('Only business users can add projects')
    }

    const nextProjectId = db.projects.length ? Math.max(...db.projects.map((entry: any) => entry.id)) + 1 : 1
    const nextStatisticId = db.statistics.length ? Math.max(...db.statistics.map((entry: any) => entry.id)) + 1 : 1

    const statistics = {
      id: nextStatisticId,
      reused: 0,
      recycled: 0,
      waste: 0,
      co2_saved: 0
    }

    const project = {
      id: nextProjectId,
      title: body.title,
      location: body.location,
      photo: body.photo || '/images/projects/project-1.jpg',
      seller_id: authenticatedUser.id,
      creation_date: new Date().toISOString(),
      statistics_id: nextStatisticId
    }

    db.statistics.push(statistics)
    db.projects.push(project)

    await fs.writeFile(dbPath, JSON.stringify(db, null, 2))

    return { success: true, project }
  } catch (error: any) {
    return { success: false, message: error.message }
  }
})
