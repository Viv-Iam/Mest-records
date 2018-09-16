import { Template } from 'meteor/templating';
import { Records } from '../api/records.js';

import './add.html';

Template.body.helpers({
    records() {
      return Records.find({})
    }
  });

  Template.body.events({
    'submit .eitdata'(event) {
      // Prevent default browser form submit
      event.preventDefault();
   
      // Get value from form element
      const target = event.target;
      // const firstName = target.firstName.value;
      const lastName = target.lastName.value;
      // const gender = target.gender.value;
      // const dob = target.dob.value;
      // Insert a task into the collection
      Meteor.call('records.insert', lastName);

      // Clear form
      // target.firstName.value = '';
      target.lastName.value = '';
      // target.gender.value = '';
      // target.dob.value = '';
    },
  });
  