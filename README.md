## 기능 구현 목록

#### 예외상황

- 사용자가 잘못된 값을 입력할 경우 "[ERROR]"로 시작하는 메시지와 함께 Error를 발생시키고 해당 메시지를 출력한 다음 해당 지점부터 다시 입력을 받는다.

영수증 출력 후 추가 구매를 진행할지 또는 종료할지를 선택할 수 있다.

#### 1. 구현에 필요한 상품 목록과 행사 목록을 파일 입출력을 통해 불러온다.

- public/products.md과 public/promotions.md 파일

#### 2. 현재 보유하고 있는 상품 출력

- "안녕하세요. W편의점입니다.", "현재 보유하고 있는 상품입니다." 메세지 출력 후 상품 출력

#### 3. 구매할 상품과 수량을 입력 받는다

- "구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])"
- 상품명, 수량은 하이픈(-)으로, 개별 상품은 대괄호([])로 묶어 쉼표(,)로 구분

##### 예외상황

- 공백 입력
- 입력이 형식을 지키지 않았을 때
- 상품 목록에 없는 상품 입력
- 재고보다 많은 수량 입력

#### 4. 프로모션 적용 가능 상품인지 확인

#### 5. 프로모션 적용이 안되는 일반 상품이라면 재고에서 차감

#### 6. 프로모션 적용이 되는 상품이라면 프로모션 행사 적용한 수 확인

- 2+1 일 때 3개를 가져오면 1개는 증정상품
- 1+1 일 때 2개를 가져오면 1개는 증정상품
- 2+1 일 때 10개를 가져오면 2x3개는 프로모션 상품 나머지 1x3개는 증정 상품 10에서 이 두개를 뺀 값은 프로모션 상품
- 2+1 일 때 11개를 가져오면 2x3개는 프로모션 상품 나머지 1x3개는 증정 상품 10에서 이 두개를 뺀 값 2는 프로모션 상품 -> 근데 2개 가져오면 프로모션 줘야 하니까 프로모션 혜택보다 덜 가져온 경우
- 수량 만큼 가져왔는지
- 수량을 많이 가져와서 프로모션 재고가 부족한디
- 프로모션 혜택보다 덜 가져왔는지

#### 7. 프로모션 수량만큼 가져왔다면 수량만큼 프로모션 재고에서 차감

#### 8. 프로모션 수량보다 많이 가져왔으면 일부 수량에 대해 정가로 결제할지 여부에 대한 안내 메시지를 출력한다.

- 현재 {상품명} {수량}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)
- Y이면 프로모션 수량에서 (프로모션수량+증정수량) 차감하고 구매 수량에서 (프로모션수량+증정수량을)을 뺀 만큼 일반 구매 할 수 있도록 한다
- N이면 입력수량에서 (프로모션수량+증정수량을)을 뺀 만큼을 프로모션 수량에서 차감

#### 9. 프로모션 혜택보다 덜 가져왔다면 혜택에 대한 안내 메시지를 출력

- 현재 {상품명}은(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)
- Y면 프로모션에서 1 차감
- N이면 그냥 입력된 수량만큼 차감

#### 10. 멤버십 할인 할인 여부 확인 받기

- 멤버십 할인을 받으시겠습니까? (Y/N)
- 멤버십 회원은 프로모션 미적용 금액의 30%를 할인받는다.
- 일반 구매 금액에서만 할인 받으면 되는듯
- 프로모션 적용 후 남은 금액에 대해 멤버십 할인을 적용한다.
- 멤버십 할인의 최대 한도는 8,000원이다.

#### 11. 구매 상품 내역, 증정 상품 내역, 금액 정보를 출력

#### 12. 추가 구매 여부를 확인하기 위해 안내 문구를 출력

- 감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)
