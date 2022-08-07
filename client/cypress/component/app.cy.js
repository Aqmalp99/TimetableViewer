import * as React from 'react';
import App from '../../src/App';
import {mount} from '@cypress/react';

it('should run', () => {
    mount(<App />) 
    cy.contains('Email address').should('be.visible');

});