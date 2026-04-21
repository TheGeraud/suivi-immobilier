// ── THÈME CLAIR / SOMBRE ─────────────────────────────
const html  = document.documentElement;
const toggle = document.querySelector('[data-theme-toggle]');
let theme = 'light';

toggle.addEventListener('click', () => {
  theme = theme === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', theme);
  toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
});

// ── NAVIGATION ───────────────────────────────────────
const navBtns = document.querySelectorAll('.nav-btn');
const app     = document.getElementById('app');

navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    navBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render(btn.dataset.section);
  });
});

// ── DONNÉES ──────────────────────────────────────────
const DATA = {

  bien: {
    adresse:    '69 av. Victor Hugo, Neuilly-Plaisance 93360',
    surface:    35,
    prixDemande:164000,
    prixOffert: 144000,
    etage:      'RdC',
    dpe:        'D',
    charges:    82,
    taxe:       575,
    loyer:      900,
    agence:     'IDLR / BINAME Elisa',
    statut:     'Offre envoyée',
    avis:       '★★★☆☆',
    notes:      'Copro : travaux toiture/assainissement (PV 2023-2025)',
  },

  banques: [
  { nom: 'BNP Paribas', statut: 'À contacter', taux: '', notes: '' },
  { nom: 'Crédit Agricole', statut: 'À contacter', taux: '', notes: '' },
  { nom: 'Société Générale', statut: 'À contacter', taux: '', notes: '' },
  { nom: 'LCL', statut: 'À contacter', taux: '', notes: '' },
  { nom: "Caisse d'Épargne", statut: 'À contacter', taux: '', notes: '' },
  { nom: 'Boursorama', statut: 'À contacter', taux: '', notes: '' },
  { nom: 'Hello Bank', statut: 'À contacter', taux: '', notes: '' },
  { nom: 'Courtier (à définir)', statut: 'À contacter', taux: '', notes: '' },
],

  documents: [
    { id:1,  doc:"Pièce d'identité (CNI ou passeport)",      cat:'Identité',        statut:'⬜ À faire' },
    { id:2,  doc:'Justificatif de domicile (- 3 mois)',       cat:'Identité',        statut:'⬜ À faire' },
    { id:3,  doc:'3 derniers bulletins de salaire',           cat:'Revenus',         statut:'⬜ À faire' },
    { id:4,  doc:'Contrat de travail (CDI)',                  cat:'Revenus',         statut:'⬜ À faire' },
    { id:5,  doc:"2 derniers avis d'imposition",              cat:'Revenus',         statut:'⬜ À faire' },
    { id:6,  doc:'3 derniers relevés de compte courant',      cat:'Bancaire',        statut:'⬜ À faire' },
    { id:7,  doc:'Relevés livret épargne / épargne salariale',cat:'Bancaire',        statut:'⬜ À faire' },
    { id:8,  doc:'Justificatif apport personnel',             cat:'Bancaire',        statut:'⬜ À faire' },
    { id:9,  doc:"Tableau d'amortissement crédits en cours",  cat:'Bancaire',        statut:'⬜ À faire' },
    { id:10, doc:'Compromis de vente signé',                  cat:'Bien immobilier', statut:'⬜ À faire' },
    { id:11, doc:'Diagnostics immobiliers (DPE, amiante...)', cat:'Bien immobilier', statut:'⬜ À faire' },
    { id:12, doc:"3 derniers PV d'assemblée générale copro",  cat:'Bien immobilier', statut:'⬜ À faire' },
    { id:13, doc:'Règlement de copropriété',                  cat:'Bien immobilier', statut:'⬜ À faire' },
    { id:14, doc:'Relevé des charges copropriété',            cat:'Bien immobilier', statut:'⬜ À faire' },
    { id:15, doc:"État des impayés de charges",               cat:'Bien immobilier', statut:'⬜ À faire' },
    { id:16, doc:'Questionnaire santé assurance emprunteur',  cat:'Assurance',       statut:'⬜ À faire' },
    { id:17, doc:'Justificatif assurance habitation',         cat:'Assurance',       statut:'⬜ À faire' },
  ],

  calendrier: [
    { id:1,  etape:'Visite du bien',                 phase:'Découverte',  cible:'', statut:'⬜ À faire', delai: 0 },
    { id:2,  etape:"Envoi offre d'achat",            phase:'Négociation', cible:'Avr 2026', statut:'⬜ À faire', delai: 2 },
    { id:3,  etape:'Réponse vendeur / contre-offre', phase:'Négociation', cible:'Avr 2026', statut:'⬜ À faire', delai: 7 },
    { id:4,  etape:'Accord sur le prix',             phase:'Négociation', cible:'Avr 2026', statut:'⬜ À faire', delai: 10 }, 
    { id:5,  etape:'Consultation banques / courtier',phase:'Financement', cible:'Avr–Mai 2026', statut:'⬜ À faire', delai: 14 },
    { id:6,  etape:'Dépôt dossier de prêt',          phase:'Financement', cible:'Mai 2026', statut:'⬜ À faire', delai: 45 },
    { id:7,  etape:'Accord de principe',             phase:'Financement', cible:'Mai 2026', statut:'⬜ À faire', delai: 60 },
    { id:8,  etape:'Offre de prêt officielle reçue', phase:'Financement', cible:'Juin 2026', statut:'⬜ À faire', delai: 75 },
    { id:9,  etape:'Délai de réflexion légal (10j)', phase:'Financement', cible:'Juin 2026', statut:'⬜ À faire', delai: 85 },
    { id:10, etape:'Signature compromis de vente',   phase:'Notaire',     cible:'Mai 2026', statut:'⬜ À faire', delai: 30 },
    { id:11, etape:'Délai rétractation (10 jours)',  phase:'Notaire',     cible:'Mai 2026', statut:'⬜ À faire', delai: 40 },
    { id:12, etape:'Dépôt de garantie (~5–10%)',     phase:'Notaire',     cible:'Mai 2026', statut:'⬜ À faire', delai: 42 },
    { id:13, etape:'Purge conditions suspensives',   phase:'Notaire',     cible:'Juin–Juil 2026', statut:'⬜ À faire', delai: 90 },
    { id:14, etape:'Signature acte authentique',     phase:'Notaire',     cible:'Juil–Août 2026', statut:'⬜ À faire', delai: 120 },
    { id:15, etape:'Remise des clés',                phase:'Finalisation',cible:'Juil–Août 2026', statut:'⬜ À faire', delai: 121 },
    { id:16, etape:'Souscription assurance habitation',phase:'Finalisation',cible:'Avant clés', statut:'⬜ À faire', delai: 115 },
    { id:17, etape:'Changement compteurs EDF / eau', phase:'Finalisation',cible:'Dès remise clés', statut:'⬜ À faire', delai: 122 },
  ],

  contacts: [
    { role:'Agent / Mandataire', societe:'IDLR', nom:'BINAME Elisa',         tel:'',                 email:'',                    notes:'Contact bien av. Victor Hugo' },
    { role:'Syndic copropriété', societe:'CITYA COGIM', nom:'DARBARY Bipindasgupta', tel:'01 43 02 86 60', email:'bdarbarby@citya.com', notes:'Gestionnaire copropriété' },
    { role:'Conseil syndical',   societe:'',     nom:'Mme QUESTIAUX',         tel:'',                 email:'',                    notes:'Membre conseil syndical' },
    { role:'Notaire acheteur',   societe:'',     nom:'',                      tel:'',                 email:'',                    notes:'À choisir' },
    { role:'Courtier',           societe:'',     nom:'',                      tel:'',                 email:'',                    notes:'À contacter' },
    { role:'Banque principale',  societe:'',     nom:'',                      tel:'',                 email:'',                    notes:'' },
    { role:'Assureur habitation',societe:'',     nom:'',                      tel:'',                 email:'',                    notes:'À contacter avant signature' },
  ],

  copro: [
    { annee:2023, res:'Rés. 13', sujet:'Mise en conformité assainissement', decision:'✅ Accepté',  budget:16932, subvention:15120, statut:'Terminé ?',  impact:'⚠️ Faible',       notes:'Subvention obtenue. Appels jul 2023→avr 2024' },
    { annee:2023, res:'Rés. 16', sujet:'Diagnostic amiante (DAT)',          decision:'✅ Accepté',  budget:2052,  subvention:0,     statut:'Terminé ?',  impact:'⚠️ Faible',       notes:'3 appels fonds jul-oct 2023, jan 2024' },
    { annee:2023, res:'Rés. 20', sujet:'PPPT / DTG (plan pluriannuel)',     decision:'❌ Refusé',   budget:7200,  subvention:5000,  statut:'Non lancé',  impact:'⚠️⚠️ Risque futur',notes:'Obligation légale loi Climat 2021' },
    { annee:2024, res:'Rés. 5',  sujet:'Travaux toiture + architecte + DAT',decision:'⚠️ En cours',budget:0,     subvention:0,     statut:'En cours',   impact:'⚠️ Moyen',        notes:'Non clôturés fin 2023' },
    { annee:2024, res:'Rés. 12', sujet:'Fonds prévoyance travaux (5%)',     decision:'✅ Accepté',  budget:410,   subvention:0,     statut:'Récurrent',  impact:'~41€/an/lot',     notes:'Appels trimestriels depuis juil 2024' },
    { annee:2025, res:'Rés. 9',  sujet:'Fonds de travaux 5% budget 2026',   decision:'✅ Accepté',  budget:415,   subvention:0,     statut:'Récurrent',  impact:'~42€/an/lot',     notes:'Budget 2026 = 8 300€' },
    { annee:2025, res:'—',       sujet:'PPPT / DTG : toujours non réalisé', decision:'⚠️ Non inscrit',budget:0,  subvention:0,     statut:'En attente', impact:'⚠️⚠️ RISQUE MAJEUR',notes:'Obligation légale non remplie. Gros appel de fonds possible.' },
  ],

};

// ── CHARGEMENT SAUVEGARDE ────────────────────────────
const saved = localStorage.getItem('suiviImmo');
if (saved) {
  const parsed = JSON.parse(saved);

  // Merge bien (migration de l'ancienne dateVisite vers le calendrier)
  const { dateVisite, ...bienData } = parsed.bien || {};
  Object.assign(DATA.bien, bienData);
  if (dateVisite && !parsed.calendrier?.[0]?.cible) {
    DATA.calendrier[0].cible = dateVisite;
  }

  // Banques : merge pour protéger les nouveaux champs du code
  if (parsed.banques) {
    DATA.banques = parsed.banques.map((e, i) => ({
      ...DATA.banques[i], // valeurs par défaut (nom, statut...)
      ...e                // valeurs user par-dessus (statut modifié, notes...)
    }));
  }

  // Documents : merge
  if (parsed.documents) {
    DATA.documents = parsed.documents.map((e, i) => ({
      ...DATA.documents[i],
      ...e
    }));
  }

  // Calendrier : merge
  if (parsed.calendrier) {
    DATA.calendrier = parsed.calendrier.map((e, i) => ({
      ...DATA.calendrier[i],
      ...e
    }));
  }

  // Contacts : merge
  if (parsed.contacts) {
    DATA.contacts = parsed.contacts.map((e, i) => ({
      ...DATA.contacts[i], // valeurs par défaut (role, societe...)
      ...e                 // valeurs user par-dessus (tel, email, notes...)
    }));
  }
}



function save() {
  localStorage.setItem('suiviImmo', JSON.stringify(DATA)); //Cette fonction enregistre l’objet  DATA  dans le navigateur.  JSON.stringify()  transforme l’objet JavaScript en texte, car  localStorage  ne peut stocker que des chaînes de caractères.
}
// ── DEBOUNCE ─────────────────────────────────────────
function debounce(fn, delay = 400) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const saveDebounced = debounce(save, 400);
// ── UTILITAIRES ───────────────────────────────────────
function fmt(n) {
  return Number(n).toLocaleString('fr-FR') + ' €';
}

function formatDateFr(value) {
  if (!value) return '';
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;//d.getTime() retourne le nombre de millisecondes depuis 1970, ou NaN si la date est invalide.
  return d.toLocaleDateString('fr-FR');
}

function badgeStatut(statut) {
  const map = {
    'À contacter' : 'badge-todo',
    'En attente'  : 'badge-doing',
    'Offre reçue' : 'badge-doing',
    'Accepté'     : 'badge-done',
    'Refusé'      : 'badge-blocked',
    '⬜ À faire'  : 'badge-todo',
    '🔄 En cours' : 'badge-doing',
    '✅ Fait'      : 'badge-done',
    '⚠️ Bloqué'   : 'badge-warning',
    'Offre envoyée': 'badge-doing',
  };
  const cls = map[statut] || 'badge-todo';
  return `<span class="badge ${cls}">${statut}</span>`;
}

// ── RESET ────────────────────────────────────────────
document.getElementById('reset-btn').addEventListener('click', () => {
  if (confirm('⚠️ Réinitialiser toutes les données ? Cette action est irréversible.')) {
    localStorage.removeItem('suiviImmo');
    location.reload();
  }
});

// ── GRAPHIQUE ANALYSE ────────────────────────────────
function initChartAnalyse() {
  const notaire = 0.078;
  const scenarios = [
    { nom: 'Prudent',   prix: 152000, travaux: 4000, loyer: 900, charges: 984, taxe: 575, energie: 1013 },
    { nom: 'Équilibré', prix: 156000, travaux: 2500, loyer: 900, charges: 984, taxe: 575, energie: 1013 },
    { nom: 'Offensif',  prix: 158000, travaux: 1000, loyer: 900, charges: 984, taxe: 575, energie: 1013 },
  ];

  const labels   = scenarios.map(s => s.nom);
  const brutData = scenarios.map(s => {
    const coutTotal = s.prix + s.travaux + Math.round(s.prix * notaire);
    return +((s.loyer * 12 / coutTotal) * 100).toFixed(2);
  });
  const netData  = scenarios.map(s => {
    const coutTotal = s.prix + s.travaux + Math.round(s.prix * notaire);
    const charges   = s.charges + s.taxe + s.energie;
    return +(((s.loyer * 12 - charges) / coutTotal) * 100).toFixed(2);
  });

  const ctx = document.getElementById('chartAnalyse').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
     data: {
      labels,
      datasets: [
        { label: 'Rendement brut (%)', data: brutData, backgroundColor: 'rgba(1,105,111,0.7)' },
        { label: 'Rendement net (%)', data: netData, backgroundColor: 'rgba(67,122,34,0.7)' }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Comparaison des rendements par scénario' }
      },
      scales: {
        y: { beginAtZero: true, ticks: { callback: val => val + ' %' } }
      }
    }
  });
}


// ── DASHBOARD ─────────────────────────────────────────
function renderDashboard() {
  const b = DATA.bien;
  const prixM2 = Math.round(b.prixOffert / b.surface);
  const margeNego = (((b.prixDemande - b.prixOffert) / b.prixDemande) * 100).toFixed(1);
  const rendBrut = ((b.loyer * 12) / b.prixOffert * 100).toFixed(2);
  const docsFaits = DATA.documents.filter(d => d.statut === '✅ Fourni').length;
  const etapesFaites = DATA.calendrier.filter(e => e.statut === '✅ Fait').length;
  const dateDashboard = getDateBase() || DATA.calendrier[0]?.cible || 'Non définie';
  return `
    <h1 class="section-title">🏠 Tableau de bord</h1>
    <p class="section-sub">${b.adresse} · Budget max 150 000 € · ${formatDateFr(dateDashboard) || 'Non définie'}</p>
    <div class="kpi-grid">
      <div class="kpi-card"><div class="kpi-label">Prix offert</div><div class="kpi-value">${fmt(b.prixOffert)}</div><div class="kpi-note">Demande : ${fmt(b.prixDemande)}</div></div>
      <div class="kpi-card"><div class="kpi-label">Prix / m²</div><div class="kpi-value">${fmt(prixM2)}</div><div class="kpi-note">${b.surface} m²</div></div>
      <div class="kpi-card"><div class="kpi-label">Marge négociée</div><div class="kpi-value">${margeNego} %</div><div class="kpi-note">Sur prix demandé</div></div>
      <div class="kpi-card"><div class="kpi-label">Rendement brut</div><div class="kpi-value">${rendBrut} %</div><div class="kpi-note">Loyer ${fmt(b.loyer)}/mois</div></div>
      <div class="kpi-card"><div class="kpi-label">Documents</div><div class="kpi-value">${docsFaits}/17</div><div class="kpi-note">Fournis</div></div>
      <div class="kpi-card"><div class="kpi-label">Calendrier</div><div class="kpi-value">${etapesFaites}/16</div><div class="kpi-note">Étapes complétées</div></div>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Adresse</th><th>Surface</th><th>DPE</th><th>Charges/mois</th><th>Taxe foncière</th><th>Statut</th></tr></thead>
        <tbody><tr>
          <td>${b.adresse}</td><td>${b.surface} m²</td><td>${b.dpe}</td>
          <td>${fmt(b.charges)}</td><td>${fmt(b.taxe)}</td><td>${badgeStatut(b.statut)}</td>
        </tr></tbody>
      </table>
    </div>
  `;
}

// ── BIENS ────────────────────────────────────────────
function renderBiens() {
  const b = DATA.bien;
  return `
    <h1 class="section-title">🏡 Fiche du Bien</h1>
    <p class="section-sub">69 av. Victor Hugo · Neuilly-Plaisance 93360</p>
    <div class="table-wrap">
      <table>
        <tbody>
          <tr><td><strong>Adresse</strong></td><td>${b.adresse}</td></tr>
          <tr><td><strong>Surface</strong></td><td>${b.surface} m²</td></tr>
          <tr><td><strong>Étage</strong></td><td>${b.etage}</td></tr>
          <tr><td><strong>DPE</strong></td><td>${b.dpe}</td></tr>
          <tr><td><strong>Prix demandé</strong></td><td>${fmt(b.prixDemande)}</td></tr>
          <tr><td><strong>Prix offert</strong></td><td>${fmt(b.prixOffert)}</td></tr>
          <tr><td><strong>Charges/mois</strong></td><td>${fmt(b.charges)}</td></tr>
          <tr><td><strong>Taxe foncière</strong></td><td>${fmt(b.taxe)}/an</td></tr>
          <tr><td><strong>Loyer estimé</strong></td><td>${fmt(b.loyer)}/mois</td></tr>
          <tr><td><strong>Agence</strong></td><td>${b.agence}</td></tr>
          <tr><td><strong>Statut</strong></td><td>${badgeStatut(b.statut)}</td></tr>
          <tr><td><strong>Avis</strong></td><td>${b.avis}</td></tr>
          <tr><td><strong>Notes</strong></td><td>${b.notes}</td></tr>
        </tbody>
      </table>
    </div>
  `;
}

// boutons pour modifier les valeurs du bien (prix offert, statut, notes...)
// ajouter un bouton permettant d'ouvrir une fenêtre d'ajout d'un nouveau bien (avec les champs adresse, surface, prix demandé, prix offert, statut, notes...)
// ajouetr une liste déroulante des différents biens ajoutés et afficher les infos du bien sélectionné dans la table
// TODO Banques : ajouter plus tard un mini résumé
// - nombre d'offres reçues
// - nombre d'offres acceptées
// - éventuellement meilleur taux proposé
// - afficher plus tard le meilleur taux via tauxValue
// - etre plus soubple sur le valeur de taux (ex: 3.5 ou 3,5 ou 3,50) et convertir en nombre pour comparaison ou calculs futurs
// - ajouter un bouton pour rajouter une banque personnalisée (avec nom, statut, taux, notes)
// TODO : rendre les délais du calendrier ajustables par l'utilisateur


// ── BANQUES ──────────────────────────────────────────
function renderBanques() {
  const statutOptions = ['À contacter', 'En attente', 'Offre reçue', 'Accepté', 'Refusé'];
  const rows = DATA.banques.map((b, i) => `
    <tr>
      <td>${i + 1}</td> 
      <td><strong>${b.nom}</strong></td>
      <td>
        <select onchange="DATA.banques[${i}].statut = this.value; save()">
          ${statutOptions.map(o => `<option${o === b.statut ? ' selected' : ''}>${o}</option>`).join('')}
        </select>
      </td>
      <td><input type="number" placeholder="EX 3.54" value="${b.taux || ''}" oninput="DATA.banques[${i}].taux = this.value; saveDebounced()" style="width:120px" step="0.01" min="0"></td>
      <td><input type="text" placeholder="Notes..." value="${b.notes || ''}" oninput="DATA.banques[${i}].notes = this.value; saveDebounced()" style="width:220px"></td>
    </tr>`).join('');
  return `
    <h1 class="section-title">🏦 Banques & Financement</h1>
    <p class="section-sub">Suivi des démarches bancaires</p>
    <div class="table-wrap">
      <table>
        <thead><tr><th>#</th><th>Banque</th><th>Statut</th><th>Taux(%)</th><th>Notes</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}


    // ── SIMULATION CRÉDIT ─────────────────────────────────
function renderCredit() {
  const capital = 150000;
  const taux    = [3.0, 3.5, 4.0, 4.5];
  const durees  = [15, 20, 25];
  const assurance = 0.003;

  // Calcule la mensualité (formule prêt amortissable)
  function mensualite(capital, tauxAnnuel, dureeAns) {
    const r = (tauxAnnuel / 100) / 12;
    const n = dureeAns * 12;
    return capital * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  // Lignes mensualités
  const rowsMens = durees.map(d => `
    <tr>
      <td><strong>${d} ans</strong></td>
      ${taux.map(t => {
        const m = mensualite(capital, t, d);
        const assur = (capital * assurance) / 12;
        return `<td>${Math.round(m + assur).toLocaleString('fr-FR')} €</td>`;
      }).join('')}
    </tr>
  `).join('');

  // Lignes coût total
  const rowsTotal = durees.map(d => `
    <tr>
      <td><strong>${d} ans</strong></td>
      ${taux.map(t => {
        const m = mensualite(capital, t, d);
        const assur = (capital * assurance) / 12;
        const total = (m + assur) * d * 12;
        return `<td>${Math.round(total).toLocaleString('fr-FR')} €</td>`;
      }).join('')}
    </tr>
  `).join('');

  return `
    <h1 class="section-title">💳 Simulation Crédit</h1>
    <p class="section-sub">Capital : 150 000 € · Assurance : 0,3 %/an incluse</p>

    <h2 style="font-size:1rem;font-weight:600;margin-bottom:0.75rem;color:var(--text-muted)">
      Mensualités (capital + assurance)
    </h2>
    <div class="table-wrap" style="margin-bottom:1.5rem">
      <table>
        <thead><tr>
          <th>Durée</th>
          ${taux.map(t => `<th>Taux ${t} %</th>`).join('')}
        </tr></thead>
        <tbody>${rowsMens}</tbody>
      </table>
    </div>

    <h2 style="font-size:1rem;font-weight:600;margin-bottom:0.75rem;color:var(--text-muted)">
      Coût total du crédit
    </h2>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>Durée</th>
          ${taux.map(t => `<th>Taux ${t} %</th>`).join('')}
        </tr></thead>
        <tbody>${rowsTotal}</tbody>
      </table>
    </div>
    <p style="font-size:0.8125rem;color:var(--text-muted)">
      💡 Mensualité idéale : viser moins de 33 % de tes revenus nets mensuels.
    </p>
  `;
}

// ── ANALYSE FINANCIÈRE ────────────────────────────────
function renderAnalyse() {
  const scenarios = [
    { nom: 'Prudent',   prix: 152000, travaux: 4000,  loyer: 900, charges: 984, taxe: 575, energie: 1013, reval: 2.0 },
    { nom: 'Équilibré', prix: 156000, travaux: 2500,  loyer: 900, charges: 984, taxe: 575, energie: 1013, reval: 2.0 },
    { nom: 'Offensif',  prix: 158000, travaux: 1000,  loyer: 900, charges: 984, taxe: 575, energie: 1013, reval: 2.0 },
  ];

  const notaire = 0.078;

  const rows = scenarios.map(s => {
    const fraisNotaire = Math.round(s.prix * notaire);
    const coutTotal    = s.prix + s.travaux + fraisNotaire;
    const loyerAnnuel  = s.loyer * 12;
    const rendBrut     = ((loyerAnnuel / coutTotal) * 100).toFixed(2);
    const chargesTotal = s.charges + s.taxe + s.energie;
    const rendNet      = (((loyerAnnuel - chargesTotal) / coutTotal) * 100).toFixed(2);
    const revente3     = Math.round(coutTotal * Math.pow(1 + s.reval / 100, 3));
    const revente5     = Math.round(coutTotal * Math.pow(1 + s.reval / 100, 5));
    const pv3          = revente3 - coutTotal;
    const pv5          = revente5 - coutTotal;

    return `
  <tr>
    <td><strong>${s.nom}</strong></td>
    <td>${fmt(s.prix)}</td><td>${fmt(s.travaux)}</td>
    <td>${fmt(fraisNotaire)}</td><td>${fmt(coutTotal)}</td>
    <td>${rendBrut} %</td><td>${rendNet} %</td>
    <td>${fmt(revente3)} (+${fmt(pv3)})</td>
    <td>${fmt(revente5)} (+${fmt(pv5)})</td>
  </tr>`;
  }).join('');

return `
  <h1 class="section-title">📊 Analyse Financière</h1>
  <p class="section-sub">69 av. Victor Hugo · Revalorisation annuelle : 2 %</p>
  <div class="table-wrap"><table>
    <thead><tr>
      <th>Scénario</th><th>Prix</th><th>Travaux</th><th>Frais notaire</th>
      <th>Coût total</th><th>Rend. brut</th><th>Rend. net</th>
      <th>Revente 3 ans</th><th>Revente 5 ans</th>
    </tr></thead>
    <tbody>${rows}</tbody>
  </table></div>
  <div style="max-width:600px; margin: 2rem auto;">
    <canvas id="chartAnalyse"></canvas>
  </div>
`;

}

// ── DOCUMENTS ─────────────────────────────────────────
function renderDocuments() {
  const statutOptions = ['⬜ À faire', '🔄 En cours', '✅ Fourni', '❌ Non applicable'];

  const rows = DATA.documents.map((d,i) => `
    <tr>
      <td style="color:var(--text-muted);font-size:0.8125rem">${d.id}</td>
      <td>${d.doc}</td>
      <td><span style="font-size:0.8125rem;color:var(--text-muted)">${d.cat}</span></td>
      <td>
        <select onchange="DATA.documents[${i}].statut = this.value; save()">
          ${statutOptions.map(o =>
            `<option ${o === d.statut ? 'selected' : ''}>${o}</option>`
          ).join('')}
        </select>
      </td>
      <td><input type="text" placeholder="Notes..." value="${d.notes || ''}" oninput="DATA.documents[${i}].notes = this.value; saveDebounced()" style="width:180px" /></td>
    </tr>
  `).join('');

    const faits   = DATA.documents.filter(d => d.statut === '✅ Fourni').length;
  const total   = DATA.documents.length;
  const pct     = Math.round((faits / total) * 100);

  return `
    <h1 class="section-title">📋 Documents à Fournir</h1>
    <p class="section-sub">
      Checklist dossier bancaire · 
      <strong style="color:var(--primary)">${faits}/${total} fournis (${pct} %)</strong>
    </p>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>#</th><th>Document</th><th>Catégorie</th><th>Statut</th><th>Notes</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

// Calcul d'une date prévisionnelle en ajoutant un nombre de jours à la date de visite.
function calculerDatePrevi(dateVisite, joursOffset) {
  if (!dateVisite) return '';
  const d = new Date(dateVisite);
   if (isNaN(d.getTime())) return '';
  d.setDate(d.getDate() + joursOffset);
  return d.toLocaleDateString('fr-FR');
}

function getDateBase() {
  return DATA.calendrier[0]?.dateReelle || DATA.calendrier[0]?.cible || '';
}

// ── CALENDRIER ────────────────────────────────────────
function renderCalendrier() {
  const phaseColors = {
    'Découverte'  : 'badge-todo',
    'Négociation' : 'badge-warning',
    'Financement' : 'badge-doing',
    'Notaire'     : 'badge-done',
    'Finalisation': 'badge-todo',
  };

  const statutOptions = ['⬜ À faire', '🔄 En cours', '✅ Fait', '⚠️ Bloqué'];

  const rows = DATA.calendrier.map((e,i) => `
    <tr>
      <td style="color:var(--text-muted);font-size:0.8125rem">${e.id}</td>
      <td>${e.etape}</td>
      <td><span class="badge ${phaseColors[e.phase] || 'badge-todo'}">${e.phase}</span></td>
      <td>${i === 0
          ? `<input type="date" value="${e.cible || ''}" oninput="DATA.calendrier[${i}].cible = this.value; save(); render('calendrier')" style="width:140px" />`
          : (getDateBase() ? (calculerDatePrevi(getDateBase(), e.delai) || e.cible) : e.cible)
        }</td>
      <td><input type="date" value="${e.dateReelle || ''}" oninput="DATA.calendrier[${i}].dateReelle = this.value; save(); render('calendrier')" style="width:140px" /></td>
      <td>
        <select onchange="DATA.calendrier[${i}].statut = this.value; save()">
          ${statutOptions.map(o =>
            `<option ${o === e.statut ? 'selected' : ''}>${o}</option>`
          ).join('')}
        </select>
      </td>
      <td><input type="text" placeholder="Notes..." value="${e.notes || ''}" oninput="DATA.calendrier[${i}].notes = this.value; saveDebounced()" style="width:160px" /></td>
    </tr>
  `).join('');

  const faites = DATA.calendrier.filter(e => e.statut === '✅ Fait').length;
  const total  = DATA.calendrier.length;
  const pct    = Math.round((faites / total) * 100);

  return `
    <h1 class="section-title">📅 Calendrier des Étapes</h1>
    <p class="section-sub">
      Offre → Compromis → Financement → Clés · ~3 à 4 mois ·
      <strong style="color:var(--primary)">${faites}/${total} complétées (${pct} %)</strong>
    </p>

    <div style="margin-bottom:1.5rem;display:flex;align-items:center;gap:1rem">
      <span style="font-weight:600">⚠️ La date de visite est saisie dans la première étape du calendrier.</span>
    </div>

    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>#</th><th>Étape</th><th>Phase</th>
          <th>Date cible</th><th>Date réelle</th><th>Statut</th><th>Notes</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

// ── CONTACTS ──────────────────────────────────────────
function renderContacts() {
  const rows = DATA.contacts.map(c => `
    <tr>
      <td><strong>${c.role}</strong></td>
      <td>${c.societe}</td>
      <td>${c.nom}</td>
      <td>${c.tel
        ? `<a href="tel:${c.tel}" style="color:var(--primary)">${c.tel}</a>`
        : '<span style="color:var(--text-muted)">—</span>'
      }</td>
      <td>${c.email
        ? `<a href="mailto:${c.email}" style="color:var(--primary)">${c.email}</a>`
        : '<span style="color:var(--text-muted)">—</span>'
      }</td>
      <td style="color:var(--text-muted);font-size:0.8125rem">${c.notes}</td>
    </tr>
  `).join('');

  return `
    <h1 class="section-title">👥 Contacts Clés</h1>
    <p class="section-sub">Tous vos interlocuteurs · 16/04/2026</p>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>Rôle</th><th>Société</th><th>Nom</th>
          <th>Téléphone</th><th>Email</th><th>Notes</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

// ── COPROPRIÉTÉ ───────────────────────────────────────
function renderCopro() {
  const rows = DATA.copro.map(r => `
    <tr>
      <td>${r.annee}</td>
      <td style="color:var(--text-muted)">${r.res}</td>
      <td>${r.sujet}</td>
      <td>${r.decision}</td>
      <td>${r.budget > 0 ? fmt(r.budget) : '—'}</td>
      <td>${r.subvention > 0 ? fmt(r.subvention) : '—'}</td>
      <td><span style="font-size:0.8125rem;color:var(--text-muted)">${r.statut}</span></td>
      <td style="font-size:0.8125rem;${r.impact.includes('MAJEUR') ? 'color:var(--error);font-weight:700' : 'color:var(--warning)'}">
        ${r.impact}
      </td>
      <td style="font-size:0.8125rem;color:var(--text-muted);max-width:200px">${r.notes}</td>
    </tr>
  `).join('');

  return `
    <h1 class="section-title">🏢 Résumé PV Copropriété</h1>
    <p class="section-sub">69 av. Victor Hugo · AG 2023 / 2024 / 2025</p>

    <div class="table-wrap" style="margin-bottom:1rem">
      <table>
        <thead><tr>
          <th>Année</th><th>Résolution</th><th>Sujet</th><th>Décision</th>
          <th>Budget</th><th>Subvention</th><th>Statut</th><th>Impact</th><th>Notes</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>

    <div style="
      background:rgba(161,44,123,0.08);
      border:1px solid var(--error);
      border-radius:var(--radius);
      padding:1rem 1.25rem;
      font-size:0.875rem;
    ">
      <strong style="color:var(--error)">⚠️⚠️ RISQUE MAJEUR — PPPT / DTG non réalisé</strong><br/>
      <span style="color:var(--text-muted)">
        Obligation légale (loi Climat 2021) non remplie. 
        Un gros appel de fonds est possible à tout moment. 
        À négocier absolument avant signature du compromis.
      </span>
    </div>
  `;
}

// ── RENDER PRINCIPAL ──────────────────────────────────
function render(section) {
  sessionStorage.setItem('activeSection', section);// Sauvegarde de la section active dans le sessionStorage pour persistance lors du rafraîchissement de la page
  const sections = {
    dashboard  : renderDashboard,
    biens      : renderBiens,
    banques    : renderBanques,
    credit     : renderCredit,
    analyse    : renderAnalyse,
    documents  : renderDocuments,
    calendrier : renderCalendrier,
    contacts   : renderContacts,
    copro      : renderCopro,
  };
  app.innerHTML = sections[section] ? sections[section]() : '<p>Section introuvable</p>';
  if (section === 'analyse') initChartAnalyse();
}


// ── DÉMARRAGE ─────────────────────────────────────────
const lastSection = sessionStorage.getItem('activeSection') || 'dashboard';
render(lastSection);

// Mettre le bouton nav actif correspondant
navBtns.forEach(b => {
  if (b.dataset.section === lastSection) b.classList.add('active');
  else b.classList.remove('active');
});