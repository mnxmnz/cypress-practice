describe('Calculator', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/calculator/index.html');
  });

  it('최초의 계산기 값을 0으로 보여준다.', () => {
    cy.get('#total').invoke('text').should('eq', '0');
  });

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    cy.get('.digit').contains('1').click();
    cy.get('.operation').contains('+').click();
    cy.get('.digit').contains('2').click();
    cy.get('.operation').contains('=').click();
    cy.get('#total').should('have.text', '3');
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    cy.get('.digit').contains('2').click();
    cy.get('.operation').contains('-').click();
    cy.get('.digit').contains('1').click();
    cy.get('.operation').contains('=').click();
    cy.get('#total').should('have.text', '1');
  });

  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    cy.get('.digit').contains('3').click();
    cy.get('.operation').contains('x').click();
    cy.get('.digit').contains('9').click();
    cy.get('.operation').contains('=').click();
    cy.get('#total').should('have.text', '27');
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    cy.get('.digit').contains('9').click();
    cy.get('.operation').contains('/').click();
    cy.get('.digit').contains('3').click();
    cy.get('.operation').contains('=').click();
    cy.get('#total').should('have.text', '3');
  });

  it('AC 버튼을 클릭하면 숫자를 0으로 초기화한다.', () => {
    cy.get('.digit').contains('2').click();
    cy.get('.modifier').click();
    cy.get('#total').should('have.text', '0');
  });

  it('숫자는 한 번에 최대 세 자릿수까지 입력할 수 있다.', () => {
    cy.get('.digit').contains('1').click();
    cy.get('.digit').contains('2').click();
    cy.get('.digit').contains('3').click();
    cy.get('.digit').contains('4').click();
    cy.get('.digit').contains('5').click();
    cy.get('#total').should('have.text', '123');
  });

  it('계산 결과에 대해 소수점 이하의 수는 버린다.', () => {
    cy.get('.digit').contains('3').click();
    cy.get('.operation').contains('/').click();
    cy.get('.digit').contains('2').click();
    cy.get('.operation').contains('=').click();
    cy.get('#total').should('have.text', '1');
  });
});
