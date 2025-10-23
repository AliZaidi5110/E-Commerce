const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl text-gray-600 mt-4">Page not found!</p>
      <a href="/" className="mt-6 text-blue-500 underline">Go back to Home</a>
    </div>
  );
};

export default NotFound;
