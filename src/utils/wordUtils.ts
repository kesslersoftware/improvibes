import RNFS from 'react-native-fs';
import { Platform } from 'react-native';

// Cache for loaded word lists to avoid repeated file reads
const wordCache: { [key: string]: string[] } = {};

/**
 * Reads a word file from assets and returns an array of words
 */
async function readWordFile(relativePath: string): Promise<string[]> {
  try {
    let fileContent: string;

    if (Platform.OS === 'android') {
      // Android: Use readFileAssets for files in android/app/src/main/assets/
      console.log('Reading Android asset from:', relativePath);
      fileContent = await RNFS.readFileAssets(relativePath, 'utf8');
    } else {
      // iOS: Use readFile with MainBundlePath
      const assetPath = `${RNFS.MainBundlePath}/${relativePath}`;
      console.log('Reading iOS asset from:', assetPath);
      fileContent = await RNFS.readFile(assetPath, 'utf8');
    }

    const words = fileContent
      .split('\n')
      .map(word => word.trim())
      .filter(word => word.length > 0);

    console.log(`Loaded ${words.length} words from ${relativePath}`);
    return words;
  } catch (error) {
    console.error(`Error reading word file ${relativePath}:`, error);
    return [];
  }
}

/**
 * Gets a random word from the specified word type
 */
export async function getRandomWord(wordType: string): Promise<string> {
  try {
    let words: string[] = [];

    if (wordType === 'ads_adverbs') {
      // Special case: combine adjectives and adverbs
      const adjectives = await getWordsFromFile('adjectives');
      const adverbs = await getWordsFromFile('adverbs');
      words = [...adjectives, ...adverbs];
    } else {
      words = await getWordsFromFile(wordType);
    }

    if (words.length === 0) {
      return 'No words available';
    }

    // Get a random word
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  } catch (error) {
    console.error('Error getting random word:', error);
    return 'Error loading word';
  }
}

/**
 * Gets words from a file, using cache if available
 */
async function getWordsFromFile(wordType: string): Promise<string[]> {
  // Check cache first
  if (wordCache[wordType]) {
    return wordCache[wordType];
  }

  // Determine the file path based on word type
  // For Android, react-native-asset copies all files to the 'custom' folder
  // For iOS, files maintain their original structure
  let relativePath = '';

  if (Platform.OS === 'android') {
    // Android: All files are in the 'custom' folder
    switch (wordType) {
      case 'any':
        relativePath = 'custom/allwords.txt';
        break;
      case 'nouns':
        relativePath = 'custom/nouns.txt';
        break;
      case 'adjectives':
        relativePath = 'custom/adjectives.txt';
        break;
      case 'adverbs':
        relativePath = 'custom/adverbs.txt';
        break;
      case 'location':
        relativePath = 'custom/improv_locations_small.txt';
        break;
      default:
        console.error(`Unknown word type: ${wordType}`);
        return [];
    }
  } else {
    // iOS: Files maintain original structure
    switch (wordType) {
      case 'any':
        relativePath = 'assets/words/allwords.txt';
        break;
      case 'nouns':
        relativePath = 'assets/words/nouns.txt';
        break;
      case 'adjectives':
        relativePath = 'assets/words/adjectives.txt';
        break;
      case 'adverbs':
        relativePath = 'assets/words/adverbs.txt';
        break;
      case 'location':
        relativePath = 'assets/locations/improv_locations_small.txt';
        break;
      default:
        console.error(`Unknown word type: ${wordType}`);
        return [];
    }
  }

  const words = await readWordFile(relativePath);
  wordCache[wordType] = words;
  return words;
}
