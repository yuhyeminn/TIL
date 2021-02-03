# 💣day0 (2021/00/00)

<br>

## ✨ 삽입정렬 (Insertion Sort)

<br>

`삽입정렬`은 **아직 정렬되지 않은 임의의 데이터를 이미 정렬된 부분의 적절한 위치에 삽입해 가며 정렬하는 방식의 정렬**이다. 정렬의 시작은 **두번째 요소부터 시작**되며, **현재 요소의 왼쪽은 이미 정렬된 상태**라고 보면 된다. 왼쪽 값이 현재 비교하려는 요소값보다 작을때까지 위치를 왼쪽으로 이동시킨다. 삽입정렬은 데이터가 거의 정렬된 상태일 때 가장 효율적이며, 시간복잡도는  $O(N^2)$이다. 

~~~java
public int[] insertionSort(int arr[]) {
		int temp = 0;
		int k = 0;
		for(int i=0;i<arr.length;i++) {
			k = i;
			for(int j=i-1; j >= 0; j--) {
	            if(arr[k] < arr[j]) {
	            	temp = arr[k];
	 				arr[k] = arr[j];
	 				arr[j] = temp;
	                k = j;
	            }
	        }
		}
		return arr;
	}
~~~



<br>

## ✨ Map과 Set

> https://hackersstudy.tistory.com/26

### Map

- 키(key)와 값(value)의 쌍으로 이루어진 데이터의 집합

- 순서 유지되지 않음

- 키는 중복을 허용하지 않으며, 값의 중복은 허용함

- Map의 구현 클래스

  - `HashMap` : Map 인터페이스를 구현하기 위해 해시테이블을 사용한 클래스

    ​				   중복을 허용하지 않고 순서를 보장하지 않음

    ​				   키와 값으로 null이 허용

  - `TreeMap` : 이진 검색트리 형태. 정렬된 순서로 데이터를 저장하므로 빠른 검색이 가능함

    ​				   저장 시 정렬하기 때문에 저장시간이 다소 오래 걸림

  - `HashTable` : HashMap 보다 느리지만 동기화가 지원됨

    ​					   키와 값으로 null이 허용되지 않음

  - `Properties` 

### Set

- 순서를 유지하지 않는 데이터의 집합
- 데이터의 중복을 허용하지 않음

- Set의 구현 클래스
  - `HashSet` : 가장 빠른 임의 접근 속도, 순서를 전혀 예측할 수 없음
  - `LinkedHashSet` : 추가된 순서 또는 가장 최근에 접근한 순서대로 접근 가능
  - `TreeSet` : 정렬된 순서대로 보관하며 정렬 방법을 지정할 수 있음



<br>

## ✨ 자바에서 데이터타입이 char type과 string type으로 나누어져있는 이유

> 

<br>

### char

- 한 문자를 담을 수 있는 기본 타입

### String

- 0개 이상의 문자열을 담을 수 있는 클래스
- 문자열을 읽을 수만 있고, 내용을 변경할 수 없음

<br>

## ✨ 객체지향 SOLID 원칙

> https://wkdtjsgur100.github.io/solid-principle/

<br>

### S : 단일 책임 원칙 (SRP, Single Responsibility Principle)

- 모든 클래스는 단 하나의 책임을 가진다.
  - 클래스를 수정할 이유가 오직 하나여야 한다

### O : 개방- 폐쇄 원칙 (OCP, Open Closed Principle) 

- 확장에 대해서는 개방되어야 하지만, 수정에 대해서는 폐쇄되어야 한다.

### L : 리스코프 치환 법칙 (LSP, Liskov Substitusion Principle)

- 자식 클래스는 언제나 자신의 부모클래스로 교체할 수 있다. 
  - 부모 클래스가 들어갈 자리에 자식 클래스를 넣어도 계획대로 잘 작동해야 한다
- 즉, 업캐스팅을 해도 아무런 문제가 없어야 한다.

### I : 인터페이스 분리 원칙 (ISP, Interface Segregation Principle)

- 클라이언트가 자신이 이용하지 않는 메서드에 의존하지 않아야 한다.
- 한 클래스는 자신이 사용하지 않는 인터페이스는 구현하지 말아야 한다. 하나의 일반적인 인터페이스보다 여러개의 구체적인 인터페이스가 낫다.
- 자신이 사용하지 않는 기능(인터페이스)에는 영향을 받지 말아야 한다

### D : 의존성 역전 법칙 (DIP, Dependency Inversion Principle)

- 상위 클래스는 하위 클래스에 의존해서는 안된다.

