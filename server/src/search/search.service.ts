import { SearchResult } from '@case-app/nest-library';
import { Injectable } from '@nestjs/common';
import { Brackets, getConnection } from 'typeorm';
import { User } from '../../../shared/entities/user.entity';

@Injectable()
export class SearchService {
     // Main search function : searches terms on several pre-defined fields of several resources.
  async search({
    terms,
    resources,
  }: {
    terms: string
    resources: string[]
    currentUser?: User
  }): Promise<SearchResult[]> {
    let searchResults: SearchResult[] = []

    if (!terms || !resources || !resources.length) {
      return Promise.resolve([])
    }

    if (resources.includes('users')) {
      const users: SearchResult[] = await this.searchUsers(terms)
      searchResults = [...searchResults, ...users]
    }

    return searchResults
  }


  // Get full SearchResult object based on resource Ids. Useful to retrieve object with label from an id in URL params
  async getSearchResultObjects({
    userIds,
  }: {
    userIds?: string[]
  }): Promise<SearchResult[]> {
    let searchResults: SearchResult[] = []

    // Users
    if (userIds && userIds.length) {
      const users: User[] = await getConnection()
        .getRepository(User)
        .createQueryBuilder('user')
        .whereInIds(userIds)
        .getMany()

      if (users.length) {
        searchResults = [
          ...searchResults,
          ...users.map((user: User) => {
            return {
              id: user.id,
              shortLabel: user.name,
              label: user.name,
              resourceName: 'users'
            }
          })
        ]
      }
    }


    return searchResults
  }

  async searchUsers(terms: string): Promise<SearchResult[]> {
    const users: User[] = await getConnection()
      .getRepository(User)
      .createQueryBuilder('user')
      .andWhere(
        new Brackets(qb => {
          qb.where('user.name like :terms', {
            terms: `%${terms}%`
          }).orWhere('user.email like :terms', {
            terms: `%${terms}%`
          })
        })
      )
      .andWhere('user.isGhost = false')
      .getMany()

    return users.map(
      (user: User) =>
        ({
          id: user.id,
          shortLabel: user.name,
          label: user.name,
          resourceName: 'users'
        } as SearchResult)
    )
  }
}
