### 해싱(Hashing)



#### Hash Table

- 해쉬 테이블은 dynamic set을 구현하는 효과적인 방법의 하나
  - 적절한 가정하에서 평균 탐색, 삽입, 삭제 시간 $O(1)$
  - 보통 최악의 경우 $\theta(n)$



* Hash Table

  - 하나의 배열이라고 생각하면 됨

  - 해쉬 함수 h를 사용하여 키 T[h(k)]에 저장.

  - h : U → {0, 1, ..., m-1} 

    m은 테이블의 크기, U는 모든 가능한 키들의 집합

  - 키 k 가 h(k)로 해슁되었다고 말함

     → 각 키에 대한 해쉬함수 값을 그 키를 저장할 배열 인덱스로 사용



* 해쉬함수의 예

  - 모든 키들을 자연수라고 가정.

  - h(k) = k % m 

    → key를 하나의 자연수로 해석한 후 테이블의 크기 m으로 나눈 나머지



* 충돌
  - 두 개 이상의 키가 동일한 위치로 해슁되는 경우
  - 일반적으로 |U|>>m 이므로 항상 발생 가능
  - |K|>m일 경우 당연히 발생함
  - 충돌 해결 방법 : chaining과 open addressing



#### Chaning

> 동일한 장소로 해슁된 모든 키들을 하나의 연결리스트로 저장하는 충돌 해결방법

- **키의 삽입(Insertion)**

  - 키 k를 리스트 T[h(k)]의 맨 앞에 삽입 : 시간복잡도 $O(1)$

  - 중복된 키가 들어올 수 있고 중복저장이 허용되지 않는다면 삽입 시 리스트를 검색해야 함.

    따라서 *시간 복잡도는 리스트 길이에 비례*

- **키의 검색(Search)**

  - 리스트 T[h(k)]에서 순차검색
  - 시간복잡도는 키가 저장된 리스트의 길이에 비례

- **키의 삭제(Delete)**

  - 리스트 T[h(k)]로부터 키를 검색 후에 삭제
  - 일단 키를 검색해서 찾은 후에는 $O(1)$시간에 삭제 가능

* **최악의 경우**는 모든 키가 하나의 슬롯으로 해슁되는 경우

  ​	→ 길이가 n인 하나의 연결리스트가 만들어짐

  ​	→ 탐색시간은 $\theta(n)$+해쉬함수 계산시간

  평균시간복잡도는 키들이 여러 슬롯에 얼마나 잘 분배되느냐에 의해서 결정됨



#### SUHA(Simple Uniform Hashing Assumption)

> 각각의 키가 모든 슬롯들에 균등한 확률로 독립적으로 해슁된다는 가정
>
> - 성능분석을 위해 주로 하는 가정.
> - hash함수는 deterministic하므로 현실에서는 불가능함.

* Loard factor  $\alpha = n/m$
  - n : 테이블에 저장될 키의 개수
  - m : 해쉬테이블의 크기, 즉 연결리스트의 개수
  - 각 슬롯에 저장된 키의 평균 개수
* 연결 리스트 $T[j]$의 길이를 $ n_j $이라고 하면 $E[n_j] = \alpha$
* 만약 $n=O(m)$이면 평균검색시간은  $O(1)$



#### Open Addressing

> 모든 키를 해쉬테이블 자체에 저장함
>
> 테이블의 각 칸(slot)에는 1개의 키만 저장
>
> * Linear probing
> * Quadratic probing
> * Double hashing

##### Linear probing

- $h(k), h(k)+1, ... $순서대로 검사하여 처음으로 빈 슬롯에 저장함 

  → 이미 슬롯이 차있을 경우 그 다음 빈슬롯에 저장

- 테이블의 끝에 도달하면 다시 처음으로 circular하게 돌아감

- 단점

  - primary cluster : 키에 의해서 채워진 연속된 슬롯들을 의미함

    이런 cluster가 생성되면 이 cluster는 점점 더 커지는 경향이 생김



##### Quadratic probing

- 충돌 발생 시 $h(k), h(k)+1^2, h(k)+2^2...$ 순서로 저장 시도



##### Double hashing

- 서로 다른 두 해쉬함수 $h_1$과 $h_2$를 이용하여

  ​	$h(k,i) = (h_1(k) + ih_2(k)) \mod m$



#### 좋은 해쉬 함수

- 현실에서는 키들이 랜덤하지 않음
- 만약 키들의 통계적 분포에 대해 알고 있다면 이를 이용해서 해쉬 함수를 고안하는 것이 가능하겠지만 현실적으로 어려움
- 키들이 어떤 특정한 패턴을 가지더라도 해쉬함수값이 불규칙적이 되도록 하는게 바람직함
  - 해쉬함수값이 키의 특정 부분에 의해서만 결정되지 않아야 함.



#### Division 기법

- $ h(k) = k \mod m$

- 장점 : 한번의 mod연산으로 계산하기 때문에 빠름

- 단점 : 어떤 m값에 대해서는 해쉬 함수값이 키값의 특정 부분에 의해서 결정되는 경우가 있음.

  ​		   가령 $m=2^p$이면 키의 하위 p비트가 해쉬 함수값이 됨.



#### Multiplication 기법

- 0에서 1사이의 상수 A를 선택

- $k_A$의 소수부분만을 택한다.

- 소수 부분에 m을 곱한 후 소수점 아래를 버림

- 예 : m = 8, word size = w = 5, k = 21

  A = 13/32 를 선택

  kA = 21 * 13/32 = 273/32 = 8 + 17/32

  m (kA mod 1) = 8 * 17/32 = 17/4 = 4.~

  즉, h(21) = 4



#### Hash code in JAVA

- Java의 Object 클래스는 hashCode() 메소드 가짐. 따라서 모든 클래스는 hashCode()메소드를 상속받음. 

  이 메소드는 하나의 32비트 정수를 반환함

- x.equals(y)이면 x.hashCode() == y.hashCode() 임. 하지만 역은 성립하지않음.



#### hashCode와 hash함수

- hash code : $-2^{31}$에서 $2^{31}$사이의 정수

- hash 함수 : 0에서 M-1까지의 정수 (배열 인덱스)

  private int hash(Key key)

  {

  ​	return (key.hashCode() & 0x7fffffff) % M; 

  }



#### HashMap in Java

- TreeMap 과 유사한 인터페이스 제공
- 하나의 배열을 해쉬 테이블로 사용함
- chaining으로 충돌 해결
- load factor 지정할 수 있음( 0~1 사이 실수)
- 저장된 키의 개수가 load factor를 초과하면 더 큰 배열을 할당하고 저장된 키들을 재배치(re-hashing)