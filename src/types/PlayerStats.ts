class PlayerStats {

    name: string;
    account: string;
    mode: string;
    current_rating: number;
    best_rating: number;
    win: number;
    lose: number;
    draw: number;
    ratio_wl: number;
    rank: number;
    total_played: number;

    constructor(name: string, account: string, mode: string, current_rating: number, best_rating: number, win: number, lose: number, draw: number) {
        this.name = name;
        this.account = account;
        this.mode = mode;
        this.current_rating = current_rating;
        this.best_rating = best_rating;
        this.win = win;
        this.lose = lose;
        this.draw = draw;
        this.rank = 999;
        this.ratio_wl = 0;
        this.total_played = win + lose + draw;

        // Calculate the W/L ratio
        if (this.win > 0 && this.lose > 0) {
            this.ratio_wl = Number((100 * this.win / (this.win + this.lose)).toFixed(0));
        } else if (this.win > 0 && this.lose === 0) {
            this.ratio_wl = 100;
        } else if (this.win === 0 && this.lose > 0) {
            this.ratio_wl = 0;
        }

        // The API doesn't always send the best rating, so we use the current rating instead
        if (this.best_rating === 0 && this.current_rating > 0) {
            this.best_rating = this.current_rating;
        }
    }
}

export default PlayerStats;