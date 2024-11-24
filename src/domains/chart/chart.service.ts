import { SevenBoom } from "graphql-apollo-errors";
import type { Context } from "../..";
import chartValidation from "./chart.validation";
import type { MutationDeleteProductFromChartArgs, MutationUpsertProductToChartArgs, QueryChartArgs } from "../../types";
import type { Includeable } from "sequelize/lib/model";
import { defaults } from "lodash";

export const chartService = (ctx: Context) => {

  const getChart = async (input: QueryChartArgs, opts?: { raw?: boolean, include?: Includeable | Includeable[], upsert?: boolean }) => {
    const where = chartValidation.validate('view', input)

    const params: any = { where }

    opts = defaults(opts, { raw: true, include: [], upsert: false })

    if (Array.isArray(opts.include) && opts.include.length || opts.include) {
      params.include = opts.include
    }

    let chart = await ctx.sequelize.models.chart.findOne(params)

    if (!chart && opts.upsert) {
      chart = await ctx.sequelize.models.chart.create({ customerUuid: input.customerUuid })
    }

    return opts.raw ? chart?.toJSON() : chart
  }

  const recomputeTotalPrice = async (chartId: number) => {
    if (!chartId) return null

    const chart = await ctx.sequelize.models.chart.findByPk(chartId, {
      include: [
        {
          model: ctx.sequelize.models.chartProduct,
          as: 'products',
          include: [
            {
              model: ctx.sequelize.models.product,
              as: 'product'
            }
          ]
        }
      ],
    })

    const convertedChart = chart?.toJSON()

    if (!chart || !convertedChart) {
      throw SevenBoom.notFound('Chart not found')
    }

    const totalPrice = convertedChart.products.reduce((acc, chartProduct) => {
      return acc + (chartProduct.product.price || 0) * (chartProduct.quantity || 0)
    }, 0)

    const updatedChart = await chart.update({ totalPrice })

    return updatedChart.toJSON()
  }

  return {
    getChart,
    recomputeTotalPrice,
    view: async (args: QueryChartArgs) => {
      args.customerUuid = ctx.user?.uuid

      const where = chartValidation.validate('view', args)

      const chart = await ctx.sequelize.models.chart.findOne({ where, include: 'product' })

      if (!chart) {
        throw SevenBoom.notFound('Chart not found')
      }

      return chart
    },
    upsert: async (args: MutationUpsertProductToChartArgs) => {
      await ctx.checkAuth()

      Object.assign(args?.input, { customerUuid: ctx.user?.uuid })

      const { input } = chartValidation.validate('upsert', args)

      const chart = await getChart({ customerUuid: input.customerUuid }, { raw: false, upsert: true })

      const chartId = chart.dataValues.id

      const where = {
        chartId,
        productId: input.productId,
      }

      const chartProduct = await ctx.sequelize.models.chartProduct.findOne({ where })

      if (chartProduct) {
        await chartProduct.update({ quantity: input.quantity })
      } else {
        await ctx.sequelize.models.chartProduct.create({ ...input, chartId })
      }

      return recomputeTotalPrice(chartId)
    },
    delete: async (args: MutationDeleteProductFromChartArgs) => {
      await ctx.checkAuth()

      const { productId } = chartValidation.validate('delete', args)

      const chart = await ctx.sequelize.models.chart.findOne({ where: { customerUuid: ctx.user?.uuid } })

      if (!chart) {
        throw SevenBoom.notFound('Chart not found')
      }

      const chartProduct = await ctx.sequelize.models.chartProduct.findOne({ where: { chartId: chart.dataValues.id, productId } })

      if (!chartProduct) {
        throw SevenBoom.notFound('Product not found in chart')
      }

      await chartProduct.destroy()

      return recomputeTotalPrice(chart.dataValues.id)
    }
  }
}