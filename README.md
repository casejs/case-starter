# CASE Starter

## Quick start

```
npm install
npm start
```

And go to `http://localhost:3000`

Then you can seed initial data:

```
npm run seed
```

### Add your own entities

Create a file in `/entities` folder with the `.entity.ts` extension and add the following code (example):

```ts
// /entities/cat.entity.ts

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cat {
  public static definition = {
    nameSingular: 'cat',
    namePlural: 'cats',
    slug: 'cat'
  };

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: string;
}
```

And the kill the terminal task and run again to see your changes on the browser. You also can seed immediately to see some dummy content on your new entity.
