import { Inject, Injectable } from '@angular/core'
import { Params, Router } from '@angular/router'

import { CaseConfig } from '../interfaces/case-config.interface'
import { Filter } from '../interfaces/filter.interface'

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  persistentFiltersLocalStorageItem: string

  constructor(
    @Inject('CASE_CONFIG_TOKEN') private config: CaseConfig,
    private router: Router
  ) {
    this.persistentFiltersLocalStorageItem = `${this.config.tokenName}PersistentFilters`
  }

  // Returns an object with all filter properties and their current values.
  getFilterForm(
    filters: Filter[],
    persistentFilters: object = {},
    queryParams: { [key: string]: any } = {}
  ): { [key: string]: any } {
    const filterForm: { [key: string]: any } = {}

    filters.forEach((filter: Filter) => {
      if (filter.property) {
        filterForm[filter.property] = filter.value
      } else if (filter.properties) {
        Object.values(filter.properties).forEach((property: string) => {
          filterForm[property] = filter.value?.[property]
        })
      }
    })

    // Override with persistent filters and then queryParams (in that order).
    Object.assign(filterForm, persistentFilters)
    Object.assign(filterForm, this.formatQueryParams(queryParams))

    return filterForm
  }

  // Return a promise of an array of filters with all async items rendered.
  async fetchFilterSelectOptions(filters: Filter[]): Promise<Filter[]> {
    if (!filters || !filters.length) {
      return Promise.resolve([])
    }

    const asyncFilterPromises: Promise<any>[] = []

    filters.forEach((filter: Filter) => {
      if (typeof filter.selectOptions === 'function') {
        asyncFilterPromises.push(
          filter.selectOptions().then((res) => {
            filter.selectOptions = res
          })
        )
      }
    })

    return Promise.all(asyncFilterPromises).then(() => filters)
  }

  getFilterValues(
    filters: Filter[],
    filterForm: { [key: string]: any }
  ): Filter[] {
    filters.forEach((filter: Filter) => {
      if (filter.property) {
        filter.value = filterForm[filter.property]
      } else if (filter.properties) {
        if (!filter.value) {
          filter.value = {}
        }
        Object.values(filter.properties).forEach((property: string) => {
          filter.value[property] = filterForm[property]
        })
      }
    })

    return filters
  }

  // Format queryParams object considering that everything is a string in a URL.
  formatQueryParams(queryParams: { [key: string]: string }): {
    [key: string]: any
  } {
    return Object.keys(queryParams).reduce((output, key) => {
      if (queryParams[key].includes(',')) {
        output[key] = queryParams[key].split(',')
      } else if (queryParams[key] === 'null') {
        output[key] = null
      } else if (queryParams[key] === 'true') {
        output[key] = true
      } else if (queryParams[key] === 'false') {
        output[key] = false
      } else if (new RegExp('^[0-9]+$').test(queryParams[key])) {
        output[key] = parseInt(queryParams[key], 10)
      } else {
        output[key] = queryParams[key]
      }
      return output
    }, {})
  }

  getPersistentFiltersStorageItem(): object {
    return JSON.parse(
      localStorage.getItem(this.persistentFiltersLocalStorageItem) || '{}'
    )
  }

  getPersistentFilters(resourceName: string): object {
    return this.getPersistentFiltersStorageItem()[resourceName]
  }

  savePersistentFilters(resourceName: string, filterForm: any): void {
    const persistentFilters = this.getPersistentFiltersStorageItem() || {}

    // We do not save order filers for UX reasons.
    const newFilters = Object.assign({}, filterForm)
    delete newFilters.orderBy
    delete newFilters.orderByDesc
    delete newFilters.page

    // Delete empty filters.
    Object.keys(newFilters).forEach((key) => {
      if (
        typeof newFilters[key] === 'undefined' ||
        (Array.isArray(newFilters[key]) && !newFilters[key].length)
      ) {
        delete newFilters[key]
      }
    })

    persistentFilters[resourceName] = newFilters

    localStorage.setItem(
      this.persistentFiltersLocalStorageItem,
      JSON.stringify(persistentFilters)
    )
  }

  applyPersistentFilters(resourceName: string): void {
    const persistentFilterQueryParams: any =
      this.getPersistentFilters(resourceName) || {}

    // Reset to 1st page
    persistentFilterQueryParams.page = 1
    this.router.navigate([`/${resourceName}`], {
      queryParams: persistentFilterQueryParams
    })
  }
}
