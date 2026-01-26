export const Input = ({ label, type, value, onChange, placeholder, required }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
    <input 
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white transition"
    />
  </div>
);