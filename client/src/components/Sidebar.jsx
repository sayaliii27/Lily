import { NavLink } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

const navItems = [
  { path: "/", icon: "🌤️", label: "Today's Vibe" },
  { path: "/outfit-studio", icon: "👗", label: "Outfit Studio" },
  { path: "/caption-lab", icon: "✍️", label: "Caption Lab" },
  { path: "/style-planner", icon: "🗓️", label: "Style Planner" },
  { path: "/vibe-notes", icon: "📒", label: "Vibe Notes" },
];

function Sidebar() {
  return (
    <div className="h-screen w-64 bg-white border-r border-pink-100 flex flex-col px-4 py-8 fixed left-0 top-0">
      {/* Logo */}
      <div className="mb-10 px-2">
        <h1 className="text-3xl font-bold text-pink-400">🌸 Lily</h1>
        <p className="text-xs text-pink-300 mt-1">your daily style planner</p>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-pink-100 text-pink-500"
                  : "text-gray-400 hover:bg-pink-50 hover:text-pink-400"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="mt-auto px-2 flex items-center gap-3">
        <UserButton afterSignOutUrl="/" />
        <p className="text-xs text-pink-300">your style, your vibe</p>
      </div>
    </div>
  );
}

export default Sidebar;
