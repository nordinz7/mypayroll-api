import redis, { type Redis } from 'ioredis';
import config from '../../config';

export const CacheSingleton = (function () {
  let instance: Redis | null = null
  return {
    getInstance: async (): Promise<Redis> => {
      if (instance != null) {
        return instance
      }

      const cache = new redis({
        host: config.REDIS_HOST,
        port: parseInt(config.REDIS_PORT),
        password: config.REDIS_PASSWORD,
      })

      cache.on('connect', () => {
        console.log('Connected to Redis')
      })

      cache.on('error', (err) => {
        console.error('Redis error: ', err)
      })

      // Override set method to handle JSON stringification
      const originalSet = cache.set.bind(cache);
      cache.set = async (key: string, value: any, ...args: any[]): Promise<any> => {
        const stringValue = Array.isArray(value) || typeof value === 'object' ? JSON.stringify(value) : value;
        const defaultArgs = ['EX', config.REDIS_TTL]
        return originalSet(key, stringValue, ...args.length ? args : defaultArgs);
      };

      // Override get method to handle JSON parsing
      const originalGet = cache.get.bind(cache);
      cache.get = async (key: string): Promise<any> => {
        const value = await originalGet(key);

        try {
          return JSON.parse(value);
        } catch (e) {
          return value;
        }
      };


      instance = cache

      return instance
    }
  }
})()
