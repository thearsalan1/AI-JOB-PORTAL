"use client";
import { MdClose } from "react-icons/md";
import { useGetMatchDetail } from "@/app/hooks/matches/useGetMatches";

const MatchDetailsModal = ({
  matchId,
  onClose,
}: {
  matchId: string;
  onClose: () => void;
}) => {
  const { data: match, isLoading } = useGetMatchDetail(matchId, true);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <MdClose size={20} />
        </button>

        {isLoading && <p className="text-gray-400 text-sm">Loading...</p>}

        {!isLoading && match && (
          <>
            <h2 className="text-lg font-semibold text-[#1a3c6e] mb-1">
              {match.job_id?.title}
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Match Score:{" "}
              <span className="font-bold text-[#1a3c6e]">
                {match.match_score}%
              </span>
            </p>

            {match.reasons?.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-gray-400 mb-2">Reasons</p>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {match.reasons.map((r: string, i: number) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            )}

            {match.skill_matches?.length > 0 && (
              <div>
                <p className="text-xs text-gray-400 mb-2">Skill Breakdown</p>
                <div className="space-y-2">
                  {match.skill_matches.map((sm: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-sm border border-gray-100 rounded-lg px-3 py-2"
                    >
                      <span className="font-medium text-gray-700">
                        {sm.skill}
                      </span>
                      <span className="text-gray-400">
                        Aapka level: {sm.user_level} • Job maangta:{" "}
                        {sm.job_level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MatchDetailsModal;
