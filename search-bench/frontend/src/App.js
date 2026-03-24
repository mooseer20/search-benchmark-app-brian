import React, { useState } from 'react';

const styles = {
  container: { backgroundColor: '#CAEBBA', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: "'Segoe UI', Roboto, sans-serif", padding: '20px' },
  card: { backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)', padding: '40px', width: '100%', maxWidth: '500px', textAlign: 'center', border: '1px solid #d1d9e6' },
  header: { color: '#2d3748', marginBottom: '10px', fontSize: '1.8rem' },
  subtitle: { color: '#718096', marginBottom: '30px', fontSize: '0.9rem' },
  input: { width: '100%', padding: '12px 15px', borderRadius: '8px', border: '2px solid #e2e8f0', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box', marginBottom: '20px' },
  button: { width: '100%', padding: '14px', borderRadius: '8px', border: 'none', backgroundColor: '#4299e1', color: 'white', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s' },
  results: { marginTop: '30px', padding: '20px', backgroundColor: '#ebf8ff', borderRadius: '8px', border: '1px solid #bee3f8', textAlign: 'left' }
};

function App() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleRun = async () => {
    setResult(null);
    try {
      const response = await fetch(`http://localhost:8080/search?target=${query}`);
      const data = await response.json();
      
      // Mapping the JSON keys from your C++ backend to the state
      setResult({
        linearTime: data.linear_ms,
        binaryTime: data.binary_ms,
        status: data.found ? "Match found" : "No Match"
      });
    } catch (error) {
      console.log("Connection Error:", error);
      alert("Could not connect to C++ container.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.header}>Algorithm Bench with Brian</h1>
        <p style={styles.subtitle}>Test your C++ search performance</p>

        <input 
          style={styles.input}
          placeholder="Enter search value..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button style={styles.button} onClick={handleRun}>
          Run Benchmark
        </button>

        {result && (
          <div style={styles.results}>
            <p style={{ fontWeight: 'bold', textAlign: 'center', color: '#2d3748', marginBottom: '20px' }}>
              Status: {result.status}
            </p>

            <div style={{ marginBottom: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                <span><strong>Linear Search</strong> <code style={{ color: '#e53e3e' }}>O(notation)</code></span>
                <span style={{ fontWeight: 'bold' }}>{result.linearTime.toFixed(5)} ms</span>
              </div>
              <div style={{ height: '12px', width: '100%', backgroundColor: '#fed7d7', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '100%', backgroundColor: '#f56565', transition: 'width 0.5s' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                <span><strong>Binary Search</strong> <code style={{ color: '#38a169' }}>O(log (notation))</code></span>
                <span style={{ fontWeight: 'bold' }}>{result.binaryTime.toFixed(5)} ms</span>
              </div>
              <div style={{ height: '12px', width: '100%', backgroundColor: '#c6f6d5', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ 
                  height: '100%', 
                  width: `${Math.max((result.binaryTime / result.linearTime) * 100, 1.5)}%`, 
                  backgroundColor: '#48bb78', 
                  transition: 'width 0.5s' 
                }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;