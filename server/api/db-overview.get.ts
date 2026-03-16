import { defineEventHandler } from 'h3'
import fs from 'fs/promises'
import path from 'path'

const dbPath = path.join(process.cwd(), 'db', 'db.json')

export default defineEventHandler(async () => {
  const dbRaw = await fs.readFile(dbPath, 'utf-8')
  const db = JSON.parse(dbRaw)

  return {
    success: true,
    counts: {
      units: db.units?.length || 0,
      materials: db.materials?.length || 0,
      projects: db.projects?.length || 0,
      reservations: db.reservations?.length || 0,
      users: db.users?.length || 0,
      statistics: db.statistics?.length || 0
    },
    materials: (db.materials || []).map((material: any) => ({ id: material.id, name: material.name })),
    users: (db.users || []).map((user: any) => ({
      id: user.id,
      label: `${user.first_name} ${user.last_name} (${user.email})`
    })),
    customerUsers: (db.users || [])
      .filter((user: any) => user.type === 'private')
      .map((user: any) => ({
        id: user.id,
        label: `${user.first_name} ${user.last_name} (${user.email})`
      })),
    businessUsers: (db.users || [])
      .filter((user: any) => user.type === 'business')
      .map((user: any) => ({
        id: user.id,
        label: `${user.first_name} ${user.last_name} (${user.email})`
      }))
  }
})
