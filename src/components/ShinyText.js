export default function ShinyText({
    children,
    className = "",
    colors = ["white", "purple", "white"], // Gradient with dark theme
    animationSpeed = 2.5,
    showBorder = true,
  }) {
    const gradientStyle = {
      backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
      backgroundSize: "900% 1000%",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animation: `shinyEffect ${animationSpeed}s infinite linear`,
    };
  
    return (
      <div
        className={`relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-lg font-extrabold backdrop-blur-lg overflow-hidden cursor-pointer transition-all duration-500 hover:scale-110 hover:shadow-[0_0_20px_#2c003e] ${className}`} 
      >
        {showBorder && (
          <div
            className="absolute inset-0 z-0 pointer-events-none animate-borderGlow"
            style={{
              filter: "blur(20px)",
            }}
          />
        )}
        <span
          className="relative z-10 text-lg md:text-xl lg:text-2xl tracking-wide px-20 py-3 transition-all duration-300 hover:shadow-[0_0_15px_#2c003e]"
          style={gradientStyle}
        >
          {children}
        </span>
      </div>
    );
  }