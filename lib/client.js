window.__ModuleLoader__.load({
	id: "dsh-agent-teams",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let react_dom_client = require("react-dom/client");
		let react = require("react");
		require("@deepseek-ai/dsh-client-ui-primitives");
		//#region lib/client/activity-model.js
		/** Pure relationship projections used by the AgentTeams activity panel. */
		/**
		* Whether an expanded activity panel still belongs to the current session.
		*
		* The panel is mounted through a body portal, so React does not remount it
		* when the conversation route changes. Ownership keeps an expanded panel
		* from leaking onto the new-session screen (or another conversation) while
		* its local open state is being reset.
		*/
		function activityPanelExpandedForSession(open, owner, current) {
			return open && owner !== void 0 && owner === current;
		}
		//#endregion
		//#region lib/client/artwork.js
		/**
		* Shared whale artwork lookup for the activity panel and the conversation
		* card: role keywords map to the packaged role images; the captain always
		* uses the lead whale.
		* @module dsh-agent-teams/client/artwork
		*/
		/** Artwork route prefix served by the plugin host half. */
		const ART_BASE = "/plugins/dsh-agent-teams/assets/";
		/** Whale role artwork per role keyword. */
		const ROLE_ART = [
			[/resear|analys|investig|explor|data|study|研究|分析|数据|调查|探索|调研/, "researcher.png"],
			[/engineer|dev\b|server|backend|\bapi\b|runtime|watcher|contract|工程|后端|服务|接口|开发|代码|编程/, "engineer.png"],
			[/\bqa\b|test|verif|quality|测试|质量/, "qa-engineer.png"],
			[/design|\bui\b|\bux\b|front|theme|accessib|设计|前端|主题/, "designer.png"],
			[/secur|audit|risk|threat|review|安全|审计|审查|风险/, "security-reviewer.png"],
			[/docs|writer|product|spec|coordin|撰写|文案|写作|文档|协调/, "docs-coordinator.png"],
			[/release|\bbuild\b|deploy|\bops\b|\bci\b|ship|发布|构建|部署/, "engineer.png"]
		];
		/** Captain artwork (always the lead whale). */
		const LEAD_ART = `${ART_BASE}team-lead.png`;
		/**
		* Member artwork URL, or null when no role matches (initial-letter fallback).
		* @param name - the member's display name.
		* @param role - the member's role text.
		* @returns the artwork URL, or null when unmatched.
		*/
		function memberArtUrl(name, role) {
			const identity = `${name} ${role}`.toLowerCase();
			for (const [pattern, art] of ROLE_ART) if (pattern.test(identity)) return `${ART_BASE}${art}`;
			return null;
		}
		//#endregion
		//#region \0dsh-css:/Users/mhz/daily-prj/github-prj/dsh-agent-teams/src/client/AgentTeamsCard.module.css.mjs
		const css$2 = ".as0KYq_root{box-sizing:border-box;border:1px solid var(--dsw-alias-line-normal);background:var(--dsw-alias-bg-module-platform);border-radius:10px;flex-direction:column;gap:8px;width:100%;min-width:0;padding:10px 12px;display:flex}.as0KYq_head{align-items:center;gap:8px;min-width:0;display:flex}.as0KYq_leadAvatar{border:1px solid var(--dsw-alias-line-strong);object-fit:cover;background:#0b1d33;border-radius:50%;flex:none;width:24px;height:24px}.as0KYq_teamName{color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;flex:0 auto;font-size:13px;font-weight:600;line-height:20px;overflow:hidden}.as0KYq_memberCount{color:var(--dsw-alias-label-tertiary);white-space:nowrap;flex:none;margin-left:auto;font-size:11px;line-height:16px}.as0KYq_panelButton{border:1px solid var(--dsw-alias-line-strong);background:var(--dsw-alias-bg-module);color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;border-radius:999px;flex:none;padding:2px 8px;font-size:10.5px;font-weight:600;line-height:16px;transition:border-color .12s,color .12s}.as0KYq_panelButton:hover{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-state-business-primary)}.as0KYq_panelButton:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px}.as0KYq_members{flex-wrap:wrap;gap:6px;min-width:0;display:flex}.as0KYq_member{border:1px solid var(--dsw-alias-line-normal);background:var(--dsw-alias-bg-module);max-width:160px;color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;border-radius:999px;align-items:center;gap:5px;padding:3px 8px 3px 3px;font-size:11px;font-weight:500;line-height:16px;transition:border-color .12s,background-color .12s;display:inline-flex}.as0KYq_member:hover{border-color:var(--dsw-alias-state-business-primary);background:var(--dsw-alias-bg-fill-neutral)}.as0KYq_member:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px}.as0KYq_memberArt{border:1px solid var(--dsw-alias-line-strong);object-fit:cover;background:#0b1d33;border-radius:50%;width:20px;height:20px}.as0KYq_memberInitial{background:var(--dsw-alias-bg-fill-business);width:20px;height:20px;color:var(--dsw-alias-label-on-fill);border-radius:50%;justify-content:center;align-items:center;font-size:10px;font-weight:600;line-height:20px;display:inline-flex}.as0KYq_memberName{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}";
		const tagId$2 = "dsh-agent-teams/AgentTeamsCard.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$2) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-agent-teams";
			tag.dataset.pluginCss = tagId$2;
			tag.textContent = css$2;
			document.head.appendChild(tag);
		}
		var AgentTeamsCard_module_css_default = {
			"leadAvatar": "as0KYq_leadAvatar",
			"teamName": "as0KYq_teamName",
			"head": "as0KYq_head",
			"members": "as0KYq_members",
			"memberCount": "as0KYq_memberCount",
			"memberInitial": "as0KYq_memberInitial",
			"panelButton": "as0KYq_panelButton",
			"memberArt": "as0KYq_memberArt",
			"memberName": "as0KYq_memberName",
			"root": "as0KYq_root",
			"member": "as0KYq_member"
		};
		//#endregion
		//#region lib/client/AgentTeamsCard.js
		/**
		* AgentTeams conversation card: the lightweight in-conversation summary for
		* one team — the captain's whale avatar and name, the member roster as
		* clickable whale avatars (opening the member's subagent transcript), and
		* an "activity panel" button that re-activates the top-right floater.
		*
		* The floater and this card share the `agent-teams:open-panel` window event
		* so the card can summon the panel even after it was closed (or when an old
		* session is re-opened for review).
		* @module dsh-agent-teams/client/card
		*/
		/** Window event name the floater listens for to open itself. */
		const OPEN_PANEL_EVENT = "agent-teams:open-panel";
		/** Re-activate the top-right activity panel, carrying this team's summary
		* so the panel can show it even when the team no longer exists on disk
		* (historical session review). */
		function openActivityPanel(data) {
			window.dispatchEvent(new CustomEvent(OPEN_PANEL_EVENT, { detail: {
				teamId: data.teamId,
				captainSessionId: data.captainSessionId,
				teamName: data.teamName,
				members: data.members
			} }));
		}
		/** Render one durable team as a compact conversation card. */
		function AgentTeamsCard({ node, openSession, currentSessionId }) {
			const data = node.data;
			const owner = data.captainSessionId || currentSessionId() || "";
			const [snapshot, setSnapshot] = (0, react.useState)();
			(0, react.useEffect)(() => {
				let cancelled = false;
				const tick = async () => {
					for (const url of ["/plugins/dsh-agent-teams/state", "/plugins/dsh-agent-teams/state?archived=1"]) try {
						const response = await fetch(url, { cache: "no-store" });
						if (!response.ok) continue;
						const body = await response.json();
						const found = Array.isArray(body.teams) ? body.teams.find((team) => team.teamId === data.teamId && (owner === "" || team.captainSessionId === owner)) : void 0;
						if (found !== void 0) {
							if (!cancelled) setSnapshot(found);
							return;
						}
					} catch {}
				};
				tick();
				const timer = setInterval(() => {
					tick();
				}, 1500);
				return () => {
					cancelled = true;
					clearInterval(timer);
				};
			}, [data.teamId, owner]);
			const resolved = (0, react.useMemo)(() => ({
				...data,
				captainSessionId: snapshot?.captainSessionId ?? owner,
				teamName: snapshot?.name ?? data.teamName,
				members: snapshot?.members.map((member) => ({
					id: member.id,
					name: member.name,
					role: member.role
				})) ?? data.members
			}), [
				data,
				owner,
				snapshot
			]);
			return (0, react_jsx_runtime.jsxs)("section", {
				className: AgentTeamsCard_module_css_default.root,
				"data-agent-teams-card": true,
				"data-team-id": resolved.teamId,
				children: [(0, react_jsx_runtime.jsxs)("header", {
					className: AgentTeamsCard_module_css_default.head,
					children: [
						(0, react_jsx_runtime.jsx)("img", {
							className: AgentTeamsCard_module_css_default.leadAvatar,
							src: LEAD_ART,
							alt: "",
							"aria-hidden": true
						}),
						(0, react_jsx_runtime.jsx)("span", {
							className: AgentTeamsCard_module_css_default.teamName,
							title: resolved.teamName,
							children: resolved.teamName
						}),
						(0, react_jsx_runtime.jsxs)("span", {
							className: AgentTeamsCard_module_css_default.memberCount,
							children: [resolved.members.length, " 名成员"]
						}),
						(0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: AgentTeamsCard_module_css_default.panelButton,
							onClick: () => {
								openActivityPanel(resolved);
							},
							"aria-label": "打开活动面板",
							title: "打开活动面板",
							children: "活动面板"
						})
					]
				}), resolved.members.length > 0 && (0, react_jsx_runtime.jsx)("div", {
					className: AgentTeamsCard_module_css_default.members,
					children: resolved.members.map((member) => (0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						className: AgentTeamsCard_module_css_default.member,
						onClick: () => {
							if (member.id !== "") openSession(member.id);
						},
						title: member.role === "" ? member.name : `${member.name} · ${member.role}`,
						children: [memberArtUrl(member.name, member.role) !== null ? (0, react_jsx_runtime.jsx)("img", {
							className: AgentTeamsCard_module_css_default.memberArt,
							src: memberArtUrl(member.name, member.role) ?? "",
							alt: "",
							"aria-hidden": true
						}) : (0, react_jsx_runtime.jsx)("span", {
							className: AgentTeamsCard_module_css_default.memberInitial,
							children: member.name.trim().slice(0, 1).toUpperCase() || "?"
						}), (0, react_jsx_runtime.jsx)("span", {
							className: AgentTeamsCard_module_css_default.memberName,
							children: member.name
						})]
					}, member.id))
				})]
			});
		}
		//#endregion
		//#region lib/client/lottery-model.js
		/**
		* Pure projections mapping real AgentTeams data onto the "财神鲸抽奖专场"
		* (Fortune Whale lottery) themed panel: task completion becomes an unlock
		* progress bar, tasks become themed progress rows, and members become spin
		* wheel segments. Kept side-effect free to mirror activity-model.ts.
		* @module dsh-agent-teams/client/lottery-model
		*/
		/** Themed status word for a raw task status. */
		const LOTTERY_STATUS_LABEL = {
			pending: "等待中",
			claimed: "等待中",
			in_progress: "匹配中",
			running: "匹配中",
			completed: "已到账",
			failed: "未中签",
			cancelled: "已放弃"
		};
		/** Themed status word for a raw task status. */
		function lotteryStatusLabel(status) {
			return LOTTERY_STATUS_LABEL[status] ?? "等待中";
		}
		/** Count of completed tasks in a team. */
		function completedCount(team) {
			return team.tasks.filter((task) => task.status === "completed").length;
		}
		/** Visual tone for a task in the themed progress list. */
		function toneOf(task) {
			if (task.status === "completed") return "done";
			if (task.status === "failed") return "failed";
			if (task.status === "in_progress" || task.state === "running") return "active";
			return "waiting";
		}
		/** Per-row fill: completed=100, in-progress=assignee progress (>=45), else 0. */
		function fillOf(task, team) {
			if (task.status === "completed") return 100;
			if (task.status === "in_progress" || task.state === "running") {
				const owner = team.members.find((member) => member.name === task.assignee);
				const progress = owner === void 0 ? 0 : Math.round(owner.progress * 100);
				return Math.min(95, Math.max(45, progress));
			}
			return 0;
		}
		/** Themed progress rows from real tasks (capped so the panel stays compact). */
		function progressRows(team, limit = 5) {
			return team.tasks.slice(0, limit).map((task) => ({
				id: task.id,
				label: task.subject || task.id,
				status: lotteryStatusLabel(task.status),
				tone: toneOf(task),
				fill: fillOf(task, team)
			}));
		}
		/** Filler prize names, in the mockup's flavor, used to pad the wheel. */
		const PRIZE_POOL = [
			"谢谢参与",
			"权重碎片",
			"Attention Head",
			"KV Cache",
			"Transformer 层",
			"MoE 专家",
			"1B 参数",
			"V4 Pro"
		];
		/** Total wheel segments (matches the mockup's eight-slice wheel). */
		const WHEEL_SIZE = 8;
		/**
		* Wheel segments: one per team member (with role whale art), padded with
		* themed prize names to a fixed eight-slice wheel. Members lead so a real
		* draw favors landing on an actual teammate.
		*/
		function wheelSegments(team) {
			const segments = [...team.members.slice(0, WHEEL_SIZE).map((member) => ({
				label: member.name,
				kind: "member",
				art: memberArtUrl(member.name, member.role)
			}))];
			for (const prize of PRIZE_POOL) {
				if (segments.length >= WHEEL_SIZE) break;
				if (segments.some((segment) => segment.label === prize)) continue;
				segments.push({
					label: prize,
					kind: "prize",
					art: null
				});
			}
			while (segments.length < 6) segments.push({
				label: PRIZE_POOL[segments.length % PRIZE_POOL.length] ?? "谢谢参与",
				kind: "prize",
				art: null
			});
			return segments;
		}
		/** Themed "本轮结果" line derived from live team activity. */
		function roundResult(team) {
			if (team.members.some((member) => member.activity === "working")) return "模型组件抽取中…";
			if (team.tasks.length > 0 && completedCount(team) === team.tasks.length) return "本轮抽奖资格已到账";
			return "等待队长派工";
		}
		//#endregion
		//#region \0dsh-css:/Users/mhz/daily-prj/github-prj/dsh-agent-teams/src/client/LotteryPanel.module.css.mjs
		const css$1 = "._2lRS2G_backdrop{z-index:2147483000;backdrop-filter:blur(6px);background:radial-gradient(120% 120% at 50% 40%,#2800048c,#000000b8);justify-content:center;align-items:center;padding:24px;animation:.2s _2lRS2G_lotteryFade;display:flex;position:fixed;inset:0}@keyframes _2lRS2G_lotteryFade{0%{opacity:0}to{opacity:1}}._2lRS2G_stage{color:#fff6e5;background:radial-gradient(90% 120% at 12% 8%,#d51f2b 0%,#a5121d 46%,#7d0a15 100%);border:2px solid #f4c430;border-radius:28px;grid-template-columns:minmax(0,1fr) 440px;gap:20px;width:min(1180px,94vw);max-height:92vh;padding:36px 40px;animation:.26s cubic-bezier(.16,.84,.34,1) _2lRS2G_lotteryPop;display:grid;position:relative;overflow:hidden;box-shadow:0 30px 90px #0000008c,inset 0 0 60px #ffc4401f}@keyframes _2lRS2G_lotteryPop{0%{opacity:0;transform:translateY(10px)scale(.98)}to{opacity:1;transform:translateY(0)scale(1)}}._2lRS2G_stage[data-won=true]{border-color:#ffe07a;animation:.26s cubic-bezier(.16,.84,.34,1) _2lRS2G_lotteryPop,1.8s ease-in-out infinite _2lRS2G_lotteryWinGlow;box-shadow:0 30px 90px #0000008c,0 0 0 3px #ffd68080,inset 0 0 90px #ffc83c38}@keyframes _2lRS2G_lotteryWinGlow{0%,to{box-shadow:0 30px 90px #0000008c,0 0 0 3px #ffd68080,inset 0 0 90px #ffc83c38}50%{box-shadow:0 30px 110px #0000008c,0 0 0 5px #ffe07ad9,inset 0 0 130px #ffd25059}}._2lRS2G_winGlow{z-index:0;pointer-events:none;background:radial-gradient(closest-side,#ffd67866,#0000 70%);animation:1.6s ease-in-out infinite _2lRS2G_lotteryBurst;position:absolute;inset:-20%}@keyframes _2lRS2G_lotteryBurst{0%,to{opacity:.5;transform:scale(.96)}50%{opacity:.9;transform:scale(1.02)}}._2lRS2G_whale{opacity:.22;filter:saturate(1.2)drop-shadow(0 8px 20px #0006);pointer-events:none;background-position:bottom;background-repeat:no-repeat;background-size:contain;width:42%;height:116%;position:absolute;bottom:-8%;right:30%}._2lRS2G_closeX{z-index:3;color:#ffe6b0;cursor:pointer;background:#0000002e;border:1px solid #ffd68080;border-radius:50%;width:34px;height:34px;font-size:18px;line-height:1;transition:background-color .12s,transform .12s;position:absolute;top:16px;right:18px}._2lRS2G_closeX:hover{background:#00000052;transform:scale(1.06)}._2lRS2G_left{z-index:2;flex-direction:column;min-width:0;display:flex;position:relative}._2lRS2G_brand{letter-spacing:.04em;color:#ffd873;text-shadow:0 1px 6px #78000099;font-size:14px;font-weight:700}._2lRS2G_title{color:#fff;text-shadow:0 2px #7d0a15,0 6px 18px #00000059;margin-top:10px;font-size:40px;font-weight:900;line-height:1.1}._2lRS2G_title em{color:#ffd200;font-style:normal}._2lRS2G_subtitle{color:#ffe0c2;margin-top:12px;font-size:16px;font-weight:600}._2lRS2G_resultBox{background:#00000029;border:1px dashed #ffd6808c;border-radius:14px;margin-top:22px;padding:14px 18px}._2lRS2G_resultLabel{color:#ffcf6b;font-size:13px;font-weight:700}._2lRS2G_resultValue{color:#fff;margin-top:6px;font-size:24px;font-weight:800}._2lRS2G_progress{background:#5a060c80;border:1px solid #ffc44047;border-radius:16px;margin-top:22px;padding:18px 20px 8px}._2lRS2G_progressHead{justify-content:space-between;align-items:baseline;gap:12px;display:flex}._2lRS2G_progressName{color:#fff;font-size:16px;font-weight:800}._2lRS2G_progressPct{color:#ffd200;font-size:20px;font-weight:900}._2lRS2G_progressTrack{background:#00000059;border-radius:999px;height:8px;margin-top:10px;overflow:hidden}._2lRS2G_progressFill{background:linear-gradient(90deg,#ffd200,#ff8a1e);border-radius:999px;height:100%;transition:width .6s cubic-bezier(.16,.84,.34,1);box-shadow:0 0 12px #ffb42899}._2lRS2G_rows{flex-direction:column;margin-top:12px;display:flex}._2lRS2G_row{border-top:1px solid #ffd68029;padding:12px 0 14px}._2lRS2G_row:first-child{border-top:none}._2lRS2G_rowHead{justify-content:space-between;align-items:center;gap:12px;display:flex}._2lRS2G_rowLabel{color:#fff5e6;text-overflow:ellipsis;white-space:nowrap;font-size:15px;font-weight:700;overflow:hidden}._2lRS2G_rowStatus{color:#ffcf6b;white-space:nowrap;font-size:14px;font-weight:700}._2lRS2G_row[data-tone=active] ._2lRS2G_rowStatus{color:#ffe07a}._2lRS2G_row[data-tone=done] ._2lRS2G_rowStatus{color:#8affc1}._2lRS2G_row[data-tone=failed] ._2lRS2G_rowStatus{color:#ff9aa2}._2lRS2G_rowTrack{background:#0000004d;border-radius:999px;height:5px;margin-top:8px;overflow:hidden}._2lRS2G_rowFill{background:linear-gradient(90deg,#ffca3a,#ff7a1e);border-radius:999px;height:100%;transition:width .6s}._2lRS2G_row[data-tone=done] ._2lRS2G_rowFill{background:linear-gradient(90deg,#38d996,#12b981)}._2lRS2G_row[data-tone=failed] ._2lRS2G_rowFill{background:linear-gradient(90deg,#ff6b74,#d93a44)}._2lRS2G_footer{flex-direction:column;align-items:center;gap:6px;margin-top:auto;padding-top:22px;display:flex}._2lRS2G_giveup{color:#ffe0c2;text-underline-offset:4px;cursor:pointer;background:0 0;border:none;font-size:15px;font-weight:600;text-decoration:underline;transition:color .12s}._2lRS2G_giveup:hover{color:#fff}._2lRS2G_disclaimer{color:#ffe0c299;font-size:12px}._2lRS2G_winCta{color:#7d0a15;cursor:pointer;background:linear-gradient(90deg,#ffd200,#ff8a1e);border:none;border-radius:999px;padding:12px 26px;font-size:17px;font-weight:900;animation:1.4s ease-in-out infinite _2lRS2G_lotteryCta;box-shadow:0 8px 22px #ffa02880}._2lRS2G_winCta:hover{filter:brightness(1.05)}@keyframes _2lRS2G_lotteryCta{0%,to{transform:scale(1)}50%{transform:scale(1.04)}}._2lRS2G_right{z-index:2;flex-direction:column;justify-content:center;align-items:center;gap:14px;display:flex;position:relative}._2lRS2G_wheelWrap{width:360px;height:360px;position:relative}._2lRS2G_pointer{z-index:4;filter:drop-shadow(0 3px 4px #00000080);border-top:26px solid #ffd200;border-left:16px solid #0000;border-right:16px solid #0000;width:0;height:0;position:absolute;top:-6px;left:50%;transform:translate(-50%)}._2lRS2G_wheel{background:linear-gradient(135deg,#ffe07a,#f4c430 45%,#b8860b);border-radius:50%;padding:12px;position:absolute;inset:0;box-shadow:0 0 0 4px #ffd68059,0 18px 46px #00000080}._2lRS2G_wheelInner{border-radius:50%;width:100%;height:100%;transition:transform 3.8s cubic-bezier(.16,.84,.34,1);position:relative;overflow:hidden}._2lRS2G_seg{transform-origin:0;color:#7d0a15;text-shadow:0 1px #ffffff40;pointer-events:none;justify-content:flex-end;align-items:center;width:50%;padding-right:22px;font-size:13px;font-weight:800;display:flex;position:absolute;top:50%;left:50%}._2lRS2G_segLabel{text-overflow:ellipsis;white-space:nowrap;max-width:96px;overflow:hidden}._2lRS2G_seg[data-kind=prize]{color:#5a0710}._2lRS2G_hub{z-index:5;color:#fff;cursor:pointer;background:radial-gradient(circle at 50% 38%,#ff4d4d,#c1121f 70%);border:4px solid #fff2cc;border-radius:50%;width:108px;height:108px;font-size:18px;font-weight:900;line-height:1.2;transition:transform .12s,box-shadow .12s;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);box-shadow:0 8px 22px #00000080,inset 0 0 14px #ffdc9680}._2lRS2G_hub:hover:not(:disabled){transform:translate(-50%,-50%)scale(1.05)}._2lRS2G_hub:active:not(:disabled){transform:translate(-50%,-50%)scale(.96)}._2lRS2G_hub:disabled{cursor:default;opacity:.85}._2lRS2G_hub[data-won=true]{color:#7d0a15;opacity:1;background:radial-gradient(circle at 50% 38%,#ffe07a,#f0a500 72%);box-shadow:0 8px 22px #00000080,inset 0 0 18px #ffffff8c,0 0 26px #ffd25acc}._2lRS2G_hubText{display:block}._2lRS2G_draws{color:#ffd873;font-size:15px;font-weight:800}._2lRS2G_draws b{color:#fff;font-size:18px}._2lRS2G_toast{color:#fff;text-shadow:0 1px 6px #780000b3;min-height:22px;font-size:15px;font-weight:800}._2lRS2G_toast[data-won=true]{color:#ffe07a;text-shadow:0 1px 10px #ffb428b3;font-size:18px}._2lRS2G_poolHint{color:#ffe0c299;font-size:12px}@media (width<=860px){._2lRS2G_stage{grid-template-columns:minmax(0,1fr);gap:16px;padding:26px 22px;overflow-y:auto}._2lRS2G_whale{display:none}._2lRS2G_title{font-size:30px}._2lRS2G_wheelWrap{width:300px;height:300px}}";
		const tagId$1 = "dsh-agent-teams/LotteryPanel.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-agent-teams";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var LotteryPanel_module_css_default = {
			"resultLabel": "_2lRS2G_resultLabel",
			"progressHead": "_2lRS2G_progressHead",
			"lotteryWinGlow": "_2lRS2G_lotteryWinGlow",
			"footer": "_2lRS2G_footer",
			"wheel": "_2lRS2G_wheel",
			"pointer": "_2lRS2G_pointer",
			"lotteryPop": "_2lRS2G_lotteryPop",
			"resultBox": "_2lRS2G_resultBox",
			"brand": "_2lRS2G_brand",
			"right": "_2lRS2G_right",
			"rowHead": "_2lRS2G_rowHead",
			"seg": "_2lRS2G_seg",
			"hub": "_2lRS2G_hub",
			"disclaimer": "_2lRS2G_disclaimer",
			"poolHint": "_2lRS2G_poolHint",
			"rowLabel": "_2lRS2G_rowLabel",
			"resultValue": "_2lRS2G_resultValue",
			"lotteryCta": "_2lRS2G_lotteryCta",
			"toast": "_2lRS2G_toast",
			"stage": "_2lRS2G_stage",
			"winCta": "_2lRS2G_winCta",
			"progressTrack": "_2lRS2G_progressTrack",
			"segLabel": "_2lRS2G_segLabel",
			"rows": "_2lRS2G_rows",
			"closeX": "_2lRS2G_closeX",
			"progress": "_2lRS2G_progress",
			"rowTrack": "_2lRS2G_rowTrack",
			"progressFill": "_2lRS2G_progressFill",
			"lotteryFade": "_2lRS2G_lotteryFade",
			"wheelWrap": "_2lRS2G_wheelWrap",
			"draws": "_2lRS2G_draws",
			"lotteryBurst": "_2lRS2G_lotteryBurst",
			"backdrop": "_2lRS2G_backdrop",
			"left": "_2lRS2G_left",
			"winGlow": "_2lRS2G_winGlow",
			"whale": "_2lRS2G_whale",
			"title": "_2lRS2G_title",
			"progressName": "_2lRS2G_progressName",
			"row": "_2lRS2G_row",
			"rowStatus": "_2lRS2G_rowStatus",
			"subtitle": "_2lRS2G_subtitle",
			"progressPct": "_2lRS2G_progressPct",
			"rowFill": "_2lRS2G_rowFill",
			"giveup": "_2lRS2G_giveup",
			"wheelInner": "_2lRS2G_wheelInner",
			"hubText": "_2lRS2G_hubText"
		};
		//#endregion
		//#region lib/client/LotteryPanel.js
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
		/** Full turns the wheel spins before aligning on the winner. */
		const SPIN_TURNS = 4;
		/** Slice colors, alternating deep/bright red like the mockup. */
		const SLICE_COLORS = ["#b3111d", "#7d0a15"];
		/** The "miss" segment that does not advance progress. */
		const MISS_LABEL = "谢谢参与";
		/** Draws granted per round. */
		const TOTAL_DRAWS = 10;
		/** Advance one unlock row a single step: 等待中 → 匹配中 → 已到账. */
		function advanceRow(row) {
			if (row.tone === "waiting") return {
				...row,
				tone: "active",
				status: "匹配中",
				fill: 60
			};
			if (row.tone === "active") return {
				...row,
				tone: "done",
				status: "已到账",
				fill: 100
			};
			return row;
		}
		/**
		* The lottery overlay for one team.
		* @param team - the primary live/archived team to theme.
		* @param onClose - dismiss the overlay (Esc, backdrop, or the give-up link).
		*/
		function LotteryPanel({ team, onClose }) {
			const segments = (0, react.useMemo)(() => wheelSegments(team), [team]);
			const [rows, setRows] = (0, react.useState)(() => progressRows(team));
			const [draws, setDraws] = (0, react.useState)(TOTAL_DRAWS);
			const [rotation, setRotation] = (0, react.useState)(0);
			const [spinning, setSpinning] = (0, react.useState)(false);
			const [prize, setPrize] = (0, react.useState)(null);
			const [winnerIndex, setWinnerIndex] = (0, react.useState)(null);
			(0, react.useEffect)(() => {
				setRows(progressRows(team));
				setDraws(TOTAL_DRAWS);
				setPrize(null);
				setWinnerIndex(null);
				setSpinning(false);
			}, [team]);
			const doneCount = rows.filter((row) => row.tone === "done").length;
			const percent = rows.length === 0 ? 0 : Math.round(doneCount / rows.length * 100);
			const won = rows.length > 0 && doneCount === rows.length;
			const result = won ? "🎉 V4 Pro 正式版已解锁！" : spinning ? "模型组件抽取中…" : prize !== null ? prize === MISS_LABEL ? "谢谢参与，未涨进度" : `已抽中「${prize}」` : roundResult(team);
			(0, react.useEffect)(() => {
				const onKeyDown = (event) => {
					if (event.key === "Escape") onClose();
				};
				window.addEventListener("keydown", onKeyDown);
				return () => {
					window.removeEventListener("keydown", onKeyDown);
				};
			}, [onClose]);
			const segAngle = 360 / segments.length;
			const wheelBackground = (0, react.useMemo)(() => `conic-gradient(${segments.map((_, index) => `${SLICE_COLORS[index % 2] ?? SLICE_COLORS[0]} ${index * segAngle}deg ${(index + 1) * segAngle}deg`).join(", ")})`, [segments, segAngle]);
			const spin = () => {
				if (spinning || draws <= 0 || segments.length === 0) return;
				const winner = Math.floor(Math.random() * segments.length);
				const delta = (((360 - (winner + .5) * segAngle) % 360 + 360) % 360 - (rotation % 360 + 360) % 360 + 360) % 360;
				setPrize(null);
				setWinnerIndex(winner);
				setSpinning(true);
				setDraws((remaining) => Math.max(0, remaining - 1));
				setRotation(rotation + SPIN_TURNS * 360 + delta);
			};
			const onSpinEnd = () => {
				if (!spinning || winnerIndex === null) return;
				setSpinning(false);
				const label = segments[winnerIndex]?.label ?? null;
				setPrize(label);
				if (label === null || label === MISS_LABEL) return;
				setRows((previous) => {
					const activeIndex = previous.findIndex((row) => row.tone === "active");
					const targetIndex = activeIndex !== -1 ? activeIndex : previous.findIndex((row) => row.tone === "waiting");
					if (targetIndex === -1) return previous;
					return previous.map((row, index) => index === targetIndex ? advanceRow(row) : row);
				});
			};
			const exhausted = draws <= 0 && !spinning;
			return (0, react_jsx_runtime.jsx)("div", {
				className: LotteryPanel_module_css_default.backdrop,
				role: "dialog",
				"aria-modal": "true",
				"aria-label": "财神鲸抽奖专场",
				onClick: onClose,
				children: (0, react_jsx_runtime.jsxs)("div", {
					className: LotteryPanel_module_css_default.stage,
					"data-won": won,
					onClick: (event) => {
						event.stopPropagation();
					},
					children: [
						won && (0, react_jsx_runtime.jsx)("span", {
							className: LotteryPanel_module_css_default.winGlow,
							"aria-hidden": true
						}),
						(0, react_jsx_runtime.jsx)("span", {
							className: LotteryPanel_module_css_default.whale,
							style: { backgroundImage: `url(${LEAD_ART})` },
							"aria-hidden": true
						}),
						(0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: LotteryPanel_module_css_default.closeX,
							onClick: onClose,
							"aria-label": "关闭",
							children: "×"
						}),
						(0, react_jsx_runtime.jsxs)("div", {
							className: LotteryPanel_module_css_default.left,
							children: [
								(0, react_jsx_runtime.jsx)("span", {
									className: LotteryPanel_module_css_default.brand,
									children: "DeepSeek V4 Pro 正式版 · 财神鲸专场"
								}),
								(0, react_jsx_runtime.jsxs)("h2", {
									className: LotteryPanel_module_css_default.title,
									children: [
										"转到 ",
										(0, react_jsx_runtime.jsx)("em", { children: "V4 Pro 正式版" }),
										"才算你赢"
									]
								}),
								(0, react_jsx_runtime.jsx)("p", {
									className: LotteryPanel_module_css_default.subtitle,
									children: "每轮对话只有 1 次机会，抽中模型组件才能涨进度"
								}),
								(0, react_jsx_runtime.jsxs)("div", {
									className: LotteryPanel_module_css_default.resultBox,
									children: [(0, react_jsx_runtime.jsx)("div", {
										className: LotteryPanel_module_css_default.resultLabel,
										children: "本轮结果"
									}), (0, react_jsx_runtime.jsx)("div", {
										className: LotteryPanel_module_css_default.resultValue,
										children: result
									})]
								}),
								(0, react_jsx_runtime.jsxs)("div", {
									className: LotteryPanel_module_css_default.progress,
									children: [
										(0, react_jsx_runtime.jsxs)("div", {
											className: LotteryPanel_module_css_default.progressHead,
											children: [(0, react_jsx_runtime.jsx)("span", {
												className: LotteryPanel_module_css_default.progressName,
												children: "V4 Pro 正式版解锁进度"
											}), (0, react_jsx_runtime.jsxs)("span", {
												className: LotteryPanel_module_css_default.progressPct,
												children: [percent, "%"]
											})]
										}),
										(0, react_jsx_runtime.jsx)("div", {
											className: LotteryPanel_module_css_default.progressTrack,
											children: (0, react_jsx_runtime.jsx)("div", {
												className: LotteryPanel_module_css_default.progressFill,
												style: { width: `${percent}%` }
											})
										}),
										(0, react_jsx_runtime.jsx)("div", {
											className: LotteryPanel_module_css_default.rows,
											children: rows.length === 0 ? (0, react_jsx_runtime.jsx)("div", {
												className: LotteryPanel_module_css_default.row,
												children: (0, react_jsx_runtime.jsxs)("div", {
													className: LotteryPanel_module_css_default.rowHead,
													children: [(0, react_jsx_runtime.jsx)("span", {
														className: LotteryPanel_module_css_default.rowLabel,
														children: "正式版资格匹配"
													}), (0, react_jsx_runtime.jsx)("span", {
														className: LotteryPanel_module_css_default.rowStatus,
														children: "等待中"
													})]
												})
											}) : rows.map((row) => (0, react_jsx_runtime.jsxs)("div", {
												className: LotteryPanel_module_css_default.row,
												"data-tone": row.tone,
												children: [(0, react_jsx_runtime.jsxs)("div", {
													className: LotteryPanel_module_css_default.rowHead,
													children: [(0, react_jsx_runtime.jsx)("span", {
														className: LotteryPanel_module_css_default.rowLabel,
														title: row.label,
														children: row.label
													}), (0, react_jsx_runtime.jsx)("span", {
														className: LotteryPanel_module_css_default.rowStatus,
														children: row.status
													})]
												}), (0, react_jsx_runtime.jsx)("div", {
													className: LotteryPanel_module_css_default.rowTrack,
													children: (0, react_jsx_runtime.jsx)("div", {
														className: LotteryPanel_module_css_default.rowFill,
														style: { width: `${row.fill}%` }
													})
												})]
											}, row.id))
										})
									]
								}),
								(0, react_jsx_runtime.jsxs)("div", {
									className: LotteryPanel_module_css_default.footer,
									children: [won ? (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: LotteryPanel_module_css_default.winCta,
										onClick: onClose,
										children: "🐳 立即体验 V4 Pro 正式版"
									}) : (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: LotteryPanel_module_css_default.giveup,
										onClick: onClose,
										children: "放弃本轮资格，继续对话"
									}), (0, react_jsx_runtime.jsx)("span", {
										className: LotteryPanel_module_css_default.disclaimer,
										children: "演示内容纯属虚构，按 Esc 退出"
									})]
								})
							]
						}),
						(0, react_jsx_runtime.jsxs)("div", {
							className: LotteryPanel_module_css_default.right,
							children: [
								(0, react_jsx_runtime.jsxs)("div", {
									className: LotteryPanel_module_css_default.wheelWrap,
									children: [(0, react_jsx_runtime.jsx)("span", {
										className: LotteryPanel_module_css_default.pointer,
										"aria-hidden": true
									}), (0, react_jsx_runtime.jsxs)("div", {
										className: LotteryPanel_module_css_default.wheel,
										children: [(0, react_jsx_runtime.jsx)("div", {
											className: LotteryPanel_module_css_default.wheelInner,
											style: {
												background: wheelBackground,
												transform: `rotate(${rotation}deg)`
											},
											onTransitionEnd: onSpinEnd,
											children: segments.map((segment, index) => (0, react_jsx_runtime.jsx)("span", {
												className: LotteryPanel_module_css_default.seg,
												"data-kind": segment.kind,
												style: { transform: `rotate(${(index + .5) * segAngle - 90}deg)` },
												children: (0, react_jsx_runtime.jsx)("span", {
													className: LotteryPanel_module_css_default.segLabel,
													children: segment.label
												})
											}, `${segment.label}-${index}`))
										}), (0, react_jsx_runtime.jsxs)("button", {
											type: "button",
											className: LotteryPanel_module_css_default.hub,
											"data-won": won,
											onClick: spin,
											disabled: spinning || exhausted || won,
											"aria-label": "鲸喜抽奖",
											children: [(0, react_jsx_runtime.jsx)("span", {
												className: LotteryPanel_module_css_default.hubText,
												children: won ? "已" : spinning ? "抽奖" : exhausted ? "次数" : "鲸喜"
											}), (0, react_jsx_runtime.jsx)("span", {
												className: LotteryPanel_module_css_default.hubText,
												children: won ? "解锁" : spinning ? "中…" : exhausted ? "用尽" : "抽奖"
											})]
										})]
									})]
								}),
								(0, react_jsx_runtime.jsxs)("div", {
									className: LotteryPanel_module_css_default.draws,
									children: ["本轮剩余次数：", (0, react_jsx_runtime.jsx)("b", { children: draws })]
								}),
								(0, react_jsx_runtime.jsx)("div", {
									className: LotteryPanel_module_css_default.toast,
									"data-won": won,
									children: won ? "🎉 全部解锁，鲸喜通关！" : prize !== null && !spinning ? prize === MISS_LABEL ? "谢谢参与，未涨进度" : `恭喜抽中「${prize}」，进度 +1！` : ""
								}),
								(0, react_jsx_runtime.jsx)("div", {
									className: LotteryPanel_module_css_default.poolHint,
									children: won ? "V4 Pro 正式版已到账，尽情体验！" : "V4 Pro 正式版仍在深海奖池中"
								})
							]
						})
					]
				})
			});
		}
		//#endregion
		//#region \0dsh-css:/Users/mhz/daily-prj/github-prj/dsh-agent-teams/src/client/ActivityPanel.module.css.mjs
		const css = "html{--agent-teams-panel-width:388px;--agent-teams-panel-right:calc(18px + var(--dsh-sidebar-width,0px));--agent-teams-panel-gap:14px;--agent-teams-panel-shift:calc(var(--agent-teams-panel-width) + 18px + var(--agent-teams-panel-gap))}html[data-agent-teams-panel-open] [data-phase=active]{box-sizing:border-box;padding-right:var(--agent-teams-panel-shift)}[data-phase=active]{will-change:padding-right;transition:padding-right .36s cubic-bezier(.22,1,.36,1)}.ksL0-W_badge{top:64px;right:var(--agent-teams-panel-right);z-index:2147483000;box-sizing:border-box;border:1px solid var(--dsw-alias-line-normal);background:color-mix(in srgb, var(--dsw-alias-bg-module-platform) 92%, transparent);backdrop-filter:blur(16px);height:34px;box-shadow:0 8px 28px color-mix(in srgb, var(--dsw-alias-label-primary) 14%, transparent);color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;border-radius:999px;align-items:center;gap:7px;padding:0 12px;font-size:12px;font-weight:600;line-height:20px;transition:border-color .15s,transform .12s;display:inline-flex;position:fixed}.ksL0-W_badge:hover{border-color:var(--dsw-alias-line-strong);transform:translateY(-1px)}.ksL0-W_badge:active{transform:translateY(0)scale(.98)}.ksL0-W_badge:focus-visible,.ksL0-W_closeButton:focus-visible,.ksL0-W_memberRow:focus-visible,.ksL0-W_taskNode:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.ksL0-W_badgeDot,.ksL0-W_panelDot{background:var(--dsw-alias-label-tertiary);border-radius:50%;width:7px;height:7px}.ksL0-W_badgeDot[data-busy=true],.ksL0-W_panelDot[data-busy=true]{background:var(--dsw-alias-state-business-primary);animation:1.25s ease-in-out infinite ksL0-W_agentTeamsPulse}.ksL0-W_badgeCount,.ksL0-W_memberCount,.ksL0-W_teamStats,.ksL0-W_stageLabel,.ksL0-W_taskId{font-variant-numeric:tabular-nums}.ksL0-W_panel{top:64px;right:var(--agent-teams-panel-right);z-index:2147483000;width:min(var(--agent-teams-panel-width), calc(100vw - 24px));box-sizing:border-box;border:1px solid color-mix(in srgb, var(--dsw-alias-line-strong) 58%, transparent);background:color-mix(in srgb, var(--dsw-alias-bg-module-platform) 95%, transparent);backdrop-filter:blur(20px)saturate(1.08);max-height:70dvh;box-shadow:0 12px 32px color-mix(in srgb, var(--dsw-alias-label-primary) 12%, transparent), 0 32px 72px color-mix(in srgb, var(--dsw-alias-label-primary) 16%, transparent);border-radius:16px;flex-direction:column;animation:.18s ease-out ksL0-W_agentTeamsPanelIn;display:flex;position:fixed;overflow:hidden}@keyframes ksL0-W_agentTeamsPanelIn{0%{opacity:0;transform:translateY(-6px)scale(.99)}to{opacity:1;transform:translateY(0)scale(1)}}@keyframes ksL0-W_agentTeamsPulse{0%,to{opacity:.42}50%{opacity:1}}.ksL0-W_panelHead{border-bottom:1px solid var(--dsw-alias-line-normal);flex:none;justify-content:space-between;align-items:center;min-height:44px;padding:0 14px 0 16px;display:flex}.ksL0-W_panelTitle{color:var(--dsw-alias-label-primary);align-items:center;gap:8px;font-size:14px;font-weight:600;line-height:20px;display:inline-flex}.ksL0-W_closeButton{width:28px;height:28px;color:var(--dsw-alias-label-tertiary);cursor:pointer;background:0 0;border:0;border-radius:7px;justify-content:center;align-items:center;padding:0;transition:background-color .12s,color .12s,transform .12s;display:inline-flex}.ksL0-W_closeButton:hover{background:var(--dsw-alias-bg-fill-neutral);color:var(--dsw-alias-label-primary)}.ksL0-W_closeButton:active{transform:scale(.94)}.ksL0-W_teams{overscroll-behavior:contain;flex-direction:column;min-height:0;display:flex;overflow-y:auto}.ksL0-W_team{border-bottom:1px solid var(--dsw-alias-line-normal);flex-direction:column;gap:12px;padding:12px 14px 16px;display:flex}.ksL0-W_team:last-child{border-bottom:0}.ksL0-W_teamHead{align-items:center;gap:10px;min-width:0;display:flex}.ksL0-W_teamName{min-width:0;color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;flex:1;font-size:13px;font-weight:600;line-height:18px;overflow:hidden}.ksL0-W_teamStats{color:var(--dsw-alias-label-tertiary);white-space:nowrap;flex:none;gap:8px;font-size:10.5px;line-height:16px;display:inline-flex}.ksL0-W_sectionHead{justify-content:space-between;align-items:center;gap:8px;min-width:0;display:flex}.ksL0-W_sectionTitle{color:var(--dsw-alias-label-secondary);align-items:center;gap:6px;font-size:11px;font-weight:600;line-height:16px;display:inline-flex}.ksL0-W_sectionHint{color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;font-size:10px;line-height:14px;overflow:hidden}.ksL0-W_delegationSection{min-width:0}.ksL0-W_captainNode{box-sizing:border-box;border:1px solid color-mix(in srgb, var(--dsw-alias-state-business-primary) 32%, var(--dsw-alias-line-normal));background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 7%, var(--dsw-alias-bg-module));border-radius:10px;grid-template-columns:38px minmax(0,1fr) auto;align-items:center;gap:9px;min-height:48px;padding:8px 10px;display:grid}.ksL0-W_captainAvatar,.ksL0-W_memberAvatar{flex:none;justify-content:center;align-items:center;display:inline-flex;position:relative}.ksL0-W_captainAvatar{width:36px;height:36px}.ksL0-W_leadAvatar,.ksL0-W_memberArt,.ksL0-W_memberInitial{box-sizing:border-box;border:1px solid var(--dsw-alias-line-strong);object-fit:cover;background:#0b1d33;border-radius:50%;width:34px;height:34px}.ksL0-W_captainInfo,.ksL0-W_memberInfo{flex-direction:column;min-width:0;display:flex}.ksL0-W_captainInfo{gap:2px}.ksL0-W_captainLine,.ksL0-W_memberLine{align-items:center;gap:6px;min-width:0;display:flex}.ksL0-W_captainName,.ksL0-W_memberName{color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;font-size:12.5px;font-weight:600;line-height:18px;overflow:hidden}.ksL0-W_captainRole,.ksL0-W_memberRole{color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;font-size:10px;line-height:14px;overflow:hidden}.ksL0-W_captainSummary,.ksL0-W_memberStatusLine{color:var(--dsw-alias-label-secondary);text-overflow:ellipsis;white-space:nowrap;font-size:10.5px;line-height:15px;overflow:hidden}.ksL0-W_captainState,.ksL0-W_memberState{color:var(--dsw-alias-label-tertiary);white-space:nowrap;flex:none;align-items:center;gap:5px;font-size:10px;font-weight:500;line-height:15px;display:inline-flex}.ksL0-W_captainState[data-busy=true],.ksL0-W_memberState[data-activity=working]{color:var(--dsw-alias-state-business-primary)}.ksL0-W_delegationTree{flex-direction:column;gap:2px;margin-left:18px;padding:9px 0 0 20px;display:flex;position:relative}.ksL0-W_delegationTree:before{background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 48%, var(--dsw-alias-line-normal));content:\"\";width:1px;position:absolute;top:0;bottom:22px;left:0}.ksL0-W_memberBlock{flex-direction:column;min-width:0;padding:3px 0 7px;display:flex;position:relative}.ksL0-W_memberBranch{background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 48%, var(--dsw-alias-line-normal));width:20px;height:1px;display:block;position:absolute;top:23px;right:100%}.ksL0-W_memberBranch:before{background:var(--dsw-alias-state-business-primary);content:\"\";border-radius:50%;width:5px;height:5px;position:absolute;top:-2px;right:-1px}.ksL0-W_memberRow{box-sizing:border-box;width:100%;min-width:0;min-height:44px;color:inherit;font:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:8px;grid-template-columns:38px minmax(0,1fr) auto;align-items:center;gap:8px;padding:4px 6px;transition:background-color .12s,transform .12s;display:grid}.ksL0-W_memberRow:hover,.ksL0-W_memberRow[data-activity=working]{background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 6%, var(--dsw-alias-bg-module))}.ksL0-W_memberRow:active{transform:scale(.995)}.ksL0-W_memberAvatar{width:34px;height:34px}.ksL0-W_memberAvatar[data-unread=true]:after{border:1px solid var(--dsw-alias-state-business-primary);content:\"\";border-radius:50%;animation:1.5s ease-out infinite ksL0-W_agentTeamsRing;position:absolute;inset:-3px}@keyframes ksL0-W_agentTeamsRing{0%{opacity:.82;transform:scale(.94)}75%,to{opacity:0;transform:scale(1.18)}}.ksL0-W_memberInitial{color:var(--dsw-alias-label-on-fill);justify-content:center;align-items:center;font-size:14px;font-weight:600;line-height:20px;display:inline-flex}.ksL0-W_stateArt{box-sizing:border-box;border:2px solid var(--dsw-alias-bg-module-platform);object-fit:cover;background:#0b1d33;border-radius:50%;width:19px;height:19px;position:absolute;bottom:-4px;right:-4px}.ksL0-W_stateArt[data-activity=working]{animation:2.4s ease-in-out infinite ksL0-W_agentTeamsFloat}.ksL0-W_stateArt[data-activity=idle]{animation:4.2s ease-in-out infinite ksL0-W_agentTeamsBreathe}.ksL0-W_stateArt[data-activity=unknown]{animation:2.8s ease-in-out infinite ksL0-W_agentTeamsThink}@keyframes ksL0-W_agentTeamsFloat{0%,to{transform:translateY(0)rotate(-4deg)}50%{transform:translateY(-2px)rotate(4deg)}}@keyframes ksL0-W_agentTeamsBreathe{0%,to{opacity:.82;transform:scale(1)}50%{opacity:1;transform:scale(1.06)}}@keyframes ksL0-W_agentTeamsThink{0%,to{transform:rotate(-7deg)}50%{transform:rotate(7deg)}}.ksL0-W_memberState{margin-left:auto}.ksL0-W_memberCount{color:var(--dsw-alias-label-tertiary);font-size:10.5px;line-height:16px}.ksL0-W_assignmentLine{align-items:center;gap:7px;min-width:0;padding:0 6px 0 52px;display:flex}.ksL0-W_assignmentLabel{color:var(--dsw-alias-label-tertiary);flex:none;font-size:9.5px;line-height:14px}.ksL0-W_assignmentTasks{flex-wrap:wrap;flex:1;gap:4px;min-width:0;display:flex}.ksL0-W_assignmentChip{background:var(--dsw-alias-bg-fill-neutral);min-height:16px;color:var(--dsw-alias-label-secondary);border-radius:4px;align-items:center;padding:0 5px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:9px;font-weight:600;line-height:14px;display:inline-flex}.ksL0-W_assignmentChip[data-state=running]{background:var(--dsw-alias-bg-fill-business);color:var(--dsw-alias-label-on-fill)}.ksL0-W_assignmentChip[data-state=completed]{background:var(--dsw-alias-bg-fill-success);color:var(--dsw-alias-label-on-fill)}.ksL0-W_assignmentChip[data-state=blocked]{background:var(--dsw-alias-bg-fill-warning);color:var(--dsw-alias-label-on-fill)}.ksL0-W_assignmentChip[data-state=failed]{background:var(--dsw-alias-bg-fill-danger);color:var(--dsw-alias-label-on-fill)}.ksL0-W_assignmentChip[data-state=cancelled]{color:var(--dsw-alias-label-tertiary);text-decoration:line-through}.ksL0-W_unreadPill{color:var(--dsw-alias-state-business-primary);white-space:nowrap;flex:none;font-size:9.5px;font-weight:600;line-height:14px}.ksL0-W_taskEmpty{color:var(--dsw-alias-label-tertiary);font-size:9.5px;line-height:14px}.ksL0-W_dependencySection{border-top:1px solid var(--dsw-alias-line-normal);flex-direction:column;gap:7px;min-width:0;padding-top:10px;display:flex}.ksL0-W_stageFlow{scrollbar-width:thin;align-items:stretch;gap:0;min-width:0;padding:1px 1px 5px;display:flex;overflow-x:auto}.ksL0-W_stageGroup{flex:1 0 126px;min-width:126px;display:flex;position:relative}.ksL0-W_stageConnector{width:22px;height:14px;color:var(--dsw-alias-label-tertiary);flex:none;align-items:center;margin-top:0;display:flex}.ksL0-W_stageLine{background:var(--dsw-alias-line-strong);flex:1;height:1px;display:block}.ksL0-W_stageColumn{flex-direction:column;flex:1;gap:5px;min-width:0;display:flex}.ksL0-W_stageLabel{color:var(--dsw-alias-label-tertiary);justify-content:space-between;align-items:center;gap:6px;padding:0 2px;font-size:9.5px;font-weight:600;line-height:14px;display:flex}.ksL0-W_stageLabel span{background:var(--dsw-alias-bg-fill-neutral);border-radius:4px;justify-content:center;align-items:center;min-width:14px;height:14px;font-size:8.5px;display:inline-flex}.ksL0-W_stageTasks{flex-direction:column;gap:5px;display:flex}.ksL0-W_taskNode{box-sizing:border-box;border:1px solid var(--dsw-alias-line-normal);background:var(--dsw-alias-bg-module);min-width:0;min-height:72px;color:var(--dsw-alias-label-primary);font:inherit;text-align:left;cursor:pointer;border-radius:8px;flex-direction:column;gap:4px;padding:7px 8px;transition:border-color .14s,opacity .14s,transform .12s,background-color .14s;display:flex}.ksL0-W_taskNode:hover,.ksL0-W_taskNode[data-focused=true]{border-color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 6%, var(--dsw-alias-bg-module));transform:translateY(-1px)}.ksL0-W_taskNode[data-dimmed=true]{opacity:.34}.ksL0-W_taskNode[data-state=completed]{border-color:color-mix(in srgb, var(--dsw-alias-state-success) 48%, var(--dsw-alias-line-normal))}.ksL0-W_taskNode[data-state=blocked]{border-color:color-mix(in srgb, var(--dsw-alias-state-warning) 52%, var(--dsw-alias-line-normal))}.ksL0-W_taskNode[data-state=failed]{border-color:color-mix(in srgb, var(--dsw-alias-state-danger) 56%, var(--dsw-alias-line-normal))}.ksL0-W_taskNodeHead,.ksL0-W_taskRoute{justify-content:space-between;align-items:center;gap:5px;min-width:0;display:flex}.ksL0-W_taskId{color:var(--dsw-alias-label-tertiary);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:9.5px;font-weight:700}.ksL0-W_taskBadge{background:var(--dsw-alias-bg-fill-neutral);min-height:14px;color:var(--dsw-alias-label-secondary);border-radius:4px;flex:none;align-items:center;padding:0 4px;font-size:8.5px;font-weight:600;line-height:13px;display:inline-flex}.ksL0-W_taskBadge[data-state=running]{background:var(--dsw-alias-bg-fill-business);color:var(--dsw-alias-label-on-fill)}.ksL0-W_taskBadge[data-state=completed]{background:var(--dsw-alias-bg-fill-success);color:var(--dsw-alias-label-on-fill)}.ksL0-W_taskBadge[data-state=blocked]{background:var(--dsw-alias-bg-fill-warning);color:var(--dsw-alias-label-on-fill)}.ksL0-W_taskBadge[data-state=failed]{background:var(--dsw-alias-bg-fill-danger);color:var(--dsw-alias-label-on-fill)}.ksL0-W_taskBadge[data-state=cancelled]{color:var(--dsw-alias-label-tertiary);text-decoration:line-through}.ksL0-W_taskSubject{min-height:30px;color:var(--dsw-alias-label-primary);-webkit-line-clamp:2;-webkit-box-orient:vertical;font-size:10.5px;font-weight:500;line-height:15px;display:-webkit-box;overflow:hidden}.ksL0-W_taskRoute{color:var(--dsw-alias-label-tertiary);margin-top:auto;font-size:8.5px;line-height:13px}.ksL0-W_taskOwner,.ksL0-W_taskDeps{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.ksL0-W_taskOwner{max-width:48%;color:var(--dsw-alias-label-secondary);font-weight:600}.ksL0-W_taskDeps{text-align:right;flex:1}.ksL0-W_taskStart{color:var(--dsw-alias-label-tertiary)}.ksL0-W_unclaimed,.ksL0-W_inbox{border-top:1px solid var(--dsw-alias-line-normal);flex-direction:column;gap:5px;min-width:0;padding-top:10px;display:flex}.ksL0-W_unclaimedTitle{color:var(--dsw-alias-label-secondary);font-size:10.5px;font-weight:600;line-height:15px}.ksL0-W_inboxRow{border-radius:6px;grid-template-columns:112px minmax(0,1fr);align-items:center;gap:8px;min-width:0;min-height:24px;padding:2px 5px;display:grid}.ksL0-W_inboxRow:hover{background:var(--dsw-alias-bg-module)}.ksL0-W_inboxRoute{min-width:0;color:var(--dsw-alias-state-business-primary);text-overflow:ellipsis;white-space:nowrap;align-items:center;gap:3px;font-size:9.5px;font-weight:600;line-height:14px;display:inline-flex;overflow:hidden}.ksL0-W_inboxContent{min-width:0;color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;font-size:10px;line-height:14px;overflow:hidden}.ksL0-W_emptyHint{color:var(--dsw-alias-label-tertiary);padding:10px 12px;font-size:11px;line-height:16px}.ksL0-W_team[data-historic],.ksL0-W_archivedWrap{opacity:.82}.ksL0-W_historicPill{background:var(--dsw-alias-bg-fill-neutral);color:var(--dsw-alias-label-tertiary);border-radius:4px;flex:none;margin-left:auto;padding:1px 7px;font-size:9.5px;font-weight:600;line-height:15px}.ksL0-W_members{flex-direction:column;gap:3px;display:flex}.ksL0-W_archivedWrap:before{color:var(--dsw-alias-label-tertiary);content:\"已结束 · 历史归档\";padding:5px 14px 0;font-size:9.5px;font-weight:600;line-height:14px;display:block}@media (prefers-reduced-motion:reduce){[data-phase=active],.ksL0-W_panel,.ksL0-W_badge,.ksL0-W_badgeDot,.ksL0-W_panelDot,.ksL0-W_stateArt,.ksL0-W_memberAvatar[data-unread=true]:after{transition:none;animation:none}}@media (width<=960px){html{--agent-teams-main-shift:0px}html[data-agent-teams-panel-open] [data-phase=active]{padding-right:0}}@media (width<=640px){html{--agent-teams-panel-right:calc(10px + var(--dsh-sidebar-width,0px))}.ksL0-W_panel{width:auto;max-height:calc(100dvh - 68px);top:56px;left:10px}.ksL0-W_badge{top:56px}.ksL0-W_teamStats span[data-stat=messages]{display:none}.ksL0-W_captainNode{grid-template-columns:38px minmax(0,1fr)}.ksL0-W_captainState{display:none}.ksL0-W_delegationTree{margin-left:12px;padding-left:15px}.ksL0-W_memberBranch{width:15px}.ksL0-W_assignmentLine{padding-left:45px}}";
		const tagId = "dsh-agent-teams/ActivityPanel.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-agent-teams";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var ActivityPanel_module_css_default = {
			"memberCount": "ksL0-W_memberCount",
			"dependencySection": "ksL0-W_dependencySection",
			"memberBlock": "ksL0-W_memberBlock",
			"memberInitial": "ksL0-W_memberInitial",
			"memberInfo": "ksL0-W_memberInfo",
			"stageLine": "ksL0-W_stageLine",
			"delegationTree": "ksL0-W_delegationTree",
			"agentTeamsRing": "ksL0-W_agentTeamsRing",
			"inbox": "ksL0-W_inbox",
			"badgeCount": "ksL0-W_badgeCount",
			"badge": "ksL0-W_badge",
			"captainState": "ksL0-W_captainState",
			"memberState": "ksL0-W_memberState",
			"memberArt": "ksL0-W_memberArt",
			"stageLabel": "ksL0-W_stageLabel",
			"unreadPill": "ksL0-W_unreadPill",
			"stageConnector": "ksL0-W_stageConnector",
			"unclaimedTitle": "ksL0-W_unclaimedTitle",
			"inboxRow": "ksL0-W_inboxRow",
			"emptyHint": "ksL0-W_emptyHint",
			"archivedWrap": "ksL0-W_archivedWrap",
			"captainName": "ksL0-W_captainName",
			"badgeDot": "ksL0-W_badgeDot",
			"assignmentTasks": "ksL0-W_assignmentTasks",
			"taskOwner": "ksL0-W_taskOwner",
			"agentTeamsPanelIn": "ksL0-W_agentTeamsPanelIn",
			"inboxContent": "ksL0-W_inboxContent",
			"captainNode": "ksL0-W_captainNode",
			"agentTeamsPulse": "ksL0-W_agentTeamsPulse",
			"captainSummary": "ksL0-W_captainSummary",
			"taskDeps": "ksL0-W_taskDeps",
			"teamName": "ksL0-W_teamName",
			"agentTeamsFloat": "ksL0-W_agentTeamsFloat",
			"taskStart": "ksL0-W_taskStart",
			"leadAvatar": "ksL0-W_leadAvatar",
			"stageColumn": "ksL0-W_stageColumn",
			"taskSubject": "ksL0-W_taskSubject",
			"memberRow": "ksL0-W_memberRow",
			"sectionTitle": "ksL0-W_sectionTitle",
			"assignmentLine": "ksL0-W_assignmentLine",
			"assignmentChip": "ksL0-W_assignmentChip",
			"panelDot": "ksL0-W_panelDot",
			"panel": "ksL0-W_panel",
			"panelHead": "ksL0-W_panelHead",
			"memberStatusLine": "ksL0-W_memberStatusLine",
			"panelTitle": "ksL0-W_panelTitle",
			"members": "ksL0-W_members",
			"agentTeamsBreathe": "ksL0-W_agentTeamsBreathe",
			"assignmentLabel": "ksL0-W_assignmentLabel",
			"team": "ksL0-W_team",
			"unclaimed": "ksL0-W_unclaimed",
			"closeButton": "ksL0-W_closeButton",
			"taskRoute": "ksL0-W_taskRoute",
			"taskNode": "ksL0-W_taskNode",
			"stageFlow": "ksL0-W_stageFlow",
			"historicPill": "ksL0-W_historicPill",
			"teamHead": "ksL0-W_teamHead",
			"captainRole": "ksL0-W_captainRole",
			"sectionHint": "ksL0-W_sectionHint",
			"captainInfo": "ksL0-W_captainInfo",
			"taskEmpty": "ksL0-W_taskEmpty",
			"stageGroup": "ksL0-W_stageGroup",
			"taskNodeHead": "ksL0-W_taskNodeHead",
			"inboxRoute": "ksL0-W_inboxRoute",
			"sectionHead": "ksL0-W_sectionHead",
			"taskBadge": "ksL0-W_taskBadge",
			"captainAvatar": "ksL0-W_captainAvatar",
			"teams": "ksL0-W_teams",
			"memberBranch": "ksL0-W_memberBranch",
			"memberLine": "ksL0-W_memberLine",
			"captainLine": "ksL0-W_captainLine",
			"teamStats": "ksL0-W_teamStats",
			"stageTasks": "ksL0-W_stageTasks",
			"delegationSection": "ksL0-W_delegationSection",
			"stateArt": "ksL0-W_stateArt",
			"taskId": "ksL0-W_taskId",
			"memberName": "ksL0-W_memberName",
			"memberAvatar": "ksL0-W_memberAvatar",
			"memberRole": "ksL0-W_memberRole",
			"agentTeamsThink": "ksL0-W_agentTeamsThink"
		};
		//#endregion
		//#region lib/client/ActivityPanel.js
		/**
		* AgentTeams activity panel: the top-right floater monitoring every team.
		*
		* Modeled on the Claude Code desktop SessionActivityPanel: a fixed glass
		* panel at the top-right corner. On wide viewports it cooperatively makes the
		* conversation column yield space; narrow viewports keep overlay mode. It
		* polls the host `/plugins/dsh-agent-teams/state` route for
		* server-side snapshots (durable files + live subagent activity), with a
		* collapsed badge that auto-expands once when activity appears. Archived
		* teams stay available for the owning conversation after live work ends.
		*
		* The floater mounts through a body portal (no top-right slot exists in the
		* web shell); it is not a conversation node — the in-conversation panel was
		* removed in favor of this always-available monitor.
		* @module dsh-agent-teams/client/activity
		*/
		/** Poll cadence for the host snapshot route. */
		const POLL_MS = 1e3;
		/** Grace before the panel collapses once no team remains. */
		const AUTOCLOSE_GRACE_MS = 2e3;
		/**
		* Page-settle window after mount: activity restored on page load only shows
		* the collapsed badge, so the panel never yanks the conversation column
		* right after load. New activity after this window auto-expands as usual.
		*/
		const AUTO_OPEN_SETTLE_MS = 4e3;
		/** Host route serving team snapshots. */
		const STATE_URL = "/plugins/dsh-agent-teams/state";
		/** Root marker shared with the panel CSS while the portal is expanded. */
		const PANEL_OPEN_ATTRIBUTE = "data-agent-teams-panel-open";
		/** Collapsed badge: an always-visible corner pill while any team exists. */
		function CollapsedBadge({ count, busy, onClick }) {
			return (0, react_jsx_runtime.jsxs)("button", {
				type: "button",
				className: ActivityPanel_module_css_default.badge,
				"data-busy": busy,
				onClick,
				"aria-label": `AgentTeams 活动，${count} 个团队`,
				children: [(0, react_jsx_runtime.jsx)("span", {
					className: ActivityPanel_module_css_default.badgeDot,
					"data-busy": busy,
					"aria-hidden": true
				}), (0, react_jsx_runtime.jsx)("span", {
					className: ActivityPanel_module_css_default.badgeCount,
					children: count
				})]
			});
		}
		/** The top-right activity floater. Teams follow the current session: live
		* snapshots and historic card summaries are only shown while their captain
		* session is the one currently open. */
		function ActivityPanel({ sessionsList, openSession }) {
			const [teams, setTeams] = (0, react.useState)([]);
			const [archivedTeams, setArchivedTeams] = (0, react.useState)([]);
			const [open, setOpen] = (0, react.useState)(false);
			const [openOwner, setOpenOwner] = (0, react.useState)();
			const [autoOpened, setAutoOpened] = (0, react.useState)(false);
			const [wasActive, setWasActive] = (0, react.useState)(false);
			const [historic, setHistoric] = (0, react.useState)(/* @__PURE__ */ new Map());
			const current = (0, react.useSyncExternalStore)(sessionsList.subscribe, sessionsList.getSnapshot).current;
			const currentRef = (0, react.useRef)(current);
			(0, react.useEffect)(() => {
				currentRef.current = current;
			}, [current]);
			const mountedAtRef = (0, react.useRef)(performance.now());
			const expanded = activityPanelExpandedForSession(open, openOwner, current);
			(0, react.useLayoutEffect)(() => {
				if (openOwner === void 0 || openOwner === current) return;
				setOpen(false);
				setOpenOwner(void 0);
				setWasActive(false);
				setAutoOpened(false);
			}, [current, openOwner]);
			(0, react.useLayoutEffect)(() => {
				const root = document.documentElement;
				if (expanded) root.setAttribute(PANEL_OPEN_ATTRIBUTE, "");
				else root.removeAttribute(PANEL_OPEN_ATTRIBUTE);
				return () => {
					root.removeAttribute(PANEL_OPEN_ATTRIBUTE);
				};
			}, [expanded]);
			(0, react.useEffect)(() => {
				let cancelled = false;
				let inFlight = false;
				const tick = async () => {
					if (inFlight || cancelled) return;
					inFlight = true;
					try {
						const [liveResponse, archivedResponse] = await Promise.all([fetch(STATE_URL, { cache: "no-store" }), fetch(`${STATE_URL}?archived=1`, { cache: "no-store" })]);
						if (liveResponse.ok) {
							const body = await liveResponse.json();
							if (!cancelled && Array.isArray(body.teams)) setTeams(body.teams);
						}
						if (archivedResponse.ok) {
							const body = await archivedResponse.json();
							if (!cancelled && Array.isArray(body.teams)) setArchivedTeams(body.teams);
						}
					} catch {} finally {
						inFlight = false;
					}
				};
				tick();
				const timer = setInterval(() => {
					tick();
				}, POLL_MS);
				return () => {
					cancelled = true;
					clearInterval(timer);
				};
			}, []);
			(0, react.useEffect)(() => {
				const onOpenPanel = (event) => {
					const activeSession = currentRef.current;
					if (activeSession === void 0) return;
					setOpenOwner(activeSession);
					setOpen(true);
					const detail = event.detail;
					if (detail?.teamId !== void 0) {
						const owner = detail.captainSessionId !== "" ? detail.captainSessionId : currentRef.current ?? "";
						const teamKey = `${owner}:${detail.teamId}`;
						setHistoric((previous) => {
							const next = new Map(previous);
							next.set(teamKey, {
								data: detail,
								owner
							});
							return next;
						});
					}
				};
				window.addEventListener(OPEN_PANEL_EVENT, onOpenPanel);
				return () => {
					window.removeEventListener(OPEN_PANEL_EVENT, onOpenPanel);
				};
			}, []);
			const visibleTeams = (0, react.useMemo)(() => current === void 0 ? [] : teams.filter((team) => team.captainSessionId === current), [teams, current]);
			const visibleHistoric = (0, react.useMemo)(() => current === void 0 ? [] : [...historic.values()].filter(({ data, owner }) => owner === current && !teams.some((live) => live.captainSessionId === current && live.teamId === data.teamId) && !archivedTeams.some((archived) => archived.captainSessionId === current && archived.teamId === data.teamId)), [
				historic,
				current,
				teams,
				archivedTeams
			]);
			const visibleArchived = (0, react.useMemo)(() => current === void 0 ? [] : archivedTeams.filter((team) => team.captainSessionId === current && !teams.some((live) => live.captainSessionId === current && live.teamId === team.teamId)), [
				archivedTeams,
				current,
				teams
			]);
			const visibleCount = visibleTeams.length + visibleArchived.length + visibleHistoric.length;
			(0, react.useEffect)(() => {
				if (visibleCount > 0) {
					setWasActive(true);
					const settled = performance.now() - mountedAtRef.current >= AUTO_OPEN_SETTLE_MS;
					if (!autoOpened && settled) {
						setOpenOwner(current);
						setOpen(true);
						setAutoOpened(true);
					}
					return;
				}
				if (!wasActive) return;
				const timer = setTimeout(() => {
					setOpen(false);
					setOpenOwner(void 0);
					setWasActive(false);
					setAutoOpened(false);
				}, AUTOCLOSE_GRACE_MS);
				return () => {
					clearTimeout(timer);
				};
			}, [
				visibleCount,
				autoOpened,
				wasActive
			]);
			const busy = (0, react.useMemo)(() => visibleTeams.some((team) => team.members.some((member) => member.activity === "working")), [visibleTeams]);
			const hasTeams = visibleCount > 0;
			const primaryTeam = visibleTeams[0] ?? visibleArchived[0] ?? null;
			if (!hasTeams && !expanded) return null;
			return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [!expanded && (0, react_jsx_runtime.jsx)(CollapsedBadge, {
				count: visibleCount,
				busy,
				onClick: () => {
					if (current === void 0) return;
					setOpenOwner(current);
					setOpen(true);
				}
			}), expanded && primaryTeam !== null && (0, react_jsx_runtime.jsx)(LotteryPanel, {
				team: primaryTeam,
				onClose: () => {
					setOpen(false);
					setOpenOwner(void 0);
				}
			})] });
		}
		//#endregion
		//#region lib/client/agent-teams-card-definition.js
		/**
		* AgentTeams conversation card: a lightweight in-conversation summary shown
		* when a team is created — the captain's name, the member roster with whale
		* avatars, and an entry point that re-activates the top-right activity
		* panel (useful after the floater was closed, or when re-opening an old
		* session for review).
		*
		* The fold anchors to the Harness's durable `tool/call` + `tool/result`
		* records for `agent_teams_create`. Those are first-party session events, so
		* the card survives restarts without writing an out-of-repo event type.
		* @module dsh-agent-teams/client/card
		*/
		/** Parse the only create-call fields the historic card owns. */
		function parseAgentTeamsCreateArgs(value) {
			try {
				const parsed = JSON.parse(value);
				if (typeof parsed !== "object" || parsed === null || !("name" in parsed) || typeof parsed.name !== "string") return;
				const name = parsed.name.trim();
				if (name === "") return void 0;
				const cleaned = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
				return {
					teamId: cleaned === "" ? "team" : cleaned,
					name
				};
			} catch {
				return;
			}
		}
		/** Durable first-party tool events folded into one keyed Chat node. */
		const agentTeamsCardDefinition = {
			kind: "agent-teams",
			target: "chat",
			match: (event) => {
				if (event.type === "tool/call" && event.data.name === "agent_teams_create") return parseAgentTeamsCreateArgs(event.data.arguments) === void 0 ? null : {
					id: String(event.data.callId),
					role: "start"
				};
				if (event.type === "tool/result" && event.data.message.source.kind === "tool") return {
					id: String(event.data.message.source.callId),
					role: "update"
				};
				return null;
			},
			start: (_context, match) => {
				if (match.event.type !== "tool/call") throw new Error("agent-teams card start requires agent_teams_create tool/call");
				const parsed = parseAgentTeamsCreateArgs(match.event.data.arguments);
				if (parsed === void 0) throw new Error("agent-teams card start requires valid create arguments");
				return {
					...parsed,
					accepted: false
				};
			},
			update: (context, match) => {
				if (match.event.type !== "tool/result") return context.state;
				if (match.event.data.error !== void 0 || match.event.data.message.content.some((block) => block.type === "tool-result" && block.isError === true)) return context.state;
				return {
					...context.state,
					accepted: true
				};
			},
			buildViewNode: (context) => {
				if (context.start === void 0) return null;
				const state = context.state;
				if (!state.accepted) return null;
				return {
					key: context.key,
					kind: "agent-teams",
					id: context.id,
					target: "chat",
					anchorSeq: context.start.event.seq,
					location: context.start.location,
					visibility: "visible",
					data: {
						teamId: state.teamId,
						captainSessionId: "",
						teamName: state.name,
						members: []
					}
				};
			}
		};
		//#endregion
		//#region lib/client/index.js
		/** Required services: conversation nodes, slots, and sessions navigation. */
		const inject = [
			"conversationEvents",
			"slots",
			"sessions"
		];
		/**
		* Mount the floater through a body portal (the web shell has no top-right
		* slot) and register the in-conversation team card, whose "activity panel"
		* button re-activates the floater via a window event — the recovery path
		* for a closed floater or a re-opened session.
		*/
		function apply(ctx) {
			const host = document.createElement("div");
			host.dataset.agentTeamsHost = "";
			document.body.appendChild(host);
			const root = (0, react_dom_client.createRoot)(host);
			root.render((0, react_jsx_runtime.jsx)(ActivityPanel, {
				sessionsList: ctx.sessions.list,
				openSession: (id) => {
					ctx.sessions.open(id);
				}
			}));
			ctx.effect(() => () => {
				root.unmount();
				host.remove();
			}, "agent-teams: activity panel");
			ctx.conversationEvents.register(agentTeamsCardDefinition);
			ctx.slots.inject("conversation.chat.node", () => ctx.slots.register({
				name: "conversation.chat.node",
				key: "agent-teams",
				inject: () => ({
					openSession: (id) => {
						ctx.sessions.open(id);
					},
					currentSessionId: () => ctx.sessions.list.getSnapshot().current
				})
			}, AgentTeamsCard));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map