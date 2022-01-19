import { SearchResult } from '@case-app/nest-library'
import { Injectable } from '@nestjs/common'
import {
  Brackets,
  getConnection,
  SelectQueryBuilder,
  WhereExpression
} from 'typeorm'
import { User } from '../../../shared/entities/user.entity'
import { Role } from '../../../shared/entities/role.entity'

@Injectable()
export class SearchService {
  // Main search function : searches terms on several pre-defined fields of several resources.
  async search({
    terms,
    resources
  }: {
    terms: string
    resources: string[]
  }): Promise<SearchResult[]> {
    let searchResults: SearchResult[] = []

    if (!terms || !resources || !resources.length) {
      return Promise.resolve([])
    }

    // * Search resources (keep comment for schematics).
    if (
      resources.includes(User.name) &&
      User.searchableFields &&
      User.searchableFields.length
    ) {
      const users: SearchResult[] = await this.searchResource(User, terms)
      searchResults = [...searchResults, ...users]
    }

    if (
      resources.includes(Role.name) &&
      Role.searchableFields &&
      Role.searchableFields.length
    ) {
      const roles: SearchResult[] = await this.searchResource(Role, terms)
      searchResults = [...searchResults, ...roles]
    }

    return searchResults
  }

  // TODO: What about icons ? Not possible with today's version because either MultiSearch or Server-side do not have access to icon per resource.

  // Get full SearchResult object based on resource Ids. Used to display selection.
  async getSearchResultObjects(query: {
    [key: string]: string | string[]
  }): Promise<SearchResult[]> {
    let searchResults: SearchResult[] = []

    // * Get search result objects (keep comment for schematics).
    if (query.userIds && query.userIds.length) {
      const users: SearchResult[] = await this.getSearchResultObjectsForResource(
        User,
        query.userIds
      )
      searchResults = [...searchResults, ...users]
    }
    if (query.roleIds && query.roleIds.length) {
      const roles: SearchResult[] = await this.getSearchResultObjectsForResource(
        Role,
        query.roleIds
      )
      searchResults = [...searchResults, ...roles]
    }

    return searchResults
  }

  private async searchResource(
    resourceClass: any,
    terms: string
  ): Promise<SearchResult[]> {
    const query: SelectQueryBuilder<any> = await getConnection()
      .getRepository(resourceClass)
      .createQueryBuilder('resource')
      // Search through all searchableFields.
      .andWhere(
        new Brackets(qb => {
          resourceClass.searchableFields.reduce(
            (qb: WhereExpression, searchableField: string) =>
              qb.orWhere(`resource.${searchableField} like :terms`, {
                terms: `%${terms}%`
              }),
            qb
          )
        })
      )

    const resources: any[] = await query.getMany()

    return resources.map((resource: any) => ({
      id: resource.id,
      label: resource[resourceClass.displayName],
      resourceName: resourceClass.name
    }))
  }

  private async getSearchResultObjectsForResource(
    resourceClass: any,
    ids: string | string[]
  ): Promise<SearchResult[]> {
    const resources: any[] = await getConnection()
      .getRepository(resourceClass)
      .createQueryBuilder('resource')
      .whereInIds(ids)
      .getMany()

    return resources.map((resource: User) => ({
      id: resource.id,
      label: resource[resourceClass.displayName],
      resourceName: resourceClass.name
    }))
  }
}
