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
    return Records.find({})
  }
});

Template.record.events({
 'click .edit'() {
   var data = document.querySelector('.eitdata');
   data.id.value = this._id;
   data.firstName.value = this.firstName;
   data.lastName.value = this.lastName;
   data.gender.value = this.gender ;
   data.dob.value = this.dob;
 },
});