// ==========================================
// TSE PRODUCTS PAGE ENGINE
// ==========================================

// ---- Active pill on scroll ----
(function () {
    const pills = document.querySelectorAll('.product-hero-pill');
    const sections = ['itoms', 'archiving', 'b2b', 'accounting-tool'];

    function updateActivePill() {
        let current = sections[0];
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el && window.scrollY >= el.offsetTop - 160) {
                current = id;
            }
        });

        pills.forEach(pill => {
            const href = pill.getAttribute('href');
            pill.classList.toggle('active', href === '#' + current);
        });
    }

    window.addEventListener('scroll', updateActivePill, { passive: true });
    updateActivePill();
})();

// ---- Reservations card -> Architecture diagram modal ----
(function () {
    const trigger = document.getElementById('cap-card-reservations');
    const modal = document.getElementById('itoms-arch-modal');
    if (!trigger || !modal) return;

    const closeBtn = document.getElementById('itoms-arch-modal-close');
    let lastFocused = null;

    function openModal() {
        lastFocused = document.activeElement;
        modal.hidden = false;
        // Allow the browser to register display before transitioning opacity
        requestAnimationFrame(() => modal.classList.add('is-open'));
        document.body.style.overflow = 'hidden';
        if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
        const onTransitionEnd = () => {
            modal.hidden = true;
            modal.removeEventListener('transitionend', onTransitionEnd);
        };
        modal.addEventListener('transitionend', onTransitionEnd);
        if (lastFocused && typeof lastFocused.focus === 'function') {
            lastFocused.focus();
        }
    }

    trigger.addEventListener('click', openModal);
    trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal();
        }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Click outside the dialog closes it
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Escape key closes it
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hidden) closeModal();
    });
})();

// ---- Extend translations for products page ----
document.addEventListener('DOMContentLoaded', () => {
    if (typeof translations === 'undefined') return;

    const productsEn = {
        // Hero
        "products-eyebrow": "Our Software Suite",
        "products-hero-title": "Purpose-Built for Tour Operators",
        "products-hero-desc": "Four integrated platforms designed from the ground up to handle every complexity of incoming tour operations — from booking and finance to digital archiving.",
        "products-pill-itoms": "ITOMS",
        "products-pill-archiving": "Archiving",
        "products-pill-b2b": "B2B Portal",
        "products-pill-accounting": "Operational Accounting Tool",

        // ITOMS
        "itoms-eyebrow": "Flagship Platform",
        "itoms-title-main": "ITOMS",
        "itoms-subtitle": "Incoming Tour Operators Management System",
        "itoms-desc-long": "ITOMS is a comprehensive, AI-supported sales, reservation, and management system based on state-of-the-art computer technology, advanced software design, and practical travel-industry experience. It comes ready with a complete operational database covering hotels, Nile Cruises, transport schedules, and guide information across Egypt.",
        "itoms-feat-1-title": "Multi-User System",
        "itoms-feat-1-desc": "In-house, multi-user operation requiring no on-site programming staff for maintenance.",
        "itoms-feat-2-title": "Multi-Currency & Language",
        "itoms-feat-2-desc": "Full multi-language and multi-currency support with seamless ledger adjustments.",
        "itoms-feat-3-title": "AI & Analytics",
        "itoms-feat-3-desc": "AI-assisted capabilities and data analysis reports help teams understand business dynamics and make informed decisions.",
        "itoms-feat-4-title": "Operational Accounting",
        "itoms-feat-4-desc": "Managed accounts payable, receivable, operational accounting, and reporting.",
        "itoms-cta": "Request ITOMS Demo",
        "itoms-arch-eyebrow": "System Architecture",
        "itoms-arch-title": "How ITOMS Connects Every Operation",
        "itoms-arch-desc": "At the core sits a single, unified database feeding every operational module. Flights, land services, packages, and pricing all flow into Reservations — the central hub that drives management reporting, document printing, and accounting in real time.",
        "cap-allotment": "Allotment Control",
        "cap-allotment-desc": "Automated hotel & cruise allotment tracking across your entire operation.",
        "cap-reservations": "Reservations",
        "cap-reservations-badge": "Core System",
        "cap-reservations-desc": "The central hub that every module feeds into — bookings, pricing, guides, and inventory all flow through here.",
        "cap-reservations-hint-text": "View architecture",
        "cap-costing": "Costing & Pricing",
        "cap-traffic": "Traffic Department",
        "cap-guides": "Guide Management",
        "cap-reports": "Management Reports",

        // Archiving
        "archiving-eyebrow": "Integrated Module",
        "archiving-title-main": "Archiving System",
        "archiving-subtitle": "Travel Filing & Document Management",
        "archiving-desc": "The Travel Filing System is fully integrated with ITOMS, dramatically reducing paper consumption and physical storage needs. Drag-and-drop emails to agency or supplier screens, auto-attach PNR documents, and retrieve any file instantly via web-based search — from anywhere.",
        "archive-node-email": "Email",
        "archive-node-fax": "Fax / Scan",
        "archive-node-docs": "Vouchers",
        "archive-node-core": "TSE Archive",
        "archive-out-agency": "Agency Filing",
        "archive-out-supplier": "Supplier Filing",
        "archive-out-pnr": "PNR Filing",
        "arch-benefit-1-title": "Save Time",
        "arch-benefit-1-desc": "Instant document retrieval directly from the PNR or agency screen — no manual searching.",
        "arch-benefit-2-title": "Web-Based Access",
        "arch-benefit-2-desc": "View, download, and print any saved document from the internet — remote access enabled.",
        "arch-benefit-3-title": "Reduce Physical Storage",
        "arch-benefit-3-desc": "Cut filing space and paper consumption significantly with digital-first document management.",
        "arch-benefit-4-title": "Custom Categories",
        "arch-benefit-4-desc": "Add your own filing categories beyond standard ones — fully customizable search and sort.",
        "archiving-cta": "Learn More About Archiving",

        // B2B
        "b2b-eyebrow": "Web Platform",
        "b2b-title-main": "B2B Portal",
        "b2b-subtitle": "Online Booking & Reservation Platform",
        "b2b-desc": "A web-based application designed to simplify and automate the booking and reservation process for travel and tourism services across Egypt. The platform enables customers to search, book, and manage travel packages, hotel accommodations, transportation services, and tourism activities through a single, user-friendly interface.",
        "b2b-feat-1": "Travel Package Search & Booking",
        "b2b-feat-1-desc": "Full-featured search engine for packages, hotels, and transport across Egypt.",
        "b2b-feat-2": "Hotel Accommodation Management",
        "b2b-feat-2-desc": "Real-time availability and confirmation for hotel bookings integrated with ITOMS allotments.",
        "b2b-feat-3": "Transportation Services",
        "b2b-feat-3-desc": "Book transfers, private vehicles, and Nile Cruises through one unified interface.",
        "b2b-feat-4": "Tourism Activities & Excursions",
        "b2b-feat-4-desc": "Manage optional excursions and activity bookings directly within the platform.",
        "b2b-cta": "Request B2B Demo",
        "b2b-mock-url": "b2b.tsegypt.com",
        "b2b-mock-search-ph": "Search packages, hotels, tours…",
        "b2b-mock-search-btn": "Search",
        "b2b-card-1-tag": "Hotel",
        "b2b-card-1-name": "Cairo Nile View",
        "b2b-card-2-tag": "Tour",
        "b2b-card-2-name": "Luxor Day Trip",
        "b2b-card-3-tag": "Cruise",
        "b2b-card-3-name": "Nile Cruise 5D",
        "b2b-live-badge": "Live & Real-Time",

        // Operational Accounting Tool
        "accounting-eyebrow": "Financial Operations",
        "accounting-title-main": "Operational Accounting Tool",
        "accounting-subtitle": "Integrated Finance Management for Tour Operators",
        "accounting-desc": "A dedicated financial operations application that connects ITOMS booking data with accounting workflows. It centralizes supplier invoices, agency payments, cash advances and settlements, expense sheets, exchange rates, approvals, and posting — reducing duplicate entry and keeping finance aligned with operations.",
        "accounting-feat-1": "ITOMS Data Synchronization",
        "accounting-feat-1-desc": "Scheduled synchronization brings suppliers, agencies, reservation files, and service details into the accounting workflow.",
        "accounting-feat-2": "Supplier Invoice Management",
        "accounting-feat-2-desc": "Create, import, review, and track supplier invoices by voucher, reservation file, or PNR.",
        "accounting-feat-3": "Payments & Expense Control",
        "accounting-feat-3-desc": "Manage agency payments, expense sheets, cash advances, settlements, banks, and exchange rates in one place.",
        "accounting-feat-4": "Approval & Posting Workflow",
        "accounting-feat-4-desc": "Apply user permissions and structured approval and posting steps for stronger financial control.",
        "accounting-cta": "Request Operational Accounting Tool Demo",
        "accounting-visual-label": "Finance Control Center",
        "accounting-visual-status": "Synced with ITOMS",
        "accounting-card-1": "Supplier Invoices",
        "accounting-card-1-sub": "By PNR and voucher",
        "accounting-card-2": "Agency Payments",
        "accounting-card-2-sub": "Payments and refunds",
        "accounting-card-3": "Cash Advances",
        "accounting-card-3-sub": "Advances and settlements",
        "accounting-card-4": "Expense Sheets",
        "accounting-card-4-sub": "Guides and representatives",
        "accounting-flow-source": "ITOMS Operations",
        "accounting-flow-target": "Operational Accounting Tool",
        "accounting-workflow-label": "Controlled financial workflow",
        "accounting-stage-1": "Import",
        "accounting-stage-2": "Review",
        "accounting-stage-3": "Approve & Post",

        // Vision
        "vision-eyebrow": "Our Vision",
        "vision-title": "One Connected Suite. Every Touchpoint.",
        "vision-desc": "We believe tour operators should spend their time crafting unforgettable experiences — not wrestling with software. TSE's integrated suite eliminates friction at every operational touchpoint, from first booking inquiry to final invoice.",
        "vision-cta": "Start the Conversation",

        "footer-tagline": "Software House Specialized In Travel Solutions",
        "footer-address": "Cairo, Egypt"
    };

    const productsAr = {
        // Hero
        "products-eyebrow": "مجموعة برامجنا",
        "products-hero-title": "مُصمَّمة خصيصاً لمنظمي الرحلات",
        "products-hero-desc": "أربع منصات متكاملة مُطوَّرة للتعامل مع تعقيدات عمليات السياحة الوافدة — من الحجز والإدارة المالية إلى الأرشفة الرقمية.",
        "products-pill-itoms": "ITOMS",
        "products-pill-archiving": "الأرشفة",
        "products-pill-b2b": "بوابة B2B",
        "products-pill-accounting": "أداة المحاسبة التشغيلية",

        // ITOMS
        "itoms-eyebrow": "المنصة الرئيسية",
        "itoms-title-main": "ITOMS",
        "itoms-subtitle": "نظام إدارة شركات السياحة الوافدة",
        "itoms-desc-long": "ITOMS نظام شامل ومدعوم بالذكاء الاصطناعي للمبيعات والحجوزات والإدارة، مبني على أحدث تقنيات الحوسبة وتصميم البرمجيات وخبرة عملية في قطاع السياحة. يأتي جاهزاً مع قاعدة بيانات تشغيلية متكاملة تشمل الفنادق ورحلات النيل وجداول المواصلات ومعلومات المرشدين في مصر.",
        "itoms-feat-1-title": "نظام متعدد المستخدمين",
        "itoms-feat-1-desc": "نظام داخلي متعدد المستخدمين لا يتطلب طواقم برمجية ميدانية للتشغيل والصيانة.",
        "itoms-feat-2-title": "متعدد العملات واللغات",
        "itoms-feat-2-desc": "دعم كامل لتعدد اللغات والعملات مع تسويات دفتر الحسابات بشكل سلس.",
        "itoms-feat-3-title": "الذكاء الاصطناعي والتحليلات",
        "itoms-feat-3-desc": "تساعد إمكانات الذكاء الاصطناعي والتقارير التحليلية فرق العمل على فهم ديناميكيات الأعمال واتخاذ قرارات مدروسة.",
        "itoms-feat-4-title": "محاسبة تشغيلية",
        "itoms-feat-4-desc": "إدارة الحسابات الدائنة والمدينة والمحاسبة التشغيلية وإعداد التقارير.",
        "itoms-cta": "طلب عرض توضيحي لـ ITOMS",
        "itoms-arch-eyebrow": "البنية التقنية للنظام",
        "itoms-arch-title": "كيف يربط ITOMS كل عمليات التشغيل",
        "itoms-arch-desc": "في جوهر النظام قاعدة بيانات موحدة واحدة تغذّي كل وحدة تشغيلية. تتدفق الطيران والخدمات البرية والباقات والتسعير جميعها إلى الحجوزات — المحور المركزي الذي يقود التقارير الإدارية وطباعة الوثائق والمحاسبة في الوقت الفعلي.",
        "cap-allotment": "التحكم بالحصص",
        "cap-allotment-desc": "تتبع تلقائي لحصص الفنادق والرحلات البحريّة عبر العملية بأكملها.",
        "cap-reservations": "الحجوزات",
        "cap-reservations-badge": "النظام المحوري",
        "cap-reservations-desc": "المحور المركزي الذي تتدفق إليه كل وحدة — الحجوزات والتسعير والمرشدون والمخزون يمرّون جميعاً من هنا.",
        "cap-reservations-hint-text": "عرض البنية التقنية",
        "cap-costing": "التكاليف والأسعار",
        "cap-traffic": "إدارة الحركة",
        "cap-guides": "إدارة المرشدين",
        "cap-reports": "التقارير الإدارية",

        // Archiving
        "archiving-eyebrow": "وحدة متكاملة",
        "archiving-title-main": "نظام الأرشفة",
        "archiving-subtitle": "حفظ الوثائق وإدارة الملفات السياحية",
        "archiving-desc": "نظام حفظ الملفات السياحي متكامل بالكامل مع ITOMS، يقلل بشكل كبير من استهلاك الورق ومساحة التخزين المادي. اسحب وأفلت رسائل البريد الإلكتروني على شاشة الوكالة أو المورد، ألحق وثائق PNR تلقائياً، واسترجع أي ملف فوراً عبر البحث القائم على الويب — من أي مكان.",
        "archive-node-email": "البريد الإلكتروني",
        "archive-node-fax": "فاكس / مسح",
        "archive-node-docs": "الإيصالات",
        "archive-node-core": "أرشيف TSE",
        "archive-out-agency": "ملفات الوكالة",
        "archive-out-supplier": "ملفات المورد",
        "archive-out-pnr": "ملفات PNR",
        "arch-benefit-1-title": "توفير الوقت",
        "arch-benefit-1-desc": "استرجاع فوري للوثائق مباشرة من شاشة PNR أو الوكالة — لا بحث يدوي.",
        "arch-benefit-2-title": "وصول عبر الويب",
        "arch-benefit-2-desc": "عرض أي وثيقة محفوظة وتنزيلها وطباعتها من الإنترنت — وصول عن بُعد.",
        "arch-benefit-3-title": "تقليل مساحة التخزين",
        "arch-benefit-3-desc": "خفّض مساحة الحفظ واستهلاك الورق بشكل ملحوظ مع إدارة المستندات الرقمية.",
        "arch-benefit-4-title": "فئات مخصصة",
        "arch-benefit-4-desc": "أضف فئات حفظ خاصة بك تتجاوز الفئات القياسية — بحث وترتيب مرنان بالكامل.",
        "archiving-cta": "اعرف المزيد عن الأرشفة",

        // B2B
        "b2b-eyebrow": "منصة الويب",
        "b2b-title-main": "بوابة B2B",
        "b2b-subtitle": "منصة الحجز والحجوزات الإلكترونية",
        "b2b-desc": "تطبيق ويب مصمم لتبسيط وأتمتة عملية الحجز للخدمات السياحية عبر مصر. تُتيح المنصة للعملاء البحث وحجز وإدارة باقات السفر والإقامة الفندقية وخدمات المواصلات والأنشطة السياحية من خلال واجهة واحدة سهلة الاستخدام.",
        "b2b-feat-1": "البحث وحجز الباقات السياحية",
        "b2b-feat-1-desc": "محرك بحث متكامل للباقات والفنادق والمواصلات في أنحاء مصر.",
        "b2b-feat-2": "إدارة الإقامة الفندقية",
        "b2b-feat-2-desc": "توافر وتأكيد فوري لحجوزات الفنادق متكامل مع حصص ITOMS.",
        "b2b-feat-3": "خدمات المواصلات",
        "b2b-feat-3-desc": "احجز التنقلات والسيارات الخاصة ورحلات النيل عبر واجهة موحدة.",
        "b2b-feat-4": "الأنشطة والرحلات الاختيارية",
        "b2b-feat-4-desc": "إدارة الرحلات الاختيارية وحجوزات الأنشطة مباشرة ضمن المنصة.",
        "b2b-cta": "طلب عرض توضيحي لـ B2B",
        "b2b-mock-url": "b2b.tsegypt.com",
        "b2b-mock-search-ph": "ابحث عن باقات، فنادق، جولات...",
        "b2b-mock-search-btn": "بحث",
        "b2b-card-1-tag": "فندق",
        "b2b-card-1-name": "القاهرة نيل فيو",
        "b2b-card-2-tag": "جولة",
        "b2b-card-2-name": "رحلة الأقصر",
        "b2b-card-3-tag": "كروز",
        "b2b-card-3-name": "رحلة نيل 5 أيام",
        "b2b-live-badge": "مباشر وفوري",

        // Operational Accounting Tool
        "accounting-eyebrow": "العمليات المالية",
        "accounting-title-main": "أداة المحاسبة التشغيلية",
        "accounting-subtitle": "إدارة مالية متكاملة لشركات السياحة",
        "accounting-desc": "تطبيق متخصص للعمليات المالية يربط بيانات الحجوزات في ITOMS بمسارات العمل المحاسبية. يجمع فواتير الموردين ومدفوعات الوكالات والسلف النقدية وتسوياتها وكشوف المصروفات وأسعار الصرف والموافقات والترحيل في مكان واحد، مما يقلل تكرار إدخال البيانات ويحافظ على توافق الإدارة المالية مع التشغيل.",
        "accounting-feat-1": "مزامنة البيانات مع ITOMS",
        "accounting-feat-1-desc": "تنقل المزامنة المجدولة بيانات الموردين والوكالات وملفات الحجز وتفاصيل الخدمات إلى مسار العمل المحاسبي.",
        "accounting-feat-2": "إدارة فواتير الموردين",
        "accounting-feat-2-desc": "إنشاء واستيراد ومراجعة وتتبع فواتير الموردين حسب القسيمة أو ملف الحجز أو رقم PNR.",
        "accounting-feat-3": "إدارة المدفوعات والمصروفات",
        "accounting-feat-3-desc": "إدارة مدفوعات الوكالات وكشوف المصروفات والسلف النقدية والتسويات والبنوك وأسعار الصرف في مكان واحد.",
        "accounting-feat-4": "مسار الموافقة والترحيل",
        "accounting-feat-4-desc": "تطبيق صلاحيات المستخدمين وخطوات منظمة للموافقة والترحيل لتعزيز الرقابة المالية.",
        "accounting-cta": "اطلب عرضاً توضيحياً لأداة المحاسبة التشغيلية",
        "accounting-visual-label": "مركز الرقابة المالية",
        "accounting-visual-status": "متزامن مع ITOMS",
        "accounting-card-1": "فواتير الموردين",
        "accounting-card-1-sub": "حسب PNR والقسيمة",
        "accounting-card-2": "مدفوعات الوكالات",
        "accounting-card-2-sub": "المدفوعات والاستردادات",
        "accounting-card-3": "السلف النقدية",
        "accounting-card-3-sub": "السلف والتسويات",
        "accounting-card-4": "كشوف المصروفات",
        "accounting-card-4-sub": "المرشدون والمندوبون",
        "accounting-flow-source": "عمليات ITOMS",
        "accounting-flow-target": "أداة المحاسبة التشغيلية",
        "accounting-workflow-label": "مسار مالي منظم",
        "accounting-stage-1": "استيراد",
        "accounting-stage-2": "مراجعة",
        "accounting-stage-3": "موافقة وترحيل",

        // Vision
        "vision-eyebrow": "رؤيتنا",
        "vision-title": "منظومة مترابطة. لكل نقطة تشغيل.",
        "vision-desc": "نؤمن بأن منظمي الرحلات يجب أن يقضوا وقتهم في صياغة تجارب لا تُنسى — لا في الكفاح مع البرامج. تُزيل مجموعة TSE المتكاملة الاحتكاك عند كل نقطة تشغيلية، من أول استفسار حجز وحتى الفاتورة النهائية.",
        "vision-cta": "ابدأ المحادثة",

        "footer-tagline": "شركة برمجيات متخصصة في حلول السفر",
        "footer-address": "القاهرة، مصر"
    };

    Object.assign(translations.en, productsEn);
    Object.assign(translations.ar, productsAr);

    // Re-apply current language to pick up the new keys
    const currentLang = document.documentElement.getAttribute('lang') || 'en';
    if (typeof setLanguage === 'function') {
        setLanguage(currentLang, true);
    }
});
