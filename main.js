const distortionDetails = {
    ALL_OR_NOTHING: { name: 'All Or Nothing Thinking', description: '' },
    OVERGENERALIZATION: { name: 'Overgeneralization', description: '' },
    MENTAL_FILTER: { name: 'Mental Filter', description: '' },
    DISQUALIFY_THE_POSITIVE: {
        name: 'Disqualify the positive',
        description: '',
    },
    MIND_READING: { name: 'Mind Reading', description: '' },
    FORTUNE_TELLING: { name: 'Fortune Telling', description: '' },
    MAGNIFICATION: { name: 'Magnification', description: '' },
    MINIMIZATION: { name: 'Minimization', description: '' },
    EMOTIONAL_REASONING: { name: 'Emotional Reasoning', description: '' },
    SHOULD_STATEMENTS: { name: 'Should Statements', description: '' },
    MISLABELLING: { name: 'Mislabelling', description: '' },
    PERSONALIZATION: { name: 'Personalization', description: '' },
};

const getRandomDistortion = () => {
    const distortions = Object.keys(distortionDetails);
    const randomDistortion =
        distortions[Math.floor(Math.random() * distortions.length)];

    return distortionDetails[randomDistortion];
};

const randomDistortion = getRandomDistortion();

// Controller
const distortionNameElement = document.querySelector('.distortion-name');
distortionNameElement.innerHTML = randomDistortion.name;
