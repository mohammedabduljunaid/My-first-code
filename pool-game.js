// Ball class
class Ball {
    constructor(x, y, radius, color, type = 'normal') {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.type = type; // 'normal', 'solid', 'stripe', 'eight'
        this.vx = 0;
        this.vy = 0;
        this.friction = 0.98;
        this.pocketed = false;
    }

    update() {
        // Apply friction
        this.vx *= this.friction;
        this.vy *= this.friction;

        // Update position
        this.x += this.vx;
        this.y += this.vy;

        // Stop if moving very slowly
        if (Math.abs(this.vx) < 0.1) this.vx = 0;
        if (Math.abs(this.vy) < 0.1) this.vy = 0;
    }

    draw(ctx) {
        if (this.pocketed) return;

        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw stripe pattern for stripe balls
        if (this.type === 'stripe') {
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.arc(this.x, this.y - 2 + i * 4, this.radius - 1, 0, Math.PI * 2);
                ctx.stroke();
            }
        }

        // Draw number on ball
        ctx.fillStyle = 'white';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        if (this.type === 'eight') {
            ctx.fillText('8', this.x, this.y);
        }

        ctx.restore();
    }

    isMoving() {
        return Math.abs(this.vx) > 0.1 || Math.abs(this.vy) > 0.1;
    }
}

// Game class
class PoolGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        // Game parameters
        this.tableWidth = this.canvas.width;
        this.tableHeight = this.canvas.height;
        this.ballRadius = 8;
        this.pocketRadius = 12;
        
        // Table boundaries
        this.borderWidth = 30;
        
        // Game state
        this.balls = [];
        this.currentPlayer = 1;
        this.player1Type = null; // 'solid' or 'stripe'
        this.player2Type = null;
        this.gameOver = false;
        this.winner = null;
        
        // Aiming
        this.aiming = false;
        this.aimStartX = 0;
        this.aimStartY = 0;
        this.power = 0;
        this.maxPower = 20;
        
        // Pockets
        this.pockets = [
            { x: this.borderWidth, y: this.borderWidth },
            { x: this.tableWidth / 2, y: this.borderWidth },
            { x: this.tableWidth - this.borderWidth, y: this.borderWidth },
            { x: this.borderWidth, y: this.tableHeight - this.borderWidth },
            { x: this.tableWidth / 2, y: this.tableHeight - this.borderWidth },
            { x: this.tableWidth - this.borderWidth, y: this.tableHeight - this.borderWidth }
        ];
        
        this.initGame();
        this.setupEventListeners();
    }

    initGame() {
        this.balls = [];
        this.currentPlayer = 1;
        this.player1Type = null;
        this.player2Type = null;
        this.gameOver = false;
        this.winner = null;
        this.power = 0;
        this.aiming = false;

        // Create white ball (cue ball)
        this.whiteBall = new Ball(this.tableWidth * 0.25, this.tableHeight / 2, this.ballRadius, 'white', 'cue');
        this.balls.push(this.whiteBall);

        // Create numbered balls in triangle formation
        const startX = this.tableWidth * 0.75;
        const startY = this.tableHeight / 2;
        const spacing = this.ballRadius * 2.2;
        
        let ballNumber = 1;
        
        // Pyramid formation
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col <= row; col++) {
                const x = startX + row * spacing * 0.866;
                const y = startY + (col - row / 2) * spacing;
                
                let color, type;
                if (ballNumber <= 7) {
                    color = ['#ff0000', '#ffaa00', '#0000ff', '#00aa00', '#aa00aa', '#aa5500', '#000000'][ballNumber - 1];
                    type = 'solid';
                } else if (ballNumber === 8) {
                    color = '#000000';
                    type = 'eight';
                } else {
                    color = ['#ff7777', '#ffcc77', '#7777ff', '#77ff77', '#ff77ff', '#cc8877', '#333333'][ballNumber - 9];
                    type = 'stripe';
                }
                
                this.balls.push(new Ball(x, y, this.ballRadius, color, type));
                ballNumber++;
                if (ballNumber > 15) break;
            }
            if (ballNumber > 15) break;
        }

        this.updateUI();
    }

    setupEventListeners() {
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        
        document.getElementById('shootBtn').addEventListener('click', () => this.shoot());
        document.getElementById('resetBtn').addEventListener('click', () => this.initGame());
        document.getElementById('powerBtn').addEventListener('click', () => this.increasePower());
    }

    handleMouseDown(e) {
        if (this.gameOver || this.currentPlayer === null) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const dx = x - this.whiteBall.x;
        const dy = y - this.whiteBall.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.ballRadius * 2 && !this.whiteBall.isMoving()) {
            this.aiming = true;
            this.aimStartX = x;
            this.aimStartY = y;
            document.getElementById('shootBtn').disabled = false;
        }
    }

    handleMouseMove(e) {
        if (!this.aiming) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.aimStartX = x;
        this.aimStartY = y;
    }

    handleMouseUp(e) {
        this.aiming = false;
    }

    increasePower() {
        this.power = Math.min(this.power + 2, this.maxPower);
        document.getElementById('powerBar').style.width = (this.power / this.maxPower * 100) + '%';
    }

    shoot() {
        if (!this.whiteBall || this.whiteBall.isMoving()) return;

        const dx = this.whiteBall.x - this.aimStartX;
        const dy = this.whiteBall.y - this.aimStartY;
        const length = Math.sqrt(dx * dx + dy * dy);
        
        if (length > 0) {
            this.whiteBall.vx = (dx / length) * this.power;
            this.whiteBall.vy = (dy / length) * this.power;
        }

        this.power = 0;
        document.getElementById('powerBar').style.width = '0%';
        document.getElementById('shootBtn').disabled = true;
        this.aiming = false;
    }

    update() {
        // Update all balls
        for (let ball of this.balls) {
            ball.update();
            this.checkBallBoundaries(ball);
        }

        // Check collisions
        this.checkCollisions();

        // Check for pocketed balls
        this.checkPockets();

        // Switch player if no balls are moving
        const anyMoving = this.balls.some(b => b.isMoving());
        if (!anyMoving && this.currentPlayer !== null) {
            setTimeout(() => this.switchPlayer(), 500);
        }

        this.updateUI();
    }

    checkBallBoundaries(ball) {
        const left = this.borderWidth + this.ballRadius;
        const right = this.tableWidth - this.borderWidth - this.ballRadius;
        const top = this.borderWidth + this.ballRadius;
        const bottom = this.tableHeight - this.borderWidth - this.ballRadius;

        if (ball.x < left) {
            ball.x = left;
            ball.vx = -ball.vx * 0.8;
        }
        if (ball.x > right) {
            ball.x = right;
            ball.vx = -ball.vx * 0.8;
        }
        if (ball.y < top) {
            ball.y = top;
            ball.vy = -ball.vy * 0.8;
        }
        if (ball.y > bottom) {
            ball.y = bottom;
            ball.vy = -ball.vy * 0.8;
        }
    }

    checkCollisions() {
        for (let i = 0; i < this.balls.length; i++) {
            for (let j = i + 1; j < this.balls.length; j++) {
                const b1 = this.balls[i];
                const b2 = this.balls[j];

                if (b1.pocketed || b2.pocketed) continue;

                const dx = b2.x - b1.x;
                const dy = b2.y - b1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDist = b1.radius + b2.radius;

                if (distance < minDist) {
                    const angle = Math.atan2(dy, dx);
                    const sin = Math.sin(angle);
                    const cos = Math.cos(angle);

                    const vx1 = b1.vx * cos + b1.vy * sin;
                    const vy1 = b1.vy * cos - b1.vx * sin;
                    const vx2 = b2.vx * cos + b2.vy * sin;
                    const vy2 = b2.vy * cos - b2.vx * sin;

                    const temp = vx1;
                    const newVx1 = vx2;
                    const newVx2 = temp;

                    b1.vx = newVx1 * cos - vy1 * sin;
                    b1.vy = vy1 * cos + newVx1 * sin;
                    b2.vx = newVx2 * cos - vy2 * sin;
                    b2.vy = vy2 * cos + newVx2 * sin;

                    const overlap = minDist - distance;
                    const moveX = (overlap / 2) * cos;
                    const moveY = (overlap / 2) * sin;
                    b1.x -= moveX;
                    b1.y -= moveY;
                    b2.x += moveX;
                    b2.y += moveY;
                }
            }
        }
    }

    checkPockets() {
        for (let ball of this.balls) {
            if (ball.pocketed) continue;

            for (let pocket of this.pockets) {
                const dx = ball.x - pocket.x;
                const dy = ball.y - pocket.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.pocketRadius) {
                    ball.pocketed = true;
                    ball.vx = 0;
                    ball.vy = 0;

                    if (ball.type !== 'cue') {
                        this.handleBallPocketed(ball);
                    }
                }
            }
        }
    }

    handleBallPocketed(ball) {
        if (ball.type === 'eight') {
            // Check if current player has all balls pocketed
            const otherType = this.currentPlayer === 1 ? this.player2Type : this.player1Type;
            const currentType = this.currentPlayer === 1 ? this.player1Type : this.player2Type;
            
            if (currentType && this.checkAllBallsPocketed(currentType)) {
                this.gameOver = true;
                this.winner = this.currentPlayer;
                alert(`Player ${this.currentPlayer} wins with the 8 ball!`);
            } else {
                alert('You pocketed the 8 ball too early! You lose!');
                this.gameOver = true;
                this.winner = this.currentPlayer === 1 ? 2 : 1;
            }
            return;
        }

        if (!this.player1Type) {
            if (ball.type === 'solid') {
                this.player1Type = 'solid';
                this.player2Type = 'stripe';
            } else {
                this.player1Type = 'stripe';
                this.player2Type = 'solid';
            }
        }
    }

    checkAllBallsPocketed(type) {
        for (let ball of this.balls) {
            if (ball.type === type && !ball.pocketed) {
                return false;
            }
        }
        return true;
    }

    switchPlayer() {
        if (!this.gameOver) {
            this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        }
    }

    updateUI() {
        const p1Balls = this.balls.filter(b => b.type === 'solid' && b.pocketed).length;
        const p2Balls = this.balls.filter(b => b.type === 'stripe' && b.pocketed).length;

        document.getElementById('playerTurn').textContent = `Player ${this.currentPlayer}'s Turn`;
        document.getElementById('p1Balls').textContent = p1Balls;
        document.getElementById('p2Balls').textContent = p2Balls;
        document.getElementById('p1Status').textContent = this.player1Type || 'Waiting';
        document.getElementById('p2Status').textContent = this.player2Type || 'Waiting';

        if (this.gameOver && this.winner) {
            document.getElementById('gameStatus').textContent = `Player ${this.winner} Wins! 🏆`;
        } else if (this.whiteBall.isMoving()) {
            document.getElementById('gameStatus').textContent = 'Balls in motion...';
        } else {
            document.getElementById('gameStatus').textContent = 'Ready to shoot';
        }
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#0d6b0d';
        this.ctx.fillRect(0, 0, this.tableWidth, this.tableHeight);

        // Draw table border
        this.ctx.strokeStyle = '#8b4513';
        this.ctx.lineWidth = this.borderWidth;
        this.ctx.strokeRect(this.borderWidth / 2, this.borderWidth / 2, 
                           this.tableWidth - this.borderWidth, 
                           this.tableHeight - this.borderWidth);

        // Draw pockets
        this.ctx.fillStyle = '#000';
        for (let pocket of this.pockets) {
            this.ctx.beginPath();
            this.ctx.arc(pocket.x, pocket.y, this.pocketRadius, 0, Math.PI * 2);
            this.ctx.fill();
        }

        // Draw balls
        for (let ball of this.balls) {
            ball.draw(this.ctx);
        }

        // Draw aiming guide
        if (this.aiming && !this.whiteBall.isMoving()) {
            const dx = this.whiteBall.x - this.aimStartX;
            const dy = this.whiteBall.y - this.aimStartY;
            const length = Math.sqrt(dx * dx + dy * dy);

            if (length > 0) {
                const extendLength = 100;
                const extendX = (dx / length) * extendLength;
                const extendY = (dy / length) * extendLength;

                this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
                this.ctx.lineWidth = 2;
                this.ctx.setLineDash([5, 5]);
                this.ctx.beginPath();
                this.ctx.moveTo(this.whiteBall.x, this.whiteBall.y);
                this.ctx.lineTo(this.whiteBall.x + extendX, this.whiteBall.y + extendY);
                this.ctx.stroke();
                this.ctx.setLineDash([]);
            }
        }
    }

    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }

    start() {
        this.gameLoop();
    }
}

// Initialize game when page loads
window.addEventListener('DOMContentLoaded', () => {
    const game = new PoolGame('gameCanvas');
    game.start();
});