# 💣day17 (2021/02/17)

<br>

## ✨ TCP/IP 4계층

>https://hahahoho5915.tistory.com/15
>
>https://velog.io/@jehjong/%EA%B0%9C%EB%B0%9C%EC%9E%90-%EC%9D%B8%ED%84%B0%EB%B7%B0-TCPIP-4%EA%B3%84%EC%B8%B5

<br>

TCP/IP 4계층은 OSI 참조 모델을 기반으로 상업적이고 실무적으로 이용될 수 있도록 단순화된 모형이다. 

![img](https://blog.kakaocdn.net/dn/UsHhS/btqxDupjJKW/VQsfvYLoKkWH1FEP2UNI71/img.png)

1. **네트워크 인터페이스 계층 (Network Interface Layer / Network Access Layer)**
   - 물리적인 주소로 MAC 주소를 사용함
   - LAN, 패킷망에 사용됨 ( 이더넷, 네트워크 카드 )
   - OSI 모델의 물리, 데이터 링크 계층에 해당함
2. **인터넷 계층 (Internet Layer)**
   - 네트워크상 최종 목적지까지 정확하게 연결되도록 연결성을 제공
   - 단말을 구분하기위해 논리적인 주소(Logical Address) IP를 할당
     - 출발지와 목적지의 논리적 주소가 담겨있는 IP datagram이라는 패킷으로 데이터를 변경
   - 라우팅 기능 담당
     - 직접 연결되어 있지 않은 네트워크끼리 데이터를 전송할 수 있게 됨
   - 프로토콜 - `IP`, `ARP`
   - OSI 모델의 네트워크 계층에 해당함
3. **전송 계층 (Transport Layer)**
   - 통신 노드간의 연결을 제어하고, 신뢰성 있는 데이터 전송을 담당함
   - 프로토콜 - `TCP`, `UDP`
   - OSI 모델의 전송 계층에 해당함
4. **응용 계층 (Application Layer)**
   - 개별 애플리케이션들의 구체적인 통신 서비스를 구현함
   - 프로토콜 - `HTTP`, `SMTP`, `FTP` 
   - OSI 모델의 세션, 표현, 응용 계층에 해당함

<br>

## ✨ TCP와 UDP의 차이

> https://velog.io/@hidaehyunlee/TCP-%EC%99%80-UDP-%EC%9D%98-%EC%B0%A8%EC%9D%B4
>
> https://mangkyu.tistory.com/15

<br>

 `TCP`와 `UDP`는 TCP/IP의 `전송계층`에서 사용되는 프로토콜이다. **전송계층은 IP에 의해 전달되는 패킷의 오류를 검사하고 재전송 요구 등의 제어를 담당**하는 계층이다. 신뢰성이 요구되는 애플리케이션에서는 TCP를 사용하고 간단한 데이터를 빠른 속도로 전송하고자 하는 애플리케이션에서는 UDP를 사용한다.

<br>

### TCP (Transmission Control Protocol)

- 신뢰성을 보장하는 연결지향형 프로토콜
  - 3-way handshaking 과정을 통해 연결을 설정
  - 4-way handshaking 과정을 통해 연결을 해제
- 흐름제어 (Flow control)
  - 데이터 처리 속도 조절
- 혼잡제어 (Congestion control)
  - 전송 패킷 개수 조절
- 높은 신뢰성을 보장함
- UDP 보다 느림
- 웹 HTTP 통신, 이메일, 파일전송에 사용됨
- 전이중(Full-Duplex), 점대점(Point to Point) 방식

<br>

### UDP (User Datagram Protocol)

- 비연결지향형 프로토콜
  - 정보를 주고받을 때 신호절차를 거치지 않음
- UDP 헤더의 CheckSum 필드를 통해 최소한의 오류만 검출함
- 신뢰성이 낮음
- 연속성이 중요 - 실시간 서비스(streaming)에 자주 사용됨
- TCP 보다 속도가 빠름

<br>

## ✨ TCP 헤더

> https://velog.io/@hidaehyunlee/TCP-%EC%99%80-UDP-%EC%9D%98-%EC%B0%A8%EC%9D%B4

<br>

![img](https://nesoy.github.io/assets/posts/20181010/1.png)

- **송신자의 포트 번호**
  - TCP로 연결되는 가상 회선 양단의 송수신 프로세스에 할당되는 포트 주소
- **시퀀스 번호 (Sequence Number)**
  - 송신자가 지정하는 순서 번호
  - 전송되는 바이트 수를 기준으로 증가함
  - SYN = 1 : 초기 시퀀스 번호가 됨. ACK 번호는 이 값에 1을 더한 값
  - SYN = 0 : 현재 세션의 이 세그먼트 데이터의 최초 바이트 값의 누적 시퀀스 번호
- **응답번호 (ACK Number)**
  - 수신 프로세스가 제대로 수신한 바이트의 수를 응답하기 위해 사용함
- **데이터 오프셋 (Data Offset)**
  - TCP 세그먼트의 시작 위치를 기준으로 데이터의 시작 위치를 표현 (TCP 헤더의 크기)
- **예약 필드 (Reserved)**
  - 사용을 하지 않지만 나중을 위한 예약 필드이며 0으로 채워줘야 함
- **제어 비트 (Flag Bit)**
  - SYN, ACK, FIN 등의 제어 번호
- **윈도우 크기 (Window)**
  - 수신 윈도우의 버퍼 크기를 지정할 때 사용함. 0이면 송신 프로세스의 전송 중지
- **체크섬 (Checksum)**
  - 세그먼트 데이터에 대한 오류 검출 용도
- **긴급 위치 (Urgent Pointer)**
  - 긴급 데이터를 처리하기 위함. URG 플래그 비트가 지정된 경우에만 유효



### 제어 비트 (Flag Bit)

| 종류    | 내용                                                         |
| ------- | ------------------------------------------------------------ |
| **URG** | 긴급 위치를 필드가 유효한지 설정                             |
| **ACK** | 응답 번호 필드가 유요한지 설정. <br />클라이언트가 보낸 최초의 SYN 패킷 이후에 전송되는 모든 패킷은 이 플래그가 설정되어야 함 |
| **PSH** | 수신 애플리케이션에 버퍼링된 데이터를 상위 계층에 즉시 전달할 때 설정 |
| **RST** | 연결의 리셋이나 유효하지 않은 세그먼트에 대한 응답용 비트    |
| **SYN** | 연결 설정 요구. 동기화 시퀀스 번호. <br />양쪽이 보낸 최초의 패킷에만 이 플래그가 설정되어 있어야 함 |
| **FIN** | 더 이상 전송할 데이터가 없을 때 연결 종료 의사 표시용        |

#### ** ACK 제어 비트

- ACK 는 송신측에 대하여 수신측에서 긍정 응답으로 보내지는 전송 제어용 캐릭터
- ACK 번호를 사용하여 패킷이 도착했는지 확인
  - 패킷이 제대로 도착하지 않았으면 재송신을 요구함

<br>

## ✨ 3-way handshake, 4-way handshake

> https://swiftymind.tistory.com/35
>
> https://gmlwjd9405.github.io/2018/09/19/tcp-connection.html

<br>

### 3-way handshake (TCP Connection)

TCP 통신을 이용하여 데이터를 전송하기 위해 네트워크 연결을 설정(Connection Establish) 하는 과정

<img src="https://gmlwjd9405.github.io/images/network/3-way-handshaking.png" alt="img" />

1. 클라이언트(이하 A) → 서버(이하 B) : `SYN`

   - 접속 요청 프로레스 A가 연결 요청 메시지 전송 (`SYN`)

     - SYN 플래그 비트를 1로 설정한 세그먼트

   - 포트 상태

     - B : LISTEN

     - A : CLOSED → SYN_SENT

2. B → A : `SYN + ACK`

   - 접속 요청을 받은 B가 요청을 수락했으며, A도 포트를 열어달라는 메시지 전송 (`SYN+ACK`)
     - ACK 필드를 `Sequence Number + 1`로 지정하고, SYN과 ACK 플래그 비트를 1로 설정한 세그먼트
   - 포트 상태
     - B : SYN_RECIVED
     - A : SYN_SENT

3. A → B :`ACK`

   - 마지막으로 A가 수락 확인을 보내 연결을 맺음
   - 전송할 데이터가 있다면 이 단계에서 데이터를 전송할 수 있음

   - 포트 상태
     - A : ESTABLISHED
     - B : SYN_RECIVED → ESTABLISHED



### 4-way handshake (TCP Disconnection)

TCP의 연결을 해제(Connection Termination) 하는 과정

![img](https://gmlwjd9405.github.io/images/network/4-way-handshaking.png)

1. **A → `FIN` →B  **

   - A가 연결을 종료하겠다는 FIN 플래그 전송함
   - 포트 상태
     - A : FIN-WAIT
     - B : ESTABLISHED

2. **B → `ACK` → A  **

   - B는 일단 확인 메시지를 보내고 자신의 통신이 끝날 때 까지 기다림(CLOSE WAIT)
     - 전송할 데이터가 남아있다면 이어서 계속 전송한다.

   - 포트 상태
     - A : FIN-WAIT
     - B : CLOSE-WAIT

3. **B → `FIN` → A ** 

   - B가 통신이 끝났으면 연결 종료 요청에 합의한다는 의미로 A에게 FIN 플래그를 전송함
   - 포트 상태
     - A : FIN-WAIT → TIME-WAIT 
     - B : CLOSE-WAIT → LAST-ACK

4. **A → `ACK` → B**

   - A는 확인했다는 메시지를 전송
   - 포트 상태
     - B : LAST-ACK → CLOSED
     - A : TIME-WAIT →→→→→→→→→ CLOSED
       - 서버에서 FIN패킷을 발송하기 전에 전송한 패킷이 라우팅 지연이나 패킷 유실로 인한 재전송 등으로 FIN패킷보다 늦게 도착하는 상황이 발생할 수 있음
       - 클라이언트가 세션을 종료한 후, 뒤늦게 도착하는 패킷이 있다면 이 패킷은 드랍되고 데이터는 유실됨
       - 이런 현상에 대비하여 클라이언트는 서버로부터 FIN패킷을 수신하더라도 일정시간(디폴트 240초) 동안 세션(session)을 남겨놓고 잉여 패킷을 기다리는 과정을 거치는데, 이 과정을 `TIME-WAIT`라고 함