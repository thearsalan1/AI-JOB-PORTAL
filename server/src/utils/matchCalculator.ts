import { Job } from "../models/Job";
import { JobSkill } from "../models/JobSkill";
import { UserSkill } from "../models/UserSkill";

interface SkillVector {
  [skillId: string]: number;
}

export interface MatchResult {
  score: number;
  skill_matches: { skill: string; user_level: number; job_level: number }[];
}

export const calculateMatchScore = async (userId: string, jobId: string): Promise<MatchResult> => {
  try {
    // Get user skills vector [React:4, Node:3]
    const userSkills = await UserSkill.find({ user_id: userId }).populate('skill_id');
    const userVector: SkillVector = {};

    userSkills.forEach((us: any) => {
      userVector[us.skill_id._id.toString()] = us.level;
    });

    // Get job skills vector [React:4, Node:2]
    const jobSkills = await JobSkill.find({ job_id: jobId }).populate('skill_id');
    const jobVector: SkillVector = {};

    jobSkills.forEach((js: any) => {
      jobVector[js.skill_id._id.toString()] = js.required_level;
    });

    // Cosine similarity calculation
    let dotProduct = 0;
    let userMagnitude = 0;
    let jobMagnitude = 0;

    // Iterate over all unique skill IDs (both user and job)
    const allSkillIds = new Set([...Object.keys(userVector), ...Object.keys(jobVector)]);

    for (const skillId of allSkillIds) {
      const userLevel = userVector[skillId] || 0;
      const jobLevel = jobVector[skillId] || 0;

      dotProduct += userLevel * jobLevel;
      userMagnitude += userLevel * userLevel;
      jobMagnitude += jobLevel * jobLevel;
    }

    // Guard against zero magnitude (no skills on either side)
    if (userMagnitude === 0 || jobMagnitude === 0) {
      return { score: 0, skill_matches: [] };
    }

    const cosineScore = dotProduct / (Math.sqrt(userMagnitude) * Math.sqrt(jobMagnitude));
    const baseScore = Math.max(0, cosineScore * 80); // 0-80%

    // Location + other boosters
    const job = await Job.findById(jobId);
    const locationBoost = job?.location.includes('Lucknow') ? 8 : 2;
    const finalScore = Math.min(100, baseScore + locationBoost);

    // Build skill_matches for storage
    const skill_matches = jobSkills.map((js: any) => ({
      skill: js.skill_id._id.toString(),
      user_level: userVector[js.skill_id._id.toString()] || 0,
      job_level: js.required_level
    }));

    return {
      score: Math.round(finalScore * 10) / 10,
      skill_matches
    };
  } catch (error) {
    return { score: 0, skill_matches: [] };
  }
};