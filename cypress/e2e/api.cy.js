describe('Pokemon API', () => {
  it('should return status code 200 for abilities endpoint', () => {
    cy.request('GET', 'https://pokeapi.co/api/v2/ability/stench')
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  });
  it('should return correct data for abilities endpoint', () => {
    cy.request('GET', 'https://pokeapi.co/api/v2/ability/stench')
      .then((response) => {
        expect(response.body).to.have.property('name', 'stench');
        expect(response.body).to.have.property('is_main_series', true);
        expect(response.body.pokemon[0]).to.have.property('is_hidden', true);
      });
  });
  it('should return all required properties for abilities endpoint', () => {
    cy.request('GET', 'https://pokeapi.co/api/v2/ability/stench')
      .then((response) => {
        expect(response.body).to.have.all.keys('id', 'name', 'is_main_series', 'generation', 'names', 'effect_entries', 'effect_changes', 'flavor_text_entries', 'pokemon');
      });
  });
  it('should return correct data for Drizzle ability', () => {
    cy.request('GET', 'https://pokeapi.co/api/v2/ability/drizzle')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name', 'drizzle');
        expect(response.body).to.have.property('is_main_series', true);
      });
  });
  it('should return correct data for Drizzle ability', () => {
    cy.request('GET', 'https://pokeapi.co/api/v2/ability/drizzle')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name', 'drizzle');
        expect(response.body).to.have.property('is_main_series', true);
      });
  });

  it('should return correct data for Speed Boost ability', () => {
    cy.request('GET', 'https://pokeapi.co/api/v2/ability/speed-boost')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name', 'speed-boost');
        expect(response.body).to.have.property('is_main_series', true);
      });
  });

  it('should return correct data for Levitate ability', () => {
    cy.request('GET', 'https://pokeapi.co/api/v2/ability/levitate')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name', 'levitate');
        expect(response.body).to.have.property('is_main_series', true);
      });
  });

  it('should return correct data for Solar Power ability', () => {
    cy.request('GET', 'https://pokeapi.co/api/v2/ability/solar-power')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name', 'solar-power');
        expect(response.body).to.have.property('is_main_series', true);
      });
  });

  it('should return correct data for Protean ability', () => {
    cy.request('GET', 'https://pokeapi.co/api/v2/ability/protean')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name', 'protean');
        expect(response.body).to.have.property('is_main_series', true);
      });
  });
  it('should return status code 404 for nonexistent ability', () => {
    cy.request({
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/ability/nonexistent-ability',
      failOnStatusCode: false // This is important to not fail the test on a non-2xx status code
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});