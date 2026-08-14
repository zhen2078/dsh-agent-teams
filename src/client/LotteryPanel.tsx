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

import { useEffect, useMemo, useState } from 'react'
import type { ActivityTeam } from './ActivityPanel.tsx'
import { LEAD_ART } from './artwork.ts'
import {
  progressRows, remainingDraws, roundResult, wheelSegments,
  type LotteryRow,
} from './lottery-model.ts'
import css from './LotteryPanel.module.css'

/** Full turns the wheel spins before aligning on the winner. */
const SPIN_TURNS = 4

/** Slice colors, alternating deep/bright red like the mockup. */
const SLICE_COLORS = ['#b3111d', '#7d0a15'] as const

/** The "miss" segment that does not advance progress. */
const MISS_LABEL = '谢谢参与'

/** Draws granted per round. */
const TOTAL_DRAWS = 10

/** Advance one unlock row a single step: 等待中 → 匹配中 → 已到账. */
function advanceRow(row: LotteryRow): LotteryRow {
  if (row.tone === 'waiting') return { ...row, tone: 'active', status: '匹配中', fill: 60 }
  if (row.tone === 'active') return { ...row, tone: 'done', status: '已到账', fill: 100 }
  return row
}

/**
 * The lottery overlay for one team.
 * @param team - the primary live/archived team to theme.
 * @param onClose - dismiss the overlay (Esc, backdrop, or the give-up link).
 */
export function LotteryPanel({ team, onClose }: {
  readonly team: ActivityTeam
  readonly onClose: () => void
}) {
  const segments = useMemo(() => wheelSegments(team), [team])

  // Local, draw-driven state layered over the real team data so spins visibly
  // move the left column. Reset whenever the underlying team changes.
  const [rows, setRows] = useState<readonly LotteryRow[]>(() => progressRows(team))
  const [draws, setDraws] = useState(TOTAL_DRAWS)
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [prize, setPrize] = useState<string | null>(null)
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null)
  useEffect(() => {
    setRows(progressRows(team))
    setDraws(TOTAL_DRAWS)
    setPrize(null)
    setWinnerIndex(null)
    setSpinning(false)
  }, [team])

  const doneCount = rows.filter((row) => row.tone === 'done').length
  const percent = rows.length === 0 ? 0 : Math.round((doneCount / rows.length) * 100)
  // Round is won once every unlock row is fully accounted for (100%).
  const won = rows.length > 0 && doneCount === rows.length
  const result = won
    ? '🎉 V4 Pro 正式版已解锁！'
    : spinning
      ? '模型组件抽取中…'
      : prize !== null
        ? (prize === MISS_LABEL ? '谢谢参与，未涨进度' : `已抽中「${prize}」`)
        : roundResult(team)

  // Esc closes the overlay (mirrors the DependencyMap Esc pattern).
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => { window.removeEventListener('keydown', onKeyDown) }
  }, [onClose])

  const segAngle = 360 / segments.length
  const wheelBackground = useMemo(
    () => `conic-gradient(${segments
      .map((_, index) => `${SLICE_COLORS[index % 2] ?? SLICE_COLORS[0]} ${index * segAngle}deg ${(index + 1) * segAngle}deg`)
      .join(', ')})`,
    [segments, segAngle],
  )

  const spin = (): void => {
    if (spinning || draws <= 0 || segments.length === 0) return
    const winner = Math.floor(Math.random() * segments.length)
    // Align the winner's slice center under the top pointer, plus full turns.
    const finalMod = (((360 - (winner + 0.5) * segAngle) % 360) + 360) % 360
    const currentMod = ((rotation % 360) + 360) % 360
    const delta = (finalMod - currentMod + 360) % 360
    setPrize(null)
    setWinnerIndex(winner)
    setSpinning(true)
    setDraws((remaining) => Math.max(0, remaining - 1))
    setRotation(rotation + SPIN_TURNS * 360 + delta)
  }

  const onSpinEnd = (): void => {
    if (!spinning || winnerIndex === null) return
    setSpinning(false)
    const label = segments[winnerIndex]?.label ?? null
    setPrize(label)
    if (label === null || label === MISS_LABEL) return
    // A real hit advances the next pending unlock row one step.
    setRows((previous) => {
      const activeIndex = previous.findIndex((row) => row.tone === 'active')
      const targetIndex = activeIndex !== -1 ? activeIndex : previous.findIndex((row) => row.tone === 'waiting')
      if (targetIndex === -1) return previous
      return previous.map((row, index) => (index === targetIndex ? advanceRow(row) : row))
    })
  }

  const exhausted = draws <= 0 && !spinning

  return (
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label="财神鲸抽奖专场"
      onClick={onClose}
    >
      <div className={css.stage} data-won={won} onClick={(event) => { event.stopPropagation() }}>
        {won && <span className={css.winGlow} aria-hidden />}
        <span className={css.whale} style={{ backgroundImage: `url(${LEAD_ART})` }} aria-hidden />
        <button type="button" className={css.closeX} onClick={onClose} aria-label="关闭">×</button>

        <div className={css.left}>
          <span className={css.brand}>DeepSeek V4 Pro 正式版 · 财神鲸专场</span>
          <h2 className={css.title}>转到 <em>V4 Pro 正式版</em>才算你赢</h2>
          <p className={css.subtitle}>每轮对话只有 1 次机会，抽中模型组件才能涨进度</p>

          <div className={css.resultBox}>
            <div className={css.resultLabel}>本轮结果</div>
            <div className={css.resultValue}>{result}</div>
          </div>

          <div className={css.progress}>
            <div className={css.progressHead}>
              <span className={css.progressName}>V4 Pro 正式版解锁进度</span>
              <span className={css.progressPct}>{percent}%</span>
            </div>
            <div className={css.progressTrack}>
              <div className={css.progressFill} style={{ width: `${percent}%` }} />
            </div>
            <div className={css.rows}>
              {rows.length === 0
                ? <div className={css.row}><div className={css.rowHead}><span className={css.rowLabel}>正式版资格匹配</span><span className={css.rowStatus}>等待中</span></div></div>
                : rows.map((row) => (
                  <div key={row.id} className={css.row} data-tone={row.tone}>
                    <div className={css.rowHead}>
                      <span className={css.rowLabel} title={row.label}>{row.label}</span>
                      <span className={css.rowStatus}>{row.status}</span>
                    </div>
                    <div className={css.rowTrack}>
                      <div className={css.rowFill} style={{ width: `${row.fill}%` }} />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className={css.footer}>
            {won
              ? <button type="button" className={css.winCta} onClick={onClose}>🐳 立即体验 V4 Pro 正式版</button>
              : <button type="button" className={css.giveup} onClick={onClose}>放弃本轮资格，继续对话</button>}
            <span className={css.disclaimer}>演示内容纯属虚构，按 Esc 退出</span>
          </div>
        </div>

        <div className={css.right}>
          <div className={css.wheelWrap}>
            <span className={css.pointer} aria-hidden />
            <div className={css.wheel}>
              <div
                className={css.wheelInner}
                style={{ background: wheelBackground, transform: `rotate(${rotation}deg)` }}
                onTransitionEnd={onSpinEnd}
              >
                {segments.map((segment, index) => (
                  <span
                    key={`${segment.label}-${index}`}
                    className={css.seg}
                    data-kind={segment.kind}
                    style={{ transform: `rotate(${(index + 0.5) * segAngle - 90}deg)` }}
                  >
                    <span className={css.segLabel}>{segment.label}</span>
                  </span>
                ))}
              </div>
              <button
                type="button"
                className={css.hub}
                data-won={won}
                onClick={spin}
                disabled={spinning || exhausted || won}
                aria-label="鲸喜抽奖"
              >
                <span className={css.hubText}>{won ? '已' : spinning ? '抽奖' : exhausted ? '次数' : '鲸喜'}</span>
                <span className={css.hubText}>{won ? '解锁' : spinning ? '中…' : exhausted ? '用尽' : '抽奖'}</span>
              </button>
            </div>
          </div>
          <div className={css.draws}>本轮剩余次数：<b>{draws}</b></div>
          <div className={css.toast} data-won={won}>
            {won
              ? '🎉 全部解锁，鲸喜通关！'
              : prize !== null && !spinning
                ? (prize === MISS_LABEL ? '谢谢参与，未涨进度' : `恭喜抽中「${prize}」，进度 +1！`)
                : ''}
          </div>
          <div className={css.poolHint}>{won ? 'V4 Pro 正式版已到账，尽情体验！' : 'V4 Pro 正式版仍在深海奖池中'}</div>
        </div>
      </div>
    </div>
  )
}
