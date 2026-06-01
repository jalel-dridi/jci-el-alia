/**
 * Local seed/fallback content — real JCI El Alia data from
 * content/chapter-info-extracted.md, shaped exactly like Sanity returns it
 * ({ en, fr, ar } locale objects). Used when the CMS is empty or offline,
 * and reused later to seed the dashboard.
 */

export const siteSettings = {
  year: 2026,
  theme: {en: 'Honor The Legacy', fr: 'Honorer l’Héritage', ar: 'تكريم الإرث'},
  heroTitle: {
    en: 'Developing Leaders for a Changing World',
    fr: 'Développer des Leaders pour un Monde en Évolution',
    ar: 'تطوير القادة لعالم متغيّر',
  },
  heroSubtitle: {
    en: 'JCI El Alia empowers young citizens aged 18-40 to create positive change through leadership, action, and international cooperation.',
    fr: 'JCI El Alia permet aux jeunes citoyens de 18 à 40 ans de créer un changement positif à travers le leadership, l’action et la coopération internationale.',
    ar: 'الغرفة الفتية العالمية بالعالية تمكّن الشباب من 18 إلى 40 سنة من إحداث تغيير إيجابي من خلال القيادة والعمل والتعاون الدولي.',
  },
  yearsOfImpact: 36,
  activeMembers: 47,
  projectsDelivered: 50,
  email: 'jcielalia@gmail.com',
  phone: '+216 20 382 274',
  address: 'Avenue Habib Bourguiba, El Alia 7016, Tunisia',
  facebook: 'https://www.facebook.com/jcielalia',
  instagram: '',
  linkedin: 'https://www.linkedin.com/in/jci-el-alia',
}

export const presidents = [
  {year: 2018, name: 'Hedy Chouria', slogan: {en: 'Chapter Revival', fr: 'Renaissance du Chapitre', ar: 'إحياء الغرفة'}},
  {year: 2019, name: 'Hedy Chouria', slogan: {en: 'Building Momentum', fr: 'Créer l’Élan', ar: 'بناء الزخم'}},
  {year: 2020, name: 'Taha Said', slogan: {en: 'Upgrade The Movement', fr: 'Élever le Mouvement', ar: 'الارتقاء بالحركة'}},
  {year: 2021, name: 'Slim Boughoula', slogan: {en: 'Stronger Together', fr: 'Plus Forts Ensemble', ar: 'أقوى معاً'}},
  {year: 2022, name: 'Haitham Aouina', slogan: {en: 'Either Find a Way, or Make One', fr: 'Trouver une Voie ou la Créer', ar: 'جد طريقاً أو اصنع واحداً'}},
  {year: 2023, name: 'Brahim Ben Hassine', slogan: {en: 'One Chapter, One Nation, One Destiny', fr: 'Un Chapitre, Une Nation, Un Destin', ar: 'غرفة واحدة، أمة واحدة، مصير واحد'}},
  {year: 2024, name: 'Manar Msaad', slogan: {en: 'Lead with Heart, Serve with Purpose', fr: 'Diriger avec Cœur, Servir avec Sens', ar: 'قُد بقلبك، اخدم بهدف'}},
  {year: 2025, name: 'Mongia Lahbib', slogan: {en: 'Together We Lead, Together We Succeed', fr: 'Ensemble Nous Dirigeons, Ensemble Nous Réussissons', ar: 'معاً نقود، معاً ننجح'}},
  {year: 2026, name: 'Jalel Dridi', slogan: {en: 'Honor The Legacy', fr: 'Honorer l’Héritage', ar: 'تكريم الإرث'}, current: true},
]

export const pillars = [
  {
    icon: 'fa-user-graduate',
    color: 'jci-blue',
    title: {en: 'Individual Development', fr: 'Développement Individuel', ar: 'التنمية الفردية'},
    description: {
      en: 'Build confidence, communication, and leadership skills through hands-on training programs.',
      fr: 'Développer la confiance, la communication et les compétences en leadership à travers des formations pratiques.',
      ar: 'بناء الثقة والتواصل ومهارات القيادة من خلال برامج تدريبية عملية.',
    },
  },
  {
    icon: 'fa-hands-helping',
    color: 'jci-teal',
    title: {en: 'Community Impact', fr: 'Impact Communautaire', ar: 'الأثر المجتمعي'},
    description: {
      en: 'Drive meaningful change through environmental, health, and educational initiatives in El Alia.',
      fr: 'Créer un changement significatif à travers des initiatives environnementales, sanitaires et éducatives.',
      ar: 'إحداث تغيير ملموس من خلال مبادرات بيئية وصحية وتعليمية في العالية.',
    },
  },
  {
    icon: 'fa-globe',
    color: 'jci-navy',
    title: {en: 'International Cooperation', fr: 'Coopération Internationale', ar: 'التعاون الدولي'},
    description: {
      en: 'Connect with chapters worldwide through twinning programs and cultural exchanges.',
      fr: 'Se connecter avec des chapitres du monde entier à travers des programmes de jumelage et des échanges culturels.',
      ar: 'التواصل مع غرف حول العالم من خلال برامج التوأمة والتبادل الثقافي.',
    },
  },
  {
    icon: 'fa-lightbulb',
    color: 'jci-yellow',
    title: {en: 'Business & Entrepreneurship', fr: 'Économie & Entrepreneuriat', ar: 'الاقتصاد وريادة الأعمال'},
    description: {
      en: 'Support local youth entrepreneurship through workshops, hackathons, and mentoring.',
      fr: 'Soutenir l’entrepreneuriat des jeunes à travers des ateliers, hackathons et mentorat.',
      ar: 'دعم ريادة الأعمال الشبابية من خلال ورشات عمل وهاكاثونات وإرشاد.',
    },
  },
]

export const projects = [
  {
    order: 1,
    icon: 'fa-compass',
    title: {en: "Orient'Up", fr: "Orient'Up", ar: "Orient'Up"},
    category: {en: 'Education', fr: 'Éducation', ar: 'تعليم'},
    metric: {en: '240+ participants', fr: '240+ participants', ar: 'أكثر من 240 مشارك'},
    description: {
      en: 'Annual university orientation forum helping baccalaureate students choose their academic path. 4 editions, 240+ participants.',
      fr: "Forum annuel d'orientation universitaire aidant les bacheliers à choisir leur parcours académique. 4 éditions, 240+ participants.",
      ar: 'منتدى سنوي للتوجيه الجامعي يساعد تلاميذ البكالوريا في اختيار مسارهم الأكاديمي. 4 نسخ، أكثر من 240 مشارك.',
    },
  },
  {
    order: 2,
    icon: 'fa-store',
    title: {en: 'Intalqa / إنطلاقة', fr: 'Intalqa / إنطلاقة', ar: 'إنطلاقة'},
    category: {en: 'Entrepreneurship', fr: 'Entrepreneuriat', ar: 'ريادة أعمال'},
    metric: {en: '2 editions', fr: '2 éditions', ar: 'نسختان'},
    description: {
      en: 'Supporting small business owners and artisans through training workshops and a marketplace exhibition for local products.',
      fr: "Soutien aux petits entrepreneurs et artisans à travers des ateliers de formation et un marché d'exposition de produits locaux.",
      ar: 'دعم أصحاب المشاريع الصغيرة والحرفيين من خلال ورشات تكوينية ومعرض لعرض المنتجات المحلية.',
    },
  },
  {
    order: 3,
    icon: 'fa-laptop-code',
    title: {en: 'InnoVenture Hackathon', fr: 'InnoVenture Hackathon', ar: 'هاكاثون إينوفنتشر'},
    category: {en: 'Innovation', fr: 'Innovation', ar: 'ابتكار'},
    metric: {en: '2025', fr: '2025', ar: '2025'},
    description: {
      en: 'A hackathon fostering innovation with coding challenges, entrepreneurship workshops, and team competitions.',
      fr: "Un hackathon favorisant l'innovation avec des défis de programmation, des ateliers d'entrepreneuriat et des compétitions d'équipe.",
      ar: 'هاكاثون لتعزيز الابتكار مع تحديات برمجية وورشات ريادة أعمال ومسابقات فرق.',
    },
  },
  {
    order: 4,
    icon: 'fa-futbol',
    title: {en: 'El Alia Champions Cup', fr: 'El Alia Champions Cup', ar: 'كأس أبطال العالية'},
    category: {en: 'Community', fr: 'Communauté', ar: 'مجتمع'},
    metric: {en: 'Annual event', fr: 'Événement annuel', ar: 'حدث سنوي'},
    description: {
      en: 'Multi-day sports tournament for local clubs, bringing the community together through football and handball.',
      fr: 'Tournoi sportif multi-jours pour les clubs locaux, rassemblant la communauté autour du football et du handball.',
      ar: 'دوري رياضي متعدد الأيام للأندية المحلية، يجمع المجتمع حول كرة القدم وكرة اليد.',
    },
  },
  {
    order: 5,
    icon: 'fa-book-reader',
    title: {en: "Bac'Up", fr: "Bac'Up", ar: "Bac'Up"},
    category: {en: 'Education', fr: 'Éducation', ar: 'تعليم'},
    metric: {en: 'Recurring', fr: 'Récurrent', ar: 'متكرر'},
    description: {
      en: 'Practical training program for baccalaureate students, improving their applied exam performance through specialist workshops.',
      fr: 'Programme de formation pratique pour les bacheliers, améliorant leurs performances aux examens pratiques.',
      ar: 'برنامج تدريبي تطبيقي لتلاميذ البكالوريا، يحسّن أداءهم في الامتحانات التطبيقية.',
    },
  },
  {
    order: 6,
    icon: 'fa-microphone-alt',
    title: {en: 'Voice Masters', fr: 'Voice Masters', ar: 'Voice Masters'},
    category: {en: 'Leadership', fr: 'Leadership', ar: 'قيادة'},
    metric: {en: '6 chapters', fr: '6 chapitres', ar: '6 غرف'},
    description: {
      en: 'Debate and public speaking forum in collaboration with 5 neighboring chapters, preparing members for championships.',
      fr: "Forum de débat et d'art oratoire en collaboration avec 5 chapitres voisins, préparant les membres aux championnats.",
      ar: 'منتدى مناظرة وفن خطابة بالتعاون مع 5 غرف مجاورة، يحضّر الأعضاء للبطولات.',
    },
  },
]

export const partners = [
  {order: 1, name: 'Municipality of El Alia', icon: 'fa-landmark'},
  {order: 2, name: 'Maison des Jeunes El Alia', icon: 'fa-home'},
  {order: 3, name: 'Maison des Associations', icon: 'fa-users'},
  {order: 4, name: "Complexe de l'Enfance", icon: 'fa-child'},
  {order: 5, name: 'Radio Jeunes El Alia', icon: 'fa-broadcast-tower'},
  {order: 6, name: 'CRT El Alia', icon: 'fa-seedling'},
  {order: 7, name: 'Centre Formation Agricole', icon: 'fa-tractor'},
  {order: 8, name: 'Club Jeunes & Science', icon: 'fa-flask'},
]

/** A founding/legacy quote for the testimonial section (Arvo font). */
export const testimonial = {
  quote: {
    en: 'We do not inherit a chapter, we carry a torch. Every president, every member, every project is a link in a chain that began in 1989 — and our duty is to honor that legacy by reaching further than those before us.',
    fr: "Nous n'héritons pas d'un chapitre, nous portons un flambeau. Chaque président, chaque membre, chaque projet est un maillon d'une chaîne commencée en 1989 — et notre devoir est d'honorer cet héritage en allant plus loin que nos prédécesseurs.",
    ar: 'نحن لا نرث غرفة، بل نحمل شعلة. كل رئيس، كل عضو، كل مشروع حلقة في سلسلة بدأت سنة 1989 — وواجبنا أن نُكرّم هذا الإرث بأن نصل أبعد ممن سبقونا.',
  },
  author: 'Jalel Dridi',
  role: {en: 'Local President 2026', fr: 'Président Local 2026', ar: 'الرئيس المحلي 2026'},
}

/**
 * Board members — sourced from the chapter's own Facebook award-ceremony /
 * passation posts (decoded). 2026 is the current executive board installed
 * Jan 17, 2026; 2025 is the previous board. Roles are trilingual.
 */
export const board = [
  // 2026 executive board (installed 17 Jan 2026)
  {year: 2026, order: 0, name: 'Mohamed Jalel Dridi', role: {en: 'President', fr: 'Président', ar: 'الرئيس'}},
  {year: 2026, order: 1, name: 'Mongia Lahbib', role: {en: 'Immediate Past President', fr: 'Past-Présidente Immédiate', ar: 'الرئيسة السابقة المباشرة'}},
  {year: 2026, order: 2, name: 'Mohamed Aouina', role: {en: 'VP Programs & External Relations', fr: 'VP Programmes & Relations Extérieures', ar: 'نائب الرئيس المكلف بالبرامج والعلاقات الخارجية'}},
  {year: 2026, order: 3, name: 'Hiba Said', role: {en: 'VP Training & Development', fr: 'VP Formation & Développement', ar: 'نائب الرئيس المكلف بالتكوين والتنمية'}},
  {year: 2026, order: 4, name: 'Nour Lahbib', role: {en: 'Secretary General', fr: 'Secrétaire Générale', ar: 'الكاتبة العامة'}},
  {year: 2026, order: 5, name: 'Oumaima Zaghouani', role: {en: 'Treasurer', fr: 'Trésorière', ar: 'أمينة المال'}},
  {year: 2026, order: 6, name: 'Manar Msaad', role: {en: 'Legal Counsel', fr: 'Conseillère Juridique', ar: 'المستشارة القانونية'}},
  // 2025 executive board
  {year: 2025, order: 0, name: 'Mongia Lahbib', role: {en: 'President', fr: 'Présidente', ar: 'الرئيسة'}},
  {year: 2025, order: 1, name: 'Manar Msaad', role: {en: 'Immediate Past President', fr: 'Past-Présidente Immédiate', ar: 'الرئيسة السابقة المباشرة'}},
  {year: 2025, order: 2, name: 'Sameh Abdelmajid Kouki', role: {en: 'VP Programs & External Relations', fr: 'VP Programmes & Relations Extérieures', ar: 'نائب الرئيس للبرامج والعلاقات الخارجية'}},
  {year: 2025, order: 3, name: 'Mohamed Aouina', role: {en: 'VP Training & Development', fr: 'VP Formation & Développement', ar: 'نائب الرئيس للتكوين والتطوير'}},
  {year: 2025, order: 4, name: 'Mohamed Amine Chouria', role: {en: 'Secretary General', fr: 'Secrétaire Général', ar: 'الأمين العام'}},
  {year: 2025, order: 5, name: 'Arij Mazigh', role: {en: 'Treasurer', fr: 'Trésorière', ar: 'أمينة المال'}},
  {year: 2025, order: 6, name: 'Mohamed Saidane', role: {en: 'Legal Counsel', fr: 'Conseiller Juridique', ar: 'المستشار القانوني'}},
]

/**
 * Achievements / milestones — real, verifiable highlights from the chapter's
 * history (see content/chapter-info-extracted.md).
 */
export const achievements = [
  {
    year: 2020,
    icon: 'fa-handshake',
    text: {
      en: 'Hosted JCI International Counselor Basile Djossouvi and signed a twinning with JCI Menzel Abderrahmen.',
      fr: 'A accueilli le Conseiller International JCI Basile Djossouvi et signé un jumelage avec JCI Menzel Abderrahmen.',
      ar: 'استضافت المستشار الدولي للغرفة الفتية باسيل دجوسوفي ووقّعت اتفاقية توأمة مع غرفة منزل عبد الرحمن.',
    },
  },
  {
    year: 2022,
    icon: 'fa-trophy',
    text: {
      en: 'Mohamed Aouina crowned Africa & Middle East Debating Champion; chapter hosted the Zone B Autumn Assembly.',
      fr: 'Mohamed Aouina sacré Champion de débat Afrique & Moyen-Orient ; le chapitre a accueilli les Assises d’Automne de la Zone B.',
      ar: 'محمد عوينة بطل المناظرة لإفريقيا والشرق الأوسط؛ واستضافت الغرفة الجلسة الخريفية للإقليم ب.',
    },
  },
  {
    year: 2024,
    icon: 'fa-award',
    text: {
      en: 'Won the national Arabic debate competition at the 55th National Convention in Djerba.',
      fr: 'A remporté le concours national de débat arabe à la 55e Convention Nationale à Djerba.',
      ar: 'الفوز بمسابقة المناظرة العربية الوطنية في المؤتمر الوطني الخامس والخمسين بجربة.',
    },
  },
  {
    year: 2025,
    icon: 'fa-users',
    text: {
      en: 'Grew to 47 members with an average age of 22.85, delivering flagship projects across all four areas.',
      fr: 'A grandi à 47 membres avec un âge moyen de 22,85 ans, réalisant des projets phares dans les quatre axes.',
      ar: 'نما العدد إلى 47 عضواً بمعدل عمر 22.85 سنة، مع إنجاز مشاريع رائدة في المحاور الأربعة.',
    },
  },
]
