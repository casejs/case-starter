import { AuthenticableEntity, Entity } from "@casejs/case";

@Entity({
  seedCount: 1,
})
export class Admin extends AuthenticableEntity {
  /**
   * Admin Entity
   * -------------
   * This is the Admin entity, only one allowed to access the admin panel, so keep it safe :)
   *
   * Default credentials for the first Admin:
   * - Email: admin@case.app
   * - Password: case
   *
   * Note: Authenticable entities already comes with an email and a password. Need more ? Add props following the doc:  https://docs.case.app/properties.
   */
}
