import React from 'react';

const PaperForm = () => {
  return (
    <div className="min-h-screen ">
      {/* Navbar */}
      <nav className="bg-black p-4">
        <div className="container mx-auto">
          <h1 className="text-white text-2xl">Speed App</h1>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex justify-center items-center py-12">
        <form className="bg-gray-100 p-8 rounded shadow-md w-3/4">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Submit an Article</h1>

          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="author" className="block text-gray-700 font-semibold mb-2">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="publisher" className="block text-gray-700 font-semibold mb-2">
              Publisher
            </label>
            <input
              type="text"
              id="publisher"
              name="publisher"
              className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="journal" className="block text-gray-700 font-semibold mb-2">
              Journal
            </label>
            <input
              type="text"
              id="journal"
              name="journal"
              className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="year" className="block text-gray-700 font-semibold mb-2">
              Year
            </label>
            <input
              type="number"
              id="year"
              name="year"
              className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="volume" className="block text-gray-700 font-semibold mb-2">
              Volume
            </label>
            <input
              type="text"
              id="volume"
              name="volume"
              className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="pages" className="block text-gray-700 font-semibold mb-2">
              Pages
            </label>
            <input
              type="text"
              id="pages"
              name="pages"
              className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="doi" className="block text-gray-700 font-semibold mb-2">
              DOI
            </label>
            <input
              type="text"
              id="doi"
              name="doi"
              className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2 rounded hover:bg-grey"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaperForm;
