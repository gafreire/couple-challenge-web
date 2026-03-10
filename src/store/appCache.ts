import { create } from 'zustand';
import type { Challenge, ChallengeScore } from '../types/challenge.types';
import type { CoupleWithUsers, Couple, InviteWithUser } from '../types/couple.types';
import type { TaskWithCount } from '../types/task.types';
import type { UserProfile } from '../types/user.types';

interface AppCache {
  // Dashboard
  dashboardCouple: CoupleWithUsers | null;
  dashboardChallenge: Challenge | null;
  dashboardScore: ChallengeScore | null;
  dashboardTasks: TaskWithCount[];

  // Challenges
  activeChallenge: Challenge | null;
  challenges: Challenge[];
  challengeScore: ChallengeScore | null;
  challengesCouple: CoupleWithUsers | null;

  // Tasks
  tasksChallenge: Challenge | null;
  tasks: TaskWithCount[];

  // Couple
  coupleData: CoupleWithUsers | null;
  pendingCouple: Couple | null;
  invites: InviteWithUser[];

  // Profile
  profile: UserProfile | null;

  setDashboard: (data: Partial<Pick<AppCache, 'dashboardCouple' | 'dashboardChallenge' | 'dashboardScore' | 'dashboardTasks'>>) => void;
  setChallenges: (data: Partial<Pick<AppCache, 'activeChallenge' | 'challenges' | 'challengeScore' | 'challengesCouple'>>) => void;
  setTasks: (data: Partial<Pick<AppCache, 'tasksChallenge' | 'tasks'>>) => void;
  setCouple: (data: Partial<Pick<AppCache, 'coupleData' | 'pendingCouple' | 'invites'>>) => void;
  setProfile: (profile: UserProfile | null) => void;
  clearCache: () => void;
}

export const useAppCache = create<AppCache>((set) => ({
  // Dashboard
  dashboardCouple: null,
  dashboardChallenge: null,
  dashboardScore: null,
  dashboardTasks: [],

  // Challenges
  activeChallenge: null,
  challenges: [],
  challengeScore: null,
  challengesCouple: null,

  // Tasks
  tasksChallenge: null,
  tasks: [],

  // Couple
  coupleData: null,
  pendingCouple: null,
  invites: [],

  // Profile
  profile: null,

  setDashboard: (data) => set((state) => ({ ...state, ...data })),
  setChallenges: (data) => set((state) => ({ ...state, ...data })),
  setTasks: (data) => set((state) => ({ ...state, ...data })),
  setCouple: (data) => set((state) => ({ ...state, ...data })),
  setProfile: (profile) => set({ profile }),
  clearCache: () => set({
    dashboardCouple: null,
    dashboardChallenge: null,
    dashboardScore: null,
    dashboardTasks: [],
    activeChallenge: null,
    challenges: [],
    challengeScore: null,
    challengesCouple: null,
    tasksChallenge: null,
    tasks: [],
    coupleData: null,
    pendingCouple: null,
    invites: [],
    profile: null,
  }),
}));