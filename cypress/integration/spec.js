describe('Application', () => {
    it('Elle charge correctement ! ', () => {
        cy.visit('http://localhost:4000') // change URL to match your dev URL
    })
})

describe('Clique sur lancer une partie ', () => {
    it('clique lancer une partie', () => {
        cy.contains('NOUVELLE PARTIE') // change URL to match your dev URL
            .click()
    })
})