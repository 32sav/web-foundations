// ---------- Starting data ----------
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

const CATEGORIES = ["personal", "work", "study"];

// Lower-case text with extra spaces removed, used for comparing
function normalize(text) {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

// ---------- 1. searchNotes ----------
function searchNotes(word) {
  const target = word.toLowerCase();
  return notes.filter((note) => note.text.toLowerCase().includes(target));
}

// ---------- 2. longestNote ----------
function longestNote() {
  if (notes.length === 0) return null;
  let longest = notes[0];
  for (const note of notes) {
    if (note.text.length > longest.text.length) {
      longest = note;
    }
  }
  return longest;
}

// ---------- 3. countByCategory ----------
function countByCategory() {
  const counts = {};
  for (const note of notes) {
    if (counts[note.category] === undefined) {
      counts[note.category] = 0;
    }
    counts[note.category]++;
  }
  return counts;
}

// ---------- 4. getSummary ----------
function getSummary() {
  const counts = countByCategory();
  const total = notes.length;
  const word = total === 1 ? "note" : "notes";
  const personal = counts.personal || 0;
  const work = counts.work || 0;
  const study = counts.study || 0;
  return `${total} ${word}: ${personal} personal, ${work} work, ${study} study.`;
}

// ---------- 5. isDuplicate ----------
function isDuplicate(text) {
  const target = normalize(text);
  return notes.some((note) => normalize(note.text) === target);
}

// ---------- 6. addNote ----------
function addNote(text, category) {
  const cleaned = text.trim();
  if (cleaned.length < 1 || cleaned.length > 200) {
    console.log("❌ Rejected: the note must be 1-200 characters.");
    return false;
  }
  if (!CATEGORIES.includes(category)) {
    console.log(`❌ Rejected: "${category}" is not a valid category.`);
    return false;
  }
  if (isDuplicate(cleaned)) {
    console.log("❌ Rejected: that note already exists.");
    return false;
  }
  const nextId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) + 1 : 1;
  notes.push({ id: nextId, text: cleaned, category: category });
  console.log(`✅ Added: "${cleaned}"`);
  return true;
}

// ---------- Tests ----------
console.log("--- searchNotes ---");
console.log(searchNotes("MILK"));   // expected: array with 1 note (id 1, "Buy milk and bread")
console.log(searchNotes("xyz"));    // expected: [] (no results)

console.log("--- longestNote ---");
console.log(longestNote());         // expected: the note with id 3 ("Email the project report to Grace")
const backup = notes;
notes = [];
console.log(longestNote());         // expected: null (empty array)
notes = backup;

console.log("--- countByCategory ---");
console.log(countByCategory());     // expected: { personal: 2, study: 2, work: 1 }
notes = [];
console.log(countByCategory());     // expected: {} (empty object)
notes = backup;

console.log("--- getSummary ---");
console.log(getSummary());          // expected: "5 notes: 2 personal, 1 work, 2 study."
notes = [backup[0]];
console.log(getSummary());          // expected: "1 note: 1 personal, 0 work, 0 study."
notes = backup;

console.log("--- isDuplicate ---");
console.log(isDuplicate("  buy MILK   and bread  ")); // expected: true (ignores case and extra spaces)
console.log(isDuplicate("Walk the dog"));              // expected: false

console.log("--- addNote ---");
console.log(addNote("Walk the dog", "personal"));   // expected: ✅ Added line, then true
console.log(addNote("walk the dog ", "work"));      // expected: ❌ duplicate line, then false
console.log(addNote("   ", "work"));                // expected: ❌ length line, then false
console.log(addNote("Plan a trip", "fun"));         // expected: ❌ category line, then false
console.log(addNote("x".repeat(201), "study"));     // expected: ❌ length line, then false
console.log(addNote("Prepare slides", "work"));     // expected: ✅ Added line, then true
console.log(getSummary());                          // expected: "7 notes: 3 personal, 2 work, 2 study."