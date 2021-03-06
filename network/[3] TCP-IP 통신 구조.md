> 후쿠나가 유우지, 그림으로 배우는 네트워크 구조
>
> Chapter 3. TCP/IP 통신 구조

</br>

### 가변길이 서브넷 마스크

가변길이 서브넷 마스크는 서브넷별로 서브넷마스크의 길이를 다르게 할 수 있어 서브넷 별로 접속할 컴퓨터의 수를 유연하게 결정할 수 있다. 

`CIDR(Classless Inter-Domain Routing)`은 가변길이 서브넷 마스크를 기반으로 하는 기술로 기능의 관점에서 가변길이 서브넷 마스크와 매우 유사하지만 약간 다른 방식을 사용한다. `CIDR`이란, IP클래스와 무관하게 네트워크부를 짧다고 간주함으로써 여러 개의 네트워크로의 전송에 대해 한 개의 전송 규칙으로 맞출 수 있는 기술을 말한다. 또한 IP주소 등의 뒤에 "/"와 서브넷 마스크의 비트수를 쓰는 표기를 `CIDR 표기`라고 부른다.

</br>

---

</br>

### MAC 주소

`MAC 주소(Media Access Control Address)`는 이더넷 등의 네트워크 **하드웨어에 하나씩 할당되어 있는 주소**로, 원칙적으로는 다른 것과 중복되지 않는 유일한 값을 가지며 `물리주소`라고 불리기도 한다.  이더넷의 MAC주소는 00~FF까지의 십육진수로 표시된 여섯 개의 값을 -(하이픈) 또는 : (콜론)으로 구분해서 표시한다. 이 중 초기 세 개 값이 제조사를 나타내는 벤더 ID, 네 번째 값이 제품 기종을 나타내는 기종 ID, 끝의 값 두 개가 시리얼 번호를 나타내는 시리얼 ID로 사용되는 것이 일반적이다.

- 과거 이더넷 MAC 주소의 사용법
  - 전체에게 동일한 데이터를 보내고, MAC 주소가 자신 앞으로 돼있는 경우에만 수신
  - 그렇지 않으면 무시하는 구조로 데이터를 처리한다
- 현재 이더넷 MAC 주소 사용법
  - 어떤 포트에 어떤 MAC 주소의 기기가 연결되어 있는지 기억해두고 해당 기기에게만 데이터를 보냄

</br>

---

</br>

### ARP (Address Resolution Protocol)

이더넷 하드웨어끼리는 MAC 주소에 의해 통신 대상을 지정하지만, TCP/IP 통신에서는 대상을 지정하는 데 IP주소를 사용한다. 즉 양측에 대응하는 구조가 필요하며 **IP주소에서 MAC 주소를 알아내기 위해 `ARP`를 이용한다.** 

IP 패킷을 상대에게 보내기 위해 컴퓨터는 IP 주소 내의 네트워크 주소를 보고 전송처를 결정하는데, 네트워크 주소가 동일하면 물리적으로 연결된 네트워크라고 판단하여 컴퓨터는 IP주소에서 MAC 주소를 도출하는 동작을 수행한다. 또 대상이 다른 네트워크에 있는 경우에는 그 IP패킷을 다음 라우터로 넘겨야하는데, 이 때 라우터의 IP주소에서 MAC 주소를 얻어야 할 필요가있다. 이 IP주소에서 MAC 주소를 얻기위한 동작에 ARP가 사용된다.

- ARP 동작개요
  1. 알고자 하는 IP주소를 포함한 `ARP 요청`을 브로드캐스트함
  2. 해당 IP주소를 사용하는 컴퓨터는 자신의 MAC 주소를 되돌려보냄 -> `ARP 응답`
  3. `ARP 응답`이 되돌아오면 그 송신처의 MAC 주소를 알 수 있음

</br>

---

</br>

### 도메인명

`도메인명`이란 숫자의 나열에 불과해 기억하기 어려운 IP주소를 인간이 다룰 수 있는 범위에 맞춘 네트워크 상의 컴퓨터 명칭을 말한다. 인터넷 도메인명은 전세계에서 유일하도록 관리되고 있다.

최상위 도메인(TLD : Top Level Domain) 은 `ICANN`이 관리하고 있으며, 분야별(gTLD)-국가별(ccTLD) TLD는 각각 위임된 조직이 관리한다. 예를들어 `.kr`은 한국인터넷진흥원에서 관리하고 있다.

</br>

---

</br>

## 라우팅(Routing)

**라우터로 패킷을 전송하는 것**을 **`라우팅(routing)`**이라고 한다. 라우팅은 무엇을 어디로 전송하면 될지 결정하는 전송규칙에 따라 수행되며, 그 전송 규칙을 결정하는데 있어 중요한 요소가 `라우팅 테이블(routing table)`이다. 라우팅 테이블에는 `수신처의 네트워크`와 `그 네트워크에 대한 발송방법`이 등록되어 있다.

라우터는 패킷을 받으면 그 수신처로 표시 돼 있는 IP주소에 서브넷마스크를 적용해서 네트워크 주소를 추출한다. 그리고 라우팅 테이블에서 그 네트워크에 관한 규칙을 찾아, 규칙에 따라 전송한다. 전송 처리를 여러 대의 라우터가 반복함으로써 패킷은 목적지인 컴퓨터까지 도달하게 된다.

<br>

### 기본 게이트웨이

`기본 게이트웨이`란 자신이 소속된 네트워크 이외에 보내려는 패킷에 대해 어디로 보내면 좋을지 정보를 갖고 있지 않는 때의 전송처이다. 즉 **보낼 곳을 모르는 때에 전송해두는 곳** 이라고 말할 수 있다. PC의 관점에서 보면 패킷의 라우팅은 전부 라우터가 하는 것이므로 **일반적으로 기본 게이트웨이로 네트워크의 입출입 역할을 하는 라우터를 설정한다.**

</br>

### 정적 라우팅(Static Routing)

수동으로 수정하는 때 이외에는 보통 고정된 라우팅 테이블을 사용해서 라우팅을 하는 형태를 `정적 라우팅`이라고 한다. 정적 라우팅은 네트워크 전체의 규모가 아주 작을 때나 구성 변경이 그다지 없는 경우에 간단히 쓰는 방법이다. 그렇지 않은 경우에는 네트워크 변경에 따른 영향을 받은 라우터를 찾아내서 필요한 전송 규칙을 오류나 누락 없이 등록할 필요가 있다.

</br>

### 동적 라우팅 (Dynamic Routing)

`동적 라우팅`은 네트워크의 접속 라우터에 관한 정보를 라우터끼리 정기적 또는 필요에 따라 서로 교환하여 그 정보를 기반으로 라우팅 테이블을 자동 관리하는 것이다. 예를 들어, 신규 네트워크가 연결되면 해당 라우터가 인접해있는 라우터로 정보를 전달하고, 수신한 라우터는 필요에 따라 그 신규 라우터의 정보를 자신의 인접 라우터로 전달한다. 이와 같은 방식으로 새로 연결된 네트워크의 정보를 자동으로 확산시키고 각 라우터가 필요한 규칙을 라우팅 테이블에 설정한다.

</br>

### 라우팅 프로토콜

라우팅 테이블을 동적으로 갱신하는 동적 라우팅에서 사용하는 프로토콜을 `라우팅 프로토콜`이라고 한다. 라우팅 프로토콜은 라우터끼리 경로 정보를 교환하고, 수집한 경로 정보에서 최적 경로를 골라내는 형태로 동작된다. 라우팅 프로토콜을 크게 나눠서 `IGP(Interior Gateway Protocl)`와 `EGP(Exterior Gateway Protocol)`가 있다. 한 개의 ISP 또는 한 대기업이 담당하는 대규모 네트워크를 `AS(Autonomous System)`라고 부르는데, **IGP는 AS내의 라우팅, EGP는 AS간의 라우팅**에 이용한다.

- **IGP (Interior Gateway Protocl)**
  - AS 내의 경로 정보를 주고받기 위해 이용
  - `RIP/RIP2 (Routing Information Protocol)`
    - 소규모 네트워크에 이용. 구입이나 운영이 간단함
    - 변경을 반영하는 데 시간이 걸림. 경로를 선택할 때 통신 속도 등이 고려되지 않음
  - `OSPF (Open Shortest Path First)`
    - 중규모 이상의 네트워크에 사용됨
    - 구입이나 운영에 걸리는 공수가 늘어남. 저렴한 기기로는 대응할 수 없음
- **EGP (Exterior Gateway Protocol)**
  - AS끼리 경로 정보를 주고받는 데 사용
  - `BGP (Border Gateway Protocol)`
    - 도중에 통과하는 AS의 일람을 비롯한 몇가지 정보를 기반으로 해서 어떤 네트워크를 따라 다다르기까지 최적의 경로를 선택함

</br>

---

### DHCP 서버

`DHCP (Dynamic Host Configuration Protocol)`는 네트워크에 접속되어 있는 컴퓨터에 대해 필요한 네트워크 설정 정보를 자동으로 배포하기 위한 구조이다. 이를 사용하기 위해선 컴퓨터에 DHCP 클라이언트 기능이 탑재되고, 네트워크에 DHCP 서버가 설치되어 있어야 한다. DHCP로 설정할 수 있는 주요 정보로는 **컴퓨터의 IP주소, 서브넷마스크, DNS 서버의 IP주소**등이 있으며 컴퓨터가 네트워크에 접속하는 데 필요한 정보는 대부분 들어가 있다. 

#### DHCP 동작의 흐름

1. DHCP 디스커버 메시지를 브로드캐스트해서 할당 가능한 주소를 요청한다.
2. DHCP 오퍼 메시지로 설정 정보의 후보를 반송한다.
3. DHCP 요청을 브로드캐스트해서 표시된 후보를 사용한다는 사실을 전달한다.
4. DHCP Ack 메시지로 설정 후보를 사용해도 좋다고 승낙했다는 사실을 알린다.

</br>

---

</br>

### NAT와 NAPT

인터넷에 접속한 컴퓨터는 자기 자신을 나타내는 IP주소로 전 세계에서 유일한 프로토콜 IP주소를 사용해야 한다. 이와 같은 경우에서는 `주소 변환`이라는 방법을 이용해서 인터넷과 통신할 수 있도록 해야하며 크게 `NAT`와 `NAPT`라는 방법이 있다.

- NAT ( Network Address Translation )
  - 몇 개의 전역 IP주소를 라우터에 할당해두고 LAN 내의 컴퓨터가 인터넷에 접속할 때에 이 중 하나를 이용해서 통신하는 방법
  - 사설 IP주소와 라우터가 풀(pool)로 보유하고 있는 전역 IP주소를 1:1로 대응시킴
  - 전역 IP주소를 전부 사용하면 그 이상으로는 연결할 수 없음
  - 인터넷에 동시에 접속할 수 있는 컴퓨터의 대수는 라우터가 갖고있는 전역 IP주소의 수로 제한됨
- NAPT ( Network Address Port Translation)
  - IP주소의 변환과 동시에 포트 번호도 변환하는 것으로 한 개의 전역 IP주소를 여러 대의 컴퓨터에서 공용으로 사용할 수 있도록 하는 기술
  - 포트 번호를 이용해서 여러개의 사설 IP주소와 한 개의 전역 IP주소를 대응시킴
  - 자신의 IP 주소와 포트 번호의 조합을 라우터의 전역 IP주소와 라우터가 관리하는 포트번호의 조합으로 변환함