describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('angular-firebase-shop app is running!')
    cy.contains('Inside navbar component')
  })
})
