const Banner = () => {
  return (
    <div
      className="hero h-[60vh] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="hero-overlay bg-black bg-opacity-60"></div>
      <div className="hero-content text-center text-white">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold mb-4">Welcome to Pet <span className="text-orange-400">House</span></h1>
          <p className="mb-6 text-lg">
            Search pets by tag like <span className="font-semibold">cute</span>,{" "}
            <span className="font-semibold">fluffy</span>,{" "}
            <span className="font-semibold">friendly</span> etc.
          </p>

          {/* Search Bar (Pre Functional) */}
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search by tag..."
              className="input input-bordered w-full max-w-xs"
              disabled // Functionality will be added later
            />
            <button className="btn btn-primary ml-2" disabled>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
