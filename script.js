document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusMessage = document.getElementById('statusMessage');
    const scoreX = document.getElementById('scoreX');
    const scoreO = document.getElementById('scoreO');
    const scoreTie = document.getElementById('scoreTie');
    const newGameBtn = document.getElementById('newGameBtn');
    const resetScoreBtn = document.getElementById('resetScoreBtn');
    const darkModeBtn = document.getElementById('darkModeBtn');

    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let scores = { X: 0, O: 0, Tie: 0 };

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

        if (gameState[clickedCellIndex] !== '' || !gameActive) return;

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        checkResult();
    }

    function checkResult() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusMessage.textContent = `Player ${currentPlayer} has won!`;
            gameActive = false;
            scores[currentPlayer]++;
            updateScoreBoard();
            return;
        }

        if (!gameState.includes('')) {
            statusMessage.textContent = `Game ended in a draw!`;
            gameActive = false;
            scores.Tie++;
            updateScoreBoard();
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusMessage.textContent = `Player ${currentPlayer}'s turn`;
    }

    function updateScoreBoard() {
        scoreX.textContent = scores.X;
        scoreO.textContent = scores.O;
        scoreTie.textContent = scores.Tie;
    }

    function resetGame() {
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        statusMessage.textContent = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = '');
    }

    function resetScore() {
        scores = { X: 0, O: 0, Tie: 0 };
        updateScoreBoard();
    }

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    newGameBtn.addEventListener('click', resetGame);
    resetScoreBtn.addEventListener('click', resetScore);
    darkModeBtn.addEventListener('click', toggleDarkMode);

    // Initialize the game
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
});