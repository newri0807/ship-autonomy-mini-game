# Ship Autonomy Game

Ship Autonomy Game is an interactive web-based game where players navigate a ship through an ocean filled with obstacles and collectible items. The game features both manual and autonomous navigation modes, providing an engaging and challenging experience.

## Features

-   Ocean-themed game environment
-   Manual navigation using arrow keys
-   Autonomous navigation mode
-   Collectible items to increase score
-   Obstacles to avoid
-   Dynamic difficulty scaling
-   Responsive design for various screen sizes

## Technologies Used

-   React.js
-   Next.js
-   TypeScript
-   Tailwind CSS
-   React Icons

## Installation

1. Clone the repository:

    ```
    git clone https://github.com/yourusername/ship-autonomy-game.git
    ```

2. Navigate to the project directory:

    ```
    cd ship-autonomy-game
    ```

3. Install dependencies:

    ```
    npm install
    ```

4. Run the development server:

    ```
    npm run dev
    ```

5. Open your browser and visit `http://localhost:3000`

## How to Play

1. Click the "Start Game" button to begin.
2. Use the arrow keys to navigate your ship:
    - ↑ : Move up
    - ↓ : Move down
    - ← : Move left
    - → : Move right
3. Collect yellow items (🎁) to increase your score.
4. Avoid red obstacles (💣) to maintain your health.
5. The game enters Autonomous Mode when you reach a score of 40. During this time, the ship will navigate automatically for 20 seconds.
6. The game ends when your health reaches zero or when you achieve a score of 100.

## Project Structure

-   `components/`: Contains React components like ControlPanel, HUD, and OceanBackground
-   `hooks/`: Custom hooks for game state management and actions
-   `pages/`: Next.js pages, including the main game component
-   `styles/`: Global styles and Tailwind CSS configuration

## structure

```
ship-autonomy-game
├─ app
│  ├─ favicon.ico
│  ├─ game
│  │  └─ page.tsx
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ components
│  ├─ ControlPanel.tsx
│  ├─ HUD.tsx
│  └─ OceanBackground.tsx
├─ hooks
│  ├─ types.ts
│  ├─ useGameActions.ts
│  ├─ useGameEffects.ts
│  └─ useGameState.ts
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ next.svg
│  └─ vercel.svg
├─ README.md
├─ tailwind.config.ts
└─ tsconfig.json

```