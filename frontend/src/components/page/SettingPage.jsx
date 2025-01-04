import React from "react";
import { THEMES } from "../../constants/index.js";
import { useThemeStore } from "../../store/useThemeStore.js";
import { Send } from "lucide-react";


const Preview_Messages = [
  { id: 1, title: "Message 1", body: "This is the body of message 1" },
  { id: 2, title: "Message 2", body: "This is the body of message 2" },
];

const SettingPage = () => {
  const [theme, setTheme] = useThemeStore();

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content">
            Choose a theme for your chat interface
          </p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {THEMES.map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`w-10 h-10 rounded-full bg-${t}-500`}
            >
              <div className="relative w-8 h-full rounded-md overflow-hidden" data-theme={t}>
                <div className="absolute insert-0 grid-cols-4 gap-px p-1">
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div> 
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>                
                </div>
              </div>

              <span className="text-[11px] font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>

            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
