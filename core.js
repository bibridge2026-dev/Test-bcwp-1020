/* ───────── 공통: 헬퍼 · 메뉴 등록 · Page Hero · LNB · 라우터 ───────── */
(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const br=s=>esc(s).replace(/\n/g,'<br>');
  /* 사진 자리: 파일이 없으면 톤 배경만 보임. cls에 'light'를 주면 밝은 자리 */
  const img=(file,cls='',alt='')=>`<div class="media ${cls}">${file?`<img src="assets/${file}" alt="${esc(alt)}" loading="lazy" onerror="this.classList.add('gone')">`:''}</div>`;
  const ext='<span aria-hidden="true">↗</span>';
  const arrow='<span class="ar">→</span>';
  const RECRUIT='https://bcwp.recruiter.co.kr';
  /* 섹션 머리: eyebrow · 40 제목 · 오른쪽 설명/링크 */
  function head(eyebrow,title,desc,linkHtml){
    return `<div class="section-head"><div class="left"><p class="eyebrow">${esc(eyebrow)}</p><h2 class="t-headline">${br(title)}</h2></div>
      ${desc||linkHtml?`<div class="right${!desc?' end':''}">${desc?`<p class="t-body c-navy80">${br(desc)}</p>`:''}${linkHtml||''}</div>`:''}</div>`;
  }
  const tlink=(label,href,extern)=>`<a class="tlink" href="${href}"${extern?' target="_blank" rel="noopener"':''}>${esc(label)} ${extern?ext:arrow}</a>`;
  /* 기업 확인 표시 (디자인 요소 아님) */
  /* 10.20: 내부 확인 표시는 화면에 내보내지 않음 */
  const flag=()=>'';

  const MENUS={}, PAGES={}, SPECIAL=[], LABEL_ROUTE={};
  /* menu: {key, gnb, name, eyebrow, title, desc, hero, items:[[route,label],...]} */
  function menu(m){ MENUS[m.key]=m; m.items.forEach(([r,l])=>{LABEL_ROUTE[m.name+'|'+norm(l)]=r; LABEL_ROUTE['*|'+norm(l)]=LABEL_ROUTE['*|'+norm(l)]||r;}); }
  const norm=l=>String(l).replace(/[\s·↗]/g,'');
  /* 메가메뉴·푸터: (메뉴 이름, 링크 이름) → 주소 */
  function routeOf(label,menuName){
    const r=LABEL_ROUTE[(menuName||'*')+'|'+norm(label)]||(!menuName&&LABEL_ROUTE['*|'+norm(label)]);
    if(r)return '#'+r;
    const m=Object.values(MENUS).find(x=>norm(x.name)===norm(label)); return m?'#'+m.items[0][0]:'#';
  }
  /* page: {menu, lnb(활성 탭 route), label, render(), init()} */
  function page(route,p){ PAGES[route]=p; }

  function hero(m,label){
    return `<section class="page-hero">${img(m.hero)}
      <div class="wrap">
        <p class="crumb"><a href="#home">홈</a> / <a href="#${m.items[0][0]}">${esc(m.name)}</a> / ${esc(label)}</p>
        <div class="hero-row">
          <div class="left"><p class="eyebrow">${esc(m.eyebrow)}</p><h1 class="t-headline">${br(m.title)}</h1></div>
          <div class="right">${m.desc?`<p class="t-body">${br(m.desc)}</p>`:''}${m.heroLink||''}</div>
        </div>
      </div></section>`;
  }
  function lnb(m,cur){
    return `<nav class="lnb" aria-label="${esc(m.name)} 하위 메뉴"><div class="wrap">${m.items.map(([r,l])=>
      `<a class="tab" href="#${r}"${r===cur?' aria-current="page"':''}>${esc(l)}</a>`).join('')}</div></nav>`;
  }
  /* 하위 페이지 공통 틀: Page Hero + LNB + 본문(1200) */
  function shell(menuKey,lnbRoute,label,body,opt={}){
    const m=MENUS[menuKey];
    return hero(m,label)+lnb(m,lnbRoute)+`<div class="pg-body${opt.cls?' '+opt.cls:''}">${opt.full?body:`<div class="wrap">${body}</div>`}</div>`;
  }

  /* ── 라우터 ── */
  let shown=null, navCount=0;
  const state={lastPage:'home', fromApp:false};
  /* 화면 전환: 같은 메뉴 안에서 LNB 탭을 옮기면 LNB 위치를 그대로 두고 본문만 바꾸고,
     다른 메뉴로 가면 맨 위에서 새 화면이 부드럽게 나타남 (부드러운 스크롤로 위로 끌려 올라가는 느낌 제거) */
  const jump=y=>{const h=document.documentElement, b=h.style.scrollBehavior; h.style.scrollBehavior='auto'; window.scrollTo(0,y); h.style.scrollBehavior=b;};
  function show(route){
    if(route===shown)return;
    const prev=shown; shown=route;
    const home=$('#pageHome'), host=$('#pageHost');
    const prevMenu=prev&&prev!=='home'&&PAGES[prev]?PAGES[prev].menu:null, nextMenu=route!=='home'?PAGES[route].menu:null;
    const oldLnb=$('.lnb',host), lnbTop=oldLnb?oldLnb.getBoundingClientRect().top+scrollY:0;
    const keep=prevMenu&&prevMenu===nextMenu&&oldLnb&&scrollY>lnbTop-8;
    if(route==='home'){home.hidden=false; host.hidden=true; host.innerHTML='';}
    else{const p=PAGES[route]; home.hidden=true; host.hidden=false; host.innerHTML=p.render(); p.init&&p.init();}
    const gnb=route==='home'?'':(MENUS[PAGES[route].menu]||{}).gnb;
    $$('[data-menu]').forEach(n=>n.classList.toggle('current',n.dataset.menu===gnb));
    const cur=$('.lnb [aria-current]');
    document.title=route==='home'?'비씨월드제약':((PAGES[route].label||(cur&&cur.textContent)||'')+' · 비씨월드제약');
    const lnb=$('.lnb',host);
    if(keep&&lnb){ jump(lnb.getBoundingClientRect().top+scrollY-8); animIn($('.pg-body',host)); }
    else{ jump(0); animIn(route==='home'?home:host); }
  }
  function animIn(el){ if(!el)return; el.classList.remove('pg-enter'); void el.offsetWidth; el.classList.add('pg-enter'); }
  function route(){
    const h=decodeURIComponent(location.hash.slice(1));
    for(const sp of SPECIAL){ if(sp.test(h)){ if(!shown)show(sp.base); state.fromApp=navCount>0; navCount++; if(!sp.open(h)){sp.close();show(sp.base)} return; } }
    SPECIAL.forEach(sp=>sp.close());
    const r=PAGES[h]?h:'home'; state.lastPage=r; show(r); navCount++;
  }
  function leaveSpecial(){ if(state.fromApp) history.back(); else location.hash=state.lastPage; }
  function start(){ addEventListener('hashchange',route); route(); }

  window.BC={$,$$,esc,br,img,ext,arrow,RECRUIT,head,tlink,flag,menu,page,shell,routeOf,MENUS,PAGES,SPECIAL,leaveSpecial,start,state};
})();
