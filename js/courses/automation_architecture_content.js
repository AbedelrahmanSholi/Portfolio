// Automation Architecture Course Content
const automationArchitectureContent = {
    courseId: 'automation-architecture',
    title: 'Automation Architecture Techniques and Design Patterns',
    category: 'Framework Architecture',
    level: 'Advanced',
    duration: '8 Modules',
    
    modules: [
        {
            id: 'module-1',
            title: 'Foundation of Automation Architecture',
            duration: '45 minutes',
            description: 'Master the fundamental principles of designing scalable automation architectures.',
            topics: [
                'Principles of good automation architecture',
                'Scalability vs. Maintainability trade-offs',
                'Framework vs. Library design decisions',
                'Enterprise automation challenges',
                'Architecture documentation and communication'
            ],
            learningOutcomes: [
                'Understand core architectural principles',
                'Identify common architecture anti-patterns',
                'Design architecture documentation',
                'Evaluate existing framework architectures'
            ],
            practicalExercise: 'Analyze and document the architecture of an existing automation framework',
            codeExample: `
// Example: Framework Architecture Documentation Template
public class FrameworkArchitecture {
    /**
     * Core Components:
     * 1. Driver Management Layer
     * 2. Page Object Layer  
     * 3. Test Data Layer
     * 4. Utilities Layer
     * 5. Reporting Layer
     */
    
    // Architectural Principle: Single Responsibility
    public class DriverManager {
        private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();
        
        public static void setDriver(WebDriver driverInstance) {
            driver.set(driverInstance);
        }
        
        public static WebDriver getDriver() {
            return driver.get();
        }
    }
}`
        },
        
        {
            id: 'module-2',
            title: 'SOLID Principles in Test Automation',
            duration: '60 minutes',
            description: 'Apply SOLID principles to create maintainable and extensible automation frameworks.',
            topics: [
                'Single Responsibility Principle in test design',
                'Open/Closed Principle for extensible frameworks',
                'Liskov Substitution in page object hierarchies',
                'Interface Segregation for test utilities',
                'Dependency Inversion in framework components'
            ],
            learningOutcomes: [
                'Apply SOLID principles to test code',
                'Refactor existing test code using SOLID principles',
                'Design interfaces for test components',
                'Create loosely coupled test architectures'
            ],
            practicalExercise: 'Refactor a legacy test class to follow SOLID principles',
            codeExample: `
// Example: Applying SOLID Principles

// Single Responsibility Principle
public class LoginPageActions {
    public void enterUsername(String username) { /* implementation */ }
    public void enterPassword(String password) { /* implementation */ }
    public void clickLoginButton() { /* implementation */ }
}

public class LoginPageValidations {
    public boolean isLoginSuccessful() { /* implementation */ }
    public String getErrorMessage() { /* implementation */ }
}

// Open/Closed Principle
public abstract class BaseReporter {
    public abstract void generateReport(TestResults results);
}

public class AllureReporter extends BaseReporter {
    @Override
    public void generateReport(TestResults results) {
        // Allure-specific implementation
    }
}

// Interface Segregation Principle
public interface Clickable {
    void click();
}

public interface Typeable {
    void type(String text);
}

public class TextBox implements Clickable, Typeable {
    public void click() { /* implementation */ }
    public void type(String text) { /* implementation */ }
}`
        },
        
        {
            id: 'module-3',
            title: 'Essential Design Patterns for Automation',
            duration: '75 minutes',
            description: 'Implement proven design patterns to solve common automation challenges.',
            topics: [
                'Creational Patterns: Builder, Factory, Singleton',
                'Structural Patterns: Adapter, Decorator, Facade',
                'Behavioral Patterns: Strategy, Observer, Command, Template Method',
                'Pattern selection criteria',
                'Anti-patterns to avoid'
            ],
            learningOutcomes: [
                'Implement design patterns in automation frameworks',
                'Choose appropriate patterns for specific scenarios',
                'Combine multiple patterns effectively',
                'Recognize and refactor anti-patterns'
            ],
            practicalExercise: 'Implement a Builder pattern for test data creation',
            codeExample: `
// Example: Builder Pattern for Test Data
public class UserBuilder {
    private String username;
    private String email;
    private String password;
    private UserRole role;
    private boolean isActive;
    
    public UserBuilder withUsername(String username) {
        this.username = username;
        return this;
    }
    
    public UserBuilder withEmail(String email) {
        this.email = email;
        return this;
    }
    
    public UserBuilder withPassword(String password) {
        this.password = password;
        return this;
    }
    
    public UserBuilder withRole(UserRole role) {
        this.role = role;
        return this;
    }
    
    public UserBuilder active() {
        this.isActive = true;
        return this;
    }
    
    public User build() {
        return new User(username, email, password, role, isActive);
    }
}

// Usage
User testUser = new UserBuilder()
    .withUsername("testuser")
    .withEmail("test@example.com")
    .withPassword("securePassword")
    .withRole(UserRole.ADMIN)
    .active()
    .build();`
        },
        
        {
            id: 'module-4',
            title: 'Advanced Page Object Patterns',
            duration: '50 minutes',
            description: 'Master advanced page object patterns for maintainable UI automation.',
            topics: [
                'Traditional Page Object Model limitations',
                'Page Factory pattern implementation',
                'Screenplay Pattern for behavior-driven design',
                'Component-based page objects',
                'Dynamic page object generation',
                'Page object inheritance strategies'
            ],
            learningOutcomes: [
                'Implement advanced page object patterns',
                'Design component-based UI automation',
                'Create dynamic page object systems',
                'Build maintainable page object hierarchies'
            ],
            practicalExercise: 'Convert traditional page objects to component-based architecture',
            codeExample: `
// Example: Component-Based Page Objects
public class Component {
    protected WebElement rootElement;
    protected WebDriver driver;
    
    public Component(WebDriver driver, WebElement rootElement) {
        this.driver = driver;
        this.rootElement = rootElement;
    }
}

public class NavigationComponent extends Component {
    public NavigationComponent(WebDriver driver, WebElement rootElement) {
        super(driver, rootElement);
    }
    
    public void navigateToSection(String section) {
        rootElement.findElement(By.linkText(section)).click();
    }
}

public class SearchComponent extends Component {
    private WebElement searchInput;
    private WebElement searchButton;
    
    public SearchComponent(WebDriver driver, WebElement rootElement) {
        super(driver, rootElement);
        this.searchInput = rootElement.findElement(By.className("search-input"));
        this.searchButton = rootElement.findElement(By.className("search-button"));
    }
    
    public void search(String query) {
        searchInput.clear();
        searchInput.sendKeys(query);
        searchButton.click();
    }
}

public class HomePage {
    private NavigationComponent navigation;
    private SearchComponent search;
    
    public HomePage(WebDriver driver) {
        WebElement navElement = driver.findElement(By.className("navigation"));
        WebElement searchElement = driver.findElement(By.className("search-container"));
        
        this.navigation = new NavigationComponent(driver, navElement);
        this.search = new SearchComponent(driver, searchElement);
    }
    
    public NavigationComponent getNavigation() { return navigation; }
    public SearchComponent getSearch() { return search; }
}`
        },
        
        {
            id: 'module-5',
            title: 'Data-Driven Architecture Design',
            duration: '55 minutes',
            description: 'Design robust data management systems for scalable test automation.',
            topics: [
                'Test data management strategies',
                'Configuration management patterns',
                'Environment-specific data handling',
                'Database integration patterns',
                'API data setup and teardown',
                'Data privacy and security considerations'
            ],
            learningOutcomes: [
                'Design robust data management systems',
                'Implement configuration management',
                'Create environment-agnostic test data',
                'Build secure data handling mechanisms'
            ],
            practicalExercise: 'Design a comprehensive test data management system',
            codeExample: `
// Example: Data Management Architecture
public class DataManager {
    private static final String DATA_PATH = "src/test/resources/data/";
    private static final ObjectMapper objectMapper = new ObjectMapper();
    
    public static <T> T loadTestData(String fileName, Class<T> dataClass) {
        try {
            String filePath = DATA_PATH + fileName;
            return objectMapper.readValue(new File(filePath), dataClass);
        } catch (IOException e) {
            throw new RuntimeException("Failed to load test data: " + fileName, e);
        }
    }
    
    public static <T> List<T> loadTestDataList(String fileName, Class<T> dataClass) {
        try {
            String filePath = DATA_PATH + fileName;
            JavaType listType = objectMapper.getTypeFactory()
                .constructCollectionType(List.class, dataClass);
            return objectMapper.readValue(new File(filePath), listType);
        } catch (IOException e) {
            throw new RuntimeException("Failed to load test data list: " + fileName, e);
        }
    }
}

public class ConfigurationManager {
    private static Properties properties;
    private static final String CONFIG_FILE = "config.properties";
    
    static {
        loadConfiguration();
    }
    
    private static void loadConfiguration() {
        properties = new Properties();
        String environment = System.getProperty("env", "dev");
        String configFile = environment + "_" + CONFIG_FILE;
        
        try (InputStream input = ConfigurationManager.class
                .getClassLoader().getResourceAsStream(configFile)) {
            properties.load(input);
        } catch (IOException e) {
            throw new RuntimeException("Failed to load configuration: " + configFile, e);
        }
    }
    
    public static String getProperty(String key) {
        return properties.getProperty(key);
    }
    
    public static String getBaseUrl() {
        return getProperty("base.url");
    }
    
    public static String getDatabaseUrl() {
        return getProperty("database.url");
    }
}`
        },
        
        {
            id: 'module-6',
            title: 'Parallel Execution and Scalability',
            duration: '65 minutes',
            description: 'Design thread-safe automation frameworks for parallel execution.',
            topics: [
                'Thread-safe automation design',
                'Parallel execution patterns',
                'Resource management and cleanup',
                'Load balancing strategies',
                'Cloud-based execution architectures',
                'Container-based scaling with Docker'
            ],
            learningOutcomes: [
                'Design thread-safe automation frameworks',
                'Implement parallel execution strategies',
                'Build scalable cloud-ready architectures',
                'Optimize resource utilization'
            ],
            practicalExercise: 'Implement thread-safe driver management for parallel execution',
            codeExample: `
// Example: Thread-Safe Parallel Execution
public class ThreadSafeDriverManager {
    private static ThreadLocal<WebDriver> driverThreadLocal = new ThreadLocal<>();
    private static ThreadLocal<String> sessionIdThreadLocal = new ThreadLocal<>();
    
    public static void setDriver(WebDriver driver) {
        driverThreadLocal.set(driver);
        if (driver instanceof RemoteWebDriver) {
            sessionIdThreadLocal.set(((RemoteWebDriver) driver).getSessionId().toString());
        }
    }
    
    public static WebDriver getDriver() {
        return driverThreadLocal.get();
    }
    
    public static String getSessionId() {
        return sessionIdThreadLocal.get();
    }
    
    public static void closeDriver() {
        WebDriver driver = driverThreadLocal.get();
        if (driver != null) {
            driver.quit();
            driverThreadLocal.remove();
            sessionIdThreadLocal.remove();
        }
    }
}

public class ParallelTestExecutor {
    private final ExecutorService executorService;
    private final int threadCount;
    
    public ParallelTestExecutor(int threadCount) {
        this.threadCount = threadCount;
        this.executorService = Executors.newFixedThreadPool(threadCount);
    }
    
    public CompletableFuture<TestResult> executeTest(TestCase testCase) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                // Initialize driver for this thread
                WebDriver driver = DriverFactory.createDriver();
                ThreadSafeDriverManager.setDriver(driver);
                
                // Execute test
                TestResult result = testCase.execute();
                
                return result;
            } catch (Exception e) {
                return TestResult.failed(e.getMessage());
            } finally {
                // Cleanup
                ThreadSafeDriverManager.closeDriver();
            }
        }, executorService);
    }
    
    public void shutdown() {
        executorService.shutdown();
        try {
            if (!executorService.awaitTermination(60, TimeUnit.SECONDS)) {
                executorService.shutdownNow();
            }
        } catch (InterruptedException e) {
            executorService.shutdownNow();
        }
    }
}`
        },
        
        {
            id: 'module-7',
            title: 'Reporting and Monitoring Architecture',
            duration: '50 minutes',
            description: 'Build comprehensive reporting and monitoring systems for automation frameworks.',
            topics: [
                'Multi-level reporting strategies',
                'Real-time monitoring integration',
                'Custom reporting frameworks',
                'Log aggregation and analysis',
                'Performance metrics collection',
                'Alerting and notification systems'
            ],
            learningOutcomes: [
                'Design comprehensive reporting systems',
                'Implement monitoring and alerting',
                'Create custom reporting solutions',
                'Build log analysis capabilities'
            ],
            practicalExercise: 'Create a custom reporting framework with real-time monitoring',
            codeExample: `
// Example: Custom Reporting Framework
public class TestReportManager {
    private static final Logger logger = LoggerFactory.getLogger(TestReportManager.class);
    private final List<ReportGenerator> reportGenerators;
    private final MetricsCollector metricsCollector;
    
    public TestReportManager() {
        this.reportGenerators = Arrays.asList(
            new AllureReportGenerator(),
            new ExtentReportGenerator(),
            new CustomDashboardGenerator()
        );
        this.metricsCollector = new MetricsCollector();
    }
    
    public void recordTestStart(TestCase testCase) {
        TestExecution execution = new TestExecution(testCase);
        execution.setStartTime(Instant.now());
        
        reportGenerators.forEach(generator -> 
            generator.onTestStart(execution));
        
        metricsCollector.incrementTestsStarted();
        logger.info("Test started: {}", testCase.getName());
    }
    
    public void recordTestResult(TestResult result) {
        result.setEndTime(Instant.now());
        
        reportGenerators.forEach(generator -> 
            generator.onTestComplete(result));
        
        // Update metrics
        if (result.isSuccess()) {
            metricsCollector.incrementTestsPassed();
        } else {
            metricsCollector.incrementTestsFailed();
        }
        
        // Send real-time notifications for failures
        if (!result.isSuccess()) {
            notificationService.sendFailureAlert(result);
        }
        
        logger.info("Test completed: {} - Status: {}", 
            result.getTestName(), result.getStatus());
    }
    
    public void generateFinalReport() {
        TestSummary summary = metricsCollector.generateSummary();
        
        reportGenerators.forEach(generator -> 
            generator.generateFinalReport(summary));
        
        // Send summary notification
        notificationService.sendSummaryReport(summary);
    }
}

public class MetricsCollector {
    private final AtomicInteger testsStarted = new AtomicInteger(0);
    private final AtomicInteger testsPassed = new AtomicInteger(0);
    private final AtomicInteger testsFailed = new AtomicInteger(0);
    private final List<Duration> executionTimes = new CopyOnWriteArrayList<>();
    
    public void incrementTestsStarted() { testsStarted.incrementAndGet(); }
    public void incrementTestsPassed() { testsPassed.incrementAndGet(); }
    public void incrementTestsFailed() { testsFailed.incrementAndGet(); }
    
    public void recordExecutionTime(Duration duration) {
        executionTimes.add(duration);
    }
    
    public TestSummary generateSummary() {
        return TestSummary.builder()
            .totalTests(testsStarted.get())
            .passedTests(testsPassed.get())
            .failedTests(testsFailed.get())
            .averageExecutionTime(calculateAverageExecutionTime())
            .build();
    }
}`
        },
        
        {
            id: 'module-8',
            title: 'CI/CD Integration and DevOps Patterns',
            duration: '70 minutes',
            description: 'Integrate automation frameworks seamlessly into CI/CD pipelines.',
            topics: [
                'Pipeline-ready automation design',
                'Containerization strategies',
                'Infrastructure as Code for test environments',
                'Deployment pipeline integration',
                'Quality gates and feedback loops',
                'Monitoring and observability in CI/CD'
            ],
            learningOutcomes: [
                'Design CI/CD-ready automation frameworks',
                'Implement containerized test execution',
                'Create quality gates and feedback mechanisms',
                'Build observable automation systems'
            ],
            practicalExercise: 'Create a complete CI/CD pipeline with automated quality gates',
            codeExample: `
// Example: CI/CD Integration Components

// Dockerfile for test execution
/*
FROM openjdk:11-jre-slim

# Install Chrome and ChromeDriver
RUN apt-get update && apt-get install -y \\
    wget \\
    gnupg \\
    unzip \\
    curl

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \\
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list \\
    && apt-get update \\
    && apt-get install -y google-chrome-stable

# Copy test artifacts
COPY target/test-automation.jar /app/
COPY src/test/resources/ /app/resources/

WORKDIR /app

# Run tests
ENTRYPOINT ["java", "-jar", "test-automation.jar"]
*/

public class PipelineIntegration {
    
    public static class QualityGate {
        private final double passRateThreshold;
        private final int maxFailures;
        
        public QualityGate(double passRateThreshold, int maxFailures) {
            this.passRateThreshold = passRateThreshold;
            this.maxFailures = maxFailures;
        }
        
        public boolean evaluate(TestSummary summary) {
            double passRate = (double) summary.getPassedTests() / summary.getTotalTests();
            boolean passRateMet = passRate >= passRateThreshold;
            boolean failureCountMet = summary.getFailedTests() <= maxFailures;
            
            return passRateMet && failureCountMet;
        }
    }
    
    public static class PipelineReporter {
        public void generateJUnitReport(TestSummary summary) {
            // Generate JUnit XML for CI/CD consumption
            JUnitReportGenerator generator = new JUnitReportGenerator();
            generator.generate(summary, "target/junit-reports/");
        }
        
        public void updateBuildStatus(TestSummary summary, QualityGate gate) {
            boolean passed = gate.evaluate(summary);
            
            if (passed) {
                System.out.println("##teamcity[buildStatus status='SUCCESS']");
            } else {
                System.out.println("##teamcity[buildStatus status='FAILURE' text='Quality gate failed']");
                System.exit(1);
            }
        }
        
        public void publishMetrics(TestSummary summary) {
            // Publish metrics to monitoring system
            MetricsPublisher publisher = new MetricsPublisher();
            publisher.publishGauge("test.execution.total", summary.getTotalTests());
            publisher.publishGauge("test.execution.passed", summary.getPassedTests());
            publisher.publishGauge("test.execution.failed", summary.getFailedTests());
            publisher.publishGauge("test.execution.duration", 
                summary.getTotalExecutionTime().toMillis());
        }
    }
}`
        }
    ],
    
    projects: [
        {
            title: 'E-commerce Automation Architecture',
            description: 'Design a complete automation framework for an e-commerce platform',
            requirements: [
                'Multi-browser support',
                'API and UI test integration',
                'Data-driven test execution',
                'Parallel execution capabilities',
                'Comprehensive reporting'
            ]
        },
        {
            title: 'Microservices Testing Framework',
            description: 'Build an automation framework for microservices architecture',
            requirements: [
                'Service contract testing',
                'End-to-end workflow automation',
                'Service virtualization integration',
                'Distributed tracing and monitoring',
                'Container-based test execution'
            ]
        },
        {
            title: 'Enterprise Framework Migration',
            description: 'Refactor a legacy automation framework using modern patterns',
            requirements: [
                'Apply design patterns to existing code',
                'Implement SOLID principles',
                'Add monitoring and observability',
                'Create migration strategy and documentation'
            ]
        }
    ],
    
    resources: [
        {
            type: 'diagram',
            title: 'Automation Architecture Overview',
            file: 'automation_architecture_overview.md'
        },
        {
            type: 'diagram',
            title: 'Design Patterns in Automation',
            file: 'design_patterns_automation.md'
        },
        {
            type: 'diagram',
            title: 'Scalable Framework Architecture',
            file: 'scalable_framework_architecture.md'
        },
        {
            type: 'diagram',
            title: 'CI/CD Integration',
            file: 'cicd_automation_integration.md'
        }
    ]
};

// Export for use in course modal
if (typeof module !== 'undefined' && module.exports) {
    module.exports = automationArchitectureContent;
}

