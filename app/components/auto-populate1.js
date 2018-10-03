import Component from '@ember/component';
// import { computed } from '@ember/object';
export default Component.extend({
  //countries:null
  // countryName: computed('firstName', 'lastName', function() {
  //   console.log('compute fullName'); // track when the property recomputes
  //   return `${this.firstName} ${this.lastName}`;
  // })
  currentFocus:-1,
  init(){
    this._super(...arguments);
    let _scope = this;
    document.addEventListener("click", function (e) {
      _scope.closeAllLists(e.target);
    });
  },
  actions:{
    autopopulate(event){
      //var currentFocus;
      let arr= this.countries;

      //console.log("event",event);
      var a, b, i, val = event.target.value;
      /*close any already open lists of autocompleted values*/
      this.closeAllLists();
      let _scope = this;
      if (!val) { return false;}
      this.currentFocus = -1;
      console.log("autopopulate called",this.currentFocus);
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", event.target.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      event.target.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              event.target.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              _scope.closeAllLists();
          });
          a.appendChild(b);
        }
      }
      /*execute a function presses a key on the keyboard:*/
      // event.target.addEventListener("keydown", function(e) {
      //   console.log("keydown called",_scope.currentFocus);
      //     var x = document.getElementById(event.target.id + "autocomplete-list");
      //     if (x) x = x.getElementsByTagName("div");
      //     if (e.keyCode == 40) {
      //       /*If the arrow DOWN key is pressed,
      //       increase the currentFocus variable:*/
      //       _scope.currentFocus++;
      //       /*and and make the current item more visible:*/
      //       _scope.addActive(x);
      //     } else if (e.keyCode == 38) { //up
      //       /*If the arrow UP key is pressed,
      //       decrease the currentFocus variable:*/
      //       _scope.currentFocus--;
      //       /*and and make the current item more visible:*/
      //       _scope.addActive(x);
      //     } else if (e.keyCode == 13) {
      //       /*If the ENTER key is pressed, prevent the form from being submitted,*/
      //       e.preventDefault();
      //       if (_scope.currentFocus > -1) {
      //         /*and simulate a click on the "active" item:*/
      //         if (x) x[_scope.currentFocus].click();
      //       }
      //     }
      //     console.log("keydown end",_scope.currentFocus);
      // });
      console.log("autopopulate end",this.currentFocus);
    },
    keydownHandler(e){
      console.log("keydown called",this.currentFocus);
      var x = document.getElementById(e.target.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        this.currentFocus++;
        /*and and make the current item more visible:*/
        this.addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        this.currentFocus--;
        /*and and make the current item more visible:*/
        this.addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (this.currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[this.currentFocus].click();
        }
      }
      console.log("keydown end",this.currentFocus);
    }
  },
  closeAllLists: function (elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    let inp = document.getElementsByTagName('input');
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  },
  removeActive: function(x) {
    /*a sfunction to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
    console.log("remove called");
  },
  addActive: function(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    this.removeActive(x);
    if (this.currentFocus >= x.length) this.currentFocus = 0;
    if (this.currentFocus < 0) this.currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    console.log("active called",this.currentFocus);
    x[this.currentFocus].classList.add("autocomplete-active");
    console.log("active end",this.currentFocus);
  }
});
