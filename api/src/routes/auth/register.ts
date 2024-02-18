import type { RouteHandlerModule } from '../../../types'
import { DbSingleton } from '../../plugins/db'

export default {
  POST: async(req: Request)=> {

    const rawData = await req.formData()

    const name = rawData.get('name')
    const email = rawData.get('email')
    const username = rawData.get('username')
    const password = rawData.get('password')

    if (!name || !email || !username || !password){
      return new Response('Missing fields: Bad data', {status: 401 })
    }

    const db = await DbSingleton.getInstance()

    const user = await db.users.findOne({ $or: [{username}, {email}] })

    if (user){
      return new Response('User already exist', {status: 401 })
    }

    const res  = await db.users.insertOne({ name, email, username, password})

    return new Response(JSON.stringify({ message:  res.acknowledged ? 'Successfully created new user, can try login': 'Failed to create new user'}))
  },
} satisfies RouteHandlerModule