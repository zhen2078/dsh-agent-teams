import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import { useEffect, useMemo, useState } from 'react';
import { LEAD_ART } from "./artwork.js";
import { progressRows, roundResult, wheelSegments, } from "./lottery-model.js";
import css from './LotteryPanel.module.css';
/** Full turns the wheel spins before aligning on the winner. */
const SPIN_TURNS = 4;
/** Slice colors, alternating deep/bright red like the mockup. */
const SLICE_COLORS = ['#b3111d', '#7d0a15'];
/** The "miss" segment that does not advance progress. */
const MISS_LABEL = '谢谢参与';
/** Draws granted per round. */
const TOTAL_DRAWS = 10;
/** Advance one unlock row a single step: 等待中 → 匹配中 → 已到账. */
function advanceRow(row) {
    if (row.tone === 'waiting')
        return { ...row, tone: 'active', status: '匹配中', fill: 60 };
    if (row.tone === 'active')
        return { ...row, tone: 'done', status: '已到账', fill: 100 };
    return row;
}
/**
 * The lottery overlay for one team.
 * @param team - the primary live/archived team to theme.
 * @param onClose - dismiss the overlay (Esc, backdrop, or the give-up link).
 */
export function LotteryPanel({ team, onClose }) {
    const segments = useMemo(() => wheelSegments(team), [team]);
    // Local, draw-driven state layered over the real team data so spins visibly
    // move the left column. Reset whenever the underlying team changes.
    const [rows, setRows] = useState(() => progressRows(team));
    const [draws, setDraws] = useState(TOTAL_DRAWS);
    const [rotation, setRotation] = useState(0);
    const [spinning, setSpinning] = useState(false);
    const [prize, setPrize] = useState(null);
    const [winnerIndex, setWinnerIndex] = useState(null);
    useEffect(() => {
        setRows(progressRows(team));
        setDraws(TOTAL_DRAWS);
        setPrize(null);
        setWinnerIndex(null);
        setSpinning(false);
    }, [team]);
    const doneCount = rows.filter((row) => row.tone === 'done').length;
    const percent = rows.length === 0 ? 0 : Math.round((doneCount / rows.length) * 100);
    // Round is won once every unlock row is fully accounted for (100%).
    const won = rows.length > 0 && doneCount === rows.length;
    const result = won
        ? '🎉 V4 Pro 正式版已解锁！'
        : spinning
            ? '模型组件抽取中…'
            : prize !== null
                ? (prize === MISS_LABEL ? '谢谢参与，未涨进度' : `已抽中「${prize}」`)
                : roundResult(team);
    // Esc closes the overlay (mirrors the DependencyMap Esc pattern).
    useEffect(() => {
        const onKeyDown = (event) => {
            if (event.key === 'Escape')
                onClose();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => { window.removeEventListener('keydown', onKeyDown); };
    }, [onClose]);
    const segAngle = 360 / segments.length;
    const wheelBackground = useMemo(() => `conic-gradient(${segments
        .map((_, index) => `${SLICE_COLORS[index % 2] ?? SLICE_COLORS[0]} ${index * segAngle}deg ${(index + 1) * segAngle}deg`)
        .join(', ')})`, [segments, segAngle]);
    const spin = () => {
        if (spinning || draws <= 0 || segments.length === 0)
            return;
        const winner = Math.floor(Math.random() * segments.length);
        // Align the winner's slice center under the top pointer, plus full turns.
        const finalMod = (((360 - (winner + 0.5) * segAngle) % 360) + 360) % 360;
        const currentMod = ((rotation % 360) + 360) % 360;
        const delta = (finalMod - currentMod + 360) % 360;
        setPrize(null);
        setWinnerIndex(winner);
        setSpinning(true);
        setDraws((remaining) => Math.max(0, remaining - 1));
        setRotation(rotation + SPIN_TURNS * 360 + delta);
    };
    const onSpinEnd = () => {
        if (!spinning || winnerIndex === null)
            return;
        setSpinning(false);
        const label = segments[winnerIndex]?.label ?? null;
        setPrize(label);
        if (label === null || label === MISS_LABEL)
            return;
        // A real hit advances the next pending unlock row one step.
        setRows((previous) => {
            const activeIndex = previous.findIndex((row) => row.tone === 'active');
            const targetIndex = activeIndex !== -1 ? activeIndex : previous.findIndex((row) => row.tone === 'waiting');
            if (targetIndex === -1)
                return previous;
            return previous.map((row, index) => (index === targetIndex ? advanceRow(row) : row));
        });
    };
    const exhausted = draws <= 0 && !spinning;
    return (_jsx("div", { className: css.backdrop, role: "dialog", "aria-modal": "true", "aria-label": "\u8D22\u795E\u9CB8\u62BD\u5956\u4E13\u573A", onClick: onClose, children: _jsxs("div", { className: css.stage, "data-won": won, onClick: (event) => { event.stopPropagation(); }, children: [won && _jsx("span", { className: css.winGlow, "aria-hidden": true }), _jsx("span", { className: css.whale, style: { backgroundImage: `url(${LEAD_ART})` }, "aria-hidden": true }), _jsx("button", { type: "button", className: css.closeX, onClick: onClose, "aria-label": "\u5173\u95ED", children: "\u00D7" }), _jsxs("div", { className: css.left, children: [_jsx("span", { className: css.brand, children: "DeepSeek V4 Pro \u6B63\u5F0F\u7248 \u00B7 \u8D22\u795E\u9CB8\u4E13\u573A" }), _jsxs("h2", { className: css.title, children: ["\u8F6C\u5230 ", _jsx("em", { children: "V4 Pro \u6B63\u5F0F\u7248" }), "\u624D\u7B97\u4F60\u8D62"] }), _jsx("p", { className: css.subtitle, children: "\u6BCF\u8F6E\u5BF9\u8BDD\u53EA\u6709 1 \u6B21\u673A\u4F1A\uFF0C\u62BD\u4E2D\u6A21\u578B\u7EC4\u4EF6\u624D\u80FD\u6DA8\u8FDB\u5EA6" }), _jsxs("div", { className: css.resultBox, children: [_jsx("div", { className: css.resultLabel, children: "\u672C\u8F6E\u7ED3\u679C" }), _jsx("div", { className: css.resultValue, children: result })] }), _jsxs("div", { className: css.progress, children: [_jsxs("div", { className: css.progressHead, children: [_jsx("span", { className: css.progressName, children: "V4 Pro \u6B63\u5F0F\u7248\u89E3\u9501\u8FDB\u5EA6" }), _jsxs("span", { className: css.progressPct, children: [percent, "%"] })] }), _jsx("div", { className: css.progressTrack, children: _jsx("div", { className: css.progressFill, style: { width: `${percent}%` } }) }), _jsx("div", { className: css.rows, children: rows.length === 0
                                        ? _jsx("div", { className: css.row, children: _jsxs("div", { className: css.rowHead, children: [_jsx("span", { className: css.rowLabel, children: "\u6B63\u5F0F\u7248\u8D44\u683C\u5339\u914D" }), _jsx("span", { className: css.rowStatus, children: "\u7B49\u5F85\u4E2D" })] }) })
                                        : rows.map((row) => (_jsxs("div", { className: css.row, "data-tone": row.tone, children: [_jsxs("div", { className: css.rowHead, children: [_jsx("span", { className: css.rowLabel, title: row.label, children: row.label }), _jsx("span", { className: css.rowStatus, children: row.status })] }), _jsx("div", { className: css.rowTrack, children: _jsx("div", { className: css.rowFill, style: { width: `${row.fill}%` } }) })] }, row.id))) })] }), _jsxs("div", { className: css.footer, children: [won
                                    ? _jsx("button", { type: "button", className: css.winCta, onClick: onClose, children: "\uD83D\uDC33 \u7ACB\u5373\u4F53\u9A8C V4 Pro \u6B63\u5F0F\u7248" })
                                    : _jsx("button", { type: "button", className: css.giveup, onClick: onClose, children: "\u653E\u5F03\u672C\u8F6E\u8D44\u683C\uFF0C\u7EE7\u7EED\u5BF9\u8BDD" }), _jsx("span", { className: css.disclaimer, children: "\u6F14\u793A\u5185\u5BB9\u7EAF\u5C5E\u865A\u6784\uFF0C\u6309 Esc \u9000\u51FA" })] })] }), _jsxs("div", { className: css.right, children: [_jsxs("div", { className: css.wheelWrap, children: [_jsx("span", { className: css.pointer, "aria-hidden": true }), _jsxs("div", { className: css.wheel, children: [_jsx("div", { className: css.wheelInner, style: { background: wheelBackground, transform: `rotate(${rotation}deg)` }, onTransitionEnd: onSpinEnd, children: segments.map((segment, index) => (_jsx("span", { className: css.seg, "data-kind": segment.kind, style: { transform: `rotate(${(index + 0.5) * segAngle - 90}deg)` }, children: _jsx("span", { className: css.segLabel, children: segment.label }) }, `${segment.label}-${index}`))) }), _jsxs("button", { type: "button", className: css.hub, "data-won": won, onClick: spin, disabled: spinning || exhausted || won, "aria-label": "\u9CB8\u559C\u62BD\u5956", children: [_jsx("span", { className: css.hubText, children: won ? '已' : spinning ? '抽奖' : exhausted ? '次数' : '鲸喜' }), _jsx("span", { className: css.hubText, children: won ? '解锁' : spinning ? '中…' : exhausted ? '用尽' : '抽奖' })] })] })] }), _jsxs("div", { className: css.draws, children: ["\u672C\u8F6E\u5269\u4F59\u6B21\u6570\uFF1A", _jsx("b", { children: draws })] }), _jsx("div", { className: css.toast, "data-won": won, children: won
                                ? '🎉 全部解锁，鲸喜通关！'
                                : prize !== null && !spinning
                                    ? (prize === MISS_LABEL ? '谢谢参与，未涨进度' : `恭喜抽中「${prize}」，进度 +1！`)
                                    : '' }), _jsx("div", { className: css.poolHint, children: won ? 'V4 Pro 正式版已到账，尽情体验！' : 'V4 Pro 正式版仍在深海奖池中' })] })] }) }));
}
