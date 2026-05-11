'use strict';

/* =============================================
   STATE
   ============================================= */
let currentType   = 'colaborador'; // 'colaborador' | 'empresa'
let currentAction = 'login';       // 'login' | 'register'

/* =============================================
   MODAL
   ============================================= */
function openModal(type, action) {
  currentType   = type   || 'colaborador';
  currentAction = action || 'login';
  renderModal();
  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
  // reset success state after transition
  setTimeout(() => {
    document.getElementById('successState').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('registerForm').classList.add('hidden');
  }, 200);
}

function renderModal() {
  // type tabs
  document.getElementById('tabColaborador').classList.toggle('active', currentType === 'colaborador');
  document.getElementById('tabEmpresa').classList.toggle('active', currentType === 'empresa');

  // action tabs
  document.getElementById('actionLogin').classList.toggle('active', currentAction === 'login');
  document.getElementById('actionRegister').classList.toggle('active', currentAction === 'register');

  // forms
  document.getElementById('loginForm').classList.toggle('hidden', currentAction !== 'login');
  document.getElementById('registerForm').classList.toggle('hidden', currentAction !== 'register');
  document.getElementById('successState').classList.add('hidden');

  // empresa vs colaborador register fields
  document.getElementById('colabFields').classList.toggle('hidden', currentType !== 'colaborador');
  document.getElementById('empresaFields').classList.toggle('hidden', currentType !== 'empresa');

  // copy
  const isEmpresa = currentType === 'empresa';
  document.getElementById('loginTitle').textContent   = isEmpresa ? 'Acesso Empresa' : 'Bem-vindo de volta';
  document.getElementById('loginSub').textContent     = isEmpresa ? 'Entre na conta da sua empresa' : 'Entre na sua conta de colaborador';
  document.getElementById('registerTitle').textContent = isEmpresa ? 'Registar Empresa' : 'Criar Conta';
  document.getElementById('registerSub').textContent  = isEmpresa ? 'Publique vagas e encontre talento' : 'Registe-se como colaborador';
}

function switchType(type) {
  currentType = type;
  renderModal();
}

function switchAction(action) {
  currentAction = action;
  renderModal();
}

/* =============================================
   FORM HANDLERS
   ============================================= */
function handleLogin(e) {
  e.preventDefault();
  showSuccess(
    currentType === 'empresa' ? 'Acesso concedido!' : 'Bem-vindo de volta!',
    currentType === 'empresa'
      ? 'Acedeu à sua conta de empresa. Publique vagas e encontre os melhores talentos.'
      : 'Explore milhares de oportunidades e candidate-se às vagas que combinam consigo.'
  );
}

function handleRegister(e) {
  e.preventDefault();
  showSuccess(
    currentType === 'empresa' ? 'Empresa registada!' : 'Conta criada!',
    currentType === 'empresa'
      ? 'A sua empresa está registada. Já pode publicar vagas e aceder à base de candidatos.'
      : 'Bem-vindo ao TalentoHub! Complete o seu perfil para aparecer nos resultados de recrutadores.'
  );
}

function showSuccess(title, msg) {
  document.getElementById('loginForm').classList.add('hidden');
  document.getElementById('registerForm').classList.add('hidden');
  document.getElementById('successTitle').textContent = title;
  document.getElementById('successMsg').textContent   = msg;
  document.getElementById('successState').classList.remove('hidden');
}

/* =============================================
   SEARCH
   ============================================= */
function handleSearch(e) {
  e.preventDefault();
  const query    = document.getElementById('searchQuery').value.trim();
  const location = document.getElementById('searchLocation').value.trim();
  const section  = document.getElementById('vagas');
  if (section) section.scrollIntoView({ behavior: 'smooth' });
  filterJobs(query, location);
}

/* =============================================
   JOB DATA
   ============================================= */
const JOBS = [
  { id: 1, title: 'Engenheiro(a) de Software Sénior', company: 'NovaTech', logo: 'NT', location: 'Lisboa', type: 'Full-time', salary: '3.500 – 5.000 €/mês', tags: ['React', 'Node.js', 'AWS'], badge: 'new', posted: 'Hoje' },
  { id: 2, title: 'Designer UX/UI', company: 'CreativeHub', logo: 'CH', location: 'Porto', type: 'Full-time', salary: '2.200 – 3.200 €/mês', tags: ['Figma', 'Design System', 'Prototipagem'], badge: 'new', posted: 'Ontem' },
  { id: 3, title: 'Responsável de Marketing Digital', company: 'GroupMedia', logo: 'GM', location: 'Lisboa', type: 'Full-time', salary: '2.000 – 2.800 €/mês', tags: ['SEO', 'SEM', 'Analytics'], badge: '', posted: '2 dias' },
  { id: 4, title: 'Analista de Dados', company: 'DataCore', logo: 'DC', location: 'Remoto', type: 'Full-time', salary: '2.800 – 4.000 €/mês', tags: ['Python', 'SQL', 'Power BI'], badge: 'new', posted: 'Hoje' },
  { id: 5, title: 'Técnico(a) de Recursos Humanos', company: 'FinServe', logo: 'FS', location: 'Braga', type: 'Full-time', salary: '1.600 – 2.200 €/mês', tags: ['Recrutamento', 'Formação', 'RGPD'], badge: '', posted: '3 dias' },
  { id: 6, title: 'Gestor(a) de Conta Comercial', company: 'Logística Plus', logo: 'LP', location: 'Setúbal', type: 'Full-time', salary: '1.800 – 2.500 €/mês', tags: ['Vendas', 'CRM', 'B2B'], badge: '', posted: '4 dias' },
];

function filterJobs(query, location) {
  const q = query.toLowerCase();
  const l = location.toLowerCase();
  return JOBS.filter(j => {
    const matchQ = !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.tags.some(t => t.toLowerCase().includes(q));
    const matchL = !l || j.location.toLowerCase().includes(l);
    return matchQ && matchL;
  });
}

function renderJobs(jobs) {
  const grid = document.getElementById('jobsGrid');
  if (!jobs.length) {
    grid.innerHTML = '<p style="color:var(--gray);grid-column:1/-1;text-align:center;padding:40px 0">Nenhuma vaga encontrada para esta pesquisa.</p>';
    return;
  }
  grid.innerHTML = jobs.map(j => `
    <article class="job-card" onclick="openModal('colaborador','register')" title="Candidatar-me">
      <div class="job-card__top">
        <div class="job-card__logo">${j.logo}</div>
        ${j.badge ? `<span class="job-card__badge job-card__badge--${j.badge}">${j.badge === 'new' ? 'Novo' : j.badge}</span>` : ''}
      </div>
      <div class="job-card__title">${j.title}</div>
      <div class="job-card__company">${j.company} · ${j.location}</div>
      <div class="job-card__tags">
        <span class="job-card__tag">${j.type}</span>
        ${j.tags.map(t => `<span class="job-card__tag">${t}</span>`).join('')}
      </div>
      <div class="job-card__footer">
        <span class="job-card__salary">${j.salary}</span>
        <span>${j.posted}</span>
      </div>
    </article>
  `).join('');
}

/* =============================================
   NAV BURGER
   ============================================= */
function toggleMenu() {
  document.querySelector('.navbar__links').classList.toggle('open');
}

// Close menu on outside click
document.addEventListener('click', e => {
  const nav = document.querySelector('.navbar__links');
  const burger = document.querySelector('.navbar__burger');
  if (nav && nav.classList.contains('open') && !nav.contains(e.target) && !burger.contains(e.target)) {
    nav.classList.remove('open');
  }
});

// Close modal on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* =============================================
   INIT
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  renderJobs(JOBS);
});
