/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai')
const session = require('supertest-session')
const app = require('../../src/app.js')
const { Dog, conn } = require('../../src/db.js')

const agent = session(app)

const dog = {
  name: 'Pug',
  height: '1.2 1.5',
  weight: '12 15',
  life_span: '8 12',
}

describe('Dogs routes', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err)
    })
  )
  beforeEach(() => Dog.sync({ force: true }).then(() => Dog.create(dog)))
  describe('GET /dogs', () => {
    it('should get 200', () => agent.get('/dogs').expect(200))
    it('get all dogs', () =>
      agent.get('/dogs').expect({
        name: 'Pug',
        height: '1.2 1.5',
        weight: '12 15',
        life_span: '8 12',
      }))
  })
})
