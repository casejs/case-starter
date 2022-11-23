import { DataSource, EntityManager } from 'typeorm'

import { Setting } from '../../resources/case/setting.entity'

export class SettingSeeder {
  entityManager: EntityManager
  count: number

  constructor(dataSource: DataSource, count: number) {
    this.entityManager = dataSource.manager
    this.count = count
  }

  private getSetting(): Setting {
    return this.entityManager.create(Setting, {})
  }

  async seed(): Promise<Setting[]> {
    console.log('\x1b[35m', '[] Seeding settings...')
    const saveSettingPromises: Promise<Setting>[] = Array.from(
      Array(this.count)
    ).map(() => {
      return this.entityManager.save(this.getSetting())
    })

    return Promise.all(saveSettingPromises).then((res) => {
      return res
    })
  }
}
