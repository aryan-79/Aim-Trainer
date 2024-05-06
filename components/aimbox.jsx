const AimBox = ({ handleClick, position }) => {
  return (
    <div
      className="relative rounded-full w-24 h-24 bg-target border-white border-2"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onClick={handleClick}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-14 h-14 border-white border-2">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-4 h-4 border-white border-2">
          <div className="rounded-full w-24 h-24 bg-transparent flex flex-col justify-center items-center">
            <div className="absolute  left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-0.5 bg-white"></div>
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90 w-24 h-0.5 bg-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AimBox;
