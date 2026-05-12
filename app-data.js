'use strict';
/* =============================================
   PORTAL CARREIRAS — DATA LAYER v2
   ============================================= */

const DB_KEYS = {
  users:            'pc_users',
  jobs:             'pc_jobs',
  applications:     'pc_applications',
  savedJobs:        'pc_saved_jobs',
  jobAlerts:        'pc_job_alerts',
  reviews:          'pc_reviews',
  messages:         'pc_messages',
  interviews:       'pc_interviews',
  searchHistory:    'pc_search_history',
  session:          'pc_session',
  hiddenJobs:       'pc_hidden_jobs',
  interviewReviews: 'pc_interview_reviews',
  jobStats:         'pc_job_stats',
  events:           'pc_events',
  qa:               'pc_qa',
  notifications:    'pc_notifications',
  skillTests:       'pc_skill_tests',
};

/* =============================================
   DEMO DATA
   ============================================= */
const DEMO_USERS = [
  {
    id: 'u1', type: 'colaborador',
    email: 'joao@email.com', password: 'demo123',
    name: 'João', surname: 'Silva',
    role: 'Engenheiro de Software Sénior', location: 'Lisboa',
    phone: '+351 912 345 678',
    about: 'Engenheiro de software com mais de 5 anos de experiência em desenvolvimento web fullstack. Apaixonado por criar produtos digitais escaláveis e de alto desempenho.',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'PostgreSQL'],
    experience: [
      { company: 'TechStart Lda.', role: 'Engenheiro Full-Stack', period: '2021 – Presente', desc: 'Desenvolvimento de plataforma SaaS com React e Node.js.' },
      { company: 'DevAgency', role: 'Desenvolvedor Front-End', period: '2019 – 2021', desc: 'Interfaces responsivas para clientes enterprise.' },
    ],
    education: [{ school: 'Instituto Superior Técnico', degree: 'Mestrado em Engenharia Informática', year: '2019' }],
    avatar: 'JS',
  },
  {
    id: 'u2', type: 'colaborador',
    email: 'ana@email.com', password: 'demo123',
    name: 'Ana', surname: 'Ferreira',
    role: 'Designer UX/UI', location: 'Porto',
    phone: '+351 923 456 789',
    about: 'Designer focada em criar experiências digitais centradas no utilizador. Especialista em Figma e sistemas de design.',
    skills: ['Figma', 'Adobe XD', 'Design System', 'User Research', 'Prototipagem', 'CSS'],
    experience: [
      { company: 'CreativeHub', role: 'UX Designer', period: '2022 – Presente', desc: 'Design de produtos digitais para clientes dos sectores de saúde e finanças.' },
    ],
    education: [{ school: 'IADE – Universidade Europeia', degree: 'Licenciatura em Design de Comunicação', year: '2020' }],
    avatar: 'AF',
  },
  {
    id: 'u3', type: 'colaborador',
    email: 'carlos@email.com', password: 'demo123',
    name: 'Carlos', surname: 'Mendes',
    role: 'Analista de Dados', location: 'Remoto',
    phone: '+351 934 567 890',
    about: 'Analista de dados com forte background em Python e visualização. Experiência em retalho e logística.',
    skills: ['Python', 'SQL', 'Power BI', 'Tableau', 'Machine Learning', 'Excel'],
    experience: [
      { company: 'DataCore Analytics', role: 'Data Analyst', period: '2020 – Presente', desc: 'Análise de dados de vendas e dashboards executivos.' },
    ],
    education: [{ school: 'Universidade Nova de Lisboa', degree: 'Licenciatura em Gestão e Análise de Dados', year: '2020' }],
    avatar: 'CM',
  },
  {
    id: 'e1', type: 'empresa',
    email: 'rh@novatech.pt', password: 'demo123',
    companyName: 'NovaTech', sector: 'Tecnologia',
    location: 'Lisboa', website: 'www.novatech.pt',
    about: 'Empresa de tecnologia focada em soluções cloud e inteligência artificial. Equipa de 120 pessoas em crescimento constante.',
    benefits: 'Trabalho remoto parcial · Seguro de saúde · Orçamento de formação anual · Stock options',
    culture: 'Apostamos em autonomia, aprendizagem contínua e impacto real. Valorizamos diversidade e inclusão.',
    size: '51-200 colaboradores', founded: '2015',
    avatar: 'NT', coverColor: '#0050c8',
  },
  {
    id: 'e2', type: 'empresa',
    email: 'rh@creativehub.pt', password: 'demo123',
    companyName: 'CreativeHub', sector: 'Design & Criatividade',
    location: 'Porto', website: 'www.creativehub.pt',
    about: 'Agência de design e comunicação digital. Trabalhamos com marcas nacionais e internacionais.',
    benefits: 'Equipamento Apple · Horário flexível · Ambiente criativo · Eventos de equipa',
    culture: 'Criatividade sem limites. Cada projecto é uma oportunidade de fazer algo extraordinário.',
    size: '11-50 colaboradores', founded: '2018',
    avatar: 'CH', coverColor: '#7c3aed',
  },
  {
    id: 'e3', type: 'empresa',
    email: 'rh@datacore.pt', password: 'demo123',
    companyName: 'DataCore', sector: 'Data & Analytics',
    location: 'Remoto', website: 'www.datacore.pt',
    about: 'Consultora especializada em Data Analytics e Business Intelligence para empresas Fortune 500.',
    benefits: '100% Remoto · Bónus anual · Formação certificada · Equipamento fornecido',
    culture: 'Data-driven em tudo o que fazemos. Resultados mensuráveis, equipa distribuída, cultura de excelência.',
    size: '11-50 colaboradores', founded: '2019',
    avatar: 'DC', coverColor: '#059669',
  },
];

const DEMO_JOBS = [
  {
    id: 'j1', companyId: 'e1', companyName: 'NovaTech', companyAvatar: 'NT',
    title: 'Engenheiro(a) de Software Sénior',
    description: 'Procuramos um(a) engenheiro(a) sénior para integrar a nossa equipa de produto.\n\nResponsabilidades:\n• Desenvolvimento fullstack (React + Node.js)\n• Code reviews e mentoria\n• Decisões de arquitectura\n• Colaboração com Product Management\n\nO que oferecemos:\n• Trabalho remoto parcial\n• Seguro de saúde\n• Orçamento de formação',
    location: 'Lisboa', type: 'Full-time', salary: '3.500 – 5.000 €/mês', salaryMin: 3500, salaryMax: 5000,
    experience: 'Sénior (5+ anos)', tags: ['React', 'Node.js', 'AWS'],
    featured: true, posted: '2026-04-01', status: 'active',
    screeningQuestions: [
      { id: 'sq1', question: 'Quantos anos de experiência tem com React?', type: 'text' },
      { id: 'sq2', question: 'Tem experiência com arquitecturas cloud (AWS/GCP/Azure)?', type: 'yesno' },
    ],
  },
  {
    id: 'j2', companyId: 'e2', companyName: 'CreativeHub', companyAvatar: 'CH',
    title: 'Designer UX/UI',
    description: 'Estamos à procura de um(a) designer com forte portfólio e paixão por design centrado no utilizador.\n\nResponsabilidades:\n• Design de interfaces web e mobile\n• Manutenção do design system\n• Sessões de user research\n• Prototipagem e testes de usabilidade\n\nO que oferecemos:\n• Equipamento Apple\n• Horário flexível',
    location: 'Porto', type: 'Full-time', salary: '2.200 – 3.200 €/mês', salaryMin: 2200, salaryMax: 3200,
    experience: 'Pleno (2-5 anos)', tags: ['Figma', 'Design System', 'UX Research'],
    featured: false, posted: '2026-04-02', status: 'active',
    screeningQuestions: [
      { id: 'sq3', question: 'Tem portfólio online? Se sim, partilhe o link.', type: 'text' },
    ],
  },
  {
    id: 'j3', companyId: 'e1', companyName: 'NovaTech', companyAvatar: 'NT',
    title: 'Product Manager',
    description: 'Procuramos um(a) Product Manager experiente para liderar o roadmap dos nossos produtos cloud.\n\nResponsabilidades:\n• Definição e priorização do roadmap\n• Gestão de stakeholders\n• Análise de métricas data-driven\n• Colaboração com engenharia e design',
    location: 'Lisboa', type: 'Full-time', salary: '3.000 – 4.500 €/mês', salaryMin: 3000, salaryMax: 4500,
    experience: 'Sénior (5+ anos)', tags: ['Product Management', 'Agile', 'Analytics'],
    featured: true, posted: '2026-04-03', status: 'active',
    screeningQuestions: [],
  },
  {
    id: 'j4', companyId: 'e3', companyName: 'DataCore', companyAvatar: 'DC',
    title: 'Analista de Dados',
    description: 'Oportunidade para um(a) analista de dados apaixonado(a) por transformar dados em insights.\n\nResponsabilidades:\n• Análise exploratória de dados\n• Dashboards em Power BI\n• Modelos preditivos\n• Comunicação a stakeholders não-técnicos',
    location: 'Remoto', type: 'Full-time', salary: '2.800 – 4.000 €/mês', salaryMin: 2800, salaryMax: 4000,
    experience: 'Pleno (2-5 anos)', tags: ['Python', 'SQL', 'Power BI'],
    featured: false, posted: '2026-04-01', status: 'active',
    screeningQuestions: [
      { id: 'sq4', question: 'Tem experiência com Power BI ou Tableau?', type: 'yesno' },
      { id: 'sq5', question: 'Descreva um projecto de dados em que teve impacto mensurável.', type: 'text' },
    ],
  },
  {
    id: 'j5', companyId: 'e1', companyName: 'NovaTech', companyAvatar: 'NT',
    title: 'DevOps Engineer',
    description: 'Integre a nossa equipa de infraestrutura e ajude a escalar os nossos sistemas cloud.\n\nResponsabilidades:\n• Gestão de infraestrutura AWS\n• Pipelines CI/CD\n• Monitorização e observabilidade\n• Optimização de custos cloud',
    location: 'Lisboa', type: 'Full-time', salary: '3.200 – 4.800 €/mês', salaryMin: 3200, salaryMax: 4800,
    experience: 'Pleno (2-5 anos)', tags: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'],
    featured: false, posted: '2026-04-04', status: 'active',
    screeningQuestions: [],
  },
  {
    id: 'j6', companyId: 'e2', companyName: 'CreativeHub', companyAvatar: 'CH',
    title: 'Motion Designer',
    description: 'Procuramos um(a) motion designer para criar animações e conteúdo visual.\n\nResponsabilidades:\n• Animações 2D e motion graphics\n• Conteúdo para redes sociais\n• Colaboração com a equipa criativa',
    location: 'Porto', type: 'Part-time', salary: '1.500 – 2.200 €/mês', salaryMin: 1500, salaryMax: 2200,
    experience: 'Júnior (0-2 anos)', tags: ['After Effects', 'Motion Graphics', 'Premiere'],
    featured: false, posted: '2026-04-05', status: 'active',
    screeningQuestions: [],
  },
];

const DEMO_APPLICATIONS = [
  { id: 'a1', jobId: 'j4', colaboradorId: 'u1', status: 'em_analise', appliedAt: '2026-04-02', note: '', screeningAnswers: { sq4: 'Sim', sq5: 'Implementei dashboard de KPIs que reduziu tempo de reporte 40%.' } },
  { id: 'a2', jobId: 'j3', colaboradorId: 'u1', status: 'pendente',   appliedAt: '2026-04-04', note: '', screeningAnswers: {} },
  { id: 'a3', jobId: 'j2', colaboradorId: 'u2', status: 'aceite',     appliedAt: '2026-03-28', note: 'Parabéns! O vosso perfil correspondeu ao que procuramos.', screeningAnswers: { sq3: 'https://ana.design' } },
  { id: 'a4', jobId: 'j1', colaboradorId: 'u2', status: 'rejeitado',  appliedAt: '2026-03-25', note: 'Obrigado pelo interesse. Seleccionámos outro perfil.', screeningAnswers: { sq1: '4 anos', sq2: 'Sim' } },
  { id: 'a5', jobId: 'j1', colaboradorId: 'u3', status: 'em_analise', appliedAt: '2026-04-03', note: '', screeningAnswers: { sq1: '2 anos', sq2: 'Não' } },
  { id: 'a6', jobId: 'j4', colaboradorId: 'u3', status: 'pendente',   appliedAt: '2026-04-05', note: '', screeningAnswers: {} },
];

const DEMO_SAVED_JOBS = [
  { userId: 'u1', jobId: 'j1', savedAt: '2026-04-03' },
  { userId: 'u1', jobId: 'j5', savedAt: '2026-04-04' },
  { userId: 'u2', jobId: 'j3', savedAt: '2026-04-03' },
];

const DEMO_JOB_ALERTS = [
  { id: 'al1', userId: 'u1', query: 'Engenheiro Software', location: 'Lisboa', createdAt: '2026-04-01', frequency: 'diário' },
  { id: 'al2', userId: 'u2', query: 'Designer', location: '', createdAt: '2026-04-02', frequency: 'semanal' },
];

const DEMO_REVIEWS = [
  { id: 'r1', companyId: 'e1', userId: 'u1', rating: 4, title: 'Boa empresa para crescer', comment: 'Equipa técnica de excelência, boas práticas de engenharia. Trabalho remoto parcial é uma mais-valia. Às vezes os processos de decisão são lentos.', date: '2026-03-15', position: 'Engenheiro Full-Stack' },
  { id: 'r2', companyId: 'e1', userId: 'u3', rating: 5, title: 'Excelente cultura e autonomia', comment: 'Empresa que aposta a sério no desenvolvimento dos colaboradores. Orçamento de formação generoso e gestores que confiam nas equipas.', date: '2026-02-20', position: 'DevOps Engineer' },
  { id: 'r3', companyId: 'e2', userId: 'u2', rating: 4, title: 'Ambiente criativo e motivante', comment: 'Projectos interessantes e equipa muito talentosa. Salários um pouco abaixo do mercado mas compensado pela qualidade do trabalho.', date: '2026-03-10', position: 'UX Designer' },
];

const DEMO_MESSAGES = [
  { id: 'm1', appId: 'a3', senderId: 'e2',  senderType: 'empresa',      content: 'Olá Ana! Ficámos muito impressionados com o seu portfólio. Gostaríamos de agendar uma entrevista. Tem disponibilidade esta semana?', date: '2026-03-29', read: true },
  { id: 'm2', appId: 'a3', senderId: 'u2',  senderType: 'colaborador',  content: 'Bom dia! Muito obrigada! Tenho disponibilidade na quinta ou sexta-feira, de preferência de manhã.', date: '2026-03-29', read: true },
  { id: 'm3', appId: 'a3', senderId: 'e2',  senderType: 'empresa',      content: 'Perfeito! Vamos agendar para quinta-feira às 10h00. Enviarei o link da videochamada por email. Até quinta!', date: '2026-03-30', read: true },
  { id: 'm4', appId: 'a1', senderId: 'e3',  senderType: 'empresa',      content: 'Olá João! Estamos a analisar a sua candidatura. Poderia partilhar algum exemplo de dashboard que tenha criado?', date: '2026-04-03', read: false },
];

const DEMO_INTERVIEWS = [
  { id: 'i1', appId: 'a3', proposedDate: '2026-04-10', time: '10:00', format: 'Videochamada', location: 'Google Meet', status: 'confirmado', note: 'Entrevista técnica com o lead designer e o CEO.' },
  { id: 'i2', appId: 'a1', proposedDate: '2026-04-12', time: '14:30', format: 'Videochamada', location: 'Zoom', status: 'pendente', note: 'Apresentação de um caso prático de análise de dados.' },
];

const DEMO_INTERVIEW_REVIEWS = [
  { id: 'ir1', companyId: 'e1', userId: 'u2', rating: 4, title: 'Processo bem estruturado', comment: 'Duas entrevistas técnicas e um case study. Feedback rápido e detalhado. Recomendo.', date: '2026-03-20', applied: true, gotOffer: false },
  { id: 'ir2', companyId: 'e2', userId: 'u1', rating: 5, title: 'Experiência excelente', comment: 'Processo muito humano. Entrevistadores preparados e comunicação clara em todas as etapas.', date: '2026-02-28', applied: true, gotOffer: true },
];

const DEMO_HIDDEN_JOBS = [];

const DEMO_JOB_STATS = [
  { jobId: 'j1', views: 142, clicks: 38 },
  { jobId: 'j2', views: 89,  clicks: 21 },
  { jobId: 'j3', views: 76,  clicks: 15 },
  { jobId: 'j4', views: 103, clicks: 29 },
  { jobId: 'j5', views: 61,  clicks: 12 },
  { jobId: 'j6', views: 44,  clicks: 8  },
];

const DEMO_EVENTS = [
  { id: 'ev1', companyId: 'e1', title: 'NovaTech Tech Day 2026', description: 'Dia de portas abertas para conhecer a equipa de engenharia da NovaTech. Apresentações técnicas, live coding e Q&A com o CTO.', date: '2026-04-25', time: '10:00', location: 'Lisboa (Escritório NovaTech)', format: 'Presencial', registrations: ['u1', 'u3'] },
  { id: 'ev2', companyId: 'e2', title: 'CreativeHub Design Meetup', description: 'Encontro para designers. Portfólios, networking e oportunidades de carreira na CreativeHub.', date: '2026-05-08', time: '18:30', location: 'Porto', format: 'Presencial', registrations: ['u2'] },
];

const DEMO_QA = [
  { id: 'qa1', companyId: 'e1', userId: 'u3', question: 'Como é o processo de onboarding para novos colaboradores?', date: '2026-03-18', answer: 'O nosso onboarding dura 4 semanas e inclui formação técnica, sessões com todas as equipas e um buddy programme para apoio nas primeiras semanas.', answeredBy: 'NovaTech RH', answeredAt: '2026-03-19' },
  { id: 'qa2', companyId: 'e1', userId: 'u2', question: 'Existe possibilidade de trabalho 100% remoto?', date: '2026-04-01', answer: null, answeredBy: null, answeredAt: null },
  { id: 'qa3', companyId: 'e2', userId: 'u1', question: 'Qual é a política de férias da empresa?', date: '2026-03-25', answer: '22 dias úteis de férias por ano, com possibilidade de negociar dias adicionais após 2 anos de empresa.', answeredBy: 'CreativeHub RH', answeredAt: '2026-03-26' },
];

const DEMO_NOTIFICATIONS = [
  { id: 'notif1', userId: 'u2', type: 'status', title: 'Candidatura aceite!', message: 'A CreativeHub aceitou a sua candidatura para Designer UX/UI.', date: '2026-03-28', read: false, link: 'colaborador.html' },
  { id: 'notif2', userId: 'u1', type: 'message', title: 'Nova mensagem da DataCore', message: 'A DataCore enviou-lhe uma mensagem sobre a sua candidatura.', date: '2026-04-03', read: false, link: 'colaborador.html' },
  { id: 'notif3', userId: 'u1', type: 'interview', title: 'Entrevista agendada', message: 'A DataCore agendou uma entrevista para 12 de Abril às 14:30.', date: '2026-04-04', read: true, link: 'colaborador.html' },
];

const DEMO_SKILL_TESTS = [
  { id: 'st1', name: 'JavaScript Básico',     category: 'Tecnologia',  duration: 10, questions: 15, passingScore: 70 },
  { id: 'st2', name: 'SQL Fundamental',        category: 'Dados',       duration: 12, questions: 20, passingScore: 70 },
  { id: 'st3', name: 'Excel Avançado',         category: 'Produtividade', duration: 8, questions: 12, passingScore: 65 },
  { id: 'st4', name: 'Inglês Profissional',    category: 'Línguas',     duration: 15, questions: 25, passingScore: 75 },
  { id: 'st5', name: 'Pensamento Analítico',   category: 'Soft Skills', duration: 10, questions: 18, passingScore: 60 },
  { id: 'st6', name: 'Gestão de Projecto',     category: 'Gestão',      duration: 12, questions: 20, passingScore: 70 },
  { id: 'st7', name: 'Python Essencial',       category: 'Tecnologia',  duration: 12, questions: 18, passingScore: 70 },
  { id: 'st8', name: 'Design Thinking',        category: 'Criatividade', duration: 10, questions: 15, passingScore: 65 },
];

/* Salary data for Portugal market (role → locations → { min, median, max, currency }) */
const SALARY_DATA = {
  'Engenheiro de Software': {
    'Lisboa':  { junior: [1800,2400], pleno: [3000,4200], senior: [4500,6500] },
    'Porto':   { junior: [1600,2200], pleno: [2800,3800], senior: [4000,5800] },
    'Remoto':  { junior: [1800,2500], pleno: [3200,4500], senior: [4800,7000] },
    'default': { junior: [1500,2000], pleno: [2500,3600], senior: [3800,5500] },
  },
  'Designer UX/UI': {
    'Lisboa':  { junior: [1400,1900], pleno: [2200,3200], senior: [3500,4800] },
    'Porto':   { junior: [1300,1800], pleno: [2000,2900], senior: [3200,4500] },
    'Remoto':  { junior: [1500,2000], pleno: [2400,3400], senior: [3600,5000] },
    'default': { junior: [1200,1700], pleno: [1900,2800], senior: [3000,4200] },
  },
  'Analista de Dados': {
    'Lisboa':  { junior: [1600,2200], pleno: [2800,3800], senior: [4000,5500] },
    'Porto':   { junior: [1500,2000], pleno: [2500,3500], senior: [3600,5000] },
    'Remoto':  { junior: [1700,2300], pleno: [2900,4000], senior: [4200,5800] },
    'default': { junior: [1400,1900], pleno: [2300,3200], senior: [3400,4800] },
  },
  'Product Manager': {
    'Lisboa':  { junior: [2000,2800], pleno: [3200,4500], senior: [5000,7000] },
    'Porto':   { junior: [1800,2500], pleno: [3000,4200], senior: [4500,6500] },
    'Remoto':  { junior: [2200,3000], pleno: [3500,5000], senior: [5500,7500] },
    'default': { junior: [1700,2300], pleno: [2800,4000], senior: [4200,6000] },
  },
  'DevOps Engineer': {
    'Lisboa':  { junior: [1800,2500], pleno: [3200,4500], senior: [4800,6500] },
    'Porto':   { junior: [1600,2200], pleno: [2900,4000], senior: [4200,5800] },
    'Remoto':  { junior: [2000,2700], pleno: [3500,4800], senior: [5000,7000] },
    'default': { junior: [1500,2100], pleno: [2700,3800], senior: [4000,5600] },
  },
  'Gestor de Marketing': {
    'Lisboa':  { junior: [1300,1800], pleno: [2200,3000], senior: [3200,4500] },
    'Porto':   { junior: [1200,1700], pleno: [2000,2800], senior: [2900,4000] },
    'Remoto':  { junior: [1400,1900], pleno: [2300,3200], senior: [3400,4800] },
    'default': { junior: [1100,1600], pleno: [1800,2600], senior: [2700,3800] },
  },
  'Operations Manager': {
    'Lisboa':  { junior: [1600,2200], pleno: [2800,3800], senior: [4000,5500] },
    'Porto':   { junior: [1500,2000], pleno: [2500,3500], senior: [3600,5000] },
    'default': { junior: [1300,1800], pleno: [2200,3200], senior: [3200,4600] },
  },
  'Contabilista': {
    'Lisboa':  { junior: [1200,1700], pleno: [2000,2800], senior: [3000,4200] },
    'Porto':   { junior: [1100,1600], pleno: [1800,2600], senior: [2700,3800] },
    'default': { junior: [1000,1500], pleno: [1600,2400], senior: [2400,3500] },
  },
  'Recursos Humanos': {
    'Lisboa':  { junior: [1200,1700], pleno: [2000,2800], senior: [3000,4200] },
    'Porto':   { junior: [1100,1600], pleno: [1800,2600], senior: [2700,3800] },
    'default': { junior: [1000,1400], pleno: [1600,2300], senior: [2400,3400] },
  },
};

/* =============================================
   INIT & SEED
   ============================================= */
function initDB() {
  if (!localStorage.getItem(DB_KEYS.users))            localStorage.setItem(DB_KEYS.users,            JSON.stringify(DEMO_USERS));
  if (!localStorage.getItem(DB_KEYS.jobs))             localStorage.setItem(DB_KEYS.jobs,             JSON.stringify(DEMO_JOBS));
  if (!localStorage.getItem(DB_KEYS.applications))     localStorage.setItem(DB_KEYS.applications,     JSON.stringify(DEMO_APPLICATIONS));
  if (!localStorage.getItem(DB_KEYS.savedJobs))        localStorage.setItem(DB_KEYS.savedJobs,        JSON.stringify(DEMO_SAVED_JOBS));
  if (!localStorage.getItem(DB_KEYS.jobAlerts))        localStorage.setItem(DB_KEYS.jobAlerts,        JSON.stringify(DEMO_JOB_ALERTS));
  if (!localStorage.getItem(DB_KEYS.reviews))          localStorage.setItem(DB_KEYS.reviews,          JSON.stringify(DEMO_REVIEWS));
  if (!localStorage.getItem(DB_KEYS.messages))         localStorage.setItem(DB_KEYS.messages,         JSON.stringify(DEMO_MESSAGES));
  if (!localStorage.getItem(DB_KEYS.interviews))       localStorage.setItem(DB_KEYS.interviews,       JSON.stringify(DEMO_INTERVIEWS));
  if (!localStorage.getItem(DB_KEYS.searchHistory))    localStorage.setItem(DB_KEYS.searchHistory,    JSON.stringify({}));
  if (!localStorage.getItem(DB_KEYS.hiddenJobs))       localStorage.setItem(DB_KEYS.hiddenJobs,       JSON.stringify(DEMO_HIDDEN_JOBS));
  if (!localStorage.getItem(DB_KEYS.interviewReviews)) localStorage.setItem(DB_KEYS.interviewReviews, JSON.stringify(DEMO_INTERVIEW_REVIEWS));
  if (!localStorage.getItem(DB_KEYS.jobStats))         localStorage.setItem(DB_KEYS.jobStats,         JSON.stringify(DEMO_JOB_STATS));
  if (!localStorage.getItem(DB_KEYS.events))           localStorage.setItem(DB_KEYS.events,           JSON.stringify(DEMO_EVENTS));
  if (!localStorage.getItem(DB_KEYS.qa))               localStorage.setItem(DB_KEYS.qa,               JSON.stringify(DEMO_QA));
  if (!localStorage.getItem(DB_KEYS.notifications))    localStorage.setItem(DB_KEYS.notifications,    JSON.stringify(DEMO_NOTIFICATIONS));
  if (!localStorage.getItem(DB_KEYS.skillTests))       localStorage.setItem(DB_KEYS.skillTests,       JSON.stringify({}));
}
function resetDB() {
  Object.values(DB_KEYS).forEach(k => localStorage.removeItem(k));
  initDB();
}

/* =============================================
   SESSION
   ============================================= */
function getSession()       { try { return JSON.parse(sessionStorage.getItem(DB_KEYS.session)); } catch { return null; } }
function setSession(user)   { sessionStorage.setItem(DB_KEYS.session, JSON.stringify(user)); }
function clearSession()     { sessionStorage.removeItem(DB_KEYS.session); }
function requireAuth(type)  {
  const user = getSession();
  if (!user) { window.location.href = 'index.html'; return null; }
  if (type && user.type !== type) { window.location.href = 'index.html'; return null; }
  return user;
}

/* =============================================
   USERS
   ============================================= */
function getUsers()          { try { return JSON.parse(localStorage.getItem(DB_KEYS.users)) || []; } catch { return []; } }
function saveUsers(u)        { localStorage.setItem(DB_KEYS.users, JSON.stringify(u)); }
function getUserById(id)     { return getUsers().find(u => u.id === id) || null; }
function loginUser(email, pw){ return getUsers().find(u => u.email === email && u.password === pw) || null; }
function registerUser(data) {
  const users = getUsers();
  if (users.find(u => u.email === data.email)) return { error: 'Email já registado.' };
  const newUser = { id: 'u' + Date.now(), ...data };
  users.push(newUser);
  saveUsers(users);
  return { user: newUser };
}
function updateUserProfile(userId, updates) {
  const users = getUsers();
  const idx = users.findIndex(u => u.id === userId);
  if (idx === -1) return false;
  Object.assign(users[idx], updates);
  saveUsers(users);
  const session = getSession();
  if (session && session.id === userId) setSession({ ...session, ...updates });
  return users[idx];
}

/* =============================================
   CV
   ============================================= */
function saveCV(userId, cvObj) { localStorage.setItem('pc_cv_' + userId, JSON.stringify(cvObj)); }
function getCV(userId)         { try { return JSON.parse(localStorage.getItem('pc_cv_' + userId)); } catch { return null; } }
function deleteCV(userId)      { localStorage.removeItem('pc_cv_' + userId); }

/* =============================================
   JOBS
   ============================================= */
function getJobs()           { try { return JSON.parse(localStorage.getItem(DB_KEYS.jobs)) || []; } catch { return []; } }
function saveJobs(j)         { localStorage.setItem(DB_KEYS.jobs, JSON.stringify(j)); }
function getJobById(id)      { return getJobs().find(j => j.id === id) || null; }
function getJobsByCompany(id){ return getJobs().filter(j => j.companyId === id); }
function createJob(data) {
  const jobs = getJobs();
  const newJob = { id: 'j' + Date.now(), ...data, posted: new Date().toISOString().slice(0,10), status: 'active', screeningQuestions: data.screeningQuestions || [] };
  jobs.push(newJob);
  saveJobs(jobs);
  return newJob;
}
function updateJob(jobId, updates) {
  const jobs = getJobs();
  const idx = jobs.findIndex(j => j.id === jobId);
  if (idx === -1) return false;
  Object.assign(jobs[idx], updates);
  saveJobs(jobs);
  return jobs[idx];
}
function searchJobs(query, location, filters) {
  const q = (query || '').toLowerCase().trim();
  const l = (location || '').toLowerCase().trim();
  const f = filters || {};
  return getJobs().filter(j => {
    if (j.status !== 'active') return false;
    const matchQ = !q || j.title.toLowerCase().includes(q) || j.companyName.toLowerCase().includes(q) || j.tags.some(t => t.toLowerCase().includes(q));
    const matchL = !l || j.location.toLowerCase().includes(l);
    const matchType = !f.type || j.type === f.type;
    const matchExp  = !f.experience || j.experience === f.experience;
    const matchSalMin = !f.salaryMin || (j.salaryMax >= parseInt(f.salaryMin));
    const matchFeatured = !f.featured || j.featured === true;
    return matchQ && matchL && matchType && matchExp && matchSalMin && matchFeatured;
  });
}
function getRecommendedJobs(userId) {
  const user = getUserById(userId);
  if (!user || !user.skills || !user.skills.length) return getJobs().filter(j => j.status === 'active').slice(0, 6);
  const applied = getApplicationsByUser(userId).map(a => a.jobId);
  const skills = user.skills.map(s => s.toLowerCase());
  return getJobs()
    .filter(j => j.status === 'active' && !applied.includes(j.id))
    .map(j => {
      const matches = j.tags.filter(t => skills.some(s => t.toLowerCase().includes(s) || s.includes(t.toLowerCase()))).length;
      return { ...j, _score: matches };
    })
    .sort((a, b) => b._score - a._score)
    .slice(0, 8);
}

/* =============================================
   APPLICATIONS
   ============================================= */
function getApplications()            { try { return JSON.parse(localStorage.getItem(DB_KEYS.applications)) || []; } catch { return []; } }
function saveApplications(apps)       { localStorage.setItem(DB_KEYS.applications, JSON.stringify(apps)); }
function getApplicationsByUser(userId){ return getApplications().filter(a => a.colaboradorId === userId); }
function getApplicationsByJob(jobId)  { return getApplications().filter(a => a.jobId === jobId); }
function getApplicationById(id)       { return getApplications().find(a => a.id === id) || null; }
function hasApplied(jobId, userId)    { return getApplications().some(a => a.jobId === jobId && a.colaboradorId === userId); }
function applyToJob(jobId, userId, screeningAnswers) {
  if (hasApplied(jobId, userId)) return { error: 'Já se candidatou a esta vaga.' };
  const apps = getApplications();
  const newApp = { id: 'a' + Date.now(), jobId, colaboradorId: userId, status: 'pendente', appliedAt: new Date().toISOString().slice(0,10), note: '', screeningAnswers: screeningAnswers || {} };
  apps.push(newApp);
  saveApplications(apps);
  return { application: newApp };
}
function updateApplicationStatus(appId, status, note) {
  const apps = getApplications();
  const idx = apps.findIndex(a => a.id === appId);
  if (idx === -1) return false;
  apps[idx].status = status;
  if (note !== undefined) apps[idx].note = note;
  saveApplications(apps);
  return true;
}

/* =============================================
   SAVED JOBS
   ============================================= */
function getSavedJobs()          { try { return JSON.parse(localStorage.getItem(DB_KEYS.savedJobs)) || []; } catch { return []; } }
function saveSavedJobs(s)        { localStorage.setItem(DB_KEYS.savedJobs, JSON.stringify(s)); }
function isJobSaved(userId, jobId){ return getSavedJobs().some(s => s.userId === userId && s.jobId === jobId); }
function toggleSaveJob(userId, jobId) {
  let saved = getSavedJobs();
  const idx = saved.findIndex(s => s.userId === userId && s.jobId === jobId);
  if (idx >= 0) { saved.splice(idx, 1); saveSavedJobs(saved); return false; }
  saved.push({ userId, jobId, savedAt: new Date().toISOString().slice(0,10) });
  saveSavedJobs(saved);
  return true;
}
function getSavedJobsForUser(userId) {
  return getSavedJobs().filter(s => s.userId === userId).map(s => ({ ...getJobById(s.jobId), _savedAt: s.savedAt })).filter(Boolean);
}

/* =============================================
   JOB ALERTS
   ============================================= */
function getJobAlerts()          { try { return JSON.parse(localStorage.getItem(DB_KEYS.jobAlerts)) || []; } catch { return []; } }
function saveJobAlerts(a)        { localStorage.setItem(DB_KEYS.jobAlerts, JSON.stringify(a)); }
function getAlertsForUser(userId){ return getJobAlerts().filter(a => a.userId === userId); }
function createAlert(userId, query, location, frequency) {
  const alerts = getJobAlerts();
  const newAlert = { id: 'al' + Date.now(), userId, query, location, frequency, createdAt: new Date().toISOString().slice(0,10) };
  alerts.push(newAlert);
  saveJobAlerts(alerts);
  return newAlert;
}
function deleteAlert(alertId) {
  const alerts = getJobAlerts().filter(a => a.id !== alertId);
  saveJobAlerts(alerts);
}

/* =============================================
   REVIEWS
   ============================================= */
function getReviews()              { try { return JSON.parse(localStorage.getItem(DB_KEYS.reviews)) || []; } catch { return []; } }
function saveReviews(r)            { localStorage.setItem(DB_KEYS.reviews, JSON.stringify(r)); }
function getReviewsByCompany(cId)  { return getReviews().filter(r => r.companyId === cId); }
function getAverageRating(companyId) {
  const reviews = getReviewsByCompany(companyId);
  if (!reviews.length) return null;
  return (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
}
function addReview(data) {
  const reviews = getReviews();
  const exists = reviews.find(r => r.companyId === data.companyId && r.userId === data.userId);
  if (exists) { Object.assign(exists, data); saveReviews(reviews); return exists; }
  const newReview = { id: 'r' + Date.now(), ...data, date: new Date().toISOString().slice(0,10) };
  reviews.push(newReview);
  saveReviews(reviews);
  return newReview;
}

/* =============================================
   MESSAGES
   ============================================= */
function getMessages()                 { try { return JSON.parse(localStorage.getItem(DB_KEYS.messages)) || []; } catch { return []; } }
function saveMessages(m)               { localStorage.setItem(DB_KEYS.messages, JSON.stringify(m)); }
function getMessagesByApp(appId)       { return getMessages().filter(m => m.appId === appId).sort((a,b) => new Date(a.date)-new Date(b.date)); }
function sendMessage(appId, senderId, senderType, content) {
  const msgs = getMessages();
  const newMsg = { id: 'm' + Date.now(), appId, senderId, senderType, content, date: new Date().toISOString(), read: false };
  msgs.push(newMsg);
  saveMessages(msgs);
  return newMsg;
}
function markMessagesRead(appId, readerType) {
  const msgs = getMessages();
  msgs.forEach(m => { if (m.appId === appId && m.senderType !== readerType) m.read = true; });
  saveMessages(msgs);
}
function getUnreadCount(userId, userType) {
  const apps = userType === 'colaborador'
    ? getApplicationsByUser(userId)
    : getApplications().filter(a => getJobsByCompany(userId).some(j => j.id === a.jobId));
  let count = 0;
  apps.forEach(app => {
    getMessagesByApp(app.id).forEach(m => { if (!m.read && m.senderType !== userType) count++; });
  });
  return count;
}

/* =============================================
   INTERVIEWS
   ============================================= */
function getInterviews()           { try { return JSON.parse(localStorage.getItem(DB_KEYS.interviews)) || []; } catch { return []; } }
function saveInterviews(i)         { localStorage.setItem(DB_KEYS.interviews, JSON.stringify(i)); }
function getInterviewByApp(appId)  { return getInterviews().find(i => i.appId === appId) || null; }
function scheduleInterview(data) {
  const interviews = getInterviews();
  const existing = interviews.findIndex(i => i.appId === data.appId);
  if (existing >= 0) { Object.assign(interviews[existing], data); saveInterviews(interviews); return interviews[existing]; }
  const newInt = { id: 'i' + Date.now(), ...data, status: 'pendente' };
  interviews.push(newInt);
  saveInterviews(interviews);
  return newInt;
}
function confirmInterview(appId, confirm) {
  const interviews = getInterviews();
  const idx = interviews.findIndex(i => i.appId === appId);
  if (idx === -1) return false;
  interviews[idx].status = confirm ? 'confirmado' : 'cancelado';
  saveInterviews(interviews);
  return true;
}

/* =============================================
   SEARCH HISTORY
   ============================================= */
function getSearchHistory(userId) {
  try { const all = JSON.parse(localStorage.getItem(DB_KEYS.searchHistory)) || {}; return all[userId] || []; } catch { return []; }
}
function addSearchHistory(userId, query) {
  if (!query.trim()) return;
  const all = JSON.parse(localStorage.getItem(DB_KEYS.searchHistory) || '{}');
  const hist = all[userId] || [];
  const filtered = hist.filter(h => h !== query).slice(0, 8);
  filtered.unshift(query);
  all[userId] = filtered;
  localStorage.setItem(DB_KEYS.searchHistory, JSON.stringify(all));
}
function clearSearchHistory(userId) {
  const all = JSON.parse(localStorage.getItem(DB_KEYS.searchHistory) || '{}');
  delete all[userId];
  localStorage.setItem(DB_KEYS.searchHistory, JSON.stringify(all));
}

/* =============================================
   HELPERS
   ============================================= */
const STATUS_LABELS = {
  pendente:   { label: 'Pendente',   cls: 'status--pending'  },
  em_analise: { label: 'Em Análise', cls: 'status--analysis' },
  aceite:     { label: 'Aceite',     cls: 'status--accepted' },
  rejeitado:  { label: 'Rejeitado',  cls: 'status--rejected' },
};
function statusBadge(status) {
  const s = STATUS_LABELS[status] || { label: status, cls: '' };
  return `<span class="status-badge ${s.cls}">${s.label}</span>`;
}
function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });
}
function formatDateTime(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleString('pt-PT', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}
function daysAgo(dateStr) {
  if (!dateStr) return '';
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
  if (diff === 0) return 'Hoje'; if (diff === 1) return 'Ontem'; return `${diff} dias`;
}
function starsHTML(rating, interactive, onClickFn) {
  return [1,2,3,4,5].map(i => {
    const filled = i <= Math.round(rating);
    if (interactive) return `<span class="star star--interactive ${filled?'star--filled':''}" onclick="${onClickFn}(${i})" data-v="${i}">★</span>`;
    return `<span class="star ${filled?'star--filled':''}" style="opacity:${filled?1:.25}">★</span>`;
  }).join('');
}
function shareJob(jobId) {
  const job = getJobById(jobId);
  if (!job) return;
  const url = `http://localhost:3000/empresa-publica.html?id=${job.companyId}`;
  const text = `${job.title} @ ${job.companyName} — ${job.salary}`;
  if (navigator.share) { navigator.share({ title: text, url }); return; }
  navigator.clipboard.writeText(url).then(() => alert('Link copiado!'));
}

/* =============================================
   HIDDEN JOBS
   ============================================= */
function getHiddenJobs()              { try { return JSON.parse(localStorage.getItem(DB_KEYS.hiddenJobs)) || []; } catch { return []; } }
function saveHiddenJobs(h)            { localStorage.setItem(DB_KEYS.hiddenJobs, JSON.stringify(h)); }
function isJobHidden(userId, jobId)   { return getHiddenJobs().some(h => h.userId === userId && h.jobId === jobId); }
function hideJob(userId, jobId)       { const h = getHiddenJobs(); if (!isJobHidden(userId, jobId)) { h.push({ userId, jobId }); saveHiddenJobs(h); } }
function unhideJob(userId, jobId)     { saveHiddenJobs(getHiddenJobs().filter(h => !(h.userId === userId && h.jobId === jobId))); }
function getHiddenJobIdsForUser(userId) { return getHiddenJobs().filter(h => h.userId === userId).map(h => h.jobId); }

/* =============================================
   INTERVIEW REVIEWS
   ============================================= */
function getInterviewReviews()                  { try { return JSON.parse(localStorage.getItem(DB_KEYS.interviewReviews)) || []; } catch { return []; } }
function saveInterviewReviews(r)                { localStorage.setItem(DB_KEYS.interviewReviews, JSON.stringify(r)); }
function getInterviewReviewsByCompany(companyId){ return getInterviewReviews().filter(r => r.companyId === companyId); }
function getAvgInterviewRating(companyId)       { const r = getInterviewReviewsByCompany(companyId); return r.length ? (r.reduce((s,x) => s+x.rating, 0)/r.length).toFixed(1) : null; }
function addInterviewReview(data) {
  const reviews = getInterviewReviews();
  const exists  = reviews.findIndex(r => r.companyId === data.companyId && r.userId === data.userId);
  if (exists >= 0) { Object.assign(reviews[exists], data); saveInterviewReviews(reviews); return reviews[exists]; }
  const nr = { id: 'ir' + Date.now(), ...data, date: new Date().toISOString().slice(0,10) };
  reviews.push(nr);
  saveInterviewReviews(reviews);
  return nr;
}

/* =============================================
   JOB STATS
   ============================================= */
function getJobStats()              { try { return JSON.parse(localStorage.getItem(DB_KEYS.jobStats)) || []; } catch { return []; } }
function saveJobStats(s)            { localStorage.setItem(DB_KEYS.jobStats, JSON.stringify(s)); }
function getStatsForJob(jobId)      { return getJobStats().find(s => s.jobId === jobId) || { jobId, views: 0, clicks: 0 }; }
function incrementJobView(jobId)    { const stats = getJobStats(); const idx = stats.findIndex(s => s.jobId === jobId); if (idx >= 0) stats[idx].views++; else stats.push({ jobId, views: 1, clicks: 0 }); saveJobStats(stats); }
function incrementJobClick(jobId)   { const stats = getJobStats(); const idx = stats.findIndex(s => s.jobId === jobId); if (idx >= 0) stats[idx].clicks++; else stats.push({ jobId, views: 0, clicks: 1 }); saveJobStats(stats); }

/* =============================================
   EVENTS
   ============================================= */
function getEvents()                    { try { return JSON.parse(localStorage.getItem(DB_KEYS.events)) || []; } catch { return []; } }
function saveEvents(e)                  { localStorage.setItem(DB_KEYS.events, JSON.stringify(e)); }
function getEventsByCompany(companyId)  { return getEvents().filter(e => e.companyId === companyId); }
function getUpcomingEvents()            { const today = new Date().toISOString().slice(0,10); return getEvents().filter(e => e.date >= today).sort((a,b) => a.date.localeCompare(b.date)); }
function createEvent(data) {
  const events = getEvents();
  const ne = { id: 'ev' + Date.now(), ...data, registrations: [] };
  events.push(ne);
  saveEvents(events);
  return ne;
}
function deleteEvent(eventId)           { saveEvents(getEvents().filter(e => e.id !== eventId)); }
function registerForEvent(eventId, userId) {
  const events = getEvents();
  const idx = events.findIndex(e => e.id === eventId);
  if (idx === -1) return false;
  if (!events[idx].registrations) events[idx].registrations = [];
  if (!events[idx].registrations.includes(userId)) events[idx].registrations.push(userId);
  saveEvents(events);
  return true;
}
function unregisterFromEvent(eventId, userId) {
  const events = getEvents();
  const idx = events.findIndex(e => e.id === eventId);
  if (idx === -1) return false;
  events[idx].registrations = (events[idx].registrations || []).filter(id => id !== userId);
  saveEvents(events);
  return true;
}
function isRegisteredForEvent(eventId, userId) { const e = getEvents().find(e => e.id === eventId); return e && (e.registrations || []).includes(userId); }

/* =============================================
   Q&A
   ============================================= */
function getQA()                    { try { return JSON.parse(localStorage.getItem(DB_KEYS.qa)) || []; } catch { return []; } }
function saveQA(q)                  { localStorage.setItem(DB_KEYS.qa, JSON.stringify(q)); }
function getQAByCompany(companyId)  { return getQA().filter(q => q.companyId === companyId).sort((a,b) => new Date(b.date)-new Date(a.date)); }
function addQuestion(data) {
  const qa = getQA();
  const nq = { id: 'qa' + Date.now(), ...data, date: new Date().toISOString().slice(0,10), answer: null, answeredBy: null, answeredAt: null };
  qa.push(nq);
  saveQA(qa);
  return nq;
}
function answerQuestion(qaId, answer, answeredBy) {
  const qa  = getQA();
  const idx = qa.findIndex(q => q.id === qaId);
  if (idx === -1) return false;
  qa[idx].answer     = answer;
  qa[idx].answeredBy = answeredBy;
  qa[idx].answeredAt = new Date().toISOString().slice(0,10);
  saveQA(qa);
  return true;
}

/* =============================================
   NOTIFICATIONS
   ============================================= */
function getNotifications()             { try { return JSON.parse(localStorage.getItem(DB_KEYS.notifications)) || []; } catch { return []; } }
function saveNotifications(n)           { localStorage.setItem(DB_KEYS.notifications, JSON.stringify(n)); }
function getNotificationsForUser(userId){ return getNotifications().filter(n => n.userId === userId).sort((a,b) => new Date(b.date)-new Date(a.date)); }
function getUnreadNotifCount(userId)    { return getNotificationsForUser(userId).filter(n => !n.read).length; }
function addNotification(userId, type, title, message, link) {
  const notifs = getNotifications();
  notifs.push({ id: 'notif' + Date.now(), userId, type, title, message, link: link || '', date: new Date().toISOString(), read: false });
  saveNotifications(notifs);
}
function markNotifRead(notifId) {
  const notifs = getNotifications();
  const idx = notifs.findIndex(n => n.id === notifId);
  if (idx >= 0) notifs[idx].read = true;
  saveNotifications(notifs);
}
function markAllNotifsRead(userId) {
  const notifs = getNotifications();
  notifs.forEach(n => { if (n.userId === userId) n.read = true; });
  saveNotifications(notifs);
}

/* =============================================
   SKILL TESTS
   ============================================= */
function getAvailableTests()                  { return DEMO_SKILL_TESTS; }
function getCompletedTests()                  { try { return JSON.parse(localStorage.getItem(DB_KEYS.skillTests)) || {}; } catch { return {}; } }
function saveCompletedTestsData(t)            { localStorage.setItem(DB_KEYS.skillTests, JSON.stringify(t)); }
function getCompletedTestsForUser(userId)     { return getCompletedTests()[userId] || []; }
function hasCompletedTest(userId, testId)     { return getCompletedTestsForUser(userId).some(t => t.testId === testId); }
function completeSkillTest(userId, testId, score) {
  const all  = getCompletedTests();
  const user = all[userId] || [];
  const idx  = user.findIndex(t => t.testId === testId);
  const entry = { testId, score, completedAt: new Date().toISOString() };
  if (idx >= 0) user[idx] = entry; else user.push(entry);
  all[userId] = user;
  saveCompletedTestsData(all);
  return entry;
}

/* =============================================
   CANDIDATE SEARCH (for companies)
   ============================================= */
function searchCandidates(query, skills, location, availability) {
  const q    = (query || '').toLowerCase().trim();
  const loc  = (location || '').toLowerCase().trim();
  const skls = (skills || []).map(s => s.toLowerCase().trim()).filter(Boolean);
  return getUsers()
    .filter(u => u.type === 'colaborador')
    .filter(u => {
      if (u.profileVisibility === 'none') return false;
      const matchQ     = !q   || (u.name||'').toLowerCase().includes(q) || (u.surname||'').toLowerCase().includes(q) || (u.role||'').toLowerCase().includes(q) || (u.about||'').toLowerCase().includes(q);
      const matchLoc   = !loc || (u.location||'').toLowerCase().includes(loc);
      const matchSkl   = !skls.length || skls.every(s => (u.skills||[]).some(us => us.toLowerCase().includes(s)));
      const matchAvail = !availability || u.availability === availability;
      return matchQ && matchLoc && matchSkl && matchAvail;
    });
}

/* =============================================
   SALARY DATA
   ============================================= */
function getSalaryData(role, location) {
  const roles = Object.keys(SALARY_DATA);
  const rl    = (role || '').toLowerCase();
  const matchedRole = roles.find(r => r.toLowerCase().includes(rl) || rl.includes(r.toLowerCase()));
  if (!matchedRole) return null;
  const roleData = SALARY_DATA[matchedRole];
  const loc = (location || '').trim();
  return roleData[loc] || roleData['default'] || null;
}
function getAllSalaryRoles() { return Object.keys(SALARY_DATA); }

initDB();
