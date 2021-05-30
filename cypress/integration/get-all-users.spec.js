import users from '../fixtures/list-users.json'

let response;

describe('When user enter the web page and see all users', () =>{

    before(()=>{
        cy.intercept('GET', '/api/latest/users').as('users')
        cy.visit('/');
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
        cy.wait('@users').then((int) => response=int.response)
        
    })

    after(() => {
        cy.wait(500);
        for(let i = 0; i < users.user.length; i++){

            cy.get(`[data-testid=${users.user[i].numDoc}]> .text-danger > .fas`).click(); 
        }     
      
    })

    it('Then status code should be 200 OK',() => {
        expect(response.statusCode).to.equal(200); 
    })

    it('Then display more than 0 books',async() => { 
        cy.get('.list-group').within(rowsOfUsers => {
            let numRows = Object.keys(rowsOfUsers).length;
            expect(numRows).to.be.greaterThan(1)
        });
    });

});