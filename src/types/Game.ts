class Game {
    mode: string;
    time_control: string;
    rating: number;
    result: string;
    accuracy: number;

    constructor(mode: string, time_control: string, rating: number, result: string, accuracy: number) {
        this.mode = mode;
        this.time_control = time_control;
        this.rating = rating;
        this.result = result;
        this.accuracy = accuracy;
    }
}

export default Game;