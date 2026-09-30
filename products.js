// ==========================================
// TSE PRODUCTS PAGE ENGINE
// ==========================================

// ---- Active pill on scroll ----
(function () {
    const pills = document.querySelectorAll('.product-hero-pill');
    const sections = ['itoms', 'accounting-tool', 'itoms-today', 'archiving'];

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
        "products-hero-desc": "Four integrated platforms designed from the ground up to handle every complexity of incoming tour operations — from booking and finance to digital archiving and executive insight.",
        "products-pill-itoms": "ITOMS",
        "products-pill-archiving": "Archiving",
        "products-pill-accounting": "Operational Accounting Tool",
        "products-pill-today": "ITOMS Today",

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

        // ITOMS Today
        "today-eyebrow": "Executive Dashboard",
        "today-title-main": "ITOMS Today",
        "today-subtitle": "Operational Visibility for ITOMS",
        "today-desc": "ITOMS Today turns ITOMS reservation and service data into an executive dashboard for fast operational oversight. Review financial totals, booking volumes, service-line activity, top services, and supplier performance from one focused view, with controlled date ranges and role-based access.",
        "today-feat-1": "Service Type Summaries",
        "today-feat-1-desc": "Compare financial totals, booking volumes, and service-line metrics by service type.",
        "today-feat-2": "Top Service Performance",
        "today-feat-2-desc": "Identify top-booked services and high-performing suppliers for faster decisions.",
        "today-feat-3": "Controlled Date Ranges",
        "today-feat-3-desc": "Standardized date bounds and validation keep dashboard queries focused and reliable.",
        "today-feat-4": "Role-Based Access",
        "today-feat-4-desc": "User roles protect executive insights and system-level administration.",
        "today-cta": "Request ITOMS Today Demo",
        "today-visual-label": "Executive Operations Dashboard",
        "today-visual-status": "Connected to ITOMS",
        "today-filter-range": "Selected date range",
        "today-filter-apply": "Apply range",
        "today-kpi-1": "Financial Totals",
        "today-kpi-2": "Booking Volume",
        "today-kpi-3": "Service Lines",
        "today-kpi-4": "Top Suppliers",
        "today-kpi-live": "Current range",
        "today-kpi-ranked": "Performance ranked",
        "today-chart-title": "Service Performance",
        "today-chart-view": "By type",
        "today-service-1": "Hotels",
        "today-service-2": "Restaurants",
        "today-service-3": "Local Suppliers",
        "today-ranking-title": "Top Services",
        "today-rank-1": "Most-booked service",
        "today-rank-2": "Leading supplier",
        "today-rank-3": "Service-line activity",
        "today-nav-dashboard": "Dashboard",
        "today-nav-agencies": "Agencies",
        "today-nav-suppliers": "Suppliers",
        "today-nav-settings": "System Settings",
        "today-last-update": "Last Update",
        "today-ceo-title": "CEO Dashboard",
        "today-ceo-desc": "Overview of key business performance",
        "today-app-kpi-1": "Processed Lines",
        "today-app-kpi-1-sub": "Total Items",
        "today-app-kpi-2": "Loss Lines",
        "today-app-kpi-2-sub": "Selling < Cost",
        "today-app-kpi-3": "Free Services",
        "today-app-kpi-3-sub": "Selling = 0",
        "today-app-kpi-4": "Total Sales",
        "today-app-kpi-5": "Total Cost",
        "today-app-kpi-6": "Net Profit",
        "today-report-trend": "Sales, Cost & Profit Trend",
        "today-report-monthly": "Monthly",
        "today-legend-sales": "Sales",
        "today-legend-cost": "Cost",
        "today-legend-profit": "Profit",
        "today-report-market": "Sales by Market / Country",
        "today-report-agencies": "Top Performing Agencies",
        "today-agency-name": "Agency",
        "today-agency-profit": "Profit",
        "today-agency-margin": "Margin",

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
        "products-hero-desc": "أربع منصات متكاملة مُطوَّرة للتعامل مع تعقيدات عمليات السياحة الوافدة — من الحجز والإدارة المالية إلى الأرشفة الرقمية والرؤية التنفيذية.",
        "products-pill-itoms": "ITOMS",
        "products-pill-archiving": "الأرشفة",
        "products-pill-accounting": "أداة المحاسبة التشغيلية",
        "products-pill-today": "ITOMS Today",

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

        // ITOMS Today
        "today-eyebrow": "لوحة معلومات تنفيذية",
        "today-title-main": "ITOMS Today",
        "today-subtitle": "رؤية تشغيلية لنظام ITOMS",
        "today-desc": "يحوّل ITOMS Today بيانات الحجوزات والخدمات في ITOMS إلى لوحة معلومات تنفيذية للمتابعة التشغيلية السريعة. راجع الإجماليات المالية وأحجام الحجوزات ونشاط بنود الخدمات وأفضل الخدمات وأداء الموردين من واجهة واحدة، مع نطاقات زمنية منضبطة وصلاحيات وصول حسب الأدوار.",
        "today-feat-1": "ملخصات أنواع الخدمات",
        "today-feat-1-desc": "قارن الإجماليات المالية وأحجام الحجوزات ومؤشرات بنود الخدمات حسب نوع الخدمة.",
        "today-feat-2": "أداء أفضل الخدمات",
        "today-feat-2-desc": "حدد الخدمات الأكثر حجزاً والموردين الأعلى أداءً لاتخاذ قرارات أسرع.",
        "today-feat-3": "نطاقات زمنية منضبطة",
        "today-feat-3-desc": "تضمن حدود التاريخ الموحدة والتحقق من النطاق دقة استعلامات لوحة المعلومات.",
        "today-feat-4": "صلاحيات حسب الأدوار",
        "today-feat-4-desc": "تحمي أدوار المستخدمين الرؤى التنفيذية ووظائف إدارة النظام.",
        "today-cta": "اطلب عرضاً توضيحياً لـ ITOMS Today",
        "today-visual-label": "لوحة العمليات التنفيذية",
        "today-visual-status": "متصل بنظام ITOMS",
        "today-filter-range": "النطاق الزمني المحدد",
        "today-filter-apply": "تطبيق النطاق",
        "today-kpi-1": "الإجماليات المالية",
        "today-kpi-2": "حجم الحجوزات",
        "today-kpi-3": "بنود الخدمات",
        "today-kpi-4": "أفضل الموردين",
        "today-kpi-live": "النطاق الحالي",
        "today-kpi-ranked": "مرتبة حسب الأداء",
        "today-chart-title": "أداء الخدمات",
        "today-chart-view": "حسب النوع",
        "today-service-1": "الفنادق",
        "today-service-2": "المطاعم",
        "today-service-3": "الموردون المحليون",
        "today-ranking-title": "أفضل الخدمات",
        "today-rank-1": "الخدمة الأكثر حجزاً",
        "today-rank-2": "المورد الرائد",
        "today-rank-3": "نشاط بنود الخدمات",
        "today-nav-dashboard": "لوحة المعلومات",
        "today-nav-agencies": "الوكالات",
        "today-nav-suppliers": "الموردون",
        "today-nav-settings": "إعدادات النظام",
        "today-last-update": "آخر تحديث",
        "today-ceo-title": "لوحة المدير التنفيذي",
        "today-ceo-desc": "نظرة عامة على مؤشرات أداء الأعمال",
        "today-app-kpi-1": "البنود المعالجة",
        "today-app-kpi-1-sub": "إجمالي البنود",
        "today-app-kpi-2": "بنود الخسارة",
        "today-app-kpi-2-sub": "سعر البيع أقل من التكلفة",
        "today-app-kpi-3": "الخدمات المجانية",
        "today-app-kpi-3-sub": "سعر البيع يساوي صفراً",
        "today-app-kpi-4": "إجمالي المبيعات",
        "today-app-kpi-5": "إجمالي التكلفة",
        "today-app-kpi-6": "صافي الربح",
        "today-report-trend": "اتجاه المبيعات والتكلفة والربح",
        "today-report-monthly": "شهري",
        "today-legend-sales": "المبيعات",
        "today-legend-cost": "التكلفة",
        "today-legend-profit": "الربح",
        "today-report-market": "المبيعات حسب السوق والدولة",
        "today-report-agencies": "أفضل الوكالات أداءً",
        "today-agency-name": "الوكالة",
        "today-agency-profit": "الربح",
        "today-agency-margin": "الهامش",

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
