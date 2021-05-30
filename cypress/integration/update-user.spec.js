import user from '../fixtures/search-user.json'

let response;
describe('Given a registered user when the user wants to update that user ', () =>{

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

    after(() => {
        cy.get(`[data-testid=${user.numDoc}]> .text-danger > .fas`).click();      
      
    })


        describe('When user wants to update the user',() => {
            before(() => {
                cy.intercept('PUT', '/api/latest/users/**').as('updated')
                cy.visit('/');
                cy.get('.input-group > .form-control').type(user.numDoc);
                cy.get('.input-group-append > .btn').click();
                cy.get("#firstname").clear().type(user.name+"modifi");
                cy.get("#username").clear().type(user.userName+"modifi");
                cy.get("#password").type(user.password);
                cy.get('[style=""] > #action').click();
                cy.wait('@updated').then((int) => response = int.response)
            
            })

            it('Then status code should be 200 OK',() => {
                expect(response.statusCode).to.equal(200); //Not set 201 created in backend. Recommended
            })

            it('Then username and name are the updated values',() => {
                cy.get(`[data-testid=${user.numDoc}]`).should(($p) => {
                    expect($p).to.contain(user.userName+"modifi");
                    expect($p).to.contain(user.numDoc);
                });
            });
    });

});