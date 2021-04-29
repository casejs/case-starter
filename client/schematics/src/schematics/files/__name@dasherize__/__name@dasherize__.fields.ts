import { Field, ResourceService } from 'abacus-angular-library'

// A generator class is needed because some field properties rely on other services.
export class <%= classify(name) %>FieldsGenerator {
  public <%= camelize(name) %>Fields: Field[]

  constructor(private resourceService: ResourceService) {
    this.<%= camelize(name) %>Fields = []
  }
}
