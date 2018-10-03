import Service from '@ember/service';

export default Service.extend({
  queue:null,
  init() {
    this._super(...arguments);
    this.set('queue', []);
  },
  addToqueue(item){
      this.queue.pushObject(item);
      console.log(this.queue,"++");
  },
  removeFromqueue(item){
    // let index = this.queue.indexOf(item);
    // if(index>-1){
    //   this.queue.splice(index,1);
    //   console.log(this.queue,"--");
    // }else{
    //   console.log('item doesnt exist');
    // }
    this.queue.removeObject(item);
  },
  resetqueue(){
    this.set('queue', []);
  },
  searchInqueue(item){
    let index = this.queue.indexOf(item);
    return index;
  }
});
