"use client";

import { useState, useEffect } from "react";

interface CelestialBody {
  Q: number;
  k: number;
  m: number;
  R: number;
  description: string;
  color: string;
  category: string;
  image?: string;
}

const bodies: Record<string, CelestialBody> = {
  // Moons
  Moon: { 
    Q: 38, 
    k: 0.025, 
    m: 7.35e22, 
    R: 1.737e6,
    description: "Earth's natural satellite",
    color: "from-slate-400 to-slate-600",
    category: "Moons",
    image: "/moon.jpg"
  },
  Ganymede: { 
    Q: 50, 
    k: 0.32, 
    m: 1.48e23, 
    R: 2.63e6,
    description: "Jupiter's largest moon",
    color: "from-blue-400 to-indigo-600",
    category: "Moons",
    image: "/ganymede.jpg"
  },
  Europa: { 
    Q: 100, 
    k: 0.26, 
    m: 4.8e22, 
    R: 1.56e6,
    description: "Jupiter's icy moon",
    color: "from-blue-400 to-cyan-600",
    category: "Moons",
    image: "/europa.webp"
  },
  Io: {
    Q: 15,
    k: 0.6,
    m: 8.93e22,
    R: 1.82e6,
    description: "Jupiter's volcanic moon",
    color: "from-orange-400 to-red-600",
    category: "Moons",
    image: "/io.jpg"
  },
  Enceladus: {
    Q: 80,
    k: 0.3,
    m: 1.08e20,
    R: 2.52e5,
    description: "Saturn's icy moon",
    color: "from-cyan-400 to-blue-600",
    category: "Moons",
    image: "/enceladus.jpg"
  },
  Titan: {
    Q: 60,
    k: 0.4,
    m: 1.35e23,
    R: 2.58e6,
    description: "Saturn's largest moon",
    color: "from-orange-400 to-yellow-600",
    category: "Moons",
    image: "/titan.jpg"
  },
  Miranda: {
    Q: 70,
    k: 0.2,
    m: 6.6e19,
    R: 2.36e5,
    description: "Uranus's small moon",
    color: "from-purple-400 to-pink-600",
    category: "Moons",
    image: "/miranda.jpeg"
  },
  Triton: {
    Q: 45,
    k: 0.35,
    m: 2.14e22,
    R: 1.35e6,
    description: "Neptune's largest moon",
    color: "from-blue-400 to-purple-600",
    category: "Moons",
    image: "/triton.jpeg"
  },
  Charon: {
    Q: 55,
    k: 0.25,
    m: 1.59e21,
    R: 6.06e5,
    description: "Pluto's largest moon",
    color: "from-gray-400 to-slate-600",
    category: "Moons",
    image: "/charon.jpg"
  },

  // Planets
  Mercury: {
    Q: 100,
    k: 0.3,
    m: 3.3e23,
    R: 2.44e6,
    description: "Innermost planet",
    color: "from-gray-400 to-slate-600",
    category: "Planets",
    image: "/mercury.jpg"
  },
  Venus: {
    Q: 80,
    k: 0.25,
    m: 4.87e24,
    R: 6.05e6,
    description: "Earth's twin",
    color: "from-yellow-400 to-orange-600",
    category: "Planets",
    image: "/venus.webp"
  },
  Earth: {
    Q: 12,
    k: 0.3,
    m: 5.97e24,
    R: 6.37e6,
    description: "Our home planet",
    color: "from-blue-400 to-green-600",
    category: "Planets",
    image: "/earth.webp"
  },
  Mars: {
    Q: 80,
    k: 0.15,
    m: 6.42e23,
    R: 3.39e6,
    description: "The red planet",
    color: "from-red-400 to-orange-600",
    category: "Planets",
    image: "/mars.jpg"
  },
  Jupiter: {
    Q: 5,
    k: 0.5,
    m: 1.90e27,
    R: 7.15e7,
    description: "Gas giant",
    color: "from-orange-400 to-red-600",
    category: "Planets",
    image: "/jupiter.png"
  },
  Saturn: {
    Q: 18,
    k: 0.34,
    m: 5.68e26,
    R: 6.03e7,
    description: "Ringed planet",
    color: "from-yellow-400 to-orange-600",
    category: "Planets",
    image: "/saturn.jpg"
  },
  Uranus: {
    Q: 30,
    k: 0.23,
    m: 8.68e25,
    R: 2.56e7,
    description: "Ice giant",
    color: "from-cyan-400 to-blue-600",
    category: "Planets",
    image: "/uranus.png"
  },
  Neptune: {
    Q: 25,
    k: 0.24,
    m: 1.02e26,
    R: 2.46e7,
    description: "Windy ice giant",
    color: "from-blue-400 to-purple-600",
    category: "Planets",
    image: "/neptune.jpg"
  },
  Pluto: {
    Q: 100,
    k: 0.1,
    m: 1.31e22,
    R: 1.19e6,
    description: "Dwarf planet",
    color: "from-gray-400 to-slate-600",
    category: "Planets",
    image: "/pluto.jpg"
  },

  // Stars
  "Proxima Centauri": {
    Q: 1,
    k: 0.1,
    m: 2.45e29,
    R: 1.07e8,
    description: "Nearest star to Sun",
    color: "from-red-400 to-orange-600",
    category: "Stars",
    image: "/proximacenturai.jpg"
  },
  Sun: {
    Q: 1,
    k: 0.1,
    m: 1.99e30,
    R: 6.96e8,
    description: "Our star",
    color: "from-yellow-400 to-orange-600",
    category: "Stars",
    image: "/sun.jpg"
  },
  "Sirius A": {
    Q: 1,
    k: 0.1,
    m: 4.0e30,
    R: 1.19e9,
    description: "Brightest star in night sky",
    color: "from-white-400 to-blue-600",
    category: "Stars",
    image: "/sirius.webp"
  },
  Rigel: {
    Q: 1,
    k: 0.1,
    m: 2.1e31,
    R: 7.4e10,
    description: "Blue supergiant",
    color: "from-blue-400 to-cyan-600",
    category: "Stars",
    image: "/rigel.webp"
  },
  Betelgeuse: {
    Q: 1,
    k: 0.1,
    m: 2.2e31,
    R: 8.2e10,
    description: "Red supergiant",
    color: "from-red-400 to-orange-600",
    category: "Stars",
    image: "/betelgeuse.jpg"
  },

  // Black Holes
  "Sagittarius A*": {
    Q: 1,
    k: 0.1,
    m: 8.2e36,
    R: 1.2e10,
    description: "Milky Way's central black hole",
    color: "from-purple-400 to-black-600",
    category: "Black Holes",
    image: "/sagittarius-a.jpg"
  },
  "TON 618": {
    Q: 1,
    k: 0.1,
    m: 6.6e40,
    R: 1.9e13,
    description: "Ultramassive black hole",
    color: "from-black-400 to-purple-600",
    category: "Black Holes",
    image: "/tonsixoneeight.jpg"
  },

  // Exotic Objects
  "White Dwarf": {
    Q: 10,
    k: 0.01,
    m: 1.0e30,
    R: 7.0e6,
    description: "Dense stellar remnant (e.g., Sirius B)",
    color: "from-white-400 to-blue-300",
    category: "Exotic Objects",
    image: "/white-dwarf-stars.jpg"
  },
  "Neutron Star": {
    Q: 5,
    k: 0.005,
    m: 2.8e30,
    R: 1.2e4,
    description: "Ultra-dense collapsed star",
    color: "from-blue-800 to-gray-900",
    category: "Exotic Objects",
    image: "/neutronstar.jpg"
  },
  "16 Psyche": {
    Q: 100,
    k: 0.2,
    m: 2.72e19,
    R: 1.13e5,
    description: "Metal-rich asteroid in the asteroid belt",
    color: "from-gray-400 to-yellow-600",
    category: "Exotic Objects",
    image: "/psyche.jpg"
  },
  "Halley's Comet": {
    Q: 200,
    k: 0.05,
    m: 2.2e14,
    R: 1.15e4,
    description: "Famous periodic comet",
    color: "from-cyan-300 to-blue-500",
    category: "Exotic Objects",
    image: "/halleycomet.jpg"
  },

  // Custom option
  Custom: { 
    Q: 0, 
    k: 0, 
    m: 0, 
    R: 0,
    description: "Define your own celestial body",
    color: "from-purple-400 to-pink-600",
    category: "Custom"
  },
};

const variableExplanations: Record<string, { label: string; unit: string; description: string }> = {
  Q: { 
    label: "Tidal Dissipation Factor", 
    unit: "", 
    description: "How efficiently energy is lost through tidal friction. Higher values mean slower tidal locking." 
  },
  m: { 
    label: "Mass of Smaller Body", 
    unit: "kg", 
    description: "The mass of the moon or smaller celestial body being tidally locked." 
  },
  a: { 
    label: "Orbital Distance", 
    unit: "m", 
    description: "The distance between the centers of the two bodies." 
  },
  k: { 
    label: "Love Number", 
    unit: "", 
    description: "How easily the smaller body deforms under tidal forces. Higher values mean faster locking." 
  },
  M: { 
    label: "Mass of Larger Body", 
    unit: "kg", 
    description: "The mass of the planet or larger body that causes the tidal locking." 
  },
  R: { 
    label: "Radius of Smaller Body", 
    unit: "m", 
    description: "The radius of the moon or smaller celestial body." 
  },
  P: { 
    label: "Initial Rotation Period", 
    unit: "s", 
    description: "The original rotation period of the smaller body before tidal locking." 
  },
};

export default function Home() {
  const [body, setBody] = useState("Moon");
  const [inputs, setInputs] = useState({
    Q: bodies["Moon"].Q.toString(),
    k: bodies["Moon"].k.toString(),
    m: bodies["Moon"].m.toString(),
    R: bodies["Moon"].R.toString(),
    a: "",
    M: "",
    P: "",
  });
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [infoOpen, setInfoOpen] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Moons");
  const [massRole, setMassRole] = useState<"smaller" | "larger">("smaller");
  const [smallerMass, setSmallerMass] = useState<string | null>(null);
  const [largerMass, setLargerMass] = useState<string | null>(null);
  const [showNumberChart, setShowNumberChart] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setBody(selected);
    const values = bodies[selected];
    setInputs((prev) => ({
      ...prev,
      Q: values.Q.toString(),
      k: values.k.toString(),
      m: values.m.toString(),
      R: values.R.toString(),
    }));
  };

  const isValid = () => {
    const values = Object.values(inputs);
    if (values.some((v) => v === "" || isNaN(Number(v)))) return false;

    const { Q, k, m, R, a, M, P } = Object.fromEntries(
      Object.entries(inputs).map(([k, v]) => [k, parseFloat(v)])
    );

    if (M <= m) {
      setError("Larger body mass (M) must be greater than smaller body mass (m).");
      return false;
    }
    if (a <= R) {
      setError("Orbital distance (a) must be greater than the radius (R) of the smaller body.");
      return false;
    }
    return true;
  };

  const calculate = async () => {
    if (!isValid()) {
      setResult(null);
      return;
    }

    setIsCalculating(true);
    setError("");
    
    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    const Q = parseFloat(inputs.Q);
    const m = parseFloat(inputs.m);
    const a = parseFloat(inputs.a);
    const k = parseFloat(inputs.k);
    const M = parseFloat(inputs.M);
    const R = parseFloat(inputs.R);
    const P = parseFloat(inputs.P);

    const t = (Q * m * a ** 6) / (k * M ** 2 * R ** 5 * P);
    setResult(t);
    setShowResult(true);
    setIsCalculating(false);
  };

  const formatTime = (seconds: number): string => {
    if (seconds === 0) return `approximately 0 seconds`;
    if (seconds < 60) return `${seconds.toFixed(2)} seconds`;
    if (seconds < 3600) return `${(seconds / 60).toFixed(2)} minutes`;
    if (seconds < 86400) return `${(seconds / 3600).toFixed(2)} hours`;
    if (seconds < 31536000) return `${(seconds / 86400).toFixed(2)} days`;
    if (seconds < 3.1536e7 * 1e6) return `${(seconds / 3.1536e7).toFixed(2)} years`;
    if (seconds < 3.1536e7 * 1e9) return `${(seconds / (3.1536e7 * 1e6)).toFixed(2)} million years`;
    if (seconds < 3.1536e7 * 1e12) return `${(seconds / (3.1536e7 * 1e9)).toFixed(2)} billion years`;
    if (seconds < 3.1536e7 * 1e15) return `${(seconds / (3.1536e7 * 1e12)).toFixed(2)} trillion years`;
    if (seconds < 3.1536e7 * 1e18) return `${(seconds / (3.1536e7 * 1e15)).toFixed(2)} quadrillion years`;
    if (seconds < 3.1536e7 * 1e21) return `${(seconds / (3.1536e7 * 1e18)).toFixed(2)} quintillion years`;
    if (seconds < 3.1536e7 * 1e24) return `${(seconds / (3.1536e7 * 1e21)).toFixed(2)} sextillion years`;
    if (seconds < 3.1536e7 * 1e27) return `${(seconds / (3.1536e7 * 1e24)).toFixed(2)} septillion years`;
    if (seconds < 3.1536e7 * 1e30) return `${(seconds / (3.1536e7 * 1e27)).toFixed(2)} octillion years`;
    if (seconds < 3.1536e7 * 1e33) return `${(seconds / (3.1536e7 * 1e30)).toFixed(2)} nonillion years`;
    if (seconds < 3.1536e7 * 1e36) return `${(seconds / (3.1536e7 * 1e33)).toFixed(2)} decillion years`;
    return `${(seconds / (3.1536e7 * 1e36)).toFixed(2)} undecillion years`;
  };

  const getBodyIcon = (bodyName: string) => {
    switch (bodyName) {
      // Moons
      case "Moon": return "🌙";
      case "Ganymede": return "🪐";
      case "Europa": return "🌊";
      case "Io": return "🌋";
      case "Enceladus": return "❄️";
      case "Titan": return "🪐";
      case "Miranda": return "💎";
      case "Triton": return "🌊";
      case "Charon": return "🪐";
      
      // Planets
      case "Mercury": return "☿";
      case "Venus": return "♀";
      case "Earth": return "🌍";
      case "Mars": return "♂";
      case "Jupiter": return "♃";
      case "Saturn": return "♄";
      case "Uranus": return "♅";
      case "Neptune": return "♆";
      case "Pluto": return "♇";
      
      // Stars
      case "Proxima Centauri": return null;
      case "Sun": return null;
      case "Sirius A": return null;
      case "Rigel": return null;
      case "Betelgeuse": return null;
      
      // Black Holes
      case "Sagittarius A*": return null;
      case "TON 618": return null;
      
      // Exotic Objects
      case "White Dwarf": return null;
      case "Neutron Star": return "🌀";
      case "16 Psyche": return "🪨";
      case "Halley's Comet": return "☄️";
      
      // Custom
      case "Custom": return "⭐";
      default: return "🌍";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Moons": return "🌙";
      case "Planets": return "🪐";
      case "Stars": return "⭐";
      case "Black Holes": return "🕳️";
      case "Exotic Objects": return "🧬";
      case "Custom": return "⚙️";
      default: return "🌍";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-star-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Floating nebula effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl animate-nebula-pulse"
          style={{
            left: '10%',
            top: '20%',
            animationDelay: '0s'
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-nebula-pulse"
          style={{
            right: '15%',
            top: '60%',
            animationDelay: '2s'
          }}
        />
        <div 
          className="absolute w-72 h-72 bg-gradient-to-r from-pink-500/10 to-cyan-500/10 rounded-full blur-3xl animate-nebula-pulse"
          style={{
            left: '60%',
            bottom: '10%',
            animationDelay: '4s'
          }}
        />
      </div>

      {/* Cosmic particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-cosmic-drift"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <main className="relative z-10 min-h-screen p-6 flex flex-col items-center">
                <div className="max-w-4xl w-full">

            {/* Header */}
            <div className="text-center mb-8 animate-fade-in mt-12">
            <h1 className="text-6xl font-bold mb-4 gradient-text animate-float" style={{ fontFamily: 'Times New Roman, serif' }}>
               Tidal Locking Calculator
            </h1>
            <p className="text-xl text-gray-300 mb-2">
              Explore the cosmic dance of celestial bodies
            </p>
            <p className="text-sm text-gray-400 italic">
              t = (Q × m × a⁶) / (k × M² × R⁵ × P)
            </p>
            <div className="mt-4 flex justify-center space-x-2">
              <span className="text-cyan-400">✦</span>
              <span className="text-purple-400">✦</span>
              <span className="text-pink-400">✦</span>
            </div>
          </div>

          {/* Body Selection */}
          <div className="glass rounded-2xl p-6 mb-8 animate-fade-in">
            <label className="block mb-4">
              <span className="text-lg font-semibold text-gray-200 mb-2 block">Choose a Celestial Body</span>
              
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {["Moons", "Planets", "Stars", "Black Holes", "Exotic Objects", "Custom"].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 flex items-center gap-2 ${
                      selectedCategory === category
                        ? "border-cyan-400 bg-cyan-400/20 text-cyan-400"
                        : "border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500"
                    }`}
                  >
                    <span>{getCategoryIcon(category)}</span>
                    <span>{category}</span>
                  </button>
                ))}
              </div>

              {/* Mass Role Toggle */}
              <div className="mb-6">
                <span className="text-sm text-gray-300 mb-2 block">Selected body will be:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setMassRole("smaller")}
                    className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 flex items-center gap-2 ${
                      massRole === "smaller"
                        ? "border-green-400 bg-green-400/20 text-green-400"
                        : "border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500"
                    }`}
                  >
                    <span>🌙</span>
                    <span>Smaller Mass (m)</span>
                  </button>
                  <button
                    onClick={() => setMassRole("larger")}
                    className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 flex items-center gap-2 ${
                      massRole === "larger"
                        ? "border-orange-400 bg-orange-400/20 text-orange-400"
                        : "border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500"
                    }`}
                  >
                    <span>🪐</span>
                    <span>Larger Mass (M)</span>
                  </button>
                </div>
              </div>

              {/* Bodies Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(bodies)
                  .filter(([name, data]) => data.category === selectedCategory)
                  .map(([name, data]) => (
                    <button
                      key={name}
                      onClick={() => {
                        setBody(name);
                        if (massRole === "smaller") {
                          setSmallerMass(name);
                          setInputs((prev) => ({
                            ...prev,
                            Q: data.Q.toString(),
                            k: data.k.toString(),
                            m: data.m.toString(),
                            R: data.R.toString(),
                          }));
                        } else {
                          setLargerMass(name);
                          setInputs((prev) => ({
                            ...prev,
                            Q: data.Q.toString(),
                            k: data.k.toString(),
                            M: data.m.toString(),
                            R: data.R.toString(),
                          }));
                        }
                      }}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        body === name
                          ? `border-cyan-400 bg-gradient-to-r ${data.color} bg-opacity-20`
                          : massRole === "smaller" && name === "TON 618"
                          ? "border-red-600 bg-red-900/20 opacity-50 cursor-not-allowed"
                          : "border-gray-600 bg-gray-800/50 hover:border-gray-500"
                      }`}
                      disabled={massRole === "smaller" && name === "TON 618"}
                    >
                      <div className="text-2xl mb-2">
                        {(([
                          "White Dwarf",
                          "Sagittarius A*",
                          "TON 618",
                          "Proxima Centauri",
                          "Sun",
                          "Sirius A",
                          "Rigel",
                          "Betelgeuse",
                          "Neutron Star",
                          "16 Psyche",
                          "Halley's Comet",
                          "Mercury",
                          "Venus",
                          "Earth",
                          "Mars",
                          "Jupiter",
                          "Saturn",
                          "Uranus",
                          "Neptune",
                          "Pluto",
                          "Ganymede",
                          "Europa",
                          "Io",
                          "Enceladus",
                          "Titan",
                          "Miranda",
                          "Triton",
                          "Charon",
                          "Moon",


                        ].includes(name)) && data.image) ? (
                          <img src={data.image} alt={name} className="w-28 h-28 object-contain mx-auto" />
                        ) : getBodyIcon(name)}
                      </div>
                      <div className="font-semibold text-white">{name}</div>
                      <div className="text-sm text-gray-400">{data.description}</div>
                      {massRole === "smaller" && name === "TON 618" && (
                        <div className="mt-2 text-xs text-red-400 bg-red-900/20 px-2 py-1 rounded">
                          ⚠️ Too massive for smaller mass
                        </div>
                      )}
                    </button>
                  ))}
              </div>
            </label>
          </div>

          {/* Current Selection Display */}
          <div className="glass rounded-2xl p-6 mb-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-center text-white">Current Selection</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Smaller Mass */}
              <div>
                <div className="text-sm text-gray-300 mb-2 flex items-center gap-2">
                  <span>🌙</span>
                  <span>Smaller Mass (m)</span>
                </div>
                {smallerMass ? (
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <div className="text-2xl mb-2">
                      {bodies[smallerMass]?.image ? (
                        <img src={bodies[smallerMass].image} alt={smallerMass} className="w-28 h-28 object-contain mx-auto" />
                      ) : getBodyIcon(smallerMass)}
                    </div>
                    <div className="font-semibold text-white text-lg">{smallerMass}</div>
                    <div className="text-sm text-gray-400">{bodies[smallerMass]?.description}</div>
                  </div>
                ) : (
                  <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-4 text-gray-400 text-center">
                    <div className="text-2xl mb-2">🌙</div>
                    <div>No selection yet</div>
                    <div className="text-xs mt-1">Select a body as smaller mass</div>
                  </div>
                )}
              </div>

              {/* Larger Mass */}
              <div>
                <div className="text-sm text-gray-300 mb-2 flex items-center gap-2">
                  <span>🪐</span>
                  <span>Larger Mass (M)</span>
                </div>
                {largerMass ? (
                  <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
                    <div className="text-2xl mb-2">
                      {bodies[largerMass]?.image ? (
                        <img src={bodies[largerMass].image} alt={largerMass} className="w-28 h-28 object-contain mx-auto" />
                      ) : getBodyIcon(largerMass)}
                    </div>
                    <div className="font-semibold text-white text-lg">{largerMass}</div>
                    <div className="text-sm text-gray-400">{bodies[largerMass]?.description}</div>
                  </div>
                ) : (
                  <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-4 text-gray-400 text-center">
                    <div className="text-2xl mb-2">🪐</div>
                    <div>No selection yet</div>
                    <div className="text-xs mt-1">Select a body as larger mass</div>
                  </div>
                )}
              </div>
            </div>

            {/* Clear All Button */}
            {(smallerMass || largerMass) && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setSmallerMass(null);
                    setLargerMass(null);
                    setInputs({
                      Q: "",
                      k: "",
                      m: "",
                      R: "",
                      a: "",
                      M: "",
                      P: "",
                    });
                  }}
                  className="px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-600/30 transition-colors"
                >
                  🗑️ Clear All Selections
                </button>
              </div>
            )}
          </div>

          {/* Input Form */}
          <div className="glass rounded-2xl p-6 mb-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-center text-white">Celestial Parameters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(variableExplanations).map(([key, info]) => (
                <div key={key} className="relative group">
                  <label className="block text-sm font-medium mb-2 text-gray-200 flex items-center gap-2">
                    {info.label}
                    {body !== "Custom" && (massRole === "smaller" ? ["Q", "k", "m", "R"] : ["Q", "k", "M", "R"]).includes(key) && (
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                        Auto-filled
                      </span>
                    )}
                    <button
                      type="button"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                      onClick={() => setInfoOpen(infoOpen === key ? null : key)}
                    >
                      ℹ️
                    </button>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name={key}
                      value={inputs[key as keyof typeof inputs]}
                      onChange={handleChange}
                                           className="w-full p-3 rounded-lg bg-gray-800/80 border border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 input-focus"
                     placeholder={`Enter ${info.label.toLowerCase()}`}
                     disabled={
                       body !== "Custom" && 
                       (massRole === "smaller" ? ["Q", "k", "m", "R"] : ["Q", "k", "M", "R"]).includes(key)
                     }
                    />
                    {info.unit && (
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                        {info.unit}
                      </span>
                    )}
                  </div>
                  {infoOpen === key && (
                    <div className="absolute z-10 mt-2 p-3 bg-gray-900/95 border border-gray-600 rounded-lg text-sm text-gray-300 max-w-xs">
                      {info.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Calculate Button */}
          <div className="text-center mb-8">
            <button
              onClick={calculate}
              disabled={isCalculating}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold text-white text-lg shadow-lg hover:shadow-xl transform hover:scale-105 btn-space animate-glow"
            >
              {isCalculating ? (
                <div className="flex items-center gap-2">
                  <div className="spinner"></div>
                  Calculating...
                </div>
              ) : (
                "🚀 Calculate Tidal Locking Time"
              )}
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-4 mb-6 text-red-300">
              ⚠️ {error}
            </div>
          )}

          {/* Result Display */}
          {showResult && result !== null && (
            <div className="glass rounded-xl p-8 text-center animate-fade-in border border-green-500/30">
              <div className="mb-4">
                <span className="text-4xl">⏳</span>
              </div>
              <h3 className="text-3xl font-bold text-green-400 mb-4">Tidal Locking Timescale</h3>
              <div className="text-5xl font-bold text-white mb-3 animate-float">
                {formatTime(result)}
              </div>
              <p className="text-gray-300 text-sm mb-4">
                ({result.toExponential(3)} seconds)
              </p>
              <div className="text-sm text-gray-400 max-w-md mx-auto">
                This is the estimated time for the smaller body to become tidally locked to the larger body, 
                creating a cosmic dance where one face always points toward its companion.
              </div>
              <div className="mt-6 flex justify-center space-x-4">
                <span className="text-cyan-400">🌙</span>
                <span className="text-purple-400">✨</span>
                <span className="text-pink-400">🌌</span>
              </div>
              <div className="mt-8">
                <button
                  className="px-4 py-2 bg-blue-600/20 border border-blue-400/30 rounded-lg text-blue-300 hover:bg-blue-600/30 transition-colors font-semibold"
                  onClick={() => setShowNumberChart(true)}
                >
                  📊 Check Number
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-400 text-sm animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span>Made with</span>
            <span className="text-red-400 animate-pulse">❤️</span>
            <span>by Kamalesh Motamarri</span>
          </div>
          <div className="text-xs text-gray-500 mb-2">
            Exploring the mysteries of celestial mechanics
          </div>
          <div className="flex justify-center space-x-3 text-lg">
            <span className="text-cyan-400 animate-star-twinkle">✦</span>
            <span className="text-purple-400 animate-star-twinkle" style={{animationDelay: '0.5s'}}>✦</span>
            <span className="text-pink-400 animate-star-twinkle" style={{animationDelay: '1s'}}>✦</span>
          </div>
        </footer>
      </main>

      {/* Number Chart Modal */}
      {showNumberChart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-gray-900 border border-blue-400 rounded-xl p-12 max-w-2xl w-full relative animate-fade-in overflow-x-auto">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl"
              onClick={() => setShowNumberChart(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h4 className="text-2xl font-bold text-blue-400 mb-4 text-center">Large Number Names</h4>
            <table className="w-full text-left text-gray-200 border-collapse">
              <thead>
                <tr className="border-b border-blue-400/30">
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="py-1 px-3">Million</td><td className="py-1 px-3">1,000,000 (10⁶)</td></tr>
                <tr><td className="py-1 px-3">Billion</td><td className="py-1 px-3">1,000,000,000 (10⁹)</td></tr>
                <tr><td className="py-1 px-3">Trillion</td><td className="py-1 px-3">1,000,000,000,000 (10¹²)</td></tr>
                <tr><td className="py-1 px-3">Quadrillion</td><td className="py-1 px-3">1,000,000,000,000,000 (10¹⁵)</td></tr>
                <tr><td className="py-1 px-3">Quintillion</td><td className="py-1 px-3">1,000,000,000,000,000,000 (10¹⁸)</td></tr>
                <tr><td className="py-1 px-3">Sextillion</td><td className="py-1 px-3">1,000,000,000,000,000,000,000 (10²¹)</td></tr>
                <tr><td className="py-1 px-3">Septillion</td><td className="py-1 px-3">1,000,000,000,000,000,000,000,000 (10²⁴)</td></tr>
                <tr><td className="py-1 px-3">Octillion</td><td className="py-1 px-3">1,000,000,000,000,000,000,000,000,000 (10²⁷)</td></tr>
                <tr><td className="py-1 px-3">Nonillion</td><td className="py-1 px-3">1,000,000,000,000,000,000,000,000,000,000 (10³⁰)</td></tr>
                <tr><td className="py-1 px-3">Decillion</td><td className="py-1 px-3">1,000,000,000,000,000,000,000,000,000,000,000 (10³³)</td></tr>
                <tr><td className="py-1 px-3">Undecillion</td><td className="py-1 px-3">1,000,000,000,000,000,000,000,000,000,000,000,000 (10³⁶)</td></tr>
              </tbody>
            </table>
            <div className="mt-4 text-xs text-gray-400 text-center">These names help you understand the scale of cosmic timescales!</div>
          </div>
        </div>
      )}
    </div>
  );
}
