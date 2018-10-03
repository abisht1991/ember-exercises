import Component from '@ember/component';

export default Component.extend({
  nextItem: 1,
  itemList:[],
  isLoading: false,
  init() {
    this._super(...arguments);
    // Initially load some items.
    this.loadMore();
  },
  // didInsertElement() {
  //   // this.loadMore();
  // },
  actions:{
    scrolled(){
      console.log('scrolled');
    }
  },
  loadMore :function() {
    for (let i = 0; i < 20; i++) {
      let itemName = 'Item ' + this.nextItem++;
      this.itemList.pushObject(itemName);
      // var item = document.createElement('li');
      // item.innerText = 'Item ' + this.nextItem++;
      // document.querySelector('#infinite-list').appendChild(item);
    }
  },
  didRender() {
      this._super(...arguments);
      // this.loadMore();
      //this.$('.item-list').scrollTop(this.$('.selected-item').position().top);
      // Detect when scrolled to bottom.
      let listElm = this.$('#infinite-list');
      let _scope = this;
      listElm.on('scroll', function() {
        if (listElm[0].scrollTop + listElm[0].clientHeight >= listElm[0].scrollHeight) {
          console.log(this);
          _scope.loadMore();
        }
      });
  },
  //listElm:document.querySelector('#infinite-list'),
  // Add 20 items.
  // loadMore :function() {
  //   for (var i = 0; i < 20; i++) {
  //     var item = document.createElement('li');
  //     item.innerText = 'Item ' + this.nextItem++;
  //     document.querySelector('#infinite-list').appendChild(item);
  //   }
  // }

});
