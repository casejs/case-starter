import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder } from '@angular/forms'

import { AbcCreateEditComponent, Field, Filter, ResourceDefinition, BreadcrumbService, FlashMessageService, ResourceService, abcCreateEditTemplate } from 'abacus-angular-library'

import { <%= camelize(name) %>Definition } from '../<%= camelize(name) %>.definition'
import { <%= classify(name) %>FieldsGenerator } from '../<%= camelize(name) %>.fields'

@Component({ template: abcCreateEditTemplate })
export class <%= classify(name) %>CreateEditComponent extends AbcCreateEditComponent implements OnInit {
  definition: ResourceDefinition = <%= camelize(name) %>Definition
  fields: Field[]
  filters: Filter[] = []

  constructor(
    formBuilder: FormBuilder,
    router: Router,
    activatedRoute: ActivatedRoute,
    resourceService: ResourceService,
    breadcrumbService: BreadcrumbService,
    flashMessageService: FlashMessageService,
    private fieldsGenerator: <%= classify(name) %>FieldsGenerator
  ) {
    super(
      formBuilder,
      router,
      breadcrumbService,
      resourceService,
      flashMessageService,
      activatedRoute
    )
  }

  ngOnInit() {
    this.fields = this.fieldsGenerator.<%= camelize(name) %>Fields

    this.initCreateEditView()
  }
}
