import type { Context } from '../..'
import type { MutationAddChartArgs, MutationDeleteChartArgs, MutationUpdateChartArgs, QueryChartArgs, QueryChartsArgs } from '../../types'
import { chartService } from './chart.service'

export default {
  Query: {
    chart: async (_: any, args: QueryChartArgs, context: Context) => {
      return chartService(context).view(args)
    },
    charts: async (_: any, args: QueryChartsArgs, context: Context) => {
      return chartService(context).index(args)
    }
  },
  Mutation: {
    addChart: async (_: any, args: MutationAddChartArgs, context: Context) => {
      return chartService(context).create(args)
    },
    updateChart: async (_: any, args: MutationUpdateChartArgs, context: Context) => {
      return chartService(context).update(args)
    },
    deleteChart: async (_: any, args: MutationDeleteChartArgs, context: Context) => {
      return chartService(context).delete(args)
    }
  }
}