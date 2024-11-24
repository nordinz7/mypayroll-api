import type { Context } from '../..'
import { chartService } from './chart.service'
import type { MutationDeleteProductFromChartArgs, MutationUpsertProductToChartArgs, QueryChartArgs } from "../../types";

export default {
  Query: {
    chart: async (_: any, args: QueryChartArgs, context: Context) => {
      return chartService(context).view(args)
    }
  },
  Mutation: {
    upsertProductToChart: async (_: any, args: MutationUpsertProductToChartArgs, context: Context) => {
      return chartService(context).upsert(args)
    },
    deleteProductFromChart: async (_: any, args: MutationDeleteProductFromChartArgs, context: Context) => {
      return chartService(context).delete(args)
    }
  }
}