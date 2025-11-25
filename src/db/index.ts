import { openDB, type DBSchema } from 'idb';

interface G1PrepDB extends DBSchema {
    userProgress: {
        key: string;
        value: {
            sectionId: string;
            completedAt: number;
        };
    };
    quizResults: {
        key: number;
        value: {
            id?: number;
            score: number;
            totalQuestions: number;
            date: number;
        };
        indexes: { 'by-date': number };
    };
    bookmarks: {
        key: string;
        value: {
            id: string;
            type: 'section' | 'flashcard';
            contentId: string | number;
            createdAt: number;
        };
    };
    userSettings: {
        key: string;
        value: {
            key: string;
            value: string | number | boolean;
        };
    };
}

const DB_NAME = 'g1-prep-db';
const DB_VERSION = 2; // Incremented version for new store

export const initDB = async () => {
    return openDB<G1PrepDB>(DB_NAME, DB_VERSION, {
        upgrade(db, oldVersion) {
            if (!db.objectStoreNames.contains('userProgress')) {
                db.createObjectStore('userProgress', { keyPath: 'sectionId' });
            }
            if (!db.objectStoreNames.contains('quizResults')) {
                const store = db.createObjectStore('quizResults', { keyPath: 'id', autoIncrement: true });
                store.createIndex('by-date', 'date');
            }
            if (!db.objectStoreNames.contains('bookmarks')) {
                db.createObjectStore('bookmarks', { keyPath: 'id' });
            }
            if (oldVersion < 2 && !db.objectStoreNames.contains('userSettings')) {
                db.createObjectStore('userSettings', { keyPath: 'key' });
            }
        },
    });
};

export const saveProgress = async (sectionId: string) => {
    const db = await initDB();
    await db.put('userProgress', {
        sectionId,
        completedAt: Date.now(),
    });
};

export const getProgress = async () => {
    const db = await initDB();
    return db.getAll('userProgress');
};

export const saveQuizResult = async (score: number, totalQuestions: number) => {
    const db = await initDB();
    await db.add('quizResults', {
        score,
        totalQuestions,
        date: Date.now(),
    });
};

export const getQuizResults = async () => {
    const db = await initDB();
    return db.getAllFromIndex('quizResults', 'by-date');
};

export const saveUserSetting = async (key: string, value: string | number | boolean) => {
    const db = await initDB();
    await db.put('userSettings', { key, value });
};

export const getUserSetting = async (key: string) => {
    const db = await initDB();
    const setting = await db.get('userSettings', key);
    return setting?.value;
};

export const getUserName = async (): Promise<string | undefined> => {
    const name = await getUserSetting('userName');
    return typeof name === 'string' ? name : undefined;
};

export const saveUserName = async (name: string) => {
    await saveUserSetting('userName', name);
};

export const getReadSectionsCount = async (): Promise<number> => {
    const progress = await getProgress();
    return progress.length;
};

export const getAverageAccuracy = async (): Promise<number> => {
    const results = await getQuizResults();
    if (results.length === 0) return 0;

    const totalScore = results.reduce((sum, result) => sum + result.score, 0);
    const totalQuestions = results.reduce((sum, result) => sum + result.totalQuestions, 0);

    if (totalQuestions === 0) return 0;
    return Math.round((totalScore / totalQuestions) * 100);
};

export const getTestsCompletedCount = async (): Promise<number> => {
    const results = await getQuizResults();
    return results.length;
};

