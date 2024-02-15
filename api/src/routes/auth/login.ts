import * as jwt from 'jsonwebtoken'
import type { RouteHandlerModule } from '../../../types'
import { DbSingleton } from '../../plugins/db'

export default {
    POST: async(req: Request)=> {

        const rawData = await req.formData()

        const username = rawData.get('username')
        const password = rawData.get('password')

        if (!username || !password){
            return new Response('Missing fields: Bad data', {status: 401 })
        }

        const db = await DbSingleton.getInstance()

        const user =  await db.users.findOne({ username })

        if (!user) {
            return new Response('User not found!')
        }

        if (user.password !== password) {
            return new Response('Password incorrect!')
        }

        const token  =await jwt.sign(user, Bun.env.SECRET_KEY || 'secret')


        return  new Response(JSON.stringify({ message: 'Success login', token}))

    },
} satisfies RouteHandlerModule
