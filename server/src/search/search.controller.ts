import { SearchResult } from 'case-server-core'
import { Controller, Get, Query } from '@nestjs/common'

import { SearchService } from './search.service'

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(
    @Query('terms') terms: string,
    @Query('resources') resources: string[]
  ): Promise<SearchResult[]> {
    return this.searchService.search({
      terms,
      resources
    })
  }

  @Get('/get-search-result-objects')
  async getSearchResultObjects(
    @Query() resourcesToGet: { [key: string]: string | string[] }
  ): Promise<SearchResult[]> {
    return this.searchService.getSearchResultObjects(resourcesToGet)
  }
}
