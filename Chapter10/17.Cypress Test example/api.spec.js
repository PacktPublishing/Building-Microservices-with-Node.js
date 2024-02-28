describe('My API', () => {
  it('successfully loads', () => {
    cy.visit('/api/resource');
    cy.contains('Resource data');
  });
});