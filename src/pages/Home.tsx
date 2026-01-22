import { useState, useMemo } from 'react';
import { useLeagues } from '../hooks/useLeagues';
import { SearchBar } from '../components/SearchBar';
import { SportFilter } from '../components/SportFilter';
import { LeagueList } from '../components/LeagueList';
import { BadgeModal } from '../components/BadgeModal';
import type { League } from '../models/league.model';

const Home = () => {
    const { data: leagues, isLoading, isError } = useLeagues();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSport, setSelectedSport] = useState('');
    const [selectedLeague, setSelectedLeague] = useState<League | null>(null);

    // Get unique sports from leagues
    const sports = useMemo(() => {
        if (!leagues) return [];
        const uniqueSports = Array.from(new Set(leagues.map(league => league.strSport)));
        return uniqueSports.sort();
    }, [leagues]);

    // Filter leagues based on search query and selected sport
    const filteredLeagues = useMemo(() => {
        if (!leagues) return [];

        return leagues.filter(league => {
            const matchesSearch = league.strLeague
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
                (league.strLeagueAlternate &&
                    league.strLeagueAlternate.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesSport = selectedSport === '' || league.strSport === selectedSport;

            return matchesSearch && matchesSport;
        });
    }, [leagues, searchQuery, selectedSport]);

    const handleLeagueClick = (league: League) => {
        setSelectedLeague(league);
    };

    const handleCloseModal = () => {
        setSelectedLeague(null);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-xl text-gray-700 font-medium">Loading leagues...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                    <svg
                        className="mx-auto h-16 w-16 text-red-500 mb-4"
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
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
                    <p className="text-gray-600">Unable to load leagues. Please try again later.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                        Sports Leagues
                    </h1>
                    <p className="text-gray-600">
                        Discover and explore sports leagues from around the world
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SearchBar value={searchQuery} onChange={setSearchQuery} />
                        <SportFilter
                            sports={sports}
                            selectedSport={selectedSport}
                            onChange={setSelectedSport}
                        />
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                        Showing <span className="font-semibold text-gray-900">{filteredLeagues.length}</span> of{' '}
                        <span className="font-semibold text-gray-900">{leagues?.length || 0}</span> leagues
                    </div>
                </div>

                {/* League List */}
                <LeagueList leagues={filteredLeagues} onLeagueClick={handleLeagueClick} />

                {/* Badge Modal */}
                {selectedLeague && (
                    <BadgeModal
                        leagueId={selectedLeague.idLeague}
                        leagueName={selectedLeague.strLeague}
                        isOpen={!!selectedLeague}
                        onClose={handleCloseModal}
                    />
                )}
            </div>
        </div>
    );
};

export default Home;
