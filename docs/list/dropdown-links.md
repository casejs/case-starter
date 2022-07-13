# Dropdown links

![Dropdown links](../assets/images/list/dropdown-links.png)

Dropdown links appear in a dropdown menu on [list view](list/list.md) for each item. Each link can or cannot appear based on different logic: current user [permission](features/roles-and-permissions.md) or a condition for each item.

An [Action](features/actions.md) is triggered on click.

```js
dropdownLinks: [
  {
    label: "Editer collaborateur",
    permission: "editUsers",
    condition: (user: User) => user.isActive,
    action: (user: User) => ({
      type: ActionType.Link,
      link: {
        path: `${userDefinition.path}/${user.id}/edit`,
      },
    }),
  },
  {
    label: "Effacer collaborateur",
    permission: "deleteUsers",
    withDivision: true,
    action: (user: User) => ({
      type: ActionType.Delete,
      delete: {
        itemToDelete: user,
        definition: userDefinition,
      },
    }),
  },
];
```
