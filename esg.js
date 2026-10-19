/* ───────── 07 지속가능경영 ───────── */
(function(){
  const {$,$$,esc,br,img,ext,arrow,head}=BC;
  BC.menu({key:'esg',gnb:'esg',name:'지속가능경영',eyebrow:'TRUST',title:'품질에는 원칙을,\n사람과 사회에는 책임을.',
    desc:'모든 과정에 신뢰의 기준을 세웁니다.\n정직한 경영으로 지속 가능한 내일을 만들어갑니다.',hero:'esg-hero.jpg',
    items:[['esg-promise','두 가지 약속'],['esg-quality','품질경영'],['esg-ethics','윤리경영'],['esg-fairtrade','공정거래 자율준수'],['esg-report','제보·신고자 보호'],['esg-esg','ESG']]});
  const shell=(route,label,body)=>BC.shell('esg',route,label,body);
  const tags=a=>`<div class="es-tags">${a.map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div>`;

  /* ── 07-1 두 가지 약속 ── */
  function pPromise(){
    const P=[['PROMISE 01','품질의 약속','원료가 들어와서 약이 환자에게 닿을 때까지, 같은 기준으로 확인합니다.',['PIC/S 품질관리기준','EU-GMP · cGMP 수준 설비','KGMP 2020'],'품질경영 보기','esg-quality',1],
      ['PROMISE 02','윤리의 약속','“정도(Integrity)는 우리의 핵심가치이자 사업의 기본적인 밑거름입니다.”',['윤리강령 7개 서약','ISO 37001 부패방지','공정거래 CP'],'윤리경영 보기','esg-ethics',0]];
    return shell('esg-promise','두 가지 약속',
      head('OUR PROMISE','신뢰는 두 가지 약속에서\n시작돼요','좋은 품질의 약을 만드는 것, 그리고 바르게 일하는 것.\n비씨월드제약이 지키는 두 가지 기준입니다.')+
      `<div class="es-promise">${P.map(p=>`<div class="es-pcard${p[6]?' soft':''}"><div class="c">
         <div class="h"><p class="no">${p[0]}</p><h3 class="t-title">${p[1]}</h3></div>
         <div class="b"><p class="t-body d">${esc(p[2])}</p>${tags(p[3])}</div></div>
         <a class="btn btn-m btn-on-dark-solid" href="#${p[5]}">${p[4]} ${arrow}</a></div>`).join('')}</div>`);
  }

  /* ── 07-2 품질경영 ── */
  function pQuality(){
    const S=[['원료 입고 · 시험',''],['공정 관리',''],['완제품 시험 · 출하',''],['사후 관리','품질 문의 · 이상사례 대응']];
    const C=[['PIC/S','의약품실사상호협력기구 품질관리기준 적용'],['EU-GMP · cGMP','글로벌 수준에 맞춘 설비와 운영'],['KGMP','2020년 인증 취득 (비씨월드헬스케어)']];
    return shell('esg-quality','품질경영',
      head('PROMISE 01 · QUALITY','품질경영','선언에서 끝나지 않도록,\n체계 → 인증 → 사후 관리까지 이어서 보여드려요.')+
      `<div class="es-stack">
        ${img('quality.jpg','es-banner','품질관리 현장')}
        <div class="es-sys"><p class="t-sub">품질관리 체계</p>
          <div class="es-row4">${S.map((s,i)=>`<div class="es-step"><span class="num">${i+1}</span><div class="g"><p class="t-sub">${s[0]}</p>${s[1]?`<p class="t-label c-navy80">${s[1]}</p>`:''}</div></div>`).join('')}</div></div>
        <div class="es-row4">${C.map(c=>`<div class="es-cert"><p class="t-sub">${esc(c[0])}</p><p class="t-label c-navy80">${esc(c[1])}</p></div>`).join('')}
          <div class="es-cert dark"><p class="t-sub">제품에 문제가 있나요?</p><p class="t-label">파손·이물·포장 불량 / 복용 후 이상 증상</p>
            <div class="btns"><a class="btn es-btn-s" href="#contact-types">품질 문의</a><a class="btn es-btn-s" href="#contact-types">이상사례 신고</a></div></div></div>
      </div>`);
  }

  /* ── 07-3 윤리경영 ── */
  function pEthics(){
    const E=[['01','윤리강령','법규 준수 · 고객 배려 · 투명한 경영 · 공정한\n거래 등 7가지 항목을 임직원 모두가 서약합니다.'],
      ['02','부패방지방침','2019년 7월 제정. 어떤 경우에도 뇌물 수수·제공과 이해충돌 행위를 하지 않으며, 해외 반부패 법령도 지킵니다.'],
      ['03','ISO 37001','부패방지경영시스템 인증을 2019년 11월 받았고,\n2023년 3월 갱신했습니다.']];
    return shell('esg-ethics','윤리경영',
      head('PROMISE 02 · ETHICS','윤리경영','신의·성실·정직을 원칙으로, 모든 임직원이 같은 약속을 서약합니다.')+
      `<div class="es-row3">${E.map(e=>`<div class="es-ecard"><div class="g"><p class="t-label c-navy80">${e[0]}</p><h3 class="t-title">${e[1]}</h3><p class="t-body c-navy80">${esc(e[2].replace(/\n/g," "))}</p></div></div>`).join('')}</div>`);
  }

  /* ── 07-4 공정거래 자율준수 ── */
  function pFair(){
    return shell('esg-fairtrade','공정거래 자율준수',
      head('FAIR TRADE','공정거래 자율준수','공정거래 관련 법규를 지키기 위한 자율준수프로그램(CP)을 운영합니다.')+
      /* 내용 출처: bcwp.co.kr/company/4 (윤리경영 · CP 운영현황, 10.20 확인) */
      `<div class="es-row3" style="margin-top:40px">${[
        ['운영 조직','윤리경영사무국과 영업·R&D·생산·경영지원 부서를 대표하는 자율준수 책임자 12명이 함께 운영합니다.'],
        ['임직원 교육','신입·경력 입사자와 영업 부서를 대상으로 자율준수프로그램(CP) 교육을 진행합니다.'],
        ['점검 · 개선','부패방지경영시스템 ISO 37001 인증을 받고(2019) 2023년에 갱신했습니다.']]
        .map(t=>`<div class="es-fcard"><p class="t-sub">${t[0]}</p><p class="t-body c-navy80">${esc(t[1])}</p></div>`).join('')}</div>`);
  }

  /* ── 07-5 제보·신고자 보호 ── */
  function pReport(){
    return shell('esg-report','제보·신고자 보호',
      head('REPORT & PROTECTION','부정을 보셨다면\n알려주세요','이름을 밝히지 않아도 됩니다. 접수 후 3일 이내에 처리 결과를 알려드립니다.')+
      `<div class="es-stack">
        <div class="es-row2">
          <div class="es-online"><div class="g"><span class="tag">익명 가능</span><p class="t-title">홈페이지로 제보하기</p>
              <p class="t-body">이름·연락처를 남기지 않아도 접수돼요.<br>문의 유형 화면으로 이동합니다.</p></div>
            <div class="r"><a class="btn btn-l btn-on-dark-solid" href="#contact-types">제보하기 ${arrow}</a></div></div>
          <div class="es-contact"><div class="it"><p class="t-label c-navy80">전화</p><p class="t-title" style="white-space:pre-wrap"><a href="tel:031-5178-3341">031-5178-3341</a>  ·  <a href="tel:031-5178-3380">031-5178-3380</a></p></div>
            <hr><div class="it"><p class="t-label c-navy80">이메일</p><p class="t-title"><a href="mailto:bcwpcp@bcwp.co.kr">bcwpcp@bcwp.co.kr</a></p></div></div>
        </div>
        <div class="es-protect"><div class="g"><p class="t-label c-navy80">신고자 보호제도</p><p class="t-sub">제보한 분을 끝까지 지켜요</p></div>
          <ul class="t-body c-navy80"><li>·  신분과 제보 내용은 비밀로 보장</li><li>·  제보를 이유로 한 불이익 금지</li></ul></div>
      </div>`);
  }

  /* ── 07-6 ESG ── */
  function pEsg(){
    const G=[['esg-02.jpg','사회','여주 공장 AED 설치와 여주시 기부(2026) ·\n사회공헌활동 · 가족친화 인증'],['esg-03.jpg','지배구조','ISO 37001 · 공정거래 자율준수 · 내부정보관리규정']];
    return shell('esg-esg','ESG',
      head('ESG','ESG · 지속가능경영','환경, 사람, 지역사회와 함께 오래가는 회사가 되려고 해요.')+
      `<div class="es-row2">${G.map(g=>`<div class="es-gcard">${img(g[0],'light',g[1])}<div class="g"><p class="t-sub">${g[1]}</p><p class="t-body c-navy80">${br(g[2])}</p></div></div>`).join('')}</div>`);
  }

  const reg=(r,label,render)=>BC.page(r,{menu:'esg',lnb:r,label,render});
  reg('esg-promise','두 가지 약속',pPromise);
  reg('esg-quality','품질경영',pQuality);
  reg('esg-ethics','윤리경영',pEthics);
  reg('esg-fairtrade','공정거래 자율준수',pFair);
  reg('esg-report','제보·신고자 보호',pReport);
  reg('esg-esg','ESG',pEsg);

})();
