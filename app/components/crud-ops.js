import Component from '@ember/component';

export default Component.extend({
  addUserClicked:false,
  frstName:'',
  lstName:'',
  addErrorflag:false,
  opErrorFlag:false,
  actions:{
    addUser(){
      this.set('addUserClicked',true);
    },
    addUserHandler(){
      //call api
      let newRecord = this.get('targetObject.store').createRecord('user', {
        firstName: this.get('frstName'),
        lastName: this.get('lstName')
      });
      newRecord.save().then((response)=> {
        //if success
        this.set('addErrorflag',false);
        this.set('frstName','')
        this.set('lstName','')
        this.set('addUserClicked',false);
      },(response)=> {
        //if failure
        this.set('addErrorflag',true);
        console.log(response);
      });
    },
    editUser(user){
      user.set('editClicked',true);
    },
    saveUser(userData){
      this.get('targetObject.store').find('user', userData.id).then((user)=> {
        user.set('firstName',userData.firstName);
        user.set('lastName',userData.lastName)
        user.save().then((response)=> {
          //if success
          this.set('opErrorFlag',false);
          user.set('editClicked',false);
        },(response)=> {
          //if failure
          this.set('opErrorFlag',true);
          console.log(response);
        });
      });
    },
    deleteUser(userId){
      this.get('targetObject.store').findRecord('user', userId,{ reload: true }).then((user)=> {
        user.destroyRecord().then((response)=> {
          //if success
          this.set('opErrorFlag',false);
        },(response)=> {
          //if failure
          this.set('opErrorFlag',true);
          console.log(response);
        });
      });
    }
  }
});
