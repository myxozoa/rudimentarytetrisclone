class Board {
    constructor() {
        this.playMatrix = [];
    }

    createMatrix(w, h) {
        const matrix = [];
        while (h--) {
            matrix.push(new Array(w).fill(0));
        }
        this.playMatrix = matrix;
    }

    sweep() {
        let rowCount = 1;
        outer: for (let y = this.playMatrix.length - 1; y > 0; --y) {
            for (let x = 0; x < this.playMatrix[y].length; ++x) {
                if (this.playMatrix[y][x] === 0) {
                    continue outer;
                }
            }
            const row = this.playMatrix.splice(y, 1)[0].fill(0);
            this.playMatrix.unshift(row);
            y++;

            player.score += (((rowCount ^ 2) * scoreMult) * 10);      //  SCORE
            rowCount *= 2;
        }
    }

    collide(playMatrix, player) {
        const piece = player.currentPiece;
        const position = player.pos;
        for (let y = 0; y < piece.length; ++y) {
            for (let x = 0; x < piece[y].length; ++x) {
                if (piece[y][x] !== 0 &&
                    (playMatrix[y + position.y] &&
                    playMatrix[y + position.y][x + position.x]) !== 0) {
                    return true;
                }
            }
        }
        return false;
    }

    merge(playMatrix, player) {
        player.currentPiece.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    playMatrix[y + player.pos.y][x + player.pos.x] = value;
                }
            });
        });
    }


}