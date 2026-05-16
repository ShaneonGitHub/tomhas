import { useState, useEffect, useCallback, useRef } from "react";

const BLANK = "\u2B1B";
const SZ = 56;
const GAP = 5;
const STEP = SZ + GAP;

const PUZZLES = [
  {"h":[{"word":"dílis","tr":"loyal"},{"word":"réana","tr":"stripe"},{"word":"séana","tr":"denial"}],"v":[{"word":"doras","tr":"door"},{"word":"léana","tr":"meadow"},{"word":"séala","tr":"seal"}]},
  {"h":[{"word":"dílis","tr":"loyal"},{"word":"réana","tr":"stripe"},{"word":"séana","tr":"denial"}],"v":[{"word":"doras","tr":"door"},{"word":"leaba","tr":"bed"},{"word":"séala","tr":"seal"}]},
  {"h":[{"word":"dílis","tr":"loyal"},{"word":"réana","tr":"stripe"},{"word":"séala","tr":"seal"}],"v":[{"word":"doras","tr":"door"},{"word":"léana","tr":"meadow"},{"word":"scata","tr":"group"}]},
  {"h":[{"word":"dílis","tr":"loyal"},{"word":"réana","tr":"stripe"},{"word":"séana","tr":"denial"}],"v":[{"word":"doras","tr":"door"},{"word":"léana","tr":"meadow"},{"word":"scata","tr":"group"}]},
  {"h":[{"word":"casúr","tr":"hammer"},{"word":"séana","tr":"denial"},{"word":"amach","tr":"out"}],"v":[{"word":"cósta","tr":"coast"},{"word":"séala","tr":"seal"},{"word":"ruach","tr":"spirit"}]},
  {"h":[{"word":"casúr","tr":"hammer"},{"word":"séana","tr":"denial"},{"word":"amach","tr":"out"}],"v":[{"word":"cósta","tr":"coast"},{"word":"séala","tr":"seal"},{"word":"reach","tr":"sell"}]},
  {"h":[{"word":"casúr","tr":"hammer"},{"word":"séana","tr":"denial"},{"word":"amach","tr":"out"}],"v":[{"word":"cósta","tr":"coast"},{"word":"séala","tr":"seal"},{"word":"riach","tr":"grey"}]},
  {"h":[{"word":"dílis","tr":"loyal"},{"word":"réana","tr":"stripe"},{"word":"séan","tr":"charm"}],"v":[{"word":"doras","tr":"door"},{"word":"léana","tr":"meadow"},{"word":"sean","tr":"old"}]},
  {"h":[{"word":"dílis","tr":"loyal"},{"word":"réana","tr":"stripe"},{"word":"séan","tr":"charm"}],"v":[{"word":"doras","tr":"door"},{"word":"léana","tr":"meadow"},{"word":"slat","tr":"rod"}]},
  {"h":[{"word":"dílis","tr":"loyal"},{"word":"réana","tr":"stripe"},{"word":"séan","tr":"charm"}],"v":[{"word":"doras","tr":"door"},{"word":"léana","tr":"meadow"},{"word":"sian","tr":"howl"}]},
  {"h":[{"word":"dílis","tr":"loyal"},{"word":"réana","tr":"stripe"},{"word":"séan","tr":"charm"}],"v":[{"word":"doras","tr":"door"},{"word":"léana","tr":"meadow"},{"word":"suan","tr":"sleep"}]},
  {"h":[{"word":"dílis","tr":"loyal"},{"word":"réana","tr":"stripe"},{"word":"séan","tr":"charm"}],"v":[{"word":"doras","tr":"door"},{"word":"léana","tr":"meadow"},{"word":"seas","tr":"stand"}]},
  {"h":[{"word":"dílis","tr":"loyal"},{"word":"réana","tr":"stripe"},{"word":"suar","tr":"mean"}],"v":[{"word":"doras","tr":"door"},{"word":"léana","tr":"meadow"},{"word":"séan","tr":"charm"}]},
  {"h":[{"word":"dílis","tr":"loyal"},{"word":"réana","tr":"stripe"},{"word":"scal","tr":"scatter"}],"v":[{"word":"doras","tr":"door"},{"word":"léana","tr":"meadow"},{"word":"séan","tr":"charm"}]},
  {"h":[{"word":"cosán","tr":"path"},{"word":"spéis","tr":"interest"},{"word":"airc","tr":"chest"}],"v":[{"word":"cósta","tr":"coast"},{"word":"spéir","tr":"sky"},{"word":"nasc","tr":"link"}]},
  {"h":[{"word":"casúr","tr":"hammer"},{"word":"spéis","tr":"interest"},{"word":"airc","tr":"chest"}],"v":[{"word":"cósta","tr":"coast"},{"word":"spéir","tr":"sky"},{"word":"rasc","tr":"rascal"}]},
  {"h":[{"word":"turas","tr":"journey"},{"word":"béasa","tr":"manners"},{"word":"ráth","tr":"fort"}],"v":[{"word":"tobar","tr":"well"},{"word":"réalt","tr":"star"},{"word":"séan","tr":"charm"}]},
  {"h":[{"word":"turas","tr":"journey"},{"word":"béala","tr":"mouths"},{"word":"ráth","tr":"fort"}],"v":[{"word":"tobar","tr":"well"},{"word":"réalt","tr":"star"},{"word":"séan","tr":"charm"}]},
  {"h":[{"word":"turas","tr":"journey"},{"word":"béasa","tr":"manners"},{"word":"réal","tr":"coin"}],"v":[{"word":"tobar","tr":"well"},{"word":"réana","tr":"stripe"},{"word":"séan","tr":"charm"}]},
  {"h":[{"word":"turas","tr":"journey"},{"word":"béala","tr":"mouths"},{"word":"réal","tr":"coin"}],"v":[{"word":"tobar","tr":"well"},{"word":"réana","tr":"stripe"},{"word":"séan","tr":"charm"}]},
  {"h":[{"word":"sásta","tr":"happy"},{"word":"léana","tr":"meadow"},{"word":"seach","tr":"past"}],"v":[{"word":"solas","tr":"light"},{"word":"séala","tr":"seal"},{"word":"amach","tr":"out"}]},
  {"h":[{"word":"basal","tr":"basil"},{"word":"léana","tr":"meadow"},{"word":"amach","tr":"out"}],"v":[{"word":"balla","tr":"wall"},{"word":"séala","tr":"seal"},{"word":"léamh","tr":"reading"}]},
  {"h":[{"word":"súgán","tr":"rope"},{"word":"léana","tr":"meadow"},{"word":"séan","tr":"charm"}],"v":[{"word":"solas","tr":"light"},{"word":"geata","tr":"gate"},{"word":"nead","tr":"nest"}]},
  {"h":[{"word":"dílis","tr":"loyal"},{"word":"réana","tr":"stripe"},{"word":"sonn","tr":"stake"}],"v":[{"word":"doras","tr":"door"},{"word":"leann","tr":"ale"},{"word":"séan","tr":"charm"}]},
  {"h":[{"word":"sásta","tr":"happy"},{"word":"obair","tr":"work"},{"word":"léan","tr":"sorrow"}],"v":[{"word":"scoil","tr":"school"},{"word":"séala","tr":"seal"},{"word":"airc","tr":"chest"}]},
  {"h":[{"word":"scoil","tr":"school"},{"word":"lacha","tr":"duck"},{"word":"sleán","tr":"spade"}],"v":[{"word":"solas","tr":"light"},{"word":"oíche","tr":"night"},{"word":"leann","tr":"ale"}]},
  {"h":[{"word":"súgán","tr":"rope"},{"word":"léana","tr":"meadow"},{"word":"seart","tr":"sort"}],"v":[{"word":"solas","tr":"light"},{"word":"geata","tr":"gate"},{"word":"neart","tr":"strength"}]},
  {"h":[{"word":"socal","tr":"socket"},{"word":"léana","tr":"meadow"},{"word":"sásta","tr":"happy"}],"v":[{"word":"solas","tr":"light"},{"word":"craos","tr":"gullet"},{"word":"leaba","tr":"bed"}]},
  {"h":[{"word":"dreas","tr":"bout"},{"word":"rogha","tr":"choice"},{"word":"séana","tr":"denial"}],"v":[{"word":"doras","tr":"door"},{"word":"eagla","tr":"fear"},{"word":"séala","tr":"seal"}]},
  {"h":[{"word":"tobar","tr":"well"},{"word":"tréig","tr":"abandon"},{"word":"eagla","tr":"fear"}],"v":[{"word":"tithe","tr":"houses"},{"word":"bréag","tr":"lie"},{"word":"rogha","tr":"choice"}]},
  {"h":[{"word":"socal","tr":"socket"},{"word":"léana","tr":"meadow"},{"word":"sine","tr":"nipple"}],"v":[{"word":"solas","tr":"light"},{"word":"crann","tr":"tree"},{"word":"léan","tr":"sorrow"}]},
  {"h":[{"word":"socal","tr":"socket"},{"word":"léana","tr":"meadow"},{"word":"sonn","tr":"stake"}],"v":[{"word":"solas","tr":"light"},{"word":"ceann","tr":"head"},{"word":"léar","tr":"clear"}]},
  {"h":[{"word":"súgán","tr":"rope"},{"word":"léana","tr":"meadow"},{"word":"sort","tr":"kind"}],"v":[{"word":"solas","tr":"light"},{"word":"gearr","tr":"short"},{"word":"nead","tr":"nest"}]},
  {"h":[{"word":"cábla","tr":"cable"},{"word":"iolar","tr":"eagle"},{"word":"léan","tr":"sorrow"}],"v":[{"word":"coill","tr":"forest"},{"word":"balla","tr":"wall"},{"word":"airc","tr":"chest"}]},
  {"h":[{"word":"racht","tr":"burst"},{"word":"grian","tr":"sun"},{"word":"aithe","tr":"known"}],"v":[{"word":"rogha","tr":"choice"},{"word":"cúirt","tr":"court"},{"word":"tinte","tr":"fires"}]},
  {"h":[{"word":"socal","tr":"socket"},{"word":"léana","tr":"meadow"},{"word":"sonn","tr":"stake"}],"v":[{"word":"solas","tr":"light"},{"word":"clann","tr":"children"},{"word":"leas","tr":"benefit"}]},
  {"h":[{"word":"socal","tr":"socket"},{"word":"léana","tr":"meadow"},{"word":"sonn","tr":"stake"}],"v":[{"word":"solas","tr":"light"},{"word":"claon","tr":"slant"},{"word":"lian","tr":"trowel"}]},
  {"h":[{"word":"cosán","tr":"path"},{"word":"anois","tr":"now"},{"word":"toll","tr":"hole"}],"v":[{"word":"ceart","tr":"right"},{"word":"scoil","tr":"school"},{"word":"nasc","tr":"link"}]},
  {"h":[{"word":"cábla","tr":"cable"},{"word":"iolar","tr":"eagle"},{"word":"teas","tr":"heat"}],"v":[{"word":"caint","tr":"talk"},{"word":"balla","tr":"wall"},{"word":"airc","tr":"chest"}]},
  {"h":[{"word":"beoir","tr":"beer"},{"word":"léana","tr":"meadow"},{"word":"airc","tr":"chest"}],"v":[{"word":"balla","tr":"wall"},{"word":"obair","tr":"work"},{"word":"rian","tr":"track"}]},
  {"h":[{"word":"dreat","tr":"grimace"},{"word":"rogha","tr":"choice"},{"word":"séan","tr":"charm"}],"v":[{"word":"doras","tr":"door"},{"word":"eagla","tr":"fear"},{"word":"tuar","tr":"forecast"}]},
  {"h":[{"word":"turas","tr":"journey"},{"word":"braon","tr":"drop"},{"word":"roth","tr":"wheel"}],"v":[{"word":"tobar","tr":"well"},{"word":"réalt","tr":"star"},{"word":"sonn","tr":"stake"}]},
  {"h":[{"word":"theas","tr":"south"},{"word":"balla","tr":"wall"},{"word":"rasc","tr":"rascal"}],"v":[{"word":"tobar","tr":"well"},{"word":"eolas","tr":"knowledge"},{"word":"séan","tr":"charm"}]},
  {"h":[{"word":"greim","tr":"grip"},{"word":"eagal","tr":"fear"},{"word":"séan","tr":"charm"}],"v":[{"word":"gleas","tr":"device"},{"word":"eagla","tr":"fear"},{"word":"mile","tr":"mile"}]},
  {"h":[{"word":"sleas","tr":"spear"},{"word":"iolar","tr":"eagle"},{"word":"nasc","tr":"link"}],"v":[{"word":"scian","tr":"knife"},{"word":"eolas","tr":"knowledge"},{"word":"sort","tr":"kind"}]},
];


function pad(w) {
  const l = w.toLowerCase().split("");
  while (l.length < 5) l.push(BLANK);
  return l;
}

function isActive(r, c) {
  if (r === 0 || r === 2 || r === 4) return true;
  if ((r === 1 || r === 3) && (c === 0 || c === 2 || c === 4)) return true;
  return false;
}

function eq(a, b) {
  if (a === BLANK && b === BLANK) return true;
  if (a === BLANK || b === BLANK) return false;
  return a.toLowerCase() === b.toLowerCase();
}

function buildSol(p) {
  const g = Array.from({ length: 5 }, () => Array(5).fill(null));
  p.h.forEach((w, i) => pad(w.word).forEach((ch, c) => { g[i * 2][c] = ch; }));
  p.v.forEach((w, i) => pad(w.word).forEach((ch, r) => { g[r][i * 2] = ch; }));
  return g;
}

function scramble(sol) {
  const g = sol.map(r => [...r]);
  const pos = [];
  const lets = [];
  for (let r = 0; r < 5; r++)
    for (let c = 0; c < 5; c++)
      if (isActive(r, c) && g[r][c] && g[r][c] !== BLANK) {
        pos.push([r, c]);
        lets.push(g[r][c]);
      }
  let best = [...lets];
  let bestS = 0;
  for (let a = 0; a < 500; a++) {
    const sh = [...lets];
    for (let i = sh.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [sh[i], sh[j]] = [sh[j], sh[i]];
    }
    const s = sh.filter((ch, i) => !eq(ch, lets[i])).length;
    if (s > bestS) { best = sh; bestS = s; }
    if (s >= lets.length - 1) break;
  }
  pos.forEach(([r, c], i) => { g[r][c] = best[i]; });
  return g;
}

function calcMinSwaps(grid, sol) {
  const ps = [];
  for (let r = 0; r < 5; r++)
    for (let c = 0; c < 5; c++)
      if (isActive(r, c) && grid[r][c] && grid[r][c] !== BLANK && !eq(grid[r][c], sol[r][c]))
        ps.push({ has: grid[r][c], needs: sol[r][c] });
  if (!ps.length) return 0;
  const n = ps.length;
  const asgn = new Array(n).fill(-1);
  const used = new Array(n).fill(false);
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++)
      if (!used[j] && eq(ps[j].has, ps[i].needs)) { asgn[i] = j; used[j] = true; break; }
  const vis = new Array(n).fill(false);
  let cyc = 0;
  for (let i = 0; i < n; i++) {
    if (vis[i] || asgn[i] === -1) continue;
    let j = i;
    while (!vis[j] && asgn[j] !== -1) { vis[j] = true; j = asgn[j]; }
    cyc++;
  }
  return n - cyc;
}

function ufCount(grid, sol, cells, ch) {
  let n = 0, p = 0;
  for (const [r, c] of cells) {
    if (eq(sol[r][c], ch)) n++;
    if (eq(sol[r][c], ch) && eq(grid[r][c], ch)) p++;
  }
  return n - p;
}

function mpRank(grid, sol, cells, ch, tr, tc) {
  let rank = 0;
  for (const [r, c] of cells) {
    if (r === tr && c === tc) return rank;
    if (eq(grid[r][c], ch) && !eq(grid[r][c], sol[r][c])) rank++;
  }
  return rank;
}

function tileStatus(grid, sol, r, c) {
  if (!isActive(r, c)) return "off";
  const ch = grid[r][c];
  if (!ch || ch === BLANK) return ch === BLANK ? "blank" : "off";
  if (eq(ch, sol[r][c])) return "correct";
  let found = false;
  if (r % 2 === 0) {
    const cells = Array.from({ length: 5 }, (_, cc) => [r, cc]);
    if (ufCount(grid, sol, cells, ch) > 0 && mpRank(grid, sol, cells, ch, r, c) < ufCount(grid, sol, cells, ch)) found = true;
  }
  if (!found && c % 2 === 0) {
    const cells = Array.from({ length: 5 }, (_, rr) => [rr, c]);
    if (ufCount(grid, sol, cells, ch) > 0 && mpRank(grid, sol, cells, ch, r, c) < ufCount(grid, sol, cells, ch)) found = true;
  }
  return found ? "misplaced" : "wrong";
}

function wordDone(g, s, cells) {
  return cells.every(([r, c]) => eq(g[r][c], s[r][c]));
}

const BG = { correct: "#4a8b3f", misplaced: "#b8942e", wrong: "#3b3b50", blank: "#1c1c2e" };
const hasFada = (ch) => "\u00e1\u00e9\u00ed\u00f3\u00fa".includes(ch);

function FadaDot({ small }) {
  return <div style={{ position: "absolute", bottom: small ? 2 : 4, right: small ? 3 : 5, width: small ? 3 : 5, height: small ? 3 : 5, borderRadius: "50%", background: "#f5d67a", opacity: 0.8 }} />;
}

export default function Tomhas() {
  const [puz, setPuz] = useState(null);
  const [sol, setSol] = useState(null);
  const [grid, setGrid] = useState(null);
  const [sel, setSel] = useState(null);
  const [swaps, setSwaps] = useState(20);
  const [optimal, setOptimal] = useState(0);
  const [done, setDone] = useState(new Set());
  const [toast, setToast] = useState(null);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [bump, setBump] = useState(new Set());
  const [hints, setHints] = useState(3);
  const [ghostPos, setGhostPos] = useState(null);
  const [dropCell, setDropCell] = useState(null);

  const tt = useRef(null);
  const toastKey = useRef(0);
  const gridRef = useRef(null);
  const dragRef = useRef(null);
  const R = useRef({});
  R.current = { grid, sol, puz, done, swaps, won, lost, sel, hints };

  const showToast = useCallback((word, tr) => {
    if (tt.current) clearTimeout(tt.current);
    toastKey.current++;
    setToast({ word, tr, key: toastKey.current });
    tt.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const checkWords = useCallback((g, s, p, d) => {
    if (!g || !s || !p) return;
    const nd = new Set(d);
    let jst = null;
    p.h.forEach((w, i) => {
      const k = "h" + i;
      if (!nd.has(k) && wordDone(g, s, Array.from({ length: 5 }, (_, c) => [i * 2, c]))) {
        nd.add(k);
        jst = w;
      }
    });
    p.v.forEach((w, i) => {
      const k = "v" + i;
      if (!nd.has(k) && wordDone(g, s, Array.from({ length: 5 }, (_, r) => [r, i * 2]))) {
        nd.add(k);
        jst = w;
      }
    });
    if (nd.size > d.size) {
      setDone(nd);
      if (jst) showToast(jst.word, jst.tr);
      if (nd.size === 6) setTimeout(() => setWon(true), 600);
    }
  }, [showToast]);

  const doSwap = useCallback((fr, fc, tr, tc) => {
    const { grid: g, sol: s, puz: p, done: d, swaps: sw, won: w, lost: l } = R.current;
    if (!g || !s || w || l) return;
    if (fr === tr && fc === tc) return;
    if (!isActive(tr, tc) || !g[tr][tc] || g[tr][tc] === BLANK) return;
    if (eq(g[tr][tc], s[tr][tc])) return;
    if (eq(g[fr][fc], s[fr][fc])) return;
    const ng = g.map(row => [...row]);
    ng[fr][fc] = g[tr][tc];
    ng[tr][tc] = g[fr][fc];
    setBump(new Set([fr + "," + fc, tr + "," + tc]));
    setTimeout(() => setBump(new Set()), 300);
    setGrid(ng);
    setSel(null);
    const ns = sw - 1;
    setSwaps(ns);
    setTimeout(() => checkWords(ng, s, p, d), 30);
    if (ns <= 0) {
      setTimeout(() => {
        let ok = true;
        for (let rr = 0; rr < 5; rr++)
          for (let cc = 0; cc < 5; cc++)
            if (isActive(rr, cc) && ng[rr][cc] && ng[rr][cc] !== BLANK && !eq(ng[rr][cc], s[rr][cc]))
              ok = false;
        if (!ok) setLost(true);
      }, 400);
    }
  }, [checkWords]);

  const handleTap = useCallback((r, c) => {
    const { grid: g, sol: s, won: w, lost: l, sel: sl } = R.current;
    if (w || l || !g || !s) return;
    if (!isActive(r, c)) return;
    const ch = g[r][c];
    if (!ch || ch === BLANK) return;
    if (eq(ch, s[r][c])) { setSel(null); return; }
    if (!sl) { setSel([r, c]); return; }
    if (sl[0] === r && sl[1] === c) { setSel(null); return; }
    doSwap(sl[0], sl[1], r, c);
  }, [doSwap]);

  const start = useCallback(() => {
    const p = PUZZLES[Math.floor(Math.random() * PUZZLES.length)];
    const s = buildSol(p);
    const scr = scramble(s);
    const opt = calcMinSwaps(scr, s);
    setPuz(p);
    setSol(s);
    setGrid(scr);
    setOptimal(opt);
    setSel(null);
    setSwaps(opt + 5);
    setDone(new Set());
    setHints(3);
    setToast(null);
    setWon(false);
    setLost(false);
    setBump(new Set());
    dragRef.current = null;
    setGhostPos(null);
    setDropCell(null);
  }, []);

  useEffect(() => { start(); }, [start]);

  const handleHint = useCallback(() => {
    const { grid: g, sol: s, puz: p, done: d, won: w, lost: l, hints: h } = R.current;
    if (w || l || !g || !s || h <= 0) return;
    const wrong = [];
    for (let r = 0; r < 5; r++)
      for (let c = 0; c < 5; c++)
        if (isActive(r, c) && g[r][c] && g[r][c] !== BLANK && !eq(g[r][c], s[r][c]))
          wrong.push([r, c]);
    if (!wrong.length) return;
    const [tr, tc] = wrong[Math.floor(Math.random() * wrong.length)];
    const needed = s[tr][tc];
    let fr = -1, fc = -1;
    for (let r = 0; r < 5; r++)
      for (let c = 0; c < 5; c++)
        if (isActive(r, c) && eq(g[r][c], needed) && !eq(g[r][c], s[r][c]) && !(r === tr && c === tc)) {
          fr = r; fc = c; break;
        }
    const ng = g.map(row => [...row]);
    if (fr >= 0) {
      ng[fr][fc] = ng[tr][tc];
      ng[tr][tc] = needed;
      setBump(new Set([tr + "," + tc, fr + "," + fc]));
    } else {
      ng[tr][tc] = needed;
      setBump(new Set([tr + "," + tc]));
    }
    setTimeout(() => setBump(new Set()), 300);
    setGrid(ng);
    setSel(null);
    setHints(h - 1);
    setTimeout(() => checkWords(ng, s, p, d), 30);
  }, [checkWords]);

  // Drag via window listeners
  useEffect(() => {
    function getXY(e) {
      if (e.touches && e.touches.length > 0) return [e.touches[0].clientX, e.touches[0].clientY];
      if (e.changedTouches && e.changedTouches.length > 0) return [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
      return [e.clientX, e.clientY];
    }

    function hitTest(cx, cy) {
      if (!gridRef.current) return null;
      const rect = gridRef.current.getBoundingClientRect();
      const col = Math.floor((cx - rect.left) / STEP);
      const row = Math.floor((cy - rect.top) / STEP);
      if (row < 0 || row > 4 || col < 0 || col > 4 || !isActive(row, col)) return null;
      return [row, col];
    }

    function onMove(e) {
      const d = dragRef.current;
      if (!d) return;
      e.preventDefault();
      const [cx, cy] = getXY(e);
      d.x = cx;
      d.y = cy;
      setGhostPos({ r: d.r, c: d.c, x: cx, y: cy });
      const cell = hitTest(cx, cy);
      if (cell && (cell[0] !== d.r || cell[1] !== d.c)) {
        setDropCell(cell[0] + "," + cell[1]);
      } else {
        setDropCell(null);
      }
    }

    function onEnd(e) {
      const d = dragRef.current;
      if (!d) return;
      dragRef.current = null;
      setGhostPos(null);
      setDropCell(null);
      const [cx, cy] = getXY(e);
      const dist = Math.hypot(cx - d.sx, cy - d.sy);
      if (dist < 10) {
        handleTap(d.r, d.c);
      } else {
        const cell = hitTest(cx, cy);
        if (cell) doSwap(d.r, d.c, cell[0], cell[1]);
      }
    }

    function onCancel() {
      dragRef.current = null;
      setGhostPos(null);
      setDropCell(null);
    }

    window.addEventListener("mousemove", onMove, { passive: false });
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onEnd);
    window.addEventListener("touchcancel", onCancel);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
      window.removeEventListener("touchcancel", onCancel);
    };
  }, [handleTap, doSwap]);

  function beginDrag(r, c, cx, cy) {
    const { grid: g, sol: s, won: w, lost: l } = R.current;
    if (w || l || !g || !s) return;
    const ch = g[r][c];
    if (!ch || ch === BLANK || eq(ch, s[r][c])) return;
    setSel(null);
    dragRef.current = { r, c, sx: cx, sy: cy, x: cx, y: cy };
    setGhostPos({ r, c, x: cx, y: cy });
  }

  if (!puz || !grid || !sol) {
    return <div style={S.loading}><p>Ag l\u00f3d\u00e1il...</p></div>;
  }

  const count = done.size;
  const dragR = ghostPos ? ghostPos.r : -1;
  const dragC = ghostPos ? ghostPos.c : -1;

  // Ghost tile rendering
  let ghostEl = null;
  if (ghostPos && grid[ghostPos.r]) {
    const ch = grid[ghostPos.r][ghostPos.c];
    if (ch && ch !== BLANK) {
      const st = tileStatus(grid, sol, ghostPos.r, ghostPos.c);
      const bg = BG[st] || "#3b3b50";
      ghostEl = (
        <div style={{
          position: "fixed", left: ghostPos.x - SZ / 2, top: ghostPos.y - SZ / 2,
          width: SZ, height: SZ, display: "flex", alignItems: "center", justifyContent: "center",
          background: bg, borderRadius: 10, border: "2.5px solid #f0e6cc",
          fontSize: 23, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
          color: "#fff", textTransform: "uppercase",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(240,230,204,0.2)",
          pointerEvents: "none", zIndex: 100, transform: "scale(1.1) rotate(2deg)", userSelect: "none",
          position: "relative",
        }}>
          {ch.toUpperCase()}
          {hasFada(ch) && <FadaDot />}
        </div>
      );
    }
  }

  return (
    <div style={S.root}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
      <div style={S.topBar} />
      <h1 style={S.title}>TOMHAS</h1>
      <div style={S.subtitle}>CLUICHE FOCAL AS GAEILGE</div>

      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
        <div style={S.swapBox}>
          <span style={S.swapLabel}>Babhtaí</span>
          <span style={{ ...S.swapNum, color: swaps <= 2 ? "#d94444" : swaps <= optimal ? "#b8942e" : "#4a8b3f" }}>{swaps}</span>
        </div>
        <div style={{ fontSize: 10, color: "#5a5a48", fontFamily: "'DM Sans', sans-serif", textAlign: "center", lineHeight: 1.3 }}>
          <div>Is fearr</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#7a7a60" }}>{optimal}</div>
        </div>
        <button onClick={handleHint}
          style={{ ...S.hintBtn, opacity: hints <= 0 ? 0.3 : 1, cursor: hints <= 0 ? "default" : "pointer" }}
          onMouseEnter={e => { if (hints > 0) e.target.style.background = "rgba(184,148,46,0.25)"; }}
          onMouseLeave={e => { e.target.style.background = "rgba(184,148,46,0.12)"; }}
        >{"💡 " + hints}</button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
        {[{ n: 2, e: "🥉", col: "#cd7f32" }, { n: 4, e: "🥈", col: "#c0c0c0" }, { n: 6, e: "🥇", col: "#ffd700" }].map((m, i) => {
          const earned = count >= m.n;
          const prog = Math.min(count - i * 2, 2);
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{
                width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: earned ? 20 : 15,
                background: earned ? "radial-gradient(circle, " + m.col + "33, " + m.col + "11)" : "rgba(255,255,255,0.03)",
                border: "2px solid " + (earned ? m.col : "rgba(255,255,255,0.08)"),
                transition: "all 0.5s", filter: earned ? "none" : "grayscale(1) opacity(0.3)",
                transform: earned ? "scale(1)" : "scale(0.9)",
              }}>{m.e}</div>
              {i < 2 && (
                <div style={{ width: 20, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden", position: "relative" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: (Math.max(0, Math.min(prog, 2)) / 2 * 100) + "%", background: earned ? m.col : "rgba(255,255,255,0.15)", borderRadius: 2, transition: "width 0.5s" }} />
                </div>
              )}
            </div>
          );
        })}
        <span style={{ fontSize: 11, color: "#5a5a48", fontFamily: "'DM Sans', sans-serif", marginLeft: 4 }}>{count}/6</span>
      </div>

      {toast && (
        <div key={toast.key} style={S.toast}>
          <div style={S.toastWord}>{toast.word.toUpperCase()}</div>
          <div style={S.toastTr}>{toast.tr}</div>
        </div>
      )}

      <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: "repeat(5, " + SZ + "px)", gridTemplateRows: "repeat(5, " + SZ + "px)", gap: GAP, marginBottom: 16, position: "relative", touchAction: "none" }}>
        {Array.from({ length: 25 }).map(function(_, idx) {
          var r = Math.floor(idx / 5);
          var c = idx % 5;
          if (!isActive(r, c) || !grid[r][c]) return <div key={idx} style={{ width: SZ, height: SZ }} />;
          var ch = grid[r][c];
          var bl = ch === BLANK;
          var st = tileStatus(grid, sol, r, c);
          var isSel = sel && sel[0] === r && sel[1] === c;
          var isBump = bump.has(r + "," + c);
          var isCorr = st === "correct";
          var isDrag = dragR === r && dragC === c;
          var isDrop = dropCell === (r + "," + c);
          var canDrag = !bl && !isCorr && !won && !lost;
          var bg = BG[st] || "transparent";

          return (
            <div key={idx}
              onMouseDown={function(e) { e.preventDefault(); if (canDrag) beginDrag(r, c, e.clientX, e.clientY); }}
              onTouchStart={function(e) { if (canDrag) { e.preventDefault(); var t = e.touches[0]; beginDrag(r, c, t.clientX, t.clientY); } }}
              style={{
                width: SZ, height: SZ, display: "flex", alignItems: "center", justifyContent: "center",
                background: bg, borderRadius: 10,
                border: isSel ? "2.5px solid #f0e6cc" : isDrop ? "2.5px solid rgba(240,230,204,0.5)" : bl ? "2px dashed #2a2a3e" : "2px solid transparent",
                cursor: canDrag ? "grab" : "default",
                fontSize: 23, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
                color: bl ? "#2a2a3e" : "#fff", textTransform: "uppercase",
                transition: isDrag ? "none" : "transform 0.2s, box-shadow 0.2s, background 0.3s",
                transform: isBump ? "scale(1.18)" : isSel ? "scale(1.1)" : isDrop ? "scale(1.08)" : "scale(1)",
                boxShadow: isSel ? "0 0 20px rgba(240,230,204,0.25)" : isCorr ? "0 2px 12px rgba(74,139,63,0.25)" : "0 2px 6px rgba(0,0,0,0.3)",
                userSelect: "none", WebkitTapHighlightColor: "transparent", position: "relative",
                opacity: isDrag ? 0.3 : 1,
              }}
            >
              {bl ? "" : ch.toUpperCase()}
              {hasFada(ch) && <FadaDot />}
            </div>
          );
        })}
      </div>

      {ghostEl}

      <div style={S.chips}>
        {puz.h.map(function(w, i) {
          var d = done.has("h" + i);
          return <div key={"h" + i} style={d ? S.chipDone : S.chip}>{"→ " + (d ? w.word.toUpperCase() + " (" + w.tr + ")" : "Sraith " + (i + 1))}</div>;
        })}
        {puz.v.map(function(w, i) {
          var d = done.has("v" + i);
          return <div key={"v" + i} style={d ? S.chipDone : S.chip}>{"↓ " + (d ? w.word.toUpperCase() + " (" + w.tr + ")" : "Col\u00fan " + (i + 1))}</div>;
        })}
      </div>

      <div style={S.help}>
        <p style={{ margin: "0 0 4px" }}>Tarraing t\u00edl go dt\u00ed ceann eile, n\u00f3 br\u00faigh dh\u00e1 th\u00edl le babht\u00e1il.</p>
        <p style={{ margin: 0, fontSize: 10, opacity: 0.7 }}>{"\u00e1 \u2260 a \u00b7 \u00e9 \u2260 e \u00b7 \u00ed \u2260 i \u00b7 \u00f3 \u2260 o \u00b7 \u00fa \u2260 u \u00b7 \u2B1B = sp\u00e1s folamh"}</p>
      </div>

      <div style={S.legend}>
        {[{ bg: "#4a8b3f", t: "Ceart" }, { bg: "#b8942e", t: "\u00c1it mh\u00edcheart" }, { bg: "#3b3b50", t: "M\u00edcheart" }].map(function(x) {
          return <div key={x.t} style={S.legendItem}><div style={{ width: 12, height: 12, borderRadius: 3, background: x.bg }} />{x.t}</div>;
        })}
      </div>

      <button onClick={start} style={S.btn}
        onMouseEnter={function(e) { e.target.style.background = "rgba(74,139,63,0.25)"; }}
        onMouseLeave={function(e) { e.target.style.background = "rgba(74,139,63,0.12)"; }}
      >CLUICHE NUA</button>

      {(won || lost) && (function() {
        var medal = count >= 6 ? "🥇" : count >= 4 ? "🥈" : count >= 2 ? "🥉" : "💪";
        var mL = count >= 6 ? "\u00d3R" : count >= 4 ? "AIRGEAD" : count >= 2 ? "CR\u00c9-UMHA" : "";
        var mC = count >= 6 ? "#ffd700" : count >= 4 ? "#c0c0c0" : count >= 2 ? "#cd7f32" : "#7a7a60";
        var G = 38;
        var cw = {};
        puz.h.forEach(function(w, i) { for (var c = 0; c < 5; c++) { var k = (i * 2) + "," + c; if (!cw[k]) cw[k] = []; cw[k].push(w); } });
        puz.v.forEach(function(w, i) { for (var r = 0; r < 5; r++) { var k = r + "," + (i * 2); if (!cw[k]) cw[k] = []; cw[k].push(w); } });
        var modalBg = won ? {} : { background: "linear-gradient(145deg, #1d1520, #251a1a)", border: "1px solid rgba(217,68,68,0.25)" };

        return (
          <div style={S.overlay}>
            <div style={{ ...S.modal, ...modalBg, maxWidth: 380, padding: "28px 24px 32px" }}>
              <div style={{ fontSize: 52, marginBottom: 2 }}>{medal}</div>
              {mL && <div style={{ fontSize: 12, fontFamily: "'DM Sans', sans-serif", color: mC, fontWeight: 700, letterSpacing: 2, marginBottom: 2 }}>{mL}</div>}
              <h2 style={{ fontSize: 26, margin: "4px 0 2px", color: won ? "#7cc96e" : count >= 2 ? mC : "#d94444", fontWeight: 700, fontFamily: "'Cormorant Garamond', serif" }}>
                {won ? "Maith th\u00fa!" : count >= 2 ? "Iarracht mhaith!" : "Deireadh!"}
              </h2>
              <p style={{ fontSize: 12, color: "#7a7a60", margin: "0 0 14px", fontFamily: "'DM Sans', sans-serif" }}>
                {count + "/6 focal \u00b7 " + swaps + " babht\u00e1\u00ed f\u00e1gtha \u00b7 is fearr: " + optimal}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, " + G + "px)", gridTemplateRows: "repeat(5, " + G + "px)", gap: 3, marginBottom: 10, justifyContent: "center" }}>
                {Array.from({ length: 25 }).map(function(_, idx) {
                  var r = Math.floor(idx / 5);
                  var c = idx % 5;
                  if (!isActive(r, c) || !sol[r][c]) return <div key={idx} style={{ width: G, height: G }} />;
                  var ch = sol[r][c];
                  var bl = ch === BLANK;
                  var words = cw[r + "," + c] || [];
                  return (
                    <div key={idx}
                      onClick={function() { if (words.length && !bl) showToast(words[0].word, words[0].tr); }}
                      style={{
                        width: G, height: G, display: "flex", alignItems: "center", justifyContent: "center",
                        background: bl ? "#1c1c2e" : "#4a8b3f", borderRadius: 6,
                        border: bl ? "1.5px dashed #2a2a3e" : "1.5px solid transparent",
                        fontSize: 15, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
                        color: bl ? "#2a2a3e" : "#fff", textTransform: "uppercase",
                        cursor: bl ? "default" : "pointer", userSelect: "none", transition: "transform 0.15s", position: "relative",
                      }}
                      onMouseEnter={function(e) { if (!bl) e.currentTarget.style.transform = "scale(1.12)"; }}
                      onMouseLeave={function(e) { e.currentTarget.style.transform = "scale(1)"; }}
                    >
                      {bl ? "" : ch.toUpperCase()}
                      {hasFada(ch) && <FadaDot small />}
                    </div>
                  );
                })}
              </div>
              <p style={{ fontSize: 10, color: "#5a5a48", margin: "0 0 14px", fontFamily: "'DM Sans', sans-serif", fontStyle: "italic" }}>
                {"Br\u00faigh ar th\u00edl chun an t-aistri\u00fach\u00e1n a fheice\u00e1il"}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center", marginBottom: 18 }}>
                {[].concat(puz.h.map(function(w, i) { return { word: w.word, tr: w.tr, d: "\u2192", k: "h" + i }; }), puz.v.map(function(w, i) { return { word: w.word, tr: w.tr, d: "\u2193", k: "v" + i }; })).map(function(w) {
                  return (
                    <div key={w.k} style={{ padding: "2px 8px", borderRadius: 10, fontSize: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, background: "rgba(74,139,63,0.2)", color: "#7cc96e", border: "1px solid rgba(74,139,63,0.25)" }}>
                      {w.d + " " + w.word.toUpperCase() + " "}<span style={{ color: "#5a5a48", fontWeight: 400 }}>{"(" + w.tr + ")"}</span>
                    </div>
                  );
                })}
              </div>
              <button onClick={start} style={{ ...S.modalBtn, background: won ? "#4a8b3f" : count >= 2 ? "#b8942e" : "#d94444" }}>
                {won ? "AR\u00cdS!" : "TRIAIL AR\u00cdS"}
              </button>
            </div>
          </div>
        );
      })()}

      <p style={S.footer}>{"Focail \u00f3 "}<span style={{ color: "#5a5a48" }}>teanglann.ie</span></p>
      <style>{"@keyframes toastIn{0%{opacity:0;transform:translate(-50%,-50%) scale(.85)}12%{opacity:1;transform:translate(-50%,-50%) scale(1)}80%{opacity:1;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(-50%,-50%) scale(.92)}}"}</style>
    </div>
  );
}

var S = {
  root: { minHeight: "100vh", background: "linear-gradient(160deg, #0d1117 0%, #151d2a 50%, #111b21 100%)", display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 12px 40px", fontFamily: "'Palatino Linotype', Georgia, serif", color: "#d4c9a8", position: "relative", overscrollBehavior: "none" },
  loading: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#111b21", color: "#d4c9a8", fontFamily: "Georgia, serif", fontSize: 18 },
  topBar: { position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #4a8b3f, #b8942e, #4a8b3f, #b8942e, #4a8b3f)", opacity: 0.7 },
  title: { fontSize: 42, fontWeight: 700, margin: 0, letterSpacing: 8, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#f0e6cc", textShadow: "0 2px 20px rgba(74,139,63,0.25)" },
  subtitle: { fontSize: 11, letterSpacing: 4, color: "#7a7a60", marginTop: 2, marginBottom: 16, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, textTransform: "uppercase" },
  swapBox: { display: "flex", alignItems: "center", gap: 10, padding: "6px 20px", borderRadius: 24, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" },
  swapLabel: { fontSize: 12, color: "#7a7a60", fontFamily: "'DM Sans', sans-serif" },
  swapNum: { fontSize: 24, fontWeight: 700, fontFamily: "'Cormorant Garamond', serif", minWidth: 30, textAlign: "center" },
  hintBtn: { padding: "8px 16px", borderRadius: 24, border: "1px solid rgba(184,148,46,0.35)", background: "rgba(184,148,46,0.12)", color: "#d4b84a", fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, transition: "background 0.2s", letterSpacing: 1 },
  toast: { position: "fixed", top: "45%", left: "50%", transform: "translate(-50%, -50%)", background: "rgba(74,139,63,0.95)", color: "#fff", padding: "14px 36px", borderRadius: 14, zIndex: 500, textAlign: "center", boxShadow: "0 8px 40px rgba(0,0,0,0.6)", animation: "toastIn 2.2s ease-in-out forwards" },
  toastWord: { fontSize: 22, fontWeight: 700, fontFamily: "'Cormorant Garamond', serif", letterSpacing: 2 },
  toastTr: { fontSize: 14, opacity: 0.85, fontStyle: "italic", fontFamily: "'DM Sans', sans-serif", marginTop: 2 },
  chips: { display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", maxWidth: 340, marginBottom: 14 },
  chip: { padding: "3px 12px", borderRadius: 14, fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, background: "rgba(255,255,255,0.04)", color: "#5a5a48", border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.3s" },
  chipDone: { padding: "3px 12px", borderRadius: 14, fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, background: "rgba(74,139,63,0.25)", color: "#7cc96e", border: "1px solid rgba(74,139,63,0.35)", transition: "all 0.3s" },
  help: { maxWidth: 320, textAlign: "center", marginBottom: 14, fontSize: 12, lineHeight: 1.7, color: "#5a5a48", fontFamily: "'DM Sans', sans-serif" },
  legend: { display: "flex", gap: 14, marginBottom: 18, flexWrap: "wrap", justifyContent: "center" },
  legendItem: { display: "flex", alignItems: "center", gap: 5, fontSize: 10, fontFamily: "'DM Sans', sans-serif", color: "#7a7a60" },
  btn: { padding: "10px 30px", borderRadius: 10, border: "1px solid rgba(74,139,63,0.35)", background: "rgba(74,139,63,0.12)", color: "#7cc96e", fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, cursor: "pointer", letterSpacing: 1.5, transition: "background 0.2s" },
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.82)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { background: "linear-gradient(145deg, #151d2a, #1a2435)", padding: "36px 44px", borderRadius: 22, textAlign: "center", border: "1px solid rgba(74,139,63,0.3)", boxShadow: "0 24px 80px rgba(0,0,0,0.6)", maxWidth: 340, width: "90%" },
  modalBtn: { padding: "12px 36px", borderRadius: 10, border: "none", background: "#4a8b3f", color: "#fff", fontSize: 15, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, cursor: "pointer", letterSpacing: 1 },
  footer: { marginTop: 24, fontSize: 10, color: "#3a3a3a", fontFamily: "'DM Sans', sans-serif" },
};
