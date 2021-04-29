import { Component, OnInit, Inject } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import {
  abcListTemplate,
  AbcListComponent,
  Filter,
  ResourceDefinition,
  BreadcrumbService,
  FlashMessageService,
  ResourceService,
  AbacusConfig,
  Yield
} from 'abacus-angular-library'

import { <%= camelize(name) %>Definition } from '../<%= camelize(name) %>.definition'
import { <%= camelize(name) %>Yields } from '../<%= camelize(name) %>.yields'

@Component({ template: abcListTemplate })
export class <%= classify(name) %>ListComponent extends AbcListComponent implements OnInit {
  definition: ResourceDefinition = <%= camelize(name) %>Definition
  yields: Yield[] = <%= camelize(name) %>Yields

  filters: Filter[] = []

  constructor(
    router: Router,
    activatedRoute: ActivatedRoute,
    resourceService: ResourceService,
    breadcrumbService: BreadcrumbService,
    flashMessageService: FlashMessageService,
    @Inject('ABACUS_CONFIG_TOKEN') config: AbacusConfig
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

  ngOnInit() {
    this.initListView()
  }
}
