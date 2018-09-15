import { Template } from 'meteor/templating';
import './api/records.js'

import './add.html';

Template.body.helpers({
    records() {
      return Records.find({})
    }
  });