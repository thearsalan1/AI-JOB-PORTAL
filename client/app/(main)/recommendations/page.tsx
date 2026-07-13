"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { HiOfficeBuilding } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { useGetMatches } from "@/app/hooks/matches/useGetMatches";
import useSaveJob from "@/app/hooks/jobs/useSaveJobs";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useRecalculateMatches } from "@/app/hooks/matches/useGetMatches";
import MatchDetailsModal from "@/app/components/matches/MatchDetailsModal";
import { MdRefresh } from "react-icons/md";

const getScoreColor = (score: number) => {
  if (score >= 90) return "bg-green-100 text-green-600";
  if (score >= 80) return "bg-blue-100 text-blue-600";
  return "bg-yellow-100 text-yellow-600";
};

const RecommendationCard = ({
  match,
  onViewMatch,
}: {
  match: any;
  onViewMatch: (id: string) => void;
}) => {
  const router = useRouter();
  const job = match.job_id;
  const { saved, saveMutation } = useSaveJob(job?._id);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-3 gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex justify-center items-center rounded-xl border p-2 border-gray-200 h-11 w-11 shrink-0">
            <HiOfficeBuilding size={20} color="#1a3c6e" />
          </div>
          <div className="min-w-0">
            <h2 className="font-semibold text-gray-800 truncate">
              {job?.title}
            </h2>
            <span className="text-sm text-gray-400">
              <MdLocationOn className="inline mr-1" />
              {job?.location}
            </span>
          </div>
        </div>
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full shrink-0 ${getScoreColor(match.match_score)}`}
        >
          {match.match_score}% Match
        </span>
      </div>

      <p className="text-sm text-emerald-500 mb-3">
        ${job?.salary_min?.toLocaleString()} / year
      </p>

      {match.reasons?.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-400 mb-2">Why this match?</p>
          <div className="flex flex-wrap gap-2">
            {match.reasons.map((reason: string, i: number) => (
              <span
                key={i}
                className="text-xs bg-[#1a3c6e]/10 text-[#1a3c6e] px-2 py-1 rounded-full"
              >
                {reason}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <button
          onClick={() => saveMutation.mutate()}
          disabled={saveMutation.isPending}
        >
          {saved ? (
            <FaStar size={16} color="#1a3c6e" />
          ) : (
            <FaRegStar
              size={16}
              className="text-gray-400 hover:text-[#1a3c6e] transition"
            />
          )}
        </button>
        <button
          onClick={() => router.push(`/jobs/${job?._id}`)}
          className="flex items-center gap-1 px-4 py-1 rounded-2xl bg-[#1a3c6e] text-white text-sm hover:bg-blue-950 transition"
        >
          View Details <FaArrowRight size={10} />
        </button>
      </div>
    </div>
  );
};

const Page = () => {
  const [minScore, setMinScore] = useState(70);
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const { data, isLoading } = useGetMatches(minScore);
  const recalcMatches = useRecalculateMatches();
  const matches = data?.matches ?? [];

  return (
    <div className="px-3 sm:px-6 lg:px-10 py-4 sm:py-6">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#1a3c6e] flex items-center gap-2">
            <BsStars className="text-[#00a897]" />
            Recommendations
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            AI scanned jobs matching your profile — {matches.length} found
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={() => recalcMatches.mutate()}
            disabled={recalcMatches.isPending}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#1a3c6e] text-white text-sm font-semibold hover:bg-blue-950 transition disabled:opacity-50"
          >
            <MdRefresh size={16} />
            {recalcMatches.isPending ? "Refreshing..." : "Refresh"}
          </button>

          <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2">
            <span className="text-sm text-gray-500 shrink-0">Min Match:</span>
            <input
              type="range"
              min="50"
              max="95"
              step="5"
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="w-full sm:w-24 accent-[#1a3c6e]"
            />
            <span className="text-sm font-semibold text-[#1a3c6e] shrink-0">
              {minScore}%+
            </span>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="text-center text-gray-400 py-20">Loading...</div>
      )}

      {!isLoading && matches.length === 0 && (
        <div className="text-center text-gray-400 py-20">
          <BsStars size={40} className="mx-auto mb-4 opacity-20" />
          <p>No matches found for {minScore}%+ score</p>
          <p className="text-sm mt-1">Try lowering the minimum match score</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {matches.map((match: any) => (
          <RecommendationCard
            key={match._id}
            match={match}
            onViewMatch={setSelectedMatchId}
          />
        ))}
      </div>

      {selectedMatchId && (
        <MatchDetailsModal
          matchId={selectedMatchId}
          onClose={() => setSelectedMatchId(null)}
        />
      )}
    </div>
  );
};

export default Page;
