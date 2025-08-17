import { useState } from "react";

function App() {
  const [cards, setCards] = useState([]);
  const [newCardText, setNewCardText] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);

  const colorOptions = [
    "bg-pink-200", "bg-blue-200", "bg-green-200", "bg-yellow-200", 
    "bg-purple-200", "bg-indigo-200", "bg-teal-200", "bg-orange-200",
    "bg-cyan-200", "bg-emerald-200", "bg-violet-200", "bg-rose-200"
  ];

  const addCard = () => {
    if (newCardText.trim()) {
      const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      const newCard = {
        id: Date.now(),
        text: newCardText.trim(),
        color: randomColor
      };
      setCards([...cards, newCard]);
      setNewCardText("");
    }
  };

  const removeCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
    if (selectedCard && selectedCard.id === id) {
      setSelectedCard(null);
    }
  };

  const pickRandomCard = () => {
    if (cards.length === 0) {
      alert("Please add some cards first!");
      return;
    }

    setIsSelecting(true);
    setSelectedCard(null);

    // Simulate selection animation
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * cards.length);
      setSelectedCard(cards[randomIndex]);
      setIsSelecting(false);
    }, 2000);
  };

  const clearAll = () => {
    setCards([]);
    setSelectedCard(null);
    setIsSelecting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 p-15 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-4xl font-display font-bold text-gray-800 mb-1 font-['Comic_Sans_MS']">
            If You Can't I'll Pick For You 🎯
          </h1>
          <h3 className="text-2xl font-bold text-pink-600 mb-2 font-['Comic_Sans_MS']">
            Give Dilemmas I Decide
          </h3>
          <p className="text-lg text-gray-600 font-medium font-['Comic_Sans_MS']">
            Add your options and let me decide!
          </p>
        </div>

        {/* Add Card Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 mb-4 shadow-sm border border-pink-200">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-semibold mb-1">
                Add New Option
              </label>
              <input
                type="text"
                value={newCardText}
                onChange={(e) => setNewCardText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCard()}
                placeholder="Enter your option..."
                className="w-full px-3 py-2 rounded-lg bg-white/80 border border-pink-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent font-medium"
              />
            </div>
            <button
              onClick={addCard}
              className="px-4 py-2 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-semibold rounded-lg hover:from-pink-500 hover:to-rose-500 transition-all duration-200 transform hover:scale-105"
            >
              Add Option
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3 mb-4">
          <button
            onClick={pickRandomCard}
            disabled={isSelecting || cards.length === 0}
            className="px-6 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-display font-bold rounded-xl hover:from-pink-500 hover:to-rose-500 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSelecting ? "Selecting..." : "Pick For Me"}
          </button>
          <button
            onClick={clearAll}
            className="px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white font-display font-bold rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-200 transform hover:scale-105"
          >
            Clear All
          </button>
        </div>

        {/* Cards Grid */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 mb-4 shadow-sm border border-pink-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">Your Options</h3>
          <div className="max-h-48 overflow-y-auto pr-2">
            <div className="grid grid-cols-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className={`${card.color} h-20 w-full rounded-xl p-3 text-gray-800 shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md relative group flex items-center justify-center border border-white/50`}
                >
                  <button
                    onClick={() => removeCard(card.id)}
                    className="absolute top-1 right-1 w-5 h-5 bg-white/60 rounded-full flex items-center justify-center text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white/80 text-sm font-bold"
                  >
                    ×
                  </button>
                  <p className="text-base font-bold text-center leading-tight px-1 font-['Comic_Sans_MS']">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Card Display */}
        {selectedCard && (
          <div className="text-center">
            <div className="inline-block">
              <div className={`${selectedCard.color} h-30 w-full rounded-2xl p-6 text-gray-800 shadow-lg transform animate-bounce flex items-center justify-center border border-white/50`}>
                <div>
                  <h2 className="text-3xl font-display font-bold mb-2 font-['Comic_Sans_MS']">I Picked! 🎉</h2>
                  <p className="text-xl font-bold font-['Comic_Sans_MS']">{selectedCard.text}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Selection Animation */}
        {isSelecting && (
          <div className="text-center">
            <div className="inline-block">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-pink-200">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto mb-3"></div>
                <h2 className="text-xl font-display font-bold text-gray-800 font-['Comic_Sans_MS']">Thinking...</h2>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {cards.length === 0 && !selectedCard && !isSelecting && (
          <div className="text-center text-gray-600">
            <div className="text-4xl mb-2">🤔</div>
            <h3 className="text-lg font-display font-semibold mb-1 font-['Comic_Sans_MS']">No options yet!</h3>
            <p className="font-medium font-['Comic_Sans_MS']">Add some options above and I'll pick for you.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
