import { Injectable } from '@nestjs/common';
import {BehaviorSubject} from "rxjs";

enum LedAnimation {
    RED_GLOW = 'RED_GLOW',
    RAINBOW_GLOW = 'RAINBOW_GLOW',
    WHITE = 'WHITE',
    RED = 'RED',
    ORANGE = 'ORANGE'
}

@Injectable()
export class LedStatusService {
    public ledStatusSubject: BehaviorSubject<LedAnimation>

    constructor() {
        this.ledStatusSubject = new BehaviorSubject(LedAnimation.WHITE);
    }

    set ledStatus(animation: LedAnimation) {
        this.ledStatusSubject.next(animation);
    }

    get ledStatus() {
        return this.ledStatusSubject.getValue();
    }

    public setLedStatusByString(animation: string) {
        const map = {
            'RED_GLOW': LedAnimation.RED_GLOW,
            'RAINBOW_GLOW': LedAnimation.RAINBOW_GLOW,
            'WHITE': LedAnimation.WHITE,
            'RED': LedAnimation.RED,
            'ORANGE': LedAnimation.ORANGE,
        }

        this.ledStatus = map[animation] || LedAnimation.WHITE;
    }
}
