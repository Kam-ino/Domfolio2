const tabs = ['Main', 'Side', 'Guild', 'All'];

export default function QuestTabs({ active, setActive }) {
  return (
    <div className="quest-tabs" role="tablist" aria-label="Quest categories">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          role="tab"
          aria-selected={active === tab}
          className={`quest-tab ${active === tab ? 'is-active' : ''}`}
          onClick={() => setActive(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
