// ==========================================
// TSE FAQ ENGINE
// ==========================================

// ── ACCORDION ──
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const answer = item.querySelector('.faq-answer');
        const isOpen = item.classList.contains('open');

        // Close all open items in the same group
        item.closest('.faq-section-group')
            .querySelectorAll('.faq-item.open')
            .forEach(openItem => {
                openItem.classList.remove('open');
                openItem.querySelector('.faq-answer').style.maxHeight = null;
                openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

        if (!isOpen) {
            item.classList.add('open');
            answer.style.maxHeight = answer.scrollHeight + 'px';
            btn.setAttribute('aria-expanded', 'true');
        }
    });
});

// ── SIDEBAR NAVIGATION ──
const sidebarBtns = document.querySelectorAll('.sidebar-nav-btn[data-target]');

sidebarBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        sidebarBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const targetId = btn.getAttribute('data-target');
        const target = document.getElementById(targetId);
        if (target) {
            const offsetTop = target.getBoundingClientRect().top + window.scrollY - 96;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// ── SCROLL SPY ──
const faqGroups = document.querySelectorAll('.faq-section-group[id]');

function updateSidebarSpy() {
    let current = '';
    faqGroups.forEach(group => {
        if (window.scrollY >= group.offsetTop - 120) {
            current = group.getAttribute('id');
        }
    });
    sidebarBtns.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-target') === current);
    });
}

window.addEventListener('scroll', updateSidebarSpy, { passive: true });

// ── SEARCH / FILTER ──
const searchInput = document.getElementById('faq-search');
const noResults = document.getElementById('faq-no-results');

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightText(el, regex) {
    el.querySelectorAll('.faq-q-text, .faq-answer-inner p, .faq-answer-inner li').forEach(node => {
        const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
        const textNodes = [];
        let n;
        while ((n = walker.nextNode())) textNodes.push(n);

        textNodes.forEach(tn => {
            if (!regex.test(tn.textContent)) return;
            const span = document.createElement('span');
            span.innerHTML = tn.textContent.replace(regex, m => `<mark class="faq-hl">${m}</mark>`);
            tn.parentNode.replaceChild(span, tn);
        });
    });
}

function clearHighlights() {
    document.querySelectorAll('mark.faq-hl').forEach(mark => {
        const parent = mark.parentNode;
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
    });
}

if (searchInput) {
    searchInput.addEventListener('input', () => {
        const q = searchInput.value.trim().toLowerCase();
        clearHighlights();

        let totalVisible = 0;

        document.querySelectorAll('.faq-section-group').forEach(group => {
            let groupVisible = 0;

            group.querySelectorAll('.faq-item').forEach(item => {
                const qText = item.querySelector('.faq-q-text').textContent.toLowerCase();
                const aText = item.querySelector('.faq-answer-inner').textContent.toLowerCase();
                const matches = !q || qText.includes(q) || aText.includes(q);

                item.style.display = matches ? '' : 'none';
                if (matches) groupVisible++;
            });

            group.style.display = groupVisible > 0 ? '' : 'none';
            totalVisible += groupVisible;
        });

        if (noResults) {
            noResults.style.display = totalVisible === 0 ? 'block' : 'none';
        }

        if (q.length > 1) {
            const regex = new RegExp(`(${escapeRegex(q)})`, 'gi');
            document.querySelectorAll('.faq-item:not([style*="none"])').forEach(item => {
                highlightText(item, regex);
            });
        }
    });
}

// ── SEARCH PLACEHOLDER — BILINGUAL ──
function patchSearchPlaceholder() {
    if (!searchInput) return;
    const lang = document.documentElement.getAttribute('lang') || 'en';

    // Dynamically pulls from the newly merged translations dictionary
    if (typeof translations !== 'undefined' && translations[lang]) {
        searchInput.placeholder = translations[lang]['faq-search-placeholder'] || 'Search...';
    }
}

// Watch for language changes so the placeholder updates when the toggle is clicked
const langObserver = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
        if (m.attributeName === 'lang') patchSearchPlaceholder();
    });
});
langObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang']
});


// ── LOCAL DICTIONARIES & RUNTIME INGESTION ──
// Wrapped in DOMContentLoaded so it runs after script.js's DOMContentLoaded handler
// (which calls setLanguage for the initial load). This way the merge + re-apply
// happens in the correct order with no rAF race.
document.addEventListener('DOMContentLoaded', () => {
    const faqEn = {
        "faq-search-placeholder": "Search questions…",
        "faq-main-title": "Frequently Asked Questions",
        "faq-sub-title": "Find answers to common questions about our system modules.",
        "footer-tagline": "Software House Specialised in Travel Solutions.",
        // Move any other FAQ-specific keys from translations.js into here
        // FAQ Page
        "faq-hero-badge": "Help Center",
        "faq-hero-title": "Frequently Asked Questions",
        "faq-hero-desc": "Everything you need to know about TSE's products, implementation process, and support options.",
        "faq-search-placeholder": "Search questions…",
        "faq-sidebar-label": "Categories",
        "faq-cat-general": "About TSE",
        "faq-cat-itoms": "ITOMS",
        "faq-cat-archiving": "Archiving System",
        "faq-cat-b2b": "B2B Portal",
        "faq-cat-tech": "Technical & Support",
        "faq-sidebar-cta-title": "Still have questions?",
        "faq-sidebar-cta-desc": "Our team is ready to help you.",
        "faq-sidebar-cta-btn": "Contact Us",
        "faq-noresult-title": "No results found",
        "faq-noresult-desc": "Try a different keyword or browse a category.",
        "faq-cta-title": "Didn't find your answer?",
        "faq-cta-desc": "Our engineering team is available to answer any specific questions about your use case.",
        // FAQ — About TSE
        "faq-g1-q": "What is Travel Solutions Egypt (TSE)?",
        "faq-g1-a": "Founded in 2003 and headquartered in Cairo, Egypt, Travel Solutions Egypt (TSE) is a leading technology company specialising in software solutions for the travel industry. With over two decades of combined experience in travel operations and software development, TSE delivers reliable, efficient, and scalable systems for tour operators and ground handlers.",
        "faq-g2-q": "Who are TSE's target customers?",
        "faq-g2-a": "TSE primarily serves incoming tour operators and global ground handlers who need mission-critical automation systems. Our clients include companies such as Wings, Escapade, Gezira, YouGo, CTT, Traveline, Bright Star, and Blue Sky — all leading names in the Egyptian inbound travel market.",
        "faq-g3-q": "What products does TSE offer?",
        "faq-g3-a": "TSE offers three core products:",
        "faq-g3-a1": "ITOMS — a comprehensive incoming tour operator management system covering reservations, accounting, allotments, and reporting.",
        "faq-g3-a2": "Archiving System — a document filing and retrieval platform fully integrated with ITOMS.",
        "faq-g3-a3": "B2B Portal — a web-based booking and reservation platform for travel and tourism services across Egypt.",
        "faq-g4-q": "How do I get in touch with TSE?",
        "faq-g4-a": "You can reach us by email at tse@tsegypt.com, by phone or WhatsApp at +201555729580, or visit our contact page to send us a message directly. Our team is based in Cairo, Egypt.",
        // FAQ — ITOMS
        "faq-i1-q": "What is ITOMS?",
        "faq-i1-a": "ITOMS (Incoming Tour Operators Management System) is a comprehensive sales support, reservation, and management system built on state-of-the-art computer technology and advanced software design concepts. It covers every aspect of the tour-operating business — from costing and pricing to operational accounting and management reporting.",
        "faq-i2-q": "What data comes pre-loaded with ITOMS?",
        "faq-i2-a": "ITOMS ships with a comprehensive database covering hotels and Nile Cruises in Egypt, transport schedules, and information about the majority of guides in Egypt. The system is ready to use almost immediately once contracted rates are fed in.",
        "faq-i3-q": "Is ITOMS a multi-user system?",
        "faq-i3-a": "Yes. ITOMS is an in-house, multi-user system. It does not require on-site programming staff for its daily operation and maintenance. Multiple team members can work simultaneously across reservations, traffic, accounts, and management reporting modules.",
        "faq-i4-q": "Does ITOMS support multiple currencies and languages?",
        "faq-i4-a": "Yes. ITOMS is a fully multi-language and multi-currency system. It manages foreign currency differentials seamlessly and produces invoices and reports in the required currency, making it ideal for operators handling international clients.",
        "faq-i5-q": "What operational modules does ITOMS include?",
        "faq-i5-a": "ITOMS covers the full spectrum of inbound tour operations, including booking & reservation management, allotment control, traffic department management, accounts payable and receivable, planning, costing and pricing, management reports, and client manifest generation.",
        "faq-i6-q": "Can ITOMS exchange data with other reservation systems?",
        "faq-i6-a": "Yes. ITOMS is developed in standard travel industry format, enabling exchange of information with other reservation systems. It also supports direct Web API integrations for supplier connectivity and real-time data sync.",
        "faq-i7-q": "Does ITOMS support artificial intelligence?",
        "faq-i7-a": "Yes. ITOMS supports AI-assisted capabilities that help teams work with operational data, improve analysis, and make more informed decisions within their travel-management workflows.",
        // FAQ — Archiving
        "faq-a1-q": "What is the TSE Archiving System?",
        "faq-a1-a": "The TSE Archiving System is a digital document management solution fully integrated with ITOMS. It eliminates physical filing by letting staff drag-and-drop emails, scan faxes, and attach documents directly to agencies, suppliers, and booking records (PNRs).",
        "faq-a2-q": "What types of documents can be archived?",
        "faq-a2-a": "The system handles vouchers, service orders, payment orders, itineraries, invoices, debit/credit notes, emails, scanned faxes, and rate confirmations.",
        "faq-a3-q": "How are archived documents retrieved?",
        "faq-a3-a": "Two methods: directly from within ITOMS via the attachment tab on any PNR, agency, or supplier screen; or via a web-based search interface accessible from any browser for remote access.",
        "faq-a4-q": "Can I add custom document categories?",
        "faq-a4-a": "Yes. In addition to built-in categories (incoming, outgoing, rates, confirmation), you can create custom categories to organise documents in a way that best suits your company's workflow.",
        // FAQ — B2B
        "faq-b1-q": "What is the TSE B2B Portal?",
        "faq-b1-a": "The B2B Portal is a web-based application designed to simplify and automate the booking and reservation process for travel and tourism services across Egypt, providing a single interface for packages, hotels, transport, and activities.",
        "faq-b2-q": "Who can use the B2B Portal?",
        "faq-b2-a": "The portal is designed for travel trade partners — including agencies, operators, and resellers — who need to access and book Egypt-based travel products on behalf of their clients.",
        "faq-b3-q": "What services can be booked through the portal?",
        "faq-b3-a": "Users can book travel packages, hotel accommodations, transportation services, and tourism activities and excursions.",
        "faq-b4-q": "Is the B2B Portal integrated with ITOMS?",
        "faq-b4-a": "Yes. Bookings made through the portal flow directly into ITOMS — ensuring live availability, consistent pricing, and automatic record creation without double-entry.",
        // FAQ — Technical
        "faq-t1-q": "What technology stack does ITOMS run on?",
        "faq-t1-a": "ITOMS is built on .NET Framework with Windows Forms, MySQL database, IIS Server, locally hosted with SSL/TLS security. Reporting uses Crystal Reports, supplemented by Web APIs for external integrations.",
        "faq-t2-q": "Is ITOMS cloud-based or locally hosted?",
        "faq-t2-a": "ITOMS is currently deployed as a locally hosted system.",
        "faq-t3-q": "What is the system's uptime guarantee?",
        "faq-t3-a": "TSE targets 99.9% operational environment uptime. Our architecture is designed for high availability with optimised algorithms ensuring rapid database response times under maximum workloads.",
        "faq-t4-q": "Do I need technical staff to maintain ITOMS?",
        "faq-t4-a": "No on-site programming staff are required for day-to-day operation and maintenance. ITOMS is designed to be managed by travel operations staff without technical expertise. TSE provides ongoing support and updates.",
        "faq-t5-q": "How do I request a demo or get started?",
        "faq-t5-a": "Contact our engineering team at tse@tsegypt.com, call or WhatsApp +201555729580, or submit a message on our contact page. We'll schedule a session tailored to your operational requirements.",
        "footer-address": "Cairo, Egypt"
    };

    const faqAr = {
        "faq-search-placeholder": "ابحث في الأسئلة…",
        "faq-main-title": "الأسئلة الشائعة",
        "faq-sub-title": "ابحث عن إجابات للأسئلة الشائعة حول وحدات النظام.",
        "footer-tagline": "شركة برمجيات متخصصة في حلول السفر.",
        // Add the matching Arabic values here
        // FAQ Page (Arabic)
        "faq-hero-badge": "مركز المساعدة",
        "faq-hero-title": "الأسئلة الشائعة",
        "faq-hero-desc": "كل ما تحتاج معرفته عن منتجات TSE وعملية التنفيذ وخيارات الدعم.",
        "faq-search-placeholder": "ابحث في الأسئلة…",
        "faq-sidebar-label": "الفئات",
        "faq-cat-general": "عن TSE",
        "faq-cat-itoms": "ITOMS",
        "faq-cat-archiving": "نظام الأرشفة",
        "faq-cat-b2b": "بوابة B2B",
        "faq-cat-tech": "التقنية والدعم",
        "faq-sidebar-cta-title": "لا تزال لديك أسئلة؟",
        "faq-sidebar-cta-desc": "فريقنا مستعد لمساعدتك.",
        "faq-sidebar-cta-btn": "اتصل بنا",
        "faq-noresult-title": "لا توجد نتائج",
        "faq-noresult-desc": "جرب كلمة مختلفة أو تصفح الفئات.",
        "faq-cta-title": "لم تجد إجابتك؟",
        "faq-cta-desc": "فريقنا الهندسي متاح للإجابة على أي أسئلة خاصة بحالة الاستخدام لديك.",
        // FAQ — About TSE (Arabic)
        "faq-g1-q": "ما هي شركة ترافيل سوليوشنز إيجيبت (TSE)؟",
        "faq-g1-a": "تأسست عام 2003 ومقرها القاهرة، ترافيل سوليوشنز إيجيبت (TSE) شركة تكنولوجيا رائدة متخصصة في حلول البرمجيات لقطاع السياحة. بخبرة تتجاوز عقدين في عمليات السفر وتطوير البرمجيات، تقدم TSE أنظمة موثوقة وفعّالة وقابلة للتوسع لمنظمي الرحلات والمشغّلين الأرضيين.",
        "faq-g2-q": "من هم عملاء TSE المستهدفون؟",
        "faq-g2-a": "تستهدف TSE بشكل أساسي منظمي الرحلات الوافدة والمشغّلين الأرضيين العالميين. من أبرز عملائنا: Wings وEscapade وGezira وYouGo وCTT وTraveline وBright Star وBlue Sky.",
        "faq-g3-q": "ما المنتجات التي تقدمها TSE؟",
        "faq-g3-a": "تقدم TSE ثلاثة منتجات رئيسية:",
        "faq-g3-a1": "ITOMS — نظام شامل لإدارة منظمي الرحلات الوافدة يغطي الحجوزات والمحاسبة وإدارة الحصص والتقارير.",
        "faq-g3-a2": "نظام الأرشفة — منصة لحفظ الوثائق واسترجاعها، متكاملة بالكامل مع ITOMS.",
        "faq-g3-a3": "بوابة B2B — منصة حجز إلكترونية لخدمات السياحة والسفر في مصر.",
        "faq-g4-q": "كيف أتواصل مع TSE؟",
        "faq-g4-a": "يمكنك التواصل عبر البريد الإلكتروني tse@tsegypt.com، أو الهاتف/واتساب +201555729580، أو من خلال صفحة التواصل معنا. فريقنا مقره القاهرة، مصر.",
        // FAQ — ITOMS (Arabic)
        "faq-i1-q": "ما هو نظام ITOMS؟",
        "faq-i1-a": "ITOMS (نظام إدارة منظمي الرحلات الوافدة) هو نظام شامل لدعم المبيعات والحجوزات والإدارة، مبني على تقنيات حاسوبية متطورة. يغطي جميع جوانب إدارة شركات السياحة من التسعير والتكلفة إلى المحاسبة التشغيلية والتقارير الإدارية.",
        "faq-i2-q": "ما البيانات المحمّلة مسبقاً في ITOMS؟",
        "faq-i2-a": "يأتي ITOMS بقاعدة بيانات شاملة تتضمن الفنادق والمراكب النيلية في مصر وجداول النقل ومعلومات المرشدين السياحيين. النظام جاهز للاستخدام فور إدخال الأسعار المتعاقد عليها.",
        "faq-i3-q": "هل ITOMS نظام متعدد المستخدمين؟",
        "faq-i3-a": "نعم. ITOMS نظام داخلي متعدد المستخدمين لا يستلزم وجود مبرمجين في الموقع. يمكن لأعضاء الفريق العمل بالتزامن عبر وحدات الحجوزات والمرور والحسابات والتقارير الإدارية.",
        "faq-i4-q": "هل ITOMS يدعم عملات ولغات متعددة؟",
        "faq-i4-a": "نعم. ITOMS نظام متعدد اللغات والعملات بالكامل، يدير فروقات العملات الأجنبية بسلاسة ويصدر الفواتير والتقارير بالعملة المطلوبة.",
        "faq-i5-q": "ما الوحدات التشغيلية التي يشملها ITOMS؟",
        "faq-i5-a": "يغطي ITOMS الطيف الكامل لعمليات الرحلات الوافدة: إدارة الحجوزات، التحكم في الحصص، إدارة قسم المرور، الحسابات الدائنة والمدينة، التخطيط والتكلفة والتسعير، التقارير الإدارية، وإنشاء كشوفات العملاء.",
        "faq-i6-q": "هل يمكن لـ ITOMS تبادل البيانات مع أنظمة حجز أخرى؟",
        "faq-i6-a": "نعم. تم تطوير ITOMS وفق تنسيقات صناعة السياحة القياسية مما يتيح تبادل المعلومات مع الأنظمة الأخرى، كما يدعم تكاملات Web API المباشرة لمزامنة البيانات في الوقت الفعلي.",
        "faq-i7-q": "هل يدعم ITOMS الذكاء الاصطناعي؟",
        "faq-i7-a": "نعم. يدعم ITOMS إمكانات قائمة على الذكاء الاصطناعي تساعد فرق العمل على الاستفادة من البيانات التشغيلية وتحسين التحليلات واتخاذ قرارات أكثر دقة ضمن عمليات إدارة السياحة.",
        // FAQ — Archiving (Arabic)
        "faq-a1-q": "ما هو نظام أرشفة TSE؟",
        "faq-a1-a": "نظام الأرشفة (Travel Filing System) هو حل رقمي لإدارة الوثائق متكامل بالكامل مع ITOMS. يُلغي الحاجة إلى الأرشفة الورقية بإتاحة سحب وإفلات رسائل البريد الإلكتروني ومسح الفاكسات وإرفاق المستندات مباشرة بسجلات الحجز.",
        "faq-a2-q": "ما أنواع الوثائق التي يمكن أرشفتها؟",
        "faq-a2-a": "يتعامل النظام مع القسائم وأوامر الخدمة وأوامر الدفع وبرامج الرحلات والفواتير والإشعارات المدينة/الدائنة ورسائل البريد الإلكتروني والفاكسات والوثائق الممسوحة ضوئياً.",
        "faq-a3-q": "كيف يتم استرجاع الوثائق المؤرشفة؟",
        "faq-a3-a": "طريقتان: مباشرة من داخل ITOMS عبر تبويب المرفقات في أي سجل حجز أو وكالة أو مورّد؛ أو عبر واجهة بحث على الإنترنت يمكن الوصول إليها من أي متصفح.",
        "faq-a4-q": "هل يمكنني إضافة فئات مستندات مخصصة؟",
        "faq-a4-a": "نعم. إلى جانب الفئات المدمجة (الوارد، الصادر، الأسعار، التأكيد)، يمكنك إنشاء فئات مخصصة تناسب سير عمل شركتك لتسهيل البحث والاسترجاع.",
        // FAQ — B2B (Arabic)
        "faq-b1-q": "ما هي بوابة B2B الخاصة بـ TSE؟",
        "faq-b1-a": "بوابة B2B تطبيق ويب يبسّط ويؤتمت عملية الحجز والاستفسار عن خدمات السياحة والسفر في مصر، من خلال واجهة موحدة للباقات والفنادق والنقل والأنشطة.",
        "faq-b2-q": "من يمكنه استخدام بوابة B2B؟",
        "faq-b2-a": "البوابة مصممة لشركاء قطاع السياحة — الوكالات والمنظمين وشركات الإعادة — الذين يحتاجون إلى الوصول وحجز منتجات السياحة في مصر نيابةً عن عملائهم.",
        "faq-b3-q": "ما الخدمات التي يمكن حجزها عبر البوابة؟",
        "faq-b3-a": "يمكن للمستخدمين حجز الباقات السياحية والإقامة الفندقية وخدمات النقل والأنشطة والرحلات الجانبية.",
        "faq-b4-q": "هل بوابة B2B متكاملة مع ITOMS؟",
        "faq-b4-a": "نعم. تتدفق الحجوزات المُجراة عبر البوابة مباشرة إلى ITOMS، مما يضمن التوفر الفعلي والأسعار المتسقة وإنشاء السجلات تلقائياً دون إدخال مزدوج.",
        // FAQ — Technical (Arabic)
        "faq-t1-q": "ما البنية التقنية التي يعمل عليها ITOMS؟",
        "faq-t1-a": "يعمل ITOMS على .NET Framework مع Windows Forms وقاعدة بيانات MySQL وخادم IIS، مستضاف محلياً ومؤمَّن بـ SSL/TLS. التقارير عبر Crystal Reports مع Web APIs للتكاملات الخارجية.",
        "faq-t2-q": "هل ITOMS سحابي أم مستضاف محلياً؟",
        "faq-t2-a": "ITOMS يُنشر حالياً كنظام مستضاف محلياً.",
        "faq-t3-q": "ما نسبة وقت التشغيل المضمونة للنظام؟",
        "faq-t3-a": "تستهدف TSE نسبة تشغيل بيئي تبلغ 99.9%. صُممت بنيتنا للتوافر العالي بخوارزميات محسّنة تضمن سرعة استجابة قواعد البيانات حتى في أقصى أحمال العمل.",
        "faq-t4-q": "هل أحتاج إلى طاقم تقني للحفاظ على ITOMS؟",
        "faq-t4-a": "لا. لا يستلزم ITOMS وجود مبرمجين في الموقع للتشغيل اليومي والصيانة. النظام مصمم ليُدار من قِبل موظفي عمليات السفر دون خبرة تقنية، وتوفر TSE الدعم المستمر والتحديثات.",
        "faq-t5-q": "كيف أطلب عرضاً توضيحياً أو أبدأ؟",
        "faq-t5-a": "تواصل مع الفريق الهندسي عبر tse@tsegypt.com أو الهاتف/واتساب +201555729580 أو عبر صفحة التواصل. سنحدد موعداً مخصصاً لمتطلبات مؤسستك التشغيلية.",
        "footer-address": "القاهرة، مصر"

    };

    // 1. Inject local pairs into the global translations scope dynamically
    if (typeof translations !== 'undefined') {
        Object.assign(translations.en, faqEn);
        Object.assign(translations.ar, faqAr);
    }

    // 2. Re-apply current language to pick up the newly merged keys
    const currentLang = document.documentElement.getAttribute('lang') || 'en';
    if (typeof setLanguage === 'function') {
        setLanguage(currentLang, true);
    }
}); // end DOMContentLoaded
