---
tags:
  - template
---
## Anki Flashcard Template

Use this to create notes that export to Anki via the `obsidian_to_anki` plugin.

### How It Works

The plugin scans for specific patterns in your notes. Place all Anki notes inside the `anki/` folder to keep them separate from your thinking notes.

### Card Formats

**Basic card** — uses `START` / `END` blocks with the deck and card type:

```markdown
TARGET DECK
DeckName::SubDeck

START
Basic
Front: Your question here
Back: Your answer here
Tags: tag1 tag2
<!--ID: 1770675114874-->
END
```

**Reversed card** — answer shown first, you recall the question:

```markdown
START
Basic (and reversed card)
Front: Term or concept
Back: Definition or explanation
Tags: tag1 tag2
<!--ID: 1770675114880-->
END
```

### Rules

1. **One topic per file** — group related cards together
2. **Keep answers concise** — if it's longer than 3 sentences, break it into multiple cards
3. **Use active recall phrasing** — "What does X do?" not "X is..."
4. **Tag everything** — makes filtering decks easier
5. **Link back to your notes** — add `Related: [[Note Title]]` so you can go deeper
