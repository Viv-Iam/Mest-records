import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Records } from '../api/records.js';

import './add.html';
import './list.js';

var selected = [];

Template.body.helpers({
    records() {
      return Records.find({})
    }
  });

  Template.body.events({
    'submit .eitdata' (event) {
      // Prevent default browser form submit
      event.preventDefault();
      const target = event.target;
      
      var id = target.id.value;
      console.log('ID', id)

      var eitrecord = {firstName: target.firstName.value , 
                        lastName: target.lastName.value,
                        gender:target.gender.value,
                        dob:target.dob.value};
      if(id === ''){
      Meteor.call('records.insert', eitrecord); 
    } else {
      Meteor.call('records.update', id, eitrecord);
    }
     // Clear form
      target.firstName.value = '';
      target.lastName.value = '';
      target.gender.value = '';
      target.dob.value = '';
    },
    'change .toggle-checked'() {
      var id = this._id;
      if(event.target.checked) {
        selected.push(id);
      } else {
        selected.splice(selected.indexOf(id), 1);
      }
      console.log('remove', selected);
   },
   'click .multidelete'() {
     for (var i = 0; i < selected.length; i++) {
       var ids = selected[i];
       Meteor.call('records.remove', ids);    
     }
     console.log(selected)  
   },
  });
  