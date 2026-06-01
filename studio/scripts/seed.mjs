/**
 * Seed the Sanity dataset with the real chapter data (presidents, projects,
 * pillars, partners, site settings). Run AFTER `sanity login` and after the
 * project ID is set in the environment.
 *
 * Usage (from the studio/ folder):
 *   $env:SANITY_STUDIO_PROJECT_ID="yourId"; $env:SANITY_WRITE_TOKEN="token"; node scripts/seed.mjs
 *
 * Create a write token at: https://sanity.io/manage -> API -> Tokens (Editor).
 * Idempotent: uses fixed _id values so re-running updates rather than dupes.
 */
import {createClient} from '@sanity/client'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const token = process.env.SANITY_WRITE_TOKEN
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

if (!projectId || !token) {
  console.error('Missing SANITY_STUDIO_PROJECT_ID or SANITY_WRITE_TOKEN env vars.')
  process.exit(1)
}

const client = createClient({projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false})

const L = (en, fr, ar) => ({en, fr, ar})

const presidents = [
  {year: 2018, name: 'Hedy Chouria', slogan: L('Chapter Revival', 'Renaissance du Chapitre', 'إحياء الغرفة')},
  {year: 2019, name: 'Hedy Chouria', slogan: L('Building Momentum', 'Créer l’Élan', 'بناء الزخم')},
  {year: 2020, name: 'Taha Said', slogan: L('Upgrade The Movement', 'Élever le Mouvement', 'الارتقاء بالحركة')},
  {year: 2021, name: 'Slim Boughoula', slogan: L('Stronger Together', 'Plus Forts Ensemble', 'أقوى معاً')},
  {year: 2022, name: 'Haitham Aouina', slogan: L('Either Find a Way, or Make One', 'Trouver une Voie ou la Créer', 'جد طريقاً أو اصنع واحداً')},
  {year: 2023, name: 'Brahim Ben Hassine', slogan: L('One Chapter, One Nation, One Destiny', 'Un Chapitre, Une Nation, Un Destin', 'غرفة واحدة، أمة واحدة، مصير واحد')},
  {year: 2024, name: 'Manar Msaad', slogan: L('Lead with Heart, Serve with Purpose', 'Diriger avec Cœur, Servir avec Sens', 'قُد بقلبك، اخدم بهدف')},
  {year: 2025, name: 'Mongia Lahbib', slogan: L('Together We Lead, Together We Succeed', 'Ensemble Nous Dirigeons, Ensemble Nous Réussissons', 'معاً نقود، معاً ننجح')},
  {year: 2026, name: 'Jalel Dridi', slogan: L('Honor The Legacy', 'Honorer l’Héritage', 'تكريم الإرث'), current: true},
]

const pillars = [
  {order: 0, icon: 'fa-user-graduate', color: 'jci-blue', title: L('Individual Development', 'Développement Individuel', 'التنمية الفردية'), description: L('Build confidence, communication, and leadership skills through hands-on training programs.', 'Développer la confiance, la communication et les compétences en leadership à travers des formations pratiques.', 'بناء الثقة والتواصل ومهارات القيادة من خلال برامج تدريبية عملية.')},
  {order: 1, icon: 'fa-hands-helping', color: 'jci-teal', title: L('Community Impact', 'Impact Communautaire', 'الأثر المجتمعي'), description: L('Drive meaningful change through environmental, health, and educational initiatives in El Alia.', 'Créer un changement significatif à travers des initiatives environnementales, sanitaires et éducatives.', 'إحداث تغيير ملموس من خلال مبادرات بيئية وصحية وتعليمية في العالية.')},
  {order: 2, icon: 'fa-globe', color: 'jci-navy', title: L('International Cooperation', 'Coopération Internationale', 'التعاون الدولي'), description: L('Connect with chapters worldwide through twinning programs and cultural exchanges.', 'Se connecter avec des chapitres du monde entier à travers des programmes de jumelage et des échanges culturels.', 'التواصل مع غرف حول العالم من خلال برامج التوأمة والتبادل الثقافي.')},
  {order: 3, icon: 'fa-lightbulb', color: 'jci-yellow', title: L('Business & Entrepreneurship', 'Économie & Entrepreneuriat', 'الاقتصاد وريادة الأعمال'), description: L('Support local youth entrepreneurship through workshops, hackathons, and mentoring.', 'Soutenir l’entrepreneuriat des jeunes à travers des ateliers, hackathons et mentorat.', 'دعم ريادة الأعمال الشبابية من خلال ورشات عمل وهاكاثونات وإرشاد.')},
]

const partners = [
  {order: 1, name: 'Municipality of El Alia', icon: 'fa-landmark'},
  {order: 2, name: 'Maison des Jeunes El Alia', icon: 'fa-home'},
  {order: 3, name: 'Maison des Associations', icon: 'fa-users'},
  {order: 4, name: "Complexe de l'Enfance", icon: 'fa-child'},
  {order: 5, name: 'Radio Jeunes El Alia', icon: 'fa-broadcast-tower'},
  {order: 6, name: 'CRT El Alia', icon: 'fa-seedling'},
  {order: 7, name: 'Centre Formation Agricole', icon: 'fa-tractor'},
  {order: 8, name: 'Club Jeunes & Science', icon: 'fa-flask'},
]

const board = [
  {year: 2025, order: 0, name: 'Mongia Lahbib', role: L('President', 'Présidente', 'الرئيسة')},
  {year: 2025, order: 1, name: 'Manar Msaad', role: L('Immediate Past President', 'Past-Présidente Immédiate', 'الرئيسة السابقة المباشرة')},
  {year: 2025, order: 2, name: 'Sameh Abdelmajid Kouki', role: L('VP Programs & External Relations', 'VP Programmes & Relations Extérieures', 'نائب الرئيس للبرامج والعلاقات الخارجية')},
  {year: 2025, order: 3, name: 'Mohamed Aouina', role: L('VP Training & Development', 'VP Formation & Développement', 'نائب الرئيس للتكوين والتطوير')},
  {year: 2025, order: 4, name: 'Mohamed Amine Chouria', role: L('Secretary General', 'Secrétaire Général', 'الأمين العام')},
  {year: 2025, order: 5, name: 'Arij Mazigh', role: L('Treasurer', 'Trésorière', 'أمينة المال')},
  {year: 2025, order: 6, name: 'Mohamed Saidane', role: L('Legal Counsel', 'Conseiller Juridique', 'المستشار القانوني')},
  {year: 2025, order: 7, name: 'Amna Lahbib', role: L('Media Officer', 'Responsable Média', 'مسؤولة الإعلام')},
]

const projects = [
  {order: 1, icon: 'fa-compass', title: L("Orient'Up", "Orient'Up", "Orient'Up"), category: L('Education', 'Éducation', 'تعليم'), metric: L('240+ participants', '240+ participants', 'أكثر من 240 مشارك'), description: L('Annual university orientation forum helping baccalaureate students choose their academic path. 4 editions, 240+ participants.', "Forum annuel d'orientation universitaire aidant les bacheliers à choisir leur parcours académique. 4 éditions, 240+ participants.", 'منتدى سنوي للتوجيه الجامعي يساعد تلاميذ البكالوريا في اختيار مسارهم الأكاديمي. 4 نسخ، أكثر من 240 مشارك.')},
  {order: 2, icon: 'fa-store', title: L('Intalqa / إنطلاقة', 'Intalqa / إنطلاقة', 'إنطلاقة'), category: L('Entrepreneurship', 'Entrepreneuriat', 'ريادة أعمال'), metric: L('2 editions', '2 éditions', 'نسختان'), description: L('Supporting small business owners and artisans through training workshops and a marketplace exhibition for local products.', "Soutien aux petits entrepreneurs et artisans à travers des ateliers de formation et un marché d'exposition de produits locaux.", 'دعم أصحاب المشاريع الصغيرة والحرفيين من خلال ورشات تكوينية ومعرض لعرض المنتجات المحلية.')},
  {order: 3, icon: 'fa-laptop-code', title: L('InnoVenture Hackathon', 'InnoVenture Hackathon', 'هاكاثون إينوفنتشر'), category: L('Innovation', 'Innovation', 'ابتكار'), metric: L('2025', '2025', '2025'), description: L('A hackathon fostering innovation with coding challenges, entrepreneurship workshops, and team competitions.', "Un hackathon favorisant l'innovation avec des défis de programmation, des ateliers d'entrepreneuriat et des compétitions d'équipe.", 'هاكاثون لتعزيز الابتكار مع تحديات برمجية وورشات ريادة أعمال ومسابقات فرق.')},
  {order: 4, icon: 'fa-futbol', title: L('El Alia Champions Cup', 'El Alia Champions Cup', 'كأس أبطال العالية'), category: L('Community', 'Communauté', 'مجتمع'), metric: L('Annual event', 'Événement annuel', 'حدث سنوي'), description: L('Multi-day sports tournament for local clubs, bringing the community together through football and handball.', 'Tournoi sportif multi-jours pour les clubs locaux, rassemblant la communauté autour du football et du handball.', 'دوري رياضي متعدد الأيام للأندية المحلية، يجمع المجتمع حول كرة القدم وكرة اليد.')},
  {order: 5, icon: 'fa-book-reader', title: L("Bac'Up", "Bac'Up", "Bac'Up"), category: L('Education', 'Éducation', 'تعليم'), metric: L('Recurring', 'Récurrent', 'متكرر'), description: L('Practical training program for baccalaureate students, improving their applied exam performance through specialist workshops.', 'Programme de formation pratique pour les bacheliers, améliorant leurs performances aux examens pratiques.', 'برنامج تدريبي تطبيقي لتلاميذ البكالوريا، يحسّن أداءهم في الامتحانات التطبيقية.')},
  {order: 6, icon: 'fa-microphone-alt', title: L('Voice Masters', 'Voice Masters', 'Voice Masters'), category: L('Leadership', 'Leadership', 'قيادة'), metric: L('6 chapters', '6 chapitres', '6 غرف'), description: L('Debate and public speaking forum in collaboration with 5 neighboring chapters, preparing members for championships.', "Forum de débat et d'art oratoire en collaboration avec 5 chapitres voisins, préparant les membres aux championnats.", 'منتدى مناظرة وفن خطابة بالتعاون مع 5 غرف مجاورة، يحضّر الأعضاء للبطولات.')},
]

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  year: 2026,
  theme: L('Honor The Legacy', 'Honorer l’Héritage', 'تكريم الإرث'),
  heroTitle: L('Developing Leaders for a Changing World', 'Développer des Leaders pour un Monde en Évolution', 'تطوير القادة لعالم متغيّر'),
  heroSubtitle: L('JCI El Alia empowers young citizens aged 18-40 to create positive change through leadership, action, and international cooperation.', 'JCI El Alia permet aux jeunes citoyens de 18 à 40 ans de créer un changement positif à travers le leadership, l’action et la coopération internationale.', 'الغرفة الفتية العالمية بالعالية تمكّن الشباب من 18 إلى 40 سنة من إحداث تغيير إيجابي من خلال القيادة والعمل والتعاون الدولي.'),
  yearsOfImpact: 36, activeMembers: 47, projectsDelivered: 50,
  email: 'jcielalia@gmail.com', phone: '+216 20 382 274',
  address: 'Avenue Habib Bourguiba, El Alia 7016, Tunisia',
  facebook: 'https://www.facebook.com/jcielalia',
  linkedin: 'https://www.linkedin.com/in/jci-el-alia',
}

async function run() {
  const tx = client.transaction()
  tx.createOrReplace(siteSettings)
  presidents.forEach((p) => tx.createOrReplace({_id: `president-${p.year}`, _type: 'president', ...p}))
  pillars.forEach((p, i) => tx.createOrReplace({_id: `pillar-${i}`, _type: 'pillar', ...p}))
  partners.forEach((p, i) => tx.createOrReplace({_id: `partner-${i}`, _type: 'partner', ...p}))
  projects.forEach((p, i) => tx.createOrReplace({_id: `project-${i}`, _type: 'project', ...p}))
  board.forEach((m, i) => tx.createOrReplace({_id: `board-${m.year}-${i}`, _type: 'boardMember', ...m}))
  await tx.commit()
  console.log('✓ Seeded: 1 settings, %d presidents, %d pillars, %d partners, %d projects, %d board',
    presidents.length, pillars.length, partners.length, projects.length, board.length)
}

run().catch((err) => { console.error(err); process.exit(1) })
