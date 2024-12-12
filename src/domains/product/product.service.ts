import { SevenBoom } from "graphql-apollo-errors";
import type { Context } from "../..";
import type { MutationCreateProductArgs, MutationUpdateProductArgs, MutationUpdateProductStatusArgs, QueryProductArgs, QueryProductsArgs } from "../../types";
import productValidation from "./product.validation";

export const productService = (ctx: Context) => {
  return {
    getByPk: async (id: number) => ctx.sequelize.models.product.findByPk(id),
    view: async (args: QueryProductArgs) => {
      await ctx.checkAuth()

      const { id } = productValidation.validate('view', args)

      const product = await ctx.sequelize.models.product.findByPk(id, {
        include: [{ model: ctx.sequelize.models.user, as: 'seller' }]
      })

      if (!product) {
        throw SevenBoom.notFound('Product not found')
      }

      return product
    },
    index: async (args: QueryProductsArgs) => {
      await ctx.checkAuth()

      const { input } = productValidation.validate('index', args)
      const { limit, offset, ...where } = input

      const { count, rows = [] } = await ctx.sequelize.models.product.findAndCountAll({
        where,
        limit,
        offset
      })

      return { rows, pageInfo: { count, limit, offset } }
    },
    create: async (args: MutationCreateProductArgs) => {
      await ctx.checkAuth()

      let { input } = productValidation.validate('create', args)
      input = Object.assign(input, { sellerUuid: ctx.user?.uuid })

      const res = await ctx.sequelize.models.product.create(input)

      return res.toJSON()
    },
    update: async (args: MutationUpdateProductArgs) => {
      await ctx.checkAuth()

      const { id, input } = productValidation.validate('update', args)

      const product = await ctx.sequelize.models.product.findByPk(id)

      if (!product) {
        throw SevenBoom.notFound('Product not found')
      }

      const res = await product.update(input)

      await ctx.queue.add('updateProductPrice', { customerUuid: ctx.user?.uuid, productId: id })

      return res
    },
    updateStatus: async (args: MutationUpdateProductStatusArgs) => {
      await ctx.checkAuth()

      const { id } = productValidation.validate('view', args)

      const product = await ctx.sequelize.models.product.findByPk(id)

      if (!product) {
        throw SevenBoom.notFound('Product not found')
      }

      const res = product.destroy()

      await ctx.queue.add('updateProductPrice', { customerUuid: ctx.user?.uuid, productId: id })

      return res
    }
  }
}