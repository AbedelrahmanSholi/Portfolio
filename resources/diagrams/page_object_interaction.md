```mermaid
sequenceDiagram
    participant Test as Test Class
    participant LoginPage as LoginPage
    participant HomePage as HomePage
    participant ProfilePage as ProfilePage
    
    Test->>LoginPage: new LoginPage(driver)
    Test->>LoginPage: open()
    LoginPage->>LoginPage: navigate to login URL
    LoginPage->>LoginPage: wait for page load
    Test->>LoginPage: login("username", "password")
    LoginPage->>LoginPage: enterUsername("username")
    LoginPage->>LoginPage: enterPassword("password")
    LoginPage->>LoginPage: clickLoginButton()
    LoginPage->>HomePage: return new HomePage(driver)
    Test->>HomePage: navigateToProfile()
    HomePage->>HomePage: click profile link
    HomePage->>ProfilePage: return new ProfilePage(driver)
    Test->>ProfilePage: getUserName()
    ProfilePage->>Test: return "User Name"
```