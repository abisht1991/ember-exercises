import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';
export function highlightAuto(params) {
  let value = Ember.Handlebars.Utils.escapeExpression(params[1]);
  return htmlSafe(`<b>${value.substr(0, params[0].length)}</b>`+`${value.substr(params[0].length)}`);
}

export default helper(highlightAuto);
