import { Sequelize } from 'sequelize'
import { config } from '../../app.config'
import initModels from '../models'
import initMigration from '../migrations'

export const DbSingletonSql = (function () {
  let instance: Sequelize | null = null
  return {
    getInstance: async (): Promise<Sequelize> => {
      if (instance != null) {
        return instance
      }

      const sequelize = new Sequelize(config.POSTGRES_DB, config.POSTGRES_USER, config.POSTGRES_PASSWORD, {
        host: config.POSTGRES_HOST,
        dialect: 'postgres'
      })

      try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
        await initModels(sequelize)
        console.log('Models initialized')
        await initMigration(sequelize)
        console.log('Migrations initialized')
        await sequelize.sync()
        console.log('Database synchronized')
        instance = sequelize
      } catch (error) {
        console.error('Unable to connect to the database:', error)
        throw error
      }

      return instance
    }
  }
})()
