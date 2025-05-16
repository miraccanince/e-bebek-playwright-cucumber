Feature: E-bebek Website Automation

  Scenario: User can login, search product, add to basket and logout
    Given I am on the e-bebek homepage
    When I click on the login button
    And I enter valid credentials
    Then I should be logged in successfully
    When I search for "biberon"
    Then I should see search results
    When I select the first product
    And I add the product to basket
    Then the product should be added successfully
    When I logout from the website