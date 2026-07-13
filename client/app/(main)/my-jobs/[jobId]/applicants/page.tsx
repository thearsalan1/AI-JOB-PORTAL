"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import {
  useGetJobApplications,
  useUpdateApplicationStatus,
} from "@/app/hooks/applications/useJobapplications";
import { FiBriefcase } from "react-icons/fi";
import { FaFilePdf } from "react-icons/fa";
import Pagination from "@/app/components/ui/Pagination";

const statusTabs = [
  { label: "All", value: "" },
  { label: "Applied", value: "applied" },
  { label: "Shortlisted", value: "shortlisted" },
  { label: "Hired", value: "hired" },
  { label: "Rejected", value: "rejected" },
];

const statusColors: Record<string, string> = {
  applied: "bg-blue-100 text-blue-600",
  shortlisted: "bg-purple-100 text-purple-600",
  hired: "bg-green-100 text-green-600",
  rejected: "bg-red-100 text-red-600",
};

const ApplicantsPage = () => {
  const { jobId } = useParams();
  const [activeStatus, setActiveStatus] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetJobApplications(
    jobId as string,
    activeStatus,
    page,
  );
  const updateStatus = useUpdateApplicationStatus();

  const applications = data?.applications ?? [];

  return (
    <div className="px-3 sm:px-6 lg:px-10 py-4 sm:py-6 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#1a3c6e] mb-6 flex items-center gap-2">
        <FiBriefcase /> Applicants
      </h1>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {statusTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => {
              setActiveStatus(tab.value);
              setPage(1);
            }}
            className={`shrink-0 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition ${
              activeStatus === tab.value
                ? "bg-[#1a3c6e] text-white"
                : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="text-center text-gray-400 py-20">Loading...</div>
      )}

      {!isLoading && applications.length === 0 && (
        <div className="bg-white rounded-2xl p-8 text-center text-gray-400">
          No applicant in this category
        </div>
      )}

      <div className="space-y-4">
        {applications.map((app: any) => (
          <div
            key={app._id}
            className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h2 className="font-semibold text-gray-800 truncate">
                  {app.seeker_id?.name}
                </h2>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${
                    statusColors[app.status] ?? "bg-gray-100 text-gray-500"
                  }`}
                >
                  {app.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 truncate">
                {app.seeker_id?.email}
              </p>

              {app.resume_id?.file_url && (
                <a
                  href={app.resume_id.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#1a3c6e] font-semibold hover:underline flex items-center gap-1 mt-2"
                >
                  <FaFilePdf size={12} />{" "}
                  {app.resume_id.file_name ?? "View Resume"}
                </a>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {app.status === "applied" && (
                <>
                  <button
                    onClick={() =>
                      updateStatus.mutate({
                        id: app._id,
                        status: "shortlisted",
                      })
                    }
                    disabled={updateStatus.isPending}
                    className="text-xs px-3 py-1.5 rounded-lg bg-purple-100 text-purple-600 font-semibold hover:bg-purple-200 transition disabled:opacity-50"
                  >
                    Shortlist
                  </button>
                  <button
                    onClick={() =>
                      updateStatus.mutate({ id: app._id, status: "rejected" })
                    }
                    disabled={updateStatus.isPending}
                    className="text-xs px-3 py-1.5 rounded-lg bg-red-100 text-red-600 font-semibold hover:bg-red-200 transition disabled:opacity-50"
                  >
                    Reject
                  </button>
                </>
              )}

              {app.status === "shortlisted" && (
                <>
                  <button
                    onClick={() =>
                      updateStatus.mutate({ id: app._id, status: "hired" })
                    }
                    disabled={updateStatus.isPending}
                    className="text-xs px-3 py-1.5 rounded-lg bg-green-100 text-green-600 font-semibold hover:bg-green-200 transition disabled:opacity-50"
                  >
                    Hire
                  </button>
                  <button
                    onClick={() =>
                      updateStatus.mutate({ id: app._id, status: "rejected" })
                    }
                    disabled={updateStatus.isPending}
                    className="text-xs px-3 py-1.5 rounded-lg bg-red-100 text-red-600 font-semibold hover:bg-red-200 transition disabled:opacity-50"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={data?.pagination?.pages ?? 1}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ApplicantsPage;
