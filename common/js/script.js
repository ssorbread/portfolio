(() => {
  AOS.init();
  
  const $ = (s) => document.querySelector(s);

  /* ---------- Nav 스크롤 ---------- */
  const nav = $('.nav');
  addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 10), { passive: true });

  /* =========================================================
     AI 채팅 히어로 (키워드 기반 답변 + 스트리밍 타이핑 효과)
     ========================================================= */
  const answers = [
    { keys: ['소개', '누구', '안녕', 'about'],
      text: `안녕하세요! 웹퍼블리셔 김소라입니다.\n웹표준·웹접근성을 지키며 디자이너의 픽셀 단위를 구현하고, 개발자의 스타일에 맞춰 깔끔한 구조를 만듭니다.`,
      link: ['#about', '소개 자세히 보기 →'] },
    { keys: ['기술', '스킬', 'skill', '다룰', '툴', '언어'],
      text: 'HTML5 · CSS3 · JavaScript · jQuery · GSAP등을 주로 다루며 Figma를 이용한 협업이 가능합니다.',
      link: ['#skills', '보유 기술 보기 →'] },
    { keys: ['프로젝트', '작업', '포트폴리오', 'work', '경력', '사례'],
      text: '반응형 웹사이트, 앱, 이벤트페이지 등 다양한 프로젝트를 진행했습니다.',
      link: ['#work', '대표 프로젝트 보기 →'] },
    { keys: ['연락', '문의', '컨택', 'contact', '메일', '문자', '전화', '협업', '채용'],
      text: `언제나 환영합니다! 010-5471-5429로 연락주세요!`,
      link: ['#contact', 'Contact 바로가기 →'] },
  ];
  const fallback = {
    text: '자세한 내용은 직접 만나서 이야기 나누고 싶습니다. 아래 연락처로 연락주세요!',
    link: ['#contact', 'Contact 바로가기 →'],
  };

  const chat = $('#chat');
  let busy = false;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  function addMsg(role, html = '') {
    const el = document.createElement('div');
    el.className = `msg ${role}`;
    if (role === 'ai') el.innerHTML = '<span class="avatar">빵</span><div class="bubble"></div>';
    else el.textContent = html;
    chat.appendChild(el);
    chat.scrollTop = chat.scrollHeight;
    return el;
  }

  async function ask(q) {
    if (busy || !q.trim()) return;
    busy = true;
    addMsg('user', q);
    const ai = addMsg('ai');
    const bubble = ai.querySelector('.bubble');
    bubble.innerHTML = '<span class="dots"><span></span><span></span><span></span></span>';
    await sleep(700);

    const lower = q.toLowerCase();
    const a = answers.find((x) => x.keys.some((k) => lower.includes(k))) || fallback;

    bubble.textContent = '';
    const textNode = document.createTextNode('');
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    bubble.append(textNode, cursor);
    for (const ch of a.text) {
      textNode.data += ch;
      chat.scrollTop = chat.scrollHeight;
      await sleep(ch === '\n' ? 120 : 18);
    }
    cursor.remove();
    if (a.link) {
      const link = document.createElement('a');
      link.href = a.link[0];
      link.textContent = a.link[1];
      bubble.append(document.createElement('br'), link);
    }
    chat.scrollTop = chat.scrollHeight;
    busy = false;
  }

  $('#promptForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = $('#promptInput');
    ask(input.value);
    input.value = '';
  });
  document.querySelectorAll('.chips button').forEach((b) =>
    b.addEventListener('click', () => ask(b.dataset.q))
  );

  // placeholder 타이핑 순환
  const phs = ['어떤 기술을 다룰 수 있나요?', '대표 프로젝트 보여주세요', '협업 문의는 어떻게 하나요?'];
  let pi = 0;
  setInterval(() => { pi = (pi + 1) % phs.length; $('#promptInput').placeholder = `예) ${phs[pi]}`; }, 3000);

  /* ---------- 스크롤 등장 + 카운터 ---------- */
  document.querySelectorAll('.section > *').forEach((el) => el.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      en.target.querySelectorAll('[data-count]').forEach((n) => {
        const end = +n.dataset.count; const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min((t - t0) / 1200, 1);
          n.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
      io.unobserve(en.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

})();
