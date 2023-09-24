describe('Pokemon Website Navigation and Account Creation', () => {
  
  before(() => {
    // Visitar la página principal antes de ejecutar los tests
    cy.visit('https://www.pokemon.com/us');
  });
  
  it('should navigate to the Pokedex', () => {
    // Navegar a la Pokedex desde la página principal
    cy.get('a[href="/us/pokedex/"]').click();
    cy.url().should('include', '/pokedex');
  });
  
  it('should navigate to the login page', () => {
    // Navegar a la página de login desde la Pokedex
    cy.get('a[href="/us/pokemon-trainer-club/login"]').click();
    cy.url().should('include', '/login');
  });
  
  it('should navigate to create an account', () => {
    // Navegar a la página de creación de cuenta desde la página de login
    cy.get('a[href="/us/pokemon-trainer-club/sign-up/"]').click();
    cy.url().should('include', '/sign-up');
  });
  
  it('should fill out the account creation form', () => {
    // Llenar el formulario de creación de cuenta con datos de prueba
    cy.get('#dob').type('01/01/2000'); // Reemplaza con una fecha de nacimiento válida
    cy.get('#email').type('test@example.com'); // Reemplaza con un correo electrónico válido
    cy.get('#password').type('Test@1234'); // Reemplaza con una contraseña válida
    cy.get('#confirm_password').type('Test@1234'); // Reemplaza con una contraseña válida
    
    // Aceptar los términos y condiciones y enviar el formulario
    cy.get('#terms').check();
    cy.get('button[type="submit"]').click();
    
    // Verificar que la creación de la cuenta fue exitosa
    cy.url().should('include', '/dashboard'); // Reemplaza con la URL correcta de tu dashboard o la página a la que se redirige después de crear la cuenta
  });
});
