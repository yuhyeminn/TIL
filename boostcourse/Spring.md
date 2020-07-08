



#### 컨테이너(Container)란?

* 컨테이너는 인스턴스의 생명주기를 관리함
* 생성된 인스턴스들에게 추가적인 기능을 제공함



#### IoC (Inversion of Control)

* inversion의 사전적 의미는 '도치', '역전'. 

  즉,  IoC를 제어의 역전이라고 함

* 개발자는 프로그램의 흐름을 제어하는 코드를 작성. 그런데 이 흐름의 제어를 개발자가 하는 것이 아닌 다른 프로그램이 제어하는 것을 IoC라고 말함



#### DI(Dependency Injection)

* 의존성 주입이란 뜻
* DI는 클래스 사이의 의존관계를 빈(Bean)설정 정보를 바탕으로 컨테이너가 자동으로 연결해주는 것



#### Spring에서 제공하는 IoC/DI 컨테이너

- BeanFactory : IoC/DI에 대한 기본 기능을 가지고 있음

- ApplicationContext : BeanFactory의 모든 기능을 포함하며, 일반적으로 BeanFactory보다 추천됨. 

  트랜잭션처리, AOP등에 대한 처리를 할 수 있음. 

  BeanPostProcessor, BeanFactoryPostProcessor등을 자동으로 등록하고, 국제화 처리, 어플리케이션 이벤트 등을 처리할 수 있음.

- BeanPostProcessor : 컨테이너의 기본로직을 오버라이딩하여 인스턴스화 와 의존성 처리 로직 등을 개발자가 원하는 대로 구현 할 수 있도록 함.
- BeanFactoryPostProcessor : 설정된 메타 데이터를 커스터마이징 할 수 있음.