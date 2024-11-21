import { SevenBoom } from "graphql-apollo-errors";
import type { Context } from "../..";
import type { MutationCreateProductArgs, MutationUpdateProductArgs, MutationUpdateProductStatusArgs, QueryProductArgs, QueryProductsArgs } from "../../types";
import productValidation from "./product.validation";

export const productService = (ctx: Context) => {
  return {
    getById: async (id: number) => ctx.sequelize.models.product.findByPk(id),
    view: async (args: QueryProductArgs) => {
      const { id } = productValidation.validate('view', args)

      const product = await ctx.sequelize.models.product.findByPk(id, {
        include: [
          {
            model: ctx.sequelize.models.user,
            as: 'seller'
          }
        ]
      })

      if (!product) {
        throw SevenBoom.notFound('Product not found')
      }

      return product
    },
    index: async (args: QueryProductsArgs) => {
      const { limit, offset, ...where } = productValidation.validate('index', args)

      const { count, rows = [] } = await ctx.sequelize.models.product.findAndCountAll({
        where,
        limit,
        offset
      })

      return { rows, pageInfo: { count, limit, offset } }
    },
    create: async (args: MutationCreateProductArgs) => {
      let { input } = productValidation.validate('create', args)
      input = Object.assign(input, { sellerUuid: ctx.user?.user?.uuid })
      const res = await ctx.sequelize.models.product.create(input)
      return res.toJSON()
    },
    update: async (args: MutationUpdateProductArgs) => {
      const { id, ...input } = productValidation.validate('update', args)

      const product = await ctx.sequelize.models.product.findByPk(id)

      if (!product) {
        throw SevenBoom.notFound('Product not found')
      }

      return product.update(input)
    },
    updateStatus: async (args: MutationUpdateProductStatusArgs) => {
      const { id } = productValidation.validate('view', args)

      const product = await ctx.sequelize.models.product.findByPk(id)

      if (!product) {
        throw SevenBoom.notFound('Product not found')
      }

      return product.destroy()
    }
  }
}