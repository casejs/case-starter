import { Connection, EntityManager } from 'typeorm'
import { Setting } from '../../../shared/entities/setting.entity'

export class SettingSeeder {
  entityManager: EntityManager
  count: number

  constructor(connection: Connection, count: number) {
    this.entityManager = connection.createEntityManager()
    this.count = count
  }

  private getSetting(): Setting {
    return this.entityManager.create(Setting, {})
  }

  async seed(): Promise<Setting[]> {
    const saveSettingPromises: Promise<Setting>[] = Array.from(
      Array(this.count)
    ).map(() => {
      return this.entityManager.save(this.getSetting())
    })

    return Promise.all(saveSettingPromises).then(res => {
      return res
    })
  }
}
