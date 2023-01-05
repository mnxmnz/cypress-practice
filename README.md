# Cypress-Practice

[하루만에 Cypress로 작성하는 자바스크립트 E2E 테스트 코드](https://www.inflearn.com/course/싸이프레스-테스트) 강의 실습 코드 정리 레포입니다.

<br />

## 1. Installation

```bash
npm install cypress --save-dev

yarn add cypress --dev
```

<br />

## 2. Getting Started

```bash
npx cypress open

yarn run cypress open

./node_modules/.bin/cypress open

$(npm bin)/cypress open
```

<br />

## 3. Cypress API

### 3-1. visit

```js
cy.visit('/'); // visits the baseUrl
cy.visit('index.html'); // visits the local file "index.html" if baseUrl is null
cy.visit('http://localhost:3000'); // specify full URL if baseUrl is null or the domain is different the baseUrl
cy.visit({
  url: '/pages/hello.html',
  method: 'GET',
});
```

### 3-2. get

```js
cy.get('.list > li'); // Yield the <li>'s in .lis
```

### 3-3. invoke

```js
// ✅
cy.get('.input').invoke('val').should('eq', 'foo'); // Invoke the 'val' function
cy.get('.modal').invoke('show'); // Invoke the jQuery 'show' function
cy.wrap({ animate: fn }).invoke('animate'); // Invoke the 'animate' function
```

```js
// 🚫
cy.invoke('convert'); // Errors, cannot be chained off 'cy'
cy.wrap({ name: 'Jane' }).invoke('name'); // Errors, 'name' is not a function
cy.wrap({ animate: fn })
  .invoke('animate')
  .then(() => {}); // 'animate' will be called multiple times
```

### 3-4. should

```js
// ✅
cy.get('.error').should('be.empty'); // Assert that '.error' is empty
cy.contains('Login').should('be.visible'); // Assert that el is visible
cy.wrap({ foo: 'bar' }).its('foo').should('eq', 'bar'); // Assert the 'foo' property equals 'bar'
```

```js
// 🚫
cy.should('eq', '42'); // Should not be chained off 'cy'
```

### 3-5. click

```js
// ✅
cy.get('.btn').click(); // Click on button
cy.focused().click(); // Click on el with focus
cy.contains('Welcome').click(); // Click on first el containing 'Welcome'
```

```js
// 🚫
cy.click('.btn'); // Errors, cannot be chained off 'cy'
cy.window().click(); // Errors, 'window' does not yield DOM element
```

- 강의 실습에서 다룬 기본 API에 대해서만 정리했습니다.
- 더 많은 API에 대한 내용은 [Cypress API Docs](https://docs.cypress.io/api/table-of-contents) 에서 확인하실 수 있습니다.

<br />

## 4. Notes

### 4-1. 테스트의 종류

#### 4-1-1. 단위 테스트

- 모듈(함수/클래스) 단위의 테스트입니다.
- 실패했을 때 문제가 생긴 부분을 비교적 정확하게 파악할 수 있습니다.

#### 4-1-2. 통합 테스트

- 주로 단위 테스트보다 큰 범위의 테스트를 의미합니다.
- 개별 모듈(함수/클래스)이 연결되어 제대로 상호작용하는지 테스트합니다.
- 단위 테스트에 비해 작성이 어려워 실행 속도가 느릴 때가 많습니다.
- 단위 테스트에 비해 테스트가 실패했을 때 문제가 생긴 부분을 정확히 파악하기 어렵습니다.

#### 4-1-3. E2E 테스트

- 실제 사용자가 사용하는 것과 같은 조건에서 전체 시스템을 테스트합니다.
- API 서버, DB 등의 외부 서비스들을 모두 사용하여 통합된 시스템을 테스트합니다.
- E2E 테스트는 실제 사용자의 실행 환경과 거의 동일한 환경에서 테스트를 진행하기 때문에 실제 상황에서 발생할 수 있는 에러를 사전에 발견할 수 있습니다.
- 단위/통합 테스트에 비해 작성이 어렵고 실행 속도가 가장 느립니다.
- 문제가 생긴 부분을 정확히 파악하기가 가장 어렵습니다.

### 4-2. 테스트를 작성하는 이유

#### 4-2-1. 장점

- 사람이 수행해야 하는 반복된 테스트를 자동화할 수 있습니다.
- 사람이 수행하는 것보다 훨씬 빠르게 테스트할 수 있습니다.
- 사람이 수행하는 것보다 더 신뢰할 수 있습니다.

#### 4-2-2. 단점

- 감각적인 요소(시각, 청각) 등 사용자 경험과 관련된 문제를 찾아낼 수 없습니다.
- 실제 환경에서 벌어지는 다양한 상황(네트워크, 디바이스 관련)을 자동화하기 어렵습니다.

### 4-3. 개발자가 테스트를 작성해야 하는 이유

#### 4-3-1. 제품 품질

- 개발자는 작성한 프로그램의 퀄리티에 대한 책임이 있습니다.
- QA에 넘기기 전에 기본 요구사항을 모두 만족하는지에 대한 검증은 개발자가 해야 합니다.
- 자동화된 테스트를 작성해 두지 않으면, 어플리케이션이 복잡해질수록 테스트 비용이 증가합니다.
- QA와 커뮤니케이션 비용이 늘어나 업무 효율이 떨어지게 됩니다.

#### 4-3-2. 코드 품질

- 코드 품질을 위해서는 지속적인 리팩토링 등의 개선 작업이 필요합니다.
- 이 과정에서 기존에 잘 동작하던 프로그램을 망칠 수 있기 때문에 적극적으로 코드를 개선하지 않게 됩니다.
- 신뢰할 수 있는 자동화된 테스트가 있으면 적극적으로 코드를 개선할 수 있습니다.

### 4-4. 좋은 테스트

#### 4-4-1. 실행 속도가 빠른 테스트

- 빠른 피드백은 개발 속도를 향상해줍니다.
- 실행 속도가 너무 느리면 테스트를 자주 실행하지 않게 됩니다.

#### 4-4-2. 내부 구현을 변경해도 실패하지 않는 테스트

- 리팩토링할 때 테스트가 깨지면 오히려 코드 개선을 방해합니다.
- 자주 변하는 로직과 변하지 않는 로직을 구분하는 것이 필요합니다.

#### 4-4-3. 버그를 검출할 수 있는 테스트

- 소스 코드에 버그가 있어도 검출하지 못한다면 잘못된 테스트입니다.
- 테스트가 기대하는 결과를 구체적으로 명시하지 않으면 버그를 검출할 수 없습니다.

#### 4-4-4. 결과가 안정적인 테스트

- 특정 환경에서만 실패하거나, 실행할 때마다 결과가 달라지는 테스트는 신뢰할 수가 없습니다.
- 외부 환경의 영향을 최소화해서 동일한 결과를 최대한 보장할 수 있는 게 중요합니다.

#### 4-4-5. 의도가 명확한 테스트

- 사람이 읽기 좋은 코드를 작성해서 가독성이 좋아야 합니다.
- 테스트 코드를 보고 한 눈에 어떤 내용을 테스트하는지를 파악할 수 있어야 합니다.

### 4-5. 테스팅 ROI (투자 수익률)

#### 4-5-1. 테스트 코드 작성과 유지보수는 비용

- 불필요한 테스트나 잘못 짜인 테스트는 차라리 없는 게 낫습니다.

#### 4-5-2. 비용 대비 효과가 충분한지

- 테스트를 작성하는 비용에 비해 얻을 수 있는 효과가 더 큰 것이 중요합니다.
- 로직이 거의 없는 코드는 따로 테스트하지 않아도 됩니다.
- 테스트 범위에 대한 조절이 필요합니다.
  - 모든 모듈에 대한 단위 테스트는 비효율적입니다.
  - 모든 테스트 케이스를 E2E 테스트로만 검증하는 것도 비효율적입니다.

#### 4-5-3. 커버리지 100%를 목표로 하는 것은 비효율적

- 커버리지 100%를 목표로 하는 것은 비효율적입니다.
  - 복잡한 어플리케이션의 경우 적절한 선을 잘 찾는 것이 중요합니다.

#### 4-5-4. 테스팅 도구와 테스팅 방법론

- 테스팅 도구와 테스팅 방법론은 아직 성숙한 상태가 아닙니다.
  - 특정 방법론이나 도구에 집착하면 안 됩니다.
  - 발전하는 테스팅 도구들을 눈여겨볼 필요가 있습니다.

#### 4-5-5. 테스팅 전략의 중요성

- 좋은 테스트의 요소 중 여러 개를 동시에 만족하기는 어렵습니다.
  - 예) 테스트 단위가 작으면
    - 장점: 실행속도가 빠르고 엣지 케이스 검증이 쉬움
    - 단점: 작은 단위의 변화에도 깨짐, 모의 객체 사용이 늘어 버그 검출이 어려워짐
- 프로젝트의 특성에 따라 더 중요한 가치를 판단해서 전략을 세우는 것이 중요합니다.

<br />

## 5. Reference

- [Cypress](https://docs.cypress.io/guides/overview/why-cypress)
- [테스트를 작성(해야)하는 이유](https://blog.makerjun.com/6be3c000-ed6a-4ca3-a24c-f89a402aafff)
- [테스트의 종류](https://blog.makerjun.com/e77d88fd-e488-4dba-b859-d0da9aa957a4)
- [좋은 테스트에 대한 고민](https://blog.makerjun.com/cbe4e459-7eb4-4461-94f8-f885291d5a78)
