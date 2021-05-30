import user from '../fixtures/new-user-error-one.json'
import error from '../fixtures/error-messages.json'

describe('When the user want to register but without required fields', () =>{

    before(()=>{
        cy.visit('/');
        cy.get('.btn-primary').click();
        cy.get("#firstname").type(user.name);
        cy.get("#lastname").type(user.lastName);
        cy.get("#id_type").select(user.typeDoc);
        cy.get("#username").type(user.userName);
        cy.get("#password").type(user.password);
        cy.get(':nth-child(2) > #action').click();

    })

    it("Then the user shouldn't be created because id is a required field  ", () =>{
        cy.get('.p-3').should(($p) => {
            expect($p).to.contain(error.requiredFields);
        });
    });
    
});

describe('When the user want to register but without valid url', () =>{

    before(()=>{
        cy.visit('/');
        cy.get('.btn-primary').click();
        cy.get("#firstname").type(user.name);
        cy.get("#lastname").type(user.lastName);
        cy.get("#photo").type(user.url);
        cy.get("#id_type").select(user.typeDoc);
        cy.get("#_id").type(user.numDoc);
        cy.get("#username").type(user.userName);
        cy.get("#password").type(user.password);
        cy.get(':nth-child(2) > #action').click();

    })

    it("Then the user shouldn't be created because input url is not valid  ", () =>{
        cy.get('.p-3').should(($p) => {
            expect($p).to.contain(error.validUrl);
        });
    });
    
});