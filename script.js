document.getElementById("goBtn").addEventListener("click", () => {
    const text = document.getElementById("sourceText").value;
    const termsInput = document.getElementById("searchTerms").value;
    const resultsDiv = document.getElementById("results");

    if (!text || !termsInput) {
        resultsDiv.textContent = "Please provide both text and search terms.";
        return;
    }

    const sourceText = text.toLowerCase();

    // Split and clean terms
    const terms = termsInput
        .split(",")
        .map(term => term.trim().toLowerCase())
        .filter(term => term.length > 0);

    let output = "";

    terms.forEach(term => {
        let count = 0;

        // Escape special regex characters
        const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        let regex;

        if (term.includes(" ")) {
            // Phrase match (simple global match)
            regex = new RegExp(escaped, "g");
        } else {
            // Whole word match
            regex = new RegExp(`\\b${escaped}\\b`, "g");
        }

        const matches = sourceText.match(regex);
        count = matches ? matches.length : 0;

        output += `${term} — ${count}\n`;
    });

    resultsDiv.textContent = output;
});