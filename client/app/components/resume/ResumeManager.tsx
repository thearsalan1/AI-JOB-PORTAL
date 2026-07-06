"use client";
import { useState } from "react";
import { useRef } from "react";
import { MdUploadFile, MdDelete, MdPictureAsPdf } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import {
  useGetResumes,
  useUploadResume,
  useDeleteResume,
  useParseResume,
  useGetResumeDetails,
} from "@/app/hooks/resume/useResume";
import toast from "react-hot-toast";
import api from "@/app/lib/axios";
import { useToggleResumeSharing } from "@/app/hooks/resume/useResume";

interface SelectedSkill {
  value: string;
  label: string;
  category: string;
  level: number;
  years_experience: number;
}

interface ResumeManagerProps {
  onApplyToProfile?: (data: {
    current_role?: string;
    experience_years?: number;
    skills: SelectedSkill[];
  }) => void;
}

const MAX_SIZE = 5 * 1024 * 1024;

const ResumeManager = ({ onApplyToProfile }: ResumeManagerProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: resumes = [], isLoading } = useGetResumes();
  const [applyingId, setApplyingId] = useState<string | null>(null);
  const uploadResume = useUploadResume();
  const deleteResume = useDeleteResume();
  const parseResume = useParseResume();

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { data: detail, isLoading: detailLoading } = useGetResumeDetails(
    expandedId || "",
    !!expandedId,
  );

  const toggleSharing = useToggleResumeSharing();

  const handleCopyLink = (resumeId: string) => {
    const link = `${process.env.NEXT_PUBLIC_API_URL}/resume/${resumeId}/shared`;
    navigator.clipboard.writeText(link);
    toast.success("Link copied!");
  };

  const handleApplyToProfile = async (parsedData: any) => {
    if (!onApplyToProfile) return;
    setApplyingId(expandedId);

    const matchedSkills: SelectedSkill[] = [];
    const unmatched: string[] = [];
    for (const skillName of parsedData.skills || []) {
      try {
        const res = await api.get("/skills/search", {
          params: { q: skillName },
        });
        const found = res.data.skills?.[0];
        if (found) {
          matchedSkills.push({
            value: found._id,
            label: found.name,
            category: found.category,
            level: 1,
            years_experience: 0,
          });
        } else {
          unmatched.push(skillName);
        }
      } catch (error) {
        unmatched.push(skillName);
      }
    }
    onApplyToProfile({
      current_role: parsedData.current_role,
      experience_years: parsedData.experience_years,
      skills: matchedSkills,
    });
    if (unmatched.length > 0) {
      toast.error(`This skill is not available: ${unmatched.join(", ")}`);
    }
    toast.success(`${matchedSkills.length} skills added in profile`);
    setApplyingId(null);
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please provide pdf");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_SIZE) {
      toast.error("file size must be under 5mb.");
      e.target.value = "";
      return;
    }

    uploadResume.mutate(file, {
      onSettled: () => {
        e.target.value = "";
      },
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-400">PDF only, max 5MB</p>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploadResume.isPending}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1a3c6e] text-white text-sm font-semibold hover:bg-blue-950 transition disabled:opacity-50"
        >
          <MdUploadFile size={16} />
          {uploadResume.isPending ? "Uploading..." : "Upload Resume"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {isLoading && <p className="text-gray-400 text-sm">Loading...</p>}
      {!isLoading && resumes.length === 0 && (
        <p className="text-gray-400 text-sm">
          No resume uploaded.
        </p>
      )}

      <div className="space-y-3">
        {resumes.map((resume: any) => {
          const isExpanded = expandedId === resume._id;

          return (
            <div
              key={resume._id}
              className="border border-gray-200 rounded-xl px-4 py-3"
            >
              {/* Row header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MdPictureAsPdf size={22} className="text-red-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {resume.file_name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {(resume.file_size / 1024 / 1024).toFixed(2)} MB •{" "}
                      {new Date(resume.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      setExpandedId(isExpanded ? null : resume._id)
                    }
                    className="flex items-center gap-1 text-xs text-[#1a3c6e] font-semibold hover:underline"
                  >
                    <BsStars size={12} />
                    {isExpanded ? "Hide" : "AI Insights"}
                  </button>
                  <a
                    href={resume.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#1a3c6e] font-semibold hover:underline"
                  >
                    View
                  </a>
                  <button
                    onClick={() => toggleSharing.mutate(resume._id)}
                    disabled={toggleSharing.isPending}
                    className={`text-xs font-semibold hover:underline ${
                      resume.is_shared ? "text-emerald-600" : "text-gray-400"
                    }`}
                  >
                    {resume.is_shared ? "Shared ✓" : "Share"}
                  </button>

                  {resume.is_shared && (
                    <button
                      onClick={() => handleCopyLink(resume._id)}
                      className="text-xs text-[#1a3c6e] font-semibold hover:underline"
                    >
                      Copy Link
                    </button>
                  )}
                  <button
                    onClick={() => deleteResume.mutate(resume._id)}
                    disabled={deleteResume.isPending}
                  >
                    <MdDelete
                      size={18}
                      className="text-red-400 hover:text-red-600"
                    />
                  </button>
                </div>
              </div>

              {/* Expanded AI section */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  {detailLoading && (
                    <p className="text-gray-400 text-sm">Loading...</p>
                  )}

                  {!detailLoading && !detail?.parsedData && (
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-400 mb-3">
                        This resume is not parsed using ai yet.
                      </p>
                      <button
                        onClick={() => parseResume.mutate(resume._id)}
                        disabled={parseResume.isPending}
                        className="flex items-center gap-2 mx-auto px-4 py-2 rounded-xl bg-[#00a897] text-white text-sm font-semibold hover:bg-emerald-700 transition disabled:opacity-50"
                      >
                        <BsStars size={14} />
                        {parseResume.isPending
                          ? "AI Parsing..."
                          : "Parse with AI"}
                      </button>
                    </div>
                  )}

                  {!detailLoading && detail?.parsedData && (
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Confidence Score</span>
                        <span className="font-semibold text-[#1a3c6e]">
                          {detail.parsedData.confidence_score}%
                        </span>
                      </div>

                      {detail.parsedData.current_role && (
                        <div>
                          <span className="text-gray-400">Detected Role: </span>
                          <span className="font-medium text-gray-700">
                            {detail.parsedData.current_role}
                          </span>
                        </div>
                      )}

                      {detail.parsedData.experience_years != null && (
                        <div>
                          <span className="text-gray-400">Experience: </span>
                          <span className="font-medium text-gray-700">
                            {detail.parsedData.experience_years} years
                          </span>
                        </div>
                      )}

                      {detail.parsedData.skills?.length > 0 && (
                        <div>
                          <p className="text-gray-400 mb-2">Detected Skills</p>
                          <div className="flex flex-wrap gap-2">
                            {detail.parsedData.skills.map(
                              (skill: string, i: number) => (
                                <span
                                  key={i}
                                  className="text-xs bg-[#1a3c6e]/10 text-[#1a3c6e] px-2 py-1 rounded-full"
                                >
                                  {skill}
                                </span>
                              ),
                            )}
                          </div>
                        </div>
                      )}

                      {detail.parsedData.education?.length > 0 && (
                        <div>
                          <p className="text-gray-400 mb-1">Education</p>
                          <ul className="list-disc list-inside text-gray-700">
                            {detail.parsedData.education.map(
                              (edu: string, i: number) => (
                                <li key={i}>{edu}</li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  {onApplyToProfile && (
                    <button
                      onClick={() => handleApplyToProfile(detail.parsedData)}
                      disabled={applyingId === resume._id}
                      className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#1a3c6e] text-white text-sm font-semibold hover:bg-blue-950 transition disabled:opacity-50"
                    >
                      <BsStars size={14} />
                      {applyingId === resume._id
                        ? "Applying..."
                        : "Apply to Profile"}
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResumeManager;
