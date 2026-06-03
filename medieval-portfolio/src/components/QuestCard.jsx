const difficultyColors = {
  'SS+': { border: '#d4af37', glow: 'rgba(212, 175, 55, 0.22)', width: '3.5px' },
  'SS': { border: '#9b3d3d', glow: 'rgba(155, 61, 61, 0.18)', width: '3px' },
  'S': { border: '#c9962f', glow: 'rgba(201, 150, 47, 0.18)', width: '2.7px' },
  'A': { border: '#4c6c47', glow: 'rgba(76, 108, 71, 0.18)', width: '2.4px' },
  'B': { border: '#cd8b62', glow: 'rgba(205, 139, 98, 0.18)' },
  'C': { border: '#8a8583', glow: 'rgba(138, 133, 131, 0.18)' },
  'D': { border: '#9d8162', glow: 'rgba(157, 129, 98, 0.16)' },
  'E': { border: '#b9ab8c', glow: 'rgba(185, 171, 140, 0.16)' },
};

export default function QuestCard({ quest, onOpen }) {
  const palette = difficultyColors[quest.difficulty] || difficultyColors.C;

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen(quest);
    }
  };

  return (
    <article
      className="quest-card"
      role="button"
      tabIndex={0}
      onClick={() => onOpen(quest)}
      onKeyDown={handleKeyDown}
      style={{
        '--quest-accent': palette.border,
        '--quest-glow': palette.glow,
        '--quest-border': `${palette.width || '2px'} solid ${palette.border}`,
      }}
      aria-label={`${quest.title}, ${quest.subtitle}`}
    >
      <div className="quest-card__topline">
        <span className="quest-ribbon">{quest.difficulty}</span>
        <span className="quest-type">{quest.type}</span>
      </div>

      <h4 className="quest-title">{quest.title}</h4>
      <p className="quest-subtitle">{quest.subtitle}</p>
      {quest.timeline ? <p className="quest-timeline">{quest.timeline}</p> : null}

      <ul className="quest-preview">
        {quest.details.slice(0, 3).map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>

      <div className="quest-card__footer">
        <span className="quest-reward">{quest.reward}</span>
        <span className="quest-open">Open quest →</span>
      </div>
    </article>
  );
}
