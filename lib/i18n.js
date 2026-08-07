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
    rule8: "Weekly prizes go to the top 3 predictors. Monthly prizes to the top 10.",
    rule9: "In case of a tie, the player who locked predictions earlier wins.",
    rule10: "Maximum possible: 50 points per game, 500 points per week.",
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
    locked: "kilidlənib",
    missed: "buraxılıb",
    open: "açıq",
    allLocked: "Hamısı kilidləndi! Uğurlar 🍀",
    of: "/",
    noMatchesYet: "Hələ oyun yoxdur",
    noMatchesYetDesc: "Admin tezliklə bu həftənin oyunlarını əlavə edəcək. Sonra yoxlayın!",
    noMatchesThisWeek: "Bu həftə oyun yoxdur",
    noMatchesThisWeekDesc: "Yuxarıdakı seçimdən fərqli həftə seçməyə çalışın.",
    currentWeek: "Cari Həftə",
    monthlyPrizes: "Aylıq Mükafatlar",
    prizesActivate: "Mükafatlar 100 qeydiyyatlı istifadəçiyə çatdıqda aktiv olur.",

    // Match card
    vs: "VS",
    overUnder: "Üstü / Altı 2.5",
    over: "Üstü 2.5",
    under: "Altı 2.5",
    firstToScore: "İlk qol vuran komanda",
    noGoal: "Qolsuz",
    lockPrediction: "🔒 PROQNOZu KİLİDLƏ",
    selectToLock: "Ü/A və ilk qol vuranı seçin",
    signInToPredict: "Proqnoz üçün daxil olun",
    saving: "Saxlanılır...",
    saveChanges: "💾 SAXLA",
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
    resultsOnTheWay: "Nəticələr yoldadır",
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
    homeScoreDesc: "Ev sahibi komandanın qolu düzgün",
    awayScore: "Qonaq Qolu",
    awayScoreDesc: "Qonaq komandanın qolu düzgün",
    overUnderRule: "Üstü / Altı 2.5",
    overUnderRuleDesc: "Ü/A seçiminiz faktiki ümumi qollarla uyğun gəlir",
    firstToScoreRule: "İlk Qol",
    firstToScoreRuleDesc: "Hansı komanda ilk qolu vurur",
    example: "Nümunə",
    yourPredictionLabel: "Proqnozunuz:",
    actualResult: "Faktiki nəticə:",
    totalPerfect: "Cəmi — MÜKƏMMƏl PROQNOZ! 🎯",
    tournamentRules: "Turnir Qaydaları",
    rule1: "Hər həftə təşkilatçı tərəfindən 10 futbol oyunu seçilir.",
    rule2: "Dəqiq hesabı proqnozlaşdırmalı, Üstü və ya Altı 2.5 qol seçməli və ilk qol vuran komandanı göstərməlisiniz.",
    rule3: "Üstü/Altı 2.5 sizin öz seçiminizdir — 2-1 proqnoz edib yenə də Altı seçə bilərsiniz.",
    rule4: "Proqnozlar başlanğıca qədər istənilən vaxt redaktə edilə bilər. Oyun başlayanda avtomatik kilidlənir.",
    rule5: "Düzgün Nəticə dəqiq hesab səhv olsa belə, doğru nəticəni (Ev Qələbəsi / Heç-heçə / Qonaq Qələbəsi) proqnozlaşdırmaq deməkdir.",
    rule6: "Xallar toplanır — həftəlik xallar aylıq və ümumi cəminizə əlavə olunur.",
    rule7: "Həftələr Bazar ertəsindən Bazara qədərdir. Aylar təqvimə uyğundur. İki ayı əhatə edən həftə bir həftəyə sayıla bilər, lakin iki ay arasında bölünə bilər — buna görə həftəlik və aylıq sıralamalar fərqli ola bilər.",
    rule8: "Həftəlik mükafatlar ilk 3 proqnozçuya verilir. Aylıq mükafatlar ilk 10-a.",
    rule9: "Bərabərlik halında proqnozunu daha tez kilidləyən oyunçu qalib gəlir.",
    rule10: "Maksimum mümkün: oyun başına 50 xal, həftəlik 500 xal.",
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
    saveProfile: "Profili Saxla",

    // Footer
    aboutUs: "Haqqımızda",
    contact: "Əlaqə",
    privacyPolicy: "Məxfilik Siyasəti",

    // Share
    shareMyScore: "📤 Xalımı paylaş",
    shareTitle: "Xalınızı paylaşın",
    share: "📤 Paylaş",
    download: "💾 Yüklə",
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
