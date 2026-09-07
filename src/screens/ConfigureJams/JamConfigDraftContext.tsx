import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { JamConfiguration } from '../../models/JamConfiguration';
import { loadSavedJam, saveJam } from '../../utils/syncService';

function buildBlankConfiguration(): JamConfiguration {
    return {
        totalMinutes: 0,
        transitionMinutes: 0,
        estimatedAttendees: 0,
        timePerScene: 0,
        teamSets: {
            numberOfTeams: 0,
            perTeamPlannedMinutes: 0,
            teams: [],
            actualTeamMinutes: {},
        },
        order: [],
    };
}

function buildNewJamName(): string {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const year = now.getFullYear();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const hours24 = now.getHours();
    const hour12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
    const meridiem = hours24 < 12 ? 'AM' : 'PM';
    return `improvibes-jam-${month}-${day}-${year}-${hour12}-${minutes}-${meridiem}`;
}

interface JamConfigDraftValue {
    config: JamConfiguration;
    setConfig: (config: JamConfiguration) => void;
    configName: string | undefined;
    ready: boolean;
    persist: () => Promise<void>;
    resetToBlank: () => void;
}

const JamConfigDraftContext = createContext<JamConfigDraftValue | undefined>(undefined);

export function JamConfigDraftProvider({ name, children }: { name?: string; children: ReactNode }) {
    const [config, setConfig] = useState<JamConfiguration>(buildBlankConfiguration());
    const [configName, setConfigName] = useState<string | undefined>(name);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (name) {
            loadSavedJam(name).then(loaded => {
                if (loaded) setConfig(loaded);
                setReady(true);
            });
        } else {
            const newName = buildNewJamName();
            const blank = buildBlankConfiguration();
            saveJam(newName, blank).then(() => {
                setConfigName(newName);
                setConfig(blank);
                setReady(true);
            });
        }
    }, [name]);

    const persist = async () => {
        if (configName) {
            await saveJam(configName, config);
        }
    };

    const resetToBlank = () => {
        setConfig(buildBlankConfiguration());
    };

    return (
        <JamConfigDraftContext.Provider value={{ config, setConfig, configName, ready, persist, resetToBlank }}>
            {children}
        </JamConfigDraftContext.Provider>
    );
}

export function useJamConfigDraft(): JamConfigDraftValue {
    const ctx = useContext(JamConfigDraftContext);
    if (!ctx) {
        throw new Error('useJamConfigDraft must be used within a JamConfigDraftProvider');
    }
    return ctx;
}
