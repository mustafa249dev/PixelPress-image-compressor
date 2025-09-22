import React, { useRef, useState } from "react";
import Button from "../../components/common/button";
import { compressImage } from "../../services/api";

const CompressPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setCompressedUrl(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setCompressedUrl(null);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  // Compression handler
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please upload an image first!");
      return;
    }

    try {
      setIsCompressing(true);
      const compressedData = await compressImage(selectedFile);
      const url = window.URL.createObjectURL(new Blob([compressedData]));
      setCompressedUrl(url);
    } catch (err) {
      console.error(err);
      alert("Compression failed. Please try again.");
    } finally {
      setIsCompressing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setCompressedUrl(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2 pt-24 pb-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-4">
        <h1 className="text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Image Compressor
        </h1>
        <p className="text-center text-gray-500 mb-2">
          Compress your images easily. Drag & drop or tap to select a file.
        </p>
        <div
          className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl transition-colors duration-200 cursor-pointer outline-none focus:ring-2 focus:ring-indigo-400
            ${
              dragActive
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-300 bg-gray-50"
            }
            h-56 sm:h-64 w-full`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
          role="button"
          tabIndex={0}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
          {!selectedFile ? (
            <div className="flex flex-col items-center">
              <svg
                className="mb-2 text-indigo-400"
                width={48}
                height={48}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                />
              </svg>
              <span className="text-indigo-400 font-medium text-sm">
                Drop image here or tap to upload
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full">
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="preview"
                className="max-h-32 sm:max-h-40 mb-2 rounded-lg shadow"
              />
              <span className="text-gray-700 text-xs truncate w-full text-center">
                {selectedFile.name}
              </span>
            </div>
          )}
        </div>
        {selectedFile && (
          <div className="flex flex-col gap-3 mt-2">
            <Button
              variant="primary"
              isFullWidth
              onClick={handleUpload}
              isLoading={isCompressing}
              disabled={isCompressing}
            >
              {isCompressing ? "Compressing..." : "Compress Image"}
            </Button>
            <Button
              variant="secondary"
              isFullWidth
              onClick={handleReset}
              disabled={isCompressing}
            >
              Choose Another Image
            </Button>
          </div>
        )}
        {compressedUrl && (
          <div className="flex flex-col items-center mt-4 gap-2">
            <span className="text-green-600 font-semibold">
              Compression Complete!
            </span>
            <img
              src={compressedUrl}
              alt="compressed"
              className="max-h-32 sm:max-h-40 rounded-lg shadow"
            />
            <Button
              variant="success"
              onClick={() => {
                const link = document.createElement("a");
                link.href = compressedUrl;
                link.download = "compressed-image.jpg";
                document.body.appendChild(link);
                link.click();
                link.remove();
              }}
            >
              Download Compressed Image
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompressPage;
