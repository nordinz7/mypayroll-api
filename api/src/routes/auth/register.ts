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

        try {
            await Bun.write(`/home/nordin/dev/projects/simple-auth/api/src/data/${username}.txt`, JSON.stringify({ name, email, username, password}))
        } catch (error) {
            return new Response('Failed to create user')
        }





        return new Response(JSON.stringify({ message: 'Successfully created new user, can try login'}))
    },
}