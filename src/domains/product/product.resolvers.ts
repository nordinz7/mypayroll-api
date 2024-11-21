import type { Context } from '../..'
import type { MutationCreateProductArgs, MutationUpdateProductArgs, MutationUpdateProductStatusArgs, QueryProductArgs, QueryProductsArgs } from '../../types'
import { productService } from './product.service'

export default {
  Query: {
    product: async (_: any, args: QueryProductArgs, context: Context) => {
      return productService(context).view(args)
    },
    products: async (_: any, args: QueryProductsArgs, context: Context) => {
      return productService(context).index(args)
    }
  },
  Mutation: {
    createProduct: async (_: any, args: MutationCreateProductArgs, context: Context) => {
      return productService(context).create(args)
    },
    updateProduct: async (_: any, args: MutationUpdateProductArgs, context: Context) => {
      return productService(context).update(args)
    },
    updateProductStatus: async (_: any, args: MutationUpdateProductStatusArgs, context: Context) => {
      return productService(context).updateStatus(args)
    }
  }
}