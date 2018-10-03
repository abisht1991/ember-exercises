import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
export default Component.extend({
  value: '',
  list: service('my-queue'),
  isSearched :false,
  itemExist :false,
  // itemList: computed('list.queue.length', function() {
  //   return this.list.queue;
  // }),
  actions: {
    addToqueue() {
      this.set('isSearched',false);
      this.list.addToqueue(this.get('value'));
      this.set('value', '');
    },
    removeFromqueue(){
      this.set('isSearched',false);
      this.list.removeFromqueue(this.get('value'));
      this.set('value', '');
    },
    resetqueue(){
      this.set('isSearched',false);
      this.list.resetqueue();
      this.set('value', '');
    },
    searchInqueue(){
      this.set('isSearched',true);
      let searchedIndex = this.list.searchInqueue(this.get('value'));
      if(searchedIndex>-1){
        this.set('itemExist',true);
      }else {
        this.set('itemExist',false);
      }
    }
  }
});
