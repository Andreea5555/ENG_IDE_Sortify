import { defineEventHandler, readBody } from 'h3'
import fs from 'fs/promises'
import path from 'path'

const dbPath = path.join(process.cwd(), 'db', 'db.json')

type LoginPayload = {
  email: string
  password: string
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<LoginPayload>(event)
    if (!body?.email || !body?.password) {
      throw new Error('Email and password are required')
    }

    const dbRaw = await fs.readFile(dbPath, 'utf-8')
    const db = JSON.parse(dbRaw)
    const users = db.users || []

    const user = users.find((entry: any) => entry.email.toLowerCase() === body.email.toLowerCase() && entry.password === body.password)

    if (!user) {
      throw new Error('Invalid email or password')
    }

    return {
      success: true,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        type: user.type
      }
    }
  } catch (error: any) {
    return { success: false, message: error.message }
  }
})
