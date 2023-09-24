
import {faker} from "@faker-js/faker"
 const userName = faker.person.firstName()
 const password = faker.internet.password()
 const email = faker.internet.email()
 const screenName = faker.person.lastName()

describe('Pokemon Account Creation', () => {
  it('should create a new account', () => {
    // Navigate to the Pokedex
    cy.visit(Cypress.env('url'));
    
    // Click on the login button
    cy.get('span > .sign-in-text-wrapper').click();
    
    // Click on the create account button
    cy.get('#user-account-signup').click();
    
    // Fill out the form
    // Click on the date of birth input to open the date picker
    cy.get('#id_dob').click();
    
   // Click on the label to open the year selection
   cy.get('label.styled-select.button-black').first().click(); // Clicks on the first label with the specified class
   cy.get('[data-option-value="2000"]').click({force: true})
   
   
   // Select the month by clicking on the label and choosing one from the dropdown
   cy.get('label.styled-select.button-black').eq(1).click(); // Clicks on the second label with the specified class
   cy.get('[data-option-value="5"]').click({force: true}); // Adjust the month as needed
    
    // Select a day from the table
    cy.get('.picker__day--infocus').contains('24').click(); // Adjust the day as needed
    
    // Confirm the date selection
    cy.get('button.picker__button--close[data-close="true"]').click();
    
    // Continue to the next screen
    cy.get('input.button[type="submit"]').scrollIntoView().click();

    
    
    // Fill out the user details
    cy.get('#id_username').type(userName); // Adjust the username as needed
    cy.get('#id_password').type(password); // Adjust the password as needed
    cy.get('#id_confirm_password').type(password); // Adjust the password as needed
    cy.get('#id_email').type(email); // Adjust the email as needed
    cy.get('#id_confirm_email').type(email); // Adjust the email as needed
    cy.get('#id_screen_name').type(screenName); // Adjust the screen name as needed
    
    // Accept the terms and newsletters
    cy.get('#id_email_opt_in_general').check();
    cy.get('#id_email_opt_in_pcenter').check();
    cy.get('#id_terms').check();
    
    // There is a capcha I can't continue 
    // Submit the form
    cy.get('input.button[type="submit"]').scrollIntoView().click()
    
    // Check if the account creation was successful
    //cy.get('h3').should('contain.text', 'Hello! Thank you for creating an account!');
  });
  
  Cypress._.times(5,(p) =>{
    beforeEach(() =>{
      cy.contains('Reject All').if('visible').click()
    })
    it('veryfy pokemon ${p + 1} / 5',() =>{
      cy.log(p)
      cy.visit(Cypress.env('url'));
      cy.get("a > span ").contains('Pokédex').click()
      cy.wait(2000)
      cy.contains('Surprise Me!').click()
      cy.wait(2000)
      cy.xpath("((//div[contains(@class, 'pokemon-info')])[1]/p)").then($value =>{
        const pokemonNumber = $value.text()
        cy.log(pokemonNumber)
        cy.wrap(pokemonNumber).as('pokemonNumber');
      })
      cy.xpath("((//div[contains(@class, 'pokemon-info')])[1]/h5)").then($value =>{
        const pokemonName = $value.text()
        cy.log(pokemonName)
        cy.wrap(pokemonName).as('pokemonName');
      })
      cy.xpath("((//div[contains(@class, 'pokemon-info')])[1])").find('div').then(($listOfElements) => {
        let pokemonAbility1, pokemonAbility2;
        if ($listOfElements.length === 1) {
          pokemonAbility1 = $listOfElements.eq(0).text().trim(); // Extracting text content and trimming whitespaces
          return { pokemonAbility1 };
        } else if ($listOfElements.length === 2) {
          pokemonAbility1 = $listOfElements.eq(0).text().trim(); // Extracting text content and trimming whitespaces
          pokemonAbility2 = $listOfElements.eq(1).text().trim(); // Extracting text content and trimming whitespaces
          return { pokemonAbility1, pokemonAbility2 };
        } else {
          throw new Error('Unexpected number of elements: ' + $listOfElements.length);
        }
      }).then((pokemonAbilities) => {
        if (pokemonAbilities.pokemonAbility1) {
          cy.log('pokemonAbility1:', pokemonAbilities.pokemonAbility1);
          cy.wrap(pokemonAbilities.pokemonAbility1).as('pokemonA1');
        } else {
          cy.log('pokemonAbility1 is undefined');
        }
        
        if (pokemonAbilities.pokemonAbility2) {
          cy.log('pokemonAbility2:', pokemonAbilities.pokemonAbility2);
          cy.wrap(pokemonAbilities.pokemonAbility2).as('pokemonA2');
        } else {
          cy.log('pokemonAbility2 is undefined');
        }
      })
    //moving to pokemon info 
    cy.get('.results > :nth-child(1) > a > img').click()


    //comparing the number of the main pokedex with the page 
    cy.get('@pokemonNumber').then((pokemonNumber) => {
      // Log the original pokemonNumber
      cy.log('Original pokemonNumber:', JSON.stringify(pokemonNumber));
      
      // Clean up pokemonNumber: trim whitespace, replace multiple whitespace with a single space, etc.
      const cleanedPokemonNumber = pokemonNumber.replace(/\s+/g, ' ').trim();
      cy.log('Cleaned pokemonNumber:', JSON.stringify(cleanedPokemonNumber));
      
      cy.xpath("((//span[contains(@class, 'pokemon-number')])[3])").invoke('text').then((spanText) => {
          // Log the original spanText
          cy.log('Original Span Text:', JSON.stringify(spanText));
          
          // Clean up spanText: trim whitespace, replace multiple whitespace with a single space, etc.
          const cleanedSpanText = spanText.replace(/\s+/g, ' ').trim();
          cy.log('Cleaned Span Text:', JSON.stringify(cleanedSpanText));
          
          // Assert whether the cleaned span text and cleaned pokemonNumber are equal
          expect(cleanedSpanText).to.equal(cleanedPokemonNumber);
      });
  });
  
  cy.xpath("((//div[contains(@class, 'pokedex-pokemon-pagination-title')]/div)[1])").then($element => {
    // Log the entire element to inspect it
    cy.log('Element:', $element);
    
    // Check if the element has text content
    const xpathText = $element.text().trim();
    cy.log('XPath Text:', JSON.stringify(xpathText));
    
    // Retrieve the aliased pokemonName and compare it with the XPath text
    cy.get('@pokemonName').then((pokemonName) => {
        // Log the aliased pokemonName
        cy.log('pokemonName:', JSON.stringify(pokemonName));
        
        // Clean up and compare the texts
        const cleanedXpathText = xpathText.split('\n')[0].trim(); // Split by newline and get the first part
        const cleanedPokemonName = pokemonName.replace(/[^\w\s]/gi, '').trim(); // Remove all special characters
        
        // Assert whether the cleaned XPath text and cleaned pokemonName are equal
        expect(cleanedXpathText).to.equal(cleanedPokemonName);
    });
});


    //comparing the abilites 
    cy.xpath("((//div[contains(@class, 'dtm-type')]/h3/following-sibling::ul)[1])").find('li').then(($listOfElements) => {
        let ability1, ability2;
        if ($listOfElements.length === 1) {
          ability1 = $listOfElements.eq(0).text().trim(); // Extracting text content and trimming whitespaces
          return { ability1 };
        } else if ($listOfElements.length === 2) {
          ability1 = $listOfElements.eq(0).text().trim(); // Extracting text content and trimming whitespaces
          ability2 = $listOfElements.eq(1).text().trim(); // Extracting text content and trimming whitespaces
          return { ability1, ability2 };
        } else {
          throw new Error('Unexpected number of elements: ' + $listOfElements.length);
        }
      }).then((abilities) => {
        if (abilities.ability1) {
          cy.log('Ability1:', abilities.ability1);
          cy.wrap(abilities.ability1).as('pokemonAbility1');
        } else {
          cy.log('Ability1 is undefined');
        }
        
        if (abilities.ability2) {
          cy.log('Ability2:', abilities.ability2);
          cy.wrap(abilities.ability2).as('pokemonAbility2');
        } else {
          cy.log('Ability2 is undefined');
        }
      })
      
      cy.get('@pokemonA1').then((pokemonA1) => {
        cy.get('@pokemonAbility1').then((pokemonAbility1) => {
          expect(pokemonA1).to.equal(pokemonAbility1);
        });
      });
    })
  })
});