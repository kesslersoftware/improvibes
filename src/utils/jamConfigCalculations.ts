import { JamConfiguration } from '../models/JamConfiguration';

// All numbers the wizard displays are derived here from the persisted
// JamConfiguration + its order array — nothing is duplicated in state.

export function calcScenesNeeded(estimatedAttendees: number): number {
    return Math.ceil(estimatedAttendees / 2);
}

export function calcTotalTimeForScenes(scenesNeeded: number, timePerScene: number): number {
    return scenesNeeded * timePerScene;
}

export function calcTotalTimeForSets(numberOfTeams: number, perTeamPlannedMinutes: number): number {
    return numberOfTeams * perTeamPlannedMinutes;
}

export function calcScenesRemaining(config: JamConfiguration): number {
    const scenesNeeded = calcScenesNeeded(config.estimatedAttendees);
    const scenesScheduled = config.order.filter(item => item.kind === 'scene').length;
    return scenesNeeded - scenesScheduled;
}

// Time left for games, plus any scenes added beyond the base quota. Scenes up
// to the quota and every team's set are already accounted for in the base
// budget, so only games and "extra" scenes are subtracted here.
export function calcTimeLeftForGames(config: JamConfiguration): number {
    const scenesNeeded = calcScenesNeeded(config.estimatedAttendees);
    const totalTimeForScenes = calcTotalTimeForScenes(scenesNeeded, config.timePerScene);
    const totalTimeForSets = calcTotalTimeForSets(config.teamSets.numberOfTeams, config.teamSets.perTeamPlannedMinutes);

    let baseLeft = config.totalMinutes - config.transitionMinutes - totalTimeForSets - totalTimeForScenes;

    let scenesSeen = 0;
    for (const item of config.order) {
        if (item.kind === 'game' || item.kind === 'mashup') {
            baseLeft -= item.minutes;
        } else if (item.kind === 'scene') {
            scenesSeen += 1;
            if (scenesSeen > scenesNeeded) {
                baseLeft -= item.minutes;
            }
        }
    }
    return baseLeft;
}

// The next performing team that hasn't been scheduled into the sequence yet,
// in the order they were selected during team select. Undefined once every
// team has a 'set' entry in the sequence.
export function calcNextTeamToSchedule(config: JamConfiguration): string | undefined {
    const scheduled = config.order.filter(item => item.kind === 'set').length;
    return config.teamSets.teams[scheduled]?.teamName;
}

export function describePlannedItem(item: JamConfiguration['order'][number]): string {
    switch (item.kind) {
        case 'scene':
            return '2 person scene';
        case 'set':
            return item.teamName;
        case 'game':
            return item.gameName;
        case 'mashup':
            return 'mashup';
    }
}
