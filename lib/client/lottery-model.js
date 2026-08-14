/**
 * Pure projections mapping real AgentTeams data onto the "财神鲸抽奖专场"
 * (Fortune Whale lottery) themed panel: task completion becomes an unlock
 * progress bar, tasks become themed progress rows, and members become spin
 * wheel segments. Kept side-effect free to mirror activity-model.ts.
 * @module dsh-agent-teams/client/lottery-model
 */
import { memberArtUrl } from "./artwork.js";
/** Themed status word for a raw task status. */
const LOTTERY_STATUS_LABEL = {
    pending: '等待中',
    claimed: '等待中',
    in_progress: '匹配中',
    running: '匹配中',
    completed: '已到账',
    failed: '未中签',
    cancelled: '已放弃',
};
/** Themed status word for a raw task status. */
export function lotteryStatusLabel(status) {
    return LOTTERY_STATUS_LABEL[status] ?? '等待中';
}
/** Count of completed tasks in a team. */
function completedCount(team) {
    return team.tasks.filter((task) => task.status === 'completed').length;
}
/** Overall unlock progress: completed / total tasks, 0–100 (rounded). */
export function unlockPercent(team) {
    if (team.tasks.length === 0)
        return 0;
    return Math.round((completedCount(team) / team.tasks.length) * 100);
}
/** Visual tone for a task in the themed progress list. */
function toneOf(task) {
    if (task.status === 'completed')
        return 'done';
    if (task.status === 'failed')
        return 'failed';
    if (task.status === 'in_progress' || task.state === 'running')
        return 'active';
    return 'waiting';
}
/** Per-row fill: completed=100, in-progress=assignee progress (>=45), else 0. */
function fillOf(task, team) {
    if (task.status === 'completed')
        return 100;
    if (task.status === 'in_progress' || task.state === 'running') {
        const owner = team.members.find((member) => member.name === task.assignee);
        const progress = owner === undefined ? 0 : Math.round(owner.progress * 100);
        return Math.min(95, Math.max(45, progress));
    }
    return 0;
}
/** Themed progress rows from real tasks (capped so the panel stays compact). */
export function progressRows(team, limit = 5) {
    return team.tasks.slice(0, limit).map((task) => ({
        id: task.id,
        label: task.subject || task.id,
        status: lotteryStatusLabel(task.status),
        tone: toneOf(task),
        fill: fillOf(task, team),
    }));
}
/** Filler prize names, in the mockup's flavor, used to pad the wheel. */
const PRIZE_POOL = [
    '谢谢参与', '权重碎片', 'Attention Head', 'KV Cache',
    'Transformer 层', 'MoE 专家', '1B 参数', 'V4 Pro',
];
/** Total wheel segments (matches the mockup's eight-slice wheel). */
const WHEEL_SIZE = 8;
/**
 * Wheel segments: one per team member (with role whale art), padded with
 * themed prize names to a fixed eight-slice wheel. Members lead so a real
 * draw favors landing on an actual teammate.
 */
export function wheelSegments(team) {
    const members = team.members.slice(0, WHEEL_SIZE).map((member) => ({
        label: member.name,
        kind: 'member',
        art: memberArtUrl(member.name, member.role),
    }));
    const segments = [...members];
    for (const prize of PRIZE_POOL) {
        if (segments.length >= WHEEL_SIZE)
            break;
        if (segments.some((segment) => segment.label === prize))
            continue;
        segments.push({ label: prize, kind: 'prize', art: null });
    }
    // Guarantee at least a couple of slices even for an empty team.
    while (segments.length < 6) {
        segments.push({ label: PRIZE_POOL[segments.length % PRIZE_POOL.length] ?? '谢谢参与', kind: 'prize', art: null });
    }
    return segments;
}
/** Themed "本轮结果" line derived from live team activity. */
export function roundResult(team) {
    const working = team.members.some((member) => member.activity === 'working');
    if (working)
        return '模型组件抽取中…';
    if (team.tasks.length > 0 && completedCount(team) === team.tasks.length)
        return '本轮抽奖资格已到账';
    return '等待队长派工';
}
/** "本轮剩余次数": not-yet-completed tasks, at least 1. */
export function remainingDraws(team) {
    const remaining = team.tasks.length - completedCount(team);
    return Math.max(1, remaining);
}
