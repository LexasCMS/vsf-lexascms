LexasCMS Module for Vue Storefront
================================================================

This is the official Vue Storefront module for retrieving content from [LexasCMS](https://www.lexascms.com).

Under the hood, this module makes use of LexasCMS' JSON:API (REST) content delivery API. For further information, please [see the documentation](https://www.lexascms.com/docs/api-reference/content-delivery/jsonapi/).

- [Installation](#installation)
  - [Install the module](#1-install-the-module)
  - [Configure the module](#2-configure-the-module)
  - [Register the module](#3-register-the-module)
- [Usage](#usage)
  - [LexascmsCollection](#lexascmscollection)
  - [LexascmsItem](#lexascmsitem)
- [Example](#example)


Installation
----------------------------------------------------------------

### 1. Install the module

Run the following command from the root directory of your Vue Storefront project.

```bash
git clone https://github.com/LexasCMS/vsf-lexascms ./src/modules/vsf-lexascms
```

### 2. Configure the module

Configure your LexasCMS space ID by adding the following to your `config/local.json` file.

```js
"lexascms": {
  "spaceId": "YOUR_LEXASCMS_SPACE_ID"
}
```

### 3. Register the module

Register the `vsf-lexascms` module by adding the following to your `./src/modules/client.ts` file.

```ts
import { LexascmsModule } from './vsf-lexascms/src';

// ...

export function registerClientModules () {
  // ...
  registerModule(LexascmsModule);
}
```


Usage
----------------------------------------------------------------

The `vsf-lexascms` module provides two mixins which can be used to retrieve content from LexasCMS. 

- [LexascmsCollection](#lexascmscollection)
- [LexascmsItem](#lexascmsitem)

### LexascmsCollection

The `LexascmsCollection` mixin is used for retrieving multiple items of a particular content type.

Add the mixin to the component in which you would like to retrieve content from LexasCMS.

```ts
import LexascmsCollectionMixin from 'src/modules/vsf-lexascms/src/mixins/LexascmsCollection';

export default {
  mixins: [ LexascmsCollectionMixin ]
}
```

Your component will now accept the following props to configure which content should be retrieved. The retrieved content is made accessible via the `collection` computed property.

| Name        | Type   | Required | Example                               | Comments                                                                                                                                                              |
|-------------|--------|----------|---------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| contentType | String | Y        | `blogPost`                            | The type of content to be retrieved.                                                                                                                  |
| fields      | Object | N        | `{ blogPost: 'title,publishedAt' }`   | See [sparse fieldsets documentation](https://www.lexascms.com/docs/api-reference/content-delivery/jsonapi/sparse-fieldsets/) for more info.                           |
| filter      | Object | N        | `{ title: { _startsWith: 'Hello' } }` | See [filtering documentation](https://www.lexascms.com/docs/api-reference/content-delivery/jsonapi/filtering/) for more info.                                         |
| include     | String | N        | `author,coverImage`                   | See [fetching records documentation](https://www.lexascms.com/docs/api-reference/content-delivery/jsonapi/fetching-records/#including-related-records) for more info. |
| localeCode  | String | N        | `en-GB`                               | See [localisation documentation](https://www.lexascms.com/docs/api-reference/content-delivery/jsonapi/localisation/) for more info.                                   |
| page        | Object | N        | `{ limit: 2, skip: 4 }`               | See [pagination documentation](https://www.lexascms.com/docs/api-reference/content-delivery/jsonapi/pagination/) for more info.                                       |
| sort        | String | N        | `title,-publishedAt`                  | See [ordering documentation](https://www.lexascms.com/docs/api-reference/content-delivery/jsonapi/ordering/) for more info.                                           |


### LexascmsItem

The `LexascmsItem` mixin is used for retrieving a specific individual content item.

Add the mixin to the component in which you would like to retrieve content from LexasCMS.

```ts
import LexascmsItemMixin from 'src/modules/vsf-lexascms/src/mixins/LexascmsItem';

export default {
  mixins: [ LexascmsItemMixin ]
}
```

Your component will now accept the following props to configure which content item should be retrieved. The retrieved content item is made accessible via the `item` computed property.

| Name        | Type   | Required | Example                               | Comments                                                                                                                                                              |
|-------------|--------|----------|---------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| contentType | String | Y        | `blogPost`                            | The type of content to be retrieved.                                                                                                                  |
| id          | String | Y        | `1234`                                | The ID of the content item to be retrieved.                                                                                                                  |
| fields      | Object | N        | `{ blogPost: 'title,publishedAt' }`   | See [sparse fieldsets documentation](https://www.lexascms.com/docs/api-reference/content-delivery/jsonapi/sparse-fieldsets/) for more info.                           |
| localeCode  | String | N        | `en-GB`                               | See [localisation documentation](https://www.lexascms.com/docs/api-reference/content-delivery/jsonapi/localisation/) for more info.                                   |


Example
----------------------------------------------------------------

This section provides an example of using this module to create a new `BlogPost` component which retrieves and displays a given blog post from LexasCMS.

The below code defines our new `BlogPost` component:

```vue
<template>
  <div>
    <div v-if="item">
      <h2>{{item.title}}</h2>
      <div>{{item.body}}</div>
    </div>
  </div>
</template>

<script>
import LexascmsItemMixin from 'src/modules/vsf-lexascms/src/mixins/LexascmsItem';

export default {
  mixins: [ LexascmsItemMixin ]
}
</script>
```

This component can then be used as follows:

```vue
<BlogPost content-type="blogPost" id="cea618d6-16a0-4b9a-87fa-7a1f750f29b6" />
```

Since we'll always be retrieving a blog post, we can simplify the usage of our component by defaulting the value of the `contentType` prop to `blogPost`.

```vue
// ...

<script>
import LexascmsItemMixin from 'src/modules/vsf-lexascms/src/mixins/LexascmsItem';

export default {
  mixins: [ LexascmsItemMixin ],

  props: {
    contentType: {
      type: String,
      default: 'blogPost'
    }
  }
}
</script>
```

Our component usage would then look something like this:

```vue
<BlogPost id="cea618d6-16a0-4b9a-87fa-7a1f750f29b6" />
```

License
----------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE).