import type { Context } from '../..'
import type { QueryEventArgs, QueryEventsArgs } from '../../types'
import EventService from './event.service'

export default {
  Query: {
    event: async (_: any, args: QueryEventArgs, context: Context) => {
      return new EventService(context).view(args)
    },
    events: async (_: any, args: QueryEventsArgs, context: Context) => {
      return new EventService(context).index(args)
    }
  }
}