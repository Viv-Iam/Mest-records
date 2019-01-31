//makes mocha know test file
/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'chai';
import { Accounts } from 'meteor/accounts-base';
import { Records } from './records';

//checks is running on the server side
if (Meteor.isServer) {
  describe('Records', () => {
    describe('methods', () => {

      const username ='vivian'
      let recordId, userId;

      before(() => {
        //create user if not already created
        const user = Meteor.users.findOne({username: username})
        
        if(!user) {
          userId = Accounts.createUser({
            'username': username,
            'email': 'vivian.opondoh@gmail.com',
            'password': '12345678'
          })
        } else {
          userId = user._id
        }
      })

      beforeEach(() => {
        //remove all records
        Records.remove({});
        //create record and equate recordId
        recordId = Records.insert({
          createdAt: new Date(),
          username: 'tmeasday',
          firstName: 'Vivian',
          lastName: 'Opondoh',
          gender: 'female',
          dob: '01/01/2017',
        });
      });

      // *******************DELETE****************

      //write test shows that you can delete your own record
      it('can delete owned record', () => {
        // Find the internal implementation of the record method so we can
        // test it in isolation
        const deleteRecord = Meteor.server.method_handlers['records.remove'];

        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId };

        // Run the method with `this` set to the fake invocation
        deleteRecord.apply(invocation, [recordId]);

        // Verify that the method does what we expected
        assert.equal(Records.find().count(), 0);
      });

         // *******************INSERT****************

      //write test shows that you can insert record
      it('can insert owned records', () => {
        // Find the internal implementation of the record method so we can
        // test it in isolation
        const insertRecord = Meteor.server.method_handlers['records.insert'];

        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId };

        // Run the method with `this` set to the fake invocation
        insertRecord.apply(invocation, [recordId]);

        // Verify that the method does what we expected
        assert.equal(Records.find().count(), 2);
      });

       //write test shows that you cannot insert record if not logged in
       it('cannot insert record if !loggedin', () => {
        const eitrecord = {
            createdAt: new Date(),
            username: 'tiday',
            firstName: 'Dilan',
            lastName: 'Timan',
            gender: 'male',
            dob: '01/01/2017',
          }

        // Find the internal implementation of the record method so we can
        // test it in isolation
        const insertRecord = Meteor.server.method_handlers['records.insert'];

        // Set up a fake method invocation that looks like what the method expects
        const invocation = {  };

        // verify that exception is thrown
        assert.throws(function() {  
        // Run test **there are some global variables that are local thus pass them*8
        insertRecord.apply(invocation, [eitrecord]);
        }, Meteor.Error, /not.authorized/);
        
        // Verify that the method does what we expected
        assert.equal(Records.find().count(), 1);
      });


       // *******************UPDATE****************

      //write test shows that you can update record
      it('can update owned records', () => {
        const eitrecord = {
            createdAt: new Date(),
            username: 'sgal',
            firstName: 'Girl',
            lastName: 'Spice',
            gender: 'female',
            dob: '01/01/2017',
          }

        const anotheruserId = Random.id();
        // Find the internal implementation of the record method so we can
        // test it in isolation
        const insertRecord = Meteor.server.method_handlers['records.update'];

        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId };
          
       // Run the method with `this` set to the fake invocation
       insertRecord.apply(invocation, [recordId, eitrecord]);

        // Verify that the method does what we expected
        assert.equal(Records.find().count(), 1);
      });

    });
  });
}