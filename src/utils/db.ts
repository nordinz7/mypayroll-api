import { MongoClient, Collection } from 'mongodb'
import { config } from '../../app.config'
import type { Employee, Enumeration, User } from '../types'

const collections = {
  enumerations: Collection<Enumeration>,
  employees: Collection<Employee>,
  users: Collection<User>
} as const

export const DbSingleton = (function () {
  let instance = null
  return {
    getInstance: async (): Promise<any> => {
      if (instance != null) {
        return instance
      }

      const dbUrl = config.MONGOD_URL_STRING

      const mongoClient = new MongoClient(dbUrl)
      await mongoClient.connect()
      const db = mongoClient.db()

      const dbCollections = Object.entries(collections).reduce((cols: any, [cName, cType]) => {
        // collection<Pet>('pets');
        cols[cName] = db.collection(cName)

        return cols
      }, {})

      instance = dbCollections
      instance.constructor = null

      return instance as typeof collections
    }
  }
})()
