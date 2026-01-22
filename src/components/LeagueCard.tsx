import type { League } from "../models/league.model";

interface LeagueCardProps {
  league: League;
  onClick: (league: League) => void;
}

export const LeagueCard = ({ league, onClick }: LeagueCardProps) => {
  return (
    <div
      onClick={() => onClick(league)}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer border border-gray-200 hover:border-blue-500 group"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
            {league.strLeague}
          </h3>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Sport:</span>{" "}
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {league.strSport}
              </span>
            </p>
            {league.strLeagueAlternate && (
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Alternate Name:</span>{" "}
                {league.strLeagueAlternate}
              </p>
            )}
          </div>
        </div>
        <div className="ml-4 flex-shrink-0">
          <svg
            className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
