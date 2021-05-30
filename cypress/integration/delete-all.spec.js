import users from '../fixtures/secure-delete.json'
import error from '../fixtures/error-messages.json'

describe('When you want to delete all users ', () =>{

    before(()=>{
        cy.visit('/');
        if(cy.get('.text-white > .cursor').visible){
        cy.get('.text-white > .cursor').click();
        }
        for(let i = 0; i < users.user.length; i++){
            cy.get('.btn-primary').click();
            cy.get("#firstname").type(users.user[i].name);
            cy.get("#lastname").type(users.user[i].lastName);
            cy.get("#id_type").select(users.user[i].typeDoc); 
            cy.get("#_id").type(users.user[i].numDoc);
            cy.get("#username").type(users.user[i].userName);
            cy.get("#password").type(users.user[i].password);
            cy.get(':nth-child(2) > #action').click();
        }
        cy.wait(500);
        cy.get('.text-white > .cursor').click();
        
    })

    it("Then all users are deleted", () =>{
        cy.get('.alert').should('have.text', error.noUsers);
    });
    
});