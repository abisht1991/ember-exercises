import { helper } from '@ember/component/helper';

export function isArray(params/*, hash*/) {
  return Array.isArray(params[0]);
}

export default helper(isArray);
