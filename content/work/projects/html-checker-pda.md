---
title: HTML Checker using Push Down Automata (PDA)
category: academic
date: 2023-11-27
summary: A Python HTML subset checker that applies explicit automaton transitions and stack-based parsing, concepts used in compiler design.
applicationTypes: ['CLI']
fields: ['Computer Science', 'Formal Languages']
tags: [Python, CLI]
cover: cover.webp
links:
  - label: Repository
    url: https://github.com/NoHaitch/HTML-Checker-using-Pushdown-Automata
---

## Overview

This project was a practical exercise in applying formal-language and automata concepts to a compiler-like syntax checker.
Rather than relying on regular expressions or Python's built-in HTML parser for validation, the program follows an automaton defined by explicit transitions and checks a supported subset of HTML.

The checker uses a pushdown automaton (PDA), which combines finite states with a stack.
The states track the parser's current context, while the stack keeps track of nested tags that must be closed in the correct order.
This distinction matters: a DFA has only a finite state and cannot keep an arbitrarily deep record of nested opening tags, while a PDA can use its stack for that purpose.

The project helped me practice the explicit state-transition logic that underlies automata in compiler design, and understand why nested syntax needs more than a plain DFA.
The transition rules are stored separately from the Python implementation, so the program reads the machine definition and applies it to the input.

For each matching transition, the checker moves to the next state and updates the stack:

```python
delta[0] = PDA[j][3]
delta[2] = delta[2][len(PDA[j][2]):]
delta[2] = PDA[j][4] + delta[2]
```

Here, the transition changes the current state, removes the matched stack symbol, and adds the transition's replacement stack content.
The checker accepts only when it reaches its designated accepting state and the stack is empty.

## Supported elements

The checker recognizes a defined subset of document, text, link, image, form, and table tags.
It handles nesting for elements such as `html`, `head`, `body`, `div`, `form`, and `table`, along with formatting tags including `em`, `b`, `abbr`, `strong`, and `small.
It is a learning implementation rather than a complete HTML validator.

The [PDA diagram](https://drive.google.com/file/d/1CbVagQ2CuBhSvng2pcsUx9kJYFlHLXqB/view?usp=sharing) shows the machine used by the checker.
