const LoadingCard: React.FC = () => {
  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    </>
  );
};

export default LoadingCard;