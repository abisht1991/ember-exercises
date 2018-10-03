import { helper } from '@ember/component/helper';

export function isFocused(params/*, hash*/) {
  if(params[0]===params[1]){
    return true;
  }else{
    return false;
  }
}

export default helper(isFocused);
