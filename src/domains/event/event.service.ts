import { SevenBoom } from "graphql-apollo-errors"
import type { Context } from "../.."
import eventValidation from "./event.validation"
import { Op } from "sequelize"
import type { CreateEventInput, QueryEventArgs, QueryEventsArgs } from "../../types"
import { groupBy, isEqual } from "lodash"

export default class EventService {
  public ctx

  constructor(ctx: Context) {
    this.ctx = ctx
  }

  async view(args: QueryEventArgs) {
    await this.ctx.checkAuth()

    const { id } = eventValidation.validate('view', args)

    const event = await this.ctx.sequelize.models.event.findByPk(id, {
      include: ['user']
    })

    if (!event) {
      throw SevenBoom.notFound('Product not found')
    }

    return event
  }

  async index(args: QueryEventsArgs) {
    await this.ctx.checkAuth()

    const { input } = eventValidation.validate('index', args)
    const { limit, offset, ...others } = input

    const where = {
      userUuid: this.ctx.user?.uuid,
      model: { [Op.in]: others.models },
      action: { [Op.in]: others.actions }
    }

    if (others.startDate && others.endDate) {
      where.date = {
        [Op.gte]: others.startDate,
        [Op.lte]: others.endDate
      }
    }

    let { count, rows = [] } = await this.ctx.sequelize.models.event.findAndCountAll({
      where,
      include: ['user'],
      order: [['date', 'DESC']],
      raw: true,
      nest: true,
      limit,
      offset
    })

    if (!others.isRaw) {
      const gp = groupBy(rows, (r) => `${r.model}:${r.action}`)
      Object.keys(gp).forEach((k) => {
        const v = gp[k]
        gp[k] = v.filter((item, i) => i === 0 || isEqual(item, v[i - 1]))
      })
      rows = Object.values(gp).flat()
    }

    return { rows, pageInfo: { count, limit, offset } }
  }

  static async create(ctx: Context, args: CreateEventInput) {
    await ctx.checkAuth()

    const input = eventValidation.validate('create', args)
    Object.assign(input, { userUuid: ctx.user?.uuid })
    const res = await ctx.sequelize.models.event.create(input)

    return res.toJSON()
  }
}