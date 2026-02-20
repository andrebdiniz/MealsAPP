export const callGemini = async (prompt) => {
  const apiKey = ""; // A chave da API é injetada no ambiente em tempo de execução
  
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: "És o assistente inteligente da NutriMatch. Responde sempre em Português de Portugal de forma concisa e útil." }] }
  };

  const fetchWithRetry = async (url, options, retries = 5, delay = 1000) => {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    } catch (error) {
      if (retries > 0) {
        await new Promise(r => setTimeout(r, delay));
        return fetchWithRetry(url, options, retries - 1, delay * 2);
      }
      throw error;
    }
  };

  try {
    const result = await fetchWithRetry(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return result.candidates?.[0]?.content?.parts?.[0]?.text || "Sem sugestão gerada pela IA.";
  } catch (error) {
    return "Ocorreu um erro ao contactar a IA. Por favor, tente novamente mais tarde.";
  }
};

// ==========================================
// 2. MAIN APP COMPONENT & STATE
