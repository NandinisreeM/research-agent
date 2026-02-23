import React, { useState } from 'react';
import styles from "./App.module.css";
import { Search, Building2, Target, Users, TrendingUp, Cpu, CreditCard, AlertCircle } from 'lucide-react';

function App() {
  const [company, setCompany] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleResearch = async () => {
    if (!company) return;
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch('http://localhost:5000/agent/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company }),
      });

      if (!response.ok) throw new Error('Server error or rate limit reached');

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
<div className={styles.page}>
  <nav className={styles.navbar}>
    <div className={styles.navInner}>
      <div className={styles.brand}>
        <div className={styles.logo}>
          <Cpu size={20} />
        </div>
        <span>AgentResearch.ai</span>
      </div>
    </div>
  </nav>

  <main className={styles.main}>
    <div className={styles.hero}>
      <h1 className={styles.title}>Company Intelligence Agent</h1>
      <p className={styles.subtitle}>
        Enter a company name to generate GTM insights instantly.
      </p>

      <div className={styles.searchBar}>
        <div className={styles.inputWrapper}>
          <Search size={20} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="e.g. Stripe, NVIDIA, Snowflake..."
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleResearch()}
            className={styles.input}
          />
        </div>

        <button
          onClick={handleResearch}
          disabled={loading}
          className={styles.button}
        >
          {loading ? "Analyzing..." : "Research"}
        </button>
      </div>
    </div>

    {error && (
      <div className={styles.error}>
        <AlertCircle size={18} />
        <span>{error}</span>
      </div>
    )}

    {data && (
      <div className={styles.results}>
        <div className={styles.card}>
          <h2 className={styles.company}>{data.company}</h2>
          <span className={styles.industry}>
            <Building2 size={14} />
            {data.industry}
          </span>
          <p className={styles.summary}>{data.product_summary}</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              <Users size={16} /> Target Customers
            </h3>
            <ul className={styles.list}>
              {data.target_customers.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              <CreditCard size={16} /> Pricing Model
            </h3>
            <p className={styles.text}>{data.pricing_model}</p>
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>
            <TrendingUp size={16} /> Go-To-Market Insights
          </h3>
          <div className={styles.insights}>
            {data.gtm_insights.map((g, i) => (
              <div key={i} className={styles.insight}>
                {g}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.competitors}>
          <h4>Market Competitors</h4>
          <div className={styles.tags}>
            {data.competitors.map((c, i) => (
              <span key={i}>{c}</span>
            ))}
          </div>
        </div>
      </div>
    )}
  </main>
</div>
  );
}

export default App;