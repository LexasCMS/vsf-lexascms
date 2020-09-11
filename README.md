LexasCMS Module for Vue Storefront
================================================================

This is the official Vue Storefront module for retrieving content from [LexasCMS](https://www.lexascms.com).

Under the hood, this module makes use of LexasCMS' JSON:API (REST) content delivery API. For further information, please [see the documentation](https://www.lexascms.com/docs/api-reference/content-delivery/jsonapi/).


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

Register the `vsf-lexascms` module by adding the following to your `./src/modiles/client.ts` file.

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
