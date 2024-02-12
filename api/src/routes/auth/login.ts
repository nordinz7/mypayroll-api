import * as jwt from 'jsonwebtoken'

export default {
    GET: async(req: Request)=> {

        const rawData = await req.formData()

        const username = rawData.get('username')
        const password = rawData.get('password')

        let user

        try {
            const userData = await Bun.file(`/home/nordin/dev/projects/simple-auth/api/src/data/${username}.txt`)
            user = await userData.text()
        } catch (error) {
        }


        if (!user) {
            return new Response('User not found!')
        }

        const parsedUser = JSON.parse(user)

        if (parsedUser.password !== password) {
            return new Response('Password incorrect!')
        }

        const token  =await jwt.sign({username}, Bun.env.SECRET_KEY || 'secret')


        return new Response(JSON.stringify({ message: 'Success login', token}))
    },
}
