import Jsona from 'jsona';
import {
  TAnyKeyValueObject,
  TJsonaModel,
  TJsonApiBody as TBaseJsonApiBody,
  TJsonApiLinks
} from 'jsona/lib/JsonaTypes';

import { JsonPropertiesMapper } from './jsona/json-properties-mapper';

type TJsonApiBody = TBaseJsonApiBody & {
  links?: TJsonApiLinks;
  meta?: TAnyKeyValueObject;
};

export function DeserializeJsonapiResponse(jsonapiResponse: TJsonApiBody): TJsonaModel | Array<TJsonaModel> {
  // Create data formatter
  const dataFormatter = new Jsona({
    jsonPropertiesMapper: new JsonPropertiesMapper()
  });
  // Deserialize response
  const deserializedInput = dataFormatter.deserialize(jsonapiResponse);
  // Define deserialized response
  const deserializedResponse = {
    data: deserializedInput
  };
  // Handle top level links
  if (jsonapiResponse.links !== undefined) {
    deserializedResponse['_links'] = jsonapiResponse.links;
  }
  // Handle top level meta
  if (jsonapiResponse.meta !== undefined) {
    deserializedResponse['_meta'] = jsonapiResponse.meta;
  }
  // Return
  return deserializedResponse;
}