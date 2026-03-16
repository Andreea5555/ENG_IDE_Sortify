import { defineEventHandler, readBody } from 'h3'
import fs from 'fs/promises'
import path from 'path'

const dbPath = path.join(process.cwd(), 'db', 'db.json')

type RegisterPayload = {
  firstName: string
  lastName: string
  phone: string
  email: string
  password: string
  userType: 'private' | 'business'
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<RegisterPayload>(event)

    if (!body?.firstName || !body?.lastName || !body?.phone || !body?.email || !body?.password || !body?.userType) {
      throw new Error('Missing required registration fields')
    }

    const dbRaw = await fs.readFile(dbPath, 'utf-8')
    const db = JSON.parse(dbRaw)

    db.users = db.users || []

    const emailAlreadyUsed = db.users.some((user: any) => user.email.toLowerCase() === body.email.toLowerCase())
    if (emailAlreadyUsed) {
      throw new Error('Email already registered')
    }

    const newUser = {
      id: db.users.length ? Math.max(...db.users.map((user: any) => user.id)) + 1 : 1,
      first_name: body.firstName,
      last_name: body.lastName,
      phone: body.phone,
      email: body.email,
      password: body.password,
      type: body.userType,
      created_at: new Date().toISOString()
    }

    db.users.push(newUser)
    await fs.writeFile(dbPath, JSON.stringify(db, null, 2))

    return {
      success: true,
      user: {
        id: newUser.id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        type: newUser.type
      }
    }
  } catch (error: any) {
    return { success: false, message: error.message }
  }
})
