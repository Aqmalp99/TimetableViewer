import * as React from 'react';
import Signup from "../../src/components/authentication/signup2";
import {mount} from '@cypress/react';

it('The user can signup', () => {
    mount(<Signup />)
    cy.viewport(1080, 900) 
    cy.contains('Uni Timetable').should('be.visible');
    cy.contains('Login').should('be.visible');
    cy.get('#username').type('Vinay');
    cy.get('#fullnameID').type('Kumar');
    cy.get('#emailID').type('Kumar');
    cy.get('#PasswordID').type('Kumar');

    cy.contains("Success: New user created").should('be.visible')
    // // Calling by form id
    // cy.get('#loginForm').submit();
});
    
