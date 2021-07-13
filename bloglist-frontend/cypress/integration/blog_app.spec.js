describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'tester',
      username: 'tester',
      password: 'testing'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username')
        .type('tester')

      cy.get('#password')
        .type('testing')

      cy.contains('login')
        .click()

      cy.contains('tester logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username')
        .type('tester')

      cy.get('#password')
        .type('wrong')

      cy.contains('login')
        .click()

      cy.contains('invalid username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'tester', password: 'testing' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog')
        .click()

      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('https://docs.cypress.io/')
      cy.get('form').submit()

      cy.contains('a blog created by cypress')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'another blog e2e',
          author: 'cypress',
          url: 'http://another.com'
        })
      })

      it('it can be liked', function() {
        cy.contains('another blog e2e')
          .click()

        cy.get('button')
          .contains('like')
          .click()

        cy.contains('likes 1')
      })

      it('it can be deleted by the user who created it', function() {
        cy.contains('another blog e2e')
          .click()

        cy.get('button')
          .contains('remove')
          .click()

        cy.contains('another blog e2e').should('not.exist')
      })

      it('it cannot be deleted by other user', function() {
        const user = {
          name: 'another user',
          username: 'another',
          password: 'testing'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.login({ username: 'another', password: 'testing' })

        cy.contains('another user logged in')

        cy.contains('another blog e2e')
          .click()

        cy.get('button')
          .contains('remove')
          .click()

        cy.contains('Unauthorized token')
        cy.contains('another blog e2e')
      })
    })

    describe('and several blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'first blog', author: 'cypress1',
          url: 'http://first.com/', likes: 1
        })
        cy.createBlog({
          title: 'second blog', author: 'cypress2',
          url: 'http://second.com/', likes: 2
        })
        cy.createBlog({
          title: 'third blog', author: 'cypress3',
          url: 'http://third.com/', likes: 5
        })
      })

      it('it ordered blogs according to likes (most likes first)', function() {
        cy.get('.blogs a').first().contains('third blog')
        cy.get('.blogs a').eq(1).contains('second blog')
        cy.get('.blogs a').eq(2).contains('first blog')
      })
    })
  })
})