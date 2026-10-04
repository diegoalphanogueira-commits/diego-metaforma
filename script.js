/* Edit these two fields when the photo and custom domain are ready. */
const SITE_CONFIG = { photo: './assets/diego-nogueira.jpg', canonical: 'https://diegoalphanogueira-commits.github.io/diego-metaforma/' };
document.documentElement.classList.add('js');
document.getElementById('year').textContent = new Date().getFullYear();
if (SITE_CONFIG.photo) {
  const img = document.createElement('img'); img.src = SITE_CONFIG.photo; img.alt = 'Diego Nogueira'; img.width = 280; img.height = 280;
  img.addEventListener('load', () => document.getElementById('portrait').replaceChildren(img));
}
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
const pillars = ['Posicionamento', 'Aquisição', 'Comercial', 'Tecnologia'];
const questions = [
  {pillar:0,title:'Quem encontra sua empresa entende por que escolher você?',context:'Considere seu site, suas redes e a clareza da sua oferta.',options:['Nossa presença é incompleta ou não comunica bem o que fazemos.','Explicamos o que fazemos, mas ainda falta diferenciação e consistência.','Temos oferta clara e uma presença profissional e coerente.']},
  {pillar:0,title:'Sua presença transmite confiança antes do primeiro contato?',context:'Pense no Google, nas avaliações e nas provas reais do seu trabalho.',options:['Temos pouca informação atualizada e poucas provas de confiança.','Temos presença e avaliações, mas não cuidamos delas com frequência.','Mantemos informações atualizadas, avaliações e provas reais acessíveis.']},
  {pillar:1,title:'Você sabe de onde chegam seus novos clientes?',context:'Olhe para os canais que realmente trazem contatos para o negócio.',options:['Não acompanhamos a origem dos contatos.','Temos uma noção, mas não medimos com regularidade.','Registramos a origem e acompanhamos quais canais geram oportunidades.']},
  {pillar:1,title:'Existe uma rotina para gerar novas oportunidades?',context:'Considere conteúdo, busca local, indicações, parcerias ou prospecção.',options:['Dependemos de contatos que aparecem e de ações pontuais.','Fazemos algumas ações, mas sem rotina ou acompanhamento claro.','Temos canais definidos, rotina e acompanhamento dos resultados.']},
  {pillar:2,title:'O atendimento tem responsáveis e próximos passos claros?',context:'Pense em quem assume cada conversa e como acompanha uma negociação.',options:['As conversas ficam soltas e dependem da memória de cada pessoa.','Há responsáveis, mas nem sempre registramos etapas e próximos passos.','Cada oportunidade tem responsável, etapa e próximo passo registrado.']},
  {pillar:2,title:'O que acontece com quem não compra no primeiro contato?',context:'Avalie como sua equipe realiza retornos e acompanha oportunidades.',options:['Normalmente esperamos que a pessoa volte.','Fazemos retornos, mas de forma manual e irregular.','Temos uma rotina de follow-up com contexto e acompanhamento.']},
  {pillar:3,title:'As informações do cliente estão organizadas e acessíveis?',context:'Considere histórico, dados, negociações e continuidade entre pessoas.',options:['As informações ficam espalhadas entre celulares e anotações.','Usamos ferramentas, mas ainda há informações isoladas ou retrabalho.','Centralizamos histórico e dados para dar continuidade ao atendimento.']},
  {pillar:3,title:'A tecnologia ajuda a executar seu processo?',context:'Automação e IA só fazem sentido quando apoiam uma operação clara.',options:['Fazemos quase tudo manualmente e sem processo definido.','Temos algumas automações, mas ainda falta integração ou direção.','Usamos ferramentas e automações alinhadas ao processo e acompanhamos sua execução.']}
];
const recommendations = [
  ['Fortaleça sua presença e sua credibilidade.','Deixe sua oferta clara, organize seu site e seu perfil no Google e torne as provas do seu trabalho fáceis de encontrar. Antes de buscar mais atenção, ajude o cliente a confiar em você.'],
  ['Crie uma rotina de geração de oportunidades.','Identifique seus melhores canais, registre a origem dos contatos e escolha uma rotina que possa manter. Meça o que gera conversas qualificadas, não apenas visualizações.'],
  ['Organize o caminho da conversa até a venda.','Defina responsáveis, etapas e próximos passos. Registre as oportunidades e crie uma rotina de follow-up. A Korax pode apoiar essa estrutura no WhatsApp.'],
  ['Conecte a tecnologia ao seu processo.','Centralize informações e histórico antes de automatizar. Escolha ferramentas que apoiem a rotina da equipe e eliminem retrabalho, sem perder o contexto do cliente.']
];
const dialog = document.getElementById('diagnostic');
const form = document.getElementById('quiz-form');
let step = 0, answers = Array(questions.length).fill(null);
function renderQuestion() {
  const q = questions[step]; document.getElementById('diagnostic-title').textContent = q.title;
  document.getElementById('quiz-context').textContent = q.context;
  document.getElementById('quiz-step').textContent = `${step + 1} de ${questions.length}`;
  document.getElementById('quiz-pillar').textContent = pillars[q.pillar];
  document.getElementById('quiz-progress').value = step + 1;
  document.getElementById('quiz-error').textContent = '';
  const choices = document.getElementById('quiz-choices'); choices.querySelectorAll('label').forEach(el => el.remove());
  q.options.forEach((option,i) => { const label = document.createElement('label'); label.className = 'choice'; const input = document.createElement('input'); input.type = 'radio'; input.name = 'answer'; input.value = i; input.checked = answers[step] === i; const text = document.createElement('span'); text.textContent = option; label.append(input,text); choices.append(label); });
  document.getElementById('quiz-back').disabled = step === 0;
  document.getElementById('quiz-next').textContent = step === questions.length - 1 ? 'Ver meu resultado →' : 'Continuar →';
  dialog.scrollTop = 0;
}
function showQuiz() { document.getElementById('quiz-view').hidden = false; document.getElementById('result-view').hidden = true; dialog.setAttribute('aria-labelledby','diagnostic-title'); renderQuestion(); }
document.getElementById('open-diagnostic').addEventListener('click', () => { showQuiz(); dialog.showModal(); document.body.classList.add('dialog-open'); });
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => {document.body.classList.remove('dialog-open'); document.getElementById('open-diagnostic').focus();});
document.getElementById('quiz-back').addEventListener('click', () => { const selected = new FormData(form).get('answer'); if (selected !== null) answers[step] = Number(selected); if (step > 0) {step--;renderQuestion();} });
form.addEventListener('submit', event => {
  event.preventDefault(); const selected = new FormData(form).get('answer');
  if (selected === null) {document.getElementById('quiz-error').textContent = 'Escolha a opção mais próxima da sua realidade para continuar.';return;}
  answers[step] = Number(selected);
  if (step < questions.length - 1) {step++;renderQuestion();document.querySelector('#quiz-choices input').focus();} else showResult();
});
function showResult() {
  const scores = pillars.map((_,p) => questions.reduce((total,q,i) => total + (q.pillar === p ? answers[i] : 0),0) * 25);
  const total = Math.round(scores.reduce((a,b) => a+b,0)/4); const weakest = scores.indexOf(Math.min(...scores));
  document.getElementById('quiz-view').hidden = true;document.getElementById('result-view').hidden = false;
  dialog.setAttribute('aria-labelledby','result-title');
  document.getElementById('total-score').textContent = total;
  const rows = document.getElementById('pillar-results'); rows.replaceChildren();
  scores.forEach((score,i) => {const row = document.createElement('div');row.className='pillar-row'; const name = document.createElement('span');name.textContent=pillars[i];const track=document.createElement('div');track.className='pillar-track';track.setAttribute('aria-hidden','true');const fill=document.createElement('span');fill.style.width=`${score}%`;track.append(fill);const value=document.createElement('strong');value.textContent=`${score}/100`;row.append(name,track,value);rows.append(row);});
  document.getElementById('priority-title').textContent = total === 100 ? 'Mantenha a estrutura em evolução.' : recommendations[weakest][0];
  document.getElementById('priority-copy').textContent = total === 100 ? 'Suas respostas indicam uma estrutura bem organizada nos quatro pilares. O próximo passo é validar essa percepção com indicadores reais e melhorar continuamente a operação.' : recommendations[weakest][1];
  const message=`Oi, Diego! Fiz o Diagnóstico PACT na sua central. Meu resultado foi ${total}/100. ${pillars.map((p,i)=>`${p}: ${scores[i]}/100`).join(' | ')}. Quero conversar sobre meu próximo passo.`;
  const cta=document.getElementById('result-cta');cta.href=`https://wa.me/5511958689822?text=${encodeURIComponent(message)}`;cta.target='_blank';cta.rel='noopener noreferrer';
  dialog.scrollTop=0;document.getElementById('result-title').focus();
}
document.getElementById('quiz-restart').addEventListener('click', () => {step=0;answers=Array(questions.length).fill(null);showQuiz();});
