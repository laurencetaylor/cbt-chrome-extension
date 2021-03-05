const distortionDetails = {
    ALL_OR_NOTHING: {
        name: 'All Or Nothing Thinking',
        description:
            'Evaluating things in extreme, black or white categories; dichotomous thinking',
        example: '',
    },
    OVERGENERALIZATION: {
        name: 'Overgeneralization',
        description:
            'If something happens once, or coincidentally multiple times, it will happen forever',
        example:
            'You are rejected in a job interview; you conclude you will never find work again',
    },
    MENTAL_FILTER: {
        name: 'Mental Filter',
        description:
            'Taking one small negative event and dwelling on it. An opposite overgeneralization: instead of taking a small event and overgeneralizing, you focus on it exclusively and filter anything else out',
        example: '',
    },
    DISQUALIFY_THE_POSITIVE: {
        name: 'Disqualify the positive',
        description:
            'Disqualifying neutral or positive experiences, so they are transformed into negative ones',
        example: '',
    },
    MIND_READING: {
        name: 'Mind Reading',
        description:
            'Invalidating neutral or positive experiences so they are transformed into negative ones',
        example: '',
    },
    FORTUNE_TELLING: {
        name: 'Fortune Telling',
        description: 'Imagining something bad is about to happen',
        example: '',
    },
    MAGNIFICATION: {
        name: 'Magnification',
        description:
            'Exaggerating your errors, fears, and imperfections; catastrophising',
        example: '',
    },
    MINIMIZATION: {
        name: 'Minimization',
        description:
            'Glossing over your desirable qualities as well as the flaws of others',
        example: '',
    },
    EMOTIONAL_REASONING: {
        name: 'Emotional Reasoning',
        description: 'Taking emotions as evidence for the truth',
        example: '',
    },
    SHOULD_STATEMENTS: {
        name: 'Should Statements',
        description:
            "Making yourself feel terrible by saying 'I should' do this or that",
        example: '',
    },
    MISLABELLING: {
        name: 'Mislabelling',
        description:
            'Describing events with words that are inaccurate and emotionally heavily loaded',
        example: '',
    },
    PERSONALIZATION: {
        name: 'Personalization',
        description:
            'Assuming responsibility for negative events where there is no basis for doing so',
        example: '',
    },
};

const getRandomDistortionKey = () => {
    const distortionKeys = Object.keys(distortionDetails);
    const randomDistortionKey =
        distortionKeys[Math.floor(Math.random() * distortionKeys.length)];

    return randomDistortionKey;
};

// Controller
const fillDistortionList = () => {
    const distortionUlElement = document.querySelector('.distortion-list');

    Object.keys(distortionDetails).forEach((distortionKey) => {
        const liElement = document.createElement('li');
        liElement.setAttribute('class', distortionKey);

        const distortionName = distortionDetails[distortionKey].name;
        liElement.innerHTML = distortionName;
        distortionUlElement.appendChild(liElement);
    });
};

const fillDistortionDetails = (distortionKey) => {
    const distortion = distortionDetails[distortionKey];
    const distortionNameElement = document.querySelector('.distortion-name');
    distortionNameElement.innerHTML = distortion.name;
    const distortionDescriptionElement = document.querySelector(
        '.distortion-description'
    );
    distortionDescriptionElement.innerHTML = distortion.description;
};

const highlightSelectedDistortion = (distortionKey) => {
    const selectedDistortion = document.querySelector(`.${distortionKey}`);
    selectedDistortion.style.color = '#66ccff';
};

window.onload = () => {
    fillDistortionList();

    const randomDistortionKey = getRandomDistortionKey();
    fillDistortionDetails(randomDistortionKey);
    highlightSelectedDistortion(randomDistortionKey);
};
