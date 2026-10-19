/* ───────── 08 고객문의 ───────── */
(function(){
  const {$,$$,esc,br,ext,RECRUIT,head}=BC;
  BC.menu({key:'contact',gnb:'contact',name:'고객문의',eyebrow:'CONTACT',title:'여러분의 목소리에,\n더 가까이 귀 기울입니다.',
    desc:'제품과 사업, 안전에 관한 문의를 남겨주세요.\n필요한 답변을 성실하게 안내하겠습니다.',hero:'contact-hero.jpg',
    items:[['contact-types','문의 유형'],['contact-info','연락처'],['contact-location','오시는 길']]});

  const ERR='! 필수 입력 항목입니다.';
  const NOMATCH='! 입력한 정보와 일치하는 문의가 없어요';
  const IC={
    clip:'<rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 3h6v3H9zM9 13l2 2 4-4"/>',
    search:'<circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/>',
    msg:'<path d="M4 5h16v11H9l-5 4z"/><path d="m9 10 2 2 4-4"/>'
  };
  const icon=k=>`<svg viewBox="0 0 24 24" aria-hidden="true">${IC[k]}</svg>`;
  const tl=(label,href,extern)=>BC.tlink(label,href,extern);

  /* ── 08-1 문의 유형 ── */
  const TYPES=[['contact-ae','의약품 이상사례 신고','01','복용 후 이상 반응이 나타났을 때'],['contact-quality','제품 품질 문의 · 불만','02','모양 · 색 · 포장 등 제품 상태가 이상할 때'],
    ['contact-product','제품 관련 문의','03','성분 · 용법 · 보관 방법이 궁금할 때'],['contact-general','일반 및 기타 문의','04','회사 · 제안 등 그 밖의 문의'],['contact-recruit','채용 문의','05','채용 공고 · 지원 절차 · 전형 관련 문의']];
  function pTypes(){
    return BC.shell('contact','contact-types','문의 유형',
      `<div class="ct-w792">
        <div class="ct-typehead"><div class="g"><h2 class="t-headline">고객문의</h2><p class="t-body c-navy80">어떤 내용으로 문의하시나요? 해당하는 문의 유형을 선택해 주세요.</p></div>
          <div class="r"><span class="t-label c-navy80">이미 문의하셨나요?</span>${tl('내 문의 확인','#contact-check')}</div></div>
        <div class="ct-types">${TYPES.map(t=>`<a class="ct-type" href="#${t[0]}"><span class="h"><span class="t-sub">${t[1]}</span><span class="t-label c-navy80">${t[2]}</span></span>
          <span class="t-body c-navy80">${t[3]}</span><span class="tlink">선택하기 <span class="ar">→</span></span></a>`).join('')}</div>
        <div class="ct-phone"><p class="t-title" style="white-space:pre">전화 문의   031-5178-3300</p><p class="t-label c-navy80">평일 09:00–18:00 · 점심 12:00–13:00</p></div>
      </div>`,{cls:'ct-pt80'});
  }

  /* ── 08-1-1 유형별 폼 정의 (문구 = Figma) ── */
  const PRODUCTS=['젝스트프리필드펜 150㎍','메펨주','모르핀황산염수화물 15mg','수펜탈 50㎍','수바로오디정 10mg','뉴신타 서방정 50mg','뉴신타 서방정 100mg','뉴신타 서방정 200mg','뉴신타 아이알정 50mg','메로겔','텔바로 오디정 80mg','티바레주 1mg','티바레주 2mg','티바레주 5mg'];
  const F={
    name:{k:'name',t:'text',label:'이름',req:1,ph:'이름',auto:'name'},
    phone:{k:'phone',t:'tel',label:'휴대폰',req:1,ph:'010-0000-0000',hint:'접수 · 답변 알림을 문자로 보내요',auto:'tel'},
    email:{k:'email',t:'email',label:'이메일',ph:'name@example.com',hint:'적으면 답변을 메일로도 받아요',auto:'email'},
    reply:{k:'reply',t:'seg',label:'답변 받을 방법',req:1,opts:['문자','이메일','전화'],def:'문자'},
    product:{k:'product',t:'product',label:'제품명',req:1}
  };
  const lot=hint=>({k:'lot',t:'text',label:'제조번호',ph:'상자 · 라벨에 적힌 번호',hint});
  const tail=[[F.name,F.phone],[F.email,F.reply]];
  const CONSENT=['개인정보 수집 · 이용 동의 (필수)','이름 · 연락처 · 문의 내용을 답변에만 써요 · 보관 기간'];
  const FORMS={
    ae:{route:'contact-ae',title:'이상사례 신고',type:'의약품 이상사례 신고',prefix:'AE',submit:'신고 접수하기',
      urgent:['증상이 심하다면','신고보다 먼저 병원을 찾거나 119에 연락하세요. 복용을 계속할지는 의사 · 약사와 상담하세요.'],
      rows:[{k:'who',t:'cards',label:'누가 약을 드셨나요?',req:1,opts:[['환자 본인','직접 복용'],['보호자 · 가족','대신 신고'],['의료 전문가','의사 · 약사 · 간호사'],['기타','약국 · 도매 등']]},
        [F.product,lot('')],
        [{k:'start',t:'date',label:'복용 시작일'},{k:'onset',t:'date',label:'증상이 시작된 날',req:1}],
        {k:'symptom',t:'chips',label:'어떤 증상이 있으셨나요?',req:1,opts:['발진 · 가려움','메스꺼움 · 구토','어지러움','근육통','두통','숨이 참','붓기','기타']},
        {k:'body',t:'textarea',label:'자세히 적어주세요',req:1,ph:'언제부터 어떤 증상이 있었는지, 지금은 어떤지 적어주세요.'},
        [{k:'now',t:'seg',label:'지금 상태',req:1,opts:['계속되고 있어요','나아졌어요','잘 모르겠어요']},{k:'care',t:'seg',label:'진료 · 상담을 받으셨나요?',req:1,opts:['네','아니요','예정이에요']}],
        {k:'file',t:'file',label:'사진 · 서류',hint:'약 · 포장 사진, 처방전 등 · JPG · PNG · PDF · 10MB 이하'},...tail],
      consents:[CONSENT,['건강 관련 민감정보 수집 동의 (필수)','증상 · 복용 정보를 이상사례 확인과 관계 기관 보고에만 써요']]},
    quality:{route:'contact-quality',title:'제품 품질 문의 · 불만',type:'제품 품질 문의 · 불만',prefix:'QC',submit:'문의 보내기',
      urgent:['제품은 버리지 말고 보관해 주세요','확인을 위해 회수가 필요할 수 있어요. 제조번호가 보이도록 제품과 포장을 함께 보관해 주세요.'],
      rows:[[F.product,lot('상자 · 라벨 뒷면에서 확인할 수 있어요')],
        [{k:'shop',t:'text',label:'구입처',ph:'약국 · 병원 이름'},{k:'bought',t:'date',label:'구입일',req:1}],
        {k:'issue',t:'chips',label:'어떤 문제가 있나요?',req:1,opts:['모양 · 색 변화','이물 혼입','포장 · 용기 파손','수량 부족','냄새 · 맛 이상','기타']},
        {k:'body',t:'textarea',label:'자세히 적어주세요',req:1,ph:'언제, 어떤 문제를 발견하셨는지 적어주세요.'},
        {k:'file',t:'file',label:'사진 · 서류',hint:'제품 · 포장 사진(제조번호가 보이게) · JPG · PNG · PDF · 10MB 이하'},...tail],
      consents:[CONSENT]},
    product:{route:'contact-product',title:'제품 관련 문의',type:'제품 관련 문의',prefix:'PI',submit:'문의 보내기',
      urgent:['복용 후 이상 반응이 있나요?','이상 반응은 이 문의가 아니라 「<a href="#contact-ae">의약품 이상사례 신고</a>」로 접수해 주세요.',1],
      rows:[[F.product,lot('알고 있다면 적어주세요')],
        {k:'topic',t:'seg',label:'무엇이 궁금하신가요?',req:1,opts:['성분 · 함량','용법 · 용량','보관 방법','허가 · 보험','제품 공급','기타']},
        {k:'body',t:'textarea',label:'문의 내용',req:1,ph:'궁금하신 내용을 적어주세요.'},
        {k:'file',t:'file',label:'사진 · 서류',hint:'참고할 사진이 있으면 올려 주세요 · JPG · PNG · PDF · 10MB 이하'},...tail],
      consents:[CONSENT]},
    general:{route:'contact-general',title:'일반 및 기타 문의',type:'일반 및 기타 문의',prefix:'GI',submit:'문의 보내기',
      rows:[[{k:'org',t:'text',label:'회사 · 기관명',ph:'개인이면 비워 두세요',auto:'organization'},{k:'subject',t:'text',label:'제목',ph:'문의 제목을 적어주세요'}],
        {k:'topic',t:'seg',label:'문의 분류',req:1,opts:['회사 일반','제휴 · 제안','투자 · IR','홈페이지','기타']},
        {k:'body',t:'textarea',label:'문의 내용',req:1,ph:'문의하실 내용을 적어주세요.'},
        {k:'file',t:'file',label:'사진 · 서류',hint:'참고 자료 · JPG · PNG · PDF · 10MB 이하'},...tail],
      consents:[CONSENT]},
    recruit:{route:'contact-recruit',title:'채용 문의',type:'채용 문의',prefix:'RC',submit:'문의 보내기',
      urgent:['지원서는 채용 사이트에서 접수해요',`지원서 제출과 결과 확인은 비씨월드제약 채용 사이트(<a href="${RECRUIT}" target="_blank" rel="noopener">bcwp.recruiter.co.kr ${ext}</a>)에서 할 수 있어요.`,1],
      rows:[[{k:'job',t:'text',label:'지원 공고명',ph:'공고 제목을 적어주세요'},{k:'field',t:'text',label:'지원 분야',ph:'예: 연구개발 · 생산 · 영업'}],
        {k:'topic',t:'seg',label:'문의 분류',req:1,opts:['채용 공고','지원 · 서류','전형 · 면접','입사 · 처우','기타']},
        {k:'body',t:'textarea',label:'문의 내용',req:1,ph:'문의하실 내용을 적어주세요.'},...tail],
      consents:[CONSENT]}
  };
  const flat=fm=>fm.rows.flatMap(r=>Array.isArray(r)?r:[r]);

  /* 필드 HTML */
  const lab=(f,id)=>`<${id?`label for="${id}"`:'p'} class="ct-lab">${esc(f.label)}${f.req?' <span aria-hidden="true">*</span>':''}</${id?'label':'p'}>`;
  const hint=f=>f.hint?`<p class="ct-hint">${esc(f.hint)}</p>`:'';
  function field(fm,f){
    const id=`ct-${fm.prefix}-${f.k}`, req=f.req?' aria-required="true"':'';
    const wrap=(inner,cls='')=>`<div class="ct-f${cls}" data-ct-k="${f.k}" data-ct-t="${f.t}"${f.req?' data-ct-req':''}>${inner}</div>`;
    switch(f.t){
      case 'text': case 'tel': case 'email':
        return wrap(lab(f,id)+`<input class="ct-in" id="${id}" type="${f.t}" placeholder="${esc(f.ph||'')}"${f.auto?` autocomplete="${f.auto}"`:''}${req}>`+hint(f));
      case 'date':
        return wrap(lab(f,id)+`<div class="ct-in ct-icon"><input id="${id}" inputmode="numeric" maxlength="10" placeholder="YYYY.MM.DD" data-ct-date${req}><span aria-hidden="true">▦</span></div>`);
      case 'product':
        return wrap(lab(f,id)+`<div class="ct-in ct-prod"><span class="ct-token" hidden><span></span><button type="button" data-ct-untoken aria-label="선택한 제품 지우기">×</button></span>
          <input id="${id}" list="ctProducts" placeholder="⌕ 제품 검색" autocomplete="off"${req}></div>`);
      case 'textarea':
        return wrap(lab(f,id)+`<textarea class="ct-in ct-ta" id="${id}" maxlength="1000" placeholder="${esc(f.ph)}"${req}></textarea><p class="ct-hint" data-ct-count>0 / 1000</p>`);
      case 'file':
        return wrap(`${lab(f)}<div class="ct-filerow"><label class="btn ct-s36 ct-outline-navy">+ 파일 선택<input type="file" accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf" multiple data-ct-file hidden></label><span class="t-label c-navy80">${esc(f.hint)}</span></div><ul class="ct-files" data-ct-files></ul>`,' ct-gap12');
      case 'cards':
        return wrap(`${lab(f)}<div class="ct-cards" role="radiogroup" aria-label="${esc(f.label)}"${req}>${f.opts.map(o=>`<button type="button" class="ct-card" role="radio" aria-checked="false" data-ct-opt="${esc(o[0])}"><span class="t-body-strong">${esc(o[0])}</span><span class="t-label">${esc(o[1])}</span></button>`).join('')}</div>`,' ct-gap12');
      case 'seg': case 'chips': {
        const multi=f.t==='chips';
        return wrap(`${lab(f)}<div class="chips" role="${multi?'group':'radiogroup'}" aria-label="${esc(f.label)}"${req}>${f.opts.map(o=>`<button type="button" class="chip" ${multi?'aria-pressed':'role="radio" aria-checked'}="${o===f.def}" data-ct-opt="${esc(o)}">${esc(o)}</button>`).join('')}</div>`,' ct-gap12');
      }
    }
  }
  const urgent=u=>u?`<div class="ct-urgent"><span class="ic" aria-hidden="true">!</span><div><p class="t-body-strong">${esc(u[0])}</p><p class="t-label">${u[2]?u[1]:esc(u[1])}</p></div></div>`:'';
  function pForm(key){
    const fm=FORMS[key];
    return BC.shell('contact','contact-types',fm.type,
      `<div class="ct-w996">
        <div class="ct-formtop">${'<a class="tlink" href="#contact-types">← 문의 유형 다시 선택</a>'}<a class="btn ct-s36 ct-outline-navy" href="#contact-check">내 문의 확인 <span class="ar">→</span></a></div>
        <form class="ct-form" data-ct-form="${key}" novalidate>
          <div class="ct-formhead"><h2 class="t-headline">${esc(fm.title)}</h2><p class="t-label c-navy80">* 필수</p></div>
          ${urgent(fm.urgent)}
          ${fm.rows.map(r=>Array.isArray(r)?`<div class="ct-row2">${r.map(f=>field(fm,f)).join('')}</div>`:field(fm,r)).join('')}
          <div class="ct-consent">${fm.consents.map((c,i)=>`<div class="ct-f" data-ct-k="agree${i}" data-ct-t="agree" data-ct-req><div class="ct-agree">
              <label class="ct-check"><input type="checkbox" aria-required="true"><span class="box" aria-hidden="true">✓</span><span class="g"><span class="t-body-strong">${esc(c[0])}</span><span class="t-label c-navy80">${esc(c[1])}</span></span></label>
              <a class="tlink" href="#" data-ct-terms>전문</a></div></div>`).join('')}</div>
          <div class="ct-actions"><button type="button" class="btn btn-l ct-outline-navy" data-ct-save>임시 저장</button><button type="submit" class="btn btn-l btn-primary">${esc(fm.submit)}</button></div>
        </form>
        <datalist id="ctProducts">${PRODUCTS.map(p=>`<option value="${esc(p)}">`).join('')}</datalist>
      </div>`,{cls:'ct-pt64'});
  }

  /* 값 읽기 · 검증 */
  function readField(w){
    const t=w.dataset.ctT;
    if(t==='cards'||t==='seg') return ($('[aria-checked="true"]',w)||{}).dataset?.ctOpt||'';
    if(t==='chips') return $$('[aria-pressed="true"]',w).map(b=>b.dataset.ctOpt).join(', ');
    if(t==='product') return w.dataset.val||$('input',w).value.trim();
    if(t==='agree') return $('input',w).checked?'동의':'';
    if(t==='file') return (w._files||[]).map(f=>f.name).join(', ');
    const el=$('input,textarea',w); return el?el.value.trim():'';
  }
  function setErr(w,on,msg=ERR){
    w.classList.toggle('err',on);
    let m=$(':scope > .ct-err',w);
    const ctl=$('input:not([type=file]),textarea,[role=radiogroup],[role=group]',w);
    if(on){ if(!m){m=document.createElement('p');m.className='ct-err';m.id='err-'+Math.random().toString(36).slice(2,8);w.appendChild(m)} m.textContent=msg; ctl&&ctl.setAttribute('aria-describedby',m.id); ctl&&ctl.setAttribute('aria-invalid','true'); }
    else { m&&m.remove(); ctl&&ctl.removeAttribute('aria-invalid'); ctl&&ctl.removeAttribute('aria-describedby'); }
  }
  function validate(form){
    let first=null;
    $$('.ct-f',form).forEach(w=>{
      let bad=w.hasAttribute('data-ct-req')&&!readField(w);
      if(w.dataset.ctK==='email'){ const reply=readField($('[data-ct-k="reply"]',form)); if(reply==='이메일'&&!readField(w))bad=true; }
      setErr(w,bad); if(bad&&!first)first=w;
    });
    if(first){ first.scrollIntoView({behavior:'smooth',block:'center'}); const c=$('input:not([type=file]),textarea,button',first); c&&c.focus({preventScroll:true}); }
    return !first;
  }

  /* 임시 저장 (이 화면 안의 메모리에만, 새로고침하면 사라짐) */
  const DRAFT={};
  function snapshot(form){ const o={}; $$('.ct-f',form).forEach(w=>{o[w.dataset.ctK]=readField(w)}); return o; }
  function restore(form){
    const d=DRAFT[form.dataset.ctForm]; if(!d)return;
    $$('.ct-f',form).forEach(w=>{
      const v=d[w.dataset.ctK]||'', t=w.dataset.ctT;
      if(t==='cards'||t==='seg') $$('[data-ct-opt]',w).forEach(b=>b.setAttribute('aria-checked',b.dataset.ctOpt===v));
      else if(t==='chips'){ const s=v.split(', '); $$('[data-ct-opt]',w).forEach(b=>b.setAttribute('aria-pressed',s.includes(b.dataset.ctOpt))); }
      else if(t==='product') setToken(w,v);
      else if(t==='agree') $('input',w).checked=!!v;
      else if(t!=='file'){ const el=$('input,textarea',w); if(el){el.value=v; if(t==='textarea')$('[data-ct-count]',w).textContent=v.length+' / 1000';} }
    });
  }
  function setToken(w,v){
    w.dataset.val=v||''; const tk=$('.ct-token',w); tk.hidden=!v; $('span',tk).textContent=v||''; const inp=$('input',w); inp.value='';
    inp.placeholder=v?'':'⌕ 제품 검색';
  }

  /* ── 모달 (내용 확인 · 접수 완료) ── */
  let lastFocus=null;
  function openModal(html,label){
    closeModal(); lastFocus=document.activeElement;
    const el=document.createElement('div'); el.className='ct-dim'; el.id='ctModal';
    el.innerHTML=`<div class="ct-modal" role="dialog" aria-modal="true" aria-label="${esc(label)}">${html}</div>`;
    document.body.appendChild(el); document.body.classList.add('modal-open');
    el.addEventListener('click',e=>{if(e.target===el)closeModal()});
    const f=$('[data-ct-focus]',el)||$('button,a',el); f&&f.focus({preventScroll:true});
    return el;
  }
  function closeModal(){ const m=$('#ctModal'); if(m){m.remove(); document.body.classList.remove('modal-open'); lastFocus&&lastFocus.focus&&lastFocus.focus({preventScroll:true});} }
  document.addEventListener('keydown',e=>{
    const m=$('#ctModal'); if(!m)return;
    if(e.key==='Escape'){closeModal();return}
    if(e.key==='Tab'){ const f=$$('button,a[href],input',m).filter(x=>!x.disabled); if(!f.length)return; const a=f[0],z=f[f.length-1];
      if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()} else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()} }
  });

  function confirmModal(form){
    const fm=FORMS[form.dataset.ctForm];
    const rows=flat(fm).map(f=>[f.label,readField($(`[data-ct-k="${f.k}"]`,form))]).filter(r=>r[1]);
    openModal(`<div class="ct-confirm"><div class="bar"><p class="t-sub">내용 확인</p><button type="button" class="icon-btn s" data-ct-close aria-label="닫기">×</button></div>
      <div class="scroll"><p class="t-label c-navy80">${esc(fm.type)}</p><dl class="ct-dl">${rows.map(r=>`<div><dt>${esc(r[0])}</dt><dd>${esc(r[1])}</dd></div>`).join('')}</dl></div>
      <div class="acts"><button type="button" class="btn btn-l ct-outline-navy" data-ct-close>수정하기</button><button type="button" class="btn btn-l btn-primary" data-ct-send data-ct-focus>${esc(fm.submit)}</button></div></div>`,'내용 확인');
    $('[data-ct-send]').onclick=()=>complete(form);
  }

  /* 접수번호: 오늘 날짜 + 임의 4자리 (예시) */
  const SUBMITTED=[];
  const pad=n=>String(n).padStart(2,'0');
  const today=()=>{const d=new Date(); return {y:d.getFullYear(),md:pad(d.getMonth()+1)+pad(d.getDate()),dot:`${d.getFullYear()}.${pad(d.getMonth()+1)}.${pad(d.getDate())}`}};
  function complete(form){
    const key=form.dataset.ctForm, fm=FORMS[key], t=today();
    const no=`${fm.prefix}-${t.y}-${t.md}-${String(Math.floor(Math.random()*10000)).padStart(4,'0')}`;
    const v=snapshot(form);
    const title=key==='ae'?fm.type:(v.subject||(v.body||'').split('\n')[0].slice(0,40)||fm.type);
    SUBMITTED.unshift({no,key,type:fm.type,title,date:t.dot,body:key==='ae'?'':v.body,phone:v.phone,email:v.email,status:'접수 완료'});
    delete DRAFT[key];
    form.reset(); $$('.ct-f',form).forEach(w=>setErr(w,false)); clearForm(form);
    openModal(`<div class="ct-done"><div class="left"><div class="g"><span class="ok" aria-hidden="true">✓</span><p class="t-label c-line">접수 완료</p>
        <p class="t-title c-white" data-ct-no>${no}</p><p class="ct-example">예시 번호 · 시안이라 실제로 접수되지 않아요</p><p class="t-label c-line">${esc(fm.type)}</p>
        <button type="button" class="btn ct-s36 ct-on-dark" data-ct-copy="${no}">⧉ 접수번호 복사</button></div>
        <p class="t-label c-line">접수번호는 문자로도 보내드렸어요.<br>‘내 문의 확인’에서 진행 상황을 볼 수 있어요.</p></div>
      <div class="right"><p class="t-sub">이렇게 진행됩니다</p><ol class="ct-steps">${[['01','접수 확인','· 오늘','담당 부서에서 내용을 확인합니다.'],['02','추가 확인 연락','· 1~2일','필요하면 전화 또는 이메일로 여쭤봅니다.'],['03','결과 회신','· 3영업일 이내','영업일 기준 3일 이내 처리 결과를 알려드립니다.']]
        .map(s=>`<li><span class="n">${s[0]}</span><div><p><span class="t-body-strong">${s[1]}</span> <span class="t-label c-navy80">${s[2]}</span></p><p class="t-label c-navy80">${s[3]}</p></div></li>`).join('')}</ol>
        <div class="acts"><a class="btn btn-l ct-outline-navy" href="#contact-types" data-ct-close>다른 문의하기</a><button type="button" class="btn btn-l btn-primary" data-ct-close data-ct-focus>확인</button></div></div></div>`,'접수 완료');
  }
  function clearForm(form){
    const fm=FORMS[form.dataset.ctForm];
    $$('.ct-f',form).forEach(w=>{
      const t=w.dataset.ctT;
      if(t==='cards'||t==='seg'){ const def=(flat(fm).find(f=>f.k===w.dataset.ctK)||{}).def; $$('[data-ct-opt]',w).forEach(b=>b.setAttribute('aria-checked',b.dataset.ctOpt===def)); }
      if(t==='chips') $$('[data-ct-opt]',w).forEach(b=>b.setAttribute('aria-pressed','false'));
      if(t==='product') setToken(w,'');
      if(t==='textarea') $('[data-ct-count]',w).textContent='0 / 1000';
      if(t==='file'){ w._files=[]; $('[data-ct-files]',w).innerHTML=''; }
    });
  }

  /* ── 08-1-3 내 문의 확인 → 08-1-4 접수내역 → 08-1-5 접수 상세 ── */
  const EX=[ // Figma 08-1-4 예시 데이터(1페이지 10건)
    ['확인 중','홈페이지 자료 이용에 대해 문의드립니다.','2026.10.16','일반 및 기타 문의','CS-2026-1016-0031'],
    ['답변 완료','제품 보관 안내 자료를 확인하고 싶습니다.','2026.10.15','제품 관련 문의','CS-2026-1015-0030'],
    ['확인 중','의약품 첨부문서 확인 경로를 문의드립니다.','2026.10.14','일반 및 기타 문의','CS-2026-1014-0029'],
    ['답변 완료','회사 소개 자료 확인을 요청드립니다.','2026.10.13','제품 관련 문의','CS-2026-1013-0028'],
    ['답변 완료','제품 관련 문의 담당 부서를 알고 싶습니다.','2026.10.12','일반 및 기타 문의','CS-2026-1012-0027'],
    ['답변 완료','연구개발 소개 자료를 확인하고 싶습니다.','2026.10.11','제품 관련 문의','CS-2026-1011-0026'],
    ['답변 완료','홈페이지 이용 중 궁금한 점이 있습니다.','2026.10.10','일반 및 기타 문의','CS-2026-1010-0025'],
    ['답변 완료','제품 정보 검색 방법을 문의드립니다.','2026.10.09','제품 관련 문의','CS-2026-1009-0024'],
    ['답변 완료','회사 연락처 확인을 부탁드립니다.','2026.10.08','일반 및 기타 문의','CS-2026-1008-0023'],
    ['답변 완료','문의 처리 절차를 알고 싶습니다.','2026.10.07','제품 관련 문의','CS-2026-1007-0022']
  ].map(r=>({status:r[0],title:r[1],date:r[2],type:r[3],no:r[4]}));
  EX[0].body='회사 홈페이지의 연구개발 소개 자료를 확인하고 싶습니다.\n자료 확인 경로와 담당 부서를 안내 부탁드립니다.';
  EX[1].body='제품의 보관 방법을 확인할 수 있는 자료가 있는지 문의드립니다.';
  EX[1].answer='문의해 주셔서 감사합니다.\n제품 보관 방법은 해당 제품의 허가된 첨부문서에서 확인하실 수 있습니다.\n추가 확인이 필요하면 제품명을 함께 남겨 주세요.';
  const STEP={ // Figma 「Inquiry progress」 3단계
    '접수 완료':{i:0,h:'문의가 정상적으로 접수되었습니다.',notes:['● 현재 단계 · 접수 완료','확인 대기','답변 대기'],
      ah:'담당 부서 확인을 기다리고 있습니다.',at:'접수한 문의가 담당 부서로 전달될 예정입니다.\n확인이 시작되면 처리 단계가 ‘담당 부서 확인’으로 변경됩니다.'},
    '확인 중':{i:1,h:'담당 부서에서 내용을 확인하고 있습니다.',notes:['✓ 접수됨','● 현재 진행 단계','답변 대기'],
      ah:'답변을 준비하고 있습니다.',at:'담당 부서에서 접수한 내용을 확인 중입니다.\n추가 확인이 필요한 경우 접수 시 등록한 연락처로 안내드립니다.'},
    '답변 완료':{i:2,h:'답변이 완료되었습니다.',notes:['✓ 접수됨','✓ 확인 완료','● 현재 단계 · 답변 등록'],ah:'담당 부서 답변'}
  };
  const STEP_NAMES=[['접수 완료','clip'],['담당 부서 확인','search'],['답변 완료','msg']];
  const ST_IC={'접수 완료':'clip','확인 중':'search','답변 완료':'msg'};
  let CK={view:'form',fails:0,lock:0,list:[],filter:'전체',page:1,sel:null,via:'phone',single:false};

  function pCheck(){
    return BC.shell('contact','contact-types','내 문의 확인',`<div id="ctCheck"></div>`,{cls:'ct-pt80'});
  }
  function ckRender(){
    const host=$('#ctCheck'); if(!host)return;
    host.className=CK.view==='form'?'ct-w486':'ct-w996';
    host.innerHTML=CK.view==='form'?ckForm():CK.view==='list'?ckList():ckDetail();
    if(CK.view!=='form') $('#pageHost .pg-body').classList.add('ct-pb96');
    else $('#pageHost .pg-body').classList.remove('ct-pb96');
  }
  function ckForm(){
    const ph=CK.via==='phone';
    return `<div class="ct-ck">
      <div class="ct-seg2"><a class="tab" href="#contact-types">문의하기</a><span class="btn btn-m btn-primary" aria-current="page">내 문의 확인</span></div>
      <div class="g16"><h2 class="t-headline">내 문의 확인</h2><p class="t-body c-navy80" style="max-width:400px">접수할 때 받은 번호와 연락처로 진행 상황과 답변을 볼 수 있어요.</p></div>
      <form class="ct-ckform" data-ct-lookup novalidate>
        <div class="ct-f" data-ct-k="no" data-ct-t="text" data-ct-req><label class="ct-lab" for="ctNo">접수번호 <span aria-hidden="true">*</span></label>
          <input class="ct-in" id="ctNo" placeholder="예: AE-2026-1005-0031" autocomplete="off" aria-required="true"><p class="ct-hint">문자 · 메일로 보내드린 번호예요</p></div>
        <div class="ct-f ct-gap12" data-ct-k="contact" data-ct-t="text" data-ct-req><label class="ct-lab" for="ctContact">접수할 때 쓴 연락처 <span aria-hidden="true">*</span></label>
          <div class="ct-via" role="radiogroup" aria-label="연락처 종류">${[['phone','휴대폰'],['email','이메일']].map(([k,l])=>`<button type="button" role="radio" aria-checked="${CK.via===k}" data-ct-via="${k}">${l}</button>`).join('')}</div>
          <input class="ct-in" id="ctContact" type="${ph?'tel':'email'}" placeholder="${ph?'010-0000-0000':'name@example.com'}" autocomplete="${ph?'tel':'email'}" aria-required="true"></div>
        <button type="submit" class="btn btn-l btn-primary ct-full">확인하기</button>
        <p class="ct-err ct-formerr" id="ctLookErr" role="alert" hidden></p>
      </form>
      <div class="ct-help"><p class="t-body-strong">접수번호를 잊으셨나요?</p><p class="t-label c-navy80">받은 문자 · 메일의 ‘내 문의 보기’ 링크를 눌러도 돼요.<br>그래도 없다면 031-5178-3300으로 연락주세요.</p></div>
    </div>`;
  }
  const rowHtml=(it,i)=>`<button type="button" class="ct-irow" data-ct-open="${i}"><span class="st">${icon(ST_IC[it.status])}<span>${esc(it.status)}</span></span>
    <span class="tx"><span class="t-body-strong">${esc(it.title)}</span><span class="t-label c-navy80" style="white-space:pre-wrap">${esc(it.date)}  ·  ${esc(it.type)}  ·  ${esc(it.no)}</span></span><span class="more">상세 보기</span></button>`;
  const ckHead=(t,d)=>`<div class="ct-ckhead"><p class="t-label-strong c-navy80">MY INQUIRIES</p><h2 class="t-headline">${t}</h2><p class="t-body">${d}</p><p class="t-label c-navy80">${CK.single?'시안 · 이 화면에서 접수한 내용입니다.':`시안 · 본인 확인 후 조회한 예시 ${CK.view==='detail'?'화면':'데이터'}입니다.`}</p></div>`;
  const nextActs=`<div class="ct-next"><p class="t-sub">확인을 마치셨나요?</p><div class="row"><a class="btn btn-l btn-primary" href="#home">홈으로 가기</a><a class="btn btn-l btn-outline" href="#contact-types">새 문의하기</a></div></div>`;
  function ckList(){
    const L=CK.list, per=10;
    if(CK.single){
      return `<div class="ct-ck2">${ckHead('접수내역','문의 제목을 선택하면 접수 내용과 답변을 확인할 수 있습니다.')}
        <div class="ct-sum"><p class="t-body-strong" style="white-space:pre-wrap">전체 ${L.length}건  ·  ${esc(L[0].status)} ${L.length}건</p><p class="t-label c-navy80">최신 접수순</p></div>
        <div class="ct-listwrap"><div class="ct-list">${listHead}${L.map(rowHtml).join('')}</div><p class="t-label c-navy80">전체 ${L.length}건 중 1–${L.length}건</p></div>${nextActs}</div>`;
    }
    const shown=L.map((it,i)=>[it,i]).filter(([it])=>CK.filter==='전체'||it.status===CK.filter);
    const pages=Math.max(1,Math.ceil(shown.length/per)); CK.page=Math.min(CK.page,pages);
    const a=(CK.page-1)*per, slice=shown.slice(a,a+per);
    const cnt=s=>L.filter(x=>x.status===s).length;
    return `<div class="ct-ck2">${ckHead('접수내역','문의 제목을 선택하면 접수 내용과 답변을 확인할 수 있습니다.')}
      <div class="ct-sum"><p class="t-body-strong" style="white-space:pre-wrap">전체 ${L.length}건  ·  최신 접수순</p><p class="t-label c-navy80">페이지당 10건</p></div>
      <div class="ct-filter" role="radiogroup" aria-label="상태별 보기">${[['전체',L.length],['확인 중',cnt('확인 중')],['답변 완료',cnt('답변 완료')]].map(([s,n])=>`<button type="button" role="radio" aria-checked="${CK.filter===s}" data-ct-filter="${s}">${s} ${n}</button>`).join('')}</div>
      <div class="ct-listwrap"><div class="ct-list">${listHead}${slice.map(([it,i])=>rowHtml(it,i)).join('')}</div>
        <p class="t-label c-navy80">전체 ${shown.length}건 중 ${shown.length?a+1:0}–${a+slice.length}건</p></div>
      <div class="ct-pages"><button type="button" data-ct-page="${CK.page-1}" ${CK.page===1?'disabled':''}>이전</button>${Array.from({length:pages},(_,i)=>`<button type="button" data-ct-page="${i+1}"${i+1===CK.page?' aria-current="page"':''}>${i+1}</button>`).join('')}<button type="button" data-ct-page="${CK.page+1}" ${CK.page===pages?'disabled':''}>다음</button></div>
      ${nextActs}</div>`;
  }
  const listHead=`<div class="ct-lhead" aria-hidden="true"><span class="st">처리 상태</span><span class="tx">문의 내용</span><span class="more">상세</span></div>`;
  function ckDetail(){
    const it=CK.list[CK.sel], S=STEP[it.status];
    const steps=STEP_NAMES.map(([n,ic],i)=>`<li class="${i===S.i?'cur':''}"><span class="ico">${icon(ic)}</span><p class="t-sub">${n}</p><p class="t-label c-navy80">${S.notes[i]}</p></li>`).join('');
    const answer=it.status==='답변 완료'
      ?`<div class="ct-box"><h3 class="t-title">${S.ah}</h3>${it.answer?`<p class="t-body">${br(it.answer)}</p><p class="t-label c-navy80">답변 등록 · 2026.10.16</p>`:''}
        <a class="btn btn-l btn-outline" href="#contact-types" style="align-self:flex-start">추가 문의하기</a></div>`
      :`<div class="ct-box"><h3 class="t-title">${S.ah}</h3><p class="t-body">${br(S.at)}</p></div>`;
    return `<div class="ct-ck3">${ckHead('접수 상세','문의 내용과 담당 부서의 처리 상태를 확인하세요.')}
      <div class="ct-box ct-prog"><h3 class="t-title">${S.h}</h3><ol>${steps}</ol></div>
      <div class="g16"><h3 class="t-title">접수 정보</h3><dl class="ct-info">${[['접수번호',it.no],['문의 유형',it.type],['문의 제목',it.title],['접수일',it.date]].map(r=>`<div><dt>${r[0]}</dt><dd>${esc(r[1])}</dd></div>`).join('')}</dl></div>
      ${it.key==='ae'||!it.body?'':`<div class="g16"><h3 class="t-title">내가 보낸 내용</h3><p class="t-body">${br(it.body)}</p></div>`}
      ${answer}
      <button type="button" class="btn btn-l btn-outline" data-ct-back style="align-self:flex-start">접수 목록으로</button>
      ${nextActs}</div>`;
  }
  function lookup(form){
    const err=$('#ctLookErr'); err.hidden=true;
    const fNo=$('[data-ct-k="no"]',form), fC=$('[data-ct-k="contact"]',form);
    const no=$('input',fNo).value.trim().toUpperCase(), c=$('input',fC).value.trim();
    setErr(fNo,!no); setErr(fC,!c);
    if(!no||!c){ $('input',!no?fNo:fC).focus(); return; }
    if(Date.now()<CK.lock){ err.textContent=NOMATCH; err.hidden=false; return; }
    const norm=s=>s.replace(/[\s-]/g,'').toLowerCase();
    const mine=SUBMITTED.find(s=>s.no===no&&(norm(s.phone||'')===norm(c)||norm(s.email||'')===norm(c)));
    if(mine){ CK={...CK,view:'list',list:[mine],single:true,fails:0}; ckRender(); scrollTop(); return; }
    if(/^[A-Z]{2}-\d{4}-\d{4}-\d{4}$/.test(no)&&!SUBMITTED.some(s=>s.no===no)){ CK={...CK,view:'list',list:EX,single:false,filter:'전체',page:1,fails:0}; ckRender(); scrollTop(); return; }
    CK.fails++; if(CK.fails>=5){CK.lock=Date.now()+10*60*1000;CK.fails=0}
    err.textContent=NOMATCH; err.hidden=false;
  }
  const scrollTop=()=>{const h=$('#ctCheck'); h&&window.scrollTo({top:h.getBoundingClientRect().top+scrollY-160,behavior:'smooth'})};

  /* ── 08-2 연락처 ── */
  function pInfo(){
    return BC.shell('contact','contact-info','연락처',
      head('CALL US','연락처')+
      `<div class="ct-calls">
        <div class="ct-call"><p class="t-label c-navy80">대표전화</p><p class="t-headline">031-5178-3300</p><p class="t-label c-navy80"><span>운영 시간</span>&nbsp;&nbsp;<span>10:00 ~ 17:00</span></p></div>
        <div class="ct-call"><p class="t-label c-navy80">팩스</p><p class="t-headline">02-574-5073</p></div>
        <div class="ct-call"><p class="t-label c-navy80">부서별 연락처</p>
          <dl class="ct-depts"><div><dt>윤리·준법 제보</dt><dd>031-5178-3341</dd></div></dl></div>
      </div>`);
  }

  /* ── 08-3 오시는 길 ── (research-1020.json locations · korea-map.json) */
  const KMAP={"viewBox": "0 0 480 600", "pts": {"본사": [125, 149], "여주공장": [164, 168], "원주공장": [192, 151], "충청지점": [153, 259], "전주지점": [126, 314], "광주지점": [106, 381], "대구지점": [250, 308], "부산지점": [292, 375]}, "d": "M86,110L89,108L89,105L89,95L97,89L107,75L112,68L118,61L125,56L131,54L142,53L162,54L166,53L179,52L183,54L193,54L204,54L209,52L215,48L219,42L224,31L229,22L232,20L252,68L272,98L289,121L312,163L319,186L320,200L324,219L321,230L321,247L320,256L317,262L317,275L318,282L318,290L320,294L323,295L327,292L332,291L331,301L325,328L319,347L312,364L302,380L291,386L283,388L267,389L254,386L243,388L239,391L236,397L238,405L238,412L233,411L224,407L213,407L209,405L204,396L199,396L190,402L177,403L172,406L171,410L172,414L179,421L177,427L170,430L164,422L161,415L157,414L151,416L150,425L153,430L157,437L150,444L149,449L144,453L132,445L133,439L139,433L140,427L138,423L119,439L108,455L103,454L100,450L97,448L85,459L82,468L78,468L76,464L76,457L74,450L61,440L56,432L59,427L69,430L77,429L76,425L73,423L79,421L83,416L79,415L73,418L69,416L67,405L61,394L58,383L63,376L67,366L72,352L75,347L82,344L85,340L81,338L74,336L74,332L79,330L84,325L93,320L96,309L94,306L88,304L89,298L91,294L91,292L83,285L79,279L80,271L79,261L79,251L79,246L76,235L74,224L70,225L66,228L53,224L48,224L47,216L51,205L63,196L69,195L74,191L82,190L91,196L99,197L104,208L106,210L107,206L113,202L115,198L114,196L106,194L99,181L98,175L96,172L100,161L92,149L88,145L88,134L84,127L82,123L81,116L82,113L85,112ZM263,419L255,425L244,417L242,412L249,405L256,398L261,397ZM206,418L205,428L199,429L196,422L192,425L190,425L187,418L187,411L194,407L198,409L204,411ZM53,462L48,464L45,461L42,459L44,455L52,446L54,443L62,445L65,449L61,457ZM77,114L76,128L72,128L69,126L67,124L64,110L68,105L75,109ZM96,465L98,470L91,469L88,464L88,460L92,460ZM184,438L183,441L179,436L183,431ZM68,245L67,252L62,247L60,232L66,237ZM48,426L47,428L43,428L39,421L38,415L34,412L40,407L48,416ZM444,141L441,145L436,141L435,138L438,135L443,134L446,136ZM61,578L57,580L54,579L53,578L48,572L47,569L50,563L62,554L91,545L97,545L109,549L111,556L109,562L107,566L93,573L82,576Z"};
  const SITES=[
    {name:'본사',g:0,addr:'경기도 성남시 수정구 금토로40번길 22',postal:'13453',tel:'031-5178-3300',fax:'02-574-5073',
      transit:'신분당선 판교역 2번 출구 → 마을버스 누리2 승차, 밸리마을 금토동 삼거리 하차\n또는 9409 버스로 판교테크노밸리 하차 후 도보 약 4분, ‘기업지원허브’ 정류장에서 누리2 승차',photo:'contact-map.jpg'},
    {name:'여주공장',g:0,addr:'경기도 여주시 가남읍 여주남로 872-23',postal:'12661',tel:'031-881-6800',fax:'031-881-0115'},
    {name:'원주공장',g:0,addr:'강원도 원주시 지정면 신평로 77',tel:'033-813-0991',fax:'033-813-0994'},
    {name:'충청지점',g:1,addr:'대전광역시 대덕구 한밭대로 1144',postal:'34427',tel:'042-483-4275'},
    {name:'전주지점',g:1,addr:'전라북도 전주시 완산구 마전1길 12-8 3층',postal:'54962',tel:'063-236-6775'},
    {name:'광주지점',g:1,addr:'광주광역시 북구 하남대로 695 4층',postal:'61273',tel:'062-522-6181'},
    {name:'대구지점',g:1,addr:'대구광역시 북구 옥산로 108, 5층',postal:'41594',tel:'053-751-1683'},
    {name:'부산지점',g:1,addr:'부산광역시 금정구 부곡로 140 6층 601호',postal:'46271',tel:'051-441-6411'}];
  const GROUPS=['본사·공장','전국 지점'];
  let LOC={g:0,i:0};
  const naver=a=>'https://map.naver.com/p/search/'+encodeURIComponent(a);
  const fullAddr=s=>s.addr+(s.postal?` (우)${s.postal}`:'');
  function pLocation(){
    return BC.shell('contact','contact-location','오시는 길',
      `<div class="ct-loc">${head('LOCATION','오시는 길')}
        <div class="seg gap8" role="tablist" aria-label="사업장 구분">${GROUPS.map((g,i)=>`<button class="tab" role="tab" id="ctLg${i}" aria-controls="ctLocList" aria-selected="${!i}" data-ct-grp="${i}">${g}</button>`).join('')}</div>
        <div class="ct-board">
          <div class="ct-side"><div id="ctLocList" role="tabpanel"></div></div>
          <div class="ct-mapbox"><svg class="ct-kmap" viewBox="${KMAP.viewBox}" role="img" aria-label="전국 사업장 위치 지도">
            <path class="land" d="${KMAP.d}"/>
            ${SITES.map((s,i)=>{const [x,y]=KMAP.pts[s.name];return `<g class="pin" data-ct-pin="${i}" tabindex="0" role="button" aria-label="${s.name} 선택" transform="translate(${x} ${y})"><circle class="halo" r="14"/><circle class="dot" r="5"/><text class="lb" x="0" y="-20" text-anchor="middle">${s.name}</text></g>`}).join('')}
          </svg></div>
        </div></div>`);
  }
  function locShow(){
    const list=SITES.map((s,i)=>[s,i]).filter(([s])=>s.g===LOC.g);
    if(SITES[LOC.i].g!==LOC.g)LOC.i=list[0][1];
    $$('[data-ct-grp]').forEach((b,j)=>b.setAttribute('aria-selected',j===LOC.g));
    $('#ctLocList').setAttribute('aria-labelledby','ctLg'+LOC.g);
    $('#ctLocList').innerHTML=`<ul class="ct-sites fade">${list.map(([s,i])=>{const on=i===LOC.i;return `<li class="ct-site${on?' on':''}">
      <button type="button" class="ct-site-h" data-ct-site="${i}" aria-expanded="${on}"><span class="t-sub">${s.name}</span><span class="t-label c-navy80">${esc(s.addr)}</span></button>
      ${on?`<div class="ct-site-b"><dl class="ct-sdl">
          <div><dt>주소</dt><dd>${esc(fullAddr(s))}</dd></div>
          <div><dt>전화</dt><dd><a href="tel:${s.tel}">${s.tel}</a></dd></div>
          ${s.fax?`<div><dt>팩스</dt><dd>${s.fax}</dd></div>`:''}
          ${s.transit?`<div><dt>대중교통</dt><dd>${br(s.transit)}</dd></div>`:''}</dl>
        <div class="btns"><button type="button" class="btn ct-s36 btn-outline" data-ct-copy="${esc(fullAddr(s))}">주소 복사</button>
          <a class="btn ct-s36 btn-outline" href="${naver(s.addr)}" target="_blank" rel="noopener">네이버 지도에서 보기 <span aria-hidden="true">↗</span></a></div>
        ${s.photo?`<div class="ct-hqmap media"><img src="assets/${s.photo}" alt="${s.name} 주변 지도" loading="lazy"></div>`:''}</div>`:''}</li>`}).join('')}</ul>`;
    $$('[data-ct-pin]').forEach(p=>{const i=+p.dataset.ctPin, on=i===LOC.i; p.classList.toggle('on',on); p.classList.toggle('dim',SITES[i].g!==LOC.g); p.setAttribute('aria-pressed',on); if(on)p.parentNode.appendChild(p);});
  }
  function locPick(i){ LOC={g:SITES[i].g,i}; locShow(); }

  /* ── 페이지 등록 ── */
  const reg=(r,lnb,label,render,init)=>BC.page(r,{menu:'contact',lnb,label,render,init});
  reg('contact-types','contact-types','문의 유형',pTypes);
  Object.entries(FORMS).forEach(([k,fm])=>reg(fm.route,'contact-types',fm.type,()=>pForm(k),()=>{const f=$('[data-ct-form]');restore(f)}));
  reg('contact-check','contact-types','내 문의 확인',pCheck,()=>{CK={...CK,view:'form',list:[],sel:null};ckRender()});
  reg('contact-info','contact-info','연락처',pInfo);
  reg('contact-location','contact-location','오시는 길',pLocation,()=>{LOC={g:0,i:0};locShow()});

  /* ── 이벤트 위임 ── */
  function copyText(btn,txt){
    const done=()=>{const o=btn.innerHTML; btn.textContent='✓ 복사됨'; setTimeout(()=>{btn.innerHTML=o},1600)};
    try{ navigator.clipboard.writeText(txt).then(done,done); }catch(e){ done(); }
  }
  document.addEventListener('click',e=>{
    const t=e.target.closest('[data-ct-opt],[data-ct-untoken],[data-ct-save],[data-ct-close],[data-ct-copy],[data-ct-via],[data-ct-filter],[data-ct-page],[data-ct-open],[data-ct-back],[data-ct-site],[data-ct-grp],[data-ct-pin],[data-ct-terms],[aria-disabled="true"].ct-s36');
    if(!t)return; const d=t.dataset;
    if(t.getAttribute('aria-disabled')==='true'){e.preventDefault();return}
    if(d.ctTerms!==undefined){e.preventDefault();return}
    if(d.ctOpt!==undefined){
      const w=t.closest('.ct-f');
      if(t.hasAttribute('aria-pressed')) t.setAttribute('aria-pressed',t.getAttribute('aria-pressed')!=='true');
      else $$('[data-ct-opt]',w).forEach(b=>b.setAttribute('aria-checked',b===t));
      if(w.classList.contains('err')&&readField(w))setErr(w,false);
      if(w.dataset.ctK==='reply'){const em=$('[data-ct-k="email"]',t.closest('form')); em.classList.contains('err')&&setErr(em,false)}
    }
    else if(d.ctUntoken!==undefined){const w=t.closest('.ct-f');setToken(w,'');$('input',w).focus()}
    else if(d.ctSave!==undefined){const f=t.closest('form');DRAFT[f.dataset.ctForm]=snapshot(f);t.textContent='임시 저장 ✓';setTimeout(()=>{t.textContent='임시 저장'},1600)}
    else if(d.ctCopy){copyText(t,d.ctCopy)}
    else if(d.ctClose!==undefined){closeModal()}
    else if(d.ctVia){CK.via=d.ctVia;const no=$('#ctNo').value;ckRender();$('#ctNo').value=no;$(`[data-ct-via="${d.ctVia}"]`).focus()}
    else if(d.ctFilter){CK.filter=d.ctFilter;CK.page=1;ckRender()}
    else if(d.ctPage&&!t.disabled){CK.page=+d.ctPage;ckRender()}
    else if(d.ctOpen){CK.sel=+d.ctOpen;CK.view='detail';ckRender();scrollTop()}
    else if(d.ctBack!==undefined){CK.view='list';ckRender();scrollTop()}
    else if(d.ctSite){locPick(+d.ctSite)}
    else if(d.ctGrp){LOC.g=+d.ctGrp;locShow()}
    else if(d.ctPin){locPick(+d.ctPin)}
  });
  document.addEventListener('submit',e=>{
    const f=e.target;
    if(f.matches('[data-ct-form]')){e.preventDefault(); if(validate(f))confirmModal(f);}
    else if(f.matches('[data-ct-lookup]')){e.preventDefault(); lookup(f);}
  });
  document.addEventListener('input',e=>{
    const t=e.target, w=t.closest&&t.closest('.ct-f'); if(!w||!t.closest('#pageHost'))return;
    if(t.matches('[data-ct-date]')){const v=t.value.replace(/\D/g,'').slice(0,8);t.value=[v.slice(0,4),v.slice(4,6),v.slice(6,8)].filter(Boolean).join('.')}
    if(t.tagName==='TEXTAREA'){$('[data-ct-count]',w).textContent=t.value.length+' / 1000'}
    if(w.classList.contains('err')&&readField(w))setErr(w,false);
  });
  document.addEventListener('change',e=>{
    const t=e.target, w=t.closest&&t.closest('.ct-f'); if(!w)return;
    if(t.matches('.ct-prod input')&&t.value.trim()){setToken(w,t.value.trim());w.classList.contains('err')&&setErr(w,false)}
    if(t.matches('[data-ct-file]')){
      const ok=[...t.files].filter(f=>f.size<=10*1024*1024); w._files=(w._files||[]).concat(ok); t.value='';
      $('[data-ct-files]',w).innerHTML=w._files.map((f,i)=>`<li><span>${esc(f.name)}</span><button type="button" data-ct-rmfile="${i}" aria-label="${esc(f.name)} 빼기">×</button></li>`).join('');
    }
    if(t.type==='checkbox'&&t.checked&&w.classList.contains('err'))setErr(w,false);
  });
  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-ct-rmfile]'); if(!b)return; const w=b.closest('.ct-f');
    w._files.splice(+b.dataset.ctRmfile,1); b.closest('li').remove();
    $$('[data-ct-rmfile]',w).forEach((x,i)=>x.dataset.ctRmfile=i);
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Enter'&&e.target.matches&&e.target.matches('.ct-prod input')&&e.target.value.trim()){e.preventDefault();const w=e.target.closest('.ct-f');setToken(w,e.target.value.trim());setErr(w,false)}
  });
  document.addEventListener('keydown',e=>{
    if((e.key==='Enter'||e.key===' ')&&e.target.matches&&e.target.matches('[data-ct-pin]')){e.preventDefault();const i=+e.target.dataset.ctPin;locPick(i);const p=$(`[data-ct-pin="${i}"]`);p&&p.focus()}
  });
})();
