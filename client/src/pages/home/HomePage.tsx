import { useNavigate } from "react-router-dom";
import { FaCompressArrowsAlt, FaLock, FaBolt } from "react-icons/fa";
import Button from "../../components/common/button";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen py-32 md:py-16">
      <div className="flex flex-col items-center justify-center min-h-screen text-center text-white px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Welcome to PixelPress
        </h1>
        <p className="text-base sm:text-lg max-w-2xl text-white/90 mb-8">
          Your one-stop solution for image compression.
        </p>
        <div className="flex flex-col sm:flex-row gap-8 mb-10 w-full max-w-4xl">
          <div className="flex flex-col items-center flex-1 px-4">
            <FaCompressArrowsAlt size={36} className="mb-2 text-white" />
            <h2 className="text-lg sm:text-xl font-semibold mb-1">
              Efficient Compression
            </h2>
            <p className="text-white/80 max-w-xs">
              Reduce image size without losing quality. Save bandwidth and
              storage instantly.
            </p>
          </div>
          <div className="flex flex-col items-center flex-1 px-4">
            <FaLock size={36} className="mb-2 text-white" />
            <h2 className="text-lg sm:text-xl font-semibold mb-1">
              Privacy First
            </h2>
            <p className="text-white/80 max-w-xs">
              Your images are processed securely and never stored on our
              servers.
            </p>
          </div>
          <div className="flex flex-col items-center flex-1 px-4">
            <FaBolt size={36} className="mb-2 text-white" />
            <h2 className="text-lg sm:text-xl font-semibold mb-1">
              Lightning Fast
            </h2>
            <p className="text-white/80 max-w-xs">
              Experience rapid compression with our optimized algorithms.
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="lg"
          className="mt-6 max-w-xs bg-white text-purple-800 border-purple-800 hover:bg-purple-100"
          onClick={() => navigate("/compress")}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
