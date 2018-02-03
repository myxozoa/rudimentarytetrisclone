class Player {
    constructor() {
        this.pos = {x: 0,
                    y: 0};
        this.currentPiece = null;
        this.score = 0;
    }

    createPiece(type) {
        switch (type) {
            case 'T':
                    return [
                            [0, 0, 0],
                            [1, 1, 1],
                            [0, 1, 0],
                        ];
            case 'O': return [
                            [2, 2],
                            [2, 2],
                        ];
            case 'L': return [
                            [0, 3, 0],
                            [0, 3, 0],
                            [0, 3, 3],
                        ];
            case 'J': return [
                            [0, 4, 0],
                            [0, 4, 0],
                            [4, 4, 0],
                        ];
            case 'I': return [
                            [0, 5, 0, 0],
                            [0, 5, 0, 0],
                            [0, 5, 0, 0],
                            [0, 5, 0, 0],
                        ];
            case 'S': return [
                            [0, 6, 6],
                            [6, 6, 0],
                            [0, 0, 0],
                        ];
            case 'Z': return [
                            [7, 7, 0],
                            [0, 7, 7],
                            [0, 0, 0],
                        ];
                    }
    }

    drop() {
        this.pos.y++;
        if (board.collide(board.playMatrix, this)) {
            this.pos.y--;
            board.merge(board.playMatrix, this);
            this.reset();
            board.sweep();
            game.updateScore();
        }
        dropCounter = 0;
    }

    rotate(dir) {
        const pos = this.pos;
        let offset = 1;
        for (let y = 0; y < this.currentPiece.length; ++y) {   // transpose matrix and swap rows to rotate (array sizes chosen per piece to facilitate rotation around percieved center)
            for (let x = 0; x < y; ++x) {
                [
                    this.currentPiece[x][y],
                    this.currentPiece[y][x],
                ] = [
                    this.currentPiece[y][x],
                    this.currentPiece[x][y],
                ];
            }
        }
        if (dir > 0) {
            this.currentPiece.forEach(row => row.reverse());
        } else {
            this.currentPiece.reverse();
        }
        while (board.collide(board.playMatrix, this)) {   // if you try to rotate into a collision you'll get pushed back
            this.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1))
            if (offset > this.currentPiece[0].length) {
                rotate(this.currentPiece, -dir);
                this.pos.x = pos;
                return;
            }
        }
    }

    move(dir) {
        this.pos.x += dir;
        if (board.collide(board.playMatrix, this)) {
            this.pos.x -= dir;
        }
    }

    reset() {
        const pieces = 'ILJOTSZ';
        this.currentPiece = this.createPiece(pieces[pieces.length * Math.random() | 0]);    // after placing a piece a new one is chosen at random
        this.pos.y = 0;
        this.pos.x = (board.playMatrix[0].length / 2 | 0) -
                        (this.currentPiece[0].length / 2 | 0);
        if (board.collide(board.playMatrix, this)) {            // if collision right after new piece enters the board -> GAME OVER
            board.playMatrix.forEach(row => row.fill(0));
            this.score = 0;
            dropInterval = 500;
            game.updateScore();
        }
    }
}
