/* ───────── 06 투자정보 ───────── */
(function(){
  const {$,$$,esc,br,ext,arrow}=BC;
  const DART='https://dart.fss.or.kr', KIND='https://kind.krx.co.kr', RULE='https://www.bcwp.co.kr/ir/5';
  BC.menu({key:'ir',gnb:'ir',name:'투자정보',eyebrow:'INVESTOR RELATIONS',title:'투명한 정보로 신뢰를,\n꾸준한 혁신으로 가치를.',
    desc:'비씨월드의 경영 성과와 성장 방향을\n정확하고 투명하게 공유합니다.',hero:'ir-hero.jpg',
    items:[['ir-finance','재무정보'],['ir-disclosure','공시정보'],['ir-stock','주가정보'],['ir-reports','IR 자료'],['ir-shareholders','주주 정보'],['ir-contact','IR 문의']]});
  const shell=(route,label,body)=>BC.shell('ir',route,label,body);
  const sHead=(eb,t)=>`<div class="ir-shead"><p class="eyebrow">${esc(eb)}</p><h2 class="t-title">${esc(t)}</h2></div>`;
  const xlink=(label,href)=>`<a class="ir-ilink" href="${href}" target="_blank" rel="noopener">${esc(label)}  ${ext}</a>`;

  /* ── 06-1 재무정보 ── */
  const YEARS=['2021','2022','2023','2024','2025'];
  /* 요약 재무(천원) — 출처: 비씨월드제약 IR 요약재무정보(bcwp.co.kr/ir/3). 화면은 백만원(천원÷1,000 반올림) */
  const FIN_RAW=[{"매출액": [62079357, 72702522, 75110699, 74814338, 75799977], "영업이익": [-1533671, 1861671, 6365159, 1499910, 1996622], "당기순이익": [-2977751, 59776, 2892309, -3316348, -3142932], "자산총계": [179358374, 183050719, 184110789, 176312918, 176801275], "부채총계": [99711114, 105530836, 104241328, 100302537, 104299320], "자본총계": [79647260, 77519883, 79869461, 76010381, 72501955]},
    {"매출액": [60847744, 67361645, 68513614, 67338474, 67515917], "영업이익": [421355, 1213496, 3206841, -2206080, -3947846], "당기순이익": [-701013, 437189, 2361863, -5517457, -5514635], "자산총계": [153213644, 151204995, 155194669, 147420314, 149264754], "부채총계": [69945315, 69686630, 71857173, 70143006, 77992575], "자본총계": [83268329, 81518365, 83337496, 77277308, 71272179]}];
  const ITEMS=['매출액','영업이익','당기순이익','자산총계','부채총계','자본총계'];
  const mil=v=>Math.round(v/1000);
  const fmt=v=>(v<0?'−':'')+Math.abs(v).toLocaleString('ko-KR');
  /* 그래프 눈금(백만원): 기준별 값 범위에 맞춘 고정 눈금 */
  const SCALE=[{매출액:[0,80000,[0,40000,80000]],영업이익:[-2000,8000,[-2000,3000,8000]],당기순이익:[-4000,4000,[-4000,0,4000]]},
    {매출액:[0,80000,[0,40000,80000]],영업이익:[-4000,4000,[-4000,0,4000]],당기순이익:[-6000,6000,[-6000,0,6000]]}];
  function barChart(c){
    // Figma 336×264: 눈금 y 200(min)~44(max), 막대 x 67+53i 폭 24, 마지막 해 Navy
    const Y=v=>200-(v-c.min)/(c.max-c.min)*156, z=Y(0);
    const grid=c.ticks.map(t=>`<line x1="52" x2="318" y1="${Y(t)}" y2="${Y(t)}" class="g"/><text x="46" y="${Y(t)+4.5}" text-anchor="end" class="ax sm">${fmt(t)}</text>`).join('');
    const bars=c.v.map((v,i)=>{const x=67+53*i, y=Y(v), top=Math.min(y,z), h=Math.max(Math.abs(y-z),1), last=i===c.v.length-1;
      const ly=v>=0?top-8:top+h+15;
      return `<rect x="${x}" y="${top}" width="24" height="${h}" class="${last?'b on':'b'}"><title>${YEARS[i]} ${c.k} ${fmt(v)}백만원</title></rect>
        <text x="${x+12}" y="${ly}" text-anchor="middle" class="${last?'vl on':'vl'}">${fmt(v)}</text>
        <text x="${x+12}" y="241" text-anchor="middle" class="ax">${YEARS[i]}</text>`}).join('');
    return `<svg class="ir-bars" viewBox="0 0 336 264" role="img" aria-label="${esc(c.k)} 2021–2025년, 단위 백만원: ${c.v.map((v,i)=>YEARS[i]+' '+fmt(v)).join(', ')}">
      <text x="16" y="25" class="ax">백만원</text>${grid}<line x1="52" x2="318" y1="${z}" y2="${z}" class="zero"/>${bars}</svg>`;
  }
  function pFinance(){
    return shell('ir-finance','재무정보',
      `<div class="ir-col40"><div class="section-head ir-fin-head"><div class="left"><p class="eyebrow">FINANCIALS</p><h2 class="t-headline">재무정보</h2></div>
        <div class="seg gap8 ir-seg" role="tablist" aria-label="재무제표 기준">${['연결','별도'].map((t,i)=>`<button class="tab" role="tab" data-ir-fin="${i}" aria-selected="${!i}">${t}</button>`).join('')}</div></div>
       <div id="irFin" aria-live="polite"></div></div>`);
  }
  function finShow(i){
    $$('[data-ir-fin]').forEach((b,j)=>b.setAttribute('aria-selected',i===j));
    const R=FIN_RAW[i], basis=i?'별도':'연결', L=YEARS.length-1;
    const cards=['매출액','영업이익','당기순이익'].map(k=>{const sc=SCALE[i][k], v=R[k].map(mil);
      return `<div class="ir-fin-card"><div class="h"><p class="t-label c-navy80">${k}</p><p class="t-sub">${fmt(v[L])}<span class="t-label c-navy80"> 백만원</span></p></div>
          <div class="ir-chart">${barChart({k,v,min:sc[0],max:sc[1],ticks:sc[2]})}</div><p class="t-label c-navy80">${YEARS[L]}년 · ${basis} 기준</p></div>`}).join('');
    const table=`<div class="ir-table-wrap"><table class="ir-ftable"><caption class="ir-sr">${basis} 기준 요약 재무정보 2021–2025년, 단위 백만원</caption>
        <thead><tr><th scope="col">구분</th>${YEARS.map(y=>`<th scope="col">${y}</th>`).join('')}</tr></thead>
        <tbody>${ITEMS.map(k=>`<tr><th scope="row">${k}</th>${R[k].map((v,j)=>`<td class="${j===L?'on':''}${v<0?' neg':''}">${fmt(mil(v))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    $('#irFin').innerHTML=`<div class="fade ir-col40"><div class="ir-fin-row">${cards}</div>
        <div class="ir-col16 ir-fsum"><h3 class="t-sub">요약 재무정보 · ${basis}</h3>${table}
        <p class="t-label c-navy80">단위: 백만원 · 출처: 비씨월드제약 IR 요약재무정보</p></div></div>`;
  }

  /* ── 06-2 공시정보 ── */
  // [보고서명, 제출인, 접수일자, 비고] — Figma 그대로 (공시 유형 데이터 없음)
  const DISC=[
    ['반기보고서 (2026.06)','비씨월드제약','2026.08.13','XBRL'],
    ['주식등의대량보유상황보고서(일반)','홍성한','2026.08.04',''],
    ['분기보고서 (2026.03)','비씨월드제약','2026.05.13','XBRL'],
    ['주식등의대량보유상황보고서(일반)','홍성한','2026.05.07',''],
    ['[기재정정]주식등의대량보유상황보고서(일반)','홍성한','2026.04.14',''],
    ['임원 · 주요주주특정증권등소유상황보고서','홍성한','2026.04.01',''],
    ['임원 · 주요주주특정증권등소유상황보고서','홍영기','2026.04.01',''],
    ['임원 · 주요주주특정증권등소유상황보고서','이승철','2026.04.01',''],
    ['임원 · 주요주주특정증권등소유상황보고서','장태억','2026.04.01',''],
    ['독립이사의선임 · 해임또는중도퇴임에관한신고','비씨월드제약','2026.03.26',''],
    ['기업가치제고계획(자율공시)','비씨월드제약','2026.03.26','코'],
    ['정기주주총회결과','비씨월드제약','2026.03.26','코'],
    ['사업보고서 (2025.12)','비씨월드제약','2026.03.13','연'],
    ['감사보고서제출','비씨월드제약','2026.03.13','코'],
    ['주주총회소집공고','비씨월드제약','2026.03.11','']];
  const PERIODS=[['1개월',1],['6개월',6],['1년',12],['3년',36],['5년',60]];
  const TYPES=['전체 공시','정기공시','주요사항보고','지분공시','거래소공시'];
  const END='2026.10.08';
  let dState={p:2,t:0,pg:1};
  const calIc='<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="2.5" y="3.5" width="11" height="10" rx="1.5"/><path d="M2.5 6.5h11M5.5 2v3M10.5 2v3"/></svg>';
  const chkIc='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7"/></svg>';
  function startOf(months){const [y,m,d]=END.split('.').map(Number); const dt=new Date(y,m-1-months,d);
    return dt.getFullYear()+'.'+String(dt.getMonth()+1).padStart(2,'0')+'.'+String(dt.getDate()).padStart(2,'0');}
  function pDisclosure(){
    return shell('ir-disclosure','공시정보',
      `<div class="ir-col32">${sHead('DISCLOSURE','공시정보')}
       <div class="ir-search">
         <div class="ir-search-row">
           <div class="ir-fld w200"><p class="t-label c-navy80">공시대상회사</p><p class="t-sub ir-navy">비씨월드제약</p><p class="ir-code">KOSDAQ  ·  200780</p></div>
           <div class="ir-fld w400"><p class="t-label c-navy80">조회기간</p><div class="ir-dates">
             <span class="ir-date"><span id="irStart">${startOf(12)}</span>${calIc}</span><span class="t-label c-navy80">—</span><span class="ir-date"><span>${END}</span>${calIc}</span></div></div>
           <div class="ir-fld w400"><p class="t-label c-navy80">기간 선택</p><div class="ir-btns" role="group" aria-label="기간 선택">${PERIODS.map((p,i)=>`<button class="ir-opt w72" data-ir-per="${i}" aria-pressed="${i===2}">${p[0]}</button>`).join('')}</div></div>
         </div>
         <div class="ir-divider"></div>
         <div class="ir-type"><p class="t-label c-navy80 w84">공시 유형</p><div class="ir-btns" role="group" aria-label="공시 유형">${TYPES.map((t,i)=>`<button class="ir-opt" data-ir-type="${i}" aria-pressed="${!i}">${chkIc}${t}</button>`).join('')}</div></div>
       </div>
       <div class="ir-result"><p class="t-body-strong ir-navy" id="irCount"></p><p class="t-label">접수일자순  ·  15개씩 보기 <span class="ir-chev" aria-hidden="true">⌄</span></p></div>
       <div class="ir-table-wrap"><table class="ir-table"><thead><tr><th class="c-no">번호</th><th class="c-co">공시대상회사</th><th class="c-ti">보고서명</th><th class="c-by">제출인</th><th class="c-dt">접수일자</th><th class="c-nt">비고</th></tr></thead>
         <tbody id="irRows" aria-live="polite"></tbody></table></div>
       <div class="ir-foot"><p class="t-label">출처: 금융감독원 전자공시시스템(DART) · 첨부 공시정보 화면 기준</p>
         <div class="ir-pgrow"><div class="ir-pg" id="irPg"></div><p class="t-label-strong ir-navy" id="irPgInfo"></p></div>
         <div class="ir-dart"><a class="ir-ilink l16" href="${DART}" target="_blank" rel="noopener">전자공시시스템에서 전체 보기  ${ext}</a></div></div></div>`);
  }
  function discShow(){
    const per=PERIODS[dState.p], ty=dState.t, start=startOf(per[1]);
    $('#irStart').textContent=start;
    $$('[data-ir-per]').forEach((b,j)=>b.setAttribute('aria-pressed',j===dState.p));
    $$('[data-ir-type]').forEach((b,j)=>b.setAttribute('aria-pressed',j===dState.t));
    // 공시 유형 데이터가 없어 유형 필터(전체 외)는 빈 상태로 안내
    const list=ty?[]:DISC.filter(r=>r[2]>=start);
    const PERPG=15, total=list.length, pages=Math.max(1,Math.ceil(total/PERPG));
    dState.pg=Math.min(dState.pg,pages);
    $('#irCount').textContent=`공시자료  ${total}건`;
    let rows;
    if(!list.length) rows=`<tr class="ir-none"><td colspan="6">해당 조건의 공시가 없어요.</td></tr>`;
    else rows=list.slice((dState.pg-1)*PERPG,dState.pg*PERPG).map((r,i)=>`<tr><td class="c-no">${(dState.pg-1)*PERPG+i+1}</td><td class="c-co">비씨월드제약</td><td class="c-ti"><a href="${DART}" target="_blank" rel="noopener">${esc(r[0])}</a></td><td class="c-by">${esc(r[1])}</td><td class="c-dt">${r[2]}</td><td class="c-nt${r[3]==='XBRL'?' x':''}">${esc(r[3])}</td></tr>`).join('');
    $('#irRows').innerHTML=rows;
    const p=dState.pg;
    $('#irPg').innerHTML=`<button data-ir-pg="${p-1}" ${p===1?'disabled':''} aria-label="이전 페이지">‹</button>`+
      Array.from({length:pages},(_,i)=>`<button data-ir-pg="${i+1}" ${i+1===p?'aria-current="page"':''} aria-label="${i+1} 페이지">${i+1}</button>`).join('')+
      `<button data-ir-pg="${p+1}" ${p===pages?'disabled':''} aria-label="다음 페이지">›</button>`;
    $('#irPgInfo').textContent=total?`${p} / ${pages} 페이지 · 총 ${total}건`:'';
    $('#irPg').hidden=!total;
  }

  /* ── 06-3 주가정보 ── */
  // 20거래일 종가: Figma 「실제 종가 경로」 벡터 좌표에서 읽은 값 (1px = 1원)
  const CLOSE=[3030,3015,3020,3010,3040,3045,3045,3030,3020,2995,2965,3000,3010,3020,3000,3015,3000,3050,3055,3040];
  const XL=[[0,'9월 7일'],[4,'9월 11일'],[7,'9월 16일'],[10,'9월 21일'],[13,'9월 28일'],[16,'10월 1일'],[19,'10월 7일']];
  function lineChart(){
    const X=i=>85+50*i, Y=v=>250-(v-2900);
    const pts=CLOSE.map((v,i)=>X(i)+','+Y(v)).join(' ');
    const grid=[2900,2950,3000,3050,3100].map(t=>`<line x1="69" x2="1051" y1="${Y(t)}" y2="${Y(t)}" class="g"/><text x="24" y="${Y(t)+4.5}" class="ax">${t}</text>`).join('');
    const xl=XL.map(([i,l])=>`<text x="${X(i)}" y="283" text-anchor="middle" class="ax">${l}</text>`).join('');
    const hit=CLOSE.map((v,i)=>`<circle cx="${X(i)}" cy="${Y(v)}" r="9" class="hit"><title>종가 ${v.toLocaleString('ko-KR')}원</title></circle>`).join('');
    const L=CLOSE.length-1;
    return `<svg class="ir-line" viewBox="0 0 1120 316" role="img" aria-label="최근 1개월 일별 종가, 단위 원. 2026.09.07 ${CLOSE[0].toLocaleString('ko-KR')}원에서 2026.10.07 ${CLOSE[L].toLocaleString('ko-KR')}원">
      <text x="24" y="29" class="ax">원</text>${grid}
      <polygon points="${X(0)},250 ${pts} ${X(L)},250" class="area"/><polyline points="${pts}" class="ln"/>
      <circle cx="${X(L)}" cy="${Y(CLOSE[L])}" r="5" class="dot"/><text x="1050" y="114" class="ax on">3,040</text>${xl}${hit}</svg>`;
  }
  function pStock(){
    const card=(k,v,s)=>`<div class="ir-vcard"><p class="t-label c-navy80">${k}</p><p class="t-title ir-navy">${v}</p><p class="t-label c-navy80">${s}</p></div>`;
    return shell('ir-stock','주가정보',
      `<div class="ir-col32">${sHead('STOCK','주가정보')}
       <div class="ir-quote"><div class="ir-price"><p class="t-label-strong ir-navy ir-pre">비씨월드제약  ·  KOSDAQ 200780</p><p class="t-headline ir-navy">3,040 원</p>
           <p class="t-sub ir-navy ir-pre">▼ 15원  (−0.49%)</p><p class="t-label c-navy80">2026.10.07 장마감 기준</p></div>
         <div class="ir-kpi">${[['시가총액','324억 원'],['52주 최고','6,030원'],['52주 최저','2,795원']].map(k=>`<div><p class="t-label c-navy80">${k[0]}</p><p class="t-title ir-navy">${k[1]}</p></div>`).join('')}</div></div>
       <div class="ir-col16"><div class="ir-chart-head"><p class="t-sub ir-navy">최근 1개월 · 일별 종가</p><p class="t-label c-navy80">2026.09.07 — 2026.10.07</p></div>
         <div class="ir-chart">${lineChart()}</div>
         <div class="ir-vcards">${card('최근 거래일 거래량','약 4.25천 주','2026.10.07 기준')}${card('기간 평균 거래량','약 4.66천 주','20거래일 일평균')}${card('기간 최대 거래량','약 10.42천 주','2026.09.16')}</div></div>
       <p class="t-label c-navy80">출처: Investing.com 종가·거래량 / FnGuide 시가총액·52주 범위 · 거래량은 천 주 반올림 자료이며 평균은 20거래일 기준</p>
       <p class="t-label c-navy80">2026.10.07 기준의 조회 시세입니다.</p></div>`);
  }

  /* ── 06-4 IR 자료 ── */
  function pReports(){
    const files=['실적 발표 자료 (PDF)','IR Book 2019년 5월','비씨월드제약 기술분석보고서'];
    return shell('ir-reports','IR 자료',
      `<div class="ir-box">${sHead('IR MATERIALS','IR 자료')}
        <ul class="ir-files">
          <li><a class="ir-file" href="#about-news"><span class="t-body">1Q 순조로운 출발…영업이익 '흑자 전환'</span><span class="ir-ic ar" aria-hidden="true">→</span></a></li>
          ${files.map(f=>`<li><div class="ir-file static"><span class="t-body">${esc(f)}</span></div></li>`).join('')}
        </ul></div>`);
  }

  /* ── 06-5 주주 정보 ── */
  function pShareholders(){
    const SH=[['홍성한','2,158,612주','20.2%'],['홍영기','1,338,945주','12.6%'],['홍현주','572,260주','5.4%'],['자기주식','444,901주','4.2%'],['우리사주조합','18,449주','0.2%'],['기타','6,132,494주','57.4%']];
    const RULES=[['01  목적','공시 정확성과 적시성을 높이고 임직원의 내부자거래를 예방합니다.'],['02  관리 체계','공시책임자가 정보 검토·공개 여부 판단과 관리체계 운영을 총괄합니다.'],
      ['03  정보 보호','업무상 취득한 내부정보는 필요한 업무 범위에서만 사용하고 유출을 방지합니다.'],['04  공시 담당','담당자는 정보를 수집·검토하고 책임자에게 보고하며 공시 실무를 수행합니다.']];
    return shell('ir-shareholders','주주 정보',
      `<div class="ir-col32">${sHead('SHAREHOLDERS','주주 정보')}
       <p class="t-body c-navy80">주식과 지분 현황, 정보관리 원칙, 주주총회 및 배당 정보를 안내합니다.</p>
       <div class="ir-sh">
        <section class="ir-shc"><p class="t-label-strong ir-navy">01</p><h3 class="t-sub ir-navy">주식 개요 · 주주 구성</h3>
          <p class="t-label ir-pre">코스닥 200780\n상장일  2014.12.15\n액면가  200원\n발행 보통주  10,665,661주</p>
          <p class="t-body-strong ir-navy">주주 구성</p>
          ${SH.map(s=>`<div class="ir-holder"><span class="t-label">${s[0]}</span><span class="t-label">${s[1]}</span><span class="t-label-strong ir-navy">${s[2]}</span></div>`).join('')}
          <p class="t-label c-navy80">지분 기준: 2026.03.31<br>출처: 2026년 1분기보고서<br>비율은 보고서의 반올림 수치입니다.</p></section>
        <section class="ir-shc"><p class="t-label-strong ir-navy">02</p><h3 class="t-sub ir-navy">내부정보관리규정</h3>
          <p class="t-body-strong ir-navy">내부정보의 관리와 공개 원칙</p>
          ${RULES.map(r=>`<p class="t-label"><span class="ir-pre">${esc(r[0])}</span><br>${esc(r[1])}</p>`).join('')}
          ${xlink('내부정보관리규정 전문 보기',RULE)}
          <p class="t-label c-navy80">출처: 비씨월드제약 공식 홈페이지<br>bcwp.co.kr/ir/5<br>제1조·제4조·제5조·제6조 요약</p></section>
        <section class="ir-shc"><p class="t-label-strong ir-navy">03</p><h3 class="t-sub ir-navy">주주총회 · 배당 공지</h3>
          <p class="t-body-strong ir-navy">제46기 정기주주총회</p>
          <p class="t-label">2026.03.26 개최<br>2026.03.11 소집공고</p>
          <p class="t-label">주요 의결 사항<br>재무제표 및 연결재무제표 승인<br>정관 일부 변경<br>감사위원회 위원 사외이사 선임<br>이사 보수 한도 승인</p>
          <p class="t-body-strong ir-navy">2025 사업연도 배당</p>
          <p class="t-label ir-pre">주당 현금배당  100원\n주당 주식배당  0.1주\n현금배당총액  929백만 원</p>
          <div class="ir-links">${xlink('주주총회 결과 보기',KIND)}${xlink('배당 관련 공시 보기',DART)}</div>
          <p class="t-label c-navy80">출처: KRX 정기주주총회결과<br>2026년 1분기보고서 배당지표<br>차기 배당은 별도 공시 확인</p></section>
       </div>
       <div class="ir-src"><p class="t-label c-navy80">주식·지분·배당: 한국거래소 KIND 2026년 1분기보고서(2026.05.13 제출) · 주주총회결과(2026.03.26)</p>
         <p class="t-label c-navy80">내부정보관리규정: <a class="ir-url" href="${RULE}" target="_blank" rel="noopener">https://www.bcwp.co.kr/ir/5</a></p></div></div>`);
  }

  /* ── 06-6 IR 문의 ── */
  function pContact(){
    return shell('ir-contact','IR 문의',
      `<div class="cta-navy ir-cta"><div class="g"><p class="eyebrow c-line">CONTACT</p><p class="t-title">IR 문의</p>
          <p class="t-body c-line">투자 관련 문의를 남겨 주시면 담당자가 확인한 뒤 연락드립니다.</p></div>
        <a class="btn btn-l btn-on-dark" href="#contact-types">IR 문의하기 ${arrow}</a></div>`);
  }

  /* ── 페이지 등록 ── */
  const reg=(r,label,render,init)=>BC.page(r,{menu:'ir',lnb:r,label,render,init});
  reg('ir-finance','재무정보',pFinance,()=>finShow(0));
  reg('ir-disclosure','공시정보',pDisclosure,()=>{dState={p:2,t:0,pg:1};discShow()});
  reg('ir-stock','주가정보',pStock);
  reg('ir-reports','IR 자료',pReports);
  reg('ir-shareholders','주주 정보',pShareholders);
  reg('ir-contact','IR 문의',pContact);

  document.addEventListener('click',e=>{
    const t=e.target.closest('[data-ir-fin],[data-ir-per],[data-ir-type],[data-ir-pg]'); if(!t)return;
    const d=t.dataset;
    if(d.irFin)finShow(+d.irFin);
    else if(d.irPer){dState.p=+d.irPer;dState.pg=1;discShow()}
    else if(d.irType){dState.t=+d.irType;dState.pg=1;discShow()}
    else if(d.irPg&&!t.disabled){dState.pg=+d.irPg;discShow()}
  });
})();
