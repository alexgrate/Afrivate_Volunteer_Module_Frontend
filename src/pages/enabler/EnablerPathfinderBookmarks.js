import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EnablerNavbar from "../../components/auth/EnablerNavbar";
import { bookmarks } from "../../services/api";

const EnablerPathfinderBookmarks = () => {
  const navigate = useNavigate();
  const [pathfinders, setPathfinders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Bookmarked Pathfinders - AfriVate";
    
    const loadBookmarks = async () => {
      setLoading(true);
      try {
        const data = await bookmarks.list();
        
        if (Array.isArray(data)) {
          // Map bookmark data to pathfinder format
          const list = data.map((bookmark) => ({
            id: bookmark.id || bookmark.pathfinder?.id,
            name: bookmark.pathfinder_name || bookmark.pathfinder?.first_name + " " + bookmark.pathfinder?.last_name || "Pathfinder",
            role: "Pathfinder",
            location: bookmark.pathfinder?.location || "",
          }));
          setPathfinders(list);
        } else {
          setPathfinders([]);
        }
      } catch (err) {
        console.error("Error loading bookmarks:", err);
        setPathfinders([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadBookmarks();
  }, []);

  const handleRemoveBookmark = async (bookmarkId) => {
    try {
      await bookmarks.delete(bookmarkId);
      setPathfinders((prev) => prev.filter((p) => p.id !== bookmarkId));
    } catch (err) {
      console.error("Error removing bookmark:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <EnablerNavbar />
      <div className="pt-20 px-4 md:px-8 lg:px-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-black mb-2">Bookmarked Pathfinders</h1>
          <p className="text-gray-600 mb-6">
            Pathfinders you have saved. View their profiles or contact them.
          </p>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading bookmarks...</p>
            </div>
          ) : pathfinders.length === 0 ? (
            <div className="bg-gray-50 rounded-[30px] p-8 md:p-12 border border-gray-200 text-center">
              <i className="fa fa-bookmark text-4xl text-gray-300 mb-4"></i>
              <p className="text-gray-600 mb-2">No bookmarked pathfinders yet.</p>
              <p className="text-gray-500 text-sm mb-4">
                Go to Recommendations and bookmark pathfinders to see them here.
              </p>
              <button
                onClick={() => navigate("/enabler/recommendations")}
                className="bg-[#6A00B1] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#5A0091] transition-colors"
              >
                Browse Recommendations
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {pathfinders.map((pf) => (
                <div
                  key={pf.id}
                  className="bg-white rounded-[30px] p-4 md:p-6 border border-gray-200 flex flex-col md:flex-row md:items-center gap-4"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fa fa-user text-2xl text-gray-400"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-bold text-black">{pf.name}</h2>
                    <p className="text-gray-700 text-sm">{pf.role}</p>
                    <p className="text-gray-500 text-xs md:text-sm">{pf.location}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => navigate(`/enabler/pathfinder/${pf.id}`)}
                      className="bg-[#6A00B1] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#5A0091] transition-colors"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => navigate(`/enabler/contact/${pf.id}`)}
                      className="border-2 border-[#6A00B1] text-[#6A00B1] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-50 transition-colors"
                    >
                      Contact
                    </button>
                    <button
                      onClick={() => handleRemoveBookmark(pf.id)}
                      className="text-gray-500 hover:text-red-600 px-2 py-1 text-sm"
                      title="Remove from bookmarks"
                    >
                      <i className="fa fa-bookmark"></i> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnablerPathfinderBookmarks;
