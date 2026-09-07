import RNFS from 'react-native-fs';
import { SHEET_ID, TABS } from '../config';
import { GOOGLE_SHEETS_API_KEY } from './keys';
import { JamConfiguration } from '../models/JamConfiguration';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Game {
    name: string;
    players: string;
    length: string;
    audience: string;
    description: string;
}

export interface JamData {
    games: Game[];
    warmups: { time: number };
}

export interface ShowTeam {
    team_name: string;
    set_length: number;
}

export type ShowData = ShowTeam[];

export interface Team {
    teamName: string;
    members: string[];
}

export interface Regular {
    first: string;
    lastletter: string;
}

export interface SyncResult {
    success: boolean;
    count?: number;
    error?: string;
}

// ─── Paths ────────────────────────────────────────────────────────────────────

const ROOT = RNFS.DocumentDirectoryPath;
const PATHS = {
    OUR_GAMES:    `${ROOT}/our_games.json`,
    REGULARS:     `${ROOT}/regulars.json`,
    JAMS_DIR:     `${ROOT}/jams`,
    SHOWS_DIR:    `${ROOT}/shows`,
    JAM_GAMES:    `${ROOT}/jams/jam_games.json`,
    TEAMS:  `${ROOT}/shows/teams.json`,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function ensureDirs() {
    for (const dir of [PATHS.JAMS_DIR, PATHS.SHOWS_DIR]) {
        if (!(await RNFS.exists(dir))) {
            await RNFS.mkdir(dir);
        }
    }
}

async function fetchTab(tab: string, range: string): Promise<string[][]> {
    const url =
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}` +
        `/values/${tab}!${range}?key=${GOOGLE_SHEETS_API_KEY}`;
    console.log(`[syncService] Fetching: ${url}`);
    const res = await fetch(url);
    console.log(`[syncService] Response status for "${tab}": ${res.status}`);
    if (!res.ok) {
        const body = await res.text();
        console.log(`[syncService] Error body: ${body}`);
        throw new Error(`Sheets API ${res.status} on tab "${tab}"`);
    }
    const json = await res.json();
    console.log(`[syncService] Rows received for "${tab}": ${(json.values || []).length}`);
    return json.values || [];
}

function rowsToObjects<T>(rows: string[][]): T[] {
    if (rows.length < 2) return [];
    const headers = rows[0].map(h => h.trim());
    return rows.slice(1)
        .filter(row => row.some(cell => cell?.trim()))
        .map(row => {
            const obj: any = {};
            headers.forEach((h, i) => { obj[h] = row[i]?.trim() ?? ''; });
            return obj as T;
        });
}

// First row = team names, one per column. Remaining rows = one member name
// per cell, in that team's column. Columns are ragged (teams have different
// roster sizes), so empty cells below a shorter roster are skipped.
function columnsToTeams(rows: string[][]): Team[] {
    if (rows.length < 1) return [];
    const [header, ...memberRows] = rows;
    return header
        .map((teamName, col) => ({
            teamName: teamName?.trim() ?? '',
            members: memberRows
                .map(row => row[col]?.trim())
                .filter((name): name is string => !!name),
        }))
        .filter(team => team.teamName);
}

async function writeJson(path: string, data: unknown) {
    const json = JSON.stringify(data, null, 2);
    console.log(`[syncService] Writing to: ${path}`);
    console.log(`[syncService] Content:\n${json}`);
    await RNFS.writeFile(path, json, 'utf8');
}

async function readJson<T>(path: string): Promise<T | null> {
    if (!(await RNFS.exists(path))) return null;
    return JSON.parse(await RNFS.readFile(path, 'utf8')) as T;
}

// ─── Sync from Sheet ──────────────────────────────────────────────────────────

export async function syncOurGames(): Promise<SyncResult> {
    try {
        const rows = await fetchTab(TABS.OUR_GAMES, 'A:E');
        const games = rowsToObjects<Game>(rows);
        await writeJson(PATHS.OUR_GAMES, games);
        return { success: true, count: games.length };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

export async function syncJamGames(): Promise<SyncResult> {
    try {
        await ensureDirs();
        const rows = await fetchTab(TABS.JAM_GAMES, 'A:E');
        const games = rowsToObjects<Game>(rows);

        // Preserve existing warmups.time if a local file already exists
        const existing = await readJson<JamData>(PATHS.JAM_GAMES);
        const jamData: JamData = {
            games,
            warmups: { time: existing?.warmups?.time ?? 0 },
        };

        await writeJson(PATHS.JAM_GAMES, jamData);
        return { success: true, count: games.length };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

export async function syncTeams(): Promise<SyncResult> {
    try {
        await ensureDirs();
        const rows = await fetchTab(TABS.TEAMS, 'A:Z');
        const teams = columnsToTeams(rows);
        await writeJson(PATHS.TEAMS, teams);
        return { success: true, count: teams.length };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

export async function syncRegulars(): Promise<SyncResult> {
    try {
        const rows = await fetchTab(TABS.REGULARS, 'A:B');
        const regulars = rowsToObjects<Regular>(rows);
        await writeJson(PATHS.REGULARS, regulars);
        return { success: true, count: regulars.length };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

export async function syncAll(): Promise<Record<string, SyncResult>> {
    const [ourGames, jamGames, showLineup, regulars] = await Promise.all([
        syncOurGames(),
        syncJamGames(),
        syncTeams(),
        syncRegulars(),
    ]);
    return { ourGames, jamGames, showLineup, regulars };
}

// ─── Load from Local Storage ──────────────────────────────────────────────────

export const loadOurGames   = () => readJson<Game[]>(PATHS.OUR_GAMES);
export const loadJamGames   = () => readJson<JamData>(PATHS.JAM_GAMES);
export const loadShowLineup = () => readJson<Team[]>(PATHS.TEAMS);
export const loadRegulars   = () => readJson<Regular[]>(PATHS.REGULARS);

// ─── Save / Load User-Configured Jams & Shows ─────────────────────────────────

export async function saveJam(name: string, data: JamConfiguration) {
    await ensureDirs();
    await writeJson(`${PATHS.JAMS_DIR}/${name}.json`, data);
}

export async function saveShow(name: string, data: ShowData) {
    await ensureDirs();
    await writeJson(`${PATHS.SHOWS_DIR}/${name}.json`, data);
}

export async function loadSavedJam(name: string): Promise<JamConfiguration | null> {
    return readJson<JamConfiguration>(`${PATHS.JAMS_DIR}/${name}.json`);
}

export async function loadSavedShow(name: string): Promise<ShowData | null> {
    return readJson<ShowData>(`${PATHS.SHOWS_DIR}/${name}.json`);
}

export async function listSavedJams(): Promise<string[]> {
    await ensureDirs();
    const files = await RNFS.readdir(PATHS.JAMS_DIR);
    // exclude the synced file — that one is always managed by syncJamGames()
    return files
        .filter(f => f.endsWith('.json') && f !== 'jam_games.json')
        .map(f => f.replace('.json', ''));
}

export async function listSavedShows(): Promise<string[]> {
    await ensureDirs();
    const files = await RNFS.readdir(PATHS.SHOWS_DIR);
    return files
        .filter(f => f.endsWith('.json') && f !== 'show_lineup.json')
        .map(f => f.replace('.json', ''));
}

export async function deleteSavedJam(name: string) {
    const path = `${PATHS.JAMS_DIR}/${name}.json`;
    if (await RNFS.exists(path)) await RNFS.unlink(path);
}

export async function deleteSavedShow(name: string) {
    const path = `${PATHS.SHOWS_DIR}/${name}.json`;
    if (await RNFS.exists(path)) await RNFS.unlink(path);
}
