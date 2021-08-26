import {SearchResult } from '@case-app/nest-library';
import { Controller, Get, Query, Req } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(
        private readonly searchService: SearchService,
      ) {}


      @Get()
      async search(
        @Query('terms') terms: string,
        @Query('resources') resources: string[],
      ): Promise<SearchResult[]> {
    
        return await this.searchService.search({
          terms,
          resources
       
        })  
      }
    
      @Get('/get-search-result-objects')
      async getSearchResultObjects(
        @Query('userIds') userIds?: string[]
      ): Promise<SearchResult[]> {
        return await this.searchService.getSearchResultObjects({
          userIds,
        })
      }
}
