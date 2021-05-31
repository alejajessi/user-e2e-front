import user from '../fixtures/login-user.json'

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


        describe('When user wants to login with his user',() => {
            before(() => {
                cy.intercept('POST', '/api/latest/users/auth/').as('login')
                cy.visit('/');
                cy.get('#btnLogin').click();
                cy.get('#usernameLogin').type(user.userName);
                cy.get('#passwordLogin').type(user.password);
                cy.get('[style=""] > .mt-4 > form.text-center > .d-flex > .btn-secondary').click();
                cy.wait('@login').then((int) => response = int.response);
            
            })

            it('Then status code should be 200 OK',() => {
                expect(response.statusCode).to.equal(200); 
            })

            it('Then user login session with his account',() => {
                cy.get('#btnLogin').should(($p) => {
                    expect($p).to.contain(`Bienvenido ${user.userName}`);
                });
            });
    });

});