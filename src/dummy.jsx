import  {useState} from "react"

function App() {
    const [cards, setCards] = useState([]);
    const [newCardText, setNewCardText] = useState("");
    const [selectedCard, setSelectedCard] = useState(null);
    const [isSelecting, setIsSelecting] = useState(false);

    const colorOptions = ["", "", "",]

    const addCard = () => {
        if(newCardText.trim()) {
            const randomColor = colorOptions[maths.floor(Math.random() * colorOptions.length)];
            const newCard = {
                id: Date.now(),
                text: newCardText.trim(),
                color: randomColor
            };
            setCards([...cards, newCard]);
            setNewCardText("");
        }
    }
}