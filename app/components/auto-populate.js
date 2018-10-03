import Component from '@ember/component';
// import { computed } from '@ember/object';
export default Component.extend({
  country:'',
  currentFocus:-1,
  fileterdCountries:[],
  countrySelected:false,
  init(){
    this._super(...arguments);
    let _scope = this;
    document.addEventListener("click", function (e) {
      _scope.fileterdCountries.clear();
      if(!_scope.get('countrySelected')){
        _scope.set('country','');
      }
    });
  },
  actions:{
    countrySelector(country){
      this.fileterdCountries.clear();
      this.set('country',country);
      this.set('countrySelected',true);
    },
    autopopulate(){
      let arr = this.get('countries');
      var a, b, i, val = this.get('country');
      this.set('country',val);
      this.set('countrySelected',false);
      this.set('currentFocus',-1)
      let filteredResult =[];
      if(val.length){
        filteredResult = arr.filter((item)=>{
          return item.substr(0, val.length).toUpperCase() === val.toUpperCase()
        });
      }
      this.set('fileterdCountries',filteredResult)
    },
    keyUpHandler(e){
      let newCurrentFocusValue;
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        newCurrentFocusValue = this.get('currentFocus')+1;
        if (newCurrentFocusValue >= this.get('fileterdCountries').length) newCurrentFocusValue = 0;
        this.set('currentFocus',newCurrentFocusValue);
        //this.currentFocus++;
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        newCurrentFocusValue = this.get('currentFocus')-1;
        if (newCurrentFocusValue <0) newCurrentFocusValue = this.get('fileterdCountries').length-1 ;
        this.set('currentFocus',newCurrentFocusValue);
        //this.currentFocus--;
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed*/
        e.preventDefault();
        if (this.get('currentFocus') > -1) {
          /*and simulate a click on the "active" item:*/
          let currentCountry = this.fileterdCountries[this.get('currentFocus')];
          this.fileterdCountries.clear();
          this.set('countrySelected',true);
          this.set('country',currentCountry);
        }
      }
    }
  }
});
