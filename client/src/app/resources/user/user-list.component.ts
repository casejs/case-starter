import { Component, Inject, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import {
  CaseListComponent,
  CaseConfig,
  ResourceDefinition,
  Yield,
  BreadcrumbService,
  FlashMessageService,
  ResourceService,
  caseListTemplate,
  Filter,
  InputType
} from '@case-app/angular-library'

import { userDefinition } from './user.definition'
import { userYields } from './user.yields'

@Component({
  template: caseListTemplate
})
export class UserListComponent extends CaseListComponent implements OnInit {
  definition: ResourceDefinition = userDefinition
  yields: Yield[] = userYields
  filters: Filter[] = [
    {
      label: 'Search users',
      inputType: InputType.MultiSearch,
      searchResources: [userDefinition],
      properties: {
        userIds: 'userIds'
      }
    }
  ]

  constructor(
    router: Router,
    activatedRoute: ActivatedRoute,
    breadcrumbService: BreadcrumbService,
    resourceService: ResourceService,
    flashMessageService: FlashMessageService,
    @Inject('CASE_CONFIG_TOKEN') config: CaseConfig
  ) {
    super(
      router,
      activatedRoute,
      breadcrumbService,
      resourceService,
      flashMessageService,
      config
    )
  }

  ngOnInit(): void {
    this.initListView()
  }
}
