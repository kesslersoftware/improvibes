import { StyleSheet } from 'react-native';
import {topInset, paddingTop,bottomInset, sw, sh} from '../components/ScreenDimensionUtility';
import { COLORS, FONTS, BORDER_WIDTHS, LOADING, START_SCREEN, HOME_SCREEN, SHOW_SCREEN, JAM_SCREEN, GAMES_SCREEN,
    WARMUPS_SCREEN, DETAILS_SCREEN, TIMER_SCREEN } from './Constants';

export const sharedStyles = StyleSheet.create({
  // Outer border container
  outerBorder: {
    flex: 1,
    backgroundColor: COLORS.OUTER_BORDER,
    padding: sw * BORDER_WIDTHS.OUTER_BORDER_PERCENT,
  },

  // Inner border container
  innerBorder: {
    flex: 1,
    backgroundColor: COLORS.INNER_BORDER,
    padding: sw * BORDER_WIDTHS.INNER_BORDER_PERCENT,
  },

  // Main content area
  mainContent: {
    flex: 1,
    backgroundColor: COLORS.MAIN_SCREEN_BG,
  },
    headerBar: {
        width: sw * 0.9540,
        marginLeft: sw * 0.0240,
        marginTop: paddingTop,
        borderRadius: 20,
        height: sh * 0.0340 * 2,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',  // Added: centers children horizontally
    },

    hamburgerButton: {
        position: 'absolute',
        left: sw * 0.03,
        padding: sw * 0.01,
        justifyContent: 'center',
        alignItems: 'center',
    },

    titleText: {
        textAlign: 'center',
        fontSize: sh * 0.0262,
        fontFamily: 'Inter',
        fontWeight: '700',
        color: COLORS.BODY_TEXT_DARK,
        // Removed: width and marginLeft (now centered by parent flexbox)
    },
    hamburgerContainer: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
    },
    hamburgerHeader: {
        paddingTop: sh * 0.06,
        paddingBottom: sh * 0.02,
        paddingHorizontal: sw * 0.05,
        backgroundColor: '#007AFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    hamburgerHeaderText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.WHITE,
    },
    hamburgerMenuContainer: {
        flex: 1,
        paddingTop: sh * 0.01,
    },
    hamburgerMenuItem: {
        paddingVertical: sh * 0.02,
        paddingHorizontal: sw * 0.05,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    hamburgerMenuItemText: {
        fontSize: 16,
        color: '#333333',
    },
  // StartScreen styles
  startScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  welcomeMessageContainer: {
    width: sw * START_SCREEN.MESSAGE_WIDTH_PERCENT,
    height: sh * START_SCREEN.MESSAGE_HEIGHT_PERCENT,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: sh * 0.05,
  },

  welcomeWord: {
    fontSize: sw * 0.2,
    fontFamily: FONTS.FONT1,
    color: COLORS.START_SCREEN_TXT,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 5,
    letterSpacing: 0,
  },
    welcomeWordName: {
        fontSize: sw * 0.12,
        fontFamily: FONTS.FONT1,
        color: COLORS.START_SCREEN_TXT,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 5,
        letterSpacing: 2,
    },
  // Button styles with nested borders
  buttonOuterBorder: {
    width: sh * START_SCREEN.BUTTON_DIAMETER_PERCENT,
    height: sh * START_SCREEN.BUTTON_DIAMETER_PERCENT,
    borderRadius: (sh * START_SCREEN.BUTTON_DIAMETER_PERCENT) / 2,
    backgroundColor: COLORS.OUTER_BORDER,
    justifyContent: 'center',
    alignItems: 'center',
    padding: (sh * START_SCREEN.BUTTON_DIAMETER_PERCENT) * 0.08,
  },

  buttonInnerBorder: {
    flex: 1,
    width: '100%',
    borderRadius: (sh * START_SCREEN.BUTTON_DIAMETER_PERCENT) / 2,
    backgroundColor: COLORS.INNER_BORDER,
    justifyContent: 'center',
    alignItems: 'center',
    padding: (sh * START_SCREEN.BUTTON_DIAMETER_PERCENT) * 0.08,
  },

  buttonContent: {
    flex: 1,
    width: '100%',
    borderRadius: (sh * START_SCREEN.BUTTON_DIAMETER_PERCENT) / 2,
    backgroundColor: COLORS.MAIN_SCREEN_BG,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: sw * 0.06,
    fontWeight: '700',
    color: COLORS.START_SCREEN_TXT,
  },

  // HomeScreen styles
  homeSection1: {
    height: sh * HOME_SCREEN.SECTION_1_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  homeSection2: {
    height: sh * HOME_SCREEN.SECTION_2_HEIGHT,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: sw * 0.05,
  },

  homeSection3: {
    width: '100%',
    overflow: 'hidden',
  },

  homeSection4: {
    height: sh * HOME_SCREEN.SECTION_4_HEIGHT,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: sw * 0.05,
  },

  homeSection5: {
    width: '100%',
    overflow: 'hidden',
  },

  homeSection6: {
    height: sh * HOME_SCREEN.SECTION_6_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  homeHeaderText: {
    fontSize: sw * HOME_SCREEN.HEADER_TEXT_SIZE,
    fontWeight: '700',
    color: COLORS.DEFAULT_TEXT,
    textAlign: 'center',
  },

  // Rectangular button with double border (for Jam/Show buttons)
  homeButtonOuter: {
    height: sh * HOME_SCREEN.SECTION_2_HEIGHT * HOME_SCREEN.BTN_HEIGHT_PERCENT,
    width: sw * HOME_SCREEN.BTN_WIDTH_PERCENT,
    borderRadius: sw * HOME_SCREEN.BTN_BORDER_RADIUS,
    borderWidth: HOME_SCREEN.BTN_OUTER_BORDER_WIDTH,
    borderColor: COLORS.DETAILS_WRD_BTN_OUT_BRDR,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: sw * 0.000,
    paddingVertical: sh * 0.000,
  },

  homeButtonInner: {
    flex: 1,
    width: '100%',
    borderRadius: sw * HOME_SCREEN.BTN_BORDER_RADIUS * 0.7,
    borderWidth: HOME_SCREEN.BTN_INNER_BORDER_WIDTH,
    borderColor: COLORS.DETAILS_WRD_BTN_IN_BRDR,
    backgroundColor: COLORS.DETAILS_WRD_BTN_BG,
    justifyContent: 'center',
    alignItems: 'center',
  },

  homeButtonText: {
    fontSize: sw * HOME_SCREEN.BTN_TEXT_SIZE,
    fontWeight: '700',
    color: COLORS.DETAILS_WRD_BTN_TXT,
  },

  homeLinkText: {
    fontSize: sw * HOME_SCREEN.LINK_TEXT_SIZE,
    fontWeight: '600',
    color: COLORS.DETAILS_WRD_BTN_TXT,
    textDecorationLine: 'underline',
  },

  // Accordion styles
  homeAccordionContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    paddingHorizontal: sw * 0.05,
    paddingVertical: sh * 0.015,
    justifyContent: 'center',
  },

  homeAccordionText: {
    fontSize: sw * HOME_SCREEN.ACCORDION_TEXT_SIZE,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'left',
    lineHeight: sw * HOME_SCREEN.ACCORDION_TEXT_SIZE * 1.5,
  },

  // Loading section styles
  homeLoadingText: {
    fontSize: sw * LOADING.LOADING_TEXT_SIZE,
    fontWeight: '700',
    color: COLORS.DETAILS_SCREEN_TXT,
    textAlign: 'center',
    marginBottom: sh * 0.01,
  },

  // ShowScreen styles
  showSection1: {
    height: sh * SHOW_SCREEN.SECTION_1_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  showSection2: {
    height: sh * SHOW_SCREEN.SECTION_2_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: sw * 0.02,
  },

  showSection3: {
    height: sh * SHOW_SCREEN.SECTION_3_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  showSection4: {
    height: sh * SHOW_SCREEN.SECTION_4_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: sw * 0.02,
  },

  showSection5: {
    height: sh * SHOW_SCREEN.SECTION_5_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  showSection6: {
    height: sh * SHOW_SCREEN.SECTION_6_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  showHeaderText: {
    fontSize: sw * SHOW_SCREEN.HEADER_TEXT_SIZE,
    fontWeight: '700',
    color: COLORS.DEFAULT_TEXT,
    textAlign: 'center',
  },

  // Number selector buttons
  showNumButton: {
    height: sh * SHOW_SCREEN.SECTION_2_HEIGHT * SHOW_SCREEN.NUM_BTN_HEIGHT_PERCENT,
    minWidth: sw * SHOW_SCREEN.NUM_BTN_MIN_WIDTH,
    paddingHorizontal: sw * 0.02,
    borderRadius: sw * SHOW_SCREEN.NUM_BTN_BORDER_RADIUS,
    borderWidth: SHOW_SCREEN.NUM_BTN_BORDER_WIDTH,
    borderColor: COLORS.DETAILS_TIME_BTN_BRDR,
    backgroundColor: COLORS.DETAILS_TIME_BTN_BG,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: sw * SHOW_SCREEN.NUM_BTN_SPACING,
  },

  showNumButtonPressed: {
    backgroundColor: COLORS.DETAILS_TIME_BTN_BG_PRESSED,
  },

  showNumButtonText: {
    fontSize: sw * SHOW_SCREEN.NUM_BTN_TEXT_SIZE,
    fontWeight: '600',
    color: COLORS.DETAILS_TIME_TXT,
    textAlign: 'center',
  },

  showNumButtonTextPressed: {
    color: COLORS.DETAILS_TIME_BTN_TXT_PRESSED,
  },

  // Main "Let's start the show!" button
  showButtonOuter: {
    height: sh * SHOW_SCREEN.SECTION_5_HEIGHT * SHOW_SCREEN.BTN_HEIGHT_PERCENT,
    width: sw * SHOW_SCREEN.BTN_WIDTH_PERCENT,
    borderRadius: sw * SHOW_SCREEN.BTN_BORDER_RADIUS,
    borderWidth: SHOW_SCREEN.BTN_OUTER_BORDER_WIDTH,
    borderColor: COLORS.DETAILS_WRD_BTN_OUT_BRDR,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: sw * 0.000,
    paddingVertical: sh * 0.000,
  },

  showButtonInner: {
    flex: 1,
    width: '100%',
    borderRadius: sw * SHOW_SCREEN.BTN_BORDER_RADIUS * 0.7,
    borderWidth: SHOW_SCREEN.BTN_INNER_BORDER_WIDTH,
    borderColor: COLORS.DETAILS_WRD_BTN_IN_BRDR,
    backgroundColor: COLORS.DETAILS_WRD_BTN_BG,
    justifyContent: 'center',
    alignItems: 'center',
  },

  showButtonText: {
    fontSize: sw * SHOW_SCREEN.BTN_TEXT_SIZE,
    fontWeight: '700',
    color: COLORS.DETAILS_WRD_BTN_TXT,
  },

  showButtonDisabled: {
    opacity: 0.5,
  },

  showLoadingText: {
    fontSize: sw * LOADING.LOADING_TEXT_SIZE,
    fontWeight: '700',
    color: COLORS.DETAILS_SCREEN_TXT,
    textAlign: 'center',
  },

  // JamScreen styles
  jamSection1: {
    height: sh * JAM_SCREEN.SECTION_1_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  jamSection2: {
    height: sh * JAM_SCREEN.SECTION_2_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  jamSection3: {
    height: sh * JAM_SCREEN.SECTION_3_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  jamSection4: {
    height: sh * JAM_SCREEN.SECTION_4_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  jamHeaderText: {
    fontSize: sw * JAM_SCREEN.HEADER_TEXT_SIZE,
    fontWeight: '700',
    color: COLORS.DEFAULT_TEXT,
    textAlign: 'center',
  },

  // Jam button with double border (centered)
  jamButtonOuter: {
    height: sh * JAM_SCREEN.SECTION_2_HEIGHT * JAM_SCREEN.BTN_HEIGHT_PERCENT,
    width: sw * JAM_SCREEN.BTN_WIDTH_PERCENT,
    borderRadius: sw * JAM_SCREEN.BTN_BORDER_RADIUS,
    borderWidth: JAM_SCREEN.BTN_OUTER_BORDER_WIDTH,
    borderColor: COLORS.DETAILS_WRD_BTN_OUT_BRDR,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: sw * 0.000,
    paddingVertical: sh * 0.000,
  },

  jamButtonInner: {
    flex: 1,
    width: '100%',
    borderRadius: sw * JAM_SCREEN.BTN_BORDER_RADIUS * 0.7,
    borderWidth: JAM_SCREEN.BTN_INNER_BORDER_WIDTH,
    borderColor: COLORS.DETAILS_WRD_BTN_IN_BRDR,
    backgroundColor: COLORS.DETAILS_WRD_BTN_BG,
    justifyContent: 'center',
    alignItems: 'center',
  },

  jamButtonText: {
    fontSize: sw * JAM_SCREEN.BTN_TEXT_SIZE,
    fontWeight: '700',
    color: COLORS.DETAILS_WRD_BTN_TXT,
  },

  jamLoadingText: {
    fontSize: sw * LOADING.LOADING_TEXT_SIZE,
    fontWeight: '700',
    color: COLORS.DETAILS_SCREEN_TXT,
    textAlign: 'center',
  },

  backButtonSection: {
    height: sh * JAM_SCREEN.BOTTOM_BTN_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButton: {
    height: sh * JAM_SCREEN.BOTTOM_BTN_HEIGHT * JAM_SCREEN.BOTTOM_BTN_HEIGHT_PERCENT,
    width: sw * JAM_SCREEN.BOTTOM_BTN_WIDTH_PERCENT,
    borderRadius: sw * JAM_SCREEN.BOTTOM_BTN_BORDER_RADIUS,
    borderWidth: JAM_SCREEN.BOTTOM_BTN_BORDER_WIDTH,
    borderColor: COLORS.DETAILS_WRD_BTN_OUT_BRDR,
    backgroundColor: COLORS.DETAILS_WRD_BTN_BG,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButtonText: {
    fontSize: sw * 0.04,
    fontWeight: '700',
    color: COLORS.DETAILS_WRD_BTN_TXT,
  },

  // GameScreen styles
  gameSection1: {
    height: sh * GAMES_SCREEN.SECTION_1_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  gameSection2: {
    height: sh * GAMES_SCREEN.SECTION_2_HEIGHT,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  gameSection3: {
    height: sh * GAMES_SCREEN.SECTION_3_HEIGHT,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingHorizontal: sw * GAMES_SCREEN.HORIZONTAL_PADDING,
  },

  gameSection4: {
    height: sh * GAMES_SCREEN.SECTION_4_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: sw * GAMES_SCREEN.HORIZONTAL_PADDING,
  },

  gameSection5: {
    height: sh * GAMES_SCREEN.SECTION_5_HEIGHT,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: sw * GAMES_SCREEN.HORIZONTAL_PADDING,
  },

  gameSection6: {
    height: sh * GAMES_SCREEN.SECTION_6_HEIGHT,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  gameSection7: {
    height: sh * GAMES_SCREEN.SECTION_7_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  gameHeaderText: {
    fontSize: sw * GAMES_SCREEN.HEADER_TEXT_SIZE,
    fontWeight: '700',
    color: COLORS.DEFAULT_TEXT,
    textAlign: 'center',
  },

  // Dropdown picker
  gameDropdown: {
    width: sw * GAMES_SCREEN.DROPDOWN_WIDTH_PERCENT,
    height: sh * GAMES_SCREEN.SECTION_2_HEIGHT * GAMES_SCREEN.DROPDOWN_HEIGHT_PERCENT,
    borderRadius: sw * GAMES_SCREEN.DROPDOWN_BORDER_RADIUS,
    borderWidth: GAMES_SCREEN.DROPDOWN_BORDER_WIDTH,
    borderColor: COLORS.DETAILS_WRD_BTN_OUT_BRDR,
    backgroundColor: COLORS.DETAILS_WRD_BTN_BG,
    justifyContent: 'center',
    paddingHorizontal: sw * 0.03,
  },

  gameDropdownText: {
    fontSize: sw * GAMES_SCREEN.DROPDOWN_TEXT_SIZE,
    fontWeight: '600',
    color: COLORS.DETAILS_WRD_BTN_TXT,
  },

  // Random game button
  gameRandomButton: {
    width: sw * GAMES_SCREEN.RANDOM_BTN_WIDTH_PERCENT,
    height: sh * GAMES_SCREEN.SECTION_2_HEIGHT * GAMES_SCREEN.RANDOM_BTN_HEIGHT_PERCENT,
    borderRadius: sw * GAMES_SCREEN.RANDOM_BTN_BORDER_RADIUS,
    borderWidth: GAMES_SCREEN.RANDOM_BTN_BORDER_WIDTH,
    borderColor: COLORS.DETAILS_WRD_BTN_OUT_BRDR,
    backgroundColor: COLORS.DETAILS_WRD_BTN_BG,
    justifyContent: 'center',
    alignItems: 'center',
  },

  gameRandomButtonText: {
    fontSize: sw * GAMES_SCREEN.RANDOM_BTN_TEXT_SIZE,
    fontWeight: '700',
    color: COLORS.DETAILS_WRD_BTN_TXT,
  },

  // Game info text
  gameInfoText: {
    fontSize: sw * GAMES_SCREEN.INFO_TEXT_SIZE,
    fontWeight: '600',
    color: COLORS.DEFAULT_TEXT,
    textAlign: 'left',
  },

  // Rules label
  gameRulesLabel: {
    fontSize: sw * GAMES_SCREEN.RULES_LABEL_TEXT_SIZE,
    fontWeight: '600',
    color: COLORS.DEFAULT_TEXT,
    textAlign: 'left',
    marginBottom: sh * 0.01,
  },

  // Rules textarea
  gameRulesContainer: {
    width: '100%',
    height: '80%',
    borderRadius: sw * 0.02,
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: '#ffffff',
    padding: sw * 0.04,
  },

  gameRulesText: {
    fontSize: sw * GAMES_SCREEN.RULES_TEXT_SIZE,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'left',
    lineHeight: sw * GAMES_SCREEN.RULES_TEXT_SIZE * 1.5,
  },

  // Game button with double border
  gameButtonOuter: {
    height: sh * GAMES_SCREEN.SECTION_6_HEIGHT * GAMES_SCREEN.BTN_HEIGHT_PERCENT,
    width: sw * GAMES_SCREEN.BTN_WIDTH_PERCENT,
    borderRadius: sw * GAMES_SCREEN.BTN_BORDER_RADIUS,
    borderWidth: GAMES_SCREEN.BTN_OUTER_BORDER_WIDTH,
    borderColor: COLORS.DETAILS_WRD_BTN_OUT_BRDR,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: sw * 0.000,
    paddingVertical: sh * 0.000,
  },

  gameButtonInner: {
    flex: 1,
    width: '100%',
    borderRadius: sw * GAMES_SCREEN.BTN_BORDER_RADIUS * 0.7,
    borderWidth: GAMES_SCREEN.BTN_INNER_BORDER_WIDTH,
    borderColor: COLORS.DETAILS_WRD_BTN_IN_BRDR,
    backgroundColor: COLORS.DETAILS_WRD_BTN_BG,
    justifyContent: 'center',
    alignItems: 'center',
  },

  gameButtonText: {
    fontSize: sw * GAMES_SCREEN.BTN_TEXT_SIZE,
    fontWeight: '700',
    color: COLORS.DETAILS_WRD_BTN_TXT,
  },

  gameLoadingText: {
    fontSize: sw * LOADING.LOADING_TEXT_SIZE,
    fontWeight: '700',
    color: COLORS.DETAILS_SCREEN_TXT,
    textAlign: 'center',
  },

  // WarmupsScreen styles
  warmupsBottomBtnSection: {
    height: sh * WARMUPS_SCREEN.BOTTOM_BTN_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  warmupsBottomButton: {
    height: sh * WARMUPS_SCREEN.BOTTOM_BTN_HEIGHT * WARMUPS_SCREEN.BOTTOM_BTN_HEIGHT_PERCENT,
    width: sw * WARMUPS_SCREEN.BOTTOM_BTN_WIDTH_PERCENT,
    borderRadius: sw * WARMUPS_SCREEN.BOTTOM_BTN_BORDER_RADIUS,
    borderWidth: WARMUPS_SCREEN.BOTTOM_BTN_BORDER_WIDTH,
    borderColor: COLORS.DETAILS_WRD_BTN_OUT_BRDR,
    backgroundColor: COLORS.DETAILS_WRD_BTN_BG,
    justifyContent: 'center',
    alignItems: 'center',
  },

  warmupsBottomButtonText: {
    fontSize: sw * 0.04,
    fontWeight: '700',
    color: COLORS.DETAILS_WRD_BTN_TXT,
  },

  // DetailsScreen styles
  // Section containers
  detailsSection1: {
    height: sh * DETAILS_SCREEN.SECTION_1_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: sw * 0.02,
  },

  detailsSection2: {
    height: sh * DETAILS_SCREEN.SECTION_2_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: sw * 0.02,
  },

  detailsSection3: {
    height: sh * DETAILS_SCREEN.SECTION_3_HEIGHT,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: sw * 0.04,
    paddingTop: sh * 0.005,
  },

  detailsSection3b: {
    height: sh * DETAILS_SCREEN.SECTION_3B_HEIGHT,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  detailsSection3c: {
    height: sh * DETAILS_SCREEN.SECTION_3C_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  detailsSection4: {
    height: sh * DETAILS_SCREEN.SECTION_4_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  detailsSection5: {
    height: sh * DETAILS_SCREEN.SECTION_5_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  detailsSection6: {
    height: sh * DETAILS_SCREEN.SECTION_6_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Section 3 header
  wordChoiceHeader: {
    fontSize: sw * 0.04,
    fontWeight: '700',
    color: COLORS.DETAILS_SCREEN_TXT,
    marginBottom: sh * 0.005,
  },

  // Section 3 grid container
  wordGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },

  // Time/People button (single border)
  timeButton: {
    height: sh * DETAILS_SCREEN.SECTION_1_HEIGHT * DETAILS_SCREEN.TIME_BTN_HEIGHT_PERCENT,
    minWidth: sw * DETAILS_SCREEN.TIME_BTN_MIN_WIDTH,
    paddingHorizontal: sw * 0.02,
    borderRadius: sw * DETAILS_SCREEN.TIME_BTN_BORDER_RADIUS,
    borderWidth: DETAILS_SCREEN.TIME_BTN_BORDER_WIDTH,
    borderColor: COLORS.DETAILS_TIME_BTN_BRDR,
    backgroundColor: COLORS.DETAILS_TIME_BTN_BG,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: sw * DETAILS_SCREEN.TIME_BTN_SPACING,
  },

  timeButtonPressed: {
    backgroundColor: COLORS.DETAILS_TIME_BTN_BG_PRESSED,
  },

  sceneDetailsText: {
    fontSize: sw * 0.04,
    fontWeight: '900',
    color: COLORS.DETAILS_TIME_TXT,
    textAlign: 'center',
  },

    timeButtonText: {
        fontSize: sw * 0.06,
        fontWeight: '600',
        color: COLORS.DETAILS_TIME_TXT,
        textAlign: 'center',
    },

  timeButtonTextPressed: {
    color: COLORS.DETAILS_TIME_BTN_TXT_PRESSED,
  },

  // Word choice button (double border)
  wordButtonOuter: {
    width: sw * DETAILS_SCREEN.WORD_BTN_WIDTH_PERCENT,
    aspectRatio: 1,
    borderRadius: sw * DETAILS_SCREEN.WORD_BTN_BORDER_RADIUS,
    borderWidth: DETAILS_SCREEN.WORD_BTN_OUTER_BORDER_WIDTH,
    borderColor: COLORS.DETAILS_WRD_BTN_OUT_BRDR,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: sw * DETAILS_SCREEN.WORD_BTN_SPACING,
    marginVertical: sh * 0.005,
  },
  wordButtonInner: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: sw * DETAILS_SCREEN.WORD_BTN_BORDER_RADIUS * 0.7,
    borderWidth: DETAILS_SCREEN.WORD_BTN_INNER_BORDER_WIDTH,
    borderColor: COLORS.DETAILS_WRD_BTN_IN_BRDR,
    backgroundColor: COLORS.DETAILS_WRD_BTN_BG,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  wordButtonInnerPressed: {
    borderColor: COLORS.DETAILS_WRD_BTN_IN_BRDR_PRESSED,
  },
  wordButtonText: {
    fontSize: sw * 0.035,
    fontWeight: '700',
    color: COLORS.DETAILS_WRD_BTN_TXT,
    textAlign: 'center',
  },

  // OR text
  orText: {
    fontSize: sw * DETAILS_SCREEN.OR_TEXT_SIZE,
    fontWeight: '900',
    color: COLORS.DETAILS_SCREEN_TXT,
    textAlign: 'center',
  },

  // Game button
  gameButton: {
    height: sh * DETAILS_SCREEN.SECTION_5_HEIGHT * DETAILS_SCREEN.GAME_BTN_HEIGHT_PERCENT,
    width: sw * DETAILS_SCREEN.GAME_BTN_WIDTH_PERCENT,
    borderRadius: sw * DETAILS_SCREEN.GAME_BTN_BORDER_RADIUS,
    backgroundColor: COLORS.DETAILS_WRD_BTN_BG,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.DETAILS_WRD_BTN_OUT_BRDR,
  },

  // Make word button (section 3b)
  makeWordButton: {
    height: sh * DETAILS_SCREEN.SECTION_3B_HEIGHT * DETAILS_SCREEN.MAKE_WORD_BTN_HEIGHT_PERCENT,
    width: sw * DETAILS_SCREEN.MAKE_WORD_BTN_WIDTH_PERCENT,
    borderRadius: sw * DETAILS_SCREEN.MAKE_WORD_BTN_BORDER_RADIUS,
    backgroundColor: COLORS.GEN_BTN_BG,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: DETAILS_SCREEN.MAKE_WORD_BTN_BORDER_WIDTH,
    borderColor: COLORS.GEN_BTN_BRDR,
  },

  makeWordButtonDisabled: {
    opacity: 0.5,
  },

  makeWordButtonText: {
    fontSize: sw * DETAILS_SCREEN.MAKE_WORD_BTN_SIZE,
    fontWeight: '700',
    color: COLORS.GEN_BTN_TXT,
    textAlign: 'center',
    includeFontPadding: false,
  },

  // Word display (section 3c)
  wordDisplayText: {
    fontSize: sw * DETAILS_SCREEN.WORD_DISPLAY_TEXT_SIZE,
    fontWeight: '900',
    color: COLORS.DETAILS_SCREEN_TXT,
    textAlign: 'center',
  },

  // Start button (round)
  startButton: {
    width: sh * DETAILS_SCREEN.START_BTN_SIZE_PERCENT,
    height: sh * DETAILS_SCREEN.START_BTN_SIZE_PERCENT,
    borderRadius: (sh * DETAILS_SCREEN.START_BTN_SIZE_PERCENT) / 2,
    backgroundColor: COLORS.DETAILS_WRD_BTN_BG,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: COLORS.DETAILS_WRD_BTN_OUT_BRDR,
  },

  startButtonDisabled: {
    opacity: 0.5,
  },

  startButtonText: {
    fontSize: sw * 0.055,
    fontWeight: '900',
    color: COLORS.DETAILS_WRD_BTN_TXT,
    textAlign: 'center',
  },

  // TimerScreen styles
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  timerSection: {
    height: sh * TIMER_SCREEN.TIMER_SECTION_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  timerText: {
    fontSize: sw * TIMER_SCREEN.TIMER_TEXT_SIZE,
    fontWeight: '900',
    color: COLORS.TIMER_PG_TXT,
    textAlign: 'center',
    fontFamily: FONTS.FONT1,
  },

  flagContainer: {
    marginTop: sh * TIMER_SCREEN.FLAG_MARGIN_TOP,
  },

  flagText: {
    fontSize: sw * TIMER_SCREEN.FLAG_SIZE,
    textAlign: 'center',
  },
});