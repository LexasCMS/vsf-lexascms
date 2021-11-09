import { JsonPropertiesMapper as BaseJsonPropertiesMapper } from 'jsona';
import {
  TAnyKeyValueObject,
  TJsonaModel,
  TJsonApiLinks
} from 'jsona/lib/JsonaTypes';

export class JsonPropertiesMapper extends BaseJsonPropertiesMapper {
  
  setMeta(model: TJsonaModel, meta: TAnyKeyValueObject): void {
    model._meta = meta;
  }
  
  setLinks(model: TJsonaModel, links: TJsonApiLinks): void {
    model._links = links;
  }
  
  setRelationshipLinks(parentModel: TJsonaModel, relationName: string, links: TJsonApiLinks): void {
    if (parentModel[relationName] === undefined) {
      parentModel[relationName] = {};
    }
    parentModel[relationName]._links = links;
  };
  
  setRelationshipMeta(parentModel: TJsonaModel, relationName: string, meta: TAnyKeyValueObject): void {
    if (parentModel[relationName] === undefined) {
      parentModel[relationName] = {};
    }
    parentModel[relationName]._meta = meta;
  }
  
}
