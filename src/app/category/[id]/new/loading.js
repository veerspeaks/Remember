import localFont from "next/font/local";
import "./globals.css";

const geistMono = localFont({
  src: "./fonts/Bangers-Regular.ttf",
  variable: "--font-geist-mono",
  weight: "400",
});

export default function Loading() {
  return (
    <div
      className={`${geistMono.variable} fixed inset-0 flex items-center justify-center bg-black bg-opacity-100 z-50`}
    >
      <h1 className="text-4xl font-bangers font-bold text-red-800 remember-animation">
        {Array.from("REMEMBER?").map((letter, index) => (
          <span key={index} className={`bounce delay-${index}`}>
            {letter}
          </span>
        ))}
      </h1>
    </div>
  );
}
