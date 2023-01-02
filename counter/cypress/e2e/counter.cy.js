describe('Counter', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/counter/index.html');
  });

  it('최초의 카운터 값을 0으로 보여준다.', () => {
    cy.get('#value').invoke('text').should('eq', '0');
  });

  it('+ 버튼을 클릭하면 값이 1만큼 증가한다.', () => {
    cy.get('#value')
      .invoke('text')
      .then(value => {
        const preValue = Number(value);
        cy.get('.increase-btn').click();
        cy.get('#value')
          .invoke('text')
          .should('eq', String(preValue + 1));
      });
  });

  it('- 버튼을 클릭하면 값이 1만큼 감소한다.', () => {
    cy.get('.increase-btn').click();
    cy.get('#value')
      .invoke('text')
      .then(value => {
        const preValue = Number(value);
        cy.get('.decrease-btn').click();
        cy.get('#value')
          .invoke('text')
          .should('eq', String(preValue - 1));
      });
  });

  it('+ 버튼을 클릭했을 때 현재 카운터 값이 10이면 더 이상 증가하지 않는다.', () => {
    for (let i = 0; i < 11; i++) {
      cy.get('.increase-btn').click();
    }

    cy.get('#value').invoke('text').should('eq', '10');
  });

  it('- 버튼을 클릭했을 때 현재 카운터 값이 0이면 더 이상 감소하지 않는다.', () => {
    cy.get('.decrease-btn').click();
    cy.get('#value').invoke('text').should('eq', '0');
  });
});
