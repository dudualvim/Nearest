import { useState } from 'react';

const vantagens = [
    {
        title: "Entenda o Nearest!",
        text: "Descubra como o Nearest pode simplificar sua vida!",
        image: "/images/duvida.svg",
    },
    {
        title: "Encontre-se com quem importa!",
        text: "O Nearest ajuda você a se reunir com as pessoas que você mais deseja!",
        image: "/images/group.svg",
    },
    {
        title: "Encontros simplificados!",
        text: "Não sabe onde marcar um encontro com amigos ou colegas de trabalho? O Nearest resolve isso para você!",
        image: "/images/encontros.svg",
    },
    {
        title: "Reuniões sem complicações!",
        text: "Basta criar uma sala e convidar seus amigos ou colegas. O Nearest recomendará o melhor local para todos!",
        image: "/images/reunioes.svg",
    },
];

const Cards = () => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const handleNextCard = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % vantagens.length);
    };

    const handleBackToHome = () => {
        window.location.href = '/';
    };

    const isLastCard = currentCardIndex === vantagens.length - 1;

    const highlightWord = (title: string, wordIndex: number) => {
        const words = title.split(' ');
        return (
            <>
                {words.map((word, index) => (
                    <span key={index} className={index === wordIndex ? 'text-orange' : ''}>
                        {word}{' '}
                    </span>
                ))}
            </>
        );
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-4/5 md:w-2/4 lg:w-2/4 bg-white shadow-lg rounded-lg overflow-hidden relative dark:bg-slate-800 shadow">
                <div className="flex flex-col items-center justify-center h-full p-8">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8">
                        {highlightWord(vantagens[currentCardIndex].title, 1)}
                    </h3>
                    <p className="text-base md:text-lg lg:text-xl mb-12">{vantagens[currentCardIndex].text}</p>
                    <img src={vantagens[currentCardIndex].image} alt={vantagens[currentCardIndex].title} className="w-48 md:w-56 lg:w-64 h-48 md:h-56 lg:h-64 mb-8 object-cover" />
                </div>
                <div className="absolute bottom-8 right-8">
                    {isLastCard ? (
                        <div onClick={handleBackToHome} className="cursor-pointer">
                            <img src="/images/check.svg" alt="Botão para voltar para a home" className="w-12 h-12" />
                        </div>
                    ) : (
                        <div onClick={handleNextCard} className="cursor-pointer">
                            <img src="/images/arrow.png" alt="Seta para próximo card" className="w-10 h-10" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cards;
