import * as React from 'react';
import Signup from "./components/authentication/Signup";
import {mount} from '@cypress/react';

it('user should access an application by logging in.', () => {
    mount(<Signup />)
    
    // Testing the name fields
    cy.contains('First Name').should('be.visible');
    cy.get('#firstname-signup').type('Vinay');
    cy.contains('Last Name').should('be.visible');
    cy.get('#lastname-signup').type('Kumar');


    // testing the emal and password
    cy.contains('Email').should('be.visible');
    cy.get('#email-signup').type('vinay@email.com');
    cy.contains('Password').should('be.visible');
    cy.get('#password-signup').type('password');

    // testing other fields
    cy.contains('Role').should('be.visible');
    cy.get('#role-signup').type('Student');
    cy.contains('Notification').should('be.visible');
    cy.get('#notification-signup').type('true');


    // Calling by form id
    cy.get('#signupform').submit();
});