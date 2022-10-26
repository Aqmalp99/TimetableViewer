import * as React from 'react';
import Login from '../../src/components/authentication/login2';
import {mount} from '@cypress/react';

it('user should not access application with wrong details', () => {
    mount(<Login />)
    cy.viewport(1080, 900) 
    cy.contains('Uni Timetable').should('be.visible');
    cy.contains('Sign Up').should('be.visible');
    cy.contains('Sign in to access the timetable').should('be.visible');
    cy.get('#formBasicEmail').type('2');
    cy.get('#formBasicPassword').type('1234');
    cy.contains("ERROR: Please try Again").should('be.visible')
    // // Calling by form id
    // cy.get('#loginForm').submit();
});

it('user should access an application by logging in.', () => {
    mount(<Login />)
    cy.viewport(1080, 900) 
    cy.contains('Uni Timetable').should('be.visible');
    cy.contains('Sign Up').should('be.visible');
    cy.contains('Sign in to access the timetable').should('be.visible');
    cy.get('#formBasicEmail').type('10@email.com');
    cy.get('#formBasicPassword').type('pass');
    // // Calling by form id
    // cy.get('#loginForm').submit();
});

it('User can sign up', () => {
    mount(<Login />)
    cy.viewport(1080, 900) 
    cy.contains('Uni Timetable').should('be.visible');
    cy.contains('Sign Up').should('be.visible');
    cy.contains('Sign in to access the timetable').should('be.visible');
    // // Calling by form id
    // cy.get('#loginForm').submit();
});