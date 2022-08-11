import * as React from 'react';
import ShaeTest from '../../src/components/ShaeTest/ShaeTest';
import {mount} from '@cypress/react';

it('should run', () => {
    mount(<ShaeTest />) 
    cy.contains('My app').should('be.visible');

});