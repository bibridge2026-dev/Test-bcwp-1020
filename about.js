/* ───────── 03 회사소개 ───────── */
(function(){
  const {$,$$,esc,br,img,ext,arrow,head,tlink}=BC;
  BC.menu({key:'about',gnb:'about',name:'회사소개',
    eyebrow:'ABOUT US',title:'환자의 일상을 위한 혁신,\n비씨월드가 이어갑니다.',
    desc:'끊임없는 연구와 도전으로\n더 편안한 치료, 더 건강한 삶을 만들어갑니다.',hero:'company-hero.jpg',heroLink:'',
    items:[['about-ceo','CEO 인사말'],['about-mission','미션'],['about-values','핵심가치'],['about-vision','비전'],['about-history','걸어온 길'],
      ['about-healthcare','비씨월드헬스케어'],['about-news','비씨월드 뉴스'],['about-ci','CI 소개']]});
  const shell=(route,label,body,opt)=>BC.shell('about',route,label,body,opt);

  /* ── 03-1 CEO 인사말 ── */
  function pCeo(){
    return shell('about-ceo','CEO 인사말',
      `<div class="ab-ceo">${img('ceo.jpg','ab-ceo-ph','홍성한 대표이사')}
        <div class="ab-ceo-txt">
          <div class="g"><p class="eyebrow">CEO MESSAGE</p><h2 class="t-headline ab-navy">“환자의 더 나은 미래를 만들기 위해<br>진심을 다하겠습니다”</h2></div>
          <div class="ab-ceo-body t-body">
            <p>비씨월드제약은 바이오와 케미칼 분야에서 세계 최고가 되겠다는 의지로<br>연구개발과 좋은 품질의 의약품 공급에 힘쓰고 있습니다.</p>
            <p>임직원 모두가 인재경영, 도전, 협력, 책임, 정도라는 다섯 가지 핵심가치를 지키며 일합니다.<br>기본과 원칙을 지키고, 우리가 내린 결정과 행동에 항상 책임을 다하겠습니다.</p>
            <p>앞으로도 변함없는 관심과 응원 부탁드립니다.</p></div>
          <div class="ab-sign"><p class="t-label">비씨월드제약 대표이사</p><p class="t-sub">홍성한</p></div>
        </div></div>`);
  }

  /* ── 03-2 미션 ── */
  function pMission(){
    return shell('about-mission','미션',
      `<section class="ab-mission">${img('mission-bg.jpg','ab-mission-bg')}
        <div class="wrap ab-mission-in"><p class="eyebrow">MISSION</p>
          <p class="t-title ab-mission-t">환자의 더 나은 미래를 위해<br>진심을 다한다</p>
          <span class="ab-mission-gap" aria-hidden="true"></span>
          <p class="t-body">우리가 약을 만드는 이유이자, 모든 결정 앞에서 먼저 떠올리는 문장입니다.</p></div></section>`,
      {full:true,cls:'ab-flush'});
  }

  /* ── 03-3 핵심가치 ── */
  const VALUES=[
    ['01','인재경영','People First','사람의 성장이 곧 회사의 성장입니다.','구성원 한 사람 한 사람의\n역량과 가능성을 존중하며,\n지속적인 성장과 자기계발을\n지원합니다.'],
    ['02','도전','Challenging','더 나은 미래를 위해 도전합니다.','더 나은 미래를 위한\n도전 정신으로 최선의\n결과를 만들어 업계 내\n최고가 되고자 합니다.'],
    ['03','협력','Working Together','함께할 때 더 멀리 갑니다.','부서와 직급의 경계를 넘어\n서로의 전문성을 존중하고,\n하나의 목표를 향해\n함께 움직입니다.'],
    ['04','책임','Accountability','결정과 행동에 끝까지 책임집니다.','기본과 원칙을 지키고,\n우리가 내린 결정과 행동에\n항상 책임을 다합니다.'],
    ['05','정도','Integrity','바른 길이 가장 빠른 길입니다.','정도(Integrity)는\n우리의 핵심가치이자\n사업의 기본적인\n밑거름입니다.']];
  function pValues(){
    return shell('about-values','핵심가치',
      `<div class="ab-values-wrap">${head('Core Values','비씨월드제약의 핵심가치','대표이사부터 신입까지, 같은 다섯 가지 약속을 기준으로 결정하고 움직입니다.')}
       <div class="ab-values">${VALUES.map(v=>`<div class="ab-value"><div class="h"><p class="no">${v[0]}</p><p class="t-sub">${v[1]}</p><p class="en">${v[2]}</p></div>
         <div class="d"><p class="s">${v[3]}</p><p class="b">${br(v[4])}</p></div></div>`).join('')}</div></div>`);
  }

  /* ── 03-4 비전 ── */
  function pVision(){
    return shell('about-vision','비전',
      `<div class="ab-vision"><div class="g"><p class="eyebrow">VISION</p><h2 class="t-headline">2,000억<br>일하고 싶은 존경받는 기업</h2>
        <span class="ab-gap4" aria-hidden="true"></span><p class="t-body c-navy80">DDS 기술을 이끄는 존경받는 글로벌 헬스케어 그룹을 향해 나아갑니다.</p></div>
        ${img('vision.jpg','ab-vision-ph')}</div>`);
  }

  /* ── 03-5 걸어온 길 ── */
  const ERAS=[
    {label:'2012 ~ 현재 · 제2의 도약',fold:7,years:[
      ['2026',['독일 Grünenthal과 Qutenza 국내 독점 판매 계약','영국 Grena와 4SEAL 독점 공급 계약 (비씨월드헬스케어)','창립 20주년 기념식']],
      ['2025',['국내 최초 ARB 계열 구강붕해정 텔바로오디정 발매','중국 Huiyu Pharm과 제네릭 국내 독점 판매권 계약 (2건)','제이피바이오에 엔트레스토 제네릭 기술이전']],
      ['2024',['보건복지부 혁신형 제약기업 5차 재인증','독일 Grünenthal과 뉴신타 국내 독점 판매 계약','영국 Proveca와 Sialanar 독점 공급 계약 (비씨월드헬스케어)']],
      ['2023',['부패방지 경영시스템 ISO 37001 갱신','블루엠텍과 디지털 마케팅·유통 대행 계약','올어라운드닥터스와 디지털 치료기기·웰니스 앱 공동 개발 협약','미국 ReGelTec과 Hydrafil 공동개발·국내 독점판매권 계약 (비씨월드헬스케어)']],
      ['2022',['판교 사옥 준공','퍼스트 제네릭 테람핀에스정 허가']],
      ['2021',['국내 최초 로수바스타틴 구강붕해정 수바로오디정 허가','인재육성형 중소기업 선정']],
      ['2020',['수출 500만불탑 수상','가족친화 인증 (여성가족부)','KGMP 인증 취득 (비씨월드헬스케어)']],
      ['2019',['ISO 37001 부패방지 경영시스템 인증','약물함유 서방정 미립자 제조기술 유럽특허 등록']],
      ['2018',['약물함유 서방성 미립자 제조기술 유럽특허 등록','신규 리포좀 제조방법·장치기술 칠레특허 등록','KOTRA 의약품부문 수출선도기업 선정']],
      ['2017',['산업기술진흥유공자 산업포장 수상','원주기업도시 2공장 부지 매입']],
      ['2016',['중소기업혁신개발사업 선정 (중기청)','우수혁신형 제약기업 표창 수상 (보건복지부)','소재부품기술개발사업 선정 (산업통상자원부)','여주 글로벌 신공장 완공 (사용승인 취득)']],
      ['2015',['SEP Microsphere 라이선스 아웃 계약 체결 - Akorn(미국)','혁신형 제약기업 재인증 (보건복지부)']],
      ['2014',['한국거래소 코스닥시장 상장','홍성한 대표이사 자랑스런 중소기업인상 수상 (중소기업청)']],
      ['2013',['EU-GMP / cGMP 공장 착공']],
      ['2012',['수출 300만불탑 수상','대통령상 표창 수상 (벤처활성화 유공)','우수기술연구센터(ATC) 지정 (지식경제부)','혁신형 제약기업 인증 (보건복지부)','GRI(Global Research Institute) 설립']]]},
    {label:'2008 ~ 2011 · 혁신과 변화',years:[
      ['2011',['중소기업기술혁신개발사업 선정 (중기청)','IBK캐피탈 투자유치','보건의료연구개발사업 선정 (보건복지부)','여주공장 동결건조 제조시설 완공']],
      ['2010',['신약연구소(신림동) 설립','보건의료연구개발사업 선정 (보건복지부)']],
      ['2009',['한국산업은행 투자유치','벤처기업 확인서 취득']],
      ['2008',['중소기업청장 표창 (벤처부문)','유망중소기업 선정 (경기도)','서울연구소(양재동) 설립']]]},
    {label:'1999 ~ 2007 · R&D 중심으로',years:[
      ['2007',['(주)비씨월드제약으로 상호 변경','INNO-BIZ 인증 취득 (중소기업청)']],
      ['2006',['홍성한 대표이사 취임 (지분인수)']],
      ['1999',['중앙연구소(여주공장) 설립']]]}];
  let hist={e:0,open:false};
  function pHistory(){
    return shell('about-history','걸어온 길',
      `<div class="ab-hist">${head('HISTORY','걸어온 길','한 걸음씩 쌓아온 기록입니다.')}
        <div class="seg gap8" role="tablist" aria-label="연대">${ERAS.map((e,i)=>`<button class="tab" role="tab" data-ab-era="${i}" aria-selected="${!i}">${esc(e.label)}</button>`).join('')}</div>
        <div class="ab-hist-body"><div class="ab-hist-side">${img('history.jpg','ab-hist-ph')}<p class="t-headline" id="abYear" aria-live="polite"></p></div>
          <div class="ab-years" id="abYears"></div></div></div>`);
  }
  function histShow(){
    const e=ERAS[hist.e], list=e.fold&&!hist.open?e.years.slice(0,e.fold):e.years;
    $$('[data-ab-era]').forEach((b,i)=>b.setAttribute('aria-selected',i===hist.e));
    $('#abYears').innerHTML=`<div class="ab-years-in fade">${list.map(y=>`<div class="ab-year" data-y="${y[0]}"><p class="t-title">${y[0]}</p><ul>${y[1].map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div>`).join('')}
      ${e.fold?`<div class="ab-more"><button class="btn btn-m ab-btn-line" data-ab-more aria-expanded="${hist.open}">${hist.open?'접기':`이전 연도 더 보기 <span class="ic" aria-hidden="true">↓</span>`}</button></div>`:''}</div>`;
    $('#abYear').textContent=list[0][0];
  }
  function histYear(){
    const yEl=$('#abYear'); if(!yEl)return;
    const cards=$$('.ab-year'); let cur=cards[0];
    cards.forEach(c=>{if(c.getBoundingClientRect().top<=200)cur=c});
    if(cur&&yEl.textContent!==cur.dataset.y)yEl.textContent=cur.dataset.y;
  }
  addEventListener('scroll',histYear,{passive:true});

  /* ── 03-6 비씨월드헬스케어 ── */
  const HC_PHOTOS=['hc-carousel.jpg'];
  let hcI=0;
  function pHealthcare(){
    return shell('about-healthcare','비씨월드헬스케어',
      `<div class="ab-hc">${head('FAMILY COMPANY','비씨월드헬스케어','',`<a class="tlink" href="#" target="_blank" rel="noopener">비씨월드헬스케어 사이트 ${ext}</a>`)}
        <div class="ab-video">${img('hc-video.jpg')}<button class="ab-play" type="button" aria-label="비씨월드헬스케어 영상 재생">▶</button></div>
        <div class="ab-facility"><div class="g"><h3 class="t-title">글로벌 기준에<br>적합한 생산시설</h3>
          <ol class="ab-ol">
            <li><span>1.</span><p>PIC/s(의약품실사상호협력기구)에서<br>제시하는 제조 및 품질관리기준을 적용한 엄격한 품질경영시스템 운영</p></li>
            <li><span>2.</span><p>美cGMP, EU-GMP 등 글로벌 규정에 부합하는 생산 시설 및 GMP운영 구축</p></li>
            <li><span>3.</span><p>제제 및 생산공정 기술력, 엄격한 품질관리시스템을 통한 국내 CMO사업 및 수출을 선도</p></li></ol></div>
          <div class="ab-carousel" aria-roledescription="carousel" aria-label="생산시설 사진"><button class="icon-btn" data-ab-hc="-1" aria-label="이전 사진">‹</button>
            <div id="abHcPh">${img(HC_PHOTOS[0],'ab-hc-ph','생산시설')}</div><button class="icon-btn" data-ab-hc="1" aria-label="다음 사진">›</button></div></div></div>`);
  }
  function hcShow(d){ const n=HC_PHOTOS.length; hcI=(hcI+d+n)%n; $('#abHcPh').innerHTML=`<div class="fade">${img(HC_PHOTOS[hcI],'ab-hc-ph','생산시설')}</div>`; }

  /* ── 03-7 비씨월드 뉴스 ── */
  const IMP='중요';
  const P1=[['160','비씨월드제약, 임직원 칭찬 캠페인으로 여주 취약계층 지원','2026.09.28',IMP],['159',"비씨월드제약, 이상지질혈증 복합제 '스타피노정' 출시",'2026.09.22',IMP],
    ['158','비씨월드제약, AI·양자기술로 항생제 내성 신약 후보 발굴','2026.09.01'],['157',"비씨월드제약, '암바로오디정' 출시…순환기 구강붕해정 확대",'2026.08.03'],
    ['156','비씨월드제약, 미래 인재와 손잡다…약대생들 다양한 전략 제시','2026.07.30'],['155','이충우 시장, ㈜비씨월드제약 기업체 현장 방문','2026.07.28'],
    ['154','비씨월드제약, 창립 20주년 기념식 개최…"질적 성장의 시대를 향해"','2026.06.02'],['153',"비씨월드제약, P-CAB 위장질환 치료제 '보노바정' 허가",'2026.05.27'],
    ['152',"비씨월드제약, 1Q 순조로운 출발‥영업이익 '흑자 전환'",'2026.05.14'],['151',"비씨월드제약, 고혈압 치료제 '암바로오디정' 식약처 품목허가 획득",'2026.05.06']];
  const ALL2=[['150','비씨월드제약, 여주 공장 AED 설치…여주시에도 AED 기부','2026.04.17'],['149','비씨월드헬스케어, 英 그레나와 지혈용 의료기기 국내 공급 계약 체결','2026.04.06'],
    ['148',"비씨월드헬스케어, 소아 중증 침흘림 치료제 '시알라나액' 국내 공급 개시",'2026.03.23'],['147','구급의약품 젝스트 관련 안내 드립니다.','2026.03.20'],
    ['146',"비씨월드제약, 獨 그뤼넨탈과 '큐텐자' 국내 독점 공급 계약 체결",'2026.03.05'],['145','비씨월드제약, 서울대 약대 이주용 교수팀과 AI 기반 신약개발 협력','2026.01.13'],
    ['144','비씨월드제약, 시무식…"성장·효율·역량 강화로 도약"','2026.01.09'],['143','비씨월드제약, 주식·현금배당 병행…"10년간 꾸준히 주주가치 제고"','2025.12.12'],
    ['142','비씨월드제약, 마약류 오남용 예방 전사 교육…"사회적 책임 강화"','2025.11.24'],['141','"비씨월드제약 여주공장, 생산 기반 없는 바이오벤처와 협업 열려 있어"','2025.11.05']];
  const PRESS=[...P1.map((r,i)=>[String(159-i),r[1],r[2],r[3]]),
    ...ALL2.filter(r=>r[0]!=='147').map((r,i)=>[String(149-i),r[1],r[2]]),['140',"비씨월드헬스케어, '시알라나' 도입은 시작… 포트폴리오 확장",'2025.08.26']];
  const INHOUSE_DATE={"보건복지부 장관 표창": "2025.04.09", "멘토멘티프로그램": "2025.03.04", "즐겁고 건강한 조직문화": "2025.03.04", "하반기 응원 커피차 이벤트": "2024.08.07", "혁신형제약기업 5회 연속 재인증": "2024.07.22", "BBC 2기 출범식": "2024.07.22", "24년 5월 가족 초청행사": "2024.05.29", "신년콘서트 참석": "2024.03.29", "가족친화기업 재인증": "2024.03.29", "사회공헌활동(23년 11월)": "2023.12.21", "BBC 발족": "2023.12.21", "주식 및 복지포인트": "2023.11.10", "업무환경 향상을 위한 사내복지": "2023.11.10", "임직원 지원 프로그램": "2023.11.10", "가족초청행사": "2023.11.10", "비씨월드 최신 사내소식 게시판": "2023.11.10"};
  const INHOUSE=['보건복지부 장관 표창','멘토멘티프로그램','즐겁고 건강한 조직문화','하반기 응원 커피차 이벤트','혁신형제약기업 5회 연속 재인증','BBC 2기 출범식','24년 5월 가족 초청행사',
    '신년콘서트 참석','가족친화기업 재인증','사회공헌활동(23년 11월)','BBC 발족','주식 및 복지포인트','업무환경 향상을 위한 사내복지','임직원 지원 프로그램','가족초청행사','비씨월드 최신 사내소식 게시판']
    .map((t,i)=>[String(43-i),t,INHOUSE_DATE[t]]);
  const CATS=['전체','보도자료','알립니다','사내소식'];
  const BOARD=[[...P1,...ALL2],PRESS,[['1','구급의약품 젝스트 관련 안내 드립니다.','2026.03.20']],INHOUSE].map(rows=>({rows,total:rows.length,pages:Math.max(1,Math.ceil(rows.length/10))}));
  /* 대표 소식 캐러셀: 같은 소식 주제의 사진이 있는 보도자료만 */
  const FEATS=[
    {tag:'고정',date:'2026.09.22',title:"비씨월드제약, 이상지질혈증\n복합제 '스타피노정' 출시",img:'news-feature.jpg'},
    {tag:'중요',date:'2026.09.28',title:'비씨월드제약, 임직원 칭찬 캠페인으로\n여주 취약계층 지원',img:'hero-06.jpg'},
    {date:'2026.09.01',title:'비씨월드제약, AI·양자기술로\n항생제 내성 신약 후보 발굴',img:'hero-03.jpg'},
    {date:'2026.08.03',title:"비씨월드제약, '암바로오디정' 출시…\n순환기 구강붕해정 확대",img:'hero-04.jpg'},
    {date:'2026.06.02',title:'비씨월드제약, 창립 20주년 기념식 개최…\n"질적 성장의 시대를 향해"',img:'hero-05.jpg'}];
  let fc=0, fcT=null, fcHold=false;
  const fcReduce=()=>matchMedia('(prefers-reduced-motion:reduce)').matches;
  let nb={c:0,p:1,q:''};
  function pNews(){
    return shell('about-news','비씨월드 뉴스',
      `<div class="ab-news">
        <div class="section-head"><div class="left"><p class="eyebrow">NEWSROOM</p><h2 class="t-headline">뉴스룸</h2></div></div>
        <div class="ab-feat-wrap" id="abCar" aria-roledescription="carousel" aria-label="대표 소식">
          <div class="ab-car-view" id="abFeat" aria-live="polite">${FEATS.map((f,i)=>`<div class="ab-feat ab-slide" role="group" aria-roledescription="slide" aria-label="${i+1} / ${FEATS.length}">${img(f.img,'ab-feat-ph light')}
            <div class="txt"><div class="meta">${f.tag?`<span class="tag${f.tag==='중요'?' ab-strong':''}">${f.tag}</span>`:''}<span class="t-label c-navy80" style="white-space:pre">보도자료  ·  ${f.date}</span></div>
              <h3 class="t-title">${br(f.title)}</h3><a class="ab-more-link" href="#about-news-detail">자세히 보기 <span class="ar">→</span></a></div>
            <div class="nav"><button class="ab-sbtn" type="button" data-ab-feat="-1" aria-label="이전 소식">‹</button><button class="ab-sbtn" type="button" data-ab-feat="1" aria-label="다음 소식">›</button></div></div>`).join('')}</div>
          <div class="dots-row ab-dots">${FEATS.map((f,i)=>`<button type="button" class="ab-dot" data-ab-dot="${i}" aria-label="${i+1}번째 소식 보기"></button>`).join('')}</div></div>
        <div class="seg gap8" role="tablist" aria-label="뉴스 분류">${CATS.map((c,i)=>`<button class="tab" role="tab" data-ab-cat="${i}" aria-selected="${!i}">${c}</button>`).join('')}</div>
        <form class="ab-toolbar" id="abSearch" role="search"><p class="t-label c-navy80" id="abCount"></p>
          <div class="ab-tools"><label class="ab-select"><span class="sr">분류</span><select id="abCatSel">${CATS.map((c,i)=>`<option value="${i}">${c}</option>`).join('')}</select></label>
            <label class="ab-select"><span class="sr">정렬</span><select id="abSort"><option value="new">최신순</option></select></label>
            <label class="ab-input"><span class="sr">뉴스 제목 검색</span><input id="abQ" type="search" placeholder="뉴스 제목을 입력하세요" autocomplete="off"></label>
            <button class="btn btn-menu btn-primary" type="submit">검색</button></div></form>
        <div class="ab-table" id="abTable" aria-live="polite"></div>
        <div class="pager" id="abPager"></div></div>`);
  }
  function featShow(){
    const n=FEATS.length;
    $$('#abFeat .ab-slide').forEach((el,i)=>{
      const k=(i-fc+n)%n; el.dataset.k=k===n-1&&n>3?'prev':Math.min(k,3);
      const on=k===0; el.toggleAttribute('inert',!on); el.setAttribute('aria-hidden',!on);
    });
    $$('[data-ab-dot]').forEach((d,i)=>{d.classList.toggle('on',i===fc);d.setAttribute('aria-current',i===fc?'true':'false')});
  }
  function featGo(i){ fc=(i+FEATS.length)%FEATS.length; featShow(); }
  function featStop(){ clearInterval(fcT); fcT=null; }
  function featPlay(){
    featStop(); if(fcHold||fcReduce())return;
    fcT=setInterval(()=>{ if(!$('#abCar')){featStop();return} featGo(fc+1); },5000);
  }
  function featInit(){
    fc=0; fcHold=false; featShow(); featPlay();
    const c=$('#abCar'); if(!c)return;
    const hold=v=>{fcHold=v; v?featStop():featPlay()};
    c.addEventListener('mouseenter',()=>hold(true)); c.addEventListener('mouseleave',()=>{ if(!c.contains(document.activeElement))hold(false) });
    c.addEventListener('focusin',()=>hold(true)); c.addEventListener('focusout',e=>{ if(!c.contains(e.relatedTarget)&&!c.matches(':hover'))hold(false) });
  }
  const row=r=>`<a class="ab-tr" href="#about-news-detail"><span class="no">${r[0]}</span><span class="ti">${r[3]?`<span class="tag ab-strong">${r[3]}</span>`:''}<span class="tt">${esc(r[1])}</span></span><span class="dt">${r[2]}</span></a>`;
  function newsShow(){
    const B=BOARD[nb.c]; let list=B.rows, total=B.total, pages=B.pages;
    if(nb.q){ list=B.rows.filter(r=>r[1].toLowerCase().includes(nb.q.toLowerCase())); total=list.length; pages=Math.max(1,Math.ceil(total/10)); }
    nb.p=Math.min(Math.max(1,nb.p),pages);
    const slice=list.slice((nb.p-1)*10,nb.p*10);
    $$('[data-ab-cat]').forEach((b,i)=>b.setAttribute('aria-selected',i===nb.c)); $('#abCatSel').value=nb.c;
    $('#abCount').textContent=`총 ${total}건   |   현재 페이지 ${nb.p} / ${pages}`;
    $('#abTable').innerHTML=`<div class="ab-th"><span class="no">번호</span><span class="ti">제목</span><span class="dt">작성일</span></div>`+
      (slice.length?slice.map(row).join(''):`<p class="empty ab-empty">${nb.q?`‘${esc(nb.q)}’ 검색 결과가 없어요.`:'등록된 소식이 없어요.'}</p>`);
    const p=nb.p, s=Math.floor((p-1)/5)*5+1, e=Math.min(pages,s+4);
    const b=(lab,to,dis,cur,al)=>`<button type="button" ${dis?'disabled':''} ${cur?'aria-current="page"':''} data-ab-pg="${to}" aria-label="${al||lab+' 페이지'}">${lab}</button>`;
    let nums=''; for(let i=s;i<=e;i++)nums+=b(i,i,0,i===p);
    $('#abPager').innerHTML=b('«',1,p===1,0,'첫 페이지')+b('‹',p-1,p===1,0,'이전 페이지')+nums+b('›',p+1,p===pages,0,'다음 페이지')+b('»',pages,p===pages,0,'마지막 페이지');
  }

  /* ── 03-7-1 뉴스 상세 ── */
  const SRC='https://www.medipana.com';
  function pNewsDetail(){
    const tr=(k,t,d)=>`<a class="ab-tr pn" href="#about-news"><span class="no">${k}</span><span class="ti"><span class="tt">${esc(t)}</span></span><span class="dt">${d}</span></a>`;
    return shell('about-news','비씨월드 뉴스',
      `<div class="ab-detail">
        <div class="ab-dtop"><a class="tlink" href="#about-news"><span class="ar" style="transform:none">←</span> 뒤로가기</a><p class="t-label c-navy80">홈 / 회사소개 / 비씨월드 뉴스 / 보도자료</p></div>
        <header class="ab-dhead"><div class="tags"><span class="tag">보도자료</span><span class="tag">제품 출시</span></div>
          <h2 class="t-headline">비씨월드제약, '암바로오디정' 출시…<br>순환기 구강붕해정 확대</h2>
          <div class="row"><p class="t-label c-navy80" style="white-space:pre">2026.08.03  ·  보도자료  ·  출처 메디파나뉴스</p>
            <div class="acts"><button class="ab-sbtn" type="button" data-ab-copy aria-label="링크 복사">⧉</button><a class="icon-btn s" href="${SRC}" target="_blank" rel="noopener" aria-label="원문 보기 (새 창)">↗</a></div></div></header>
        <div class="ab-dbody"><article class="ab-art">${img('news-body.jpg','ab-art-ph')}
            <div class="ab-summary"><p>암로디핀 구강붕해정 2개 용량 출시</p><p>텔미사르탄·로수바스타틴 이어 세 번째 시리즈</p><p>연하곤란·고령 환자 복약 편의성 강화 기대</p></div>
            <div class="ab-paras t-body"><p>비씨월드제약이 암로디핀 성분의 구강붕해정 출시로 순환기 치료제 포트폴리오를 확대했다.</p>
              <p>비씨월드제약은 고혈압 치료제 '암바로오디정'을 이달 1일 출시했다고 3일 밝혔다.</p>
              <p>암바로오디정은 칼슘채널차단제(CCB) 계열인 암로디핀베실산염을 주성분으로 한 구강붕해정으로, 5mg과 10mg 두 가지 용량으로 출시된다. 회사는 기존 텔미사르탄 성분의 '텔바로오디정', 로수바스타틴 성분의 '수바로오디정'에 이어 이번 암바로오디정을 추가하면서 순환기 구강붕해정 제품군을 3종으로 확대했다.</p>
              <p>암바로오디정은 물 없이도 입안에서 녹여 복용할 수 있는 제형으로, 장기간 약물 복용이 필요한 고혈압 환자 가운데 고령자와 연하곤란 환자, 다약제 복용 환자의 복약 편의성을 높이는 데 초점을 맞췄다.</p>
              <p>출처 : 메디파나뉴스(${SRC})</p></div></article>
          <aside class="ab-aside"><p class="t-sub">관련 소식</p>
            <a href="#about-news"><span class="t-body">비씨월드제약, 고혈압 치료제<br>암바로오디정 식약처 품목허가 획득</span><span class="t-label c-navy80">2026.05.06</span></a>
            <a href="#about-news"><span class="t-body">비씨월드제약, 이상지질혈증 복합제 '스타피노정' 출시</span><span class="t-label c-navy80">2026.09.22</span></a></aside></div>
        <div class="ab-table pn"><div class="ab-th"><span class="no">구분</span><span class="ti">제목</span><span class="dt">작성일</span></div>
          ${tr('▲ 이전 소식','비씨월드제약, 미래 인재와 손잡다…약대생들 다양한 전략 제시','2026.07.30')}${tr('▼ 다음 소식','비씨월드제약, AI·양자기술로 항생제 내성 신약 후보 발굴','2026.09.01')}</div>
        <div class="ab-center"><a class="btn btn-l btn-primary" href="#about-news">목록</a></div></div>`,{cls:'ab-dpad'});
  }

  /* ── 03-8 CI 소개 ── */
  function pCi(){
    return shell('about-ci','CI 소개',
      `<div class="ab-ci">${head('CORPORATE IDENTITY','CI 소개','비씨월드제약의 얼굴입니다. 사용할 때는 정해진 비율과 여백을 지켜주세요.')}
        <div class="ab-stage"><img class="lg" src="assets/logo.png" alt="비씨월드제약 로고" onerror="this.classList.add('gone')"><div class="sm"><img src="assets/logo.png" alt="" onerror="this.classList.add('gone')"></div></div>
        <div class="ab-ci-row"><div class="ab-ci-card"><p class="t-sub ab-navy">심볼 의미</p><p class="t-body">생명과 기술, 미래를 연결하는 순환의 흐름을 형상화 하였습니다. 타원형의 형태로 생명의 유기적 연결과 확장, 글로벌 지향성을 표현하였으며, 블루 컬러로 바이오 산업의 지속가능한 혁신성과 끊임없는 진화, 미래 지향적인 BCWP의 비전을 담고있습니다.</p></div>
          <div class="ab-ci-card"><p class="t-sub ab-navy">전용 컬러</p><p class="t-body" style="white-space:pre-wrap">BCWP Deep Blue  ·  PANTONE 281 C  ·  #14276F
BCWP Gold  ·  PANTONE 872 C  ·  #B49759
BCWP Silver  ·  PANTONE 877 C  ·  #97999C</p>
            <div class="ab-sw"><span style="background:#14276F" title="BCWP Deep Blue"></span><span style="background:#B49759" title="BCWP Gold"></span><span style="background:#97999C" title="BCWP Silver"></span></div></div></div>
        <div class="ab-dl"><a class="btn btn-m ab-btn-line" href="assets/logo.png" download="bcwp-logo.png">PNG 파일 받기 <span class="ic" aria-hidden="true">↓</span></a></div></div>`);
  }

  /* ── 페이지 등록 ── */
  const reg=(r,label,render,init)=>BC.page(r,{menu:'about',label,render,init});
  reg('about-ceo','CEO 인사말',pCeo);
  reg('about-mission','미션',pMission);
  reg('about-values','핵심가치',pValues);
  reg('about-vision','비전',pVision);
  reg('about-history','걸어온 길',pHistory,()=>{hist={e:0,open:false};histShow()});
  reg('about-healthcare','비씨월드헬스케어',pHealthcare,()=>{hcI=0});
  reg('about-news','비씨월드 뉴스',pNews,()=>{nb={c:0,p:1,q:''};featInit();newsShow()});
  reg('about-news-detail','뉴스 상세',pNewsDetail);
  reg('about-ci','CI 소개',pCi);

  /* 위임 이벤트 */
  document.addEventListener('click',e=>{
    const t=e.target.closest('[data-ab-era],[data-ab-more],[data-ab-hc],[data-ab-cat],[data-ab-pg],[data-ab-copy],[data-ab-feat],[data-ab-dot]'); if(!t)return;
    const d=t.dataset;
    if(d.abEra!==undefined){hist={e:+d.abEra,open:false};histShow()}
    else if(d.abMore!==undefined){const was=hist.open;hist.open=!hist.open;histShow();if(was)$('.ab-hist .seg').scrollIntoView({behavior:'smooth',block:'center'})}
    else if(d.abHc)hcShow(+d.abHc);
    else if(d.abFeat){featGo(fc+ +d.abFeat);const nb2=$('#abFeat .ab-slide:not([inert]) [data-ab-feat="'+d.abFeat+'"]');nb2&&nb2.focus()}
    else if(d.abDot!==undefined)featGo(+d.abDot);
    else if(d.abCat!==undefined){nb.c=+d.abCat;nb.p=1;newsShow()}
    else if(d.abPg&&!t.disabled){nb.p=+d.abPg;newsShow();$('#abTable').scrollIntoView({behavior:'smooth',block:'start'})}
    else if(d.abCopy!==undefined){const done=()=>{t.textContent='✓';t.setAttribute('aria-label','링크 복사됨');setTimeout(()=>{t.textContent='⧉';t.setAttribute('aria-label','링크 복사')},1500)};
      try{navigator.clipboard.writeText(location.href).then(done,done)}catch(_){done()}}
  });
  document.addEventListener('submit',e=>{ if(e.target.id!=='abSearch')return; e.preventDefault(); nb.q=$('#abQ').value.trim(); nb.p=1; newsShow(); });
  document.addEventListener('change',e=>{
    if(e.target.id==='abCatSel'){nb.c=+e.target.value;nb.p=1;newsShow()}
  });
})();
