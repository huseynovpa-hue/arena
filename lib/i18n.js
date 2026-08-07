"use client";
import { createContext, useContext, useState, useEffect } from "react";

const translations = {
  en: {
    // Navbar
    matches: "Matches",
    board: "Board",
    rules: "Rules",
    admin: "Admin",
    signIn: "Sign In",
    signOut: "Sign out",
    editProfile: "Edit Profile",
    inviteFriends: "Invite friends",
    language: "Azərbaycanca",

    // Matches page
    weeklyProgress: "Weekly Progress",
    locked: "locked",
    missed: "missed",
    open: "open",
    allLocked: "All locked! Good luck 🍀",
    of: "of",
    noMatchesYet: "No matches yet",
    noMatchesYetDesc: "The admin will add this week's matches soon. Check back later!",
    noMatchesThisWeek: "No matches this week",
    noMatchesThisWeekDesc: "Try selecting a different week from the dropdown above.",
    currentWeek: "Current Week",
    monthlyPrizes: "Monthly Prizes",
    prizesActivate: "Prizes activate when we reach 100 registered users.",
    today: "Today",
    tomorrow: "Tomorrow",
    started: "Started",

    // Match card
    vs: "VS",
    overUnder: "Over / Under 2.5",
    over: "Over 2.5",
    under: "Under 2.5",
    firstToScore: "First team to score",
    noGoal: "No Goal",
    lockPrediction: "🔒 LOCK PREDICTION",
    selectToLock: "Select O/U and first to score",
    signInToPredict: "Sign in to predict",
    saving: "Saving...",
    saveChanges: "💾 SAVE",
    cancel: "Cancel",
    earned: "Earned",
    noPrediction: "No prediction",
    missedLabel: "Missed",
    finished: "FINISHED",
    inProgress: "⏳ In progress — awaiting results",
    finishedResult: "✅ Finished",
    yourPrediction: "Your prediction",

    // Leaderboard
    leaderboard: "Leaderboard",
    allTime: "All Time",
    weekly: "Weekly",
    monthly: "Monthly",
    player: "Player",
    prize: "Prize",
    preds: "Preds",
    acc: "Acc.",
    points: "Points",
    resultsOnTheWay: "Results are on the way",
    standingsAvailable: "Standings will be available once match results are entered.",
    noMatchesFound: "No matches found",
    noMatchesMonth: "No matches were played in this month.",
    noMatchesWeek: "No matches in this week.",
    playersAppear: "Players will appear here once they register.",

    // Rules
    rulesAndScoring: "Rules & Scoring",
    pointsBreakdown: "Points Breakdown",
    maxPerGame: "Max 50 pts / game",
    weeklyMax: "Weekly Maximum (10 games)",
    correctScore: "Correct Score",
    correctScoreDesc: "Exact home & away score match",
    goalDifference: "Goal Difference",
    goalDifferenceDesc: "Correct margin between teams",
    correctResult: "Correct Result",
    correctResultDesc: "Right outcome: Home Win, Draw, or Away Win",
    homeScore: "Home Score",
    homeScoreDesc: "Home team goals correct",
    awayScore: "Away Score",
    awayScoreDesc: "Away team goals correct",
    overUnderRule: "Over / Under 2.5",
    overUnderRuleDesc: "Your O/U pick matches the actual total goals",
    firstToScoreRule: "First to Score",
    firstToScoreRuleDesc: "Which team scores first",
    example: "Example",
    yourPredictionLabel: "Your prediction:",
    actualResult: "Actual result:",
    totalPerfect: "Total — PERFECT SCORE! 🎯",
    tournamentRules: "Tournament Rules",
    rule1: "10 football matches are selected each week by the organizer.",
    rule2: "You must predict the exact score, choose Over or Under 2.5 goals, and select which team scores first.",
    rule3: "Over/Under 2.5 is your own choice — you can predict 2-1 but still pick Under if you believe the match could go differently.",
    rule4: "Predictions can be edited anytime before kick-off. Once the match starts, they lock automatically.",
    rule5: "Correct Result means you predicted the right outcome (Home Win / Draw / Away Win), even if the exact score is wrong.",
    rule6: "Points are cumulative — weekly scores roll into your monthly and all-time total.",
    rule7: "Weeks run Monday to Sunday. Months follow the calendar. A week that crosses two months (e.g. Aug 31 – Sep 6) may count in one week but split across two months — so weekly and monthly standings can differ.",
    rule8: "In case of a tie, the player who locked predictions earlier wins.",
    rule9: "Maximum possible: 50 points per game, 500 points per week.",
    prizeMonthlyTitle: "Monthly Prizes",
    prizeFirst: "1st place",
    prizeSecond: "2nd place",
    prizeThird: "3rd place",
    prizeDesc: "Top 3 predictors of each month win cash prizes.",
    prizePayment: "Winners receive their prizes within 5 days of the next month.",

    // Login
    createAccount: "Create your account",
    signInToPredict2: "Sign in to predict",
    continueWithGoogle: "Continue with Google",
    or: "or",
    username: "Username",
    email: "Email",
    password: "Password",
    displayName: "Your display name",
    minChars: "Min 6 characters",
    createAccountBtn: "Create Account",
    pleaseWait: "Please wait...",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",
    register: "Register",

    // Profile
    yourProfile: "Your Profile",
    uploadPhoto: "Upload Photo",
    uploading: "Uploading...",
    change: "Change",
    role: "Role",
    saveProfile: "Save Profile",

    // Footer
    aboutUs: "About Us",
    contact: "Contact",
    privacyPolicy: "Privacy Policy",

    // Share
    shareMyScore: "📤 Share my score",
    shareTitle: "Share your score",
    share: "📤 Share",
    download: "💾 Download",

    // About
    aboutTitle: "About Arena",
    aboutWhat: "What is Arena?",
    aboutWhatDesc: "Arena is a free football prediction platform where you compete against friends and other fans by predicting match scores every week. No betting, no gambling — just pure skill, knowledge, and bragging rights. We select 10 matches each week, you predict the scores, and our scoring system rewards accuracy across multiple categories.",
    aboutHow: "How it works",
    aboutHowDesc: "Each week, 10 football matches are posted on the platform. For every match, you predict the exact score, choose Over or Under 2.5 goals, and select which team will score first. Points are awarded for each correct element — the more accurate your prediction, the more points you earn. Maximum 50 points per match, 500 per week. Monthly top 3 predictors win prizes.",
    aboutWhy: "Why Arena?",
    aboutWhyDesc: "Most prediction platforms are complicated or tied to gambling. Arena is different — it is free to play, skill-based, and built for football fans who love the game and want to prove their knowledge. Whether you follow the Premier League, Champions League, or your local league, Arena gives you a stage to compete.",
    aboutTeam: "Our team",
    aboutTeamDesc: "Arena is built and operated from Baku, Azerbaijan. We are a small team of football enthusiasts and developers passionate about creating the best prediction experience. The platform is continuously improving based on user feedback.",
    contactTitle: "Contact Us",
    contactDesc: "Have a question, feedback, or want to partner with us? We would love to hear from you.",
    contactEmail: "Email",
    contactLocation: "Location",
    contactSocial: "Social",
    contactComingSoon: "Coming soon",
    contactResponse: "We typically respond within 24 hours.",

    // Privacy
    privacyTitle: "Privacy Policy",
    privacyLastUpdated: "Last updated",
    privacyIntroTitle: "1. Introduction",
    privacyIntro: 'Arena ("we", "our", or "us") operates the Arena football prediction platform (the "Service"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our Service. By using Arena, you agree to the collection and use of information in accordance with this policy.',
    privacyCollectTitle: "2. Information We Collect",
    privacyCollectDesc: "We collect the following types of information:",
    privacyCollectAccount: "When you register, we collect your email address, username, and profile picture (if provided). If you sign in with Google, we receive your name and email from your Google account.",
    privacyCollectUsage: "We collect information about how you use the Service, including your predictions, scores, and interaction with features.",
    privacyCollectDevice: "We may collect information about your device, browser type, IP address, and operating system for analytics and security purposes.",
    privacyCollectCookies: "We use cookies and similar technologies to maintain your session, remember preferences, and analyze usage patterns. Third-party services such as Google AdSense may also use cookies to serve personalized advertisements.",
    privacyUseTitle: "3. How We Use Your Information",
    privacyUseDesc: "We use the information we collect to:",
    privacyUse1: "Provide, operate, and maintain the Service",
    privacyUse2: "Create and manage your account",
    privacyUse3: "Process your predictions and calculate scores",
    privacyUse4: "Display leaderboards and competition results",
    privacyUse5: "Communicate with you about updates, prizes, and announcements",
    privacyUse6: "Analyze usage to improve the Service",
    privacyUse7: "Detect, prevent, and address fraud or technical issues",
    privacyAdsTitle: "4. Third-Party Advertising",
    privacyAds1: "We may use third-party advertising companies, including Google AdSense, to serve ads when you visit our website. These companies may use cookies and similar technologies to collect information (not including your name, address, email, or phone number) about your visits to this and other websites in order to provide advertisements about goods and services that may interest you.",
    privacyAds2: "You may opt out of personalized advertising by visiting Google Ads Settings.",
    privacyShareTitle: "5. Data Sharing",
    privacyShareDesc: "We do not sell your personal information. We may share your information only in the following cases:",
    privacyShare1: "Your username, profile picture, and scores are visible to all users on the leaderboard.",
    privacyShare2: "We use Supabase for authentication and data storage, and Vercel for hosting. These providers process data on our behalf under their own privacy policies.",
    privacyShare3: "We may disclose your information if required by law or to protect our rights and safety.",
    privacySecurityTitle: "6. Data Security",
    privacySecurity: "We implement appropriate technical and organizational measures to protect your personal information. Your account is protected by authentication through Supabase, and all data is transmitted over encrypted HTTPS connections. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.",
    privacyRetentionTitle: "7. Data Retention",
    privacyRetention: "We retain your account information and prediction history for as long as your account is active. You may request deletion of your account and associated data by contacting us at the email address provided below. We will process deletion requests within 30 days.",
    privacyRightsTitle: "8. Your Rights",
    privacyRightsDesc: "You have the right to:",
    privacyRights1: "Access the personal data we hold about you",
    privacyRights2: "Request correction of inaccurate data",
    privacyRights3: "Request deletion of your account and data",
    privacyRights4: "Opt out of personalized advertising",
    privacyRights5: "Withdraw consent at any time by contacting us",
    privacyChildrenTitle: "9. Children's Privacy",
    privacyChildren: "Arena is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal data from a child under 13, we will take steps to delete that information.",
    privacyChangesTitle: "10. Changes to This Policy",
    privacyChanges: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the \"Last updated\" date. You are advised to review this page periodically.",
    privacyContactTitle: "11. Contact Us",
    privacyContact: "If you have any questions about this Privacy Policy, please contact us at:",
  },

  az: {
    // Navbar
    matches: "Oyunlar",
    board: "Cədvəl",
    rules: "Qaydalar",
    admin: "Admin",
    signIn: "Daxil ol",
    signOut: "Çıxış",
    editProfile: "Profili redaktə et",
    inviteFriends: "Dostları dəvət et",
    language: "English",

    // Matches page
    weeklyProgress: "Həftəlik İrəliləyiş",
    locked: "təxmin edilib",
    missed: "buraxılıb",
    open: "açıq",
    allLocked: "Bütün oyunlar təxmin edilib! Uğurlar 🍀",
    of: "/",
    noMatchesYet: "Hələ oyun yoxdur",
    noMatchesYetDesc: "Admin tezliklə bu həftənin oyunlarını əlavə edəcək. Sonra yoxlayın!",
    noMatchesThisWeek: "Bu həftə oyun yoxdur",
    noMatchesThisWeekDesc: "Yuxarıdakı seçimdən fərqli həftə seçməyə çalışın.",
    currentWeek: "Cari Həftə",
    monthlyPrizes: "Aylıq Mükafatlar",
    prizesActivate: "Mükafatlar 100 qeydiyyatlı istifadəçiyə çatdıqda aktiv olur.",
    today: "Bu gün",
    tomorrow: "Sabah",
    started: "Başladı",

    // Match card
    vs: "VS",
    overUnder: "Alt/Üst 2.5",
    over: "Üst 2.5",
    under: "Alt 2.5",
    firstToScore: "İlk qol vuran komanda",
    noGoal: "Qolsuz",
    lockPrediction: "🔒 PROQNOZU KİLİDLƏ",
    selectToLock: "Ü/A və ilk qol vuranı seçin",
    signInToPredict: "Proqnoz üçün daxil olun",
    saving: "Saxlanılır...",
    saveChanges: "💾 YADDA SAXLA",
    cancel: "Ləğv et",
    earned: "Qazanılan",
    noPrediction: "Proqnoz yoxdur",
    missedLabel: "Buraxılıb",
    finished: "BİTİB",
    inProgress: "⏳ Davam edir — nəticə gözlənilir",
    finishedResult: "✅ Bitib",
    yourPrediction: "Proqnozunuz",

    // Leaderboard
    leaderboard: "Cədvəl",
    allTime: "Ümumi",
    weekly: "Həftəlik",
    monthly: "Aylıq",
    player: "Oyunçu",
    prize: "Mükafat",
    preds: "Proq.",
    acc: "Dəq.",
    points: "Xal",
    resultsOnTheWay: "Nəticələr yoxlanılır",
    standingsAvailable: "Oyun nəticələri daxil edildikdən sonra sıralama əlçatan olacaq.",
    noMatchesFound: "Oyun tapılmadı",
    noMatchesMonth: "Bu ayda oyun keçirilməyib.",
    noMatchesWeek: "Bu həftə oyun yoxdur.",
    playersAppear: "Oyunçular qeydiyyatdan keçdikdən sonra burada görünəcək.",

    // Rules
    rulesAndScoring: "Qaydalar və Xallar",
    pointsBreakdown: "Xal Bölgüsü",
    maxPerGame: "Oyun başına maks 50 xal",
    weeklyMax: "Həftəlik Maksimum (10 oyun)",
    correctScore: "Dəqiq Hesab",
    correctScoreDesc: "Ev sahibi və qonaq hesabı tam uyğun",
    goalDifference: "Qol Fərqi",
    goalDifferenceDesc: "Komandalar arası düzgün fərq",
    correctResult: "Düzgün Nəticə",
    correctResultDesc: "Doğru nəticə: Ev qələbəsi, Heç-heçə və ya Qonaq qələbəsi",
    homeScore: "Ev Sahibi Qolu",
    homeScoreDesc: "Ev sahibi komandanın düzgün qol sayı",
    awayScore: "Qonaq Qolu",
    awayScoreDesc: "Qonaq komandanın düzgün qol sayı",
    overUnderRule: "Alt / Üst 2.5",
    overUnderRuleDesc: "A/Ü seçiminiz faktiki ümumi qollarla uyğun gəlir",
    firstToScoreRule: "İlk Qol",
    firstToScoreRuleDesc: "Hansı komanda ilk qolu vurur",
    example: "Nümunə",
    yourPredictionLabel: "Proqnozunuz:",
    actualResult: "Faktiki nəticə:",
    totalPerfect: "Cəmi — MÜKƏMMƏl PROQNOZ! 🎯",
    tournamentRules: "Turnir Qaydaları",
    rule1: "Hər həftə təşkilatçı tərəfindən 10 futbol oyunu seçilir.",
    rule2: "Dəqiq hesabı proqnozlaşdırmalı, Alt və ya Üst 2.5 qol seçməli və ilk qol vuran komandanı qeyd etməlisiniz.",
    rule3: "Alt/Üst 2.5 sizin öz seçiminizdir — 2-1 proqnoz edib yenə də Alt seçə bilərsiniz.",
    rule4: "Proqnozlar başlanğıca qədər istənilən vaxt redaktə edilə bilər. Oyun başlayanda avtomatik kilidlənir.",
    rule5: "Düzgün Nəticə dəqiq hesab səhv olsa belə, doğru nəticəni (Ev Qələbəsi / Heç-heçə / Qonaq Qələbəsi) proqnozlaşdırmaq deməkdir.",
    rule6: "Xallar toplanır — həftəlik xallar aylıq və ümumi cəminizə əlavə olunur.",
    rule7: "Həftələr Bazar ertəsindən Bazara qədərdir. Aylar təqvimə uyğundur. İki ayı əhatə edən həftə bir həftəyə sayıla bilər, lakin iki ay arasında bölünə bilər — buna görə həftəlik və aylıq sıralamalar fərqli ola bilər.",
    rule8: "Bərabərlik halında proqnozunu daha tez kilidləyən oyunçu qalib gəlir.",
    rule9: "Maksimum mümkün: oyun başına 50 xal, həftəlik 500 xal.",
    prizeMonthlyTitle: "Aylıq Mükafatlar",
    prizeFirst: "1-ci yer",
    prizeSecond: "2-ci yer",
    prizeThird: "3-cü yer",
    prizeDesc: "Hər ayın ən yaxşı 3 proqnozçusu pul mükafatı qazanır.",
    prizePayment: "Qaliblər mükafatlarını növbəti ayın 5 günü ərzində alır.",

    // Login
    createAccount: "Hesab yaradın",
    signInToPredict2: "Proqnoz üçün daxil olun",
    continueWithGoogle: "Google ilə davam edin",
    or: "və ya",
    username: "İstifadəçi adı",
    email: "E-poçt",
    password: "Şifrə",
    displayName: "Görünən adınız",
    minChars: "Minimum 6 simvol",
    createAccountBtn: "Hesab Yarat",
    pleaseWait: "Gözləyin...",
    alreadyHaveAccount: "Artıq hesabınız var?",
    dontHaveAccount: "Hesabınız yoxdur?",
    register: "Qeydiyyat",

    // Profile
    yourProfile: "Profiliniz",
    uploadPhoto: "Şəkil Yüklə",
    uploading: "Yüklənir...",
    change: "Dəyiş",
    role: "Rol",
    saveProfile: "Profili Yadda Saxla",

    // Footer
    aboutUs: "Haqqımızda",
    contact: "Əlaqə",
    privacyPolicy: "Məxfilik Siyasəti",

    // Share
    shareMyScore: "📤 Xalımı paylaş",
    shareTitle: "Xalınızı paylaşın",
    share: "📤 Paylaş",
    download: "💾 Yüklə",

    // About
    aboutTitle: "Arena haqqında",
    aboutWhat: "Arena nədir?",
    aboutWhatDesc: "Arena hər həftə matç hesablarını proqnozlaşdıraraq dostlarınız və digər azarkeşlərlə yarışdığınız pulsuz futbol proqnoz platformasıdır. Mərc yoxdur, qumar yoxdur — yalnız bilik, bacarıq və qürur. Biz hər həftə 10 matç seçirik, siz hesabları proqnozlaşdırırsınız və xal sistemi dəqiqliyinizi mükafatlandırır.",
    aboutHow: "Necə işləyir",
    aboutHowDesc: "Hər həftə platformada 10 futbol matçı yerləşdirilir. Hər matç üçün dəqiq hesabı proqnozlaşdırırsınız, Alt və ya Üst 2.5 qol seçirsiniz və ilk qol vuran komandanı göstərirsiniz. Hər düzgün element üçün xal verilir — proqnozunuz nə qədər dəqiq olsa, bir o qədər çox xal qazanırsınız. Matç başına maksimum 50, həftəlik 500 xal. Aylıq ilk 3 proqnozçu mükafat qazanır.",
    aboutWhy: "Niyə Arena?",
    aboutWhyDesc: "Əksər proqnoz platformaları mürəkkəbdir və ya qumarla bağlıdır. Arena fərqlidir — oynamaq pulsuzdur, bacarığa əsaslanır və futbolu sevən və biliklərini sübut etmək istəyən azarkeşlər üçün yaradılıb. İstər Premyer Liqa, istər Çempionlar Liqası, istərsə də yerli liqa izləyin — Arena sizə yarışmaq üçün səhnə verir.",
    aboutTeam: "Komandamız",
    aboutTeamDesc: "Arena Bakı, Azərbaycandan idarə olunur. Biz ən yaxşı proqnoz təcrübəsini yaratmağa həvəsli futbol həvəskarları və proqramçılardan ibarət kiçik bir komandayıq. Platforma istifadəçi rəyləri əsasında daim təkmilləşdirilir.",
    contactTitle: "Bizimlə Əlaqə",
    contactDesc: "Sualınız, rəyiniz var və ya bizimlə əməkdaşlıq etmək istəyirsiniz? Sizdən eşitməkdən məmnun olarıq.",
    contactEmail: "E-poçt",
    contactLocation: "Ünvan",
    contactSocial: "Sosial",
    contactComingSoon: "Tezliklə",
    contactResponse: "Adətən 24 saat ərzində cavab veririk.",

    // Privacy
    privacyTitle: "Məxfilik Siyasəti",
    privacyLastUpdated: "Son yenilənmə",
    privacyIntroTitle: "1. Giriş",
    privacyIntro: 'Arena ("biz") Arena futbol proqnoz platformasını ("Xidmət") idarə edir. Bu Məxfilik Siyasəti veb saytımızı ziyarət etdiyiniz və Xidmətimizdən istifadə etdiyiniz zaman məlumatlarınızı necə topladığımızı, istifadə etdiyimizi, açıqladığımızı və qoruduğumuzu izah edir. Arena-dan istifadə etməklə bu siyasətə uyğun məlumat toplanması və istifadəsinə razılıq verirsiniz.',
    privacyCollectTitle: "2. Topladığımız Məlumatlar",
    privacyCollectDesc: "Aşağıdakı növ məlumatları toplayırıq:",
    privacyCollectAccount: "Qeydiyyatdan keçdiyiniz zaman e-poçt ünvanınızı, istifadəçi adınızı və profil şəklinizi (əgər təqdim olunarsa) toplayırıq. Google ilə daxil olsanız, Google hesabınızdan adınızı və e-poçtunuzu alırıq.",
    privacyCollectUsage: "Xidmətdən necə istifadə etdiyiniz barədə məlumat toplayırıq, o cümlədən proqnozlarınız, xallarınız və funksiyalarla qarşılıqlı əlaqəniz.",
    privacyCollectDevice: "Analitika və təhlükəsizlik məqsədləri üçün cihazınız, brauzer növünüz, IP ünvanınız və əməliyyat sisteminiz barədə məlumat toplaya bilərik.",
    privacyCollectCookies: "Sessiyanızı davam etdirmək, seçimlərinizi yadda saxlamaq və istifadə nümunələrini təhlil etmək üçün kukilər və oxşar texnologiyalardan istifadə edirik. Google AdSense kimi üçüncü tərəf xidmətləri də fərdiləşdirilmiş reklamlar göstərmək üçün kukilərdən istifadə edə bilər.",
    privacyUseTitle: "3. Məlumatlarınızdan Necə İstifadə Edirik",
    privacyUseDesc: "Topladığımız məlumatlardan aşağıdakılar üçün istifadə edirik:",
    privacyUse1: "Xidməti təmin etmək, idarə etmək və saxlamaq",
    privacyUse2: "Hesabınızı yaratmaq və idarə etmək",
    privacyUse3: "Proqnozlarınızı emal etmək və xalları hesablamaq",
    privacyUse4: "Liderlik cədvəlini və yarışma nəticələrini göstərmək",
    privacyUse5: "Yeniliklər, mükafatlar və elanlar barədə sizinlə əlaqə saxlamaq",
    privacyUse6: "Xidməti təkmilləşdirmək üçün istifadəni təhlil etmək",
    privacyUse7: "Fırıldaqçılığı və texniki problemləri aşkar etmək, qarşısını almaq",
    privacyAdsTitle: "4. Üçüncü Tərəf Reklamları",
    privacyAds1: "Veb saytımızı ziyarət etdiyiniz zaman reklam göstərmək üçün Google AdSense daxil olmaqla üçüncü tərəf reklam şirkətlərindən istifadə edə bilərik. Bu şirkətlər sizi maraqlandıra biləcək mal və xidmətlər haqqında reklamlar təqdim etmək üçün bu və digər veb saytlara ziyarətləriniz haqqında məlumat toplamaq üçün kukilər və oxşar texnologiyalardan istifadə edə bilər.",
    privacyAds2: "Google Reklam Parametrlərinə daxil olaraq fərdiləşdirilmiş reklamlardan imtina edə bilərsiniz.",
    privacyShareTitle: "5. Məlumatların Paylaşılması",
    privacyShareDesc: "Şəxsi məlumatlarınızı satmırıq. Məlumatlarınızı yalnız aşağıdakı hallarda paylaşa bilərik:",
    privacyShare1: "İstifadəçi adınız, profil şəkliniz və xallarınız liderlik cədvəlində bütün istifadəçilərə görünür.",
    privacyShare2: "Autentifikasiya və məlumat saxlama üçün Supabase, hostinq üçün Vercel istifadə edirik. Bu provayderlər öz məxfilik siyasətləri çərçivəsində bizim adımıza məlumatları emal edirlər.",
    privacyShare3: "Qanunla tələb olunarsa və ya hüquq və təhlükəsizliyimizi qorumaq üçün məlumatlarınızı açıqlaya bilərik.",
    privacySecurityTitle: "6. Məlumat Təhlükəsizliyi",
    privacySecurity: "Şəxsi məlumatlarınızı qorumaq üçün müvafiq texniki və təşkilati tədbirlər tətbiq edirik. Hesabınız Supabase vasitəsilə autentifikasiya ilə qorunur və bütün məlumatlar şifrəli HTTPS bağlantıları üzərindən ötürülür. Lakin İnternet üzərindən heç bir ötürmə metodu 100% təhlükəsiz deyil və mütləq təhlükəsizliyə zəmanət verə bilmərik.",
    privacyRetentionTitle: "7. Məlumatların Saxlanması",
    privacyRetention: "Hesabınız aktiv olduğu müddətdə hesab məlumatlarınızı və proqnoz tarixçənizi saxlayırıq. Aşağıda göstərilən e-poçt ünvanı ilə əlaqə saxlayaraq hesabınızın və əlaqəli məlumatların silinməsini tələb edə bilərsiniz. Silmə sorğularını 30 gün ərzində emal edəcəyik.",
    privacyRightsTitle: "8. Hüquqlarınız",
    privacyRightsDesc: "Aşağıdakı hüquqlara maliksiniz:",
    privacyRights1: "Haqqınızda saxladığımız şəxsi məlumatlara daxil olmaq",
    privacyRights2: "Qeyri-dəqiq məlumatların düzəldilməsini tələb etmək",
    privacyRights3: "Hesabınızın və məlumatların silinməsini tələb etmək",
    privacyRights4: "Fərdiləşdirilmiş reklamlardan imtina etmək",
    privacyRights5: "İstənilən vaxt bizimlə əlaqə saxlayaraq razılığınızı geri götürmək",
    privacyChildrenTitle: "9. Uşaqların Məxfiliyi",
    privacyChildren: "Arena 13 yaşından kiçik uşaqlar üçün nəzərdə tutulmayıb. 13 yaşından kiçik uşaqlardan bilərəkdən şəxsi məlumat toplamırıq. 13 yaşından kiçik uşaqdan şəxsi məlumat topladığımızı öyrənsək, həmin məlumatı silmək üçün addımlar atacağıq.",
    privacyChangesTitle: "10. Bu Siyasətdə Dəyişikliklər",
    privacyChanges: "Bu Məxfilik Siyasətini vaxtaşırı yeniləyə bilərik. Hər hansı dəyişiklik barədə yeni siyasəti bu səhifədə yerləşdirməklə və \"Son yenilənmə\" tarixini yeniləməklə sizi xəbərdar edəcəyik. Bu səhifəni vaxtaşırı nəzərdən keçirməyiniz tövsiyə olunur.",
    privacyContactTitle: "11. Bizimlə Əlaqə",
    privacyContact: "Bu Məxfilik Siyasəti ilə bağlı suallarınız varsa, bizimlə əlaqə saxlayın:",
  },
};

const LangContext = createContext({ lang: "en", t: translations.en, setLang: () => {} });

export function LangProvider({ children }) {
  const [lang, setLangState] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("arena-lang");
    if (saved && translations[saved]) setLangState(saved);
  }, []);

  function setLang(l) {
    setLangState(l);
    localStorage.setItem("arena-lang", l);
  }

  return (
    <LangContext.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

// Azerbaijani ordinal suffix for week numbers
function azSuffix(n) {
  const d = n % 10;
  if (d === 0) { const t = Math.floor(n/10)%10; return [1,3].includes(t)?"-cu":[4].includes(t)?"-cı":"-ci"; }
  if ([1,2,5,7,8].includes(d)) return "-ci";
  if ([3,4].includes(d)) return "-cü";
  if (d===6) return "-cı";
  if (d===9) return "-cu";
  return "-ci";
}

export function formatWeekLabel(num, lang) {
  if (lang === "az") return `${num}${azSuffix(num)} həftə`;
  return `Week ${num}`;
}
