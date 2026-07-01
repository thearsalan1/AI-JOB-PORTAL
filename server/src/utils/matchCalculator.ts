import { Job } from "../models/Job";
import { JobSkill } from "../models/JobSkill";
import { UserSkill } from "../models/UserSkill";
import { jobSeekerProfile } from "../models/JobSeekerProfile";

interface SkillVector {
  [skillId: string]: number;
}

export interface MatchResult {
  score: number;
  skill_matches: { skill: string; user_level: number; job_level: number }[];
}

export const calculateMatchScore = async (userId: string, jobId: string): Promise<MatchResult> => {
  try {
    const userSkills = await UserSkill.find({ userId }).populate('skill_id');
    const userVector: SkillVector = {};
    userSkills.forEach((us: any) => {
      userVector[us.skill_id._id.toString()] = us.level;
    });

    const jobSkills = await JobSkill.find({ job_id: jobId }).populate('skill_id');
    const jobVector: SkillVector = {};
    jobSkills.forEach((js: any) => {
      jobVector[js.skill_id._id.toString()] = js.required_level;
    });

    if (jobSkills.length === 0) {
      return { score: 0, skill_matches: [] };
    }

    // Requirement-based overlap scoring
    let overlapScore = 0;
    let totalRequired = 0;

    jobSkills.forEach((js: any) => {
      const skillId = js.skill_id._id.toString();
      const userLevel = userVector[skillId] || 0;
      const jobLevel = js.required_level;

      totalRequired += jobLevel;
      if (userLevel >= jobLevel) {
        overlapScore += jobLevel; // full credit
      } else {
        overlapScore += userLevel; // partial credit
      }
    });

    const baseScore = (overlapScore / totalRequired) * 100;

    const job = await Job.findById(jobId);
    const seekerProfile = await jobSeekerProfile.findOne({ user_id: userId });

    let locationBoost = 2; 
    if (job?.remote) {
      locationBoost = 8; 
    } else if (
      seekerProfile?.preferred_location &&
      job?.location
        .toLowerCase()
        .includes(seekerProfile.preferred_location.toLowerCase())
    ) {
      locationBoost = 8;
    }

    const finalScore = Math.min(100, baseScore + locationBoost);

    const skill_matches = jobSkills.map((js: any) => ({
      skill: js.skill_id.name || js.skill_id._id.toString(),
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