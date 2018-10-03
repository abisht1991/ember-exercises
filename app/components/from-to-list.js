import Component from '@ember/component';

export default Component.extend({
  selectedLeftItem:[],
  selectedRightItem:[],
  actions:{
    rightPaneClickHandler(item, event){
      //const item = event.target.textContent;
      console.log(item);
      let itemExist = this.selectedRightItem.filterBy('name',item.name);
      if(itemExist.length){
        //this.removeItems([item], this.selectedRightItem);
        this.selectedRightItem.removeObject(item);
        //event.target.classList.remove("active");
        Ember.set(item,'isSelected',false);
      }else{
        //event.target.classList.add("active");
        Ember.set(item,'isSelected',true);
        // this['left-pane-data'].removeObject(item);
        this.selectedRightItem.addObject(item);
      }
    },
    leftPaneClickHandler(item , event){
      // const item = event.target.textContent;
      console.log(item);
      // let itemExist = this.selectedLeftItem.indexOf(item);
      let itemExist = this.selectedLeftItem.filterBy('name', item.name);
      if(itemExist.length){
        //this.removeItems([item], this.selectedLeftItem);
        this.selectedLeftItem.removeObject(item);
        Ember.set(item,'isSelected',false);
        // event.target.classList.remove("active");
      }else{
        //event.target.classList.add("active");
        Ember.set(item,'isSelected',true);
        // this['left-pane-data'].removeObject(item);
        this.selectedLeftItem.addObject(item);
      }
    },
    moveSelectedToRight(event){
      //this.removeItems(this.selectedLeftItem,this['left-pane-data']);
      //this['right-pane-data'].pushObject(...this.selectedLeftItem);
      //this.addItems(this.selectedLeftItem, this['right-pane-data']);
      for(let i=0;i<this.selectedLeftItem.length;i++){
        Ember.set(this.selectedLeftItem[i],'isSelected',false);
        this['left-pane-data'].removeObject(this.selectedLeftItem[i]);
        this['right-pane-data'].pushObject(this.selectedLeftItem[i]);
      }
      this.selectedLeftItem.clear();
    },
    moveSelectedToLeft(event){
      //this.removeItems(this.selectedLeftItem,this['left-pane-data']);
      //this['right-pane-data'].pushObject(...this.selectedLeftItem);
      //this.addItems(this.selectedLeftItem, this['right-pane-data']);
      for(let i=0;i<this.selectedRightItem.length;i++){
        Ember.set(this.selectedRightItem[i],'isSelected',false);
        this['right-pane-data'].removeObject(this.selectedRightItem[i]);
        this['left-pane-data'].pushObject(this.selectedRightItem[i]);
      }
      this.selectedRightItem.clear();
    },
    moveAllToLeft(){
      this.addItems(this['right-pane-data'],this['left-pane-data']);
      this['right-pane-data'].clear();
    },
    moveAllToRight(event){
      // this.removeItems(this.selectedLeftItem,this['left-pane-data']);
      //this['right-pane-data'].pushObject(...this['left-pane-data']);
      this.addItems(this['left-pane-data'],this['right-pane-data']);
      this['left-pane-data'].clear();
    }
  },
  removeItems(items, target){
    for(let i=0;i<items.length;i++){
      target.removeObject(items[i]);
    }
  },
  addItems(items, target){
    for(let i=0;i<items.length;i++){
      Ember.set(items[i],'isSelected',false);
      target.pushObject(items[i]);
    }
  }
});
