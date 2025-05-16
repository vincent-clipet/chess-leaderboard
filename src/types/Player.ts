import PlayerStats from "@/types/PlayerStats.ts";

class Player {
    name: string;

    best: PlayerStats;
    rapid: PlayerStats;
    bullet: PlayerStats;

    constructor(name: string, api_data: any) {
        this.name = name;

        this.rapid = new PlayerStats(
            name,
            "rapid",
            api_data.chess_rapid?.last?.rating || 0,
            api_data.chess_rapid?.best?.rating || 0,
            api_data.chess_rapid?.record?.win || 0,
            api_data.chess_rapid?.record?.lose || 0,
            api_data.chess_rapid?.record?.draw || 0,
        )

        this.bullet = new PlayerStats(
            name,
            "bullet",
            api_data.chess_bullet?.last?.rating || 0,
            api_data.chess_bullet?.best?.rating || 0,
            api_data.chess_bullet?.record?.win || 0,
            api_data.chess_bullet?.record?.lose || 0,
            api_data.chess_bullet?.record?.draw || 0,
        )

        this.best = new PlayerStats(
            name,
            "best",
            Math.max(this.rapid.current_rating, this.bullet.current_rating),
            Math.max(this.rapid.best_rating, this.bullet.best_rating),
            (this.rapid.win || 0) + (this.bullet.win || 0),
            (this.rapid.lose || 0) + (this.bullet.lose || 0),
            (this.rapid.draw || 0) + (this.bullet.draw || 0),
        );

    }
}

export default Player;