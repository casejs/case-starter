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

    if (
      resources.includes('users') &&
      User.searchableFields &&
      User.searchableFields.length
    ) {
      const users: SearchResult[] = await this.searchResource(User, terms)
      searchResults = [...searchResults, ...users]
    }

    if (
      resources.includes('roles') &&
      Role.searchableFields &&
      Role.searchableFields.length
    ) {
      const users: SearchResult[] = await this.searchResource(Role, terms)
      searchResults = [...searchResults, ...users]
    }

    return searchResults
  }

  // TODO: schematics for search.
  // TODO searchableFields for all entities
  // TODO: schematics for searchableFields
  // TODO: What about icons ?

  // Get full SearchResult object based on resource Ids. Used to display selection.
  async getSearchResultObjects(query: {
    [key: string]: string | string[]
  }): Promise<SearchResult[]> {
    let searchResults: SearchResult[] = []

    if (query.userIds && query.userIds.length) {
      const users: SearchResult[] = await this.getSearchResultObjectsForResource(
        User,
        query.userIds
      )
      searchResults = [...searchResults, ...users]
    }

    return searchResults
  }

  private async searchResource(
    resource: any,
    terms: string
  ): Promise<SearchResult[]> {
    const query: SelectQueryBuilder<any> = await getConnection()
      .getRepository(resource)
      .createQueryBuilder('resource')

      .andWhere(
        new Brackets(qb => {
          resource.searchableFields.reduce(
            (qb: WhereExpression, searchableField: string) =>
              qb.orWhere(`resource.${searchableField} like :terms`, {
                terms: `%${terms}%`
              }),
            qb
          )
        })
      )

    const resources: any[] = await query.getMany()

    // TODO: Remove shortlabel
    return resources.map((resource: any) => ({
      id: resource.id,
      shortLabel: resource.name,
      label: resource.name,
      resourceName: 'users'
    }))
  }

  private async getSearchResultObjectsForResource(
    resource: any,
    ids: string | string[]
  ): Promise<SearchResult[]> {
    const resources: any[] = await getConnection()
      .getRepository(resource)
      .createQueryBuilder('resource')
      .whereInIds(ids)
      .getMany()

    return resources.map((resource: User) => ({
      id: resource.id,
      shortLabel: resource.name,
      label: resource.name,
      // TODO: should be dynamic
      resourceName: 'users'
    }))
  }
}
