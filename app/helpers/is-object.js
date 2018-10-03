import { helper } from '@ember/component/helper';

export function isObject(params/*, hash*/) {
  if(typeof(params[0])==='object' && params[0] !== null && !Array.isArray(params[0])){
    return true;
  }else{
    return false;
  }
}

export default helper(isObject);
