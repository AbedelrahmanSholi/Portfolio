```mermaid
classDiagram
    class BasePage {
        +WebDriver driver
        +wait(element)
        +click(element)
        +type(element, text)
        +getTitle()
    }
    
    class LoginPage {
        -usernameField
        -passwordField
        -loginButton
        -errorMessage
        +enterUsername(username)
        +enterPassword(password)
        +clickLogin()
        +login(username, password)
        +getErrorMessage()
    }
    
    class HomePage {
        -welcomeMessage
        -navigationMenu
        -userProfile
        +isDisplayed()
        +navigateTo(section)
        +getWelcomeText()
    }
    
    class ProductPage {
        -productList
        -filterOptions
        -sortOptions
        +filterBy(criteria)
        +sortBy(criteria)
        +selectProduct(productName)
    }
    
    class CheckoutPage {
        -addressForm
        -paymentForm
        -submitButton
        +enterShippingDetails(address)
        +enterPaymentDetails(payment)
        +completeCheckout()
    }
    
    BasePage <|-- LoginPage
    BasePage <|-- HomePage
    BasePage <|-- ProductPage
    BasePage <|-- CheckoutPage
    
    LoginPage --> HomePage : navigates to
    HomePage --> ProductPage : navigates to
    ProductPage --> CheckoutPage : navigates to
```