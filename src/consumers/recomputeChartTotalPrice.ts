import type { Context } from "..";
import { chartService } from "../domains/chart/chart.service";

export default async (ctx: Context, ...args: any[]) => {
  const [customerUuid, productId] = args
  const service = chartService(ctx)

  const chart = await service.getChart({ customerUuid }, { raw: true, include: service.include })

  if (!chart) {
    return
  }

  const isProductInChart = chart.products.some((product: any) => product.productId === productId)

  if (!isProductInChart) {
    return
  }

  await service.recomputeTotalPrice(chart.id)
}