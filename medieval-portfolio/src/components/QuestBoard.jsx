import React, { useEffect, useMemo, useState } from "react";
import "./QuestBoard.css";
import quests from "../data/quests";

const TAB_OPTIONS = [
  { key: "Main", label: "Main" },
  { key: "Side", label: "Side" },
  { key: "Guild", label: "Guild" },
  { key: "All", label: "All" },
];

const CARD_VARIANTS = [
  { rotate: -2.4, offsetY: -10, pin: "red" },
  { rotate: 1.8, offsetY: 12, pin: "brass" },
  { rotate: -1.2, offsetY: 4, pin: "green" },
  { rotate: 2.2, offsetY: -6, pin: "red" },
  { rotate: -0.8, offsetY: 16, pin: "brass" },
  { rotate: 1.1, offsetY: -12, pin: "green" },
];

const rankClassMap = {
  SS: "rank-ss",
  "SS+": "rank-ss",
  S: "rank-s",
  "S+": "rank-s",
  A: "rank-a",
  "A+": "rank-a",
  B: "rank-b",
  "B+": "rank-b",
  C: "rank-c",
  D: "rank-d",
};

function getQuestMeta(quest, index) {
  const variant = CARD_VARIANTS[index % CARD_VARIANTS.length];
  return {
    rotate: quest.angle ?? variant.rotate,
    offsetY: quest.offsetY ?? variant.offsetY,
    pin: quest.pin ?? variant.pin,
  };
}

function QuestTabs({ activeTab, onChange }) {
  return (
    <div className="quest-tabs" role="tablist" aria-label="Quest categories">
      {TAB_OPTIONS.map((tab) => (
        <button
          key={tab.key}
          type="button"
          role="tab"
          aria-selected={activeTab === tab.key}
          className={`quest-tab ${activeTab === tab.key ? "active" : ""}`}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function QuestCard({ quest, index, onOpen }) {
  const meta = getQuestMeta(quest, index);
  const rankClass = rankClassMap[quest.difficulty] || "rank-default";
  const featured = quest.type === "Main" && (quest.difficulty === "SS" || quest.difficulty === "SS+");

  return (
    <article
      className={`quest-card ${featured ? "featured" : ""} ${quest.type.toLowerCase()}`}
      style={{
        transform: `translateY(${meta.offsetY}px) rotate(${meta.rotate}deg)`,
      }}
    >
      <span className={`quest-pin ${meta.pin}`} aria-hidden="true" />

      <div className="quest-card-top">
        <span className={`quest-rank ${rankClass}`}>{quest.difficulty || "A"}</span>
        <span className="quest-type">{quest.type || "Main"}</span>
      </div>

      <div className="quest-card-body">
        <h3 className="quest-title">{quest.title}</h3>

        {quest.subtitle && <p className="quest-role">{quest.subtitle}</p>}

        {quest.timeline && <p className="quest-date">{quest.timeline}</p>}

        {Array.isArray(quest.details) && quest.details.length > 0 && (
          <ul className="quest-points">
            {quest.details.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="quest-card-footer">
        {quest.reward && <p className="quest-rewards">{quest.reward}</p>}

        <button
          type="button"
          className="quest-open"
          onClick={() => onOpen(quest)}
          aria-label={`Open quest: ${quest.title}`}
        >
          Open quest <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
}

function QuestModal({ quest, onClose }) {
  useEffect(() => {
    if (!quest) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [quest, onClose]);

  if (!quest) return null;

  const rankClass = rankClassMap[quest.difficulty] || "rank-default";

  return (
    <div className="quest-modal-backdrop" onClick={onClose}>
      <div
        className="quest-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quest-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="quest-modal-close"
          onClick={onClose}
          aria-label="Close quest details"
        >
          ×
        </button>

        <div className="quest-modal-header">
          <span className={`quest-rank ${rankClass}`}>{quest.difficulty || "A"}</span>
          <span className="quest-modal-category">{quest.type || "Main"} quest</span>
        </div>

        <h3 id="quest-modal-title" className="quest-modal-title">
          {quest.title}
        </h3>

        {quest.subtitle && <p className="quest-modal-role">{quest.subtitle}</p>}

        {quest.timeline && <p className="quest-modal-date">{quest.timeline}</p>}

        {Array.isArray(quest.details) && quest.details.length > 0 && (
          <ul className="quest-modal-points">
            {quest.details.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        )}

        {quest.reward && (
          <div className="quest-modal-section">
            <h4>Rewards gained</h4>
            <p className="quest-modal-summary">{quest.reward}</p>
          </div>
        )}

        {Array.isArray(quest.images) && quest.images.length > 0 && (
          <div className="quest-modal-section">
            <h4>Quest gallery</h4>
            <div className="quest-image-grid">
              {quest.images.map((image, idx) => (
                <div key={idx} className="quest-image-card">
                  <img
                    src={`/images/quests/${image}`}
                    alt={`${quest.title} preview ${idx + 1}`}
                    className="quest-image"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <span className="quest-image-name">{image}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function QuestBoard() {
  const [activeTab, setActiveTab] = useState("Main");
  const [selectedQuest, setSelectedQuest] = useState(null);

  const filteredQuests = useMemo(() => {
    if (!Array.isArray(quests)) return [];
    if (activeTab === "All") return quests;
    return quests.filter((quest) => quest.type === activeTab);
  }, [activeTab]);

  return (
    <section className="quest-board-section" id="quest-board" aria-labelledby="quest-board-title">
      <div className="quest-board-header">
        <p className="quest-kicker">The Archive</p>
        <h2 id="quest-board-title">Quest Board</h2>
        <p className="quest-intro">
          A record of campaigns, commissions, side adventures, and guild achievements
          throughout my developer journey.
        </p>
      </div>

      <QuestTabs activeTab={activeTab} onChange={setActiveTab} />

      <div className="quest-board-frame">
        <div className="quest-board-surface">
          <div className="quest-grid">
            {filteredQuests.map((quest, index) => (
              <QuestCard
                key={quest.id || `${quest.title}-${index}`}
                quest={quest}
                index={index}
                onOpen={setSelectedQuest}
              />
            ))}
          </div>
        </div>
      </div>

      <QuestModal quest={selectedQuest} onClose={() => setSelectedQuest(null)} />
    </section>
  );
}