class Player {
    name: string;
    current_rating: number;
    best_rating: number;

    win: number;
    lose: number;
    draw: number;
    ratio_wl: number;

    rank: number | null;

    constructor(name: string, current_rating: number, best_rating: number, win: number, lose: number, draw: number) {
        this.name = name;
        this.current_rating = current_rating;
        this.best_rating = best_rating;
        this.win = win;
        this.lose = lose;
        this.draw = draw;
        this.ratio_wl = (100 * win / (win+lose)).toFixed(0);
    }
};

export default Player;