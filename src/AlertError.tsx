const AlertError: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="toast toast-end">
      <div className="alert alert-error">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default AlertError;
