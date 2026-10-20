# 비씨월드제약 국문 홈 — 퍼블리싱 시안

- `index.html` 하나에 HTML·CSS·JS가 모두 들어 있습니다. 브라우저로 바로 열면 됩니다.
- 서체: Pretendard (jsDelivr CDN), 연결이 안 되면 Noto Sans KR로 대체됩니다.
- 이미지: `assets/README.md`의 파일명대로 넣으세요.
- 기준 폭 1440. 1280 / 1100 / 1024 / 720에서 여백·열 수만 줄입니다 (모바일 전용 설계 아님).
- 동작: GNB 메가메뉴(호버·클릭·Esc), 메인 비주얼 5초 자동 넘김·정지, 인터뷰 카드 덱, 기술 카드 진행 막대.
- 링크: 하위 페이지는 아직 없어 `#`입니다. 채용·DART만 실제 주소(새 창).

## 페이지 구조 (2026.10.19 전체 메뉴)
한 파일 안에서 주소 끝(#)으로 페이지를 바꿉니다. 전체 57개 화면.
| 메뉴 | 주소 |
|---|---|
| 홈 | #home |
| 사람과 문화 | #people-work · -talent · -jobs · -stories(-all) · -benefits · -culture · -gallery · -hiring · 인터뷰 팝업 #iv-01~13 |
| 회사소개 | #about-ceo · -mission · -values · -vision · -history · -healthcare · -news · -news-detail · -ci |
| 제품정보 | #product-find (상세 패널) · -safety · -changes · -changes-detail |
| 파트너십 | #partner-rnd · -dds(-1~4) · -pipeline · -plants · -cdmo · -lai · -licensing · -global · -inquiry · -inquiry-done |
| 투자정보 | #ir-finance · -disclosure · -stock · -reports · -shareholders · -contact |
| 지속가능경영 | #esg-promise · -quality · -ethics · -fairtrade · -report · -esg |
| 고객문의 | #contact-types · -ae · -quality · -product · -general · -recruit · -check · -info · -location |

## 수정 방법
src/ 의 파일을 고친 뒤 `python3 build.py` → index.html 이 다시 만들어집니다.
- base.html: GNB·메가메뉴·홈·푸터 / core.js: 공통(Page Hero·LNB·주소 이동)
- <메뉴>.js · <메뉴>.css: people · about · product · partner · ir · esg · contact
- data.js: 사람과 문화 문구(Figma 원문)
