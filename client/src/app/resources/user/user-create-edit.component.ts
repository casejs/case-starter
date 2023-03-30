import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import {
  BreadcrumbService,
  CaseCreateEditComponent,
  caseCreateEditTemplate,
  Field,
  FlashMessageService,
  InputType,
  ResourceDefinition,
  ResourceService
} from '@casejs/angular-library'

import { userDefinition } from './user.definition'

@Component({
  template: caseCreateEditTemplate
})
export class UserCreateEditComponent
  extends CaseCreateEditComponent
  implements OnInit, OnDestroy
{
  definition: ResourceDefinition = userDefinition
  isEditMyself: boolean

  // EditMyself only : Changing user's own email makes token obsolete.
  emailChanged = false

  fields: Field[] = [
    {
      id: 'name',
      label: 'Name',
      property: 'name',
      className: 'is-3',
      inputType: InputType.Text,
      required: true
    },
    {
      id: 'roleId',
      label: `Role`,
      property: 'roleId',
      retrievedItemProperties: {
        roleId: 'role.id'
      },
      inputType: InputType.Select,
      selectOptions: () =>
        this.customResourceService.listSelectOptions('roles'),
      className: 'is-3',
      required: true
    },
    {
      id: 'email',
      label: 'Email',
      property: 'email',
      className: 'is-3',
      inputType: InputType.Email,
      required: true,
      validators: [Validators.email]
    },
    {
      label: 'Password',
      property: 'password',
      className: 'is-3',
      inputType: InputType.Password,
      createValidators: [Validators.required],
      editValidators: []
    },
    {
      label: 'Avatar',
      placeholder: 'Choisir un fichier image',
      property: 'image',
      className: 'is-3',
      inputType: InputType.Image
    },
    {
      label: 'Active',
      helpText: `Only active users can log in.`,
      property: 'isActive',
      initialValue: { value: false },
      className: 'is-3',
      inputType: InputType.Checkbox
    },
    {
      label: 'Color',
      property: 'color',
      className: 'is-6',
      inputType: InputType.ColorPicker,
      required: true
    }
  ]

  constructor(
    formBuilder: FormBuilder,
    router: Router,
    breadcrumbService: BreadcrumbService,
    resourceService: ResourceService,
    flashMessageService: FlashMessageService,
    activatedRoute: ActivatedRoute,
    private customBreadcrumbService: BreadcrumbService,
    private customFlashMessageService: FlashMessageService,
    private customRouter: Router,
    private customActivatedRoute: ActivatedRoute,
    private customResourceService: ResourceService
  ) {
    super(
      formBuilder,
      router,
      breadcrumbService,
      resourceService,
      flashMessageService,
      activatedRoute
    )
    this.isEditMyself = activatedRoute.snapshot.data.editMyself
  }

  ngOnInit() {
    if (this.isEditMyself) {
      this.initUserEditMyselfView()
    } else {
      this.initCreateEditView()
    }
  }

  // Special version of this form when user edits hisself or herself.
  async initUserEditMyselfView() {
    this.mode = this.customActivatedRoute.snapshot.data.mode
    this.fieldSpecialRules = [
      {
        fieldId: 'roleId',
        hidden: true
      },
      {
        fieldId: 'positionId',
        hidden: true
      }
    ]

    this.resolvedFields = await this.resolveFields(this.fields)

    this.item = await this.customResourceService
      .show(this.definition.slug, 'myself')
      .then((itemRes) => itemRes)
    this.item.id = 'myself'

    this.form = await this.generateForm(this.fields)

    this.form.valueChanges.subscribe((newValue: { email: string }) => {
      if (newValue.email !== this.item.email) {
        this.emailChanged = true
      }
    })

    this.customBreadcrumbService.breadcrumbLinks.next([
      {
        path: `/${this.definition.path || this.definition.slug}`,
        label: this.definition.title
      },
      {
        label: `Modifier mon profil`
      }
    ])
  }

  ngOnDestroy() {
    if (this.isEditMyself && this.emailChanged) {
      this.customRouter.navigate(['/logout'])
      this.customFlashMessageService.info(
        `Vous avez changé votre adresse email. Veuillez vous re-connecter avec votre nouvelle adresse.`
      )
    }
  }
}
