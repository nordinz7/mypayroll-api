import { SevenBoom } from "graphql-apollo-errors";
import type { Context } from "../..";
import type { MutationAddChartArgs, MutationDeleteChartArgs, MutationUpdateChartArgs, QueryChartArgs, QueryChartsArgs } from "../../types";
import chartValidation from "./chart.validation";

export const chartService = (ctx: Context) => {
  return {
    getById: async (id: number) => ctx.sequelize.models.chart.findByPk(id),
    view: async (args: QueryChartArgs) => {
      const { id } = chartValidation.validate('view', args)

      const chart = await ctx.sequelize.models.chart.findByPk(id)

      if (!chart) {
        throw SevenBoom.notFound('Chart not found')
      }

      return chart
    },
    index: async (args: QueryChartsArgs) => {
      const { limit, offset, ...where } = chartValidation.validate('index', args)

      const { count, rows = [] } = await ctx.sequelize.models.chart.findAndCountAll({
        where,
        limit,
        offset
      })

      return { rows, pageInfo: { count, limit, offset } }
    },
    create: async (args: MutationAddChartArgs) => {
      const input = chartValidation.validate('create', args)

      return ctx.sequelize.models.chart.upsert(input)
    },
    update: async (args: MutationUpdateChartArgs) => {
      const { id, ...input } = chartValidation.validate('update', args)

      const chart = await ctx.sequelize.models.chart.findByPk(id)

      if (!chart) {
        throw SevenBoom.notFound('Chart not found')
      }

      return chart.update(input)
    },
    delete: async (args: MutationDeleteChartArgs) => {
      const { id } = chartValidation.validate('view', args)

      const chart = await ctx.sequelize.models.chart.findByPk(id)

      if (!chart) {
        throw SevenBoom.notFound('Chart not found')
      }

      return chart.destroy()
    }
  }
}