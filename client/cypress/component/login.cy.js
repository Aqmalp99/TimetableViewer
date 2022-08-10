import * as React from 'react';
import Login from '../../src/components/login/Login';
import {mount} from '@cypress/react';

it('should run', () => {
    mount(<Login />) 
    cy.contains('Email address').should('be.visible');

});