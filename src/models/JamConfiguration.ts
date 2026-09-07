// A single start/stop span. Used for the overall jam timer and each individual
// item's timer. Single start, single stop — no pause/resume cycles.
export interface TimeSpan {
    startedAt: number | null; // epoch ms; null = not started yet
    stoppedAt: number | null; // epoch ms; null = not stopped yet (still running, or never started)
}

// Tolerance buffers applied to an item's planned duration when its timer starts.
// minTime = startedAt + base * (1 - pct); maxTime = startedAt + base * (1 + pct).
export const TEAM_SET_TIME_BUFFER_PCT = 0.15;
export const GAME_SCENE_TIME_BUFFER_PCT = 0.10;

// ─── Configuration (known ahead of time, reusable, saved to local storage) ────

export interface TeamSetup {
    teamName: string; // one entry is always named "Audience"
}

export interface TeamSetsConfig {
    numberOfTeams: number;
    perTeamPlannedMinutes: number;              // same planned value applies to every team's set
    teams: TeamSetup[];                         // length === numberOfTeams
    actualTeamMinutes: Record<string, number>;  // key = team name; initialized to perTeamPlannedMinutes,
                                                 // adjusted at jam time based on actual attendance per team
}

// One entry in the host-configured, ordered sequence of the jam. Every kind
// carries its own planned `minutes` so the sequence table can render one
// column regardless of kind. The mashup is just the last entry in the
// sequence, not a separate concept.
export type PlannedItem =
    | { kind: 'game'; gameName: string; minutes: number }
    | { kind: 'scene'; minutes: number }
    | { kind: 'set'; teamName: string; minutes: number }
    | { kind: 'mashup'; minutes: number };

export interface JamConfiguration {
    totalMinutes: number;
    transitionMinutes: number;   // gap time budgeted between consecutive items
    estimatedAttendees: number;  // estimate used to compute how many scenes are needed
    timePerScene: number;        // planned minutes for any single scene
    teamSets: TeamSetsConfig;
    order: PlannedItem[];        // the host-configured sequence, front to back, ending in a 'mashup' entry once finished
}

// ─── Live jam (created when a configuration is loaded to actually start) ─────

interface ItemTimingBase {
    timer: TimeSpan;
    minTime: number | null; // epoch ms; null until the item starts
    maxTime: number | null; // epoch ms; null until the item starts
}

// One entry per item in JamConfiguration.order, same order, same length.
export type PlannedItemTiming =
    | ({ kind: 'game'; gameName: string; minutes: number } & ItemTimingBase)
    | ({ kind: 'scene'; minutes: number } & ItemTimingBase)
    | ({ kind: 'set'; teamName: string; minutes: number } & ItemTimingBase)
    | ({ kind: 'mashup'; minutes: number } & ItemTimingBase);

export interface JamTiming {
    overall: TimeSpan;           // the continuously-running jam-wide timer; starts once, stops once, at jam end
    items: PlannedItemTiming[];  // mirrors config.order
}

export interface ActiveJam {
    config: JamConfiguration;
    attendees: string[]; // filled in right before the jam starts; more can be added during the jam
    timing: JamTiming;
}
