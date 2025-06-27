# Minesweeper AI Algorithm Analysis

This document breaks down the decision-making process of the classic mode AI in `minesweeper.html`.

## Current Algorithm

The AI's logic is executed in a prioritized sequence of strategies. If a higher-priority strategy finds a move, the AI executes it immediately without evaluating lower-priority strategies.

### Strategy 1: Obvious Moves (Deterministic)

This is the most basic and reliable strategy. The AI iterates through every revealed cell that has a number. For each numbered cell, it checks its adjacent cells.

-   **Obvious Safe Cell:** If the number on the cell equals the number of adjacent flagged mines, it means all other unrevealed, un-flagged neighbors are safe and can be revealed.
-   **Obvious Mine:** If the number on the cell minus the number of adjacent flagged mines equals the number of adjacent unrevealed cells, it means all those unrevealed cells must be mines and can be flagged.

**Strength:** This strategy is 100% accurate and finds the easiest moves on the board.

### Strategy 2: Subset Logic (Deterministic)

This is a more advanced deterministic strategy that deduces moves by comparing the unrevealed neighbors of two adjacent, revealed, numbered cells.

-   **How it works:** Consider two adjacent numbered cells, `Cell A` and `Cell B`. Let `Set A` be the set of unrevealed neighbors of `Cell A`, and `Set B` be the set of unrevealed neighbors of `Cell B`.
    -   If `Set B` is a subset of `Set A`, we can deduce information about the cells that are in `Set A` but not in `Set B`. The difference in the number of remaining mines for each cell tells us if those unique cells are all mines or all safe.
-   **Example:** If `Cell A` has 2 remaining mines and `Cell B` has 1, and `Set A` has 3 cells while `Set B` (the subset) has 2, the single cell unique to `Set A` must be a mine.

**Strength:** This logic is also 100% accurate and solves common patterns that Strategy 1 cannot handle alone. It significantly improves the AI's ability to solve complex board states without guessing.

### Strategy 3: Probabilistic Guessing (Fallback)

When no deterministic moves can be found by the first two strategies, the AI resorts to guessing.

-   It calculates a rudimentary probability for each unrevealed cell on the board being a mine.
-   It then selects the cell with the lowest probability of being a mine and reveals it.

**Weaknesses:**

1.  **Non-Adjacent Guessing (The "Jumping" Problem):** This is the critical flaw you identified. The AI calculates probabilities for **all** unrevealed cells on the entire board. This often leads it to select a cell in a completely unexplored area, far from the current "frontier" of revealed cells. This is inefficient and not how a skilled player operates. A player works with the information they have, which is most relevant at the boundary of the explored area.
2.  **Simplistic Probabilities:** The probability calculation is basic. It considers each numbered cell's information in isolation and assigns the highest probability to its neighbors. It doesn't create a unified probability model across the entire frontier, which can lead to suboptimal guesses.
3.  **No Global Mine Count Awareness:** The guessing model does not incorporate the total number of mines remaining on the board into its calculation, which is a key piece of information for making advanced logical deductions.

## Planned Improvements

1.  **Fix Non-Adjacent Guessing:** The immediate priority is to modify Strategy 3. The AI will be updated to only consider cells that are **adjacent to already revealed numbered cells** for its probabilistic guess. This will force the AI to play on the "frontier" and prevent it from jumping to random, isolated parts of the board.
