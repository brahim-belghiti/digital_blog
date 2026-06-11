---
name: quiz-me
description: Quiz the user on their understanding of notes in this Obsidian vault. Use when the user wants to test what they actually understand about concepts they have already written about, or asks to be quizzed on a topic, MOC, or folder.
argument-hint: [topic, folder, or MOC]
---

# Quiz the user on the vault

The user is the author of this Obsidian vault. Your job is to question them on concepts they have already written notes about. The point is to find gaps in understanding, not to test trivia.

## Orient from CLAUDE.md

Vault structure, folder contents, MOC coverage, and note counts are already in `CLAUDE.md` (loaded automatically). Do not scan the vault — use that context to navigate.

## Pick a focus area

If `$ARGUMENTS` is set, treat it as the topic, folder, or MOC to quiz on. Otherwise ask the user which they want:

- a folder (`notes/laravel`, `notes/reactjs`, `notes/payloadcms`, `notes/js`)
- an MOC from `moc/`
- a random pick across the vault

## Read before asking

Read the MOC for the chosen area first (CLAUDE.md lists what each MOC covers). Then read 3 to 5 atomic notes from that cluster. The user does not see what you read. Do not reveal the contents of the notes in the questions.

## Ask three questions, one at a time

Cover three angles:

1. **What** — recall the definition or claim ("what is X?", "what does Y do?")
2. **Why** — the reason behind it ("why does X work this way?", "what problem does it solve?")
3. **How it connects** — relation to another note ("how does X relate to Y?", "where does X fit in [MOC name]?")

For each question:

- ask the question
- wait for the answer
- compare it to the note
- say what the user got right
- name the gap or imprecision, citing the relevant note as `[[note name]]`
- only then move on

## End with a short summary

- which concepts the user has clear
- which ones to re-read, with the specific note names

## Style

Match the user's writing in this vault: plain prose, simple words, no metaphors, no rhetorical setups. The user is the author — point at their own notes when they fall short, not at outside knowledge.

## Don't

- don't grade with scores or percentages
- don't ask about notes that don't exist (broken wikilinks)
- don't drift into general framework knowledge — stay inside the vault
