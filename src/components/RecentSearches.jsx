function RecentSearches({ recentHistory, clearHistory, setSelectedHistory }) {
    return  <div className="col-span-1 bg-zinc-800">
        <h4 className="text-2xl font-bold p-4 border-b border-zinc-700 flex justify-center items-center">
          <span>Recent History</span>
          <button
            onClick={clearHistory}
            className="ml-2 p-1 bg-red-500 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#FFFFFF"
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
          </button>
        </h4>
        <div className="p-4 text-left">
          {recentHistory &&
            recentHistory.map((item, index) => (
              <div
                key={index}
                className="p-2  truncate border-zinc-700"
                onClick={() => {
                  setSelectedHistory(item);
                }}
              >
                {item}
              </div>
            ))}
        </div>
      </div>;
}

export default RecentSearches