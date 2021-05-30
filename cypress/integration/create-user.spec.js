import user from '../fixtures/new-user.json'

describe('When the user want to register  (without image url) ', () =>{

    before(()=>{
        cy.visit('/');        
        cy.get('.btn-primary').click();
        cy.get("#firstname").type(user.name);
        cy.get("#lastname").type(user.lastName);
        cy.get("#id_type").select(user.typeDoc);
        cy.get("#_id").type(user.numDoc);
        cy.get("#username").type(user.userName);
        cy.get("#password").type(user.password);
        cy.get(':nth-child(2) > #action').click();

    })

    it("Then the user should be listed with the right id and user name (without image url)", () =>{
        cy.get(`[data-testid=${user.numDoc}]`).should(($p) => {
            expect($p).to.contain(user.userName);
            expect($p).to.contain(user.numDoc);
        });
    });
    
});

describe('When the user want to register  (with image url) ', () =>{

    before(()=>{
        cy.visit('/');
        cy.get(`[data-testid=${user.numDoc}] > .text-danger > .fas`).click();
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

    it("Then the user should be listed with the right id and user name (with image url)", () =>{
        cy.get(`[data-testid=${user.numDoc}]`).should(($p) => {
            expect($p).to.contain(user.userName);
            expect($p).to.contain(user.numDoc);
        });
    });
    
});