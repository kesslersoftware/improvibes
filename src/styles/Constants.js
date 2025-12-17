// Color Scheme
export const COLORS = {
  OUTER_BORDER: '#ff3399',
  INNER_BORDER: '#ffcc00',
  DEFAULT_BG: '#99ccff',
  DEFAULT_TEXT: '#6600cc',
  DEFAULT_BTN_BRDR: '',
  MAIN_SCREEN_BG: '#99ccff', //cc6699
  START_SCREEN_TXT: '#6600cc',
  DETAILS_SCREEN_TXT: '#6600cc',
  DETAILS_TIME_BTN_BRDR: '#ff3399',
  DETAILS_TIME_BTN_BG: '#ccffff',
  DETAILS_TIME_BTN_BG_PRESSED: '#0066cc',
  DETAILS_TIME_TXT: '#6600cc',
  DETAILS_TIME_BTN_TXT_PRESSED: '#ffffff',
  DETAILS_WRD_BTN_OUT_BRDR: '#ff3399',
  DETAILS_WRD_BTN_IN_BRDR: '#ffcc00',
  DETAILS_WRD_BTN_IN_BRDR_PRESSED: '#0066cc',
  DETAILS_RD_BTN_OUT_BRDR: '#ff3399',
  DETAILS_RD_BTN_IN_BRDR: '#ffcc00',
  DETAILS_WRD_BTN_BG: '#ccffff',
  DETAILS_WRD_BTN_TXT: '#6600cc',
  DETAILS_RD_BTN_BG: '#ccffff',
  DETAILS_RD_BTN_TXT: '#6600cc',
  GEN_BTN_BRDR: '#ff3399',
  GEN_BTN_BG: '#ccffff',
  GEN_BTN_TXT: '#6600cc',
  GAMES_SCREEN_BG: '#ccffff',
  TIMER_PG_TXT: '#6600cc',
}

// Border Widths (as percentages)
export const BORDER_WIDTHS = {
  OUTER_BORDER_PERCENT: 0.02,  // 2% of screen width
  INNER_BORDER_PERCENT: 0.03,  // 3% of inner dimensions
}

// Global Loading Constants (shared across all screens)
export const LOADING = {
  LOADING_DELAY: 0.75,             // Delay before navigation (2 seconds)
  LOADING_TEXT_SIZE: 0.05,         // 5% of screen width
}

// StartScreen Dimensions (as percentages)
export const START_SCREEN = {
  MESSAGE_WIDTH_PERCENT: 0.98,   // 98% of inner container width
  MESSAGE_HEIGHT_PERCENT: 0.60,  // 60% of inner container height
  BUTTON_DIAMETER_PERCENT: 0.20, // 20% of inner container height
}

export const HOME_SCREEN = {
  // Section heights
  SECTION_1_HEIGHT: 0.10,          // 10% - "do you want to..." text
  SECTION_2_HEIGHT: 0.12,          // 12% - Jam button
  SECTION_3_COLLAPSED: 0,          // 0% - Jam accordion collapsed
  SECTION_3_EXPANDED: 0.22,        // 22% - Jam accordion expanded
  SECTION_4_HEIGHT: 0.12,          // 12% - Show button
  SECTION_5_COLLAPSED: 0,          // 0% - Show accordion collapsed
  SECTION_5_EXPANDED: 0.25,        // 25% - Show accordion expanded
  SECTION_6_HEIGHT: 0.15,          // 15% - Loading section

  // Button dimensions (rectangular double border)
  BTN_OUTER_BORDER_WIDTH: 6,       // Outer border width in px
  BTN_INNER_BORDER_WIDTH: 6,       // Inner border width in px
  BTN_HEIGHT_PERCENT: 0.65,        // 65% of section height
  BTN_WIDTH_PERCENT: 0.50,         // 55% of screen width (button only)
  BTN_BORDER_RADIUS: 0.03,         // 3% of screen width
  BTN_TEXT_SIZE: 0.055,            // 5.5% of screen width

  // Accordion animation timings
  ACCORDION_DURATION: 500,         // Animation duration in ms
  JAM_ACCORDION_PAUSE: 3000,       // Pause duration before closing (3 seconds)
  SHOW_ACCORDION_PAUSE: 4000,      // Pause duration before closing (4 seconds)

  // Text sizes
  HEADER_TEXT_SIZE: 0.06,          // 6% of screen width
  LINK_TEXT_SIZE: 0.04,            // 4% of screen width
  ACCORDION_TEXT_SIZE: 0.038,      // 3.8% of screen width
}

export const SHOW_SCREEN = {
  // Section heights
  SECTION_1_HEIGHT: 0.08,          // 8% - "How many Teams are performing?" header
  SECTION_2_HEIGHT: 0.10,          // 10% - Team number selector
  SECTION_3_HEIGHT: 0.08,          // 8% - "How long is the show?" header
  SECTION_4_HEIGHT: 0.12,          // 12% - Duration selector
  SECTION_5_HEIGHT: 0.12,          // 12% - "Let's start the show!" button
  SECTION_6_HEIGHT: 0.15,          // 15% - Loading section
  BOTTOM_BTN_HEIGHT: 0.10,         // 10% - "Back to Jam!" button

  // Number selector button dimensions
  NUM_BTN_HEIGHT_PERCENT: 0.60,    // 60% of section height
  NUM_BTN_MIN_WIDTH: 0.10,         // Minimum 10% of screen width
  NUM_BTN_BORDER_RADIUS: 0.02,     // 2% of screen width
  NUM_BTN_BORDER_WIDTH: 2,         // 2px border
  NUM_BTN_SPACING: 0.005,          // 0.5% spacing between buttons

  // Main button dimensions
  BTN_OUTER_BORDER_WIDTH: 6,       // Outer border width in px
  BTN_INNER_BORDER_WIDTH: 6,       // Inner border width in px
  BTN_HEIGHT_PERCENT: 0.65,        // 65% of section height
  BTN_WIDTH_PERCENT: 0.70,         // 70% of screen width
  BTN_BORDER_RADIUS: 0.03,         // 3% of screen width
  BTN_TEXT_SIZE: 0.05,             // 5% of screen width

  // Bottom button dimensions
  BOTTOM_BTN_WIDTH_PERCENT: 0.50,  // 50% of screen width
  BOTTOM_BTN_HEIGHT_PERCENT: 0.60, // 60% of section height
  BOTTOM_BTN_BORDER_RADIUS: 0.03,  // 3% of screen width
  BOTTOM_BTN_BORDER_WIDTH: 3,      // 3px border

  // Text sizes
  HEADER_TEXT_SIZE: 0.055,         // 5.5% of screen width
  NUM_BTN_TEXT_SIZE: 0.035,        // 3.5% of screen width
}

export const JAM_SCREEN = {
  // Section heights
  SECTION_1_HEIGHT: 0.15,          // 15% - "Let's Jam!" header
  SECTION_2_HEIGHT: 0.12,          // 12% - Warmups button
  SECTION_3_HEIGHT: 0.12,          // 12% - Games button
  SECTION_4_HEIGHT: 0.15,          // 15% - Loading section
  BOTTOM_BTN_HEIGHT: 0.10,         // 10% - "Back to Home!" button

  // Button dimensions (reuse HOME_SCREEN values)
  BTN_OUTER_BORDER_WIDTH: 6,       // Outer border width in px
  BTN_INNER_BORDER_WIDTH: 6,       // Inner border width in px
  BTN_HEIGHT_PERCENT: 0.65,        // 65% of section height
  BTN_WIDTH_PERCENT: 0.70,         // 70% of screen width (centered button)
  BTN_BORDER_RADIUS: 0.03,         // 3% of screen width
  BTN_TEXT_SIZE: 0.055,            // 5.5% of screen width

  // Bottom button dimensions
  BOTTOM_BTN_WIDTH_PERCENT: 0.50,  // 50% of screen width
  BOTTOM_BTN_HEIGHT_PERCENT: 0.60, // 60% of section height
  BOTTOM_BTN_BORDER_RADIUS: 0.03,  // 3% of screen width
  BOTTOM_BTN_BORDER_WIDTH: 3,      // 3px border

  // Text sizes
  HEADER_TEXT_SIZE: 0.08,          // 8% of screen width
}

export const GAMES_SCREEN = {
  // Section heights
  SECTION_1_HEIGHT: 0.10,          // 10% - Header text
  SECTION_2_HEIGHT: 0.14,          // 14% - Dropdown selector + random button
  SECTION_3_HEIGHT: 0.06,          // 6% - Number of players
  SECTION_4_HEIGHT: 0.06,          // 6% - Length of game
  SECTION_5_HEIGHT: 0.35,          // 35% - Rules textarea (increased for scrollable content)
  SECTION_6_HEIGHT: 0.12,          // 12% - "let's play!" button
  SECTION_7_HEIGHT: 0.12,          // 12% - Loading section
  BOTTOM_BTN_HEIGHT: 0.10,         // 10% - "Back to Jam!" button

  // Dropdown dimensions
  DROPDOWN_WIDTH_PERCENT: 0.80,    // 80% of screen width
  DROPDOWN_HEIGHT_PERCENT: 0.35,   // 35% of section height (reduced to make room for button)
  DROPDOWN_BORDER_RADIUS: 0.02,    // 2% of screen width
  DROPDOWN_BORDER_WIDTH: 2,        // 2px border
  DROPDOWN_TEXT_SIZE: 0.04,        // 4% of screen width

  // Random button dimensions
  RANDOM_BTN_WIDTH_PERCENT: 0.45,  // 45% of screen width
  RANDOM_BTN_HEIGHT_PERCENT: 0.35, // 35% of section height
  RANDOM_BTN_BORDER_RADIUS: 0.02,  // 2% of screen width
  RANDOM_BTN_BORDER_WIDTH: 3,      // 3px border
  RANDOM_BTN_TEXT_SIZE: 0.035,     // 3.5% of screen width

  // Button dimensions
  BTN_OUTER_BORDER_WIDTH: 6,       // Outer border width in px
  BTN_INNER_BORDER_WIDTH: 6,       // Inner border width in px
  BTN_HEIGHT_PERCENT: 0.65,        // 65% of section height
  BTN_WIDTH_PERCENT: 0.60,         // 60% of screen width
  BTN_BORDER_RADIUS: 0.03,         // 3% of screen width
  BTN_TEXT_SIZE: 0.05,             // 5% of screen width

  // Bottom button dimensions
  BOTTOM_BTN_WIDTH_PERCENT: 0.50,  // 50% of screen width
  BOTTOM_BTN_HEIGHT_PERCENT: 0.60, // 60% of section height
  BOTTOM_BTN_BORDER_RADIUS: 0.03,  // 3% of screen width
  BOTTOM_BTN_BORDER_WIDTH: 3,      // 3px border

  // Text sizes
  HEADER_TEXT_SIZE: 0.055,         // 5.5% of screen width
  INFO_TEXT_SIZE: 0.045,           // 4.5% of screen width
  RULES_LABEL_TEXT_SIZE: 0.035,    // 3.5% of screen width
  RULES_TEXT_SIZE: 0.038,          // 3.8% of screen width

  // Padding
  HORIZONTAL_PADDING: 0.10,        // 10% horizontal padding for alignment
}
export const WARMUPS_SCREEN = {
  // Bottom button section
  BOTTOM_BTN_HEIGHT: 0.10,         // 10% - "Back to Jam!" button
  BOTTOM_BTN_WIDTH_PERCENT: 0.50,  // 50% of screen width
  BOTTOM_BTN_HEIGHT_PERCENT: 0.60, // 60% of section height
  BOTTOM_BTN_BORDER_RADIUS: 0.03,  // 3% of screen width
  BOTTOM_BTN_BORDER_WIDTH: 3,      // 3px border
}

// DetailsScreen Dimensions (as percentages)
export const DETAILS_SCREEN = {
  // Section heights
  SECTION_1_HEIGHT: 0.09,   // 9% - number of people
  SECTION_2_HEIGHT: 0.09,   // 9% - length of scene
  SECTION_3_HEIGHT: 0.30,   // 30% - word choices
  SECTION_3B_HEIGHT: 0.09,  // 9% - make a word button
  SECTION_3C_HEIGHT: 0.10,  // 10% - word display
  SECTION_4_HEIGHT: 0.06,   // 6% - OR text
  SECTION_5_HEIGHT: 0.06,   // 6% - game button
  SECTION_6_HEIGHT: 0.21,   // 21% - start button

  // Button dimensions
  TIME_BTN_HEIGHT_PERCENT: 0.6,  // 70% of section height
  TIME_BTN_MIN_WIDTH: 0.08,       // Minimum 8% of screen width
  TIME_BTN_BORDER_RADIUS: 0.02,   // 2% of screen width for rounded corners
  TIME_BTN_BORDER_WIDTH: 2,       // 2px border
  TIME_BTN_SPACING: 0.005,        // 0.5% spacing between buttons (reduced)

  WORD_BTN_OUTER_BORDER_WIDTH: 6, // Outer border width in px
  WORD_BTN_INNER_BORDER_WIDTH: 6, // Inner border width in px
  WORD_BTN_BORDER_RADIUS: 0.03,   // 3% of screen width for rounded corners
  WORD_BTN_SPACING: 0.000,        // 0.5% spacing between buttons
  WORD_BTN_WIDTH_PERCENT: 0.22,   // 28% of screen width per button (3 columns)

  MAKE_WORD_BTN_HEIGHT_PERCENT: 0.65,  // 65% of section height
  MAKE_WORD_BTN_WIDTH_PERCENT: 0.50,   // 50% of screen width
  MAKE_WORD_BTN_BORDER_RADIUS: 0.03,   // 3% of screen width
  MAKE_WORD_BTN_BORDER_WIDTH: 4,       // 3px border
  MAKE_WORD_BTN_SIZE: 0.070,
  WORD_DISPLAY_TEXT_SIZE: 0.15,   // 6% of screen width
  WORD_DELAY_MS: 1000,            // 1 second delay before showing word

  GAME_BTN_HEIGHT_PERCENT: 0.65,  // 65% of section height
  GAME_BTN_WIDTH_PERCENT: 0.60,   // 60% of screen width
  GAME_BTN_BORDER_RADIUS: 0.03,   // 3% of screen width

  START_BTN_SIZE_PERCENT: 0.18,   // 18% of screen height (for round button)

  OR_TEXT_SIZE: 0.08,             // 8% of screen width
}

export const TIMER_SCREEN = {
  // Timer display
  TIMER_TEXT_SIZE: 0.25,          // 25% of screen width for timer text
  TIMER_SECTION_HEIGHT: 0.70,     // 70% of screen height for timer area

  TIMER_SCREEN_GAME_LOGO: 'Begin!',
  // Flag animation
  FLAG_SIZE: 0.15,                // 15% of screen width for flag
  FLAG_MARGIN_TOP: 0.03,          // 3% margin above flag

  // Details button
  DETAILS_BTN_SIZE_PERCENT: 0.15,    // 15% of screen height (round button)
  DETAILS_BTN_SECTION_HEIGHT: 0.20,  // 20% of screen height for button area
  DETAILS_BTN_BOTTOM_MARGIN: 0.02,   // 2% margin from bottom
}