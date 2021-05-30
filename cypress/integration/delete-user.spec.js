import user from '../fixtures/specific-user.json'

let response;
describe('When you want delete a specific user ', () =>{

    before(()=>{

        //Verificar si no existe ya el id que se va a añadir
        cy.visit('/');
        cy.intercept('DELETE', '/api/latest/users/**').as('delete-user')        
        cy.get('.btn-primary').click();
        cy.get("#firstname").type(user.name);
        cy.get("#lastname").type(user.lastName);
        cy.get("#id_type").select(user.typeDoc);
        cy.get("#_id").type(user.numDoc);
        cy.get("#username").type(user.userName);
        cy.get("#password").type(user.password);
        cy.get(':nth-child(2) > #action').click();
        cy.wait(500);
        cy.get(`[data-testid=${user.numDoc}]> .text-danger > .fas`).click();
        cy.wait('@delete-user').then((int) => response=int.response)
    })

    it("Then specific user is deleted", () =>{
        //Pendiente it
        expect(response.statusCode).to.equal(200);
    });
    
});
