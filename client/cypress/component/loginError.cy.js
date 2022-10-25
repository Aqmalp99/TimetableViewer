import * as React from 'react';
import Login from '../../src/components/login/Login';
import {mount} from '@cypress/react';

it('wrong password and user name should show errors and the user have option to sign up', () => {
    mount(<Login />) 
    cy.contains('Login').should('be.visible');
    cy.contains('Username').should('be.visible');
    cy.get('#userName').type('vinay');
    cy.contains('Password').should('be.visible');
    cy.get('#password').type('1234');
    // Calling by form id
    cy.get('#loginForm').submit();
    cy.contains('ERROR: Username or password is incorrect').should('be.visible');
    cy.request("http://localhost:3000/signup").contains("SIGN UP").should('be.visible');
});