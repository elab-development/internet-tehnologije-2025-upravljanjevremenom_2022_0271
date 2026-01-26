export const Button = ({ children, onClick, type = "button", variant = "primary" }) => {
  const styles = {
    primary: "bg-blue-600 hover:bg-blue-500 shadow-blue-900/20",
    secondary: "bg-slate-700 hover:bg-slate-600 border border-slate-600"
  };

  return (
    <button 
      type={type}
      onClick={onClick}
      className={`${styles[variant]} w-full text-white font-bold py-3 rounded-lg transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg`}
    >
      {children}
    </button>
  );
};