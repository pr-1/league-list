import { useSeasonBadge } from "../hooks/useSeasonBadge";

interface BadgeModalProps {
  leagueId: string;
  leagueName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const BadgeModal = ({ leagueId, leagueName, isOpen, onClose }: BadgeModalProps) => {
  const { data: seasons, isLoading, isError } = useSeasonBadge(leagueId, isOpen);

  if (!isOpen) return null;

  const badgeUrl = seasons && seasons.length > 0 ? seasons[0].strBadge : null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{leagueName}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center py-8">
          {isLoading && (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-600">Loading badge...</p>
            </div>
          )}

          {isError && (
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-600">
                Failed to load badge. Please try again later.
              </p>
            </div>
          )}

          {!isLoading && !isError && badgeUrl && (
            <div className="text-center">
              <img
                src={badgeUrl}
                alt={`${leagueName} badge`}
                className="mx-auto max-w-full h-auto rounded-lg shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const errorDiv = document.createElement("div");
                  errorDiv.className = "text-gray-500 text-sm";
                  errorDiv.textContent = "Badge image not available";
                  target.parentNode?.appendChild(errorDiv);
                }}
              />
              {seasons && seasons.length > 0 && seasons[0].strSeason && (
                <p className="mt-4 text-sm text-gray-600">
                  Season: <span className="font-semibold">{seasons[0].strSeason}</span>
                </p>
              )}
            </div>
          )}

          {!isLoading && !isError && !badgeUrl && (
            <div className="text-center">
              <p className="text-gray-500">No badge available for this league.</p>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
