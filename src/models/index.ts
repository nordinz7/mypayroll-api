import type { Sequelize } from 'sequelize'

const initModels = async (sequelize: Sequelize) => {
  const modelFiles = new Bun.FileSystemRouter({
    dir: process.cwd() + '/src/models',
    style: 'nextjs'
  })

  const modelPaths = Object.entries(modelFiles.routes).reduce((acc, [key, value]) => {
    if (key === '/') return acc

    acc.push(value)

    return acc
  }, [] as string[])

  for (const modelPath of modelPaths) {
    const model = await import(modelPath)
    model.default(sequelize)
  }
}

export default initModels
