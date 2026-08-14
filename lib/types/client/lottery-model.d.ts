/**
 * Pure projections mapping real AgentTeams data onto the "财神鲸抽奖专场"
 * (Fortune Whale lottery) themed panel: task completion becomes an unlock
 * progress bar, tasks become themed progress rows, and members become spin
 * wheel segments. Kept side-effect free to mirror activity-model.ts.
 * @module dsh-agent-teams/client/lottery-model
 */
import type { ActivityTeam } from './ActivityPanel.tsx';
/** Progress-row visual tone, aligned with the CSS `data-tone` values. */
export type LotteryTone = 'waiting' | 'active' | 'done' | 'failed';
/** One themed unlock-progress row derived from a real task. */
export interface LotteryRow {
    readonly id: string;
    readonly label: string;
    readonly status: string;
    readonly tone: LotteryTone;
    /** 0–100 fill for this row's mini progress bar. */
    readonly fill: number;
}
/** One spin-wheel segment. */
export interface WheelSegment {
    readonly label: string;
    readonly kind: 'member' | 'prize';
    /** Whale artwork URL for member segments (null when unmatched / prize). */
    readonly art: string | null;
}
/** Themed status word for a raw task status. */
export declare function lotteryStatusLabel(status: string): string;
/** Overall unlock progress: completed / total tasks, 0–100 (rounded). */
export declare function unlockPercent(team: ActivityTeam): number;
/** Themed progress rows from real tasks (capped so the panel stays compact). */
export declare function progressRows(team: ActivityTeam, limit?: number): readonly LotteryRow[];
/**
 * Wheel segments: one per team member (with role whale art), padded with
 * themed prize names to a fixed eight-slice wheel. Members lead so a real
 * draw favors landing on an actual teammate.
 */
export declare function wheelSegments(team: ActivityTeam): readonly WheelSegment[];
/** Themed "本轮结果" line derived from live team activity. */
export declare function roundResult(team: ActivityTeam): string;
/** "本轮剩余次数": not-yet-completed tasks, at least 1. */
export declare function remainingDraws(team: ActivityTeam): number;
