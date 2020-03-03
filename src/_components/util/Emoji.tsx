import React from 'react';

interface IEmoji {
    label: string;
    emoji: string;
}

const Emoji: React.FC<IEmoji> = ({label, emoji}) => {
return <span role="img" aria-label={label}>{emoji}</span>
}

export default Emoji;