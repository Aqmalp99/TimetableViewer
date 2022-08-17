import * as React from 'react';
import Login from '../../src/components/login/Login';
import {mount} from '@cypress/react';

it('user should access an application by logging in.', () => {
    mount(<Login />) 
    cy.contains('Login').should('be.visible');
    cy.contains('Username').should('be.visible');
    cy.get('#userName').type('vinay');
    cy.contains('Password').should('be.visible');
    cy.get('#password').type('1234');
    // Calling by form id
    cy.get('#loginForm').submit()
});