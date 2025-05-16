# E-bebek Web Automation

This project contains automated tests for the e-bebek website using Playwright and Cucumber.

## Features

- Login functionality
- Product search
- Add to cart
- Logout functionality
- CI/CD integration with GitHub Actions
- **Robust error handling and logging** (see logs in the `logs/` directory)

## Prerequisites

- Node.js (v18 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd web-automation-playwright
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

4. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your credentials:
   ```
   EBEBEK_EMAIL=your_email@example.com
   EBEBEK_PASSWORD=your_password
   ```
   Note: The `.env` file is gitignored and should not be committed to the repository.

## Project Structure

```
├── features/                  # Cucumber feature files
├── pages/                     # Page Object Models
│   ├── login.page.js         # Login page interactions
│   ├── search.page.js        # Search page interactions
│   ├── product.page.js       # Product page interactions
│   └── account.page.js       # Account/logout interactions
├── step_definitions/         # Cucumber step definitions
│   └── ebebek.steps.js       # Step implementations
├── utils/                    # Utility modules (logger)
│   └── logger.js             # Winston logger configuration
├── logs/                     # Log files (error.log, combined.log)
└── .github/workflows/        # CI/CD configuration
    └── test.yml             # GitHub Actions workflow
```

## Running Tests

To run the tests:

```bash
npm test
```

## Logging & Error Handling

- All page objects use robust error handling and log important actions and errors.
- Logs are written to the `logs/` directory:
  - `logs/error.log` for errors
  - `logs/combined.log` for all logs
- Console output is colorized for easier local debugging.

## Test Scenarios

The automation covers the following scenarios:

1. **Login**
   - Navigate to homepage
   - Click login button
   - Enter credentials
   - Verify successful login

2. **Search and Add to Cart**
   - Search for a product
   - Verify search results
   - Select first product
   - Add to cart
   - Verify cart update

3. **Logout**
   - Access account menu
   - Click logout
   - Verify successful logout

## CI/CD

The project includes GitHub Actions workflow that:
- Runs on push to main branch and pull requests
- Sets up Node.js environment
- Installs dependencies
- Runs tests
- Uploads test results as artifacts
- **Collects logs as artifacts for debugging**

## Configuration

The test configuration can be found in:
- `cucumber.js` - Cucumber configuration
- `.github/workflows/test.yml` - CI/CD configuration

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## Notes

- Tests run in headed mode for local development
- CI runs in headless mode
- Default timeout is set to 30 seconds
- Test results and logs are available as artifacts in GitHub Actions 