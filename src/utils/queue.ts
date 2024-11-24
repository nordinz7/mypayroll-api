import { Queue, Worker } from 'bullmq';
import config from '../../config';
import consumers from '../consumers';
import type { Context } from '..';

export const QueueSingleton = (function () {
  let instance: Queue | null = null
  return {
    getInstance: async (ctx: Context): Promise<Queue> => {
      if (instance != null) {
        return instance
      }

      const queue = new Queue(config.QUEUE_NAME, {
        connection: ctx.cache,
        defaultJobOptions: {
          removeOnComplete: true,
          removeOnFail: true,
        },
      });

      await queue.waitUntilReady()

      const worker = new Worker(config.QUEUE_NAME, async (job) => {
        console.log('Job started', job.name)
        console.log('Job data', job.data)

        if (job.name === 'updateProductPrice') {
          const { customerUuid, productId } = job.data
          consumers.recomputeChartTotalPrice(ctx, customerUuid, productId)
        }

      }, { connection: ctx.cache })

      worker.on('failed', (job, error) => {
        console.log(`Job Failed: ${job?.name}`, error, { reason: job?.failedReason })
      })

      worker.on('error', err => {
        console.log('Worker error: ', err)
      })

      instance = queue

      return instance
    }
  }
})()
