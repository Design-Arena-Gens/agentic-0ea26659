import { useEffect, useMemo, useRef, useState } from "react";
import Avatar, { generateRandomAvatar } from "../components/Avatar";

export default function Home() {
  const [config, setConfig] = useState(generateRandomAvatar());
  const svgRef = useRef(null);

  useEffect(() => {
    // hydrate ref after initial render
    svgRef.current = document.querySelector("svg");
  }, [config]);

  const onRandomize = () => setConfig(generateRandomAvatar());

  const onDownload = async () => {
    const node = document.querySelector("svg");
    if (!node) return;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(node);
    const canvas = document.createElement("canvas");
    canvas.width = node.viewBox.baseVal.width * 4;
    canvas.height = node.viewBox.baseVal.height * 4;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    await new Promise((resolve) => {
      img.onload = resolve;
      img.src = url;
    });
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(url);
    const pngUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = pngUrl;
    a.download = "anime-boy.png";
    a.click();
  };

  const set = (key) => (e) => setConfig((c) => ({ ...c, [key]: e.target.value }));

  const inputs = useMemo(() => ([
    { key: "hairStyle", label: "Hair", options: ["short", "messy", "spiky"] },
    { key: "hairColor", label: "Hair Color", options: ["#2f2f2f", "#4a2c2a", "#1f1f1f", "#6b7280", "#1e293b"] },
    { key: "eyeStyle", label: "Eyes", options: ["normal", "smile", "serious"] },
    { key: "eyeColor", label: "Eye Color", options: ["#0ea5e9", "#22c55e", "#a855f7", "#1e40af"] },
    { key: "outfit", label: "Outfit", options: ["hoodie", "tee", "jacket"] },
    { key: "accent", label: "Accent", options: ["none", "blush"] },
    { key: "skinTone", label: "Skin", options: ["#f1c27d", "#e0ac69", "#c68642", "#8d5524"] },
  ]), []);

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col items-center gap-4">
          <Avatar config={config} />
          <div className="flex gap-3">
            <button onClick={onRandomize} className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Randomize</button>
            <button onClick={onDownload} className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700">Download PNG</button>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 border">
          <h1 className="text-2xl font-semibold mb-4">Anime Boy Generator</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {inputs.map((inp) => (
              <label key={inp.key} className="flex flex-col gap-1 text-sm">
                <span className="font-medium">{inp.label}</span>
                <select value={config[inp.key]} onChange={set(inp.key)} className="border rounded-md px-3 py-2">
                  {inp.options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
