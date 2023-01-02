describe('Counter', () => {
	beforeEach(() => {
		cy.visit('http://127.0.0.1:5500/index.html');
	});

	it('최초의 카운터 값을 0으로 보여준다', () => {
		cy.get('#value').invoke('text').should('eq', '0');
	});
});
