// Copy this file to src/config.ts and fill in real values.
// src/config.ts is not secret and is committed to git.
//
// SHEET_ID: the id segment from the Google Sheet's URL
//   (https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit).
export const SHEET_ID = 'REPLACE_ME';

// Tab names as they appear in the Google Sheet
export const TABS = {
    OUR_GAMES:   'our_games',
    JAM_GAMES:   'jam_games',
    SHOW_LINEUP: 'show_lineup',
    REGULARS:    'regulars',
} as const;
