import { useMemo, useState } from 'react';
import QuestCard from './QuestCard';
import QuestModal from './QuestModal';
import QuestTabs from './QuestTabs';
import quests from '../data/quests';

const TAB_META = {
  Main: {
    title: 'Main Quests',
    description: 'Core professional roles, leadership chapters, and major academic milestones.',
  },
  Side: {
    title: 'Side Quests',
    description: 'Independent builds, experiments, and adjacent roles that sharpened range.',
  },
  Guild: {
    title: 'Guild Contracts',
    description: 'Certificates and learning tracks that expanded cloud, ML, and networking knowledge.',
  },
  All: {
    title: 'Complete Chronicle',
    description: 'A full ledger of experience, projects, and certifications told as quests.',
  },
};

export default function QuestBoard() {
  const [activeTab, setActiveTab] = useState('Main');
  const [openQuest, setOpenQuest] = useState(null);

  const filteredQuests = useMemo(() => {
    if (activeTab === 'All') return quests;
    return quests.filter((quest) => quest.type === activeTab);
  }, [activeTab]);

  const activeMeta = TAB_META[activeTab];

  return (
    <div className="quest-board parchment-card">
      <div className="quest-board__header">
        <div>
          <p className="eyebrow">Guild Ledger</p>
          <h3>{activeMeta.title}</h3>
          <p className="quest-board__description">{activeMeta.description}</p>
        </div>

        <div className="quest-board__summary" aria-label="Quest board summary">
          <span>{filteredQuests.length} entries</span>
          <span>Interactive experience archive</span>
        </div>
      </div>

      <QuestTabs active={activeTab} setActive={setActiveTab} />

      <div className="quest-board__surface" role="list" aria-label={`${activeMeta.title} entries`}>
        {filteredQuests.map((quest) => (
          <QuestCard key={quest.id} quest={quest} onOpen={setOpenQuest} />
        ))}
      </div>

      <QuestModal quest={openQuest} onClose={() => setOpenQuest(null)} />
    </div>
  );
}
