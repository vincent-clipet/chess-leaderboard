import PlayerStats from "@/types/PlayerStats.ts";

class Player {
    name: string;
    account: string;

    best: PlayerStats;
    rapid: PlayerStats;
    bullet: PlayerStats;
    blitz: PlayerStats;

    constructor(name: string, account: string, api_data: any) {
        this.name = name;
        this.account = account;

        this.rapid = new PlayerStats(
            name,
            account,
            "rapid",
            api_data.chess_rapid?.last?.rating || 0,
            api_data.chess_rapid?.best?.rating || 0,
            api_data.chess_rapid?.record?.win || 0,
            api_data.chess_rapid?.record?.loss || 0,
            api_data.chess_rapid?.record?.draw || 0,
        )

        this.bullet = new PlayerStats(
            name,
            account,
            "bullet",
            api_data.chess_bullet?.last?.rating || 0,
            api_data.chess_bullet?.best?.rating || 0,
            api_data.chess_bullet?.record?.win || 0,
            api_data.chess_bullet?.record?.loss || 0,
            api_data.chess_bullet?.record?.draw || 0,
        )

        this.blitz = new PlayerStats(
            name,
            account,
            "blitz",
            api_data.chess_blitz?.last?.rating || 0,
            api_data.chess_blitz?.best?.rating || 0,
            api_data.chess_blitz?.record?.win || 0,
            api_data.chess_blitz?.record?.loss || 0,
            api_data.chess_blitz?.record?.draw || 0,
        )

        this.best = new PlayerStats(
            name,
            account,
            "best",
            Math.max(this.rapid.current_rating, this.bullet.current_rating, this.blitz.current_rating),
            Math.max(this.rapid.best_rating, this.bullet.best_rating, this.blitz.best_rating),
            this.rapid.win + this.bullet.win + this.blitz.win,
            this.rapid.lose + this.bullet.lose + this.blitz.lose,
            this.rapid.draw + this.bullet.draw + this.blitz.draw,
        );

    }
}

export default Player;