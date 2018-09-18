import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Records } from '../api/records.js'

import './list.html';

Template.record.onCreated(function recordOnCreate() {
  this.state = new ReactiveDict();
});

Template.record.helpers({
  records() {
    const instance = Template.instance();
    if (instance.state.get('togglechecked')) {
      // If hide completed is checked, filter tasks
      // return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
      console.log('CLICKED')
    }
    // return Records.find({})
  }
});

Template.record.events({
 'click .toggle-checked'() {
   // Set the checked property to the opposite of its current value
   Meteor.call('records.setChecked', this._id, !this.checked);
 },
 'click .edit'() {
   var submit = document.querySelector('.submit');
   var update = document.querySelector('.update-btn');
   submit.style.display = "none";
   update.style.display = "unset";
   var data = document.querySelector('.eitdata');
   id = this._id;
   data.firstName.value = this.firstName;
   data.lastName.value = this.lastName;
   data.gender.value = this.gender ;
   data.dob.value = this.dob;
   console.log('ID', id)
 }
//  'change .toggle-checked'(event, instance) {
//   instance.state.set('togglechecked', event.target.checked);
//   console.log('State', event.target.checked)
//   if (event.target.checked === true) {
//     console.log(this._id);
//   }
// },
});