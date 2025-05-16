class PlayerStats {

    name: string;
    mode: string;
    current_rating: number;
    best_rating: number;
    win: number;
    lose: number;
    draw: number;
    ratio_wl: number;
    rank: number;

    constructor(name: string, mode: string, current_rating: number, best_rating: number, win: number, lose: number, draw: number) {
        this.name = name;
        this.mode = mode;
        this.current_rating = current_rating;
        this.best_rating = best_rating;
        this.win = win;
        this.lose = lose;
        this.draw = draw;
        this.rank = 999;
        this.ratio_wl = 0;
        if (this.win && this.lose) {
            this.ratio_wl = Number((100 * this.win / (this.win + this.lose)).toFixed(0));
        }
    }
}

export default PlayerStats;