"use client";

export default function AboutPage() {
  return (
    <div className="py-6 max-w-xl mx-auto">
      <h1 className="text-lg font-black mb-6">About Arena</h1>

      <div className="card p-5 space-y-5">
        {/* About */}
        <div>
          <h2 className="text-sm font-bold text-green-400 mb-2">⚽ What is Arena?</h2>
          <p className="text-xs text-[--muted] leading-relaxed">
            Arena is a free football prediction platform where you compete against friends and other fans by predicting match scores every week. No betting, no gambling — just pure skill, knowledge, and bragging rights. We select 10 matches each week, you predict the scores, and our scoring system rewards accuracy across multiple categories.
          </p>
        </div>

        {/* How it works */}
        <div>
          <h2 className="text-sm font-bold text-green-400 mb-2">🎯 How it works</h2>
          <p className="text-xs text-[--muted] leading-relaxed">
            Each week, 10 football matches are posted on the platform. For every match, you predict the exact score, choose Over or Under 2.5 goals, and select which team will score first. Points are awarded for each correct element — the more accurate your prediction, the more points you earn. Maximum 50 points per match, 500 per week. Monthly top 3 predictors win prizes.
          </p>
        </div>

        {/* Why Arena */}
        <div>
          <h2 className="text-sm font-bold text-green-400 mb-2">💡 Why Arena?</h2>
          <p className="text-xs text-[--muted] leading-relaxed">
            Most prediction platforms are complicated or tied to gambling. Arena is different — it is free to play, skill-based, and built for football fans who love the game and want to prove their knowledge. Whether you follow the Premier League, Champions League, or your local league, Arena gives you a stage to compete.
          </p>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-sm font-bold text-green-400 mb-2">👋 Our team</h2>
          <p className="text-xs text-[--muted] leading-relaxed">
            Arena is built and operated from Baku, Azerbaijan. We are a small team of football enthusiasts and developers passionate about creating the best prediction experience. The platform is continuously improving based on user feedback.
          </p>
        </div>
      </div>

      {/* Contact */}
      <h2 className="text-lg font-black mt-8 mb-4">Contact Us</h2>

      <div className="card p-5 space-y-4">
        <p className="text-xs text-[--muted] leading-relaxed">
          Have a question, feedback, or want to partner with us? We would love to hear from you.
        </p>

        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-[--bg] border border-[--border] rounded-xl p-3">
            <span className="text-lg">📧</span>
            <div>
              <div className="text-[10px] text-[--muted] uppercase tracking-wider">Email</div>
              <a href="mailto:khannhuseyn@gmail.com" className="text-sm font-semibold text-green-400 hover:underline">
                khannhuseyn@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[--bg] border border-[--border] rounded-xl p-3">
            <span className="text-lg">📍</span>
            <div>
              <div className="text-[10px] text-[--muted] uppercase tracking-wider">Location</div>
              <span className="text-sm font-semibold text-[--text]">Baku, Azerbaijan</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[--bg] border border-[--border] rounded-xl p-3">
            <span className="text-lg">💬</span>
            <div>
              <div className="text-[10px] text-[--muted] uppercase tracking-wider">Social</div>
              <span className="text-sm text-[--muted]">Coming soon</span>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-[--muted] text-center pt-2 border-t border-[--border]">
          We typically respond within 24 hours.
        </p>
      </div>
    </div>
  );
}
