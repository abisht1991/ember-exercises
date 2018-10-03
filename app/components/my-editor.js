import Component from '@ember/component';
import { computed } from '@ember/object';
export default Component.extend({
  name:'',
  parseError:false,
  itemList: Ember.computed('name','name.length', function() {
    if(this.get('name')){
      try {
        let  parsedJson = JSON.parse(this.get('name'));
        console.log('parsed name',parsedJson);
        this.set('parseError',false);
        //this.set('isArrayList',Array.isArray(parsedJson));
        return parsedJson;
      } catch (error){
        this.set('parseError',true);
        return [];
      }
    }else{
      this.set('parseError',false);
      return [];
    }
  })
});
