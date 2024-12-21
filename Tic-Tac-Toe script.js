 const cells = document.querySelectorAll('.cell');
        const message = document.getElementById('message');
        const resetButton = document.getElementById('reset');
        const confetti = document.getElementById('confetti');
        const overlay = document.getElementById('winning-overlay');
        const stars = document.querySelector('.stars');

        let currentPlayer = 'X';
        let board = Array(9).fill(null);

        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        function handleClick(e) {
            const index = e.target.dataset.index;

            if (!board[index]) {
                board[index] = currentPlayer;
                e.target.textContent = currentPlayer;
                e.target.classList.add('taken');

                if (checkWin()) {
                    message.textContent = `🎉 Player ${currentPlayer} Wins! 🎉`;
                    endGame();
                    triggerEffects();
                } else if (board.every(cell => cell)) {
                    message.textContent = '🤝 It\'s a Draw!';
                    endGame();
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    message.textContent = `Player ${currentPlayer}'s Turn`;
                }
            }
        }

        function checkWin() {
            return winningCombos.some(combo => {
                return combo.every(index => board[index] === currentPlayer);
            });
        }

        function endGame() {
            cells.forEach(cell => cell.removeEventListener('click', handleClick));
        }

        function resetGame() {
            board.fill(null);
            currentPlayer = 'X';
            message.textContent = 'Player X\'s Turn';
            cells.forEach(cell => {
                cell.textContent = '';
                cell.classList.remove('taken');
                cell.addEventListener('click', handleClick);
            });
            overlay.style.display = 'none';
            confetti.innerHTML = '';
        }

        function triggerEffects() {
            overlay.style.display = 'block';
            for (let i = 0; i < 200; i++) {
                let confettiPiece = document.createElement('div');
                confettiPiece.style.left = `${Math.random() * 100}vw`;
                confettiPiece.style.animationDuration = `${Math.random() * 1 + 1}s`;
                confettiPiece.style.animationDelay = `${Math.random() * 0.5}s`;
                confetti.appendChild(confettiPiece);
            }
        }

        function createStars() {
            for (let i = 0; i < 150; i++) {
                const star = document.createElement('div');
                star.classList.add('star');
                star.style.width = `${Math.random() * 3 + 1}px`;
                star.style.height = `${Math.random() * 3 + 1}px`;
                star.style.top = `${Math.random() * 100}vh`;
                star.style.left = `${Math.random() * 100}vw`;
                star.style.animationDuration = `${Math.random() * 3 + 2}s`;
                stars.appendChild(star);
            }
        }

        cells.forEach(cell => cell.addEventListener('click', handleClick));
        resetButton.addEventListener('click', resetGame);
        createStars();
