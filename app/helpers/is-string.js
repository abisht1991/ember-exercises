import { helper } from '@ember/component/helper';

export function isString(params/*, hash*/) {
  if(typeof(params[0])==='string' || typeof(params[0])==='number' || params[0]===null){
    return true;
  }else{
    return false;
  }
}

export default helper(isString);
