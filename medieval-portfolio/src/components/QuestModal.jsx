import { useEffect } from 'react';

export default function QuestModal({ quest, onClose }) {
  useEffect(() => {
    if (!quest) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [quest, onClose]);

  if (!quest) return null;

  return (
    <div className="quest-modal" role="dialog" aria-modal="true" aria-labelledby="quest-modal-title" onClick={onClose}>
      <div className="quest-modal__panel" onClick={(event) => event.stopPropagation()}>
        <button className="quest-modal__close" type="button" onClick={onClose} aria-label="Close quest details">
          ✕
        </button>

        <p className="eyebrow">Quest Details</p>
        <h4 id="quest-modal-title" className="quest-modal__title">
          {quest.title}
        </h4>
        <p className="quest-modal__subtitle">{quest.subtitle}</p>
        {quest.timeline ? <p className="quest-modal__timeline">{quest.timeline}</p> : null}

        <div className="quest-modal__content">
          <section>
            <h5>Objectives</h5>
            <ul>
              {quest.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </section>

          <section>
            <h5>Reward</h5>
            <p>{quest.reward}</p>
          </section>

          {quest.stack?.length ? (
            <section>
              <h5>Tools Used</h5>
              <div className="chip-group">
                {quest.stack.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <div className="quest-modal__actions">
          {quest.link ? (
            <a className="button primary" href={quest.link} target="_blank" rel="noreferrer">
              View Related Work
            </a>
          ) : (
            <a className="button primary" href="#projects">
              See Project Section
            </a>
          )}

          <a className="button secondary" href={`mailto:dominicguevarra08@gmail.com?subject=${encodeURIComponent(`Let\'s talk about ${quest.title}`)}`}>
            Discuss this quest
          </a>
        </div>
      </div>
    </div>
  );
}
