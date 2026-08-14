/**
 * 财神鲸抽奖专场 — full-screen lottery overlay skinning the AgentTeams
 * activity panel. Real team data seeds the unlock progress (task completion)
 * and the spin wheel segments (members); the wheel is a click-to-spin prize
 * wheel that lands a random segment under the top pointer.
 *
 * Draw semantics (per the subtitle "抽中模型组件才能涨进度"): each spin costs
 * one of the round's remaining draws, and a non-"谢谢参与" hit advances the
 * next pending unlock row one step (等待中 → 匹配中 → 已到账), bumping the
 * overall progress. Spinning is disabled once draws are exhausted.
 *
 * Rendered by ActivityPanel while the panel is open and a primary team exists;
 * all polling / session-follow lifecycle stays in ActivityPanel.
 * @module dsh-agent-teams/client/lottery
 */
import type { ActivityTeam } from './ActivityPanel.tsx';
/**
 * The lottery overlay for one team.
 * @param team - the primary live/archived team to theme.
 * @param onClose - dismiss the overlay (Esc, backdrop, or the give-up link).
 */
export declare function LotteryPanel({ team, onClose }: {
    readonly team: ActivityTeam;
    readonly onClose: () => void;
}): import("react").JSX.Element;
