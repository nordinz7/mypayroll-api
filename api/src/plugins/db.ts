import { MongoClient } from 'mongodb'
import * as config from '../../app.config'

export const DbSingleton = (function () {
    let instance:any
    return {
        getInstance: async (): Promise<any> => {
            if (instance != null) {
                return instance
            }

            const dbUrl = config.default.MONGOD_URL_STRING

            const mongoClient = new MongoClient(dbUrl)
            await mongoClient.connect()
            const db = mongoClient.db()
            console.log('--------mongoClient', mongoClient)
            const collections = [
                'users',
            ]

            const dbCollections = collections.reduce((cols: any, cName: string) => {
                cols[cName] = db.collection(cName)

                return cols
            }, {})

            instance = dbCollections
            instance.constructor = null

            return instance
        }
    }
})()
