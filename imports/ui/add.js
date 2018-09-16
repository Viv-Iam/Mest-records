import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Records } from '../api/records.js';

import './add.html';
import './list.js';

Template.body.helpers({
    records() {
      return Records.find({})
    }
  });

  Template.body.events({
    'submit .eitdata' (event) {
      // Prevent default browser form submit
      event.preventDefault();
   
      // Get value from form element
      const target = event.target;
      const firstName = target.firstName.value;
      const lastName = target.lastName.value;
      const gender = target.gender.value;
      const dob = target.dob.value;
      // Insert a record into the collection
      Meteor.call('records.insert', firstName, lastName, gender, dob);

      // Clear form
      target.firstName.value = '';
      target.lastName.value = '';
      target.gender.value = '';
      target.dob.value = '';
    },
    'click .multidelete'() {
      Meteor.call('records.remove', this._id);
    },
  });
  